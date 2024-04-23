import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Col, Row } from 'react-bootstrap';
import { Organizations } from '../../../../api/organization/OrganizationCollection';
import { updateMethod } from '../../../../api/base/BaseCollection.methods';
import OrganizationPropTypes from '../../../../api/organization/OrganizationPropTypes';
import DangerZone from './DangerZone';

const formSchema = new SimpleSchema({
  profit: Boolean,
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditDetails = ({ organization }) => {
  const currentUser = useTracker(() => Meteor.user());
  const submit = (data) => {
    console.log(data);
    const { _id, profit, location } = data;
    const collectionName = Organizations.getCollectionName();
    const updateData = {
      id: _id,
      profit,
      location,
    };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Organization updated successfully', 'success');
      });
  };
  return (
    <>
      <AutoForm schema={bridge} onSubmit={data => submit(data)} model={organization}>
        <TextField name="location" placeholder="The location your organization is based in" />
        <Row>
          <Col>
            <SelectField
              name="profit"
              label="Type"
              options={{ true: 'For-profit', false: 'Non-profit' }}
              placeholder="Is your organization for-profit or non-profit?"
            />
          </Col>
          <Col />
        </Row>
        <SubmitField value="Save Changes" />
        <ErrorsField />
      </AutoForm>
      {currentUser?.username === organization.organizationOwner && <DangerZone organization={organization} />}
    </>
  );
};

EditDetails.propTypes = OrganizationPropTypes;

export default EditDetails;
