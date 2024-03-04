import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import FullCalendar from '@fullcalendar/react';
import interactionPlugin from '@fullcalendar/interaction'; // needed for eventClick
import dayGridPlugin from '@fullcalendar/daygrid';
import Spinner from 'react-bootstrap/Spinner';
import { useTracker } from 'meteor/react-meteor-data';
import { EventSubscription } from '../../../api/event/EventSubscriptionCollection';
import { Events } from '../../../api/event/EventCollection';

const CalendarView = () => {
  const navigate = useNavigate();
  const { ready, subscribedEvents, events } = useTracker(() => {

    const subscription2 = Events.subscribeEvent();
    const rdy2 = subscription2.ready();
    if (!subscription2.ready()) {
      console.log('Subscription 2 is not ready yet.');
    } else {
      console.log('Subscription 2 is ready.');
    }
    const eventItems = Events.find({}, { sort: { name: 1 }, limit: 4 }).fetch(); // Assuming the sort field is `name`

    const subscription3 = EventSubscription.subscribeEvent();
    const rdy3 = subscription3.ready();
    if (!subscription3.ready()) {
      console.log('Subscription 3 is not ready yet.');
    } else {
      console.log('Subscription 3 is ready.');
    }
    const eventSubscription = EventSubscription.find({}, { sort: { subscriptionInfo: 1 } }).fetch();

    return {
      events: eventItems,
      subscribedEvents: eventSubscription,
      ready: rdy3 && rdy2,
    };
  }, []);
  const subbedEvents = subscribedEvents.map((sub) => ({
    title: sub.subscriptionInfo.eventName,
    date: sub.subscriptionInfo.eventDate,
    orgID: sub.subscriptionInfo.orgID,
  }));
  let filteredEvents = [];
  if (ready) {
    // find all events that have all the components of eventSubscription
    filteredEvents = events.filter((event) => {
      // Check if the event exists in the subscribedEvents array
      const foundSubscribedEvent = subbedEvents.find((sub) => (
        sub.title === event.name &&
          sub.date === event.eventDate.toISOString().slice(0, 10) &&
          sub.orgID === event.organizationID
          // Add more conditions as needed to match other components
      ));
      return foundSubscribedEvent !== undefined;
    });

    console.log(filteredEvents);
  }

  const handleEventClick = (clickInfo) => {
    // Get the clicked event's title, date, and orgID
    const clickedEventTitle = clickInfo.event.title;
    const clickedEventDate = clickInfo.event.start.toISOString().slice(0, 10); // Assuming eventDate is in ISO format
    const clickedEventOrgID = clickInfo.event.extendedProps.orgID; // Assuming orgID is stored in extendedProps

    // Find the corresponding subbedEvent from the subbedEvents array
    const associatedSubbedEvent = subbedEvents.find((subbedEvent) => (
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

  return (ready ? (
    <Container>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        height="auto"
        weekends
        events={subbedEvents}
        eventClick={handleEventClick} // Add eventClick callback
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
