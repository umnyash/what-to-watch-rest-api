import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { setTimeout } from 'node:timers/promises';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private readonly retriesCount = 5;
  private readonly baseRetryDelay = 1000;
  private mongoose: typeof Mongoose;
  private isConnected = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) { }

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      this.logger.warn('MongoDB client is already connected.');
      return;
    }

    this.logger.info('Connecting to MongoDB…');

    for (let attemptNumber = 1; attemptNumber <= this.retriesCount; attemptNumber++) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('MongoDB connected.');
        return;
      } catch (err: unknown) {
        this.logger.error(err as Error, `MongoDB connection attempt ${String(attemptNumber)} failed.`);

        if (attemptNumber < this.retriesCount) {
          const retryDelay = attemptNumber * this.baseRetryDelay;
          this.logger.info(`Retrying MongoDB connection in ${String(retryDelay)} ms…`);
          await setTimeout(retryDelay);
        }
      }
    }

    throw new Error(`MongoDB connection failed after ${String(this.retriesCount)} attempts.`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnected) {
      this.logger.warn('MongoDB client is not connected.');
      return;
    }

    await this.mongoose.disconnect();
    this.isConnected = false;
    this.logger.info('MongoDB disconnected.');
  }
}
