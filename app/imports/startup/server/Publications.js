import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';

// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

// alanning:roles publication
// Recommended code to publish roles for each user.
// eslint-disable-next-line consistent-return
Meteor.startup(() => {
  Meteor.publish(Events.userPublicationName, function () {
    if (this.userId) {
      return Events.collection.find();
    }
    return this.ready();
  });
});
