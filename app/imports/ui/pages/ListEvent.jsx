import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import EventItem from '../components/EventItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Event documents. Use <EventItem> to render each row. */
const ListEvent = () => {
  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvents(); // Make sure you have a subscribeEvents method
    const rdy = subscription.ready();
    const eventItems = Events.find({}, { sort: { eventName: 1 } }).fetch();
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id={PAGE_IDS.LIST_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">List Events</h2>
          <Table striped bordered hover>
            <thead>
            <tr>
              <th>Event Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Details</th>
            </tr>
            </thead>
            <tbody>
            {events.map((event) => <EventItem key={event._id} event={event} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading Events" />);
};

export default ListEvent;
