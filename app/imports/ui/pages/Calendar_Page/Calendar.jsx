import React from 'react';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import Spinner from 'react-bootstrap/Spinner';
import { useTracker } from 'meteor/react-meteor-data';
import { EventSubscription } from '../../../api/event/EventSubscriptionCollection';

const CalendarView = () => {

  const { ready, subscribedEvents } = useTracker(() => {
    const subscription3 = EventSubscription.subscribeEvent();
    const rdy3 = subscription3.ready();
    if (!subscription3.ready()) {
      console.log('Subscription 3 is not ready yet.');
    } else {
      console.log('Subscription 3 is ready.');
    }
    const eventSubscription = EventSubscription.find({}, { sort: { subscriptionInfo: 1 } }).fetch();

    return {
      subscribedEvents: eventSubscription,
      ready: rdy3,
    };
  }, []);

  return (ready ? (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        weekends
        events={subscribedEvents.map((sub) => ({
          title: sub.subscriptionInfo.eventName,
          date: sub.subscriptionInfo.eventDate,
        }))}
      />
    </Container>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Spinner animation="grow" />
    </div>
  )
  );
};

export default CalendarView;
