import Chat, { IChatMongo } from '@src/models/Chat';

/**
 * GET ALL with filters
 */
async function getAll(filters: any = {}): Promise<IChatMongo[]> {
  const query: any = {};

  // Filtre race
  if (filters.race) {
    query.race = filters.race;
  }

  // Filtre énergie
  if (filters.tauxEnergie) {
    query.tauxEnergie = Number(filters.tauxEnergie);
  }

  // Filtre compatibilité chiens
  if (filters.compatChiens) {
    query.compatChiens = Number(filters.compatChiens);
  }

  // Filtre compatibilité enfants
  if (filters.compatEnfants) {
    query.compatEnfants = Number(filters.compatEnfants);
  }

  // Filtre micropuce
  if (filters.micropuce !== undefined) {
    query.micropuce = filters.micropuce === 'true';
  }

  // Filtre stérilisé
  if (filters.sterilise !== undefined) {
    query.sterilise = filters.sterilise === 'true';
  }

  return Chat.find(query).sort({ created: -1 });
}

/**
 * GET ONE
 */
async function getOne(id: string): Promise<IChatMongo | null> {
  return Chat.findById(id);
}
async function getFiltered(filters: { race?: string; tauxEnergie?: number }) {
  const query: any = {};

  if (filters.race) query.race = filters.race;
  if (filters.tauxEnergie) query.tauxEnergie = filters.tauxEnergie;

  return Chat.find(query);
}

/**
 * ADD
 */
async function add(chat: IChatMongo): Promise<IChatMongo> {
  const c = new Chat(chat);
  return await c.save();
}

/**
 * UPDATE
 */
async function update(
  id: string,
  chat: IChatMongo,
): Promise<IChatMongo | null> {
  return Chat.findByIdAndUpdate(id, chat, {
    new: true,
    runValidators: true,
  });
}

/**
 * DELETE
 */
async function delete_(id: string): Promise<void> {
  await Chat.findByIdAndDelete(id);
}

export default {
  getAll,
  getOne,
  getFiltered,
  add,
  update,
  delete: delete_,
} as const;
