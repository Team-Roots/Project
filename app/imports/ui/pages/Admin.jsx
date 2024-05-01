import React from 'react';
import { Col, Container, Row, Table, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/StuffCollection';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import EventItem from '../components/EventItem';
import { PAGE_IDS } from '../utilities/PageIDs';

const Admin = () => {
  const { stuffs, events, readyStuffs, readyEvents } = useTracker(() => {
    const stuffSubscription = Stuffs.subscribeStuffAdmin();
    const eventSubscription = Events.subscribeEvent();
    return {
      stuffs: Stuffs.find({}).fetch(),
      events: Events.find({}).fetch(),
      readyStuffs: stuffSubscription.ready(),
      readyEvents: eventSubscription.ready(),
    };
  }, []);

  const handleDeleteStuff = (stuffId) => {
    Meteor.call('stuffs.remove', stuffId, (error) => {
      if (error) {
        alert('Error deleting stuff:', error.reason);
      } else {
        alert('Stuff deleted successfully!');
      }
    });
  };

  const handleEditStuff = (stuffId) => {
    alert(`Edit functionality not implemented for ID: ${stuffId}`);
  };

  const handleDeleteEvent = (eventId) => {
    Meteor.call('events.remove', eventId, (error) => {
      if (error) {
        alert('Error deleting event:', error.reason);
      } else {
        alert('Event deleted successfully!');
      }
    });
  };

  if (!readyStuffs || !readyEvents) {
    return <LoadingSpinner />;
  }

  return (
    <Container id={PAGE_IDS.LIST_STUFF_ADMIN} className="py-3">
      <Row className="justify-content-center">
        <Col md={12}>
          <h2 className="text-center">List Stuff (Admin)</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Quantity</th>
                <th>Condition</th>
                <th>Owner</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {stuffs.map((stuff) => (
                <tr key={stuff._id}>
                  <td>{stuff.name}</td>
                  <td>{stuff.quantity}</td>
                  <td>{stuff.condition}</td>
                  <td>{stuff.owner}</td>
                  <td>
                    <Button variant="info" onClick={() => handleEditStuff(stuff._id)}>Edit</Button>
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDeleteStuff(stuff._id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col md={12}>
          <h2 className="text-center">Admin Events</h2>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => <EventItem key={event._id} event={event} onDelete={handleDeleteEvent} />)}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
