import React from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import PropTypes from 'prop-types';

const WeeklyCalendar = ({ subbedEvents }) => (
  <Container>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      height="auto"
      weekends
      events={subbedEvents.map((sub) => ({
        title: sub.subscriptionInfo.eventName,
        date: sub.subscriptionInfo.eventDate,
      }))}
      to="/my-events"
    />
  </Container>
);

WeeklyCalendar.propTypes = {
  subbedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      subscriptionInfo: PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
export default WeeklyCalendar;
