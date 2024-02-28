import React from 'react';
import { Container, Col, Row, Nav, Table, ProgressBar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import BarGraph from './BarGraph';
import FadeInSection from './FadeInSection';
import EventCard from './EventCard';
import WeeklyCalendarComponent from './Calendar/WeeklyCalendarComponent';
// import OrganizationCard from './OrganizationCard';

// ignore eslint for orgs, I will probably use it later
const LandingPanel = ({ events, subbedEvents }) => {
  console.log(subbedEvents);
  // const [currentPage, setCurrentPage] = useState(1);
  // const cardsPerPage = 1;
  //
  // const totalCards = orgs.length;
  // const totalPages = Math.ceil(totalCards / cardsPerPage);
  //
  // const orgsPerPage = (page) => {
  //   const startIndex = (page - 1) * cardsPerPage;
  //   const endIndex = startIndex + cardsPerPage;
  //   return orgs.slice(startIndex, endIndex);
  // };
  //
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const sections = document.querySelectorAll('.landing-section');
  //     const scrollTop = window.scrollY;
  //
  //     sections.forEach((section, index) => {
  //       const sectionTop = section.offsetTop;
  //       const sectionBottom = sectionTop + section.offsetHeight;
  //
  //       if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
  //         setCurrentPage(index + 1);
  //       }
  //     });
  //   };
  //
  //   window.addEventListener('scroll', handleScroll);
  //
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  // ideally now will be a value loaded in from a schema
  const now = 7 * 10;
  return (
    <div id={PAGE_IDS.LANDING} className="py-1 m-auto">
      <div>
        <Nav variant="underline" defaultActiveKey="/home" />
        <div className="landing-section" id="home">
          <Container>
            <FadeInSection>
              <div className="align-content-center" style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: 50 }}>Welcome back!</h2>
              </div>
            </FadeInSection>
            <Row className="pt-3">
              <Col>
                <FadeInSection>
                  <h2>Your Volunteer Stats</h2>
                  <div style={{ fontSize: 18 }}>
                    <p>Progress Towards 10Hrs/month Goal: </p>
                    <div className="pt-3">
                      <ProgressBar now={now} label={`${now}% of this months goal!`} />
                    </div>
                    <p>
                      <br />
                      Organizations Helped This Month: <br />
                    </p>
                    <div>
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Organization</th>
                            <th>Volunteer Service</th>
                            <th>Hours Served</th>
                          </tr>
                        </thead>
                        { /* later I will create a component that will load a <tr> depending on */}
                        { /* what is in the user schema */}
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>Test Organization</td>
                            <td>Beach Clean Up</td>
                            <td>5 hrs</td>
                          </tr>
                          <tr>
                            <td>2</td>
                            <td>Test Organization</td>
                            <td>Feeding Homeless</td>
                            <td>2 hrs</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </FadeInSection>
              </Col>
              <Col className="align-content-start">
                <FadeInSection>
                  <BarGraph fluid />
                </FadeInSection>
              </Col>
            </Row>
          </Container>
        </div>
        <Container id="CalenderSection">
          <FadeInSection>
            <h2>Your Upcoming Events</h2>
            <WeeklyCalendarComponent subbedEvents={subbedEvents} />
            <Button
              variant="primary"
              size="lg"
              href="/calendar"
              style={{ marginTop: 5, marginLeft: 12 }}
            >
              Go to monthly calendar
            </Button>
          </FadeInSection>
        </Container>
        <div className="landing-section" id="giveHelp">
          <Container className="pt-2">
            <FadeInSection>
              <h2>Recommended Events</h2>
            </FadeInSection>
            <Container className="pt-2">
              <Row>
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
            <Container>
              {/* I will need this at a later date :) */}
              {/* <FadeInSection> */}
              {/*  {[...Array(totalPages).keys()].map((page) => ( */}
              {/*    <Button */}
              {/*      key={page} */}
              {/*      variant="outline-primary" */}
              {/*      onClick={() => setCurrentPage(page + 1)} */}
              {/*      style={{ borderRadius: '50%', margin: '0 5px' }} */}
              {/*    > */}
              {/*      {page + 1} */}
              {/*    </Button> */}
              {/*  ))} */}
              {/* </FadeInSection> */}
            </Container>
          </Container>
        </div>
        {/* Work on this section later :)
        <div className="landing-section" id="needHelp"> */}
        {/*  <Container> */}
        {/*    <FadeInSection> */}
        {/*      <h2>Need Help</h2> */}
        {/*      <p>ALL HELP REQUEST RELATED INFO</p> */}
        {/*    </FadeInSection> */}
        {/*  </Container> */}
        {/* </div> */}
      </div>
    </div>
  );
};

LandingPanel.propTypes = {
  // orgs: PropTypes.arrayOf(
  //   PropTypes.shape({
  //     _id: PropTypes.string.isRequired,
  //     name: PropTypes.string.isRequired,
  //     website: PropTypes.string.isRequired,
  //     organizationOwner: PropTypes.string.isRequired,
  //     location: PropTypes.string.isRequired,
  //     ageRange: PropTypes.instanceOf(Object).isRequired,
  //   }),
  // ).isRequired,
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      eventDate: PropTypes.instanceOf(Date),
      category: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      location: PropTypes.string.isRequired,
      coordinator: PropTypes.string.isRequired,
      amountVolunteersNeeded: PropTypes.number,
      specialInstructions: PropTypes.string,
      // eslint-disable-next-line no-unused-vars,react/forbid-prop-types
      restrictions: PropTypes.object,
    }),
  ).isRequired,
  subbedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      subscriptionInfo: PropTypes.objectOf(PropTypes.shape()),
    }),
  ).isRequired,
};

export default LandingPanel;
