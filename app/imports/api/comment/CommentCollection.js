// import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
// import { _ } from 'meteor/underscore';
// import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const CommentPublications = {
  comment: 'Comment',
};

class CommentCollection extends BaseCollection {
  constructor() {
    super('Comments', new SimpleSchema({
      commentName: String,
      uniqueId: String,
      owner: String,
      createdAt: Date,
      _id: String,
    }));
  }

  /**
   * Defines a new comment item.
   * @param commentName
   * @param uniqueId
   * @param owner
   * @param createdAt
   * @param _id
   */
  define({ commentName, uniqueId, owner, createdAt, _id }) {
    const docID = this._collection.insert({
      commentName,
      uniqueId,
      owner,
      createdAt,
      _id,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param commentName
   * @param uniqueId
   * @param owner
   * @param createdAt
   * @param _id
   */
  update(docID, { commentName, uniqueId, owner, createdAt, _id }) {
    const updateData = {};
    if (commentName) {
      updateData.commentName = commentName;
    }
    if (uniqueId) {
      updateData.uniqueId = uniqueId;
    }
    if (owner) {
      updateData.owner = owner;
    }
    if (createdAt) {
      updateData.createdAt = createdAt;
    }
    if (_id) {
      updateData._id = _id;
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
   * @return {{commentName}}
   * @return {{uniqueId}}
   * @return {{owner}}
   * @return {{createdAt}}
   * @return {{_id}}
   */
  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const commentName = doc.commentName;
    const uniqueId = doc.uniqueId;
    const owner = doc.owner;
    const createdAt = doc.createdAt;
    const _id = doc._id;
    return { commentName, uniqueId, owner, createdAt, _id };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Comments = new CommentCollection();
