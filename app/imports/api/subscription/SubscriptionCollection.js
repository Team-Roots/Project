import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const SubscriptionPublications = {
  Subscription: 'Subscription',
  SubscriptionAdmin: 'SubscriptionAdmin',
};

class SubscriptionCollection extends BaseCollection {
  constructor() {
    super('Subscriptions', new SimpleSchema({
      userEmail: String,
    }));
  }

  /**
   * Defines a new Subscription item.
   * @param userEmail the email of the user of the subscription.
   * @return {String} the docID of the new document.
   */
  define({ userEmail }) {
    if (!this._collection.findOne(userEmail)) {
      const docID = this._collection.insert({
        userEmail,
      });
      return docID;
    }
    throw new Meteor.Error('This user already has an email.');
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { userEmail }) {
    const updateData = {};
    if (userEmail) {
      updateData.userEmail = userEmail;
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
   * It publishes the entire collection for admin and just the Subscription associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the SubscriptionCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(SubscriptionPublications.Subscription, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ userEmail: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(SubscriptionPublications.SubscriptionAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for Subscription owned by the current user.
   */
  subscribeSubscription() {
    if (Meteor.isClient) {
      return Meteor.subscribe(SubscriptionPublications.Subscription);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeSubscriptionAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(SubscriptionPublications.SubscriptionAdmin);
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
    return { userEmail };
  }
}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Subscriptions = new SubscriptionCollection();
