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
import { EventCategories } from '../../../api/event/EventCategoriesCollection';
import EventCard from '../../components/EventCard';

const VolunteerOrganizations = () => {
  const currentUser = useTracker(() => Meteor.user());
  const { orgID } = useParams();
  const navigate = useNavigate();
  const parsedOrgID = parseInt(orgID, 10);
  if (orgID) { // display just this requested organization
    const { ready, thisOrganization, allowedToEdit, events, eventCategories } = useTracker(() => {
      const orgSubscription = Organizations.subscribeOrg();
      const orgAdminSubscription = OrganizationAdmin.subscribeOrgAdmin();
      const eventSubscription = Events.subscribeEvent();
      const eventCategorySubscription = EventCategories.subscribeEventCategories();
      const rdy =
        orgSubscription.ready() &&
        orgAdminSubscription.ready() &&
        eventSubscription.ready() &&
        eventCategorySubscription.ready();
      const foundOrganization = Organizations.findOne({ orgID: parsedOrgID }, {});
      const foundOrganizationAdmin = OrganizationAdmin.findOne({ orgAdmin: currentUser?.username, orgID: parsedOrgID }, {});
      const foundEvents = Events.find({ organizationID: parsedOrgID }, {}).fetch();
      const foundEventCategories = EventCategories.find({}, {}).fetch();
      return {
        ready: rdy,
        thisOrganization: foundOrganization,
        allowedToEdit: !!foundOrganizationAdmin,
        events: foundEvents,
        eventCategories: foundEventCategories,
      };
    }, [orgID]);
    return (ready ? (
      <Container className="py-3 px-5" id={PAGE_IDS.VIEW_ORGANIZATION}>
        <Row className="justify-content-center">
          <Col>
            {thisOrganization ? (
              <>
                <div className="d-flex justify-content-center">
                  <Card style={{ backgroundColor: 'snow', maxWidth: '60rem' }} text="black">
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
                        Test description test description test description test description test description test description test description test description test description test description test description test description test
                        description
                      </Card.Text>
                      <Card.Subtitle>Tags</Card.Subtitle>
                      <Card.Text>TestTag1 TestTag2</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div className="d-flex justify-content-between mt-3">
                  <h3>Upcoming events</h3>
                  {allowedToEdit && (
                    <Button
                      variant="primary"
                      className="rounded-circle d-flex justify-content-center align-items-center"
                      style={{ width: '40px', height: '40px', marginLeft: '170px', marginBottom: '10px' }}
                      onClick={() => navigate(`/organizations/${thisOrganization.orgID}/add-event`)}
                      id={COMPONENT_IDS.NAVBAR_ADD_EVENT}
                    >
                      <i className="fas fa-plus" />
                    </Button>
                  )}
                </div>
                <div className="d-flex flex-row overflow-x-auto">
                  {events.map(event => (
                    <Col key={event._id} xs={4} className="me-3">
                      <EventCard
                        event={event}
                        eventCategory={eventCategories.find(eventCategory => (
                          eventCategory.eventInfo.eventName === event.name &&
                          eventCategory.eventInfo.organizationID === event.organizationID
                        ))}
                      />
                    </Col>
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
