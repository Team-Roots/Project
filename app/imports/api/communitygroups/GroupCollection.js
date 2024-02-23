import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

export const groupPublications = {
  group: 'Group',
  groupAdmin: 'GroupAdmin',
};

class GroupCollection extends BaseCollection {
  constructor() {
    super('Groups', new SimpleSchema({
      name: String,
      groupDate: Date,
      description: String,
      category: String,
      location: String,
      coordinator: String,
      amountVolunteersNeeded: Number,
      isOnline: Boolean,
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
      ageRange: {
        type: Object,
        required: false,
      },
      'ageRange.min': {
        type: SimpleSchema.Integer,
        required: false,
        defaultValue: 1,
      },
      'ageRange.max': {
        type: SimpleSchema.Integer,
        required: false,
        defaultValue: 99,
      },
    }));
  }

  define({ name, groupDate, description, owner, category, location, coordinator, amountVolunteersNeeded, specialInstructions, restrictions, image, ageRange, isOnline }) {
    const docID = this._collection.insert({
      name,
      groupDate,
      description,
      owner,
      category,
      location,
      coordinator,
      amountVolunteersNeeded,
      specialInstructions,
      restrictions,
      ageRange,
      isOnline,
      image,
    });
    return docID;
  }

  // eslint-disable-next-line no-unused-vars
  update(docID, { name, groupDate, description, owner, category, location, coordinator, amountVolunteersNeeded, specialInstructions, restrictions, ageRange, isOnline, image }) {
    const updateData = {};
    if (name) {
      updateData.name = name;
    }
    if (groupDate) {
      updateData.groupDate = groupDate;
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
    if (ageRange) {
      updateData.ageRange = ageRange;
    }
    if (isOnline) {
      updateData.isOnline = isOnline;
    }
    if (ageRange) {
      updateData.restrictions = restrictions;
    }
    if (owner) {
      updateData.owner = owner;
    }
    this._collection.update(docID, { $set: updateData });
  }

  removeIt(docID) {
    check(docID, String);
    const doc = this._collection.findOne(docID);
    if (!doc) {
      throw new Meteor.Error('group not found', 'Cannot remove a non-existent group.');
    }
    this._collection.remove(docID);
    return true;
  }

  publish() {
    if (Meteor.isServer) {
      const instance = this;
      Meteor.publish(groupPublications.group, function publish() {
        return instance._collection.find();
      });

      Meteor.publish(groupPublications.groupAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  subscribeGroup() {
    if (Meteor.isClient) {
      return Meteor.subscribe(groupPublications.group);
    }
    return null;
  }

  subscribeGroupAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(groupPublications.groupAdmin);
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
    const groupDate = doc.groupDate;
    const category = doc.category;
    const coordinator = doc.coordinator;
    const amountVolunteersNeeded = doc.amountVolunteersNeeded;
    const specialInstructions = doc.specialInstructions;
    const restrictions = doc.restrictions;
    const ageRange = doc.ageRange;
    const isOnline = doc.isOnline;
    const image = doc.image;

    return { name, groupDate, description, owner, category, location, coordinator, amountVolunteersNeeded, specialInstructions, restrictions, ageRange, isOnline, image };
  }
}

export const Groups = new GroupCollection();
