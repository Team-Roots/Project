import React, { useState } from 'react';
import { Container, Col, Row, Image, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link, useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import { EventSubscription } from '../../api/event/EventSubscriptionCollection';
import { Organizations } from '../../api/organization/OrganizationCollection';
import { UserStats } from '../../api/user/UserStatisticsCollection';
import { FaHeart, FaRegHeart, FaRegBookmark } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const RegistrationCard = ({ event }) => {
  const [show, setShow] = useState(false);
  const formattedCalendarDate = event.eventDate ? event.eventDate.toISOString().slice(0, 10)
    : 'Date not set';
  const owner = Meteor.user().username;
  const { ready, canSubscribe, eventOrganization, foundStats, foundEventStat } = useTracker(() => {
    const eventSubscription = EventSubscription.subscribeEvent();
    const organizationSubscription = Organizations.subscribeOrg();
    const userStatsSubscription = UserStats.subscribeStats();
    const rdy = eventSubscription.ready() && organizationSubscription.ready() && userStatsSubscription.ready();
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
    const foundUserStats = UserStats.findOne({ email: subscribeBy });
    // $elemMatch is a query operator that allows matching documents that contain an array field with at least one element that matches all the specified query criteria.
    const foundEventStatistic = UserStats.findOne({
      'stats.orgsHelped': {
        $elemMatch: {
          // orgName: orgName, find a way to do this please
          eventName: event.name,
          eventDate: formattedCalendarDate,
        },
      },
    });
    console.log(foundEventStatistic);
    return {
      eventOrganization: foundEventOrganization,
      canSubscribe: !(subscriptionExists),
      foundStats: !!(foundUserStats),
      foundEventStat: !!(foundEventStatistic),
      ready: rdy,
    };
  }, []);

  const formattedDate = event.eventDate ? event.eventDate.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' }) : 'Date not set';
  const navigate = useNavigate();
  const subscribeEvent = () => {
    // email
    const subscribeBy = Meteor.user().username;
    const eventSubscriptionInfo = {};
    eventSubscriptionInfo.email = subscribeBy;
    eventSubscriptionInfo.orgID = event.organizationID;
    eventSubscriptionInfo.eventName = event.name;
    eventSubscriptionInfo.eventDate = formattedCalendarDate;
    if (canSubscribe) {
      Meteor.call('eventSubscription.insert', eventSubscriptionInfo, (error) => {
        if (error) {
          console.error('Error inserting event subscription:', error.reason);
        } else {
          console.log('Event subscription inserted successfully.');
        }
      });
    } else {
      Meteor.call('eventSubscription.unsub', eventSubscriptionInfo, (error) => {
        if (error) {
          console.error('Error inserting event subscription:', error.reason);
        } else {
          console.log('Event subscription deleted successfully.');
        }
      });
    }
  };

  const SignOut = () => {
    const email = Meteor.user().username;
    const curDateTime = new Date();
    const eventName = event.name;
    const eventDate = formattedCalendarDate;
    Meteor.call('userStats.claimHours', curDateTime, email, eventName, eventDate, (error) => {
      if (error) {
        console.error('Error inserting signout data:', error.reason);
      } else {
        console.log('signout ran successfully.');
      }
    });
    setShow(false);
  };

  const CloseAlert = () => {
    setShow(false);
  };

  const SignIn = () => {
    const subscribeBy = Meteor.user().username;
    const eventInfo = {};
    eventInfo.email = subscribeBy;
    eventInfo.orgID = event.organizationID;
    eventInfo.eventName = event.name;
    eventInfo.eventDate = formattedCalendarDate;
    eventInfo.startTime = new Date();
    eventInfo.endTime = eventInfo.startTime;

    Meteor.call('userStats.updateOrgsHelpedData', eventInfo, (error) => {
      if (error) {
        console.error('Error inserting sign-in data: ', error.reason);
      } else {
        console.log('signin ran successfully.');
      }
    });
  };

  const openGoogleMaps = (address) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(mapsUrl, '_blank');
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
              <Alert show={show} variant="success" className="text-start">
                <Alert.Heading>Are you sure you want to sign out?</Alert.Heading>
                <p>
                  Once you sign out of the event, you can not sign back in. Are you sure you want to continue?
                </p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button variant="outline-success" onClick={() => SignOut()}>
                    Yes
                  </Button>
                  <Button variant="outline-success" onClick={() => CloseAlert()}>
                    No
                  </Button>
                </div>
              </Alert>
              <Tooltip title="If you have attended the event, claim your volunteer hours here." placement="bottom">
                <Button
                  variant={(foundStats && !canSubscribe) ? 'success' : 'danger'}
                  size="lg"
                  className="mb-3 mx-2"
                  disabled={((!(foundStats && !canSubscribe)) || (!foundEventStat || show)) || foundEventStat.stats.orgsHelped}
                  onClick={() => {
                    if (foundEventStat) {
                      setShow(true); // If foundEventStat is true, open the Sign Out modal
                    } else {
                      SignIn(); // If foundEventStat is false, perform Sign In action
                    }
                  }}
                >
                  {!foundEventStat ? 'Sign In' : 'Sign Out!'}
                </Button>
              </Tooltip>
              {/* <Tooltip title="If you have attended the event, claim your volunteer hours here." placement="bottom"> */}
              {/*  <Button */}
              {/*    variant={(foundStats && !canSubscribe) ? 'success' : 'danger'} */}
              {/*    size="lg" */}
              {/*    className="mb-3 mx-2" */}
              {/*    disabled={(!(foundStats && !canSubscribe)) || foundEventStat} */}
              {/*    onClick={() => SignIn()} */}
              {/*  > */}
              {/*    {!foundEventStat ? 'Sign In' : 'Signed In!'} */}
              {/*  </Button> */}
              {/* </Tooltip> */}
              <Tooltip title="Reserve a volunteer spot to this event." placement="bottom">
                <Button
                  variant={canSubscribe ? 'success' : 'danger'}
                  size="lg"
                  className="mb-3 mx-2"
                  onClick={() => subscribeEvent()}
                >
                  {canSubscribe ? <><FaRegHeart className="mr-2" /> Subscribe</> : <><FaHeart className="mr-2" /> Unsubscribe</>}
                </Button>
              </Tooltip>
              <Tooltip title="Chat with the organizer." placement="bottom">
                <Button
                  as={Link}
                  to={{
                    pathname: `/comment/${event._id}`,
                    state: { owner: owner }, // Pass additional state here
                  }}
                  variant="danger"
                  size="lg"
                  className="mb-3 mx-2"
                >
                  <><IoChatboxEllipsesOutline className="mr-2" /> Chat</>
                </Button>
              </Tooltip>
              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item>
                  <strong>EVENT LOCATION: </strong>
                  <Tooltip title="View in Google Maps." placement="bottom">
                    <contaianer style={{ color: 'rgba(var(--bs-link-color-rgb)' }} onClick={() => openGoogleMaps(event.location)}>
                      {event.location}
                    </contaianer>
                  </Tooltip>
                </ListGroup.Item>
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
    owner: PropTypes.string,
  }).isRequired,
};

export default RegistrationCard;
