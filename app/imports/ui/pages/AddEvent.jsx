import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AutoForm, TextField, SelectField, SubmitField, ErrorsField, NumField } from 'uniforms-bootstrap5';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Events } from '../../api/event/EventCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';
import { PAGE_IDS } from '../utilities/PageIDs';
import UploadWidget from '../components/UploadWidget';
import AddressInput from '../components/AddressInput';
import { Categories } from '../../api/category/CategoryCollection';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  eventDate: {
    type: Date,
    optional: true,
  },
  description: String,
  category: {
    type: String,
    optional: true,
  },
  location:  {
    type: String,
    optional: true,
  },
  startTime: String,
  endTime: String,
  coordinator: String,
  amountVolunteersNeeded: Number,
  specialInstructions: {
    type: String,
    optional: true,
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

// Renders the AddEvent page for adding an event.
const AddEvent = () => {
  const subscription = Categories.subscribe();
  const [formRef, setFormRef] = useState(null);
  const [cloudinaryUrl, setCloudinaryUrl] = useState('');
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    latitude: null,
    longitude: null,
  });

  const categories = useTracker(() => {
    Meteor.subscribe('Categories');
    const fetchedCategories = Categories.find().fetch();
    console.log(fetchedCategories); // Check what's being fetched
    return fetchedCategories;
  }, []);

  const categoryOptions = categories.map(({ name }) => ({ label: name, value: name }));
  // eslint-disable-next-line react/prop-types,react/no-unstable-nested-components
  const CustomDateField = ({ name, onChange, placeholder }) => {
    const [startDate, setStartDate] = useState(new Date());

    const handleChange = (date) => {
      setStartDate(date);
      onChange(name, date); // Ensure this updates the form's model
    };

    return (
      <DatePicker
        name="eventDate"
        selected={startDate}
        onChange={handleChange}
        dateFormat="yyyy/MM/dd"
        placeholderText={placeholder}
      />
    );
  };

  const handleAddressSelect = (address, { lat, lng }) => {
    setFormData({
      ...formData,
      location: address,
      latitude: lat,
      longitude: lng,
    });
  };
  const handleCloudinaryUrlUpdate = (url) => {
    console.log('Uploaded Image URL:', url); // Debugging
    setCloudinaryUrl(url);
    setIsImageUploaded(!!url);
    console.log('After in handleCloudinaryUrlUpdate:', url);
  };

  // On submit, insert the data.
  const submit = (data) => {
    console.log('Image URL:', cloudinaryUrl);
    console.log('Is Image Uploaded:', isImageUploaded);
    if (!isImageUploaded) {
      swal('Error', 'Please upload an image before submitting', 'error');
      return;
    }

    const { name, eventDate, description, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions } = data;
    const imageUrl = cloudinaryUrl;
    const owner = Meteor.user()?.username;
    const collectionName = Events.getCollectionName();
    const definitionData = { name, eventDate, description, category, location, startTime, endTime, coordinator, amountVolunteersNeeded, specialInstructions, image: imageUrl, owner };
    console.log('Submitting Image URL:', imageUrl);
    console.log('Definition Data:', definitionData);
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => console.error('Insertion error:', error))
      .then(() => {
        swal('Success', 'Event added successfully', 'success');
        formRef.reset();
        setIsImageUploaded(false); // Reset the image uploaded state
        setCloudinaryUrl(''); // Reset the cloudinary URL
      })
      .catch(error => swal('Error', error.message, 'error'));
  };
  return (
    <Container id={PAGE_IDS.ADD_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Add Event</h2>
              <AutoForm ref={ref => setFormRef(ref)} schema={bridge} onSubmit={data => submit(data)}>
                <TextField name="name" placeholder="Event Name" />
                <CustomDateField placeholder="Event Date" />
                <TextField name="description" placeholder="Event Description" />
                <SelectField name="category" options={categoryOptions} />
                <AddressInput name="location" onAddressSelect={handleAddressSelect} />
                <TextField name="startTime" placeholder="Start Time" />
                <TextField name="endTime" placeholder="End Time" />
                <TextField name="coordinator" placeholder="Event Coordinator" />
                <NumField name="amountVolunteersNeeded" placeholder="Amount of Volunteers Needed" />
                <TextField name="specialInstructions" placeholder="Special Instructions" />
                <UploadWidget setUrl={handleCloudinaryUrlUpdate} name="image" />
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
