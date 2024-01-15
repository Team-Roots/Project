import React, { useState } from 'react';
import { Container, Col, Button, Nav, NavItem } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const LandingPanel = () => {
  const [activePanel, setActivePanel] = useState('home');

  {/* SetActivePanel utilizes useState. Used to update the state variable activePanel with a new value (other panels) */}
  const handleButtonClick = (panel) => {
    setActivePanel(panel);
  };

  return (
    <Container id={PAGE_IDS.LANDING} className="py-3">
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
            <div style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Home Panel</h2>
              <p>DASHBOARD HERE</p>
            </div>
          )}

          {/* Get Help Panel */}
          {activePanel === 'giveHelp' && (
            <div style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Give Help Panel</h2>
              <p>A SEARCH + Buttons/Cards for interesting groups</p>
            </div>
          )}

          {/* Need Help Panel */}
          {activePanel === 'needHelp' && (
            <div style={{ position: 'absolute', zIndex: 3 }}>
              <h2>Need Help Panel</h2>
              <p>ALL HELP REQUEST RELATED INFO</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default LandingPanel;
