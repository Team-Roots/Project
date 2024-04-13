import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import BasicEventDetails from '../../components/BasicEventDetails'; // Adjust the path as needed
import TimingAndCoordinator from '../../components/TimingAndCoordinator'; // Adjust the path as needed
import AdditionalInformation from '../../components/AdditionalInformation'; // Adjust the path as needed
import EventCard from '../../components/EventCard'; // Ensure this path is correct
import { Events } from '../../../api/event/EventCollection';

// Define your form schema
const eventSchema = new SimpleSchema({
  name: String,
  description: String,
  image: {
    type: String,
    optional: true,
  },
  eventDate: Date,
  startTime: String,
  endTime: String,
  location: String,
  amountVolunteersNeeded: SimpleSchema.Integer,
  isOnline: Boolean,
  coordinator: String,
  category: {
    type: String,
    allowedValues: ['Animal Shelter', 'Clean Up', 'Donation', 'Food Distribution', 'Charity'],
  },
  specialInstructions: {
    type: String,
    optional: true,
  },
  restrictions: {
    type: String,
    optional: true,
  },
  backgroundCheck: Boolean,
  ageRange: Object,
  'ageRange.min': SimpleSchema.Integer,
  'ageRange.max': SimpleSchema.Integer,
});

const bridge = new SimpleSchema2Bridge(eventSchema);

const AddEvent = () => {
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');

  const initialFormState = {
    name: '',
    description: '',
    image: 'https://via.placeholder.com/150', // Placeholder image URL
    eventDate: new Date(),
    startTime: '',
    endTime: '',
    location: '',
    amountVolunteersNeeded: 0,
    isOnline: false,
    coordinator: '',
    category: '',
    specialInstructions: '',
    restrictions: '',
    backgroundCheck: false,
    ageRange: {
      min: 0,
      max: 99,
    },
  };

  const [eventPreview, setEventPreview] = useState(initialFormState);

  const categoryOptions = [
    { label: 'Community Cleanup', value: 'community_cleanup' },
    { label: 'Food Drive', value: 'food_drive' },
    { label: 'Charity Run/Walk', value: 'charity_run_walk' },
    { label: 'Tree Planting', value: 'tree_planting' },
    { label: 'Animal Welfare', value: 'animal_welfare' },
    { label: 'Educational Tutoring', value: 'educational_tutoring' },
    { label: 'Elderly Assistance', value: 'elderly_assistance' },
    { label: 'Environmental Conservation', value: 'environmental_conservation' },
    { label: 'Healthcare Support', value: 'healthcare_support' },
    { label: 'Arts and Culture', value: 'arts_and_culture' },
    { label: 'Sports and Recreation', value: 'sports_and_recreation' },
    { label: 'Disaster Relief', value: 'disaster_relief' },
    { label: 'Technology and Innovation', value: 'technology_innovation' },
    { label: 'Legal Aid and Human Rights', value: 'legal_aid_human_rights' },
  ];

  const handleSetImageUrl = (url) => {
    setCloudinaryUrl(url); // Ensure you're setting the Cloudinary URL correctly for submission
    setEventPreview(prevState => ({ ...prevState, image: url }));
  };

  const handleSelectAddress = (address, latLng) => {
    console.log('Address selected: ', address);
    console.log('Coordinates: ', latLng);
    // Update the event preview state with the address and latLng
    setEventPreview(prevState => ({
      ...prevState,
      location: { address, latLng }, // Adjust according to your schema requirements
    }));
  };

  // Example onChange function
  const handleChange = (field, value) => {
    console.log(`${field} changed to ${value}`);
    // Update form state or perform other actions as needed
  };

  const submit = (data) => {
    // Include new fields in the submission data structure
    const { name, eventDate, description, category, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, image, isOnline, ageRange } = data;
    const imageUrl = cloudinaryUrl || image;

    // Construct the submission object with new fields
    const definitionData = {
      name,
      eventDate,
      description,
      category,
      location: eventPreview.location.address,
      startTime,
      endTime,
      coordinator,
      amountVolunteersNeeded,
      specialInstructions,
      image: imageUrl,
      isOnline,
      ageRange,
      owner: Meteor.user().username,
    };

    // Call to defineMethod with updated definitionData
    defineMethod.callPromise({ collectionName: Events.getCollectionName(), definitionData })
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        setEventPreview(initialFormState); // Reset form after successful submission
      })
      .catch(error => swal('Error', error.message, 'error'));
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
                <BasicEventDetails categoryOptions={categoryOptions} onAddressSelect={handleSelectAddress} onChange={handleChange} />
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
        {/* <Col md={6}> */}
        {/*  <EventCard event={{ ...eventPreview, location: eventPreview.location?.address }} showEditLink={false} /> */}
        {/* </Col> */}
      </Row>
    </Container>
  );
};

export default AddEvent;
