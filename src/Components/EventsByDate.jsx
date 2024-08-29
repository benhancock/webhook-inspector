import EventLine from './EventLine';
import { useContext } from 'react';

const EventsByDate = ({date, events, url_endpoint, Context, deleteEvent}) => {

  const { setCurrentEvent, setEventSelected } = useContext(Context);

  const handleClick = (event) => {
    setCurrentEvent(event);
    setEventSelected(true);
  }

  return (
    <>
      <h3>{date}</h3>
      {events.map(event =>
        <EventLine key={event.timestamp} timestamp={event.timestamp} time={event.time} url_endpoint={url_endpoint} contents={event.contents} onClick={() => handleClick(event)}  deleteEvent={deleteEvent} />
      )}
    </>
  )
}

export default EventsByDate;
