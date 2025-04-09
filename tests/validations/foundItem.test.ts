import { validateFoundItem } from '../../src/api/v1/validations/foundItemValidation';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());

// Dummy route for testing middleware
app.post('/test-found', validateFoundItem, (_req, res) => {
  res.status(200).json({ message: 'Validation passed' });
});

describe('Found Item Validation Middleware', () => {
  const validData = {
    name: 'Backpack',
    category: 'accessories',
    location: 'Library',
    description: 'Black backpack with a zipper and green tag',
    dateFound: '2025-04-10',
    foundBy: 'Lovedeep Sidhu',
  };

  it('should pass validation with valid data', async () => {
    const res = await request(app).post('/test-found').send(validData);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Validation passed');
  });

  it('should fail when name is missing', async () => {
    const { name, ...data } = validData;
    const res = await request(app).post('/test-found').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"name" is required');
  });

  it('should fail when dateFound is not in ISO format', async () => {
    const res = await request(app)
      .post('/test-found')
      .send({ ...validData, dateFound: '10-04-2025' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Date must be in ISO format (YYYY-MM-DD).');
  });

  it('should fail when foundBy is empty', async () => {
    const res = await request(app)
      .post('/test-found')
      .send({ ...validData, foundBy: '' });
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Reporter name (foundBy) is required.');
  });

  it('should fail when location is missing', async () => {
    const { location, ...data } = validData;
    const res = await request(app).post('/test-found').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"location" is required');
  });
});
