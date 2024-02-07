import React from 'react';
// import { Meteor } from 'meteor/meteor';
import { Container, Row, Col, FormCheck, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection'; // Import your EventCollection
import EventCard from '../components/EventCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
// import PropTypes from 'prop-types';

const VolunteerEventOpportunities = () => {
  // const user = Meteor.user();
  // const owner = user ? user.username : null;
  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate('/add-event'); // Navigate to the add-event page
  };
  const { /* events, */ ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    return {
      events: Events.find({}).fetch(),
      ready: rdy,
    };
  }, []);
  if (!ready) {
    return (
      <Container id={PAGE_IDS.LIST_EVENT} className="py-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <div>Loading Events...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  const eventData = [
    {
      name: 'Ala Moana Beach Clean Up',
      eventDate: new Date('2024-02-10T13:00:00.000Z'),
      description: 'Seeking volunteers who enjoy the outdoors and would love to spend a weekend beautifying Ala Moana Beach.',
      owner: 'admin@foo.com',
      category: 'Clean Up',
      location: 'Honolulu, HI',
      startTime: '8:00 AM',
      endTime: '11:00 AM',
      coordinator: '808CleanUp',
      amountVolunteersNeeded: 20,
      _id: '0',
      image: 'https://808cleanups.org/wp-content/uploads/2019/06/weblogo01.png',
      locationType: 'outdoors',
      address: 'Ala Moana Beach Park',
    },
    {
      name: 'Hawaii Food Bank Donation Drive',
      eventDate: new Date('2024-02-16T15:00:00.000Z'),
      description: 'A food drive will be happening at UH Maānoa\'s Campus Center! Canned non-perishable foods wanted!',
      owner: 'john@foo.com',
      category: 'Donations',
      location: 'Honolulu, HI',
      startTime: '9:00 AM',
      endTime: '3:00 PM',
      coordinator: 'Hawaii Food Bank',
      amountVolunteersNeeded: 200,
      _id: '1',
      image: 'https://foodbanklogos.blob.core.windows.net/foodbanklogos/FoodBankLogo_36_275w.jpg',
      locationType: 'Indoors',
      address: 'UH Mānoa Campus Center',
    },
    {
      name: 'Oahu SPCA Adoption Event',
      eventDate: new Date('2024-02-29T15:00:00.000Z'),
      description: 'Love animals? Helpers are wanted to help with the Oahu SPCA adoption event to help find our fluffy friends their forever home!',
      owner: 'john@foo.com',
      category: 'Animal Shelter',
      location: 'Pearl City, HI',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      coordinator: 'Oahuh SPCA',
      amountVolunteersNeeded: 5,
      _id: '2',
      image: 'https://oahuspca.org/images/logo/OahuSPCA.svg',
      locationType: 'Indoors',
      address: 'Petco Pearl City',
    },
  ];

  return (
    <Container className="py-3" id={PAGE_IDS.LIST_EVENT}>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            variant="primary"
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: '40px', height: '40px', marginLeft: '170px', marginBottom: '10px' }} // Adjust the pixel value as needed
            onClick={handleAddEventClick}
            id={COMPONENT_IDS.NAVBAR_ADD_EVENT}
          >
            <i className="fas fa-plus" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col lg={2}>
          <h3>Filter By</h3>
          <h4>Location</h4>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Honolulu, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Pearl City, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel>Waimanalo, HI</FormCheckLabel>
          </FormCheck>
          <h4>Location Type</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Indoors</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Outdoors</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Online</FormCheckLabel>
          </FormCheck>
          <h4>Category</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Animal Shelter</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Clean Up</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>Food Distribution</FormCheckLabel>
          </FormCheck>
          <br />
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>
              <h5>Need Background Check</h5>
            </FormCheckLabel>
          </FormCheck>
        </Col>
        <Col>
          <Row md={1} lg={2} className="g-4">
            {eventData.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerEventOpportunities;
