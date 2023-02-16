import supertest from 'supertest';
import httpStatus from 'http-status';

import { server } from 'index';
import { productsApi } from 'api/products-api';
import { usersApi } from 'api/users-api';

const testServer = supertest(server);

describe('GET /purchase/estimate/user/:userId', () => {
  describe('when request is invalid', () => {
    it('should respond with status 400 BAD REQUEST if userId is a string', async () => {
      const response = await testServer.get(`/purchase/estimate/user/string}`).send({
        products: [ 1, 2, 3 ]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if userId is an invalid number', async () => {
      const response = await testServer.get(`/purchase/estimate/user/0`).send({
        products: [ 1, 2, 3 ]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is empty', async () => {
      const response = await testServer.get(`/purchase/estimate/user/1`).send({});
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is invalid', async () => {
      const response = await testServer.get(`/purchase/estimate/user/1`).send({
        products: 'string'
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is an invalid list of ids', async () => {
      const response = await testServer.get(`/purchase/estimate/user/1`).send({
        products: [ 1, 0, -3 ]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
  
  describe('when provided Ids are not existent', () => {
    it('should respond with status 404 NOT FOUND if userId is not existent', async () => {
      const response = await testServer.get(`/purchase/estimate/user/10000`).send({
        products: [ 1, 2, 3 ]
      });
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });

    it('should respond with status 404 NOT FOUND if userId is not existent', async () => {
      const response = await testServer.get(`/purchase/estimate/user/1`).send({
        products: [ 1, 2, 10000 ]
      });
  
      expect(response.status).toBe(httpStatus.NOT_FOUND);
    });
  });

  it('should respond with status 200 and purchase estimate', async () => {
    const user1 = await usersApi.getById(1);

    const product1 = await productsApi.getById(1);
    const product2 = await productsApi.getById(2);
    const product3 = await productsApi.getById(3);

    const totalPrice = (user1.tax/100)*(product1.price + product2.price + product3.price);

    const response = await testServer.get(`/purchase/estimate/user/1`).send({
      products: [ 1, 2, 3 ]
    });

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(
      {
        userId: user1.id,
        userName: user1.name,
        purchasePrice: totalPrice,
        purchaseProducts: expect.arrayContaining(
          [
            expect.objectContaining(
              {
                id: product1.id,
                name: product1.name,
                price: product1.price*(user1.tax/100)
              }
            ),
            expect.objectContaining(
              {
                id: product2.id,
                name: product2.name,
                price: product2.price*(user1.tax/100)
              }
            ),
            expect.objectContaining(
              {
                id: product3.id,
                name: product3.name,
                price: product3.price*(user1.tax/100)
              }
            ),
          ]
        )
      }
    );
  });
});
