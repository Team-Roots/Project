import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const OrganizationCard = ({ org }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{org.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{org.organizationOwner}</Card.Subtitle>
        <Card.Text>
          {org.website}
        </Card.Text>
        <Card.Text>
          Location: {org.location}
        </Card.Text>
        <Card.Text>
          Coordinator: {org.ageRange}
        </Card.Text>
        {/* Replace the button with a Link component for navigation */}
        <Link to={`/edit-event/${org._id}`} className="btn btn-primary">Edit</Link>
      </Card.Body>
    </Card>
  );
};

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
