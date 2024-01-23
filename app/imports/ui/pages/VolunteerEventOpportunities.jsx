import React from 'react';
import { Container, Row, Col, FormCheck } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection'; // Import your EventCollection
import EventCard from '../components/EventCard';
import { PAGE_IDS } from '../utilities/PageIDs';

const VolunteerEventOpportunities = () => {
  const { events, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    return {
      events: Events.find({}).fetch(),
      ready: rdy,
    };
  }, []);
  if (!ready) {
    return (
      <Container id={PAGE_IDS.LIST_EVENT} className="py-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <div>Loading Events...</div>
          </Col>
        </Row>
      </Container>
    );
  }
  return (
    <Container className="py-3">
      <Row>
        <h2 className="text-center">Volunteer Event Opportunities</h2>
      </Row>
      <Row>
        <Col md={2} lg={2}>
          <h3>Filter By</h3>
          <h4>Location</h4>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Within 1 Mile</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Within 5 Miles</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Within 10 Miles</FormCheckLabel>
          </FormCheck>
          <h4>Category</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Animal Shelter</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Clean Up</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Food Distribution</FormCheckLabel>
          </FormCheck>
          <br />
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>
              <h5>Need Background Check</h5>
            </FormCheckLabel>
          </FormCheck>
        </Col>
        <Col>
          {!ready ? (
            <div>Loading Events...</div>
          ) : (
            events.map(event => (
              <Row key={event._id} className="m-1">
                <EventCard event={event} />
              </Row>
            ))
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerEventOpportunities;
