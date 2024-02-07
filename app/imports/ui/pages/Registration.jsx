import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import LoadingSpinner from '../components/LoadingSpinner';
import RegistrationCard from '../components/RegistrationCard';
import { Events } from '../../api/event/EventCollection';

const Registration = () => {
  const { _id } = useParams();
  const { events, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const eventItem = Events.findOne(_id);
    return {
      events: eventItem,
      ready: rdy,
    };
  }, [_id]);

  return ready ? (
    <Container>
      <Row>
        <RegistrationCard event={events} />
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default Registration;
