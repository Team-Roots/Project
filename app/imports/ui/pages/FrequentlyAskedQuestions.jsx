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
            <Accordion.Header>How can I find volunteering opportunities that best suit my skills?</Accordion.Header>
            <Accordion.Body>
              You can browse our website and use the search feature to find volunteering opportunities near you. Filter results based on your interests, skills, and availability.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What types of volunteer work are available?</Accordion.Header>
            <Accordion.Body>
              We work with a diverse range of volunteer groups, including but not limited to environmental conservation, community service, education, and healthcare. Explore our categories to find a cause that resonates with you.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>How do I sign up to volunteer?</Accordion.Header>
            <Accordion.Body>
              To sign up, create an account on our website, browse available opportunities, and click on &quot;Apply&quot; for the ones you&apos;re interested in.
              Follow the instructions provided by the organization to complete the application process.
              <div> <Link to="/signup"> Click here to register for an account.</Link> </div>

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>What age restrictions apply to volunteering?</Accordion.Header>
            <Accordion.Body>
              The age requirements can vary depending on the opportunity and organization. Check the details of each opportunity for specific age restrictions.
              Some opportunities may be suitable for families with children, while others may have a minimum age requirement.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>How can I track my volunteer hours?</Accordion.Header>
            <Accordion.Body>
              Once you&apos;ve volunteered, log in to your account and navigate to the &quot;My Profile&quot; or &quot;Dashboard&quot; section. You can view and track your volunteer hours there.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>

    </Row>
  </Container>
);

export default FrequentlyAskedQuestions;
