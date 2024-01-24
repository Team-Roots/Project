import React from 'react';
import { Col, Container, Row, Card, Image, Button } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { Stuffs } from '../../api/stuff/StuffCollection';
import StuffItem from '../components/StuffItem';
import LoadingSpinner from '../components/LoadingSpinner';
import { PAGE_IDS } from '../utilities/PageIDs';

/* Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
const MyAccount = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { ready, stuffs } = useTracker(() => {
    // Note that this subscription will get cleaned up
    // when your component is unmounted or deps change.
    // Get access to Stuff documents.
    const subscription = Stuffs.subscribeStuff();
    // Determine if the subscription is ready
    const rdy = subscription.ready();
    // Get the Stuff documents
    const stuffItems = Stuffs.find({}, { sort: { name: 1 } }).fetch();
    return {
      stuffs: stuffItems,
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
                <Image className="py-2" height={200} roundedCircle
                     src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"></Image>
                <Card.Title className="pt-3 accountcardtitle">John</Card.Title>
                <Card.Title className="pb-3 accountcardtitle">Doe</Card.Title>
                <Card.Subtitle className="py-2 accountcardsubtitle">(808)123-4567</Card.Subtitle>
                <Card.Subtitle className="py-2 accountcardsubtitle">johndoe@gmail.com</Card.Subtitle>
                <Button className="align-bottom accountbutton">Edit Profile</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card fluid className="accountcard text-center mt-2">
              <Card.Body>
                <Card.Title className="py-2 accountcardtitle">My Interests</Card.Title>
                <Button className="align-bottom accountbutton">Edit Interests</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card fluid className="accountcard text-center m-2">
              <Card.Body>
                <Card.Title className="py-2 accountcardtitle">My Stats</Card.Title>
                <Button className="align-bottom accountbutton">Print Stats PDF</Button>
              </Card.Body>
            </Card>
          </Col>

        </Row>
      </Container>
  ) : <LoadingSpinner message="Loading Stuff" />);
};

export default MyAccount;
