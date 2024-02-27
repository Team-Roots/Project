import React from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const WeeklyCalendar = () => (
  <Container>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      height="auto"
      weekends
      events={[
        { title: 'event 1', date: '2024-02-26' },
        { title: 'event 2', date: '2024-02-27' },
      ]}
    />
  </Container>
);

export default WeeklyCalendar;
