import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { AutoForm, TextField, SelectField, SubmitField, ErrorsField, NumField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import UploadWidget from '../components/UploadWidget';
import AddressInput from '../components/AddressInput';
import { Categories } from '../../api/category/CategoryCollection';

// Define the form schema using SimpleSchema
const formSchema = new SimpleSchema({
  name: String,
  eventDate: Date,
  description: String,
  category: String,
  location: String,
  startTime: String,
  endTime: String,
  coordinator: String,
  amountVolunteersNeeded: Number,
  specialInstructions: { type: String, optional: true },
  image: { type: String, optional: true }, // Make sure this matches your Events schema
});

const bridge = new SimpleSchema2Bridge(formSchema);

const AddEvent = () => {
  const [formRef, setFormRef] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const { categories: fetchedCategories, categoriesReady } = useTracker(() => {
    const handler = Meteor.subscribe('categories');
    const categories = Categories.find().fetch();
    return { categories, categoriesReady: handler.ready() };
  }, []);

  const categoryOptions = fetchedCategories.map(category => ({ label: category.name, value: category.name }));

  const handleCloudinaryUrlUpdate = (url) => {
    setCloudinaryUrl(url);
    setIsImageUploaded(!!url);
  };

  const submit = (data) => {
    if (!isImageUploaded) {
      swal('Error', 'Please upload an image before submitting', 'error');
      return;
    }
    const definitionData = { ...data, image: cloudinaryUrl };
    defineMethod.callPromise({ collectionName: Events.getCollectionName(), definitionData })
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        formRef.reset();
        setIsImageUploaded(false);
        setCloudinaryUrl('');
      })
      .catch(error => swal('Error', error.message, 'error'));
  };

  if (!categoriesReady) {
    return <div>Loading...</div>; // or any other loading component
  }

  return (
    <Container id={PAGE_IDS.ADD_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Add Event</h2>
              <AutoForm ref={ref => setFormRef(ref)} schema={bridge} onSubmit={submit}>
                <TextField name="name" placeholder="Event Name" />
                <TextField name="eventDate" placeholder="Event Date" />
                <TextField name="description" placeholder="Event Description" />
                <SelectField name="category" placeholder="Category" options={categoryOptions} />
                <AddressInput name="location" placeholder="Event Location" />
                <TextField name="startTime" placeholder="Start Time" />
                <TextField name="endTime" placeholder="End Time" />
                <TextField name="coordinator" placeholder="Event Coordinator" />
                <NumField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
                <TextField name="specialInstructions" placeholder="Special Instructions" />
                <UploadWidget setUrl={handleCloudinaryUrlUpdate} />
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
