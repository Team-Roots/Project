import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const userSkillsPublications = {
  userSkills: 'UserSkillsCollection',
  userSkillsAdmin: 'UserSkillsAdmin',
};

class UserSkillsCollection extends BaseCollection {
  constructor() {
    super('userSkills', new SimpleSchema({
      userEmail: String,
      skillName: String,
    }));
  }

  /**
   * Defines a new UserSkillsCollection item.
   * @param userEmail email of the user
   * @param skillName name of the skill
   */
  define({ userEmail, skillName }) {
    // error checking if there already exists a userSkill object with this email
    if (!this.findOne({ userEmail: userEmail }, {})) {
      const docID = this._collection.insert({
        userEmail,
        skillName,
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
   * @param skillName name of the skill
   */
  update(docID, { userEmail, skillName }) {
    const updateData = {};
    if (userEmail) {
      updateData.userEmail = userEmail;
    }
    if (skillName) {
      updateData.skillName = skillName;
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
   * It publishes the entire collection for admin and just the userSkills associated with a user.
   */
  publish() {
    if (Meteor.isServer) {
      // get the UserSkillsCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userSkillsPublications.userSkills, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).name;
          return instance._collection.find({ userEmail: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userSkillsPublications.userSkillsAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for userSkills for the current user.
   */
  subscribeUserSkills() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userSkillsPublications.userSkills);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserSkillsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userSkillsPublications.userSkillsAdmin);
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

/**
 * export const UserSkillsCollection = new UserSkillsCollection();
 */

export const UserSkills = new UserSkillsCollection();
