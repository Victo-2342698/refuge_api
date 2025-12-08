import { Schema, model } from 'mongoose';

export interface IUserMongo {
  email: string;
  password: string;
  name: string;
  created?: Date;
}

const UserSchema = new Schema<IUserMongo>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

export const User = model<IUserMongo>('User', UserSchema);
export default User;
