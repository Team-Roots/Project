import React, { useState } from 'react';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Alert, Card, Col, Container, Row, Image } from 'react-bootstrap';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, SubmitField, TextField, DateField } from 'uniforms-bootstrap5';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { defineMethod } from '../../api/base/BaseCollection.methods';

const SignUp = () => {
  const [error, setError] = useState('');
  const [redirectToReferer, setRedirectToRef] = useState(false);

  const schema = new SimpleSchema({
    firstName: String,
    lastName: String,
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    password: { type: String, min: 6 }, // Minimum length of 6 characters for the password
    skill: String, // Assuming skill is just a text input
    location: String,
    birthday: Date, // Changed to Date type
    phoneNumber: {
      type: String,
      regEx: SimpleSchema.RegEx.Phone, // Basic phone number validation
    },
  });
  const bridge = new SimpleSchema2Bridge(schema);

  const submit = (doc) => {
    const collectionName = UserProfiles.getCollectionName();
    const definitionData = doc;
    defineMethod.callPromise({ collectionName, definitionData })
      .then(() => {
        const { email, password } = doc;
        Meteor.loginWithPassword(email, password, (err) => {
          if (err) {
            setError(err.reason);
          } else {
            setError('');
            setRedirectToRef(true);
          }
        });
      })
      .catch((err) => setError(err.reason));
  };

  if (redirectToReferer) {
    return <Navigate to="/add" />;
  }

  return (
    <Container id={PAGE_IDS.SIGN_UP} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <Image src="/images/Voluntree.logo.small.png" roundedCircle />
            <h2>Register your Voluntree account</h2>
          </Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_FIRST_NAME} name="firstName" placeholder="First name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_LAST_NAME} name="lastName" placeholder="Last name" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_EMAIL} name="email" placeholder="E-mail address" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PASSWORD} name="password" placeholder="Password" type="password" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_SKILL} name="skill" placeholder="Skill" />
                <DateField id={COMPONENT_IDS.SIGN_UP_FORM_BIRTHDAY} name="birthday" placeholder="Birthday" />
                <TextField id={COMPONENT_IDS.SIGN_UP_FORM_PHONE_NUMBER} name="phoneNumber" placeholder="Phone Number" />
                <ErrorsField />
                <SubmitField id={COMPONENT_IDS.SIGN_UP_FORM_SUBMIT} />
              </Card.Body>
            </Card>
          </AutoForm>
          <Alert variant="secondary">
            Already have an account? Login <Link to="/signin">here</Link>
          </Alert>
          {error && (
            <Alert variant="danger">
              <Alert.Heading>Registration was not successful</Alert.Heading>
              {error}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
