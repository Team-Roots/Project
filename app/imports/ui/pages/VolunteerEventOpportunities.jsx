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
      eventDate: new Date('2023-12-07T13:00:00.000Z'),
      description: 'Come down to help clean!',
      owner: 'admin@foo.com',
      category: 'Clean Up',
      location: 'Honolulu, HI - Ala Moana Beach Park',
      startTime: '8:00 AM',
      endTime: '11:00 AM',
      coordinator: 'admin@foo.com',
      amountVolunteersNeeded: 20,
      _id: '0',
      image: 'https://808cleanups.org/wp-content/uploads/2019/06/weblogo01.png',
    },
    {
      name: 'Hawaii Food Bank Donation Drive',
      eventDate: new Date('2023-12-08T15:00:00.000Z'),
      description: 'Food donation drive! Donate!',
      owner: 'john@foo.com',
      category: 'Donations',
      location: 'Honolulu, HI - UH Mānoa',
      startTime: '9:00 AM',
      endTime: '3:00 PM',
      coordinator: 'john@foo.com',
      amountVolunteersNeeded: 200,
      _id: '1',
      image: 'https://foodbanklogos.blob.core.windows.net/foodbanklogos/FoodBankLogo_36_275w.jpg',
    },
    {
      name: 'Oahu SPCA Adoption Event',
      eventDate: new Date('2023-12-08T15:00:00.000Z'),
      description: 'Helpers needed to help with the adoption event.',
      owner: 'john@foo.com',
      category: 'Animal Shelter',
      location: 'Pearl City, HI - Petco Pearl City',
      startTime: '10:00 AM',
      endTime: '2:00 PM',
      coordinator: 'john@foo.com',
      amountVolunteersNeeded: 5,
      _id: '2',
      image: 'https://oahuspca.org/images/logo/OahuSPCA.svg',
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
            <FormCheckLabel>Waimanalo</FormCheckLabel>
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
