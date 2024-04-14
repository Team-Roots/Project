import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../utilities/PageIDs';
import { AdminProfiles } from '../../api/user/AdminProfileCollection';
import LoadingSpinner from '../components/LoadingSpinner';

const Admin = () => {

  const { ready, email } = useTracker(() => {
    // Ensure that minimongo is populated with all collections prior to running render().
    const sub1 = AdminProfiles.subscribe();
    return {
      ready: sub1.ready(),
      email: Meteor.user()?.username,
    };
  }, []);
  const profile = AdminProfiles.findOne({ email });
  return ready ? (
    <Container id={PAGE_IDS.ADMIN_PAGE} className="py-3">
      <h1>Admin Profile</h1>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>First Name:</strong> {profile.firstName}</p>
      <p><strong>Last Name:</strong> {profile.lastName}</p>
      <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
    </Container>
  ) : <LoadingSpinner />;
};
export default Admin;
