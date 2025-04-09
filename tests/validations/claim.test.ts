import { validateClaim } from '../../src/api/v1/validations/claimValidation';
import express from 'express';
import request from 'supertest';

const app = express();
app.use(express.json());

// Dummy route for testing the middleware
app.post('/test-claim', validateClaim, (_req, res) => {
  res.status(200).json({ message: 'Validation passed' });
});

describe('Claim Validation Middleware', () => {
  const validClaim = {
    itemId: 'item123',
    claimantName: 'John Doe',
    claimantEmail: 'john@example.com',
    justification: 'I left my phone on the table in the cafeteria',
    dateClaimed: '2025-04-10',
  };

  it('should pass validation with valid claim data', async () => {
    const res = await request(app).post('/test-claim').send(validClaim);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Validation passed');
  });

  it('should fail if itemId is missing', async () => {
    const { itemId, ...data } = validClaim;
    const res = await request(app).post('/test-claim').send(data);
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/"itemId" is required/);
  });

  it('should fail if claimantEmail is invalid', async () => {
    const res = await request(app)
      .post('/test-claim')
      .send({ ...validClaim, claimantEmail: 'notanemail' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/must be a valid email/);
  });

  it('should fail if justification is too short', async () => {
    const res = await request(app)
      .post('/test-claim')
      .send({ ...validClaim, justification: 'Too short' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/length must be at least 10 characters long/);
  });

  it('should fail if dateClaimed is not ISO format', async () => {
    const res = await request(app)
      .post('/test-claim')
      .send({ ...validClaim, dateClaimed: '04/10/2025' });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/must be in iso format/);
  });
});
