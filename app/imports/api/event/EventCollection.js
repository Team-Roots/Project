import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import BaseCollection from '../base/BaseCollection';

export const categoryPublications = {
  category: 'Category',
  categoryAdmin: 'CategoryAdmin',
};

class CategoryCollection extends BaseCollection {
  constructor() {
    const name = 'Categories';
    const schema = new SimpleSchema({
      name: String,
    });
    super(name, schema);

    // Default categories for volunteer events
    this.defaultCategories = [
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

    if (Meteor.isServer) {
      this.publish();
    }
  }

  publish() {
    if (Meteor.isServer) {
      Meteor.publish(categoryPublications.category, () => this._collection.find());
      // Additional publication logic for admin can be added here
    }
  }

  subscribeCategory() {
    if (Meteor.isClient) {
      return Meteor.subscribe(categoryPublications.category);
    }
    return null;
  }

  define({ name }) {
    return this._collection.insert({ name });
  }

  // Implement any additional methods needed for CategoryCollection
}

export const Categories = new CategoryCollection();
