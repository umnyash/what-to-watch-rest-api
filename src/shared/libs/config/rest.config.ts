import { inject, injectable } from 'inversify';
import { config as loadEnv } from 'dotenv';
import convict from 'convict';

import { Component } from '../../types/index.js';
import { Config } from './config.interface.js';
import { Logger } from '../logger/index.js';
import { RestSchema, restConfigSchema } from './rest.schema.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly values: RestSchema;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    const { error } = loadEnv();

    if (error) {
      throw new Error('Unable to load the .env file. Ensure that it exists and is readable.');
    }

    const config = convict<RestSchema>(restConfigSchema);

    config.validate({
      allowed: 'strict',
      output: this.logger.info.bind(this.logger),
    });

    this.values = config.getProperties();
    this.logger.info('.env file parsed successfully.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.values[key];
  }
}
