type MongoConnectionConfig = {
  host: string,
  port: number,
  databaseName: string,
  userName: string,
  password: string,
}

export function buildMongoURI(config: MongoConnectionConfig): string {
  const { userName, password, host, port, databaseName } = config;
  return `mongodb://${userName}:${password}@${host}:${String(port)}/${databaseName}?authSource=admin`;
}
