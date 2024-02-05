import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';
import { ROLE } from '../role/Role';

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
    }, { check });
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
      Meteor.publish(categoryPublications.category, function publish() {
        return Categories.collection.find();
      });

      Meteor.publish(categoryPublications.categoryAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, ROLE.ADMIN)) {
          return Categories.collection.find();
        }
        return this.ready();
      });
    }
  }
}

export const Categories = new CategoryCollection();
