import request from 'supertest';
import app from '../../src/app';

describe('Lost Items Controller API', () => {
  const newItem = {
    name: 'Wallet',
    category: 'accessories',
    location: 'Library',
    description: 'Brown leather wallet with cards',
    dateReported: '2025-04-09',
    reportedBy: 'Lovedeep',
  };

  const updatedItem = {
    ...newItem,
    location: 'Main Hall',
    description: 'Updated description: Found near student lounge',
  };

  it('GET /api/v1/lost-items - should return all lost items', async () => {
    const res = await request(app).get('/api/v1/lost-items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/v1/lost-items - should create a new lost item', async () => {
    const res = await request(app).post('/api/v1/lost-items').send(newItem);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Lost item reported successfully');
  });

  it('POST /api/v1/lost-items - should fail validation if fields are missing', async () => {
    const res = await request(app).post('/api/v1/lost-items').send({ name: 'Missing Fields' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('PUT /api/v1/lost-items/:id - should return 404 for invalid ID', async () => {
    const res = await request(app)
      .put('/api/v1/lost-items/nonexistent-id')
      .send(updatedItem);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Lost item not found with the given ID');
  });

  it('DELETE /api/v1/lost-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/lost-items/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Lost item not found with the given ID');
  });
});
