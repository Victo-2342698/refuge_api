import { Router } from 'express';
import Paths from '@src/common/constants/Paths';

import ChatRoutes from './ChatRoutes';
import UserRoutes from './UserRoutes';
import AuthRoutes from './AuthRoutes';

import authenticateToken from '@src/middleware/authMiddleware';

const apiRouter = Router();

/* --------------------------- USERS --------------------------- */
const userRouter = Router();
userRouter.get(Paths.Users.Get, UserRoutes.getAll);
userRouter.post(Paths.Users.Add, UserRoutes.add);
apiRouter.use(Paths.Users.Base, userRouter);

/* --------------------------- AUTH ---------------------------- */
const authRouter = Router();
authRouter.post(Paths.Auth.GenerateToken, AuthRoutes.generateToken);
apiRouter.use(Paths.Auth.Base, authRouter);

/* --------------------------- CHATS --------------------------- */
const chatRouter = Router();

chatRouter.get(Paths.Chats.Get, ChatRoutes.getAll);
chatRouter.get('/', ChatRoutes.getFiltered);
chatRouter.get(Paths.Chats.GetOne, ChatRoutes.getOne);

chatRouter.post(Paths.Chats.Add, authenticateToken, ChatRoutes.add);
chatRouter.put(Paths.Chats.Update, authenticateToken, ChatRoutes.update);
chatRouter.delete(Paths.Chats.Delete, authenticateToken, ChatRoutes.delete);

apiRouter.use(Paths.Chats.Base, chatRouter);

export default apiRouter;
