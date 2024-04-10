import React from 'react';
import { Container, Row, Card, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { PAGE_IDS } from '../../utilities/PageIDs';
import LoadingSpinner from '../../components/LoadingSpinner';
import { Organizations } from '../../../api/organization/OrganizationCollection';
import NotFound from '../NotFound';

const VolunteerOrganizations = () => {
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
    return (ready ? (
      <Container className="py-3 px-5" id={PAGE_IDS.VIEW_ORGANIZATION}>
        <Row className="justify-content-center">
          <Col style={{ maxWidth: '50rem' }}>
            {thisOrganization ? (
              <>
                <Card style={{ backgroundColor: 'snow' }} text="black">
                  <Card.Body>
                    <Card.Title>{thisOrganization.name}</Card.Title>
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
                <Container className="py-3">
                  <h3>Upcoming events</h3>
                  Horizontal scroll of events
                  <h3>Active opportunities</h3>
                  List of opportunities
                </Container>
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
