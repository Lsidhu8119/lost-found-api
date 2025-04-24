import request from 'supertest';
import app from '../../src/app';

describe('Lost Items Route Authentication Tests', () => {
  const sampleLostItem = {
    name: 'Wallet',
    category: 'accessories',
    location: 'Library',
    description: 'Brown wallet with cards',
    dateReported: '2025-04-09',
    reportedBy: 'Lovedeep'
  };

  const invalidToken = 'Bearer invalid.token.here';

  it('should return 401 if no token is provided', async () => {
    const res = await request(app).post('/api/v1/lost-items').send(sampleLostItem);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized: No token provided');
  });

  it('should return 401 if token is invalid', async () => {
    const res = await request(app)
      .post('/api/v1/lost-items')
      .set('Authorization', invalidToken)
      .send(sampleLostItem);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe('Unauthorized: Invalid token');
  });
});
