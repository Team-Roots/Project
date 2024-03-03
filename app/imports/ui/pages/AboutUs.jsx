import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import FadeInSection from '../components/FadeInSection';
import './css/AboutUs.css';

const VolunteeringImage = '../images/volunteerImage.jpg';
const VolunteerStaff = '../images/VolunteerStaff.jpg';

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
                        Be part of a thriving community dedicated to making a difference. Whether you're looking to contribute your time, skills, or resources, there's a place for you here.
                      </Card.Text>
                    </Card.Body>
                  </Col>
                  <Col md={6} className="d-flex align-items-center justify-content-center">
                    <Card.Img src={VolunteeringImage} alt="Volunteering" className="imgaa-fluid" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
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
