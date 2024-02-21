import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userStatsPublications = {
  userStats: 'UserStats',
};

class UserStatsCollection extends BaseCollection {
  constructor() {
    super('UserStats', new SimpleSchema({
      stats: {
        type: Object,
        required: true,
      },
      'stats.hoursThisMonth': {
        type: SimpleSchema.Integer,
        required: true,
      },
      'stats.totalHours': {
        type: SimpleSchema.Integer,
        required: true,
      },
      'stats.orgsHelped': {
        type: Array,
        required: true,
      },
      'stats.orgsHelped.$': {
        type: String, // Define the type of items in the array
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
    }));
  }

  /**
   * Defines a new Stuff item.
   * @return {stats}
   * @return {email}
   * @return {String} the docID of the new document.
   */
  define({ stats, email }) {
    const docID = this._collection.insert({
      stats,
      email,
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
  update(docID, { stats }) {
    const updateData = {};
    updateData.stats = stats;
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
      Meteor.publish(userStatsPublications.userStats, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userStatsPublications.userStats, function publish() {
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
  subscribeStats() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userStatsPublications.userStats);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeStatsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userStatsPublications.userStats);
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
   * @return {{stats: *, email: *, owner: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const waiver = doc.stats;
    const orgID = doc.email;
    return { waiver, orgID };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserStats = new UserStatsCollection();
