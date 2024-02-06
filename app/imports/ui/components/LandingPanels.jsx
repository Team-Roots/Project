import React, { useState } from 'react';
import { Container, Col, Row, Nav } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { PAGE_IDS } from '../utilities/PageIDs';
import OrganizationCard from './OrganizationCard';
import BarGraph from './BarGraph';

const LandingPanel = ({ orgs }) => {
  const [activePanel, setActivePanel] = useState('home');

  /* SetActivePanel utilizes useState. Used to update the state variable activePanel with a new value (other panels) */
  const handleButtonClick = (panel) => {
    setActivePanel(panel);
  };

  return (
    <Container id={PAGE_IDS.LANDING} className="py-1">
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
        <div style={{ position: 'relative', height: '200px' }} className="pt-3">
          {/* Home Panel */}
          {activePanel === 'home' && (
            <Container style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Welcome back, (USER NAME)!</h2>
              <Row className="pt-3">
                <Col>
                  <h5>Your Volunteer Stats</h5>
                  <p>
                    Total Hours Served: #<br />
                    Organizations Helped: #<br />

                  </p>
                </Col>
                <Col>
                  <BarGraph fluid />
                </Col>
                <Col>
                  <h5>Upcoming Events</h5>
                  <p>
                    Events in the upcoming week: <br />
                    Link to calendar for more information <br />
                  </p>
                </Col>
              </Row>
            </Container>
          )}

          {/* Get Help Panel */}
          {activePanel === 'giveHelp' && (
            <Container style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Give Help Panel</h2>
              <p>A SEARCH + Buttons/Cards for interesting groups</p>
              <Container>
                {orgs.map((org) => <OrganizationCard key={org._id} org={org} />)}
              </Container>
            </Container>
          )}

          {/* Need Help Panel */}
          {activePanel === 'needHelp' && (
            <Container style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Need Help Panel</h2>
              <p>ALL HELP REQUEST RELATED INFO</p>
            </Container>
          )}
        </div>
      </div>
    </Container>
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
