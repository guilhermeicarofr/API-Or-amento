import { ApplicationError } from 'protocols/types';

function fetchDataError(): ApplicationError {
  return {
    name: 'FetchData',
    message: 'There was a problem fetching data from external API'
  };
}

const errors = {
  fetchDataError
};

export { errors };
