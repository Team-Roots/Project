import React from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';

const CalendarView = () => (
  <Container>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      height="auto"
      weekends
      events={[
        { title: 'event 1', date: '2024-02-01' },
        { title: 'event 2', date: '2024-02-02' },
      ]}
    />
  </Container>
);

export default CalendarView;
