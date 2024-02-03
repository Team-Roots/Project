import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Meteor } from 'meteor/meteor';

export const Categories = new Mongo.Collection('categories');

Categories.schema = new SimpleSchema({
  name: {
    type: String,
    unique: true,
  },
});

Categories.attachSchema(Categories.schema);

if (Meteor.isServer) {
  // Publish the categories data
  Meteor.publish('Categories', function publish() {
    return Categories.find();
  });

  // Default categories for volunteer events
  const defaultCategories = [
    'Community Service',
    'Environmental Conservation',
    'Healthcare Support',
    'Animal Welfare',
    'Youth Mentorship',
    'Elderly Assistance',
    'Disaster Relief',
    'Cultural Preservation',
    'Homeless Support',
    'Educational Programs',
  ];

  // Prefill the collection with default categories
  if (Categories.find().count() === 0) {
    defaultCategories.forEach(categoryName => {
      Categories.insert({ name: categoryName });
    });
  }
}
