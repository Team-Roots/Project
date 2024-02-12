import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// Define the default profile picture URL or path as a constant
const defaultProfilePicture = 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';

class ProfileCollection {
  constructor() {
    this.name = 'ProfileCollection';
    this.collection = new Mongo.Collection(this.name);

    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      idNumber: String,
      owner: String,
      profilePicture: {
        type: String,
        optional: true, // Making it optional
        defaultValue: defaultProfilePicture, // Use the constant here
      },
    });

    this.collection.attachSchema(this.schema);

    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the ProfileCollection.
 * @type {ProfileCollection}
 */
export const Profiles = new ProfileCollection();
