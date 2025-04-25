import request from 'supertest';
import app from '../../src/app';

describe('Claims Authorization (no token validation in test mode)', () => {
  it('should return 400 if missing required fields', async () => {
    const res = await request(app).post('/api/v1/claims').send({});
    expect(res.status).toBe(400);
  });

  it('should return 404 for PUT with non-existing ID', async () => {
    const res = await request(app)
      .put('/api/v1/claims/nonexistent-id')
      .send({
        claimantName: 'Test User',
        claimantEmail: 'testuser@example.com',
        justification: 'Trying to update non-existing claim',
        dateClaimed: '2025-04-10',
        itemId: 'fake-item-id'
      });
    expect(res.status).toBe(404);
  });

  it('should return 404 for DELETE with non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/claims/nonexistent-id');
    expect(res.status).toBe(404);
  });
});
