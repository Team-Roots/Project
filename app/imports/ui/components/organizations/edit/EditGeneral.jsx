import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Organizations } from '../../../../api/organization/OrganizationCollection';
import { updateMethod } from '../../../../api/base/BaseCollection.methods';
import OrganizationPropTypes from './OrganizationPropTypes';

const formSchema = new SimpleSchema({
  name: String,
  mission: { type: String, optional: true },
  description: { type: String, optional: true },
  website: { type: String, optional: true },
  profit: Boolean,
  visible: Boolean,
  tags: { type: String, required: false },
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditGeneral = ({ organization }) => {
  const submit = (data) => {
    const { _id, name, mission, description, website, profit, visible, location } = data;
    const collectionName = Organizations.getCollectionName();
    const updateData = {
      id: _id,
      name,
      missionStatement: mission,
      description,
      website,
      profit,
      location,
      visible,
    };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Organization updated successfully', 'success');
      });
  };
  return (
    <>
      <h3>{organization.name}</h3>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={organization}>
        <Row>
          <Col>
            <TextField name="name" />
          </Col>
          <Col>
            <TextField name="website" />
          </Col>
        </Row>
        <TextField name="mission" placeholder="Your organization's mission statement" />
        <LongTextField name="description" placeholder="Describe your organization" />
        <Row>
          <Col>
            <SelectField
              name="profit"
              label="Type"
              options={{ true: 'For-profit', false: 'Non-profit' }}
              placeholder="Is your organization for-profit or non-profit?"
            />
          </Col>
          <Col>
            <SelectField
              name="visible"
              options={{ true: 'Yes', false: 'No' }}
            />
          </Col>
        </Row>
        <TextField name="location" placeholder="Your organization's location" />
        <TextField name="tags" placeholder="TEMPORARY" />
        <SubmitField value="Save Changes" />
        <ErrorsField />
      </AutoForm>
    </>
  );
};

EditGeneral.propTypes = OrganizationPropTypes;

export default EditGeneral;
