import React from 'react';
import swal from 'sweetalert';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, HiddenField, DateField, LongTextField, SubmitField, TextField } from 'uniforms-bootstrap5';
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
  const { doc, ready } = useTracker(() => {
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
          <AutoForm schema={bridge} onSubmit={data => submit(data)} model={doc}>
            <Card>
              <Card.Body>
                <TextField name="eventName" />
                <DateField name="eventDate" />
                <TextField name="eventLocation" />
                <LongTextField name="eventDescription" />
                <SubmitField value="Submit" />
                <ErrorsField />
                <HiddenField name="owner" />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default EditEvent;

