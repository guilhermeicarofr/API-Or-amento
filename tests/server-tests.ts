import supertest from 'supertest';
import httpStatus from 'http-status';

import { server } from 'index';

const testServer = supertest(server);

describe('GET /health', () => {
  it('should respond with status 200 and OK is server is up', async () => {
    const response = await testServer.get('/health');

    expect(response.status).toBe(httpStatus.OK);
    expect(response.text).toBe('OK');
  });
});
