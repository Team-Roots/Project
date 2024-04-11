import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, Row, Col, ListGroup, Modal, InputGroup } from 'react-bootstrap';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { PersonFillAdd } from 'react-bootstrap-icons';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROLE } from '../../../api/role/Role';
import NotAuthorized from '../NotAuthorized';
import NotFound from '../NotFound';
import { OrganizationAdmin } from '../../../api/organization/OrganizationAdmin';

const ManageAdmins = () => {
  const currentUser = useTracker(() => Meteor.user());
  const { orgID } = useParams();
  const parsedOrgID = parseInt(orgID, 10);
  const { ready, thisOrganization, thisOrganizationAdmins } = useTracker(() => {
    const orgSubscription = Organizations.subscribeOrg();
    const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
    const rdy = orgSubscription.ready() && orgAdminSubscription.ready();
    const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
    const foundOrganizationAdmins = OrganizationAdmin.find({ orgID: parsedOrgID, orgAdmin: { $not: currentUser?.username } }, {}).fetch();
    return {
      ready: rdy,
      thisOrganization: foundOrganization,
      thisOrganizationAdmins: foundOrganizationAdmins,
    };
  }, [orgID]);
  const [showModal, setShowModal] = useState(false);
  const handleAddAdmin = (event) => {
    console.log(event);
  };
  if (ready) {
    if (!Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN])) {
      return <NotAuthorized />;
    }
    if (!thisOrganization) {
      return <NotFound />;
    }
    if (thisOrganization.organizationOwner !== currentUser?.username) {
      return <NotAuthorized />;
    }
    return (
      <Container id={PAGE_IDS.REGISTER_ORGANIZATION} className="py-3">
        <Row className="justify-content-center">
          <Col className="d-flex justify-content-between">
            <h2>{thisOrganization.name} Admins</h2>
            <Button onClick={() => setShowModal(true)}><PersonFillAdd /></Button>
            <Modal show={showModal} onHide={() => setShowModal(false)} centered keyboard animation>
              <Modal.Body closeButton>
                <Form onSubmit={handleAddAdmin}>
                  <Form.Label>Add an admin</Form.Label>
                  <InputGroup className="mb-2">
                    <Form.Control placeholder="Email" />
                    <Button variant="outline-secondary" onClick={(event) => console.log('CLICKED', event)}>Add</Button>
                  </InputGroup>
                </Form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
        <Row>
          <Col>
            <ListGroup>
              {thisOrganizationAdmins.map(orgAdmin => (
                <ListGroup.Item>{orgAdmin.orgAdmin}</ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
  return <LoadingSpinner />;
};

export default ManageAdmins;
