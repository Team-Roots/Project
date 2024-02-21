import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

class SubscribeCollection {
  constructor() {
    this.name = 'SubscribeCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      eventId: String,
      subscribeBy: String,
    });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Subscribe = new SubscribeCollection();