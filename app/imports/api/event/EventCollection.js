import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { Roles } from 'meteor/alanning:roles';
import { ROLE } from '../role/Role';

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      eventName: String,
      eventDescription: String,
      eventDates: {
        type: Array,
        optional: true,
      },
      'eventDates.$': {
        type: Date,
      },
      eventTimeStart: Date,
      eventTimeEnd: Date,
      eventLocation: String,
      eventCoordinator: {
        type: Object,
        optional: true,
      },
      'eventCoordinator.name': String,
      'eventCoordinator.contactInfo': String,
      specialInstructions: {
        type: String,
        optional: true,
      },
    }));
  }

  define({ eventName, eventDescription, eventDates, eventTimeStart, eventTimeEnd, eventLocation, eventCoordinator, specialInstructions }) {
    const docID = this._collection.insert({
      eventName,
      eventDescription,
      eventDates,
      eventTimeStart,
      eventTimeEnd,
      eventLocation,
      eventCoordinator,
      specialInstructions,
    });
    return docID;
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

      // Publish all events
      Meteor.publish('allEvents', function publish() {
        if (this.userId) {
          return instance._collection.find();
        }
        return this.ready();
      });

      // Publish events based on specific roles, like Admin
      Meteor.publish('adminEvents', function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }
}

export const Events = new EventCollection();
