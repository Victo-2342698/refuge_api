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
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

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
 * Swagger UI (documentation API)
 ******************************************************************************/

const swaggerDocument = YAML.load(path.join(__dirname, 'api.yaml'));

app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (_req: Request, res: Response) => {
  res.redirect('/apiDocs');
});

/******************************************************************************
 * Routes API
 ******************************************************************************/

app.use(Paths.Base, BaseRouter);

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
