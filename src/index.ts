import logger from 'jet-logger';
import { connect } from 'mongoose';

import ENV from '@src/common/constants/ENV';
import server from './server';

/******************************************************************************
 * Constants
 ******************************************************************************/

const SERVER_START_MSG =
  'Express server started on port: ' + ENV.PORT.toString();

/******************************************************************************
 * Run
 ******************************************************************************/

// Connexion MongoDB + démarrage du serveur
console.log('stp fonctionne');
console.log(ENV.MONGODB);
console.log('stp fonctionne');

connect(ENV.MONGODB)
  .then(() => {
    server.listen(ENV.PORT, () => {
      logger.info(SERVER_START_MSG);
    });
  })
  .catch((err) => {
    logger.err('Erreur de connexion MongoDB : ' + err);
  });
