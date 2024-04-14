// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { Link } from 'react-router-dom';
import { PAGE_IDS } from '../utilities/PageIDs';
import FadeInSection from '../components/FadeInSection';
import './css/AboutUs.css';
import 'odometer/themes/odometer-theme-digital.css'; // Digital theme for Odometer
// eslint-disable-next-line import/order
import Odometer from 'react-odometerjs';

const VolunteeringImage = '../images/volunteerImage.jpg';
const VolunteerStaff = '../images/VolunteerStaff.jpg';
const VolunteerShovel = '../images/VolunteerShovel.jpg';

const AboutUs = () => (
  <Container id={PAGE_IDS.ABOUT_US} className="my-5">
    {/* <h1 className="text-center">About Us</h1> */}
    <Row>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5 style={{ textDecoration: 'none' }}>Hours Logged</h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Active Events </h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Persons Served</h5>
      </Col>
      <Col className="text-center">
        <Odometer value={Math.floor(Math.random() * 1000)} format="d" style={{ fontSize: '3rem' }} />
        <h5>Online Users</h5>
      </Col>
    </Row>
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
                        {/* eslint-disable-next-line max-len,react/no-unescaped-entities */}
                        Be part of a thriving community dedicated to making a difference. Whether you're looking to contribute your time, skills, or resources, there's a place for you here. With Voluntree, you can streamline your volunteer
                        journey, expand your network,
                        {/* eslint-disable-next-line react/no-unescaped-entities */}
                        Be part of a thriving community dedicated to making a difference. Whether you're looking to contribute your time, skills, or resources, there's a place for you here. With Voluntree, you can streamline your
                        volunteer journey, expand your network,
                        and amplify your impact, all in one place. Soon, you can join us in building a stronger,
                        more connected community through the power of volunteering.
                      </Card.Text>
                    </Card.Body>
                  </Col>

