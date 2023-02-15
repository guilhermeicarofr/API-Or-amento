import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import httpStatus from 'http-status';

dotenv.config();
const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

const server = express();
server.use(cors());
server.use(express.json());

server.get('/health', (req: Request, res: Response) => { 
  console.log('OK');
  return res.status(httpStatus.OK).send('OK');
});

if(ENV !== 'test') {
  server.listen(PORT, () => console.log(`Running on port ${PORT}...`));
}

export { server };
