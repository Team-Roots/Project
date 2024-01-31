import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';

Meteor.methods({
  'events.update'(id, eventData) {
    check(id, String);
    check(updateData, {
      name: String,
      eventDate: Date,
      category: String,
      location: String,
      startTime: String, // Adjust the type based on your actual data structure
      endTime: String, // Same as above
      coordinator: String,
      amountVolunteersNeeded: Number, // Or String if it's not a numerical value
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
});

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

function addOrgData(data) {
  Organizations.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}

if (Organizations.count() === 0) {
  if (Meteor.settings.defaultOrg) {
    console.log('Creating default org');
    Meteor.settings.defaultOrg.forEach(org => {
      const newDoc = {
        website: org.website,
        profit: org.profit,
        organizationOwner: org.organizationOwner,
        visible: org.visible,
        onboarded: org.onboarded,
        location: org.location,
        backgroundCheck: org.backgroundCheck,
        ageRange: org.ageRange,
        orgID: Organizations.newGlobalID(), // TODO: change later to load a global value
      };
      addOrgData(newDoc);
    });
  }
}
