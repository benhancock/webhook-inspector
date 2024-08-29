import { useNavigate } from "react-router-dom";
import { createEndpoint } from "../services/endpoints";

const CreateBinButton = () => {
  const navigate = useNavigate();

  async function handleClick() {
    const newURLEndpoint = await createEndpoint({user_id: 1});

    navigate('/' + newURLEndpoint);
  }

  return (
    <div>
      <button onClick={handleClick}>Create a New Bin</button>
    </div>
  );
}

export default CreateBinButton;
