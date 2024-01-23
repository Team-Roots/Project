import { Meteor } from 'meteor/meteor';
import { check } from 'fast-check';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';

Meteor.methods({
  'events.remove'(eventId) {
    check(eventId, String);

    // Perform security checks here (like if the user is allowed to delete)

    Events.remove(eventId);
  },
});
// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.define(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.forEach(data => addData(data));
  }
}
