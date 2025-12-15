import insertUrlParams from 'inserturlparams';
import { customDeepCompare } from 'jet-validators/utils';

import Chat, { IChatMongo } from '@src/models/Chat';
import { CHAT_NOT_FOUND } from '@src/services/ChatService';

import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import Paths from './common/Paths';
import { agent } from './support/setup';
import { Document } from 'mongoose';

/******************************************************************************
                               Constants
******************************************************************************/

const DB_CHATS = [
  {
    nom: 'Mina',
    race: 'Siamois',
    numeroDossier: 1001,
    dateNaissance: new Date('2023-01-01'),
    tauxEnergie: 5,
    sociabiliteHumain: 4,
    compatEnfants: 3,
    compatChiens: 2,
    compatChats: 5,
    description: 'Chat très affectueux et calme.',
    micropuce: true,
    sterilise: true,
    vaccinsBase: true,
    photos: [],
  },
];

const compareChatArrays = customDeepCompare({
  onlyCompareProps: ['nom', 'race', 'numeroDossier'],
});

/******************************************************************************
                               Tests
******************************************************************************/

describe('chatRouter', () => {
  let dbChats: (IChatMongo & Document)[] = [];

  beforeEach(async () => {
    await Chat.deleteMany({});
    dbChats = await Chat.insertMany(DB_CHATS);
  });

  /* ------------------------------------------------------------------------
     GET ALL
  ------------------------------------------------------------------------- */
  describe(`GET ${Paths.Chats.Get}`, () => {
    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const res = await agent.get(Paths.Chats.Get);
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(compareChatArrays(res.body.data, DB_CHATS)).toBeTruthy();
    });
  });

  /* ------------------------------------------------------------------------
     GET ONE
  ------------------------------------------------------------------------- */
  describe(`GET ${Paths.Chats.GetOne}`, () => {
    it(`retourne un chat`, async () => {
      const id = dbChats[0]._id.toString();
      const res = await agent.get(Paths.Chats.GetOne.replace(':id', id));
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body.data._id).toBe(id);
    });

    it(`retourne ${HttpStatusCodes.NOT_FOUND}`, async () => {
      const res = await agent.get(
        Paths.Chats.GetOne.replace(':id', '000000000000000000000000'),
      );
      expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
      expect(res.body.error).toBe(CHAT_NOT_FOUND);
    });
  });

  /* ------------------------------------------------------------------------
     POST
  ------------------------------------------------------------------------- */
  describe(`POST ${Paths.Chats.Add}`, () => {
    it(`retourne ${HttpStatusCodes.CREATED}`, async () => {
      const res = await agent.post(Paths.Chats.Add).send(DB_CHATS[0]);
      expect(res.status).toBe(HttpStatusCodes.CREATED);
      expect(res.body.chat.nom).toBe('Mina');
    });
  });

  /* ------------------------------------------------------------------------
     PUT
  ------------------------------------------------------------------------- */
  describe(`PUT ${Paths.Chats.Update}`, () => {
    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const id = dbChats[0]._id.toString();

      const res = await agent
        .put(Paths.Chats.Update.replace(':id', id))
        .send({ ...DB_CHATS[0], description: 'Description modifiée valide.' });

      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body.chat.description).toContain('modifiée');
    });

    it(`retourne ${HttpStatusCodes.NOT_FOUND}`, async () => {
      const res = await agent
        .put(Paths.Chats.Update.replace(':id', '000000000000000000000000'))
        .send(DB_CHATS[0]);

      expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
      expect(res.body.error).toBe(CHAT_NOT_FOUND);
    });
  });

  /* ------------------------------------------------------------------------
     DELETE
  ------------------------------------------------------------------------- */
  describe(`DELETE ${Paths.Chats.Delete}`, () => {
    const getPath = (id: string) => insertUrlParams(Paths.Chats.Delete, { id });

    it(`retourne ${HttpStatusCodes.OK}`, async () => {
      const id = dbChats[0]._id.toString();
      const res = await agent.delete(getPath(id));
      expect(res.status).toBe(HttpStatusCodes.OK);
    });

    it(`retourne ${HttpStatusCodes.NOT_FOUND}`, async () => {
      const res = await agent.delete(getPath('000000000000000000000000'));
      expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
      expect(res.body.error).toBe(CHAT_NOT_FOUND);
    });
  });
});
