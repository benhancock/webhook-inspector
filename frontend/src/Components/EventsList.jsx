import { useState, useEffect, useContext } from 'react';
import EventsByDate from './EventsByDate';
import { deleteAllEvents } from '../services/endpoints';

const EventsList = ({ url_endpoint, events, Context, deleteEvent}) => {
  const { setEvents } = useContext(Context);

  if (events.length === 0) {
    return (
      <div className='event_list'>
        <h4>Events List</h4>
      </div>
    )
  }

  async function deleteAll() {
    setEvents([]);
    await deleteAllEvents(url_endpoint);
  }

  let groupedEvents = [...events];

  for (let event of groupedEvents) {
    const currentDate = new Date(event.timestamp);
    event.date = currentDate.toLocaleDateString();
    event.time = currentDate.toLocaleTimeString()
  }

  groupedEvents = Object.groupBy(groupedEvents, ({date}) => date);

  let finalEvents = {};

  for (const date in groupedEvents) {
    finalEvents.date = date;
    finalEvents.events = groupedEvents[date];
  }

  console.log('finalevents', finalEvents);

  return (
    <div className='event_list'>
      <h4>Events List</h4>
      <ul>
        <EventsByDate date={finalEvents.date} events={finalEvents.events} url_endpoint={url_endpoint} Context={Context} deleteEvent={deleteEvent}/>
      </ul>
      {/* <button className='delete_all' onClick={deleteAll}>Delete All Events</button> */}
    </div>
  )
}

export default EventsList;
