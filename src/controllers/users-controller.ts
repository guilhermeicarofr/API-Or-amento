import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { listAllUsers } from 'services/users-services';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await listAllUsers();
    return res.status(httpStatus.OK).send(users);    
  } catch (error) {
    console.log(error);
    if(error.name === 'FetchData') return res.status(httpStatus.NO_CONTENT).send(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
