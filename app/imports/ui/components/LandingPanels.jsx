import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PAGE_IDS } from '../utilities/PageIDs';

const LandingPanel = () => {
  const [activePanel, setActivePanel] = useState('home');

  const handleButtonClick = (panel) => {
    setActivePanel(panel);
  };

  return (
    <Container id={PAGE_IDS.LANDING} className="py-3">
      <Row>
        <Col md={4}>
          <Button onClick={() => handleButtonClick('home')}>Home</Button>
        </Col>
        <Col md={4}>
          <Button onClick={() => handleButtonClick('getHelp')}>Get Help</Button>
        </Col>
        <Col md={4}>
          <Button onClick={() => handleButtonClick('needHelp')}>Need Help</Button>
        </Col>
      </Row>

      <div style={{ position: 'relative', height: '200px' }} className="pt-3">
        {/* Home Panel */}
        {activePanel === 'home' && (
          <div style={{ position: 'absolute', zIndex: 3 }}>
            <h2>Home Panel</h2>
            <p>DASHBOARD HERE</p>
          </div>
        )}

        {/* Get Help Panel */}
        {activePanel === 'getHelp' && (
          <div style={{ position: 'absolute', zIndex: 3 }}>
            <h2>Get Help Panel</h2>
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
    </Container>
  );
};

export default LandingPanel;
