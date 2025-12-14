import JetonService from '@src/services/JetonService';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IReq, IRes } from './common/types';

interface IUserLogin {
  email: string;
  password: string;
}

async function generateToken(req: IReq, res: IRes) {
  const { email, password } = req.body as unknown as IUserLogin;

  if (!email || !password) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Email et mot de passe requis' });
  }

  const token = await JetonService.generateToken({ email, password });

  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: 'Identifiants invalides' });
  }

  return res.json({ token });
}

export default {
  generateToken,
} as const;
