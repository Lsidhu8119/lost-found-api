import request from 'supertest';
import app from '../../src/app';

describe('Lost Items Route Authentication Tests (token skipped in test mode)', () => {
  const sampleLostItem = {
    name: 'Test Item',
    category: 'accessories',
    location: 'Library',
    description: 'Testing item description',
    dateReported: '2025-04-10',
    reportedBy: 'Lovedeep',
  };

  it('should allow POST without token in test environment', async () => {
    const res = await request(app).post('/api/v1/lost-items').send(sampleLostItem);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Lost item reported successfully');
  });
});
