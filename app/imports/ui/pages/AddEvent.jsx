import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, DateField, LongTextField, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Events } from '../../api/event/EventCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  eventName: String,
  eventDescription: String,
  eventDate: Date,
  eventTimeStart: Date,
  eventTimeEnd: Date,
  eventLocation: String,
  eventCoordinatorName: String,
  eventCoordinatorContact: String,
  specialInstructions: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/* Renders the AddEvent page for adding an event. */
const AddEvent = () => {
  const [formRef, setFormRef] = useState(null);

  // On submit, insert the data.
  const submit = (data) => {
    // Ensure all date fields are valid Date objects
    data.eventDate = new Date(data.eventDate);
    data.eventTimeStart = new Date(data.eventTimeStart);
    data.eventTimeEnd = new Date(data.eventTimeEnd);

    const owner = Meteor.user().username;
    const collectionName = Events.getCollectionName();
    const definitionData = { ...data, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        formRef.reset();
      });
  };

  return (
    <Container id={PAGE_IDS.ADD_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Add Event</h2>
              <AutoForm
                ref={ref => setFormRef(ref)} schema={bridge} onSubmit={data => submit(data)}>
                <TextField name="eventName" placeholder="Event Name" />
                <LongTextField name="eventDescription" placeholder="Event Description" />
                <DateField name="eventDate" placeholder="Event Date" />
                <DateField name="eventTimeStart" placeholder="Start Time" />
                <DateField name="eventTimeEnd" placeholder="End Time" />
                <TextField name="eventLocation" placeholder="Event Location" />
                <TextField name="eventCoordinatorName" placeholder="Coordinator's Name" />
                <TextField name="eventCoordinatorContact" placeholder="Coordinator's Contact Info" />
                <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </AutoForm>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
