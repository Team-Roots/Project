import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  this.ready();
});

// All-level publication.
Meteor.publish(Events.event, function () {
  if (this.userId) {
    // return Events.collection.find({});
    // we really dont need anything here (this is causing errors too)
  }
  return this.ready();
});
