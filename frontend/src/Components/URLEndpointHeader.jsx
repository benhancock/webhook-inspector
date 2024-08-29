import { useNavigate } from "react-router-dom";
import { createEndpoint } from "../services/endpoints";

const URLEndpointHeader = ({url_endpoint}) => {
  const navigate = useNavigate();
  const endpoint_link = `https://${url_endpoint}.benhancock.dev`;

  async function handleClick() {
    const newURLEndpoint = await createEndpoint({user_id: 1});

    navigate('/' + newURLEndpoint);
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className='header'>
      <div>
        <h1 className='homepage_link' onClick={() => navigate('/')}>RequestB1n</h1>
      </div>
      <div className='headerURL'>
        <p>{endpoint_link}</p>

        <button className='header_button' onClick={() => copyToClipboard(endpoint_link)}>Copy</button>

        <button onClick={handleClick} className='header_button'>New</button>
      </div>
    </div>
  );
}

export default URLEndpointHeader;
