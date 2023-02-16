import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { listAllProducts } from 'services/products-services';

export async function getProducts(req: Request, res: Response) {
  try {
    const products = await listAllProducts();
    return res.status(httpStatus.OK).send(products);    
  } catch (error) {
    if(error.name === 'FetchData') return res.status(httpStatus.NO_CONTENT).send(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
