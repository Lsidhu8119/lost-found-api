import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import { validateLostItem } from '../../src/api/v1/validations/lostItemValidation';

const app = express();
app.use(express.json());
app.post('/test-lost', validateLostItem, (_req: Request, res: Response) => {
  res.status(200).json({ message: 'Validation passed' });
});

describe('Lost Item Validation Middleware', () => {
  it('should pass validation for valid input', async () => {
    const validData = {
      name: 'Backpack',
      category: 'accessories',
      location: 'Main Hall',
      description: 'Black backpack with white stripes',
      dateReported: '2025-04-10',
      reportedBy: 'Lovedeep Singh'
    };

    const res = await request(app).post('/test-lost').send(validData);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Validation passed');
  });

  it('should fail when name is missing', async () => {
    const data = {
      category: 'accessories',
      location: 'Main Hall',
      description: 'Missing name field',
      dateReported: '2025-04-10',
      reportedBy: 'Lovedeep Singh'
    };

    const res = await request(app).post('/test-lost').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"name" is required');
  });

  it('should fail when dateReported is not in ISO format', async () => {
    const data = {
      name: 'Wallet',
      category: 'accessories',
      location: 'Library',
      description: 'Brown wallet with cards',
      dateReported: '10-04-2025',
      reportedBy: 'Navpreet Kaur'
    };

    const res = await request(app).post('/test-lost').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('"dateReported" must be in iso format');
  });

  it('should fail when reportedBy is missing', async () => {
    const data = {
      name: 'Laptop',
      category: 'electronics',
      location: 'Elgin building',
      description: 'Silver HP laptop',
      dateReported: '2025-04-11'
    };

    const res = await request(app).post('/test-lost').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('"reportedBy" is required');
  });
});
