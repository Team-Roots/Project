import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Roles } from 'meteor/alanning:roles';
import { useTracker } from 'meteor/react-meteor-data';
import { useParams } from 'react-router-dom';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import { defineMethod } from '../../../api/base/BaseCollection.methods';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ROLE } from '../../../api/role/Role';
import NotAuthorized from '../NotAuthorized';
import NotFound from '../NotFound';

const ManageAdmins = () => {
  const currentUser = useTracker(() => Meteor.user());
  const { orgID } = useParams();
  const parsedOrgID = parseInt(orgID, 10);
  const { ready, thisOrganization } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
    return {
      thisOrganization: foundOrganization,
      ready: rdy,
    };
  }, [orgID]);
  console.log(parsedOrgID);
  if (!Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN])) {
    return <NotAuthorized />;
  }
  if (!thisOrganization) {
    return <NotFound />;
  }
  if (thisOrganization.organizationOwner !== currentUser?.username) {
    return <NotAuthorized />;
  }
  return ready ? (
    <Container id={PAGE_IDS.REGISTER_ORGANIZATION} className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          {thisOrganization.name}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default ManageAdmins;
