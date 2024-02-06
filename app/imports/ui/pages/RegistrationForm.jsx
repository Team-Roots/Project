// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const exampleInfo = {
  name: 'John',
  email: 'John@foo.com',
  phone: '123-456-7890',
  availability: 'Weekends',
  skills: 'First Aid, Communication',
};

const RegistrationForm = () => {
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
            <Card.Header as="h2" className="text-center bg-primary text-white">Volunteer Event Registration Form</Card.Header>
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

                <Button variant="primary" type="submit">
                  Submit Registration
                </Button>

              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationForm;
