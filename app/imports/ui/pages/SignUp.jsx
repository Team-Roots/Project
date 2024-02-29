import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PersonFill, EnvelopeFill, KeyFill, GiftFill , TelephoneFill, MapFill , PersonPlusFill   } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';


const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    skill: String,
    location: String,
    birthday: Date,
    phoneNumber: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const { firstName, lastName, email, password } = doc;
    // Adjust the code to handle the creation of the user with the correct parameters.
    Accounts.createUser({ email, password, profile: { firstName, lastName /* , other fields */ } }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  if (redirectToReferer) {
    // Use the proper redirect logic.
    return <Navigate to={location.state?.from || '/'} />;
  }

  return (
    <Container id={PAGE_IDS.SIGN_UP} fluid className="py-3">
      <Row className="justify-content-center align-items-center h-100">
        <Col md={6}>
          <AutoForm schema={bridge} onSubmit={submit}>
            <Card className="signUp shadow-lg">
              <Card.Body>
                {/* Image and heading */}
                <Row className="justify-content-center">
                  <Col xs={12} className="text-center">
                    <Image src="/images/Voluntree.logo.small.png" fluid width="100px" />
                    <h2>Welcome to Voluntree</h2>
                  </Col>
                </Row>
                {/* Form fields */}
                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <PersonFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First name" className="px-2 w-100" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <PersonPlusFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_SKILL} name="skill" placeholder="Skill" className="px-2 w-100" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <PersonFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last name" className="px-2 w-100" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <MapFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LOCATION} name="location" placeholder="Location" className="px-2 w-100" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <EnvelopeFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Email" className="px-2 w-100" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <GiftFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_BIRTHDAY} name="birthday" placeholder="Birthday" type="date" className="px-2 w-100" />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6} className="d-flex align-items-center">
                    <KeyFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" className="px-2 w-100" />
                  </Col>
                  <Col md={6} className="d-flex align-items-center">
                    <TelephoneFill size={30} />
                    <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PHONE_NUMBER} name="phoneNumber" placeholder="Phone Number" className="px-2 w-100" />
                  </Col>
                </Row>
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} className="mt-2" />
                <Alert variant="light">
                  Already a member? <Link to="/signin">Login here</Link>
                </Alert>
                {error && (
                  <Alert variant="danger">
                    <Alert.Heading>Registration was not successful</Alert.Heading>
                    <p>{error}</p>
                  </Alert>
                )}
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

SignUp.propTypes = {
  location: PropTypes.shape({
    // eslint-disable-next-line react/forbid-prop-types
    state: PropTypes.object,
  }),
};

SignUp.defaultProps = {
  location: {},
};

export default SignUp;
