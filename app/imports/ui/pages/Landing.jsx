import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import LandingPanels from '../components/LandingPanels';
import { PAGE_IDS } from '../utilities/PageIDs';
import { Organizations } from '../../api/organization/OrganizationCollection';
import AboutUs from './AboutUs';
import { Events } from '../../api/event/EventCollection';

const Landing = () => {
  const { ready, orgs, events } = useTracker(() => {
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const orgItems = Organizations.find({}, { sort: { name: 1 } }).fetch();
    const subscription2 = Events.subscribeEvent();
    const rdy2 = subscription.ready();
    if (!subscription2.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    const eventItems = Events.find({}, { sort: { name: 1 }, limit: 4 }).fetch(); // Assuming the sort field is `name`
    console.log(eventItems);
    return {
      events: eventItems,
      orgs: orgItems,
      ready: rdy && rdy2,
    };
  }, []);
  const loggedin = Meteor.user();
  if (loggedin) {
    return (ready ? (
      <Container id={PAGE_IDS.LANDING}>
        <LandingPanels orgs={orgs} events={events} />
      </Container>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spinner animation="grow" />
      </div>
    )
    );
  }
  return (ready ? (
    <AboutUs id={PAGE_IDS.LANDING} />
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="grow" />
    </div>
  )
  );
};

export default Landing;
