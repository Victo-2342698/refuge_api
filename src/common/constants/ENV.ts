import jetEnv, { num, str } from 'jet-env';
import { isEnumVal } from 'jet-validators';
import { NodeEnvs } from '.';

console.log('Node:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT);
console.log('Mongo:', process.env.MONGODB);
console.log('JWT:', process.env.JWTSECRET);

const ENV = jetEnv({
  NodeEnv: isEnumVal(NodeEnvs),
  Port: num,
  Mongodb: str,
  Jwtsecret: str,
});

export default ENV;
