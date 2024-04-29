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
        type: Number,
        required: true,
        defaultValue: 0,
      },
      'stats.totalHours': {
        type: Number,
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
        type: Object, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      'stats.orgsHelped.$.orgName': {
        type: String, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      'stats.orgsHelped.$.eventName': {
        type: String, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      'stats.orgsHelped.$.eventDate': {
        type: String, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      'stats.orgsHelped.$.signUpTime': {
        type: Date, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      'stats.orgsHelped.$.signOutTime': {
        type: Date, // Define the type of items in the array
        // this will be (not reference, but a copy of event subscription at the time of completion
      },
      completedHours: {
        type: Array,
        required: true,
        defaultValue: function () {
          return [{
            year: new Date().getFullYear(),
            Jan: 0.0,
            Feb: 0.0,
            Mar: 0.0,
            Apr: 0.0,
            May: 0.0,
            Jun: 0.0,
            Jul: 0.0,
            Aug: 0.0,
            Sep: 0.0,
            Oct: 0.0,
            Nov: 0.0,
            Dec: 0.0,
          }];
        },
      },
      'completedHours.$': Object,
      'completedHours.$.year': { type: SimpleSchema.Integer, defaultValue: new Date().getFullYear() },
      'completedHours.$.Jan': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Feb': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Mar': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Apr': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.May': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Jun': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Jul': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Aug': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Sep': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Oct': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Nov': { type: Number, defaultValue: 0.0, min: 0.0 },
      'completedHours.$.Dec': { type: Number, defaultValue: 0.0, min: 0.0 },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      monthlyGoal: {
        type: SimpleSchema.Integer,
        required: false,
        optional: true,
        defaultValue: 10,
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
        year: new Date().getFullYear(),
        Jan: 0.0,
        Feb: 0.0,
        Mar: 0.0,
        Apr: 0.0,
        May: 0.0,
        Jun: 0.0,
        Jul: 0.0,
        Aug: 0.0,
        Sep: 0.0,
        Oct: 0.0,
        Nov: 0.0,
        Dec: 0.0,
      },
    ];
    const docID = this._collection.insert({
      stats: stats,
      completedHours: completedHours || defaultCompletedHours,
      email: email,
    });
    return docID;
  }

  changeGoal(val, email) {
    const collection = this._collection.findOne({ email: email });
    const docID = collection._id;
    const updateData = {
      $set: { monthlyGoal: collection.monthlyGoal + val },
    };
    this._collection.update(docID, updateData);
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

  newOrgHelped(docID, orgsHelped) {
    // const userStats = this.findDoc(docID);
    const updateData = {
      $push: { 'stats.orgsHelped': orgsHelped }, // Push new orgsHelped data
    };
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ][currentMonthIndex];
    const completedHoursIndex = this.FindDate(docID, currentYear);
    if (completedHoursIndex >= 0) {
      updateData.$inc = {};
      updateData.$inc[`completedHours.${completedHoursIndex}.${currentMonthName}`] = (orgsHelped.signUpTime.getHours() + (orgsHelped.signUpTime.getMinutes() / 60)) - (orgsHelped.signOutTime.getHours() + (orgsHelped.signOutTime.getMinutes() / 60));
      updateData.$inc['stats.hoursThisMonth'] = (orgsHelped.signUpTime.getHours() + (orgsHelped.signUpTime.getMinutes() / 60)) - (orgsHelped.signOutTime.getHours() + (orgsHelped.signOutTime.getMinutes() / 60));
    } else {
      updateData.$set = {};
      updateData.$set[`completedHours.0.${currentMonthName}`] = (orgsHelped.signUpTime.getHours() + (orgsHelped.signUpTime.getMinutes() / 60)) - (orgsHelped.signOutTime.getHours() + (orgsHelped.signOutTime.getMinutes() / 60));
      updateData.$set['stats.hoursThisMonth'] = 0;
    }
    // console.log(updateData);

    this._collection.update(docID, updateData);
  }

  SignOut(docID, endTime, email, eventName, eventDate) {
    /*
      steps:
        1) find a match in the orgshelped array
        2) set end time to (endTime)
        3) run update
     */
    // Find the index of the orgsHelped entry that matches the event name and event date
    const userStats = this.findDoc(docID);
    const orgsHelpedIndex = userStats.stats.orgsHelped.findIndex(entry => entry.eventName === eventName && entry.eventDate === eventDate);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonthIndex = currentDate.getMonth();
    const currentMonthName = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ][currentMonthIndex];

    // If the entry is found, update the signOutTime
    if (orgsHelpedIndex !== -1) {
      const updateData = {
        $set: {
          [`stats.orgsHelped.${orgsHelpedIndex}.signOutTime`]: endTime,
        },
      };
      const orgHelped = userStats.stats.orgsHelped[orgsHelpedIndex];
      const totalTime = Math.abs((orgHelped.signUpTime.getHours() + (orgHelped.signUpTime.getMinutes() / 60)) - (endTime.getHours() + (endTime.getMinutes() / 60)));
      console.log(`Completed Time: ${totalTime}`);
      const completedHoursIndex = this.FindDate(docID, currentYear);
      if (completedHoursIndex >= 0) {
        updateData.$inc = {};
        updateData.$inc[`completedHours.${completedHoursIndex}.${currentMonthName}`] = totalTime;
        updateData.$inc['stats.hoursThisMonth'] = totalTime;
      } else {
        updateData.$set = {};
        updateData.$set[`completedHours.0.${currentMonthName}`] = totalTime;
        updateData.$set['stats.hoursThisMonth'] = totalTime;
      }
      this._collection.update(docID, updateData);
    } else {
      console.error('Organization helped entry not found for the provided event name and event date.');
    }
  }

  FindDate(docID, currentYear) {
    const userStats = this.findDoc(docID);
    for (let i = 0; i < userStats.completedHours.length; i++) {
      if (userStats.completedHours[i].year === currentYear) {
        return i;
      }
    }
    return -1;
  }

  GenerateNewCompletedHours() {
    const currentDate = new Date();
    const getYear = currentDate.getFullYear();
    return {
      year: getYear,
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
    };
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
   * @return {{stats: *, email: *, owner: *, orgsHelped: *}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const stats = doc.stats;
    const email = doc.email;
    const completedHours = doc.completedHours;
    const orgsHelped = doc.stats.orgsHelped;
    return { stats, email, completedHours, orgsHelped };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserStats = new UserStatsCollection();
