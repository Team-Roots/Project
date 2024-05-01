import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';
import { UserStats } from '../../api/user/UserStatisticsCollection';
import { EventSubscription } from '../../api/event/EventSubscriptionCollection';
import { EventCategories } from '../../api/event/EventCategoriesCollection';
import { Comments } from '../../api/comment/CommentCollection';
import { Categories } from '../../api/category/CategoryCollection';
import { OrganizationAdmin } from '../../api/organization/OrganizationAdmin';
import { VoluntreeSubscriptions } from '../../api/voluntreesubscription/VoluntreeSubscriptionCollection';
import VoluntreeCategories from '../../api/category/VoluntreeCategories';
import { UserProfiles } from '../../api/user/UserProfileCollection';

Meteor.methods({
  'comments.fetch'(filter = {}) {
    check(filter, Match.Optional(Object));

    // Assuming a simple fetch for demonstration. Adjust based on your actual logic.
    // If you implemented a specific fetch method in CommentCollection that accepts filters,
    // you would use that method here.
    return Comments._collection.find(filter).fetch();
  },
  // eslint-disable-next-line meteor/audit-argument-checks
  'events.update'(id, eventData) {
    check(id, String);
    // eslint-disable-next-line no-undef
    check(updateData, {
      name: String,
      eventDate: Date,
      category: String,
      location: String,
      startTime: String, // Adjust the type based on your actual data structure
      endTime: String, // Same as above
      coordinator: String,
      amountVolunteersNeeded: Number, // Or String if it's not a numerical value
      address: String,
      locationType: String,
      image: String,
      specialInstructions: String, // Or whatever type is appropriate
      // eslint-disable-next-line no-undef
      restrictions: Match.Maybe(Object), // Use Match.Maybe if it's optional
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Update the event in the database
    Events.update(id, { $set: eventData });
  },
  'events.delete'(eventId) {
    check(eventId, String);

    Events.collection.remove(eventId);
  },
  'eventSubscription.insert'(eventSubscriptionInfo) {
    check(eventSubscriptionInfo, {
      email: String,
      orgID: Number,
      eventName: String,
      eventDate: String, // Assuming eventDate is stored as a string in the desired format
      // Add other fields if necessary
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to subscribe to events.');
    }

    EventSubscription.define({ subscriptionInfo: eventSubscriptionInfo });
  },
  'eventSubscription.unsub'(eventSubscriptionInfo) {
    check(eventSubscriptionInfo, {
      email: String,
      orgID: Number,
      eventName: String,
      eventDate: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to unsubscribe to events.');
    }

    EventSubscription.unsub({ subscriptionInfo: eventSubscriptionInfo });
  },
  'organization.getNameFromOrgID'(orgID) {
    check(orgID, Number);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to update orgs helped data.');
    }
    const org = Organizations.findOne({ orgID: orgID });
    if (!org) {
      throw new Meteor.Error('org-not-found', 'org not found.');
    }
    return org.name;
  },
  'organization.transferOwnership'(transferInfo) {
    console.log('transferInfo: ', transferInfo);
    check(transferInfo, {
      orgID: Number,
      oldOwner: String,
      newOwner: String,
    });

    const { orgID, oldOwner, newOwner } = transferInfo;
    const org = Organizations.findOne({ orgID: orgID });
    if (!org) {
      throw new Meteor.Error(`No organization found with orgID ${orgID}.`);
    }
    const oldOwnerUser = UserProfiles.findOne({ email: oldOwner });
    const newOwnerUser = UserProfiles.findOne({ email: newOwner });
    if (!oldOwnerUser) {
      throw new Meteor.Error(`${oldOwner} does not yet have an account.`);
    }
    if (!newOwnerUser) {
      throw new Meteor.Error(`${newOwner} does not yet have an account.`);
    }

    if (oldOwner !== org.organizationOwner) {
      throw new Meteor.Error(`${oldOwner} is not the owner of ${org.name}.`);
    }
    const oldOwnerAdmin = OrganizationAdmin.findOne({ orgAdmin: oldOwner, orgID: orgID });
    const newOwnerAdmin = OrganizationAdmin.findOne({ orgAdmin: newOwner, orgID: orgID });
    if (!newOwnerAdmin) {
      throw new Meteor.Error(`${newOwner} is not an admin of ${org.name}.`);
    }
    const now = new Date();
    OrganizationAdmin.update(oldOwnerAdmin._id, { dateAdded: now });
    OrganizationAdmin.update(newOwnerAdmin._id, { dateAdded: now });
    Organizations.update(org._id, { organizationOwner: newOwner });
  },
  'userStats.updateOrgsHelpedData'(eventInfo) {
    check(eventInfo, {
      email: String,
      orgID: Number,
      eventName: String,
      eventDate: String,
      startTime: Date,
      endTime: Date,
    });
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to update orgs helped data.');
    }
    const org = Organizations.findOne({ orgID: eventInfo.orgID });
    const userStats = UserStats.findOne({ email: eventInfo.email });
    if (!userStats) {
      throw new Meteor.Error('user-stats-not-found', 'User stats not found.');
    }

    const orgNameViaID = org.name;
    const newOrgData = { orgName: orgNameViaID, eventName: eventInfo.eventName, eventDate: eventInfo.eventDate, signUpTime: eventInfo.startTime, signOutTime: eventInfo.endTime };
    UserStats.newOrgHelped(userStats._id, newOrgData);
  },
  'userStats.changeGoal'(value, email) {
    check(value, Number);
    check(email, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to unsubscribe to events.');
    }

    UserStats.changeGoal(value, email);
  },
  'userStats.claimHours'(endTime, email, eventName, eventDate) {
    check(endTime, Date);
    check(email, String);
    check(eventName, String);
    check(eventDate, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to unsubscribe to events.');
    }
    const userStats = UserStats.findOne({ email: email });
    UserStats.SignOut(userStats._id, endTime, email, eventName, eventDate);
  },
});

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}
function addVoluntreeSubscriptionData(data) {
  VoluntreeSubscriptions.define(data);
}
function addOrganizationData(data) {
  Organizations.define(data);
}
function addOrganizationAdminData(data) {
  OrganizationAdmin.define(data);
}
function addEventData(data) {
  Events.define(data);
}
function addCategoryData(data) {
  Categories.define(data);
}

if (Categories.count() === 0) {
  VoluntreeCategories.map(category => addCategoryData({ categoryName: category }));
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Organizations.count() === 0 && OrganizationAdmin.count() === 0) {
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating default organizations.');
    Meteor.settings.defaultOrganizations.forEach(org => {
      const newOrg = {
        name: org.name,
        website: org.website,
        profit: org.profit,
        location: org.location,
        organizationOwner: org.organizationOwner,
        visible: org.visible,
        onboarded: org.onboarded,
        missionStatement: org.missionStatement,
        description: org.description,
      };
      const newVoluntreeSubscription = {
        email: newOrg.organizationOwner,
      };
      addVoluntreeSubscriptionData(newVoluntreeSubscription);
      addOrganizationData(newOrg);
    });
    console.log('Creating default organization admins.');
    Meteor.settings.defaultOrgAdmins.forEach(orgAdmin => {
      const newOrgAdmin = {
        orgAdmin: orgAdmin.orgAdmin,
        dateAdded: new Date(),
        orgID: orgAdmin.orgID,
      };
      addOrganizationAdminData(newOrgAdmin);
    });
  }
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(event => addEventData(event));
  }
}
