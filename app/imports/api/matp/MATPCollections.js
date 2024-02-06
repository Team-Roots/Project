import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { Events } from '../event/EventCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Skills } from '../skill/SkillCollection';
import { UserStats } from '../user/UserStatsCollection';
import { Categories } from '../category/CategoryCollection'; // Ensure this is correctly pointing to your Categories collection

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    this.collections = [
      AdminProfiles,
      Stuffs,
      Events,
      Categories, // Ensure Categories is included
      UserProfiles,
      Skills,
      UserStats,
    ];

    this.collectionLoadSequence = [
      AdminProfiles,
      UserProfiles,
      Stuffs,
      Skills,
      UserStats,
      Events,
      Categories,
    ];

    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      // Ensure that collection.getCollectionName is a valid function.
      // This requires each collection class to have a getCollectionName method.
      if (typeof collection.getCollectionName === 'function') {
        this.collectionAssociation[collection.getCollectionName()] = collection;
      } else {
        console.warn(`Collection ${collection.constructor.name} does not have getCollectionName method`);
      }
    });
  }

  publishAll() {
    this.collections.forEach((collection) => {
      // Ensure that collection.publish is a valid function.
      // This requires each collection class to have a publish method.
      if (typeof collection.publish === 'function') {
        collection.publish();
      } else {
        console.warn(`Publish method not defined for collection: ${collection.constructor.name}`);
      }
    });
  }

  getCollection(collectionName) {
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MATPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
