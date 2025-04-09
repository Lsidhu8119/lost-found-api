import request from 'supertest';
import app from '../../src/app';

describe('Claim Routes API', () => {
  let createdClaimId: string;

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
    expect(res.body).toHaveProperty('id');
    createdClaimId = res.body.id;
    expect(res.body.claimantName).toBe(sampleClaim.claimantName);
  });

  it('POST /api/v1/claims - should fail if data is invalid', async () => {
    const res = await request(app).post('/api/v1/claims').send({
      claimantName: 'Missing Fields',
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('PUT /api/v1/claims/:id - should update an existing claim', async () => {
    const res = await request(app)
      .put(`/api/v1/claims/${createdClaimId}`)
      .send(updatedClaim);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Claim updated Succesfully');
  });

  it('PUT /api/v1/claims/:id - should return 404 for invalid claim ID', async () => {
    const res = await request(app)
      .put('/api/v1/claims/nonexistent-id')
      .send(updatedClaim);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found');
  });

  it('DELETE /api/v1/claims/:id - should delete a claim', async () => {
    const res = await request(app).delete(`/api/v1/claims/${createdClaimId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Claim deleted successfully');
  });

  it('DELETE /api/v1/claims/:id - should return 404 for non-existing claim', async () => {
    const res = await request(app).delete('/api/v1/claims/fake-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found');
  });
});
