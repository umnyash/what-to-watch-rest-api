import { Config } from './config.interface.js';

export class RestConfig implements Config {
  constructor(
    private readonly env: NodeJS.ProcessEnv,
  ) { }

  public get(key: string): string | undefined {
    return this.env[key];
  }
}
