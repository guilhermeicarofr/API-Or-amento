import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import httpStatus from 'http-status';

import { getUsers } from 'controllers/users-controller';
import { getProducts } from 'controllers/products-controllers';
import { getEstimate } from 'controllers/purchase-controllers';
import { validateSchema } from 'middlewares/validation-middlewares';
import { schemas } from 'schemas/schemas';

dotenv.config();
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

const server = express();
server.use(cors());
server.use(express.json());

server.get('/health', (req: Request, res: Response) => {
  /* eslint-disable-next-line no-console */
  console.log('OK');
  return res.status(httpStatus.OK).send('OK');
});

server.get('/users', getUsers);
server.get('/products', getProducts);
server.get('/purchase/estimate/user/:userId',
  validateSchema(schemas.idParam('userId'), 'params'),
  validateSchema(schemas.purchaseBody, 'body'),
  getEstimate
);

if(ENV !== 'test') {
  /* eslint-disable-next-line no-console */
  server.listen(PORT, () => console.log(`Running on port ${PORT}...`));
}

export { server };
