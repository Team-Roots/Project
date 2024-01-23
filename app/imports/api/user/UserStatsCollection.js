import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userStatsPublications = {
  userStats: 'UserStats',
  userStatsAdmin: 'UserStatsAdmin',
};

class UserStatsCollection extends BaseCollection {
  constructor() {
    super('UserStats', new SimpleSchema({
      userEmail: { type: String, unique: true },
      completedHours: [
        {
          Jan: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Feb: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Mar: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Apr: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          May: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Jun: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Jul: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Aug: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Sep: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Oct: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Nov: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
          Dec: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
        },
      ],
      personsHelped: { type: SimpleSchema.Integer, defaultValue: 0, min: 0 },
    }));
  }

  /**
   * Defines a new UserStats item.
   * @param userEmail email of the user
   * @param completedHours completed volunteer hours in the past 12 months
   * @param personsHelped cumulative number of people helped
   */
  define({ userEmail, completedHours, personsHelped }) {
    // error checking if there already exists a userStats object with this email
    if (!this.findOne({ userEmail: userEmail }, {})) {
      const docID = this._collection.insert({
        userEmail,
        completedHours,
        personsHelped,
      });
      return docID;
    }
    // TODO: either return undefined/null or throw an error. should probably throw error, will figure out later
    return undefined;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param userEmail email of the user
   * @param completedHours completed volunteer hours in the past 12 months
   * @param personsHelped cumulative number of people helped
   */
  update(docID, { userEmail, completedHours, personsHelped }) {
    const updateData = {};
    if (userEmail) {
      updateData.userEmail = userEmail;
    }
    // TODO: fix completed hours error checking, may need to wait until we figure how to completed hours graph
    if (completedHours) {
      updateData.completedHours = completedHours;
    }
    if (_.isNumber(personsHelped)) {
      updateData.personsHelped = personsHelped;
    }
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
   * It publishes the entire collection for admin and just the userStats associated with a user.
   */
  publish() {
    if (Meteor.isServer) {
      // get the UserStatsCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userStatsPublications.userStats, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).name;
          return instance._collection.find({ userEmail: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userStatsPublications.userStatsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for userStats for the current user.
   */
  subscribeUserStats() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userStatsPublications.userStats);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserStatsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userStatsPublications.userStatsAdmin);
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
   * @return {{owner: (*|number), condition: *, quantity: *, name}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const userEmail = doc.userEmail;
    const completedHours = doc.completedHours;
    const personsHelped = doc.personsHelped;
    return { userEmail, completedHours, personsHelped };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserStats = new UserStatsCollection();
