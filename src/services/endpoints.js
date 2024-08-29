import axios from "axios";
import { apiBaseUrl } from "../constants";

export const getEvents = async (url_endpoint) => {
  const data = await axios.get(
    `${apiBaseUrl}/url_endpoints/${url_endpoint}`
  );

  return data;
};

export const deleteEvent = async (timestamp, url_endpoint) => {
  axios.delete(`${apiBaseUrl}/events/${timestamp}&${url_endpoint}`)
    .then(response => {
      console.log(`Deleted post`);
    })
    .catch(error => {
      console.error(error);
    });
}

export const deleteAllEvents = async (url_endpoint) => {
  await axios.delete(`${apiBaseUrl}/events/${url_endpoint}`);
}

export const createEndpoint = async (object) => {
  const { data } = await axios.post(
    `${apiBaseUrl}/url_endpoints`,
    object
  );

  return data.url_endpoint;
};
