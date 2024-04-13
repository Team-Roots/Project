import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventPublications = {
  event: 'Event',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      name: String,
      description: String,
      image: String,
      eventDate: Date,
      startTime: String,
      endTime: String,
      location: String,
      amountVolunteersNeeded: Number,
      isOnline: Boolean,
      coordinator: String,
      specialInstructions: {
        type: String,
        optional: true,
      },
      restrictions: {
        type: Object,
        optional: true,
        blackbox: true,
      },
      backgroundCheck: {
        type: Boolean,
        defaultValue: false,
        required: true,
      },
      ageRange: {
        type: Object,
        required: false,
      },
      'ageRange.min': {
        type: SimpleSchema.Integer,
        required: false,
        min: 0,
        defaultValue: 1,
      },
      'ageRange.max': {
        type: SimpleSchema.Integer,
        required: false,
        max: 99,
        defaultValue: 99,
      },
      organizationID: SimpleSchema.Integer,
      creator: String,
    }));
  }

  define({ name, description, image, eventDate, startTime, endTime, location, amountVolunteersNeeded, isOnline, coordinator, specialInstructions, restrictions, backgroundCheck, ageRange, organizationID, creator }) {
    const existingEvent = this._collection.findOne({ name, eventDate, startTime });
    if (existingEvent) {
      throw new Meteor.Error(`Inserting event ${name} failed because ${existingEvent.name} is already an event on ${existingEvent.eventDate} and ${existingEvent.startTime}`);
    } else {
      const docID = this._collection.insert({
        name,
        description,
        image, eventDate,
        startTime, endTime,
        location,
        amountVolunteersNeeded,
        isOnline,
        coordinator,
        specialInstructions,
        restrictions,
        backgroundCheck,
        ageRange,
        organizationID,
        creator,
      });
      return docID;
    }
  }

  // eslint-disable-next-line no-unused-vars
  update(docID, { name, description, image, eventDate, startTime, endTime, location, amountVolunteersNeeded, isOnline, coordinator, specialInstructions, restrictions, backgroundCheck, ageRange, organizationID, creator }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (description) {
      updateData.description = description;
    }
    if (image) {
      updateData.image = image;
    }
    if (eventDate) {
      updateData.eventDate = eventDate;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    if (location) {
      updateData.location = location;
    }
    if (amountVolunteersNeeded) {
      updateData.amountVolunteersNeeded = amountVolunteersNeeded;
    }
    if (isOnline) {
      updateData.isOnline = isOnline;
    }
    if (coordinator) {
      updateData.coordinator = coordinator;
    }
    if (specialInstructions) {
      updateData.specialInstructions = specialInstructions;
    }
    if (restrictions) {
      updateData.restrictions = restrictions;
    }
    if (backgroundCheck) {
      updateData.backgroundCheck = backgroundCheck;
    }
    if (ageRange) {
      updateData.ageRange = ageRange;
    }
    if (ageRange) {
      updateData.restrictions = restrictions;
    }
    if (organizationID) {
      updateData.organizationID = organizationID;
    }
    if (creator) {
      updateData.creator = creator;
    }
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
      Meteor.publish(eventPublications.event, function publish() {
        return instance._collection.find();
      });
    }
  }

  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  assertValidRoleForMethod(userId) {
    this.assertRole(userId, [ROLE.ADMIN, ROLE.USER]);
  }

  dumpOne(docID) {
    const doc = this.findDoc(docID);
    const name = doc.name;
    const description = doc.description;
    const image = doc.image;
    const eventDate = doc.eventDate;
    const startTime = doc.startTime;
    const endTime = doc.endTime;
    const location = doc.location;
    const amountVolunteersNeeded = doc.amountVolunteersNeeded;
    const isOnline = doc.isOnline;
    const coordinator = doc.coordinator;
    const specialInstructions = doc.specialInstructions;
    const restrictions = doc.restrictions;
    const backgroundCheck = doc.backgroundCheck;
    const ageRange = doc.ageRange;
    const organizationID = doc.organizationID;
    const creator = doc.creator;

    return { name, description, image, eventDate, startTime, endTime, location, amountVolunteersNeeded, isOnline, coordinator, specialInstructions, restrictions, backgroundCheck, ageRange, organizationID, creator };
  }
}

export const Events = new EventCollection();
