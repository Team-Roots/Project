import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, ListGroup } from 'react-bootstrap';
import { useTracker } from 'meteor/react-meteor-data';
import EventCard from '../components/EventCard';
import { Events } from '../../api/event/EventCollection';
import { PAGE_IDS } from '../utilities/PageIDs';
import LoadingSpinner from '../components/LoadingSpinner';
import { EventCategories } from '../../api/event/EventCategoriesCollection';
import { Categories } from '../../api/category/CategoryCollection';

const VolunteerEvents = () => {
  const { ready, events, eventCategories, categories } = useTracker(() => {
    const subscription = Events.subscribeEvent();
    const subscription2 = EventCategories.subscribeEventCategories();
    const subscription3 = Categories.subscribeCategory();
    const rdy = subscription.ready() && subscription2.ready() && subscription3.ready();
    const eventItems = Events.find({}, { sort: { name: 1 } }).fetch();
    const eventCategoriesItems = EventCategories.find({}, { sort: { eventInfo: 1 } }).fetch();
    const categoriesItems = Categories.find({}, { sort: { eventInfo: 1 } }).fetch();
    return {
      events: eventItems,
      eventCategories: eventCategoriesItems,
      categories: categoriesItems,
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
      const fieldsToSearch = ['name', 'organization'];

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
        <ListGroup horizontal className="justify-content-center align-content-center pb-1">
          {categories.map((category) => <ListGroup.Item className="rounded-pill m-1 robotoText eventLG">{category.categoryName}</ListGroup.Item>)}
        </ListGroup>
      </Row>
      <Row>
        <Col>
          <Row xs={1} md={2} lg={3} className="g-4">
            {data.map((event) => (
              <Col key={event._id}>
                <EventCard
                  event={event}
                  eventCategory={eventCategories.find(eventCategory => (
                    eventCategory.eventInfo.eventName === event.name &&
                    eventCategory.eventInfo.organizationID === event.organizationID
                    // TODO: fix eventDates, some reason its not working
                    // && eventCategory.eventInfo.eventDate === event.eventDate
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
