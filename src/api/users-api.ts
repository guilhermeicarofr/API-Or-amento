import axios from 'axios';

import { User } from 'protocols/types';

const BASEURL = process.env.API_URL;
const usersURL = `${BASEURL}/users`;

async function getAll(): Promise<User[]> {
  const response = await axios.get(usersURL);
  return response.data;
}

async function getById(userId: number): Promise<User> {
  const response = await axios.get(`${usersURL}/${userId}`);
  return response.data;
}

const usersApi = {
  getAll,
  getById
}

export { usersApi };
