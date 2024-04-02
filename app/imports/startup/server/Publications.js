import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
import { Comments } from '../../api/comment/CommentCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';
import { OrganizationAdmin, organizationAdminPublications } from '../../api/organization/OrganizationAdmin';
import { ROLE } from '../../api/role/Role';
import { eventCategoriesPublications as EventsCategories } from '../../api/event/EventCategoriesCollection';
// Call publish for all the collections.
MATPCollections.collections.forEach(c => c.publish());

export const organizationAdminPublication = 'OrganizationAdmin';

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

Meteor.publish(EventsCategories.eventCategories, function () {
  return this.ready();
});

// split organizationAdmin publication exception to avoid circular dependencies
Meteor.publish(organizationAdminPublications.organizationAdmin, function () {
  if (this.userId && Roles.userIsInRole(this.userId, ROLE.ORG_ADMIN)) {
    const username = Meteor.users.findOne(this.userId).username;
    const ownedOrgID = Organizations.findOne({ organizationOwner: username }, {}).orgID;
    return OrganizationAdmin.find({ $or: [{ orgAdmin: username }, { orgID: ownedOrgID }] }, {}); // return documents where either the user is an admin or the user owns the organization
  }
  return this.ready();
});

Meteor.publish(organizationAdminPublications.organizationAdminAdmin, function () {
  if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
    return OrganizationAdmin._collection.find();
  }
  return this.ready();
});
