import ChatRepo from '@src/repos/ChatRepo';
import { IChatMongo } from '@src/models/Chat';
import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

export const CHAT_NOT_FOUND = 'Chat non trouvé';

export default {
  getAll: (filters?: any) => ChatRepo.getAll(filters),

  getOne: async (id: string): Promise<IChatMongo> => {
    const chat = await ChatRepo.getOne(id);
    if (!chat) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, CHAT_NOT_FOUND);
    }
    return chat;
  },
  getFiltered: (filters: any) => ChatRepo.getFiltered(filters),

  addOne: (chat: IChatMongo) => ChatRepo.add(chat),

  updateOne: async (id: string, chat: IChatMongo): Promise<IChatMongo> => {
    const exists = await ChatRepo.getOne(id);
    if (!exists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, CHAT_NOT_FOUND);
    }
    return (await ChatRepo.update(id, chat)) as IChatMongo;
  },

  delete: async (id: string): Promise<void> => {
    const exists = await ChatRepo.getOne(id);
    if (!exists) {
      throw new RouteError(HttpStatusCodes.NOT_FOUND, CHAT_NOT_FOUND);
    }
    await ChatRepo.delete(id);
  },
} as const;
