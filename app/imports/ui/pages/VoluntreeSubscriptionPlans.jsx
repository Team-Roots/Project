import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, Col, Container, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { VoluntreeSubscriptions } from '../../api/voluntreesubscription/VoluntreeSubscriptionCollection';
import LoadingSpinner from '../components/LoadingSpinner';
import { defineMethod } from '../../api/base/BaseCollection.methods';

/** Render a Not Found page if the user enters a URL that doesn't match any route. */
const VoluntreeSubscriptionPlans = () => {
  const currentUser = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  const { existingSubscription, ready } = useTracker(() => {
    const vSubSubscription = VoluntreeSubscriptions.subscribeVoluntreeSubscription();
    const rdy = vSubSubscription.ready();
    const foundExistingSubscription = VoluntreeSubscriptions.findOne({ email: currentUser?.username }, {});
    return {
      existingSubscription: foundExistingSubscription,
      ready: rdy,
    };
  });
  const handlePurchaseClick = () => {
    if (!currentUser) {
      navigate('/signup');
      return;
    }
    if (existingSubscription) {
      console.log('something');
      swal('Error', 'You already have a Voluntree subscription.', 'error');
      return;
    }
    const collectionName = VoluntreeSubscriptions.getCollectionName();
    const definitionData = {
      email: currentUser.username,
    };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Thank you for purchasing a Voluntree subscription!', 'success')
          .then(() => {
            navigate('/organizations/register');
          });
      });
  };
  return ready ? (
    <Container>
      <Row className="py-3 justify-content-center">
        <Col className="text-center">
          <h2>
            Voluntree Subscription Plans
          </h2>
          <p>Register your organization with Voluntree and start recruiting volunteers for your events today!</p>
        </Col>
      </Row>
      <Row>
        <Col className="text-center">
          <h3>Plans</h3>
          <p>Plan 1</p>
          <p>$9.99/month</p>
          <Button onClick={handlePurchaseClick}>Purchase</Button>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />;
};

export default VoluntreeSubscriptionPlans;
