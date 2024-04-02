import React, { useState, useEffect } from 'react';
import { Container, Row, Col, FormCheck, Form } from 'react-bootstrap';
import FormCheckInput from 'react-bootstrap/FormCheckInput';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import { useTracker } from 'meteor/react-meteor-data';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';
// import { EventCategories } from '../../api/event/EventCategoriesCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { EventCategories } from '../../api/event/EventCategoriesCollection';

const VolunteerEvents = () => {
  const { ready, events, eventCategories } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const subscription2 = EventCategories.subscribeEventCategories();
    const rdy = subscription.ready() && subscription2.ready();
    const eventItems = Events.find({}, { sort: { name: 1 } }).fetch();
    const eventCategoriesItems = EventCategories.find({}, { sort: { eventInfo: 1 } }).fetch();
    console.log(eventCategoriesItems);
    return {
      events: eventItems,
      eventCategories: eventCategoriesItems,
      ready: rdy,
    };
  }, []);
  const currentDate = new Date();
  const filteredDate = events.filter((event) => event.eventDate >= currentDate);

  const [searchInput, setSearchInput] = useState('');
  const [data, setData] = useState(filteredDate);
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const applySearch = () => {
    if (!searchInput.trim()) {
      setData(filteredDate);
      return;
    }

    const filteredData = filteredDate.filter((event) => {
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
          <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((event) => (
              <Col key={event._id}><EventCard
                event={event}
                eventCategory={eventCategories.filter(eventCategory => (eventCategory.eventInfo.organizationID === event.organizationID &&
                  eventCategory.eventInfo.eventName === event.name &&
                  eventCategory.eventInfo.eventDate === event.eventDate
                ))}
              />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  ) : <LoadingSpinner />);
};

export default VolunteerEvents;
