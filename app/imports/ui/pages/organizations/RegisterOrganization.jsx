import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { AutoForm, ErrorsField, NumField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import NotFound from '../NotFound';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { Stuffs } from '../../../api/stuff/StuffCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';

const formSchema = new SimpleSchema({
  name: String,
  website: { type: String, optional: true },
  profit: Boolean,
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const VolunteerOrganizations = () => {
  const submit = (data, formRef) => {
    const { name, quantity, condition } = data;
    const owner = Meteor.user().username;
    const collectionName = Stuffs.getCollectionName();
    const definitionData = { name, quantity, condition, owner };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Item added successfully', 'success');
        formRef.reset();
      });
  };
  let fRef = null;
  return (
    <Container id={PAGE_IDS.REGISTER_ORGANIZATION} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center"><h2>Add Stuff</h2></Col>
          <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => submit(data, fRef)}>
            <Card>
              <Card.Body>
                <TextField name="name" />
                <NumField name="quantity" decimal={null} />
                <SelectField name="condition" />
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
