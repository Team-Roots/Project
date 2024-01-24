import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const AboutUs = () => (
  <Container className="my-5">
    <Row>
      <Col>
        <h2 className="text-center mb-4">About Us</h2>
        <p>
          At The Voluntree, we believe in simplifying volunteering, fostering connections, and making an impact.
          Our platform empowers you to effortlessly discover, connect, and contribute to meaningful causes,
          all while connecting with like-minded individuals who share your passion.
        </p>
        <p>
          With The Voluntree, you can streamline your volunteer journey, expand your network,
          and amplify your impact, all in one place. Soon, you can join us in building a stronger,
          more connected community through the power of volunteering.
        </p>
      </Col>
    </Row>
  </Container>
);

export default AboutUs;
