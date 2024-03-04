import React, { useState } from 'react';
import { Container, Col, Row, Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const RegistrationFormCard = ({ event }) => {

  const exampleInfo = {
    name: 'John',
    email: 'John@foo.com',
    phone: '123-456-7890',
    availability: 'Weekends',
    skills: 'First Aid, Communication',
  };
  const [userInfo, setUserInfo] = useState(exampleInfo);

  const handleChange = (edit) => {
    const { name, value } = edit.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <Container>
      <Row className="justify-content-center my-5">
        <Col lg={6}>
          <Card>
            <Card.Header as="h2" className="text-center bg-primary text-white">events.</Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" id="fullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter Full Name"
                    required
                    value={userInfo.name}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={userInfo.email}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="phone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={userInfo.phone}
                    required
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="availability">
                  <Form.Label>Availability</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="availability"
                    rows={3}
                    placeholder="Let us know when you are available to volunteer"
                    value={userInfo.availability}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="skills">
                  <Form.Label>Skills and Interests</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="skills"
                    rows={3}
                    placeholder="Describe any special skills and interests"
                    value={userInfo.skills}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" id="comments">
                  <Form.Label>Additional Comments</Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comments"
                    rows={3}
                    placeholder="Any additional comments"
                  />
                </Form.Group>
                <Col>
                  <Button variant="primary" type="submit">
                    Submit Registration
                  </Button>

                  <Button as={Link} to={`/events/${event._id}`} variant="danger" type="button">
                    Cancel
                  </Button>
                </Col>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

RegistrationFormCard.propTypes = {
  event: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string.isRequired,
    eventDate: PropTypes.instanceOf(Date),
    description: PropTypes.string,
    category: PropTypes.string,
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string,
    coordinator: PropTypes.string,
    amountVolunteersNeeded: PropTypes.number,
    isOnline: PropTypes.bool,
    image: PropTypes.string,
    specialInstructions: PropTypes.string,
    owner: PropTypes.string,
  }).isRequired,
};

export default RegistrationFormCard;
