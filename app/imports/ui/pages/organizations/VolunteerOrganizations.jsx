import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';

const VolunteerOrganizations = () => {
  const { ready, organizations } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    const foundOrganizations = Organizations.find({}, {}).fetch();
    return {
      organizations: foundOrganizations,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container className="py-3 px-5" id={PAGE_IDS.LIST_ORGANIZATIONS}>
      View our organizations
      <Row xs={1} sm={2}>
        <Col>
          {organizations.map(organization => (
            <Container className="py-3" key={organization._id}>
              <Link to={`${organization.orgID}`}>
                <h4>{organization.name}</h4>
              </Link>
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
