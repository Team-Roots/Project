import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const OrganizationCard = ({ org }) => (
  <Card className="mb-3">
    <Card.Body>
      <Card.Title className="poppinsText">{org.name}</Card.Title>
      <Card.Subtitle className="mb-2 text-muted robotoText">{org.organizationOwner}</Card.Subtitle>
      <Card.Text className="robotoText">
        {org.website}
      </Card.Text>
      <Card.Text className="robotoText">
        Location: {org.location}
      </Card.Text>
      <Card.Text className="robotoText">
        Age Range: {org.ageRange.min} - {org.ageRange.max}
      </Card.Text>
    </Card.Body>
  </Card>
);

OrganizationCard.propTypes = {
  org: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    website: PropTypes.string.isRequired,
    organizationOwner: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    ageRange: PropTypes.instanceOf(Object).isRequired,
  }).isRequired,
};
export default OrganizationCard;
