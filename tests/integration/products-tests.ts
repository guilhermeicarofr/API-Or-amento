import supertest from 'supertest';
import httpStatus from 'http-status';

import { server } from 'index';

const testServer = supertest(server);

describe('GET /products', () => {
  it('should respond with status 200 OK and list of all products', async () => {
    const response = await testServer.get('/products');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining(
      [
        expect.objectContaining(
          {
            id: expect.anything(),
            name: expect.anything(),
            price: expect.anything(),
          }
        )
      ]
    ));
  });
});
