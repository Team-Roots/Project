import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';
import { UserStats } from '../../api/user/UserStatisticsCollection';
import { EventSubscription } from '../../api/event/EventSubscriptionCollection';
import { EventCategories } from '../../api/event/EventCategoriesCollection';

Meteor.methods({
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
      eventDate: String, // Assuming eventDate is stored as a string in the desired format
      // Add other fields if necessary
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to unsubscribe to events.');
    }

    EventSubscription.unsub({ subscriptionInfo: eventSubscriptionInfo });
  },
  'userStats.updateOrgsHelpedData'(email, orgID, eventName, eventDate, hoursOfEvent) {
    check(email, String);
    check(orgID, Number);
    check(eventName, String);
    check(eventDate, String);
    check(hoursOfEvent, Number);

    if (!this.userId) {
      throw new Meteor.Error('not-authorized', 'User must be logged in to update orgs helped data.');
    }

    const userStats = UserStats.findOne({ email });
    if (!userStats) {
      throw new Meteor.Error('user-stats-not-found', 'User stats not found.');
    }

    // Check if there's an entry with matching orgID, eventName, and eventDate
    const existingOrg = userStats.stats.orgsHelped.find(org => org.orgID === orgID && org.eventName === eventName && org.eventDate === eventDate);

    if (!existingOrg) {
      // If matching entry not found, add new organization data to orgsHelped array
      userStats.stats.orgsHelped.push({ orgID, eventName, eventDate, hoursOfEvent });
    } else {
      // If matching entry found, update eventName, eventDate, eventID, and hoursOfEvent
      existingOrg.eventName = eventName;
      existingOrg.eventDate = eventDate;
      existingOrg.hoursOfEvent = hoursOfEvent;
    }

    // Update the user stats document with the modified orgsHelped array
    UserStats.update(userStats._id, { $set: { 'stats.orgsHelped': userStats.stats.orgsHelped } });
  },
});

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addOrganizationData(data) {
  Organizations.define(data);
}

function addEventData(data) {
  Events.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Organizations.count() === 0) {
  if (Meteor.settings.defaultOrganizations) {
    console.log('Creating default organizations');
    Meteor.settings.defaultOrganizations.forEach(org => {
      const newDoc = {
        name: org.name,
        website: org.website,
        profit: org.profit,
        location: org.location,
        organizationOwner: org.organizationOwner,
        visible: org.visible,
        onboarded: org.onboarded,
      };
      addOrganizationData(newDoc);
    });
  }
}

if (Events.count() === 0) {
  if (Meteor.settings.defaultEvents) {
    console.log('Creating default events.');
    Meteor.settings.defaultEvents.forEach(event => addEventData(event));
  }
}

