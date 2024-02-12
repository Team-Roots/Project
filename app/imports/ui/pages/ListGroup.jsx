import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import EventItem from '../components/EventItem';
import { PAGE_IDS } from '../utilities/PageIDs';

const ListGroup = () => {
  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const eventItems = Events.find({}, { sort: { name: 1 } }).fetch(); // Assuming the sort field is `name`
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
            <div>Loading Groups...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container id={PAGE_IDS.LIST_GROUP} className="py-3">
      <Row className="justify-content-center">
        <Col md={8}>
          <h2 className="text-center">List Groups</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Since</th>
                <th>Location</th>
                <th>Coordinator</th>
                <th>Participants</th>
                <th>Special Instructions</th>
                <th>Like</th>
                <th>Comment</th>
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

export default ListGroup;
