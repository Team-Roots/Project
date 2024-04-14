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
import { VoluntreeSubscriptions } from '../../api/subscription/VoluntreeSubscriptionCollection';

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
  'userStats.updateOrgsHelpedData'(eventInfo) {
    check(eventInfo, {
      email: String,
      orgID: Number,
      eventName: String,
      eventDate: String,
      hoursServed: Number,
    });
    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to update orgs helped data.');
    }
    const org = Organizations.findOne({ orgID: eventInfo.orgID });
    const userStats = UserStats.findOne({ email: eventInfo.email });
    if (!userStats) {
      throw new Meteor.Error('user-stats-not-found', 'User stats not found.');
    }

    // Check if there's an entry with matching orgID, eventName, and eventDate
    // const existingOrg = userStats.stats.orgsHelped.find(org => org.orgID === eventInfo.orgID && org.eventName === eventInfo.eventName && org.eventDate === eventInfo.eventDate);

    // if (!existingOrg) {
    //   // If matching entry not found, add new organization data to orgsHelped array
    //   userStats.stats.orgsHelped.push({ orgID: eventInfo.orgID, eventName: eventInfo.eventName, eventDate: eventInfo.eventDate, hours: eventInfo.hoursOfEvent });
    // } else {
    //   // If matching entry found, update eventName, eventDate, eventID, and hoursOfEvent
    //   existingOrg.eventName = eventInfo.eventName;
    //   existingOrg.eventDate = eventInfo.eventDate;
    //   existingOrg.hoursOfEvent = eventInfo.hoursOfEvent;
    // }
    const orgNameViaID = org.name;
    const newOrgData = { orgName: orgNameViaID, eventName: eventInfo.eventName, eventDate: eventInfo.eventDate, hoursServed: eventInfo.hoursServed };
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
function addEventCategoryData(data) {
  EventCategories.define(data);
}
function addCategoryData(data) {
  Categories.define(data);
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

if (Categories.count() === 0) {
  if (Meteor.settings.defaultCategories) {
    console.log('Creating default categories.');
    Meteor.settings.defaultCategories.forEach(category => addCategoryData(category));
  }
}

if (EventCategories.count() === 0) {
  if (Meteor.settings.defaultEventCategories) {
    console.log('Creating default event categories.');
    Meteor.settings.defaultEventCategories.forEach(data => {
      const newDoc = {
        eventInfo: data.eventInfo,
        categoryName: data.categoryName,
      };
      addEventCategoryData(newDoc);
    });
  }
}
