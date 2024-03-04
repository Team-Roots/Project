import React from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import NotFound from '../NotFound';

const VolunteerOrganizations = () => {
  const { orgID } = useParams();
  const parsedOrgID = parseInt(orgID, 10);
  console.log("org id is ", parsedOrgID);
  if (orgID) { // display just this requested organization
    const { ready, thisOrganization } = useTracker(() => {
      const subscription = Organizations.subscribeOrg();
      const rdy = subscription.ready();
      const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
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
  // if there is no org with the id from the parameters
  return <NotFound />;
};

export default VolunteerOrganizations;
