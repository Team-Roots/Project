import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, TextField, NumField, DateField, LongTextField, SubmitField, BoolField } from 'uniforms-bootstrap5';
import { useTracker } from 'meteor/react-meteor-data';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '../../../api/event/EventCollection';
import LoadingSpinner from '../../components/LoadingSpinner';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { OrganizationAdmin } from '../../../api/organization/OrganizationAdmin';
import { ROLE } from '../../../api/role/Role';
import NotAuthorized from '../NotAuthorized';
import NotFound from '../NotFound';
import { updateMethod } from '../../../api/base/BaseCollection.methods';

const bridge = new SimpleSchema2Bridge(Events._schema);

const EditEvent = () => {
  const currentUser = useTracker(() => Meteor.user());
  const { _id } = useParams();
  const navigate = useNavigate();
  const { thisEvent, allowedToEdit, ready } = useTracker(() => {
    const eventSubscription = Events.subscribeEvent();
    const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
    const rdy = eventSubscription.ready() && orgAdminSubscription.ready();
    const event = Events.findOne(_id);
    const orgAdmin = OrganizationAdmin.findOne({ orgAdmin: currentUser?.username, orgID: event?.organizationID }, {});
    return {
      thisEvent: event,
      allowedToEdit: !!(orgAdmin) && Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN]),
      ready: rdy,
    };
  }, [_id]);
  const submit = (data) => {
    const { name, description, eventDate, startTime, endTime, location, amountVolunteersNeeded, coordinator, specialInstructions, ageRange } = data;
    const collectionName = Events.getCollectionName();
    const updateData = {
      id: _id,
      name,
      description,
      eventDate,
      startTime,
      endTime,
      location,
      amountVolunteersNeeded,
      coordinator,
      specialInstructions,
      ageRange,
    };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => swal('Success', 'Event updated successfully', 'success'));
  };

  const handleDelete = () => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this event!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          Meteor.call('events.delete', _id, (error) => {
            if (error) {
              swal('Error', error.reason, 'error');
            } else {
              swal('Your event has been deleted!', { icon: 'success' });
              navigate('/events'); // Corrected usage of navigate
            }
          });
        }
      });
  };

  if (!ready) {
    return <LoadingSpinner />;
  }
  if (!thisEvent) {
    return <NotFound />;
  }
  if (!allowedToEdit) {
    return <NotAuthorized />;
  }
  const now = new Date();
  return (
    <Container id={PAGE_IDS.EDIT_EVENT} className="py-3">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2 className="text-center">Edit Event</h2>
          <AutoForm schema={bridge} onSubmit={submit} model={thisEvent}>
            <TextField name="name" placeholder="Event Name" />
            <LongTextField name="description" placeholder="Event description" />
            <DateField name="eventDate" placeholder="Event Date" type="date" min={now} />
            <Row>
              <Col>
                <TextField name="startTime" placeholder="Start Time" />
              </Col>
              <Col>
                <TextField name="endTime" placeholder="End Time" />
              </Col>
            </Row>
            <TextField name="location" placeholder="Event Location" />
            <Row>
              <Col>
                <NumField name="amountVolunteersNeeded" label="Number of volunteers needed" placeholder="Number of volunteers Needed" />
              </Col>
              <Col>
                <TextField name="coordinator" placeholder="Coordinator's Name" />
              </Col>
            </Row>
            <BoolField name="backgroundCheck" label="Require background check" />
            Age Range
            <Row>
              <Col>
                <NumField name="ageRange.min" label="Minimum" />
              </Col>
              <Col>
                <NumField name="ageRange.max" label="Maximum" />
              </Col>
            </Row>
            <LongTextField name="specialInstructions" placeholder="Special Instructions (Optional)" />
            <div className="d-flex justify-content-between">
              <SubmitField value="Submit" />
              <Button variant="danger" onClick={handleDelete}>Delete Event</Button>
            </div>
            <ErrorsField />
          </AutoForm>
        </Col>
      </Row>
    </Container>
  );
};

export default EditEvent;
