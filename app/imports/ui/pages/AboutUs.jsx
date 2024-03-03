// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import FadeInSection from '../components/FadeInSection';
import './css/AboutUs.css';
import 'odometer/themes/odometer-theme-digital.css'; // Digital theme for Odometer
import Odometer from 'react-odometerjs';

const VolunteeringImage = '../images/volunteerImage.jpg';
const VolunteerStaff = '../images/VolunteerStaff.jpg';
const VolunteerShovel = '../images/VolunteerShovel.jpg';

const AboutUs = () => (
  <Container id={PAGE_IDS.ABOUT_US} className="my-5">
    <Row>
      <Col>
        <FadeInSection />
        <Container fluid className="my-5">
          <Row>
            <Col>
              <Card>
                <Row className="g-0">
                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Card.Img src={VolunteerStaff} alt="Volunteering" className="img-fluid" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <Card.Body>
                      <Card.Title>GET TO KNOW US</Card.Title>
                      <Card.Text>
                        At Voluntree, we believe in simplifying volunteering, fostering connections, and making an impact.
                        Our platform empowers you to effortlessly discover, connect, and contribute to meaningful causes,
                        all while connecting with like-minded individuals who share your passion.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container fluid className="my-5">
          <Row>
            <Col>
              <Card>
                <Row className="g-0">
                  <Col md={6} className="d-flex align-items-center">
                    <Card.Body>
                      <Card.Title>Join Our Community</Card.Title>
                      <Card.Text>
                        Be part of a thriving community dedicated to making a difference. Whether you're looking to contribute your time, skills, or resources, there's a place for you here. With Voluntree, you can streamline your
                        volunteer journey, expand your network,
                        and amplify your impact, all in one place. Soon, you can join us in building a stronger,
                        more connected community through the power of volunteering.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Card.Img src={VolunteeringImage} alt="Volunteering" className="img-fluid" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container fluid className="my-5">
          <Row>
            <Col>
              <Card>
                <Row className="g-0">
                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Card.Img src={VolunteerShovel} alt="Volunteering" className="img-fluid" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <Card.Body>
                      <Card.Title>WHAT ARE YOU WAITING FOR?</Card.Title>
                      <Card.Text>
                        Sign up today to unlock all the benefits Voluntree has to offer!
                        <div><Link to="/signup"> Click here to register for an account.</Link></div>
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
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
          </Accordion>
        </FadeInSection>
      </Col>
    </Row>
    <div>
      <h1 className="text-center">About Effort</h1>
      <Row>
        <Col className="text-center">
          <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
          <h5 style={{ textDecoration: 'none' }}>Hours Logged</h5>
        </Col>
        <Col className="text-center">
          <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
          <h5>Persons Served</h5>
        </Col>
        <Col className="text-center">
          <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
          <h5>Active Volunteer Hours</h5>
        </Col>
        <Col className="text-center">
          <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
          <h5>Communities Changed</h5>
        </Col>
      </Row>
    </div>

  </Container>
);

export default AboutUs;
