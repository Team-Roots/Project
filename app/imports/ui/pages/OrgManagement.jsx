import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ROLE } from '../../api/role/Role';
import NotAuthorized from './NotAuthorized';
import { Organizations } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const OrgManagement = () => {
  const { ready, organizations } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Organizations.subscribeOrg();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const foundOrganizations = Organizations.find().fetch();
    return {
      organizations: foundOrganizations,
      ready: rdy,
    };
  }, []);

  if (Roles.userIsInRole(Meteor.userId(), [ROLE.ORGADMIN])) {
    return ready ? (
      <Container>
        <Row>
          <Col>
            <h1>Manage Organizations</h1>
            {organizations.length ? organizations.map(organization => (
              <p>{organization.website}</p>
            )) : (
              <p>You are not a part of any organization</p>
            )}
          </Col>
        </Row>
      </Container>
    ) : (
      <LoadingSpinner />
    );
  }
  return <NotAuthorized />;
};

export default OrgManagement;
