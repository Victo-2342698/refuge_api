import { Request, Response } from 'express';
import JetonService from '@src/services/JetonService';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

export default {
  async generateToken(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ error: 'Email et mot de passe requis' });

    const token = await JetonService.generateToken({ email, password });

    if (!token)
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ error: 'Identifiants invalides' });

    res.json({ token });
  },
};
