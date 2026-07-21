export type RestSchema = {
  PORT: number;
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
}

export const restConfigSchema = {
  PORT: {
    doc: 'HTTP server port',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  DB_HOST: {
    doc: 'MongoDB server IP address',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1',
  },
  DB_PORT: {
    doc: 'MongoDB server port',
    format: 'port',
    env: 'DB_PORT',
    default: 27017,
  },
  DB_NAME: {
    doc: 'MongoDB database name',
    format: String,
    env: 'DB_NAME',
    default: 'what-to-watch',
  },
  DB_USERNAME: {
    doc: 'MongoDB authentication username',
    format: String,
    env: 'DB_USERNAME',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'MongoDB authentication password',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
};
