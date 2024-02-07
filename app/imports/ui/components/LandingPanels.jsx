import React, { useState } from 'react';
import { Container, Col, Row, Nav, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationCard from './OrganizationCard';
import BarGraph from './BarGraph';

const LandingPanel = ({ orgs }) => {
  const [activePanel, setActivePanel] = useState('home');
  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 1;

  const totalCards = orgs.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);

  const orgsPerPage = (page) => {
    const startIndex = (page - 1) * cardsPerPage;
    const endIndex = startIndex + cardsPerPage;
    return orgs.slice(startIndex, endIndex);
  };

  /* SetActivePanel utilizes useState. Used to update the state variable activePanel with a new value (other panels) */
  const handleButtonClick = (panel) => {
    setActivePanel(panel);
  };

  /* this is for the give help pages */
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div id={PAGE_IDS.LANDING} className="py-1 m-auto">
      <Nav variant="underline" defaultActiveKey="/home">
        <Nav.Item>
          <Nav.Link href="" onClick={() => handleButtonClick('home')}>Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleButtonClick('giveHelp')}>Give Help</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => handleButtonClick('needHelp')}>Need Help</Nav.Link>
        </Nav.Item>
      </Nav>
      <div>
        <div className="pt-3">
          {/* Home Panel */}
          {activePanel === 'home' && (
            <Container style={{ zIndex: 3, marginBottom: '20px' }}>
              <h2 className="poppinsText">Welcome back!</h2>
              <Row className="pt-3">
                <Col>
                  <h5 className="poppinsText">Your Volunteer Stats</h5>
                  <p className="robotoText">
                    Total Hours Served: #<br />
                    Organizations Helped: #<br />
                  </p>
                </Col>
                <Col>
                  <BarGraph fluid />
                </Col>
                <Col>
                  <h5 className="poppinsText">Upcoming Events</h5>
                  <p className="robotoText">
                    Events in the upcoming week: <br />
                    Link to calendar for more information <br />
                  </p>
                </Col>
              </Row>
            </Container>
          )}

          {/* Get Help Panel */}
          {activePanel === 'giveHelp' && (
            <Container style={{ zIndex: 3, marginBottom: '20px' }}>
              <h2 className="poppinsText">Give Help</h2>
              <Container>
                <Row>
                  {/* {orgs.map((org) => <OrganizationCard key={org._id} org={org} />)} */}
                  {orgsPerPage(currentPage).map((org) => (
                    <OrganizationCard key={org._id} org={org} />
                  ))}
                </Row>
              </Container>
              <Container>
                {[...Array(totalPages).keys()].map((page) => (
                  <Button
                    key={page}
                    variant="outline-primary"
                    onClick={() => handlePageChange(page + 1)}
                    style={{ borderRadius: '50%', margin: '0 5px' }}
                    className="robotoText"
                  >
                    {page + 1}
                  </Button>
                ))}
              </Container>
            </Container>
          )}

          {/* Need Help Panel */}
          {activePanel === 'needHelp' && (
            <Container style={{ zIndex: 3, marginBottom: '20px' }} className="poppinsText">
              <h2>Need Help</h2>
              <p>ALL HELP REQUEST RELATED INFO</p>
            </Container>
          )}
        </div>
      </div>
    </div>
  );
};

LandingPanel.propTypes = {
  orgs: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      organizationOwner: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      ageRange: PropTypes.instanceOf(Object).isRequired,
    }),
  ).isRequired,
};

export default LandingPanel;
