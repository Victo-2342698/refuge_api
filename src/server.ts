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

// Par défaut
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Log en dev
if (ENV.NodeEnv === NodeEnvs.Dev) {
  app.use(morgan('dev'));
}

// Sécurité en production
if (ENV.NodeEnv === NodeEnvs.Production) {
  if (!process.env.DISABLE_HELMET) {
    app.use(helmet());
  }
}

/******************************************************************************
 * API
 ******************************************************************************/

// ❌ IMPORTANT : AUCUN authenticateToken ici
// Les protections sont gérées dans src/routes/index.ts

app.use(Paths.Base, BaseRouter);

/******************************************************************************
 * Gestion des erreurs
 ******************************************************************************/

app.use((err: Error, _: Request, res: Response, next: NextFunction) => {
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
 * Documentation API
 ******************************************************************************/

app.get('/api-docs/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Page d’accueil
app.get('/', (req: Request, res: Response) => {
  res.redirect('/api-docs');
});

/******************************************************************************
 * Export
 ******************************************************************************/

export default app;
