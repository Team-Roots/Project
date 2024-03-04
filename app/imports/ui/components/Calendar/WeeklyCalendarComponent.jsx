import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';
import interactionPlugin from '@fullcalendar/interaction';

const WeeklyCalendar = ({ subbedEvents, events }) => {
  const navigate = useNavigate();
  const subEvents = subbedEvents.map((sub) => ({
    title: sub.subscriptionInfo.eventName,
    date: sub.subscriptionInfo.eventDate,
    orgID: sub.subscriptionInfo.orgID,
  }));
  const filteredEvents = events.filter((event) => {
    // Check if the event exists in the subscribedEvents array
    const foundSubscribedEvent = subEvents.find((sub) => (
      sub.title === event.name &&
      sub.date === event.eventDate.toISOString().slice(0, 10) &&
      sub.orgID === event.organizationID
      // Add more conditions as needed to match other components
    ));
    return foundSubscribedEvent !== undefined;
  });

  console.log(filteredEvents);

  const handleEventClick = (clickInfo) => {
    // Get the clicked event's title, date, and orgID
    const clickedEventTitle = clickInfo.event.title;
    const clickedEventDate = clickInfo.event.start.toISOString().slice(0, 10); // Assuming eventDate is in ISO format
    const clickedEventOrgID = clickInfo.event.extendedProps.orgID; // Assuming orgID is stored in extendedProps

    // Find the corresponding subbedEvent from the subbedEvents array
    console.log(subEvents);
    console.log(`Clicked Title: ${clickedEventTitle} Clicked Date: ${clickedEventDate} Clicked OrgID: ${clickedEventOrgID}`);
    const associatedSubbedEvent = subEvents.find((subbedEvent) => (
      subbedEvent.title === clickedEventTitle &&
      subbedEvent.date === clickedEventDate &&
      subbedEvent.orgID === clickedEventOrgID
    ));

    if (associatedSubbedEvent) {
      console.log('Associated subbedEvent:', associatedSubbedEvent);
      const matchedFilteredEvent = filteredEvents.find((filteredEvent) => (
        filteredEvent.name === associatedSubbedEvent.title &&
        filteredEvent.eventDate.toISOString().slice(0, 10) === associatedSubbedEvent.date &&
        filteredEvent.organizationID === associatedSubbedEvent.orgID
      ));

      if (matchedFilteredEvent) {
        console.log('Matched filteredEvent:', matchedFilteredEvent);
        navigate(`/events/${matchedFilteredEvent._id}`);
      } else {
        console.log('No matching filteredEvent found.');
      }
    } else {
      console.log('No associated subbedEvent found.');
    }
  };

  return (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridWeek"
        height="auto"
        weekends
        events={subEvents}
        eventClick={handleEventClick}
      />
    </Container>
  );
};

WeeklyCalendar.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      eventDate: PropTypes.instanceOf(Date),
      category: PropTypes.string.isRequired,
      startTime: PropTypes.string,
      endTime: PropTypes.string,
      location: PropTypes.string.isRequired,
      coordinator: PropTypes.string.isRequired,
      amountVolunteersNeeded: PropTypes.number,
      specialInstructions: PropTypes.string,
      // eslint-disable-next-line no-unused-vars,react/forbid-prop-types
      restrictions: PropTypes.object,
    }),
  ).isRequired,
  subbedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionInfo: PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
        orgID: PropTypes.number,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
export default WeeklyCalendar;
