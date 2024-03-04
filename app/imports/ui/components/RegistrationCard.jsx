import React from 'react';
import { Container, Col, Row, Image, Card, Button, ListGroup } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { EventSubscription } from '../../api/event/EventSubscriptionCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';

const RegistrationCard = ({ event }) => {
  const formattedCalendarDate = event.eventDate ? event.eventDate.toISOString().slice(0, 10)
    : 'Date not set';

  const { ready, canSubscribe, eventOrganization } = useTracker(() => {
    const eventSubscription = EventSubscription.subscribeEvent();
    const organizationSubscription = Organizations.subscribeOrg();
    const rdy = eventSubscription.ready() && organizationSubscription.ready();
    if (!rdy) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const subscribeBy = Meteor.user().username;
    const eventSubscriptionInfo = {};
    eventSubscriptionInfo.email = subscribeBy;
    eventSubscriptionInfo.orgID = event.organizationID;
    eventSubscriptionInfo.eventName = event.name;
    eventSubscriptionInfo.eventDate = formattedCalendarDate;
    const foundEventOrganization = Organizations.findOne({ orgID: event.organizationID }, {});
    const subscriptionExists = EventSubscription.findOne({ subscriptionInfo: eventSubscriptionInfo });
    return {
      eventOrganization: foundEventOrganization,
      canSubscribe: !(subscriptionExists),
      ready: rdy,
    };
  }, []);

  const formattedDate = event.eventDate ? event.eventDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }) : 'Date not set';
  const navigate = useNavigate();
  const subscribeEvent = () => {
    // email
    const subscribeBy = Meteor.user().username;
    const eventSubscriptionInfo = {};
    eventSubscriptionInfo.email = subscribeBy;
    eventSubscriptionInfo.orgID = event.organizationID;
    eventSubscriptionInfo.eventName = event.name;
    eventSubscriptionInfo.eventDate = formattedCalendarDate;
    Meteor.call('eventSubscription.insert', eventSubscriptionInfo, (error) => {
      if (error) {
        console.error('Error inserting event subscription:', error.reason);
      } else {
        console.log('Event subscription inserted successfully.');
      }
    });
  };

  return (ready ? (
    <Container>
      <Row className="mb-3 button-small-fixed-size">
        <Button as={Link} onClick={() => navigate(-1)} variant="danger" size="sm">
          Return
        </Button>
      </Row>
      <Row className="justify-content-center align-items-center">
        <Col md={4} className="p-0">
          <Image className="img-fluid w-100 h-100" src={event.image} />
        </Col>
        <Col md={8}>
          <Card>
            <Card.Header className="bg-transparent border-0 text-center">
              <h1>{event.name}</h1>
            </Card.Header>
            <Card.Body className="text-end">
              <Button
                variant="success"
                size="lg"
                className="mb-3 mx-2"
                onClick={subscribeEvent}
                disabled={!canSubscribe} // Disable button if canSubscribe is not true
              >
                {canSubscribe ? 'Subscribe' : 'Subscribed'}
              </Button>
              <Button as={Link} to={`/registrationform/${event._id}`} variant="danger" size="lg" className="mb-3">
                I Want to Help
              </Button>
              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item><strong>EVENT LOCATION: </strong>{event.location}</ListGroup.Item>
                <ListGroup.Item><strong>DATE: </strong>{formattedDate}</ListGroup.Item>
                <ListGroup.Item><strong>START TIME: </strong>{event.startTime}</ListGroup.Item>
                <ListGroup.Item><strong>END TIME: </strong>{event.endTime}</ListGroup.Item>
                <ListGroup.Item><strong>DESCRIPTION: </strong>{event.description}</ListGroup.Item>
                <ListGroup.Item><strong>COORDINATOR: </strong>{event.coordinator}</ListGroup.Item>
                <ListGroup.Item><strong>ORGANIZATION: </strong><a href={`/organizations/${event.organizationID}`}>{eventOrganization.name}</a></ListGroup.Item>
                <ListGroup.Item><strong>VOLUNTEERS NEEDED: </strong>{event.amountVolunteersNeeded}</ListGroup.Item>
                {event.specialInstructions && <ListGroup.Item><strong>SPECIAL INSTRUCTIONS: </strong>{event.specialInstructions}</ListGroup.Item>}
                {/* {event.restrictions && <ListGroup.Item><strong>RESTRICTIONS: </strong>{event.restrictions}</ListGroup.Item>}
                {event.ageRange && <ListGroup.Item><strong>AGE RANGE: </strong>{event.ageRange}</ListGroup.Item>} */}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="grow" />
    </div>
  )
  );
};

RegistrationCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    coordinator: PropTypes.string,
    amountVolunteersNeeded: PropTypes.number,
    isOnline: PropTypes.bool,
    image: PropTypes.string,
    specialInstructions: PropTypes.string,
    // figure out what the data type of restrictions and ageRange are
    // restrictions
    // ageRange
    organizationID: PropTypes.string,
    creator: PropTypes.string,
  }).isRequired,
};

export default RegistrationCard;
