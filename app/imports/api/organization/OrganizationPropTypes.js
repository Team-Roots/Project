import PropTypes from 'prop-types';

const OrganizationPropTypes = {
  organization: PropTypes.shape({
    name: PropTypes.string,
    missionStatement: PropTypes.string,
    description: PropTypes.string,
    website: PropTypes.string,
    profit: PropTypes.bool,
    location: PropTypes.string,
    organizationOwner: PropTypes.string,
    visible: PropTypes.bool,
    onboarded: PropTypes.bool,
    orgID: PropTypes.number,
  }).isRequired,
};

export default OrganizationPropTypes;
