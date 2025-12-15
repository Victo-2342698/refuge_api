import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import User from '@src/models/User';
import { agent } from './support/setup';

describe('User Routes', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.create({
      email: 'marwa@test.com',
      password: '1234',
      name: 'Marwa',
    });
  });

  describe('GET /users', () => {
    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const res = await agent.get('/users');
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body.users.length).toBe(1);
    });
  });

  describe('POST /users', () => {
    it(`retourne ${HttpStatusCodes.CREATED}`, async () => {
      const res = await agent.post('/users').send({
        email: 'new@test.com',
        password: 'abc',
        name: 'Test',
      });
      expect(res.status).toBe(HttpStatusCodes.CREATED);
    });

    it(`retourne ${HttpStatusCodes.BAD_REQUEST} si champ manquant`, async () => {
      const res = await agent.post('/users').send({
        email: '',
        password: 'abc',
        name: 'X',
      });
      expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(res.body.error).toBe('Champs requis');
    });
  });

  describe('PUT /users', () => {
    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const res = await agent.put('/users').send({
        email: 'marwa@test.com',
        password: 'newpass',
        name: 'Nouvelle Marwa',
      });
      expect(res.status).toBe(HttpStatusCodes.OK);
    });

    it(`retourne ${HttpStatusCodes.BAD_REQUEST} si email manquant`, async () => {
      const res = await agent.put('/users').send({
        email: '',
        password: 'abc',
        name: 'Test',
      });
      expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
      expect(res.body.error).toBe('Email requis');
    });
  });

  describe('DELETE /users/:email', () => {
    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const res = await agent.delete('/users/marwa@test.com');
      expect(res.status).toBe(HttpStatusCodes.OK);
    });

    it(`retourne ${HttpStatusCodes.BAD_REQUEST} si email manquant`, async () => {
      const res = await agent.delete('/users/');
      expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
    });
  });
});
