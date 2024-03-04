import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';

const VolunteerOrganizations = () => {
  const { orgID } = useParams();
  if (orgID) { // display just this requested organization
    const { ready, thisOrganization } = useTracker(() => {
      const subscription = Organizations.subscribeOrg();
      const rdy = subscription.ready();
      const foundOrganization = Organizations.findOne({ orgID: parseInt(orgID, 10) }, {});
      return {
        thisOrganization: foundOrganization,
        ready: rdy,
      };
    }, [orgID]);
    return (ready ? (
      <Container className="py-3 px-5" id={PAGE_IDS.LIST_ORGANIZATIONS}>
        {thisOrganization ? thisOrganization.name : 'No organization found'}
      </Container>
    ) : <LoadingSpinner />);
  }
  // else display all organizations
  const { ready, organizations } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    const foundOrganizations = Organizations.find({}, {});
    return {
      organizations: foundOrganizations,
      ready: rdy,
    };
  }, []);
  const navigate = useNavigate();
  return (ready ? (
    <Container className="py-3 px-5" id={PAGE_IDS.LIST_ORGANIZATIONS}>
      View our organizations
      <Row xs={1} sm={2}>
        <Col>
          {organizations.map(organization => (
            <Container className="py-3">
              <Button onClick={navigate()}>
                <h4>{organization.name}</h4>
              </Button>
              {organization.profit ? 'For-profit' : 'Non-profit'}<br />
              Location: {organization.location}<br />
              Website: {organization.website}<br />
              Categories
            </Container>
          ))}
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VolunteerOrganizations;
