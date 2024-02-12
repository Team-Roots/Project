import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const eventPublications = {
  event: 'Event',
  eventAdmin: 'EventAdmin',
};

class EventCollection extends BaseCollection {
  constructor() {
    super('Events', new SimpleSchema({
      name: String,
      eventDate: Date,
      description: String,
      category: String,
      location: String,
      startTime: String,
      endTime: String,
      coordinator: String,
      amountVolunteersNeeded: Number,
      address: String,
      locationType: String,
      image: String,
      specialInstructions: {
        type: String,
        optional: true,
      },
      restrictions: {
        type: Object,
        optional: true,
        blackbox: true,
      },
      owner: String,
    }));
  }

  define({ name, eventDate, description, owner, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions, address, locationType, image }) {
    const docID = this._collection.insert({
      name,
      eventDate,
      description,
      owner,
      category,
      location,
      startTime,
      endTime,
      coordinator,
      amountVolunteersNeeded,
      specialInstructions,
      restrictions,
      address,
      locationType,
      image,
    });
    return docID;
  }

  update(docID, { name, eventDate, description, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (eventDate) {
      updateData.eventDate = eventDate;
    }
    if (description) {
      updateData.description = description;
    }
    if (category) {
      updateData.category = category;
    }
    if (location) {
      updateData.location = location;
    }
    if (startTime) {
      updateData.startTime = startTime;
    }
    if (endTime) {
      updateData.endTime = endTime;
    }
    if (coordinator) {
      updateData.coordinator = coordinator;
    }
    if (amountVolunteersNeeded) {
      updateData.amountVolunteersNeeded = amountVolunteersNeeded;
    }
    if (specialInstructions) {
      updateData.specialInstructions = specialInstructions;
    }
    if (restrictions) {
      updateData.restrictions = restrictions;
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
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      Meteor.publish(eventPublications.eventAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeEvent() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.event);
    }
    return null;
  }

  subscribeEventAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(eventPublications.eventAdmin);
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
    const location = doc.location;
    const owner = doc.owner;
    const eventDate = doc.eventDate;
    return { name, description, location, owner, eventDate };
  }
}

export const Events = new EventCollection();
