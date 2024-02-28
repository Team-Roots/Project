import React from 'react';
import { Container, Row, Col, FormCheck } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { Organizations } from '../../api/organization/OrganizationCollection';

const VolunteerOrganizations = () => {
  const { ready, organizations } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    const foundOrganizations = Organizations.find({}, {});
    return {
      organizations: foundOrganizations,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.LIST_ORGANIZATIONS}>
      <Row>
        <Col>
          {organizations.map(organization => (
            <h1>
              {organization.name}
            </h1>
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VolunteerOrganizations;
