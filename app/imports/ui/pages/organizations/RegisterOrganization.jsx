import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  name: String,
  website: { type: String, optional: true },
  type: { type: String, allowedValues: ['For-profit', 'Non-profit'] },
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const VolunteerOrganizations = () => {
  const submit = (data) => {
    console.log(data);
    const { name, website, type, location } = data;
    const organizationOwner = Meteor.user().username;
    const profit = type === 'For-profit';
    const visible = false;
    const onBoarded = true;
    const backgroundCheck = false;
    const ageRange = { min: 18, max: 99 };
    const collectionName = Organizations.getCollectionName();
    const definitionData = {
      name,
      website,
      profit,
      location,
      organizationOwner,
      visible,
      onBoarded,
      backgroundCheck,
      ageRange,
    };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
      });
  };
  return (
    <Container id={PAGE_IDS.REGISTER_ORGANIZATION} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Create your organization</h2></Col>
          <AutoForm schema={bridge} onSubmit={data => submit(data)}>
            <Card>
              <Card.Body>
                <TextField name="name" placeholder="Your organization's name" />
                <TextField name="website" placeholder="Your organization's website" />
                <SelectField name="type" placeholder="Is your organization for-profit or non-profit?" />
                <TextField name="location" />
                <SubmitField value="Submit" />
                <ErrorsField />
              </Card.Body>
            </Card>
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerOrganizations;
