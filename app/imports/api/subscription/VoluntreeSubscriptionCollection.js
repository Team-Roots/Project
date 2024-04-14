import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const voluntreeSubscriptionPublications = {
  VoluntreeSubscription: 'VoluntreeSubscription',
  VoluntreeSubscriptionAdmin: 'VoluntreeSubscriptionAdmin',
};

class VoluntreeSubscriptionCollection extends BaseCollection {
  constructor() {
    super('VoluntreeSubscriptions', new SimpleSchema({
      email: String,
      dateSubscribed: Date,
      orgID: {
        type: SimpleSchema.Integer,
        required: false,
        unique: true,
      },
      active: Boolean,
    }));
  }

  /**
   * Defines a new Subscription item.
   * @param userEmail the email of the user of the subscription.
   * @return {String} the docID of the new document.
   */
  define({ email }) {
    if (this._collection.findOne({ email })) {
      throw new Meteor.Error(`${email} already has a subscription.`);
    }
    const docID = this._collection.insert({
      email,
      dateSubscribed: new Date(),
      active: true,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { email, dateSubscribed, orgID, active }) {
    const updateData = {};
    if (email) {
      updateData.email = email;
    }
    if (dateSubscribed) {
      updateData.dateSubscribed = dateSubscribed;
    }
    if (orgID) {
      updateData.orgID = orgID;
    }
    if (active) {
      updateData.active = active;
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
      // get the VoluntreeSubscriptionCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(voluntreeSubscriptionPublications.VoluntreeSubscription, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ email: username });
        }
        return true;
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(voluntreeSubscriptionPublications.VoluntreeSubscriptionAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return true;
      });
    }
  }

  /**
   * Subscription method for Subscription owned by the current user.
   */
  subscribeVoluntreeSubscription() {
    if (Meteor.isClient) {
      return Meteor.subscribe(voluntreeSubscriptionPublications.VoluntreeSubscription);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeVoluntreeSubscriptionAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(voluntreeSubscriptionPublications.VoluntreeSubscriptionAdmin);
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
export const VoluntreeSubscriptions = new VoluntreeSubscriptionCollection();
