import { usersApi } from 'api/users-api';
import { errors } from 'errors/errors';

export async function listAllUsers() {
  const users = await usersApi.getAll();
  if(!users) throw errors.fetchDataError();
  return users;
}
