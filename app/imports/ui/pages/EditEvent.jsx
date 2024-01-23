import React, { useState } from 'react';
import swal from 'sweetalert';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField, NumField, SelectField, BoolField, DateField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Events } from '../../api/event/EventCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Stuffs } from '../../api/stuff/StuffCollection';

const bridge = new SimpleSchema2Bridge(Events._schema);

/* Renders the EditEvent page for editing a single event document. */
const EditEvent = () => {
  const { _id } = useParams();
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { doc, ready } = useTracker(() => {
    // Get access to Stuff documents.
    const subscription = Events.subscribeEvent();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the document
    const document = Events.findDoc(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { name, eventDate, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions } = data;
    const collectionName = Events.getCollectionName();
    const updateData = { id: _id, name, eventDate, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, restrictions };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Event updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Edit Event</h2>
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <TextField name="name" placeholder="Event Name" />
            <DateField name="eventDate" placeholder="Event Date" />
            <TextField name="category" placeholder="Category" />
            <TextField name="location" placeholder="Event Location" />
            <TextField name="startTime" placeholder="Start Time" />
            <TextField name="endTime" placeholder="End Time" />
            <TextField name="coordinator" placeholder="Coordinator's Name" />
            <SelectField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
            <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
            {/* Add fields for restrictions if needed */}
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
