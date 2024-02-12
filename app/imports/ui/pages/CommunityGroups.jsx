import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection'; // Import your EventCollection
import EventCard from '../components/EventCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
// import PropTypes from 'prop-types';

const CommunityGroups = () => {
  const navigate = useNavigate();
  const handleAddEventClick = () => {
    navigate('/add-group'); // Navigate to the add-event page
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
            <div>Loading Groups...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  const eventData = [
    {
      name: 'Road Clean Up',
      since: new Date('2024T13:00:00.000Z'),
      description: 'A group open to all ages that want to keep the aina beautiful by picking up trash along the road!',
      owner: 'admin@foo.com',
      category: 'Clean Up',
      location: 'Honolulu, HI',
      coordinator: '808CleanUp',
      _id: '0',
      image: 'https://about.hawaiilife.com/wp-content/uploads/2022/09/Image-1.jpg',
      locationType: 'Outdoors',
    },
    {
      name: 'Kailua Kid-Friendly',
      since: new Date('2024T15:00:00.000Z'),
      description: 'A food drive will be happening at UH Mānoa\'s Campus Center! Canned non-perishable foods wanted!',
      owner: 'john@foo.com',
      category: 'Kid-friendly',
      location: 'Kailua, HI',
      coordinator: 'IHeartKailua',
      _id: '1',
      image: 'https://www.tonyhondakona.com/blogs/4421/wp-content/uploads/2023/09/girls-1284419_1280.jpg',
      locationType: 'Outdoors',
    },
  ];

  return (
    <Container className="py-3" id={PAGE_IDS.LIST_GROUP}>
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
        <Col>
          <Row md={1} lg={2} className="g-4">
            {eventData.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityGroups;
