import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

let server;

before(async () => {
  try {
    server = await app.listen(3001); // Ganti 3001 dengan port yang berbeda jika perlu
    console.log('Test server is running on http://localhost:3001');
  } catch (error) {
    console.error('Error starting test server:', error);
    throw error;
  }
});

// ... sisa kode test

after((done) => {
  server.close(done);
});

describe('API Testing', () => {
  it('should return all items', (done) => {
    request(server)
      .get('/api/items')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });

  it('should create a new item', (done) => {
    request(server)
      .post('/api/items')
      .send({ name: 'New Item' })
      .expect(201)
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
});
