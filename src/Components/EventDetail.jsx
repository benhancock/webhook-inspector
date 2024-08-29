import { useState} from 'react';

const EventDetail = ({ url_endpoint, event }) => {
  let headersOutput = Object.entries(event.contents.headers);
  console.log(headersOutput);
  headersOutput = headersOutput.map(([prop, value]) =>
    <li key={prop} className='header_item'><p><strong>{prop}:</strong></p> <p>{value}</p></li>
  )



  const [open, setOpen] = useState(false);

  return (
    <div className='event_detail'>
      <h3>HTTP Request</h3>
      <h3>{event.date} {event.time}</h3>
      <p><strong>Details:</strong>   {event.contents.method} {event.contents.path}</p>
      <div className="headers_label">
        <p><strong>Headers:</strong></p>
        {open &&
          <p onClick={() => setOpen(!open)}className="material-symbols-outlined">
        arrow_drop_up </p>
        }
        {!open &&
          <p onClick={() => setOpen(!open)}className="material-symbols-outlined">
        arrow_drop_down </p>
        }

      </div>
      { open &&
      <ul>
        {headersOutput}
      </ul> }
      <p><strong>Body:</strong></p>
      {/* <p className='notwide'>{JSON.stringify(event.contents.body, null, 4).replace('[', '').replace(']', '')}</p> */}
      <div className='event_body'>
        <pre>
          <code>
            {JSON.stringify(event.contents.body, null, 4)}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default EventDetail;
