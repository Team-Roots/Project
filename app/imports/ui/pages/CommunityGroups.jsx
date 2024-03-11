import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTracker } from 'meteor/react-meteor-data';
import { Groups } from '../../api/communitygroups/GroupCollection';
import GroupCard from '../components/GroupCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import { COMPONENT_IDS } from '../utilities/ComponentIDs';
import { Events } from '../../api/event/EventCollection';

const CommunityGroups = () => {
  const navigate = useNavigate();
  const handleAddGroupClick = () => {
    navigate('/add-group'); // Navigate to the add-Group page
  };
  const { ready, groups } = useTracker(() => {
    const subscription = Groups.subscribeGroup();
    const rdy = subscription.ready();
    const groupItems = Events.find({}, { sort: { name: 1 } }).fetch();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
    }
    return {
      groups: groupItems,
      ready: rdy,
    };
  }, []);
  if (!ready) {
    return (
      <Container id={PAGE_IDS.LIST_EVENT} className="py-3">
        <Row className="justify-content-center">
          <Col md={8}>
            <div>Loading Groups...</div>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container className="py-3" id={PAGE_IDS.LIST_EVENT}>
      <Row className="justify-content-center">
        <Col xs="auto">
          <Button
            variant="primary"
            className="rounded-circle d-flex justify-content-center align-items-center"
            style={{ width: '40px', height: '40px', marginLeft: '170px', marginBottom: '10px' }}
            onClick={handleAddGroupClick}
            id={COMPONENT_IDS.NAVBAR_ADD_EVENT}
          >
            <i className="fas fa-plus" />
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Row md={1} lg={2} className="g-4">
            {groups.map((group) => (<Col key={group._id}><GroupCard group={group} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default CommunityGroups;
