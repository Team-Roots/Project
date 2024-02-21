import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

// export const organizationConditions = ['excellent', 'good', 'fair', 'poor'];
export const organizationWaiverPublications = {
  organizationWaiver: 'OrganizationWaiver',
  organizationWaiverAdmin: 'OrganizationWaiverAdmin',
};

class OrganizationWaiverCollection extends BaseCollection {
  constructor() {
    super('OrganizationWaiver', new SimpleSchema({
      waiver: {
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
   * Defines a new Stuff item.
   * @return {waiver}
   * @return {orgID}
   * @return {String} the docID of the new document.
   */
  define({ waiver, orgID }) {
    const docID = this._collection.insert({
      waiver,
      orgID,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param waiver the waiver string
   */

  // we dont want users to update : hence the
  // eslint blockage
  // eslint-disable-next-line no-empty-pattern
  update(docID, { waiver }) {
    const updateData = {};
    updateData.waiver = waiver;
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(organizationWaiverPublications.organizationWaiver, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(organizationWaiverPublications.organizationWaiverAdmin, function publish() {
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
  subscribeOrgWaiver() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationWaiverPublications.organizationWaiver);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeOrgWaiverAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationWaiverPublications.organizationWaiverAdmin);
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
   * @return {{waiver: *, orgID: *, owner: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const waiver = doc.waiver;
    const orgID = doc.orgID;
    return { waiver, orgID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const OrganizationWaiver = new OrganizationWaiverCollection();
