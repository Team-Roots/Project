import { Meteor } from 'meteor/meteor';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Categories } from '../../api/category/CategoryCollection'; // Ensure this path is correct

Meteor.startup(() => {
  // Automatically publish all collections defined in MATPCollections
  // Assuming MATPCollections has a method publishAll(), which correctly iterates and publishes each collection.
  MATPCollections.publishAll();

  // Additional publications for roles or other data can be added here
  // For example, publishing user roles if you're using alanning:roles
  Meteor.publish(null, function publishRoles() {
    if (!this.userId) {
      return this.ready();
    }
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  });
});

// This should be outside the Meteor.startup()
Meteor.publish(Categories.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Categories.collection.find({ owner: username });
  }
  return this.ready();
});
