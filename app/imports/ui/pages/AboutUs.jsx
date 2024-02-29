import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import FadeInSection from '../components/FadeInSection';
// eslint-disable-next-line no-unused-vars
import Odometer from 'react-odometerjs';
import 'odometer/themes/odometer-theme-digital.css'; // Digital theme for Odometer

const AboutUs = () => (
  <Container id={PAGE_IDS.ABOUT_US} className="my-5">
    <Row>
      <Col>
        <FadeInSection>
          <h2 className="text-center mb-4">About Us</h2>
        </FadeInSection>
        <FadeInSection>
          <p>
            At Voluntree, we believe in simplifying volunteering, fostering connections, and making an impact.
            Our platform empowers you to effortlessly discover, connect, and contribute to meaningful causes,
            all while connecting with like-minded individuals who share your passion.
          </p>
        </FadeInSection>
        <br />
        <br />
        <FadeInSection>
          <p>
            With Voluntree, you can streamline your volunteer journey, expand your network,
            and amplify your impact, all in one place. Soon, you can join us in building a stronger,
            more connected community through the power of volunteering.
          </p>
        </FadeInSection>
        <br />
        <br />
        <FadeInSection>
          <Accordion defaultActiveKey="0" className="faq-accordion">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Be An Event Organizer!</Accordion.Header>
              <Accordion.Body>
                Become an event organizer to start creating an managing volunteer
                events for others to join! Appoint admins to help manage your events and aid those who are interested. As an event organizer you can track how many people are interested and have signed up.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Find Volunteer Events Built Around Your Interests!</Accordion.Header>
              <Accordion.Body>
                Find Events that cater to your interests and abilities. Finding events are super simple with easy search methods and recommendations based on your previous volunteer work!
                Track your volunteer progress through the user dashboard and aim to hit your monthly goals!
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>What Are You Waiting For?</Accordion.Header>
              <Accordion.Body>
                Sign up today to unlock all the benefits Voluntree has to offer!
                <div> <Link to="/signup"> Click here to register for an account.</Link> </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </FadeInSection>
      </Col>
    </Row>
  </Container>
);

export default AboutUs;
