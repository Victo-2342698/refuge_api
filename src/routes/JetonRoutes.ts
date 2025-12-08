import JetonService from '@src/services/JetonService';
import User from '@src/models/User';
import { IReq, IRes } from './common/types';
import { parseReq } from './common/util';

const Validators = {
  generatetoken: parseReq({ userLogin: User.testlogin }),
};

async function generateToken(req: IReq, res: IRes) {
  const { userLogin } = Validators.generatetoken(req.body);
  const token = await JetonService.generateToken(userLogin);
  return res.send({ token });
}

export default {
  generateToken,
} as const;
