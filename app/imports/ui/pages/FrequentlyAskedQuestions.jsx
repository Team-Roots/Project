import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';

const FrequentlyAskedQuestions = () => (
  <Container id={PAGE_IDS.FAQ} className="py-3">
    <Row className="align-middle text-left">
      <Col xs={12} className="d-flex flex-column justify-content-center">
        <h1 className="text-center" style={{ marginBottom: '20px' }}>FAQ</h1>
        <Accordion defaultActiveKey="0" className="faq-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>What are the best ways to locate volunteer opportunities that align with my abilities?</Accordion.Header>
            <Accordion.Body>
              Explore our site and utilize the search tool to discover local volunteer opportunities. Narrow down the options by your passions, abilities, and time you have free.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What kind of volunteering roles are on offer?</Accordion.Header>
            <Accordion.Body>
              Our volunteer opportunities span various sectors such as environmental protection, community aid, educational support, and health services. Delve into our selection to connect with an initiative that aligns with your values.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>What is the process for registering as a volunteer?</Accordion.Header>
            <Accordion.Body>
              {/* eslint-disable-next-line max-len */}
              To register as a volunteer, simply set up an account on our platform, search for the volunteer roles that appeal to you, and select &quot;Apply&quot; for the positions of your choice. Adhere to the guidelines given by the respective organization to finalize your application.
              <div> <Link to="/signup"> Click here to register for an account.</Link> </div>

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Are there any specific age requirements for volunteering?</Accordion.Header>
            <Accordion.Body>
              {/* eslint-disable-next-line max-len */}
              Volunteer eligibility relating to age varies across organizations and opportunities. It is important to examine the specifics for each available position to determine any set age limitations. Certain volunteer options may be open to children as part of family groups, whereas others may stipulate a lower age limit.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Are there any specific forms or documents I need to fill out to record my volunteer hours?
            </Accordion.Header>
            <Accordion.Body>
              Post your volunteer stint, access your account and head to either the &quot;My Profile&quot; or &quot;Dashboard&quot; section to oversee and log the time you dedicated.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>

    </Row>
  </Container>
);

export default FrequentlyAskedQuestions;
