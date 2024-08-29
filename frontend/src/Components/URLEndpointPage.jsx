import { useState, useEffect, createContext, useContext } from 'react';
import URLEndpointHeader from './URLEndpointHeader';
import EventsList from './EventsList';
import DetailWindow from './DetailWindow';
import { getEvents, deleteEvent } from '../services/endpoints';
import { useParams } from "react-router-dom";

const URLEndpointPage = () => {
  const { url_endpoint } = useParams();

  const [events, setEvents] = useState([]);

  const deleteEvent = async (timestamp) => {
    const resetEvents = events.filter(event => event.timestamp !== timestamp);
    setEvents(resetEvents);
    console.log('updated local');

    deleteEvent(timestamp, url_endpoint);
  }

  const Context = createContext({})

  function UserContextProvider({children}) {
    const [currentEvent, setCurrentEvent] = useState({});
    const [eventSelected, setEventSelected] = useState(false);

    return <Context.Provider value={{currentEvent, setCurrentEvent, eventSelected, setEventSelected, setEvents}}>
        {children}
    </Context.Provider>
  }

  useEffect(() => {
    async function fetchData(endpoint) {
      const data = await getEvents(endpoint);

      let rawEvents = data.data.toReversed();
      setEvents(rawEvents);
    }

    fetchData(url_endpoint);
  }, [url_endpoint])

  return (
    <div>
      <UserContextProvider>
        <URLEndpointHeader url_endpoint={url_endpoint} />
        <main className='cols'>
          <EventsList url_endpoint={url_endpoint} events={events} Context={Context} deleteEvent={deleteEvent}/>
          <DetailWindow url_endpoint={url_endpoint} Context={Context}/>
        </main>
      </UserContextProvider>
    </div>
  );
}

export default URLEndpointPage;
