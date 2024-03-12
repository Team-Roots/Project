import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { MATPCollections } from '../../api/matp/MATPCollections';
import { Events } from '../../api/event/EventCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';
import { OrganizationAdmin, organizationAdminPublications } from '../../api/organization/OrganizationAdmin';
import { ROLE } from '../../api/role/Role';
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
Meteor.publish(Events.event, function () {
  if (this.userId) {
    // return Events.collection.find({});
    // we really dont need anything here (this is causing errors too)
  }
  return this.ready();
});
Meteor.publish(organizationAdminPublications.organizationAdmin, function () {
  if (Roles.userIsInRole(this.userId, ROLE.ORG_ADMIN)) {
    const username = Meteor.users.findOne(this.userId).username;
    const ownedOrgID = Organizations.findOne({ organizationOwner: username }, {}).orgID;
    return OrganizationAdmin.find({ $or: [{ orgAdmin: username }, { orgID: ownedOrgID }] }, {});
  }
  return this.ready();
});
