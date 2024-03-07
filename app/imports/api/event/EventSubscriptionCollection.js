import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventSubscriptionPublications = {
  eventSubscription: 'EventSubscription',
  eventSubscriptionAdmin: 'EventSubscriptionAdmin',
};

class EventSubscriptionCollection extends BaseCollection {
  constructor() {
    super('EventSubscription', new SimpleSchema({
      subscriptionInfo: {
        type: Object,
        required: true,
        unique: true,
      },
      'subscriptionInfo.email': {
        type: String,
        required: true,
      },
      'subscriptionInfo.orgID': {
        type: SimpleSchema.Integer,
        required: true,
      },
      'subscriptionInfo.eventName': {
        type: String,
        required: true,
      },
      'subscriptionInfo.eventDate': {
        type: String,
        required: true,
      },
    }));
  }

  define({ subscriptionInfo }) {
    const docID = this._collection.insert({
      subscriptionInfo,
    });
    return docID;
  }

  unsub({ subscriptionInfo }) {
    const doc = this._collection.findOne({ subscriptionInfo: subscriptionInfo });
    console.log(doc);
    if (!doc) {
      throw new Meteor.Error('Event not found', 'Cannot remove a non-existent event.');
    }
    this._collection.remove(doc._id);
    return true;
  }

  // eslint-disable-next-line no-unused-vars
  update(docID, { subscriptionInfo }) {
    const updateData = {};
    updateData.subscriptionInfo = subscriptionInfo;
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(docID) {
    check(docID, String);
    const doc = this._collection.findOne(docID);
    if (!doc) {
      throw new Meteor.Error('Event not found', 'Cannot remove a non-existent event.');
    }
    this._collection.remove(docID);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(eventSubscriptionPublications.eventSubscription, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ 'subscriptionInfo.email': username });
        }
        return this.ready();
      });

      Meteor.publish(eventSubscriptionPublications.eventSubscriptionAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventSubscriptionPublications.eventSubscription);
    }
    return null;
  }

  subscribeEventAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventSubscriptionPublications.eventSubscriptionAdmin);
    }
    return null;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const subscriptionInfo = doc.subscriptionInfo;
    return { subscriptionInfo };
  }
}

export const EventSubscription = new EventSubscriptionCollection();
