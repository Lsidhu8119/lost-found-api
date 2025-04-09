import request from 'supertest';
import app from '../../src/app';

describe('Claim Controller API', () => {
  let createdClaimId: string;

  const sampleClaim = {
    itemId: 'abc123',
    claimantName: 'Subhpreet',
    claimantEmail: 'subhpreet@gmail.com',
    justification: 'I can identify a unique sticker on it',
    dateClaimed: '2025-04-10',
  };

  const updatedClaim = {
    ...sampleClaim,
    justification: 'It has a unique engraving on the inside panel.',
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
    expect(res.body.claimantName).toBe(sampleClaim.claimantName);
    createdClaimId = res.body.id;
  });

  it('POST /api/v1/claims - should fail with missing fields', async () => {
    const res = await request(app).post('/api/v1/claims').send({
      claimantName: 'Amandeep',
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('PUT /api/v1/claims/:id - should update a claim', async () => {
    const res = await request(app)
      .put(`/api/v1/claims/${createdClaimId}`)
      .send(updatedClaim);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Claim updated Succesfully`);
  });

  it('PUT /api/v1/claims/:id - should return 404 for invalid ID', async () => {
    const res = await request(app).put('/api/v1/claims/invalid-id').send(updatedClaim);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found');
  });

  it('DELETE /api/v1/claims/:id - should delete a claim', async () => {
    const res = await request(app).delete(`/api/v1/claims/${createdClaimId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Claim deleted successfully');
  });

  it('DELETE /api/v1/claims/:id - should return 404 for non-existent claim', async () => {
    const res = await request(app).delete('/api/v1/claims/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Claim not found');
  });
});
