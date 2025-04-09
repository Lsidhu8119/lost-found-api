import request from 'supertest';
import app from '../src/app';

describe('Lost Items API', () => {
  let createdItemId: string;

  const sampleLostItem = {
    name: 'Wallet',
    category: 'accessories',
    location: 'Library',
    description: 'Brown leather wallet with multiple cards',
    dateReported: '2025-04-09',
    reportedBy: 'Sukhtab'
  };

  it('GET /api/v1/lost-items - should return all lost items', async () => {
    const res = await request(app).get('/api/v1/lost-items');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /api/v1/lost-items - should create a new lost item', async () => {
    const res = await request(app).post('/api/v1/lost-items').send(sampleLostItem);
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Lost item reported successfully');
    expect(res.body.item).toHaveProperty('id');
    expect(res.body.item.name).toBe(sampleLostItem.name);
    createdItemId = res.body.item.id;
  });

  it('PUT /api/v1/lost-items/:id - should update a lost item', async () => {
    const updatedData = {
      ...sampleLostItem,
      location: 'Student Lounge',
      description: 'Brown wallet found near the couch'
    };
    const res = await request(app)
      .put(`/api/v1/lost-items/${createdItemId}`)
      .send(updatedData);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Lost item updated successfully');
  });

  it('DELETE /api/v1/lost-items/:id - should delete a lost item', async () => {
    const res = await request(app).delete(`/api/v1/lost-items/${createdItemId}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Lost item deleted successfully');
  });

  it('DELETE /api/v1/lost-items/:id - should return 404 for non-existing ID', async () => {
    const res = await request(app).delete('/api/v1/lost-items/nonexistent-id');
    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Lost item not found with the given ID');
  });
});
