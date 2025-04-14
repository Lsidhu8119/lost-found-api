import request from 'supertest';
import app from '../../src/app';

describe('Claim Routes API', () => {
  const sampleClaim = {
    itemId: 'abc123',
    claimantName: 'Subhpreet',
    claimantEmail: 'subhpreet@gmail.com',
    justification: 'I lost my bag near the cafeteria.',
    dateClaimed: '2025-04-08',
  };

  const updatedClaim = {
    ...sampleClaim,
    justification: 'Updated justification: bag had a red keychain',
  };

  it('GET /api/v1/claims - should return all claims', async () => {
    const res = await request(app).get('/api/v1/claims');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/v1/claims - should create a new claim', async () => {
    const res = await request(app).post('/api/v1/claims').send(sampleClaim);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Claim submitted successfully');
  });

  it('POST /api/v1/claims - should fail validation if required fields are missing', async () => {
    const res = await request(app).post('/api/v1/claims').send({ claimantName: 'Test' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('PUT /api/v1/claims/:id - should return 404 for invalid claim ID', async () => {
    const res = await request(app).put('/api/v1/claims/nonexistent-id').send(updatedClaim);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found with the given ID');
  });

  it('DELETE /api/v1/claims/:id - should return 404 for non-existing claim', async () => {
    const res = await request(app).delete('/api/v1/claims/fake-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found');
  });
});
