import request from 'supertest';
import app from '../../src/app';

describe('Lost Items API', () => {
  const newItem = {
    name: 'Black Leather Jacket',
    category: 'clothing',
    location: 'Elgin Building main floor',
    description: 'Black leather jacket with spikes on shoulders',
    dateReported: '2025-04-10',
    reportedBy: 'Lovedeep Sidhu',
  };

  const updatedItem = {
    name: 'iPhone 12',
    category: 'electronics',
    location: 'Main Hall',
    description: 'Lost when playing cards with others',
    dateReported: '2025-04-11',
    reportedBy: 'Amandeep Singh',
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

  it('PUT /api/v1/lost-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).put('/api/v1/lost-items/nonexistent-id').send(updatedItem);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Lost item not found with the given ID');
  });

  it('DELETE /api/v1/lost-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/lost-items/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Lost item not found with the given ID');
  });

  it('POST /api/v1/lost-items - should fail validation with missing fields', async () => {
    const res = await request(app).post('/api/v1/lost-items').send({ name: 'test' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });
});
