import request from 'supertest';
import app from '../../src/app';

describe('Found Items Authorization (no token validation in test mode)', () => {
  it('should return 400 if missing required fields', async () => {
    const res = await request(app).post('/api/v1/found-items').send({});
    expect(res.status).toBe(400);
  });

  it('should return 404 for PUT with non-existing ID', async () => {
    const res = await request(app)
      .put('/api/v1/found-items/nonexistent-id')
      .send({
        name: 'Cap',
        category: 'clothing',
        location: 'Student Center',
        description: 'Trying to update non-existing found item',
        dateFound: '2025-04-10',
        foundBy: 'Lovedeep'
      });
    expect(res.status).toBe(404);
  });

  it('should return 404 for DELETE with non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/found-items/nonexistent-id');
    expect(res.status).toBe(404);
  });
});
