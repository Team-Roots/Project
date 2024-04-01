import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';
import { Users } from '../user/UserCollection';

export const organizationAdminPublications = {
  organizationAdmin: 'OrganizationAdmin',
  organizationAdminAdmin: 'OrganizationAdminAdmin',
};

class OrganizationAdminCollection extends BaseCollection {
  constructor() {
    super('OrganizationAdmin', new SimpleSchema({
      orgAdmin: { // email of the organization admin
        type: String,
        required: true,
      },
      orgID: {
        type: SimpleSchema.Integer,
        required: true,
        unique: true,
      },
    }));
  }

  /**
   * Defines a new OrganizationAdmin.
   * @return {orgAdmin} email of the org admin to be added
   * @return {orgID} orgID of the org
   * @return {String} the docID of the new document.
   */
  define({ orgAdmin, orgID }) {
    const docID = this._collection.insert({
      orgAdmin,
      orgID,
    });
    const orgAdminID = Users.getID(orgAdmin);
    Roles.addUsersToRoles(orgAdminID, [ROLE.ORG_ADMIN]);
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   */

  // we dont want users to update : hence the
  // eslint blockage
  // eslint-disable-next-line no-empty-pattern
  update(docID, { newEmail }) {
    const updateData = {};

    if (newEmail) {
      updateData.newEmail = newEmail;
    }

    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const toRemoveOrgAdmin = this.findDoc(name);
    check(toRemoveOrgAdmin, Object);
    this._collection.remove(toRemoveOrgAdmin._id);
    if (!this._collection.findOne(toRemoveOrgAdmin.orgAdmin)) {
      const toRemoveOrgAdminID = Users.getID(toRemoveOrgAdmin);
      Roles._removeUserFromRole(toRemoveOrgAdminID, ROLE.ORG_ADMIN, {});
    }
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   * case 1 regular user: should publish nothing since they are not an orgAdmin
   * case 2 orgAdmin or owner of the organization: should only publish orgAdmins of their organization
   * case 3 site admin: publish all orgAdmins
   * organizationAdmin publication- handles case 1 and 2 as it checks if the current user is an orgAdmin or not
   * organizationAdminAdmin publication- handles case 3 as it checks if the current user is a site admin or not
   */
  publish() {
    if (Meteor.isServer) {
      const instance = this;
      // normal organizationAdmin publication is in publications.js
      // the code requires the Organization collection, which would cause a circular dependency if kept here
      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(organizationAdminPublications.organizationAdminAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeOrgAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationAdminPublications.organizationAdmin);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOrgAdminAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationAdminPublications.organizationAdminAdmin);
    }
    return null;
  }

  /**
   * Default implementation of assertValidRoleForMethod. Asserts that userId is logged in as an Admin or User.
   * This is used in the define, update, and removeIt Meteor methods associated with each class.
   * @param userId The userId of the logged in user. Can be null or undefined
   * @throws { Meteor.Error } If there is no logged in user, or the user is not an Admin or User.
   */
  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  /**
   * Returns an object representing the definition of docID in a format appropriate to the restoreOne or define function.
   * @param docID
   * @return {{employee: *, orgID: *,}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const orgAdmin = doc.orgAdmin;
    const orgID = doc.orgID;
    return { orgAdmin, orgID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OrganizationAdmin = new OrganizationAdminCollection();
