import React from 'react';
import { Container, Col, Row, Nav, Table, ProgressBar, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import BarGraph from './BarGraph';
import FadeInSection from './FadeInSection';
import EventCard from './EventCard';
import WeeklyCalendarComponent from './Calendar/WeeklyCalendarComponent';
import TableComponent from './UserDashBoard/TableComponent';
// import OrganizationCard from './OrganizationCard';

// ignore eslint for orgs, I will probably use it later
const LandingPanel = ({ events, subbedEvents, stat }) => {
  console.log(stat);
  console.log(stat.stats);
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
                      { /* change min and max values by reading user schema (later) */ }
                      <ProgressBar className="position-relative" min={0} max={10}>
                        <div className="position-absolute d-flex justify-content-center w-100 progress-bar-text">{`${stat.stats.hoursThisMonth * 10}% Complete!`}</div>
                        <ProgressBar now={stat.stats.hoursThisMonth} key={1} min={0} max={10} />
                      </ProgressBar>
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
                          {stat.stats.orgsHelped.length > 0 ? (
                            stat.stats.orgsHelped.map((org, index) => (
                              <TableComponent
                                key={index}
                                index={index}
                                orgName={org.orgID}
                                eventName={org.eventName}
                                hoursOfEvent={org.hoursServed}
                              />
                            ))
                          ) : (
                            <tr>
                              <td colSpan="4" style={{ textAlign: 'center' }}>None</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </div>
                </FadeInSection>
              </Col>
              <Col className="align-content-start">
                <FadeInSection>
                  <BarGraph fluid userStats={stat} />
                </FadeInSection>
              </Col>
            </Row>
          </Container>
        </div>
        <Container id="CalenderSection">
          <FadeInSection>
            <h2>Your Upcoming Events</h2>
            <WeeklyCalendarComponent subbedEvents={subbedEvents} events={events} />
            <Button
              variant="primary"
              size="lg"
              href="/calendar"
              className="edit robotoText"
              style={{ marginTop: 5, marginLeft: 12 }}
            >
              Go to monthly calendar
            </Button>
          </FadeInSection>
        </Container>
        <Container id="SubscribedEventsSection">
          <FadeInSection>
            <h2>Your Subscribed Events</h2>
            {subbedEvents.length > 0 ? (
              <Row md={1} lg={2} className="g-4">
                {subbedEvents.map((subEvent) => {
                  const matchingEvent = events.find(event => event.name === subEvent.subscriptionInfo.eventName);
                  console.log('Matching Event: ', events._id);
                  console.log('Searching for event with ID:', subEvent.subscriptionInfo._id);
                  return (
                    <Col key={subEvent._id}>
                      {matchingEvent ? (
                        <EventCard event={matchingEvent} />
                      ) : (
                        <p>Event details not available.</p>
                      )}
                    </Col>
                  );
                })}
              </Row>
            ) : (
              <p>You have not subscribed to any events yet.</p>
            )}
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
      subscriptionInfo: PropTypes.objectOf(PropTypes.shape()),
    }),
  ).isRequired,
  stat: PropTypes.shape({
    completedHours: PropTypes.arrayOf(
      PropTypes.shape({
        year: PropTypes.number.isRequired,
        Jan: PropTypes.number.isRequired,
        Feb: PropTypes.number.isRequired,
        Mar: PropTypes.number.isRequired,
        Apr: PropTypes.number.isRequired,
        May: PropTypes.number.isRequired,
        Jun: PropTypes.number.isRequired,
        Jul: PropTypes.number.isRequired,
        Aug: PropTypes.number.isRequired,
        Sep: PropTypes.number.isRequired,
        Oct: PropTypes.number.isRequired,
        Nov: PropTypes.number.isRequired,
        Dec: PropTypes.number.isRequired,
      }).isRequired,
    ).isRequired,
    stats: PropTypes.shape({
      hoursThisMonth: PropTypes.number.isRequired,
      totalHours: PropTypes.number.isRequired,
      orgsHelped: PropTypes.arrayOf(
        PropTypes.shape({
          orgID: PropTypes.number.isRequired,
          eventName: PropTypes.string.isRequired,
          eventDate: PropTypes.string.isRequired,
        }),
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default LandingPanel;
