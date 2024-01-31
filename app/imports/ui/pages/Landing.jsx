import React from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import LandingPanels from '../components/LandingPanels';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organizations } from '../../api/organization/OrganizationCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const Landing = () => {
  const { ready, orgs } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const orgItems = Organizations.find({}, { sort: { name: 1 } }).fetch();
    console.log(orgItems);
    return {
      orgs: orgItems,
      ready: rdy,
    };
  }, []);
  return (ready ? (
    <Container>
      <LandingPanels id={PAGE_IDS.LANDING} orgs={orgs} />
    </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default Landing;
