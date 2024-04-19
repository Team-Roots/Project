import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection'; // Make sure this path is correct
import StuffItemAdmin from '../components/StuffItemAdmin';
import EventItem from '../components/EventItem'; // Ensure this component is correctly imported
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const Admin = () => {
  const { stuffs, events, ready } = useTracker(() => {
    const stuffSubscription = Stuffs.subscribeStuffAdmin();
    const eventSubscription = Events.subscribeEvent(); // Assuming you have a similar function in your Events collection
    const stuffItems = Stuffs.find({}).fetch();
    const eventItems = Events.find({}).fetch(); // Adjust according to your actual query

    // Make sure both subscriptions are ready
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
        <Col md={12}>
          <h2 className="text-center">List Events</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Category</th>
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
