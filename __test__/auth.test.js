import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app } from '../src/server/server';

// Testdaten
const testEmail = 'testuser@example.com';
const testPassword = 'TestPassword123!';

describe('Auth API', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should not register with existing email', async () => {
    await request(app)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });
    const res = await request(app)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });
    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: testEmail, password: testPassword });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.user.email).toBe(testEmail);
  });

  it('should not login with wrong password', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: testEmail, password: 'wrongPassword' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should not login with non-existent user', async () => {
    const res = await request(app)
      .post('/api/login')
      .send({ email: 'nouser@example.com', password: 'irrelevant' });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
