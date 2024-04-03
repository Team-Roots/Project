import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import { Events } from '../../api/event/EventCollection';
import { EventSubscription } from '../../api/event/EventSubscriptionCollection';
import { Comments } from '../../api/comment/CommentCollection';

Meteor.methods({
  'comments.fetch'(filter = {}) {
    check(filter, Match.Optional(Object));
    // Assuming a simple fetch for demonstration. Adjust based on your actual logic.
    return Comments.find(filter).fetch();
  },
  'events.update'(id, eventData) {
    check(id, String);
    check(eventData, {
      name: String,
      eventDate: Date,
      category: String,
      location: String,
      startTime: String,
      endTime: String,
      coordinator: String,
      amountVolunteersNeeded: Match.Maybe(Number),
      address: String,
      locationType: String,
      image: String,
      specialInstructions: String,
      restrictions: Match.Maybe(Object),
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.update(id, { $set: eventData });
  },
  'events.delete'(eventId) {
    check(eventId, String);
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Events.remove(eventId);
  },
  'eventSubscription.insert'(eventSubscriptionInfo) {
    check(eventSubscriptionInfo, {
      email: String,
      orgID: String, // Assuming orgID is a string.
      eventName: String,
      eventDate: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    EventSubscription.insert(eventSubscriptionInfo);
  },
  'eventSubscription.unsub'(eventSubscriptionInfo) {
    check(eventSubscriptionInfo, {
      email: String,
      orgID: String,
      eventName: String,
      eventDate: String,
    });

    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    // Assuming you have logic here to identify and remove the subscription
  },
});

// The data initialization logic remains unchanged from your provided script.
