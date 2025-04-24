import request from 'supertest';
import app from '../../src/app';

describe('Lost Items Authorization', () => {
  it('should deny access to POST without token', async () => {
    const res = await request(app).post('/api/v1/lost-items').send({});
    expect(res.status).toBe(401);
  });

  it('should deny access to PUT without token', async () => {
    const res = await request(app).put('/api/v1/lost-items/some-id').send({});
    expect(res.status).toBe(401);
  });

  it('should deny DELETE if not admin', async () => {
    const res = await request(app)
      .delete('/api/v1/lost-items/some-id')
      .set('Authorization', `Bearer invalid-user-token`);
    expect(res.status).toBe(403);
  });
});
