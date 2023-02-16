import { Request, Response } from 'express';
import httpStatus from 'http-status';

import { PurchaseList } from 'protocols/types';
import { estimatePurchase } from 'services/purchase-services';

export async function getEstimate(req: Request, res: Response) {
  const userId = Number(req.params.userId);
  const { products } = req.body as PurchaseList;

  try {
    const estimate = await estimatePurchase({ userId, products });
    return res.status(httpStatus.OK).send(estimate);    
  } catch (error) {
    if(error.name === 'NotFound') return res.status(httpStatus.NOT_FOUND).send(error.message);
    if(error.name === 'FetchData') return res.status(httpStatus.NO_CONTENT).send(error.message);
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
