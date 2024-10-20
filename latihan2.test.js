import request from 'supertest';
import { expect } from 'chai';
import app from '../src/app.js'; // Ganti dengan path ke aplikasi Anda

let server;

describe('API Testing - PUT /api/items/:id', () => {
  before(async () => {
    try {
      server = await app.listen(3003); // Pastikan port sesuai dengan aplikasi Anda
      console.log('Test server is running on http://localhost:3001');
    } catch (error) {
      console.error('Error starting test server:', error);
      throw error;
    }
  });

  after(async () => {
    if (server) {
      await server.close();
    }
  });

  it('should update an item by id', async () => {
    // Data item sebelum diupdate (asumsikan sudah ada di database)
    const itemId = 1;
    const updatedData = {
      name: 'Akbar Febrian',
      description: '2200016152',
      
    };

    try {
      const response = await request(server)
        .put(`/api-testing-practicum/test/${itemId}`)
        .send(updatedData)
        .expect(200);

      // Verifikasi respon
      expect(response.body).to.deep.equal({
        id: itemId,
        ...updatedData // Pastikan semua properti yang diupdate sudah benar
      });
    } catch (error) {
      console.error('Error updating item:', error);
      console.log('Response body:', response.body); // Cetak respon untuk debugging
      throw error;
    }
  });
});