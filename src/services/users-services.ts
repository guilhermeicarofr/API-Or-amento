import { usersApi } from 'api/users-api';
import { errors } from 'errors/errors';

export async function listAllUsers() {
  const users = await usersApi.getAll();
  if(!users) throw errors.fetchDataError();
  return users;
}

export async function checkUserData(userId: number) {
  const user = await usersApi.getById(userId);
  if(!user) throw errors.notFoundError('user');
  return user;
}
