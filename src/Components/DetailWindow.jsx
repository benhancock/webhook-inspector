import { useContext } from 'react';
import EventDetail from './EventDetail';
import EndpointSummary from './EndpointSummary';

const DetailWindow = ({ Context, url_endpoint }) => {
  const { eventSelected, currentEvent } = useContext(Context);

  let detailComponent;
  if (eventSelected) {
    detailComponent = <EventDetail url_endpoint={url_endpoint} event={currentEvent}/>;
  } else {
    detailComponent = <EndpointSummary url_endpoint={url_endpoint}/>;
  }

  return (
    detailComponent
  )
}

export default DetailWindow;
