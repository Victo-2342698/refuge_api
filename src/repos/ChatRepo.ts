import Chat from '@src/models/Chat';
import { IChatMongo } from '@src/models/Chat';

export default {
  /* ---------------------------------------------------------
     GET ALL 
  --------------------------------------------------------- */
  async getAll(filters?: any): Promise<IChatMongo[]> {
    const query: any = {};

    if (filters) {
      if (filters.race) {
        query.race = filters.race;
      }

      if (
        filters.tauxEnergie !== undefined &&
        !isNaN(Number(filters.tauxEnergie))
      ) {
        query.tauxEnergie = Number(filters.tauxEnergie);
      }
    }

    return Chat.find(query).sort({ dateMiseAdoption: -1 });
  },

  /* ---------------------------------------------------------
     GET ONE
  --------------------------------------------------------- */
  getOne: (id: string) => Chat.findById(id),

  /* ---------------------------------------------------------
     GET FILTERED 
  --------------------------------------------------------- */
  async getFiltered(filters: any): Promise<IChatMongo[]> {
    const query: any = {};

    if (filters?.race) {
      query.race = filters.race;
    }

    if (
      filters?.tauxEnergie !== undefined &&
      !isNaN(Number(filters.tauxEnergie))
    ) {
      query.tauxEnergie = Number(filters.tauxEnergie);
    }

    return Chat.find(query);
  },

  /* ---------------------------------------------------------
     ADD
  --------------------------------------------------------- */
  add: (chat: IChatMongo) => Chat.create(chat),

  /* ---------------------------------------------------------
     UPDATE  ✅ CORRIGÉ
  --------------------------------------------------------- */
  update: (id: string, chat: Partial<IChatMongo>) =>
    Chat.findByIdAndUpdate(id, { $set: chat }, { new: true }),

  /* ---------------------------------------------------------
     DELETE
  --------------------------------------------------------- */
  delete: (id: string) => Chat.findByIdAndDelete(id),
} as const;
