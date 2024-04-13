import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../../api/event/EventCollection';
import LoadingSpinner from '../../components/LoadingSpinner';
import EventCard from '../../components/EventCard';
import { EventSubscription } from '../../../api/event/EventSubscriptionCollection';

const SubscribedEvents = () => {
  const { events, subs, ready } = useTracker(() => {
    const eventsSubscription = Events.subscribeEvent();
    const subSubscription = EventSubscription.subscribeEvent();
    const rdy = eventsSubscription.ready() && subSubscription.ready();
    const eventFind = Events.collection.find({}).fetch();
    const subsEvent = EventSubscription.collection.find({}).fetch();
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
        {sEvent.map((e) => <EventCard key={e._id} e={e} collection={EventSubscription.collection} />)}
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default SubscribedEvents;
