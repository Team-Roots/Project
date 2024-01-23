import React from 'react';
import { Container, Col, Row, Image, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const RegistrationCard = () => (
  <Container>
    <Row className="justify-content-center align-items-center my-5">
      <Col md={4} className="p-0">
        <Image className="img-fluid w-100 h-100" src="https://static.wikia.nocookie.net/aesthetics/images/0/0e/Green.jpg/revision/latest?cb=20200723215419" />
      </Col>
      <Col md={8}>
        <Card className="mt-5">
          <Card.Header className="bg-transparent border-0 text-center">
            <h1>EVENT NAME</h1>
          </Card.Header>
          <Card.Body className="text-end">
            <Button as={Link} to="/registrationform" variant="danger" size="lg" className="mb-3">
              I Want to Help
            </Button>
            <ListGroup variant="flush" className="text-start">
              <ListGroup.Item><strong>ORGANIZATION: </strong></ListGroup.Item>
              <ListGroup.Item><strong>EVENT AREAS: </strong></ListGroup.Item>
              <ListGroup.Item><strong>WHEN: </strong></ListGroup.Item>
              <ListGroup.Item><strong>WHERE: </strong></ListGroup.Item>
              <ListGroup.Item><strong>DATE POSTED: </strong></ListGroup.Item>
              <ListGroup.Item><strong>DESCRIPTION: </strong></ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default RegistrationCard;
