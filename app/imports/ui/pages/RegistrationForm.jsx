import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import RegistrationFormCard from '../components/RegistrationFormCard';

const RegistrationForm = () => {
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
        <RegistrationFormCard event={events} />
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default RegistrationForm;
