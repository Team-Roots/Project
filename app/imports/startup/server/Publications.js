import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
import { Comments } from '../../api/comment/CommentCollection';
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
Meteor.publish(Events.event, function publishEvents() {
  if (!this.userId) {
    return this.ready();
  }

  return Events.find();
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
