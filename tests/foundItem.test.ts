// tests/foundItem.test.ts
import request from 'supertest';
import app from '../src/app';

describe('Found Items API', () => {
  let createdItemId = '';

  const newItem = {
    name: 'Test Phone',
    category: 'electronics',
    location: 'Main Hall',
    description: 'Black phone with cracks on screen',
    dateFound: '2025-04-10',
    foundBy: 'John Doe'
  };

  const updatedItem = {
    name: 'Updated Phone',
    category: 'electronics',
    location: 'Library',
    description: 'Updated description for testing',
    dateFound: '2025-04-11',
    foundBy: 'John Doe'
  };

  it('GET /api/v1/found-items - should return all found items', async () => {
    const res = await request(app).get('/api/v1/found-items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/v1/found-items - should create a new found item', async () => {
    const res = await request(app).post('/api/v1/found-items').send(newItem);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Found item reported successfully');
    expect(res.body.item.name).toBe(newItem.name);
    createdItemId = res.body.item.id;
  });

  it('POST /api/v1/found-items - should fail validation if required fields are missing', async () => {
    const res = await request(app).post('/api/v1/found-items').send({});
    expect(res.status).toBe(400);
    expect(res.body.error).toBeDefined();
  });

  it('PUT /api/v1/found-items/:id - should update a found item', async () => {
    const res = await request(app).put(`/api/v1/found-items/${createdItemId}`).send(updatedItem);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Found item updated successfully');
  });

  it('PUT /api/v1/found-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).put('/api/v1/found-items/nonexistent-id').send(updatedItem);
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Found item not found with the given ID');
  });

  it('DELETE /api/v1/found-items/:id - should delete a found item', async () => {
    const res = await request(app).delete(`/api/v1/found-items/${createdItemId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Found item deleted successfully');
  });

  it('DELETE /api/v1/found-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/found-items/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Found item not found with the given ID');
  });
});
