import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
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
        defaultValue: 0,
      },
      'stats.totalHours': {
        type: SimpleSchema.Integer,
        required: true,
        defaultValue: 0,
      },
      'stats.orgsHelped': {
        type: Array,
        required: true,
        defaultValue: [],
      },
      // $ is kinda like any or declaring some sort of extension
      'stats.orgsHelped.$': {
        type: String, // Define the type of items in the array
      },
      completedHours: {
        type: Array,
        required: true,
        defaultValue: function () {
          return [{
            year: new Date().getFullYear(),
            Jan: 0,
            Feb: 0,
            Mar: 0,
            Apr: 0,
            May: 0,
            Jun: 0,
            Jul: 0,
            Aug: 0,
            Sep: 0,
            Oct: 0,
            Nov: 0,
            Dec: 0,
          }];
        },
      },
      'completedHours.$': Object,
      'completedHours.$.year': { type: SimpleSchema.Integer, defaultValue: new Date().getFullYear() },
      'completedHours.$.Jan': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Feb': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Mar': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Apr': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.May': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Jun': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Jul': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Aug': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Sep': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Oct': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Nov': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
      'completedHours.$.Dec': { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
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
  define({ stats, completedHours, email }) {
    const defaultCompletedHours = [
      {
        year: 2024,
        Jan: 0,
        Feb: 0,
        Mar: 0,
        Apr: 0,
        May: 0,
        Jun: 0,
        Jul: 0,
        Aug: 0,
        Sep: 0,
        Oct: 0,
        Nov: 0,
        Dec: 0,
      },
    ];
    const docID = this._collection.insert({
      stats: stats,
      completedHours: completedHours || defaultCompletedHours,
      email: email,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param stats Stat structure
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
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userStatsPublications.userStats, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          console.log(username);
          return instance._collection.find({ email: username });
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
    const stats = doc.stats;
    const email = doc.email;
    const completedHours = doc.completedHours;
    return { stats, email, completedHours };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserStats = new UserStatsCollection();
