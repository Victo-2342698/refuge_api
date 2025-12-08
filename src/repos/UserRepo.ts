import User, { IUserMongo } from '@src/models/User';

/** Retourner tous les users */
async function getAll(): Promise<IUserMongo[]> {
  return User.find();
}

/** Obtenir un user par email */
async function getByEmail(email: string): Promise<IUserMongo | null> {
  return User.findOne({ email });
}

/** Ajouter un user */
async function add(user: IUserMongo): Promise<void> {
  const u = new User(user);
  await u.save();
}

/** Mettre à jour un user */
async function update(user: IUserMongo): Promise<void> {
  await User.updateOne({ email: user.email }, user);
}

/** Supprimer un user */
async function delete_(email: string): Promise<void> {
  await User.deleteOne({ email });
}

export default {
  getAll,
  getByEmail,
  add,
  update,
  delete: delete_,
};
