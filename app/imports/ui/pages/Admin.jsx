import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../../api/event/EventCollection';
import StuffItemAdmin from '../components/StuffItemAdmin';
import EventItem from '../../components/EventItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const Admin = () => {
  const { stuffs, events, ready } = useTracker(() => {
    // Subscription for stuff data
    const stuffSubscription = Stuffs.subscribeStuffAdmin();
    const stuffItems = Stuffs.find({}).fetch();

    // Subscription for event data
    const eventSubscription = Events.subscribeEvent();
    const eventItems = Events.find({}, { sort: { name: 1 } }).fetch(); // Assuming the sort field is `name`

    return {
      stuffs: stuffItems,
      events: eventItems,
      ready: stuffSubscription.ready() && eventSubscription.ready(),
    };
  }, []);

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
      <Row className="justify-content-center">
        {/* Stuff Table */}
        <Col md={7}>
          <h2 className="text-center">List Stuff (Admin)</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => <StuffItemAdmin key={stuff._id} stuff={stuff} />)}
            </tbody>
          </Table>
        </Col>

        {/* Event Table */}
        <Col md={12}>
          <h2 className="text-center">List Events</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Location</th>
                <th>Coordinator</th>
                <th>Volunteers Needed</th>
                <th>Special Instructions</th>
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

export default Admin;
