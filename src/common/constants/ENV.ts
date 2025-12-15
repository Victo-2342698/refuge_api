import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from '.';

const ENV = jetEnv({
  NODE_ENV: isEnumVal(NodeEnvs),
  PORT: num,
  MONGODB: str,
  JWTSECRET: str,
});

export default ENV;
