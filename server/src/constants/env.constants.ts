const PORT = 'PORT';
const NODE_ENV = 'NODE_ENV';

const DOMAIN = 'DOMAIN';
const ORIGIN = 'ORIGIN';

const JWT_SECRET = 'JWT_SECRET';
const JWT_EXP = 'JWT_EXP';

enum EnumNodeEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
}

export { DOMAIN, EnumNodeEnv, JWT_EXP, JWT_SECRET, NODE_ENV, ORIGIN, PORT };
