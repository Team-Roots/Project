import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
// import { _ } from 'meteor/underscore';
import PropTypes from 'prop-types';

const WeeklyCalendar = ({ subbedEvents }) => {
  const navigate = useNavigate();

  const handleEventClick = () => {
    // Do something with the clicked event, such as navigating to a page
    navigate('/my-events');
  };
  return (
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
        eventClick={handleEventClick}
      />
    </Container>
  );
};

WeeklyCalendar.propTypes = {
  subbedEvents: PropTypes.arrayOf(
    PropTypes.shape({
      subscriptionInfo: PropTypes.shape({
        eventName: PropTypes.string.isRequired,
        eventDate: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
};
export default WeeklyCalendar;
