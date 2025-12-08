import UserService from './UserService';
import jwt from 'jsonwebtoken';
import ENV from '@src/common/constants/ENV';

interface IUserLogin {
  email: string;
  password: string;
}

export async function generateToken(data: IUserLogin): Promise<string> {
  const user = await UserService.getByEmail(data.email);

  if (!user) return '';
  if (user.password !== data.password) return '';

  return jwt.sign({ email: user.email }, ENV.Jwtsecret as string);
}

export default { generateToken };
