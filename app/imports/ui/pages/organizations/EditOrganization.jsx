import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { PAGE_IDS } from '../../utilities/PageIDs';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import { updateMethod } from '../../../api/base/BaseCollection.methods';
import { ROLE } from '../../../api/role/Role';
import NotAuthorized from '../NotAuthorized';
import NotFound from '../NotFound';
import LoadingSpinner from '../../components/LoadingSpinner';

const formSchema = new SimpleSchema({
  name: String,
  mission: { type: String, optional: true },
  description: { type: String, optional: true },
  website: { type: String, optional: true },
  profit: Boolean,
  visible: Boolean,
  tags: { type: String, required: false },
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditOrganization = () => {
  const currentUser = useTracker(() => Meteor.user());
  const navigate = useNavigate();
  const { orgID } = useParams();
  const parsedOrgID = parseInt(orgID, 10);
  const { ready, thisOrganization } = useTracker(() => { // display just this requested organization
    const subscription = Organizations.subscribeOrg();
    const rdy = subscription.ready();
    const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
    return {
      thisOrganization: foundOrganization,
      ready: rdy,
    };
  }, [orgID]);
  const submit = (data) => {
    const { _id, name, mission, description, website, profit, visible, location } = data;
    const collectionName = Organizations.getCollectionName();
    const updateData = {
      id: _id,
      name,
      missionStatement: mission,
      description,
      website,
      profit,
      location,
      visible,
    };
    updateMethod.callPromise({ collectionName, updateData })
      .catch(error => swal('Error', error.message, 'error'))
      .then(() => {
        swal('Success', 'Organization updated successfully', 'success');
      });
  };
  if (ready) {
    if (!Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN])) {
      return <NotAuthorized />;
    }
    if (!thisOrganization) {
      return <NotFound />;
    }
    if (thisOrganization.organizationOwner !== currentUser?.username) {
      return <NotAuthorized />;
    }
    return (
      <Container id={PAGE_IDS.EDIT_ORGANIZATION} className="py-3">
        <Row className="justify-content-center">
          <Col style={{ maxWidth: '50rem' }}>
            <Col className="text-center"><h2><Link to={`/organizations/${thisOrganization.orgID}`}>{thisOrganization.name}</Link></h2></Col>
            <AutoForm schema={bridge} onSubmit={data => submit(data)} model={thisOrganization}>
              <Card style={{ backgroundColor: 'snow' }} text="black">
                <Card.Body>
                  <Row>
                    <Col>
                      <TextField name="name" />
                    </Col>
                    <Col>
                      <TextField name="website" />
                    </Col>
                  </Row>
                  <TextField name="mission" placeholder="Your organization's mission statement" />
                  <LongTextField name="description" placeholder="Describe your organization" />
                  <Row>
                    <Col>
                      <SelectField
                        name="profit"
                        label="Type"
                        options={{ true: 'For-profit', false: 'Non-profit' }}
                        placeholder="Is your organization for-profit or non-profit?"
                      />
                    </Col>
                    <Col>
                      <SelectField
                        name="visible"
                        options={{ true: 'Yes', false: 'No' }}
                      />
                    </Col>
                  </Row>
                  <TextField name="location" placeholder="Your organization's location" />
                  <div className="d-flex justify-content-between">
                    <TextField name="tags" placeholder="TEMPORARY" />
                    <Link to={`/organizations/edit/${thisOrganization.orgID}/manage-admins`}><Button className="mt-4" variant="outline-danger">Manage Admins</Button></Link>
                  </div>
                  <div className="d-flex justify-content-between">
                    <SubmitField value="Save Changes" />
                    <Button variant="outline-danger" onClick={() => navigate(-1)}>Cancel</Button>
                  </div>
                  <ErrorsField />
                </Card.Body>
              </Card>
            </AutoForm>
          </Col>
        </Row>
      </Container>
    );
  }
  return <LoadingSpinner />;
};

export default EditOrganization;
