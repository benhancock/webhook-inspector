import axios from "axios";

const EndpointSummary = ({ url_endpoint }) => {

  async function testEvents() {
    await axios.get(`https://${url_endpoint}.benhancock.dev/sample/path`)
      .then(response => console.log(response))
      .catch(err => console.log('error submitting sample GET'));

    await axios.post(`https://${url_endpoint}.benhancock.dev`,
      { id: "test_data_id", event: "delivered"}
    )
      .then(response => console.log(response))
      .catch(err => console.log('error submitting sample POST'));
  }

  return(
    <div className='endpoint_summary'>
      <h1>Your endpoint is: </h1>
      <h1 className='red_text'>https://{url_endpoint}.benhancock.dev</h1>
      <p> Select an event to view details</p>
      <button className='test_events' onClick={testEvents}>Generate Test Events</button>
    </div>
  )
}

export default EndpointSummary;
