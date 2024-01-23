import React from 'react';
import { Button, Card, Image, Row, Col } from 'react-bootstrap';

const EventCard = () => (
  <Card className="h-100">
    <Card.Header>
      <Row>
        <Col className="justify-content-start">
          <Image src="https://static.wikia.nocookie.net/aesthetics/images/0/0e/Green.jpg/revision/latest?cb=20200723215419" width="100" />
        </Col>
        <Col className="justify-content-end">
          <Card.Title>Event Name</Card.Title>
          <Card.Subtitle>
            Organization<br />
            Location<br />
            Date and Time<br />
          </Card.Subtitle>
        </Col>
      </Row>
    </Card.Header>
    <Card.Body>
      <Card.Text>Description</Card.Text>
      <Row>
        <Col className="justify-content-start">
          <Button>Connect</Button>
        </Col>
        <Col className="justify-content-end">
          <Button>Commit</Button>
        </Col>
      </Row>
    </Card.Body>
  </Card>
);

export default EventCard;
