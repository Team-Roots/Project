import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Navigate } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { Alert, Card, Col, Container, Image, Row } from 'react-bootstrap';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { PersonFill, EnvelopeFill, KeyFill } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
/**
 * SignUp component is similar to signin component, but we create a new user instead.
 */
const SignUp = ({ location }) => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    username: String,
    email: String,
    password: String,
    skill: String,
    location: String,
    birthday: Date,
    phoneNumber: String,
  });
  const bridge = new SimpleSchema2Bridge(schema);

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
  const submit = (doc) => {
    const { username, email, password } = doc;
    Accounts.createUser({ username, email, password }, (err) => {
      if (err) {
        setError(err.reason);
      } else {
        setError('');
        setRedirectToRef(true);
      }
    });
  };

  /* Display the signup form. Redirect to add page after successful registration and login. */
  const { from } = location?.state || { from: { pathname: '/faq' } };
  // if correct authentication, redirect to from: page instead of signup screen
  if (redirectToReferer) {
    return <Navigate to={from} />;
  }
  return (
    <Container id={PAGE_IDS.SIGN_UP} fluid className="py-3" style={{ height: '760px' }}>
      <Row className="justify-content-center align-items-center h-100">
        <Col sm={2} md={6}>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card className="signUp shadow-lg">
              <Card.Body>
                <div className="text-center"><h2>Welcome to Voluntree</h2></div>
                <Row className="justify-conetent-center  align-items-center">
                  <Col style={{ maxWidth: '50%' }}>
                    <div className="py-2 mt-3">Register Your Account Below</div>
                    <div className="d-flex flex-row align-items-center py-2">
                      <PersonFill size={30} />
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="username" placeholder="Your Username" className="px-2 w-100" />
                    </div>
                    <div className="d-flex flex-row align-items-center py-2">
                      <EnvelopeFill size={30} />
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="Your Email Address" className="px-2 w-100" />
                    </div>
                    <div className="d-flex flex-row align-items-center py-2">
                      <KeyFill size={30} />
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" className="px-2 w-100" />
                    </div>
                    <div className="d-flex flex-row align-items-center py-2">
                      <KeyFill size={30} />
                      <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" className="px-2 w-100" />
                    </div>
                    <ErrorsField />
                    <div className="py-3"><SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} /></div>
                    <Alert variant="light">
                      Already a member? Login
                      {' '}
                      <Link to="/signin">here</Link>
                    </Alert>
                    {error === '' ? (
                      ''
                    ) : (
                      <Alert variant="danger">
                        <Alert.Heading>Registration was not successful</Alert.Heading>
                        {error}
                      </Alert>
                    )}
                  </Col>
                  <Col className="text-center">
                    <Image src="/images/Signup-art.png" fluid width="500px" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

/* Ensure that the React Router location object is available in case we need to redirect. */
SignUp.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.string,
  }),
};

SignUp.defaultProps = {
  location: { state: '' },
};

export default SignUp;
