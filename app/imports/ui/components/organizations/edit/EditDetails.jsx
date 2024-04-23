import React, { useState } from 'react';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import { Button, Col, Modal, Row } from 'react-bootstrap';
import { Organizations } from '../../../../api/organization/OrganizationCollection';
import { updateMethod } from '../../../../api/base/BaseCollection.methods';
import OrganizationPropTypes from '../../../../api/organization/OrganizationPropTypes';

const formSchema = new SimpleSchema({
  profit: Boolean,
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditDetails = ({ organization }) => {
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [showOwnershipModal, setShowOwnershipModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
  const handleVisibilityConfirm = (newVisibility) => {
    const collectionName = Organizations.getCollectionName();
    const updateData = {
      id: organization._id,
      visible: newVisibility === true ? 'true' : 'false',
    };
    console.log(updateData);
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Visibility updated successfully', 'success');
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
      <h4 className="mt-5" style={{ color: 'red' }}>Danger zone <ExclamationTriangle fontSize="20px" /></h4>
      <Row className="align-items-center">
        <Col>
          <div className="fw-bold">Visibility</div>
          <div>Your organization is currently {organization.visible ? 'public' : 'private'}.</div>
        </Col>
        <Col className="text-end"><Button onClick={() => setShowVisibilityModal(true)}>Change to {organization.visible ? 'private' : 'public'}</Button></Col>
      </Row>
      <Modal
        show={showVisibilityModal}
        onHide={() => setShowVisibilityModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Make {organization.name} {organization.visible ? 'private' : 'public'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to change your organization&apos;s visibility?
          {organization.visible ? (
            ' By clicking yes, your organization and any events under it will no longer be visible on Voluntree. '
          ) : (
            ' By clicking yes, your organization and any events under it will be visible on Voluntree. '
          )}
          You can change this back at any time.
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => {
            handleVisibilityConfirm(!organization.visible);
            setShowVisibilityModal(false);
          }}
          >
            Yes
          </Button>
          <Button onClick={() => setShowVisibilityModal(false)}>No</Button>
        </Modal.Footer>
      </Modal>
      <Row className="my-2 align-items-center">
        <Col>
          <div className="fw-bold">Transfer ownership</div>
          <div>You are the current owner of this organization.</div>
        </Col>
        <Col className="text-end"><Button>Transfer Ownership</Button></Col>
      </Row>
      <Row className="my-2 align-items-center">
        <Col>
          <div className="fw-bold">Delete organization</div>
          <div>This cannot be undone.</div>
        </Col>
        <Col className="text-end"><Button>Delete organization</Button></Col>
      </Row>
    </>
  );
};

EditDetails.propTypes = OrganizationPropTypes;

export default EditDetails;
