import request from 'supertest';
import app from '../../app.js';

describe('GET /works', () => {
  it('should return works', async () => {
    const res = await request(app).get('/works');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
    expect(res.body).toBe('works');
  });
});
