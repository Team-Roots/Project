import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { ExclamationTriangle } from 'react-bootstrap-icons';
import { Button, Col, FormCheck, ListGroup, Modal, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';
import OrganizationPropTypes from '../../../../api/organization/OrganizationPropTypes';
import LoadingSpinner from '../../LoadingSpinner';
import { OrganizationAdmin } from '../../../../api/organization/OrganizationAdmin';
import { Organizations } from '../../../../api/organization/OrganizationCollection';
import { updateMethod } from '../../../../api/base/BaseCollection.methods';

const DangerZone = ({ organization }) => {
  const navigate = useNavigate();
  const [showVisibilityModal, setShowVisibilityModal] = useState(false);
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [transferAdmin, setTransferAdmin] = useState();
  const [acknowledgedTransfer, setAcknowledgedTransfer] = useState(false);

  const { orgAdmins, ready } = useTracker(() => {
    const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
    const rdy = orgAdminSubscription.ready();
    const foundOrgAdmins = OrganizationAdmin.find({
      $and: [
        { orgID: organization.orgID },
        { orgAdmin: { $not: organization.organizationOwner } },
      ],
    }, {}).fetch();
    return {
      orgAdmins: foundOrgAdmins,
      ready: rdy,
    };
  });
  const handleVisibilityConfirm = (newVisibility) => {
    const collectionName = Organizations.getCollectionName();
    const updateData = {
      id: organization._id,
      visible: newVisibility === true ? 'true' : 'false',
    };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Visibility updated successfully', 'success');
      });
  };
  const handleTransferConfirm = () => {
    const transferInfo = {
      orgID: organization.orgID,
      oldOwner: organization.organizationOwner,
      newOwner: transferAdmin,
    };
    Meteor.call('organization.transferOwnership', transferInfo, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Ownership transferred successfully', 'success');
      }
    });
  };
  const handleDeleteConfirm = () => {
    const deleteInfo = {
      orgID: organization.orgID,
      deleter: Meteor.user().username,
    };
    Meteor.call('organization.delete', deleteInfo, (error) => {
      if (error) {
        swal('Error', error.message, 'error');
      } else {
        swal('Success', 'Organization deleted successfully', 'success');
        navigate('/organizations');
      }
    });
  };

  return (
    <>
      <h4 className="mt-5" style={{ color: 'red' }}>Danger zone <ExclamationTriangle fontSize="20px" /></h4>
      <Row className="align-items-center">
        <Col>
          <div className="fw-bold">Visibility</div>
          <div>Your organization is currently {organization.visible ? 'public' : 'private'}.</div>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => setShowVisibilityModal(true)}
            variant="danger"
          >
            Change to {organization.visible ? 'private' : 'public'}
          </Button>
        </Col>
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
            ' By confirming, your organization and any events under it will no longer be visible on Voluntree. '
          ) : (
            ' By confirming, your organization and any events under it will be visible on Voluntree. '
          )}
          You can change this back at any time.
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              handleVisibilityConfirm(!organization.visible);
              setShowVisibilityModal(false);
            }}
            variant="danger"
          >
            Confirm
          </Button>
          <Button
            onClick={() => setShowVisibilityModal(false)}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="my-2 align-items-center">
        <Col>
          <div className="fw-bold">Transfer ownership</div>
          <div>You are the current owner of this organization.</div>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => setShowTransferModal(true)}
            variant="danger"
          >
            Transfer ownership
          </Button>
        </Col>
      </Row>
      <Modal
        show={showTransferModal}
        onHide={() => setShowTransferModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Transfer ownership of {organization.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ready ? (
            <>
              <ListGroup defaultActiveKey={transferAdmin} className="overflow-y-auto" style={{ maxHeight: '40rem' }}>
                {orgAdmins.map((orgAdmin) => (
                  <ListGroup.Item key={orgAdmin.orgAdmin} action eventKey={orgAdmin.orgAdmin} onClick={() => setTransferAdmin(orgAdmin.orgAdmin)}>
                    {orgAdmin.orgAdmin}
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <FormCheck
                onChange={(e) => setAcknowledgedTransfer(e.target.checked)}
                className="mt-3"
                label="I acknowledge that I am transferring ownership of this organization, demoting myself to an admin, and Voluntree bears no responsibility for this action."
              />
            </>
          ) : <LoadingSpinner />}
        </Modal.Body>
        <Modal.Footer>
          {transferAdmin && <div>Transfer ownership to: {transferAdmin}</div>}
          <Button
            disabled={!(acknowledgedTransfer && transferAdmin)}
            onClick={() => handleTransferConfirm()}
            variant="danger"
          >
            Transfer
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="my-2 align-items-center">
        <Col>
          <div className="fw-bold">Delete organization</div>
          <div>This cannot be undone.</div>
        </Col>
        <Col className="text-end">
          <Button
            onClick={() => setShowDeleteModal(true)}
            variant="danger"
          >
            Delete organization
          </Button>
        </Col>
      </Row>
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete {organization.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this organization? All events under this organization will be deleted as well.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Confirm
          </Button>
          <Button onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

DangerZone.propTypes = OrganizationPropTypes;

export default DangerZone;
