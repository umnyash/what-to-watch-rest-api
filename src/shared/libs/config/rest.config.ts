import { config } from 'dotenv';

import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';

export class RestConfig implements Config {
  private readonly values: NodeJS.ProcessEnv;

  constructor(
    private readonly logger: Logger,
  ) {
    const { error, parsed } = config();

    if (error) {
      throw new Error('Unable to load the .env file. Ensure that it exists and is readable.');
    }

    if (!parsed) {
      throw new Error('Failed to parse the .env file.');
    }

    this.values = parsed;
    this.logger.info('.env file parsed successfully.');
  }

  public get(key: string): string | undefined {
    return this.values[key];
  }
}
