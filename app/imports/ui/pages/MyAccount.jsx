import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Col, Container, Row, Card, Image, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';
import { UserProfiles } from '../../api/user/UserProfileCollection';
import { UserStats } from '../../api/user/UserStatisticsCollection';

/* Renders the MyAccount page, displaying all user info */
const MyAccount = () => {
  // eslint-disable-next-line no-unused-vars
  const handleGoalEventClick = (value) => {
    // need to make changes to the user profile collection for this to work
    const user = Meteor.user();
    const email = user ? user.username : null;
    Meteor.call('userStats.changeGoal', value, email, (error) => {
      if (error) {
        console.error('Error inserting event subscription:', error.reason);
      } else {
        console.log('Event subscription inserted successfully.');
      }
    });
  };

  // useTracker connects Meteor data to React components
  const { ready, account, stat } = useTracker(() => {
    // Get access to UserProfile documents.
    const subscription = UserProfiles.subscribe();
    const statsSubscription = UserStats.subscribeStats();
    // Determine if the subscription is ready
    const rdy = subscription.ready() && statsSubscription.ready();
    if (!rdy) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    // Get the Account documents
    const user = Meteor.user();
    const email = Meteor.user().username;
    const accountItems = UserProfiles.findOne({ email: email });
    const userStats = UserStats.findOne({ email: email });
    console.log(email);
    console.log(user);
    console.log(accountItems);
    console.log(userStats);
    return {
      account: accountItems,
      stat: userStats,
      ready: rdy,
    };
  }, []);

  return (ready ? (
    <Container id={PAGE_IDS.MY_ACCOUNT} className="py-3" fluid>
      <Row className="justify-content-center text-center pb-3">
        <Col>
          <h2>My Account</h2>
        </Col>
      </Row>

      <Row className="justify-content-center" xs={1} md={3} lg={3}>
        <Col>
          <Card fluid className="accountcard text-center m-2">
            <Card.Body>
              <Image
                className="py-2"
                height={200}
                roundedCircle
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              />
              <Card.Title className="pt-3 accountcardtitle">{account.firstName}</Card.Title>
              <Card.Title className="pb-3 accountcardtitle">{account.lastName}</Card.Title>
              <Card.Subtitle className="py-2 accountcardsubtitle">(808)123-4567</Card.Subtitle>
              <Card.Subtitle className="py-2 accountcardsubtitle">johndoe@gmail.com</Card.Subtitle>
              <Button className="align-bottom accountbutton">Edit Profile</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card fluid className="accountcard text-center mt-2">
            <Card.Body>
              <Card.Title className="py-2 pb-5 accountcardtitle">My Interests</Card.Title>
              <div id="Monthly Goal" className="pb-3">
                <Row>
                  <Col>
                    <h3>Monthly Goal</h3>
                  </Col>
                  <Col>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Button disabled={stat.monthlyGoal <= 1} onClick={() => handleGoalEventClick(-1)}>&lt;</Button>
                      <div style={{ margin: '0 10px' }}>{ stat.monthlyGoal } hr/month</div>
                      <Button disabled={stat.monthlyGoal > 100} onClick={() => handleGoalEventClick(1)}>&gt;</Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <ul className="list-unstyled py-2">
                <li><h3>Animal Shelter</h3></li>
                <li><h3>Clean ups</h3></li>
                <li><h3>Food Distribution</h3></li>
              </ul>
              <Button className="align-bottom accountbutton mt-5">Edit Interests</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col>
          <Card fluid className="accountcard text-center m-2">
            <Card.Body>
              <Card.Title className="py-2 pb-5 accountcardtitle">My Stats</Card.Title>
              <h1>256</h1>
              <h3>Hours Volunteered</h3>
              <h1>12</h1>
              <h3>Communities Reached</h3>
              <h1>12</h1>
              <h3>Persons Served</h3>
              <Button className="align-bottom accountbutton mt-5">Print Stats PDF</Button>
            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  ) : <LoadingSpinner message="Loading..." />);
};

export default MyAccount;
