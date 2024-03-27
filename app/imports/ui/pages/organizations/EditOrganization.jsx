import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { AutoForm, ErrorsField, LongTextField, SelectField, SubmitField, TextField } from 'uniforms-bootstrap5';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import swal from 'sweetalert';
import { useParams } from 'react-router-dom';
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
  type: { type: String, allowedValues: ['For-profit', 'Non-profit'] },
  location: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

const EditOrganization = () => {
  if (Roles.userIsInRole(Meteor.userId(), [ROLE.ORG_ADMIN])) {
    const { orgID } = useParams();
    const parsedOrgID = parseInt(orgID, 10);
    if (orgID) { // display just this requested organization
      const { ready, thisOrganization } = useTracker(() => {
        const subscription = Organizations.subscribeOrg();
        const rdy = subscription.ready();
        const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
        return {
          thisOrganization: foundOrganization,
          ready: rdy,
        };
      }, [orgID]);
      const [orgVisibility, setOrgVisibility] = useState();
      const submit = (data) => {
        console.log(data);
        const { name, website, type, location } = data;
        const profit = type === 'For-profit';
        const visible = false;
        const onBoarded = true;
        const collectionName = Organizations.getCollectionName();
        const definitionData = {
          name,
          website,
          profit,
          location,
          visible,
          onBoarded,
        };
        updateMethod.callPromise({ collectionName, definitionData })
          .catch(error => swal('Error', error.message, 'error'))
          .then(() => {
            swal('Success', 'Item added successfully', 'success');
          });
      };
      if (ready) {
        return (
          <Container id={PAGE_IDS.EDIT_ORGANIZATION} className="py-3">
            <Row className="justify-content-center">
              <Col style={{ maxWidth: '50rem' }}>
                <Col className="text-center"><h2>Edit organization</h2></Col>
                <AutoForm schema={bridge} onSubmit={data => submit(data)} model={thisOrganization}>
                  <Card style={{ backgroundColor: 'snow' }} text="black">
                    <Card.Body>
                      <TextField name="name" />
                      <TextField name="mission" placeholder="Your organization's mission" />
                      <LongTextField name="description" placeholder="Describe your organization" />
                      <SelectField name="type" placeholder="Is your organization for-profit or non-profit?" />
                      <TextField name="location" placeholder="Your organization's location" />
                      <Card.Subtitle>Tags</Card.Subtitle>
                      <Card.Text>TestTag1 TestTag2</Card.Text>
                      <SubmitField value="Save Changes" />
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
    }
    return <NotFound />;
  }
  return <NotAuthorized />;
};

export default EditOrganization;
