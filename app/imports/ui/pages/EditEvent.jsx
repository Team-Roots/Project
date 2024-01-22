import React from 'react';
import swal from 'sweetalert';
import { Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useParams } from 'react-router';
import { Events } from '../../api/event/EventCollection';
import { updateMethod } from '../../api/base/BaseCollection.methods';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

const bridge = new SimpleSchema2Bridge(Events._schema);

/* Renders the EditEvent page for editing a single event document. */
const EditEvent = () => {
  const { _id } = useParams();
  const { ready } = useTracker(() => {
    const subscription = Events.subscribeEvents();
    const rdy = subscription.ready();
    const document = Events.findOne(_id);
    return {
      doc: document,
      ready: rdy,
    };
  }, [_id]);

  const submit = (data) => {
    const { eventName, eventDate, eventLocation, eventDescription } = data;
    const collectionName = Events.getCollectionName();
    const updateData = { id: _id, eventName, eventDate, eventLocation, eventDescription };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Event updated successfully', 'success'));
  };

  return ready ? (
    <Container id={PAGE_IDS.EDIT_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Edit Event</h2>
          <AutoForm ref={ref => setFormRef(ref)} schema={bridge} onSubmit={data => submit(data)}>
            <TextField name="eventName" placeholder="Event Name" />
            <LongTextField name="eventDescription" placeholder="Event Description" />
            <TextField name="eventLocation" placeholder="Event Location" />
            <TextField name="eventCoordinatorName" placeholder="Coordinator's Name" />
            <TextField name="eventCoordinatorContact" placeholder="Coordinator's Contact Info" />
            <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
            <SubmitField value="Submit" />
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;
