import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Container, Row, Col } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { ROLE } from '../../api/role/Role';
import NotAuthorized from './NotAuthorized';
import { Stuffs } from '../../api/stuff/StuffCollection';
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
    const foundOrganizations = Stuffs.find().fetch();
    return {
      organizations: foundOrganizations,
      ready: rdy,
    };
  }, []);
  console.log("asdf", organizations);
  if (Roles.userIsInRole(Meteor.userId(), [ROLE.ADMIN])) {
    return ready ? (
      <Container>
        <Row>
          <Col>
            <p>Organization Management Dashboard</p>
            {organizations.map(organization => (
              <p>adsfasdf</p>
            ))}
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
