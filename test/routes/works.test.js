const request = require('supertest');
const app = require('../../app');

describe('GET /works', () => {
  it('should return works', async () => {
    const res = await request(app).get('/works');
    console.log(res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toBe('works');
  });
});
