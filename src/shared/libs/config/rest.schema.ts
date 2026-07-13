export type RestSchema = {
  PORT: number;
}

export const restConfigSchema = {
  PORT: {
    doc: 'HTTP server port',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
};
