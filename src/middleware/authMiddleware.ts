import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { RouteError } from '@src/common/util/route-errors';
import ENV from '@src/common/constants/ENV';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  if (req.originalUrl.startsWith('/api/auth')) {
    return next();
  }

  if (req.method === 'GET') {
    return next();
  }

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(
      new RouteError(
        HttpStatusCodes.UNAUTHORIZED,
        "Accès refusé. Jeton d'authentification manquant.",
      ),
    );
  }

  const jwtsecret = ENV.Jwtsecret;

  if (!jwtsecret) {
    return next(
      new RouteError(
        HttpStatusCodes.INTERNAL_SERVER_ERROR,
        'Erreur serveur : JWT_SECRET manquant.',
      ),
    );
  }

  jwt.verify(token, jwtsecret, (err, decoded) => {
    if (err) {
      return next(
        new RouteError(
          HttpStatusCodes.FORBIDDEN,
          "Jeton d'authentification invalide ou expiré.",
        ),
      );
    }

    req.user = decoded;
    next();
  });
};

export default authenticateToken;
