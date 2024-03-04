import React from 'react';
import { Container, Col, Row, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
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
      <Container>
        <h3 style={{ textAlign: 'center' }}>Volunteer organizations in Hawaii</h3>
      </Container>
      <Row xs={1} sm={2}>
        <Col lg={2}>
          <h3 className="poppinsText">Filter by</h3>
          <h4 className="poppinsText">Location</h4>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Honolulu, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Pearl City, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Waimanalo, HI</FormCheckLabel>
          </FormCheck>
          <h4 className="poppinsText">Tags</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Animal Shelter</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Clean Up</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Donations</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Food Distribution</FormCheckLabel>
          </FormCheck>
          <br />
        </Col>
        <Col>
          <Container className="py-2">{organizations.length} organizations found:</Container>
          {organizations.map(organization => (
            <Container key={organization._id}>
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
