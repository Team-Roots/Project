import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../stuff/StuffCollection';
import { Events } from '../event/EventCollection';
import { AdminProfiles } from '../user/AdminProfileCollection';
import { UserProfiles } from '../user/UserProfileCollection';
import { Organizations } from '../organization/OrganizationCollection';
import { Skills } from '../skill/SkillCollection';
import { UserStats } from '../user/UserStatisticsCollection';
import { OrganizationAdmin } from '../organization/OrganizationAdmin';
import { OrganizationWaiver } from '../organization/OrganizationWaiver';
import { EventSubscription } from '../event/EventSubscriptionCollection';
import { VoluntreeSubscriptions } from '../subscription/VoluntreeSubscriptionCollection';

class MATPClass {
  collections;

  collectionLoadSequence;

  collectionAssociation;

  constructor() {
    // list of all the MATPCollections collections
    this.collections = [
      AdminProfiles,
      Stuffs,
      Events,
      UserProfiles,
      Organizations,
      OrganizationAdmin,
      OrganizationWaiver,
      Skills,
      UserStats,
      EventSubscription,
      VoluntreeSubscriptions,
    ];
    /*
     * A list of collection class instances in the order required for them to be sequentially loaded from a file.
     */
    this.collectionLoadSequence = [
      Organizations,
      OrganizationAdmin,
      OrganizationWaiver,
      AdminProfiles,
      UserProfiles,
      Stuffs,
      Skills,
      UserStats,
      Events,
      EventSubscription,
      VoluntreeSubscriptions,
    ];

    /*
     * An object with keys equal to the collection name and values the associated collection instance.
     */
    this.collectionAssociation = {};
    this.collections.forEach((collection) => {
      this.collectionAssociation[collection.getCollectionName()] = collection;
    });

  }

  /**
   * Return the collection class instance given its name.
   * @param collectionName The name of the collection.
   * @returns The collection class instance.
   * @throws { Meteor.Error } If collectionName does not name a collection.
   */
  getCollection(collectionName) {
    // console.log('MATPCollections', collectionName, this.collectionAssociation);
    const collection = this.collectionAssociation[collectionName];
    if (!collection) {
      throw new Meteor.Error(`Called MARTPCollections.getCollection with unknown collection name: ${collectionName}`);
    }
    return collection;
  }
}

export const MATPCollections = new MATPClass();
