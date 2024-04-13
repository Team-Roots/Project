import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Container, Form, ListGroup, InputGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import swal from 'sweetalert';
import LoadingSpinner from '../../LoadingSpinner';
import { OrganizationAdmin } from '../../../../api/organization/OrganizationAdmin';
import OrganizationPropTypes from './OrganizationPropTypes';
import { defineMethod, removeItMethod } from '../../../../api/base/BaseCollection.methods';
import { UserProfiles } from '../../../../api/user/UserProfileCollection';

const EditAdmins = ({ organization }) => {
  const currentUser = useTracker(() => Meteor.user());
  const { orgAdmins, ready } = useTracker(() => {
    const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
    const userProfileSubscription = UserProfiles.subscribe();
    const rdy = orgAdminSubscription.ready() && userProfileSubscription.ready();
    const foundOrgAdmins = OrganizationAdmin.find({ orgAdmin: { $not: currentUser?.username }, orgID: organization.orgID }, {}).fetch();
    return {
      orgAdmins: foundOrgAdmins,
      ready: rdy,
    };
  });
  const [email, setEmail] = useState('');
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmail('');
    if (email === '') {
      swal('Error', 'Please enter an email.', 'error');
      return;
    }
    const userExists = UserProfiles.findOne({ email }, {});
    console.log(userExists);
    if (!userExists) {
      swal('Error', 'This user does not yet have an account.', 'error');
      return;
    }
    const existingOrgAdmin = OrganizationAdmin.findOne({ orgAdmin: email, orgID: organization.orgID }, {});
    if (existingOrgAdmin) {
      swal('Error', 'This user is already an admin.', 'error');
      return;
    }
    const collectionName = OrganizationAdmin.getCollectionName();
    const definitionData = {
      orgAdmin: email,
      orgID: organization.orgID,
    };
    defineMethod.callPromise({ collectionName, definitionData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Admin added successfully', 'success');
      });
  };
  const handleRemove = (orgAdmin) => {
    console.log(orgAdmin);
    const collectionName = OrganizationAdmin.getCollectionName();
    removeItMethod.callPromise({ collectionName, instance: orgAdmin })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Admin removed successfully', 'success');
      });
  };
  return ready ? (
    <Container>
      <div>
        <h3>Add an admin</h3>
        <div className="d-flex">
          <Form onSubmit={handleSubmit}> {/* Attach handleSubmit function to form submission */}
            <InputGroup className="mb-2">
              <Form.Control placeholder="Email" value={email} onChange={handleEmailChange} /> {/* Controlled input */}
              <Button type="submit" variant="outline-primary">Add</Button> {/* Use type="submit" to submit the form */}
            </InputGroup>
          </Form>
        </div>
      </div>
      <h3 className="mt-3">Manage admins</h3>
      <ListGroup>
        {orgAdmins.map(orgAdmin => (
          <ListGroup.Item>
            <div className="d-flex justify-content-between align-items-center">
              <div>
                {orgAdmin.orgAdmin} <br />
                Date added: {orgAdmin.dateAdded.toLocaleDateString()}
              </div>
              <div>
                <Button variant="danger" onClick={() => handleRemove(orgAdmin)}>Remove</Button>
              </div>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  ) : (
    <LoadingSpinner />
  );
};

EditAdmins.propTypes = OrganizationPropTypes;

export default EditAdmins;
