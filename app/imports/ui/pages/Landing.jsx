import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import LandingPanels from '../components/LandingPanels';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organization } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const Landing = () => {
  const { ready, orgs } = useTracker(() => {
    const subscription = Organization.subscribeOrg();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const orgItems = Organization.find({}, { sort: { orgID: 1 } }).fetch();
    console.log(orgItems);
    return {
      orgs: orgItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <LandingPanels id={PAGE_IDS.LANDING} />
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default Landing;
