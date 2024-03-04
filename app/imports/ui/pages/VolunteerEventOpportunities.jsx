import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormCheck, Form } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useTracker } from 'meteor/react-meteor-data';
import { Events } from '../../api/event/EventCollection'; // Import your EventCollection
import EventCard from '../components/EventCard';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';

const VolunteerEventOpportunities = () => {
  const { ready, events } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const rdy = subscription.ready();
    const eventItems = Events.find({}, { sort: { name: 1 } }).fetch();
    if (!subscription.ready()) {
      console.log('Subscription is not ready yet.');
    } else {
      console.log('Subscription is ready.');
      console.log(eventItems);
    }
    return {
      events: eventItems,
      ready: rdy,
    };
  }, []);

  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(events);
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const applySearch = () => {
    if (!searchInput.trim()) {
      setData(events);
      return;
    }

    const filteredData = events.filter((event) => {
      const fieldsToSearch = ['name', 'category', 'organization'];

      return fieldsToSearch.some((field) => {
        const fieldValue = event[field];
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(
            (element) => typeof element === 'string' &&
              element.toLowerCase().includes(searchInput.toLowerCase()),
          );
        } if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchInput.toLowerCase());
        }
        return false;
      });
    });

    setData(filteredData);
  };

  useEffect(() => {
    if (ready) {
      applySearch();
    }
  }, [ready, searchInput, events]);

  return (ready ? (
    <Container className="py-3" id={PAGE_IDS.LIST_EVENT}>
      <Row className="pb-3">
        <Form>
          <Form.Control
            type="text"
            name="search"
            placeholder="Search Events"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Form>
      </Row>
      <Row>
        <Col lg={2}>
          <h3 className="poppinsText">Filter By</h3>
          <h4 className="poppinsText">Location</h4>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Honolulu, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Pearl City, HI</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="radio" />
            <FormCheckLabel className="robotoText">Waimanalo, HI</FormCheckLabel>
          </FormCheck>
          <h4 className="poppinsText">Location Type</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">In-Person</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Online</FormCheckLabel>
          </FormCheck>
          <h4 className="poppinsText">Category</h4>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Animal Shelter</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Clean Up</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Donations</FormCheckLabel>
          </FormCheck>
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel className="robotoText">Food Distribution</FormCheckLabel>
          </FormCheck>
          <br />
          <FormCheck>
            <FormCheckInput type="checkbox" />
            <FormCheckLabel>
              <h5 className="poppinsText">Background Check Not Needed</h5>
            </FormCheckLabel>
          </FormCheck>
        </Col>
        <Col>
          <Row md={1} lg={2} className="g-4">
            {data.map((event) => (<Col key={event._id}><EventCard event={event} /></Col>))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VolunteerEventOpportunities;
