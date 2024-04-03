import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
import { Comments } from '../../api/comment/CommentCollection';
// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

Meteor.publish(null, function () {
});

// All-level publication.
Meteor.publish(Events.event, function publishEvents() {
  if (!this.userId) {
    return this.ready();
  }
  return this.ready();

});
// eslint-disable-next-line meteor/audit-argument-checks
Meteor.publish('userComments', function (ownerId) {
  return Comments.find({ owner: ownerId });
});

Meteor.publish('userNames', function publishUserNames() {
  return Meteor.users.find({}, {
    fields: {
      username: 1, // Publish only the usernames
    },
  });
});
