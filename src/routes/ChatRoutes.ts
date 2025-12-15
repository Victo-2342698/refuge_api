import { Request, Response, NextFunction } from 'express';
import ChatService from '@src/services/ChatService';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IChatMongo } from '@src/models/Chat';
import { validateChat } from '@src/validators/chatValidator';

/* ---------------------------------------------------------
   GET ALL (avec filtres si présents)
--------------------------------------------------------- */
export async function getAll(req: Request, res: Response, next: NextFunction) {
  try {
    const chats = await ChatService.getAll(req.query);
    res.status(HttpStatusCodes.OK).json({ success: true, data: chats });
  } catch (err) {
    next(err);
  }
}

export async function getFiltered(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { race, tauxEnergie } = req.query;

    const chats = await ChatService.getFiltered({
      race: race as string,
      tauxEnergie: tauxEnergie ? Number(tauxEnergie) : undefined,
    });

    res.status(HttpStatusCodes.OK).json({ success: true, data: chats });
  } catch (err) {
    next(err);
  }
}

/* ---------------------------------------------------------
   GET ONE
--------------------------------------------------------- */
export async function getOne(req: Request, res: Response, next: NextFunction) {
  try {
    const chat = await ChatService.getOne(req.params.id);
    res.status(HttpStatusCodes.OK).json({ success: true, data: chat });
  } catch (err) {
    next(err);
  }
}

/* ---------------------------------------------------------
   ADD
--------------------------------------------------------- */
export async function add(req: Request, res: Response, next: NextFunction) {
  try {
    validateChat(req.body);

    const created = await ChatService.addOne(req.body as IChatMongo);

    res
      .status(HttpStatusCodes.CREATED)
      .json({ message: 'Chat créé avec succès.', chat: created });
  } catch (err) {
    next(err);
  }
}

/* ---------------------------------------------------------
   UPDATE
--------------------------------------------------------- */
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    validateChat(req.body);

    const updated = await ChatService.updateOne(
      req.params.id,
      req.body as IChatMongo,
    );

    res
      .status(HttpStatusCodes.OK)
      .json({ message: 'Chat mis à jour avec succès.', chat: updated });
  } catch (err) {
    next(err);
  }
}

/* ---------------------------------------------------------
   DELETE
--------------------------------------------------------- */
export async function delete_(req: Request, res: Response, next: NextFunction) {
  try {
    await ChatService.delete(req.params.id);
    res
      .status(HttpStatusCodes.OK)
      .json({ message: 'Chat supprimé avec succès.' });
  } catch (err) {
    next(err);
  }
}

export default {
  getAll,
  getFiltered,
  getOne,
  add,
  update,
  delete: delete_,
} as const;
