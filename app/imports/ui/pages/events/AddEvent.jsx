import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
// import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, SubmitField, ErrorsField } from 'uniforms-bootstrap5';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { useTracker } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import BasicEventDetails from '../../components/BasicEventDetails'; // Adjust the path as needed
import TimingAndCoordinator from '../../components/TimingAndCoordinator'; // Adjust the path as needed
import AdditionalInformation from '../../components/AdditionalInformation'; // Adjust the path as needed
// import EventCard from '../../components/EventCard'; // Ensure this path is correct
import { Events } from '../../../api/event/EventCollection';
import { Categories } from '../../../api/category/CategoryCollection';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import { OrganizationAdmin } from '../../../api/organization/OrganizationAdmin';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROLE } from '../../../api/role/Role';
import NotAuthorized from '../NotAuthorized';

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
  const currentUser = useTracker(() => Meteor.user());
  const { allowedToEdit, categories, organizations, ready } = useTracker(() => {
    const categorySubscription = Categories.subscribeCategory();
    const organizationSubscription = Organizations.subscribeOrg();
    const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
    const rdy = categorySubscription.ready() && organizationSubscription.ready() && orgAdminSubscription.ready();
    const foundCategories = Categories.find({}, {}).fetch();
    const foundOrgAdmins = _.pluck(OrganizationAdmin.find({ orgAdmin: currentUser?.username }, {}).fetch(), 'orgID');
    const foundOrganizations = Organizations.find({ orgID: { $in: foundOrgAdmins } }, {}).fetch();
    return {
      allowedToEdit: foundOrgAdmins.length > 0 && Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN]),
      categories: foundCategories,
      organizations: foundOrganizations,
      ready: rdy,
    };
  });

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

  // convert each category to all lower case and replace each space with an underscore
  const categoryOptions = [];
  _.each(categories, category => {
    categoryOptions.push({
      label: category.categoryName,
      value: category.categoryName.toLocaleLowerCase().replaceAll(' ', '_') });
  });

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
      description,
      image: imageUrl,
      eventDate,
      startTime,
      endTime,
      location: eventPreview.location.address,
      amountVolunteersNeeded,
      isOnline,
      coordinator,
      specialInstructions,
      ageRange,
      creator: Meteor.user().username,
      category,
    };

    // Call to defineMethod with updated definitionData
    defineMethod.callPromise({ collectionName: Events.getCollectionName(), definitionData })
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        setEventPreview(initialFormState); // Reset form after successful submission
      })
      .catch(error => swal('Error', error.message, 'error'));
  };
  if (!ready) {
    return <LoadingSpinner />;
  }
  if (!allowedToEdit) {
    return <NotAuthorized />;
  }
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
