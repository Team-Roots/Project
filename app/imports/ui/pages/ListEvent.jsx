import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import EventItem from '../components/EventItem';
import { PAGE_IDS } from '../utilities/PageIDs';

const ListEvent = () => {
  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const eventItems = Events.find({}, { sort: { eventName: 1 } }).fetch();
    return {
      events: eventItems,
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
    <Container id={PAGE_IDS.LIST_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">List Events</h2>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Event Name</th>
              <th>Event Date</th>
              <th>Event Location</th>
              <th>Event Description</th>
              <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event) => <EventItem key={event._id} event={event} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ListEvent;
