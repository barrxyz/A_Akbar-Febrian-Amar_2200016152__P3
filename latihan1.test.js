import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js';

let server;

before(async () => {
  try {
    server = await app.listen(3002); 
    console.log('Test server is running on http://localhost:3001');
  } catch (error) {
    console.error('Error starting test server:', error);
    throw error;
  }
});



after((done) => {
  server.close(done);
});

describe('API Testing - DELETE /api/items/:id', () => {
  it('should delete an item by id', (done) => {
    request(server)
      .delete('/api/items/1')  
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Item deleted successfully');
        done();
      });
  });
});
