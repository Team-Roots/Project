// import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
// import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const SkillPublications = {
  skill: 'Skill',
};

class SkillCollection extends BaseCollection {
  constructor() {
    super('Skills', new SimpleSchema({
      skillName: String,
    }));
  }

  /**
   * Defines a new Skill item.
   * @param skillName the name of the item.
   */
  define({ skillName }) {
    const docID = this._collection.insert({
      skillName,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param skillName the new skillName (optional).
   */
  update(docID, { skillName }) {
    const updateData = {};
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
   * @return {{skillName}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const skillName = doc.skillName;
    return { skillName };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Skills = new SkillCollection();
