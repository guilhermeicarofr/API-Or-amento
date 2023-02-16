import supertest from 'supertest';
import httpStatus from 'http-status';
import { faker } from '@faker-js/faker';

import { server } from 'index';

const testServer = supertest(server);

describe('GET /purchase/estimate/user/:userId', () => {
  describe('when request is invalid', () => {
    it('should respond with status 400 BAD REQUEST if userId is a string', async () => {
      const response = await testServer.get(`/purchase/estimate/user/${faker.datatype.string()}`).send({
        products: [faker.datatype.number({min: 1})]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if userId is an invalid number', async () => {
      const response = await testServer.get(`/purchase/estimate/user/0`).send({
        products: [faker.datatype.number({min: 1})]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is empty', async () => {
      const response = await testServer.get(`/purchase/estimate/user/${faker.datatype.string()}`).send({});
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is invalid', async () => {
      const response = await testServer.get(`/purchase/estimate/user/${faker.datatype.string()}`).send({
        products: 'products'
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should respond with status 400 BAD REQUEST if body is an invalid list of ids', async () => {
      const response = await testServer.get(`/purchase/estimate/user/${faker.datatype.string()}`).send({
        products: [ 1, 0, -3 ]
      });
  
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
