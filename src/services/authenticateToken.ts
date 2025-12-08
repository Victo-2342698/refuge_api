import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import ENV from '@src/common/constants/ENV';

/**
 * Intergiciel pour authentifier le jeton de l'utilisateur
 */
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const url = req.originalUrl;

  // --- ROUTES NON PROTÉGÉES ---
  if (
    url.includes('/auth/generatetoken') ||
    url.includes('/users/add') ||
    url.includes('/users/all')
  ) {
    return next();
  }

  // --- VÉRIFICATION DU TOKEN ---
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // format "Bearer xxx"

  if (!token) {
    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ error: 'Token requis' });
  }

  jwt.verify(token, ENV.Jwtsecret as string, (err) => {
    if (err) {
      return res
        .status(HttpStatusCodes.FORBIDDEN)
        .json({ error: 'Token invalide' });
    }

    next();
  });
}

export default authenticateToken;
