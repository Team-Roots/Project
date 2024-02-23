import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, SelectField, DateField, LongTextField, SubmitField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/event/EventCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Events._schema);

const EditGroup = () => {
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
    const { name, since, location, coordinator, members, specialInstructions, restrictions } = data;
    Meteor.call('groups.update', _id, { name, since, location, coordinator, members, specialInstructions, restrictions }, (error) => {
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
      text: 'Once deleted, you will not be able to recover this group!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Meteor.call('events.delete', _id, (error) => {
            if (error) {
              swal('Error', error.reason, 'error');
            } else {
              swal('Your group has been permanently deleted!', { icon: 'success' });
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
    <Container id={PAGE_IDS.EDIT_GROUP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Edit Group</h2>
          <AutoForm schema={bridge} onSubmit={submit} model={doc}>
            <TextField name="name" placeholder="Event Name" />
            <DateField name="since" placeholder="Event Created" />
            <TextField name="location" placeholder="Location" />
            <TextField name="coordinator" placeholder="Coordinator's Name" />
            <SelectField name="members" placeholder="Amount of members" />
            <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
            <SubmitField value="Submit" />
            <ErrorsField />
            <Button variant="danger" onClick={handleDelete}>Delete Group Permanently</Button>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditGroup;
