import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Card, Col, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import { OrganizationAdmin } from '../../../api/organization/OrganizationAdmin';
import { Events } from '../../../api/event/EventCollection';
import NotFound from '../NotFound';
import { COMPONENT_IDS } from '../../utilities/ComponentIDs';
import EditOrgGear from '../../components/organizations/EditOrgGear';

const VolunteerOrganizations = () => {
  const currentUser = useTracker(() => Meteor.user());
  const { orgID } = useParams();
  const navigate = useNavigate();
  const parsedOrgID = parseInt(orgID, 10);
  if (orgID) { // display just this requested organization
    const { ready, thisOrganization, allowedToEdit, events } = useTracker(() => {
      const orgSubscription = Organizations.subscribeOrg();
      const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
      const eventSubscription = Events.subscribeEvent();
      const rdy = orgSubscription.ready() && orgAdminSubscription.ready() && eventSubscription.ready();
      const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
      const foundOrganizationAdmin = OrganizationAdmin.findOne({ orgAdmin: currentUser?.username, orgID: parsedOrgID }, {});
      const foundEvents = Events.find({ organizationID: parsedOrgID }, {}).fetch();
      return {
        ready: rdy,
        thisOrganization: foundOrganization,
        allowedToEdit: !!foundOrganizationAdmin,
        events: foundEvents,
      };
    }, [orgID]);
    console.log(events);
    return (ready ? (
      <Container className="py-3 px-5" id={PAGE_IDS.VIEW_ORGANIZATION}>
        <Row className="justify-content-center">
          <Col style={{ maxWidth: '60rem' }}>
            {thisOrganization ? (
              <>
                <Card style={{ backgroundColor: 'snow' }} text="black">
                  <Card.Body>
                    <div className="d-flex justify-content-between">
                      <Card.Title>{thisOrganization.name}</Card.Title>
                      {allowedToEdit && thisOrganization && <EditOrgGear orgID={thisOrganization.orgID} />}
                    </div>
                    <Card.Subtitle>Mission</Card.Subtitle>
                    <Card.Text>
                      Test mission test mission test mission test mission
                    </Card.Text>
                    <Card.Subtitle>
                      Description
                    </Card.Subtitle>
                    <Card.Text>
                      Test description test description test description test description test description test description test description test description test description test description test description test description test description
                    </Card.Text>
                    <Card.Subtitle>Tags</Card.Subtitle>
                    <Card.Text>TestTag1 TestTag2</Card.Text>
                  </Card.Body>
                </Card>
                <div className="d-flex justify-content-between mt-3">
                  <h3>Upcoming events</h3>
                  {allowedToEdit && (
                    <Button
                      variant="primary"
                      className="rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: '40px', height: '40px', marginLeft: '170px', marginBottom: '10px' }} // Adjust the pixel value as needed
                      onClick={() => navigate(`/organizations/${thisOrganization.orgID}/add-event`)}
                      id={COMPONENT_IDS.NAVBAR_ADD_EVENT}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  )}
                </div>
                <div className="d-flex flex-row overflow-x-auto">
                  {events.map(event => (
                    <div key={event._id} className="me-3">
                      <Card style={{ width: '20rem', minHeight: '25rem' }}>
                        <Card.Header>{event.name}</Card.Header>
                        <Card.Body>
                          event info
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
                </div>
                {/* <Container> */}
                {/* <h3>Active opportunities</h3> */}
                {/* List of opportunities */}
                {/* </Container> */}
              </>
            ) : <NotFound />}
          </Col>
        </Row>
      </Container>
    ) : <LoadingSpinner />);
  }
  // if there is no org with the id from the parameters
  return <NotFound />;
};

export default VolunteerOrganizations;
