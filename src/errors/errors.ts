import { ApplicationError } from 'protocols/types';

function fetchDataError(): ApplicationError {
  return {
    name: 'FetchData',
    message: 'There was a problem fetching data from external API'
  };
}

function notFoundError(entity: string): ApplicationError {
  return {
    name: 'NotFound',
    message: `Provided ${entity} not found`
  };
}

const errors = {
  fetchDataError,
  notFoundError
};

export { errors };
