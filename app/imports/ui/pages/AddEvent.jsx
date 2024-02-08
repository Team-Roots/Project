import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import BasicEventDetails from '../components/BasicEventDetails'; // Adjust the path as needed
import TimingAndCoordinator from '../components/TimingAndCoordinator'; // Adjust the path as needed
import AdditionalInformation from '../components/AdditionalInformation'; // Adjust the path as needed
import EventCard from '../components/EventCard'; // Ensure this path is correct

// Define your form schema
const eventSchema = new SimpleSchema({
  name: String,
  eventDate: {
    type: Date,
    label: 'Event Date', // Ensure the label is defined here
  },
  startTime: String,
  endTime: String,
  coordinator: String,
  category: {
    type: String,
    optional: true,
  },
  specialInstructions: {
    type: String,
    optional: true,
  },
  description: String,
  amountVolunteersNeeded: SimpleSchema.Integer,
  image: { type: String, optional: true },
});

const bridge = new SimpleSchema2Bridge(eventSchema);

const AddEvent = () => {
  const [eventPreview, setEventPreview] = useState({
    name: '',
    eventDate: new Date(),
    startTime: '',
    endTime: '',
    coordinator: '',
    description: '',
    amountVolunteersNeeded: 0,
    image: 'https://via.placeholder.com/150', // Placeholder image URL
  });

  const handleSetImageUrl = (url) => {
    setEventPreview(prevState => ({ ...prevState, image: url }));
  };

  const submit = (data) => {
    console.log(data); // For demonstration
    swal('Event Submitted', 'Your event has been submitted successfully!', 'success');
    // Implement submission logic here
  };

  return (
    <Container>
      <Row>
        {/* Form Section */}
        <Col md={6}>
          <AutoForm schema={bridge} model={eventPreview} onSubmit={submit} onChangeModel={model => setEventPreview(model)}>
            {/* Basic Event Details Card */}
            <Card className="mb-3" style={{ backgroundColor: '#22ba97' }}>
              <Card.Body>
                <h3>Basic Event Details</h3>
                <BasicEventDetails />
              </Card.Body>
            </Card>

            {/* Timing and Coordinator Card */}
            <Card className="mb-3" style={{ backgroundColor: '#22ba97' }}>
              <Card.Body>
                <h3>Timing & Coordinator</h3>
                <TimingAndCoordinator />
              </Card.Body>
            </Card>

            {/* Additional Information Card */}
            <Card className="mb-3" style={{ backgroundColor: '#22ba97' }}>
              <Card.Body>
                <h3>Additional Information</h3>
                <AdditionalInformation setUrl={handleSetImageUrl} />
              </Card.Body>
            </Card>

            <SubmitField value="Submit Event" />
            <ErrorsField />
          </AutoForm>
        </Col>

        {/* Preview Section */}
        <Col md={6}>
          <EventCard event={eventPreview} showEditLink={false} />
        </Col>
      </Row>
    </Container>
  );
};

export default AddEvent;
