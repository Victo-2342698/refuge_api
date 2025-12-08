import UserRepo from '@src/repos/UserRepo';
import { IUserMongo } from '@src/models/User';

export const USER_NOT_FOUND = 'Utilisateur non trouvé';

export default {
  getAll: () => UserRepo.getAll(),
  getByEmail: (email: string) => UserRepo.getByEmail(email),
  add: (user: IUserMongo) => UserRepo.add(user),
  update: (user: IUserMongo) => UserRepo.update(user),
  delete: (email: string) => UserRepo.delete(email),
};
