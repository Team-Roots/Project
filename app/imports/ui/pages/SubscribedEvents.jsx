import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import { Subscribe } from '../../api/event/Subscribe';
import LoadingSpinner from '../components/LoadingSpinner';
import EventCard from '../components/EventCard';

const SubscribedEvents = () => {
  const { events, subs, ready } = useTracker(() => {
    const eventsSubscription = Meteor.subscribe(Events.allPublicationName);
    const subSubscription = Meteor.subscribe(Subscribe.userPublicationName);
    const rdy = eventsSubscription.ready() && subSubscription.ready();
    const eventFind = Events.collection.find({}).fetch();
    const subsEvent = Subscribe.collection.find({}).fetch();
    return {
      events: eventFind,
      subs: subsEvent,
      ready: rdy,
    };
  }, []);

  const sEvent = subs.map((subsEvent) => events.find((event) => subsEvent.eventId === event._id));

  return (ready ? (
    <Container className="py-3">
      <Row className="justify-content-center">
        {sEvent.map((e) => <EventCard key={e._id} e={e} collection={Subscribe.collection} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default SubscribedEvents;
