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
    message: 'Bonjour',
    auteur: 'Marwa',
    race: 'Siamois',
    tauxEnergie: 5,
  },
  {
    message: 'Salut',
    auteur: 'Prof',
    race: 'Persan',
    tauxEnergie: 2,
  },
  {
    message: 'Allo',
    auteur: 'Étienne',
    race: 'Siamois',
    tauxEnergie: 8,
  },
];

// Compare properties (même logique que le cours)
const compareChatArrays = customDeepCompare({
  onlyCompareProps: ['message', 'auteur', 'race', 'tauxEnergie'],
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
  describe(`'GET:${Paths.Chats.Get}'`, () => {
    it(`doit retourner toutes les entrées et ${HttpStatusCodes.OK} si réussi.`, async () => {
      const res = await agent.get(Paths.Chats.Get);
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(compareChatArrays(res.body.data, DB_CHATS)).toBeTruthy();
    });
  });

  /* ------------------------------------------------------------------------
     GET ONE
  ------------------------------------------------------------------------- */
  describe(`'GET:${Paths.Chats.GetOne}'`, () => {
    it(`doit retourner un chat et ${HttpStatusCodes.OK} si trouvé.`, async () => {
      const id = dbChats[0]._id.toString();
      const res = await agent.get(Paths.Chats.GetOne.replace(':id', id));
      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body.data._id).toBe(id);
    });

    it(`doit retourner ${HttpStatusCodes.NOT_FOUND} si introuvable.`, async () => {
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
  describe(`'POST:${Paths.Chats.Add}'`, () => {
    it(`doit retourner ${HttpStatusCodes.CREATED} si l'ajout réussit.`, async () => {
      const chat = {
        message: 'Nouveau chat',
        auteur: 'Testeur',
        race: 'Bengal',
        tauxEnergie: 7,
      };

      const res = await agent.post(Paths.Chats.Add).send(chat);

      expect(res.status).toBe(HttpStatusCodes.CREATED);
      expect(res.body.chat.message).toBe('Nouveau chat');
    });
  });

  /* ------------------------------------------------------------------------
     PUT
  ------------------------------------------------------------------------- */
  describe(`'PUT:${Paths.Chats.Update}'`, () => {
    it(`doit retourner ${HttpStatusCodes.OK} si la mise à jour réussit.`, async () => {
      const id = dbChats[0]._id.toString();

      const res = await agent
        .put(Paths.Chats.Update.replace(':id', id))
        .send({ message: 'Modifié' });

      expect(res.status).toBe(HttpStatusCodes.OK);
      expect(res.body.chat.message).toBe('Modifié');
    });

    it(`doit retourner ${HttpStatusCodes.NOT_FOUND} si id introuvable.`, async () => {
      const res = await agent
        .put(Paths.Chats.Update.replace(':id', '000000000000000000000000'))
        .send({ message: 'Test' });

      expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
      expect(res.body.error).toBe(CHAT_NOT_FOUND);
    });
  });

  /* ------------------------------------------------------------------------
     DELETE
  ------------------------------------------------------------------------- */
  describe(`'DELETE:${Paths.Chats.Delete}'`, () => {
    const getPath = (id: string) => insertUrlParams(Paths.Chats.Delete, { id });

    it(`doit retourner ${HttpStatusCodes.OK} si suppression réussie.`, async () => {
      const id = dbChats[0]._id.toString();
      const res = await agent.delete(getPath(id));
      expect(res.status).toBe(HttpStatusCodes.OK);
    });

    it(`doit retourner ${HttpStatusCodes.NOT_FOUND} si id introuvable.`, async () => {
      const res = await agent.delete(getPath('000000000000000000000000'));
      expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
      expect(res.body.error).toBe(CHAT_NOT_FOUND);
    });
  });
});
