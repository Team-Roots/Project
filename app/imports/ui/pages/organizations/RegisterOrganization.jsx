import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import NotFound from '../NotFound';

const VolunteerOrganizations = () => {
  return (
    <Container className="py-3 px-5" id={PAGE_IDS.VIEW_ORGANIZATION}>
      <Row className="justify-content-center">
        <Col style={{ maxWidth: '50rem' }}>
          register organization
        </Col>
      </Row>
    </Container>
  );
};

export default VolunteerOrganizations;
