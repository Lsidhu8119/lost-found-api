import request from 'supertest';
import app from '../../src/app';

describe('Lost Items Authorization (no token validation in test mode)', () => {
  it('should return 400 if missing required fields', async () => {
    const res = await request(app).post('/api/v1/lost-items').send({});
    expect(res.status).toBe(400);
  });

  it('should return 404 for PUT with non-existing ID', async () => {
    const res = await request(app)
      .put('/api/v1/lost-items/nonexistent-id')
      .send({
        name: 'Wallet',
        category: 'accessories',
        location: 'Library',
        description: 'Trying to update non-existing lost item',
        dateReported: '2025-04-10',
        reportedBy: 'Lovedeep'
      });
    expect(res.status).toBe(404);
  });

  it('should return 404 for DELETE with non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/lost-items/nonexistent-id');
    expect(res.status).toBe(404);
  });
});
