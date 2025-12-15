import '../config';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express, { Request, Response, NextFunction } from 'express';
import logger from 'jet-logger';

import BaseRouter from '@src/routes';

import Paths from '@src/common/constants/Paths';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { RouteError } from '@src/common/util/route-errors';
import { NodeEnvs } from '@src/common/constants';

const app = express();

/******************************************************************************
 * Middleware
 ******************************************************************************/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

if (ENV.NodeEnv === NodeEnvs.Production) {
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

/******************************************************************************
 * API HOME — DOCUMENTATION (OBLIGATOIRE POUR LE PROF)
 ******************************************************************************/

app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'Refuge API',
    version: '1.0.0',
    description: 'API REST pour la gestion des chats du refuge',
    authentication: 'JWT (Bearer token requis pour certaines routes)',
    basePath: '/api',
    routes: [
      {
        method: 'GET',
        path: '/api/chats',
        description: 'Retourne la liste complète des chats',
      },
      {
        method: 'GET',
        path: '/api/chats/:id',
        description: 'Retourne un chat par son identifiant',
      },
      {
        method: 'GET',
        path: '/api/chats?race=&tauxEnergie=',
        description: 'Retourne les chats filtrés (ex: race, taux d’énergie)',
      },
      {
        method: 'POST',
        path: '/api/chats/add',
        description: 'Ajoute un nouveau chat (authentification requise)',
      },
      {
        method: 'PUT',
        path: '/api/chats/:id',
        description: 'Modifie un chat existant (authentification requise)',
      },
      {
        method: 'DELETE',
        path: '/api/chats/:id',
        description: 'Supprime un chat (authentification requise)',
      },
      {
        method: 'POST',
        path: '/api/auth/login',
        description: 'Authentifie un utilisateur et retourne un token JWT',
      },
    ],
  });
});

/******************************************************************************
 * Routes API
 ******************************************************************************/

app.use(Paths.Base, BaseRouter);

app.get('/api-docs', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

/******************************************************************************
 * Gestion des erreurs
 ******************************************************************************/

app.use((err: Error, _: Request, res: Response, _next: NextFunction) => {
  if (ENV.NodeEnv !== NodeEnvs.Test.valueOf()) {
    logger.err(err, true);
  }

  let status = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Erreur serveur interne';

  if (err instanceof RouteError) {
    status = err.status;
    message = err.message;
  } else if (err.name === 'ValidationError') {
    status = HttpStatusCodes.BAD_REQUEST;
    const firstError = Object.values((err as any).errors)[0] as any;
    message = firstError.message;
  }

  return res.status(status).json({
    error: message,
  });
});

/******************************************************************************
 * Export
 ******************************************************************************/

export default app;
