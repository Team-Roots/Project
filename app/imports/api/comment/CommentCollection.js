import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

// Define a schema for the collection (optional)
const commentSchema = new SimpleSchema({
  comment: String,
  owner: String,
  createdAt: Date,
});

Comments.attachSchema(commentSchema);

if (Meteor.isServer) {
  Meteor.methods({
    'comments.insert'(data) {
      check(data, {
        comment: String,
        owner: String,
        createdAt: Date,
      });

      Comments.insert(data);
    },
  });

  Meteor.publish('comments', function publishComments() {
    return Comments.find();
  });
}
