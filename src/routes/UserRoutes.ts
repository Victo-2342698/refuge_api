import { Request, Response } from 'express';
import UserService from '@src/services/UserService';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

/******************************************************************************
                                Functions
******************************************************************************/

async function getAll(_: Request, res: Response) {
  const users = await UserService.getAll();
  return res.status(HttpStatusCodes.OK).json({ users });
}

async function add(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Champs requis' });
  }

  await UserService.add({ email, password, name });
  return res.status(HttpStatusCodes.CREATED).end();
}

async function update(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Email requis' });
  }

  await UserService.update({ email, password, name });
  return res.status(HttpStatusCodes.OK).end();
}

async function delete_(req: Request, res: Response) {
  const { email } = req.params;

  if (!email) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ error: 'Email requis' });
  }

  await UserService.delete(email);
  return res.status(HttpStatusCodes.OK).end();
}

/******************************************************************************
                                Export
******************************************************************************/

export default {
  getAll,
  add,
  update,
  delete: delete_,
};
