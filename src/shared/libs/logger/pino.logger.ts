import { pino } from 'pino';

import { Logger } from './logger.interface.js';

export class PinoLogger implements Logger {
  private readonly logger = pino({ level: 'debug' });

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }

  public error(error: Error, message: string, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }
}
