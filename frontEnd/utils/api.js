import { STRAPI_API_URL, STRAPI_API_TOKEN } from './urls';

const fetchData = async (endpoint) => {
  const options = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + STRAPI_API_TOKEN,
    },
  };
  const response = await fetch(`${STRAPI_API_URL}${endpoint}`, options);
  const data = await response.json();
  return data;
};

export default fetchData;
