import { RouteError } from '@src/common/util/route-errors';
import HttpStatusCodes from '@src/common/constants/HttpStatusCodes';
import { IChatMongo } from '@src/models/Chat';

export function validateChat(chat: Partial<IChatMongo>) {
  const requiredFields: (keyof IChatMongo)[] = [
    'nom',
    'race',
    'numeroDossier',
    'dateNaissance',
    'tauxEnergie',
    'sociabiliteHumain',
    'compatEnfants',
    'compatChiens',
    'compatChats',
    'description',
    'micropuce',
    'sterilise',
    'vaccinsBase',
  ];

  for (const field of requiredFields) {
    if (chat[field] === undefined) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        `Le champ "${field}" est requis.`,
      );
    }
  }

  // Validation personnalisée #1 : notes entre 1 et 5
  const scores = [
    chat.tauxEnergie,
    chat.sociabiliteHumain,
    chat.compatEnfants,
    chat.compatChiens,
    chat.compatChats,
  ];

  for (const score of scores) {
    if (score! < 1 || score! > 5) {
      throw new RouteError(
        HttpStatusCodes.BAD_REQUEST,
        'Les valeurs de compatibilité doivent être entre 1 et 5.',
      );
    }
  }

  // Validation personnalisée #2 : description minimale
  if (chat.description && chat.description.length < 10) {
    throw new RouteError(
      HttpStatusCodes.BAD_REQUEST,
      'La description doit contenir au moins 10 caractères.',
    );
  }
}
