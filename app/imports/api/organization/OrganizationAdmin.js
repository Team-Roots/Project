import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

// export const organizationConditions = ['excellent', 'good', 'fair', 'poor'];
export const organizationPublications = {
  organization: 'Organization',
  organizationAdmin: 'OrganizationAdmin',
};

class OrganizationCollection extends BaseCollection {
  constructor() {
    super('Organizations', new SimpleSchema({
      employee: {
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
   * @return {employee}
   * @return {orgID}
   * @return {String} the docID of the new document.
   */
  define({ employee, orgID }) {
    const docID = this._collection.insert({
      employee,
      orgID,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   * @param backgroundCheck bool check
   * @param ageRange the range of age for the job
   */

  // we dont want users to update : hence the
  // eslint blockage
  // eslint-disable-next-line no-empty-pattern
  update(docID, { }) {
    const updateData = {};

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
      Meteor.publish(organizationPublications.organization, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(organizationPublications.organizationAdmin, function publish() {
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
  subscribeStuff() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organization);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStuffAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(organizationPublications.organizationAdmin);
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
   * @return {{website: *, profit: *, location: *, organizationOwner: *, organizationWaiverId: *, visible: *, onboarded: *, owner: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const website = doc.website;
    const profit = doc.profit;
    const location = doc.location;
    const organizationOwner = doc.organizationOwner;
    const organizationWaiverId = doc.organizationWaiverId;
    const visible = doc.visible;
    const onboarded = doc.onboarded;
    const owner = doc.owner;
    return { website, profit, location, organizationOwner, organizationWaiverId, visible, onboarded, owner };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Organization = new OrganizationCollection();
