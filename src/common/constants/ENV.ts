import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from '.';

/******************************************************************************
                                 Setup
******************************************************************************/

const ENV = jetEnv({
  NODE_ENV: isEnumVal(NodeEnvs),
  PORT: num,
  MONGODB: str,
  JWTSECRET: str,
});

/******************************************************************************
                            Export default
******************************************************************************/

export default ENV;
