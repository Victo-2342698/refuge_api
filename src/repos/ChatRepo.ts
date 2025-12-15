import Chat from '@src/models/Chat';
import { IChatMongo } from '@src/models/Chat';

export default {
  /* ---------------------------------------------------------
     GET ALL (avec filtres optionnels sécurisés)
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
     GET FILTERED (même logique que getAll, séparé pour clarté)
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
     UPDATE
  --------------------------------------------------------- */
  update: (id: string, chat: IChatMongo) =>
    Chat.findByIdAndUpdate(id, chat, { new: true }),

  /* ---------------------------------------------------------
     DELETE
  --------------------------------------------------------- */
  delete: (id: string) => Chat.findByIdAndDelete(id),
} as const;
