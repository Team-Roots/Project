import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const categoryPublications = {
  category: 'Category',
  categoryAdmin: 'CategoryAdmin',
};

class CategoryCollection extends BaseCollection {
  constructor() {
    super('Categories');
    this.collection = new Mongo.Collection('categories');
    this.schema = new SimpleSchema({
      name: String,
    });
    this.collection.attachSchema(this.schema);

    if (Meteor.isServer) {
      this.publish();
      this.prefillCategories();
    }
  }

  define(categoryData) {
    const { name } = categoryData;
    const existingCategory = this.collection.findOne({ name });
    if (existingCategory) {
      return existingCategory._id;
    }
    return this.collection.insert({ name });
  }

  prefillCategories() {
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

    defaultCategories.forEach((categoryName) => {
      const existingCategory = this.collection.findOne({ name: categoryName });
      if (!existingCategory) {
        this.collection.insert({ name: categoryName });
      }
    });
  }

  publish() {
    if (Meteor.isServer) {
      Meteor.publish(categoryPublications.category, () => this.collection.find());

      Meteor.publish(categoryPublications.categoryAdmin, function () {

        return this.collection.find();

        // eslint-disable-next-line no-unreachable
        return this.ready();
      });
    }
  }
}

export const Categories = new CategoryCollection();
