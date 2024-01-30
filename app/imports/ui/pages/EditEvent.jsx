import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, SelectField, DateField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Events._schema);

const EditEvent = () => {
  const { _id } = useParams();
  const navigate = useNavigate();

  const { ready, doc } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const document = Events.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { name, eventDate, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions } = data;
    Meteor.call('events.update', _id, { name, eventDate, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions }, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Event updated successfully', 'success');
      }
    });
  };

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this event!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        Meteor.call('events.remove', _id, (error) => {
          if (error) {
            swal('Error', error.reason, 'error');
          } else {
            swal('Your event has been deleted!', { icon: 'success' });
            navigate('/events'); // Corrected usage of navigate
          }
        });
      }
    });
  };

  if (!ready) {
    return <LoadingSpinner />;
  }

  return (
    <Container id={PAGE_IDS.EDIT_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Edit Event</h2>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <TextField name="name" placeholder="Event Name" />
            <DateField name="eventDate" placeholder="Event Date" />
            <TextField name="category" placeholder="Category" />
            <TextField name="location" placeholder="Event Location" />
            <TextField name="startTime" placeholder="Start Time" />
            <TextField name="endTime" placeholder="End Time" />
            <TextField name="coordinator" placeholder="Coordinator's Name" />
            <SelectField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
            <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
