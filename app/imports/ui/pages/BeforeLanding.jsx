import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Airplane, BookmarkHeart, FileRichtext, GlobeAmericas, Search } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './css/BeforeLanding.css';
import { useTracker } from 'meteor/react-meteor-data'; // Assuming you're using Meteor
import FadeInSection from '../components/FadeInSection';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';

const BeforeLanding = () => {
  // Correct use of useTracker hook to manage subscription and fetch data
  const { events, ready } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();

    if (!rdy) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }

    const eventItems = rdy ? Events.find({}, { sort: { name: 1 }, limit: 4 }).fetch() : [];

    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return (
    <div id="listPostsPage">
      <Container id="landing-page" fluid>
        <Container className="justify-content-center align-items-center p-5">
          <Row>
            <h3 style={{ fontWeight: 600 }}>JOIN NOW TO LEARN HOW TO</h3>
          </Row>
          <Row>
            <Col md={8}>
              <h1 id="landing-text">IMPACT YOUR COMMUNITY</h1>
            </Col>
            <Col md={4} />
          </Row>
        </Container>
        <Container fluid className="p-5">
          <Row className="pt-5 ps-5">
            <h1 id="landing-header">FEATURES</h1>
          </Row>
          <Row className="justify-content-center align-items-center text-center pt-4">
            <Col md={2} className="py-3">
              <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="custom-circle">
                  <FileRichtext className="custom-icons" />
                </div>
                <h6 className="pt-4">CREATE A PROFILE</h6>
              </Container>
            </Col>
            <Col md={2} className="py-3">
              <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="custom-circle">
                  <BookmarkHeart className="custom-icons" />
                </div>
                <h6 className="pt-4">COUNT YOUR HOURS</h6>
              </Container>
            </Col>
            <Col md={2} className="py-3">
              <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="custom-circle">
                  <Search className="custom-icons" />
                </div>
                <h6 className="pt-4">SEARCH EVENTS</h6>
              </Container>
            </Col>
            <Col md={2} className="py-3">
              <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="custom-circle">
                  <GlobeAmericas className="custom-icons" />
                </div>
                <h6 className="pt-4">CREATE AN EVENT</h6>
              </Container>
            </Col>
            <Col md={2} className="py-3">
              <Container id="border" className="d-flex flex-column justify-content-center align-items-center p-3">
                <div className="custom-circle">
                  <Airplane className="custom-icons" />
                </div>
                <h6 className="pt-4">REGISTER YOUR ORGANIZATION</h6>
              </Container>
            </Col>
          </Row>
        </Container>
        <Container id="color-block" className="p-5" fluid>
          <Row className="text-center">
            <h4 style={{ color: 'white' }}>to access these features...</h4>
            <Link to="/signup">
              <h1 id="landing-header">REGISTER NOW →</h1>
            </Link>
          </Row>
        </Container>
        <Container className="p-5" fluid>
          <Row className="ps-5" id="resources">
            <h1 id="landing-header">RESOURCES</h1>
          </Row>
          <Row className="pt-3 px-5">
            <FadeInSection>
              {/* {orgsPerPage(currentPage).map((org) => ( */}
              {/*  <OrganizationCard key={org._id} org={org} /> */}
              {/* ))} */}
              {/* {events.map((event) => <EventCard key={event._id} event={event} />)} */}
              <Col>
                <Row md={1} lg={2} className="g-4">
                  {events.map((event) => (<Col> <FadeInSection> <EventCard key={event._id} event={event} /> </FadeInSection> </Col>))}
                </Row>
              </Col>
            </FadeInSection>
          </Row>
        </Container>
      </Container>
    </div>
  );
};

export default BeforeLanding;
