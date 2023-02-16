import { usersApi } from 'api/users-api';
import { errors } from 'errors/errors';

export async function listAllUsers() {
  try {
    const users = await usersApi.getAll();
    return users; 
  } catch (error) {
    throw errors.fetchDataError();
  }
}

export async function checkUserData(userId: number) {
  try {
    const user = await usersApi.getById(userId);
    return user;   
  } catch (error) {
    throw errors.notFoundError('user');
  }
}
