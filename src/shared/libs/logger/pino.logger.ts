import { injectable } from 'inversify';
import { pino, transport } from 'pino';
import { resolve } from 'node:path';

import { Logger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../utils/index.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger = pino({ level: 'debug' }, transport({
    targets: [
      {
        target: 'pino/file',
        level: 'debug',
        options: {
          destination: resolve(getCurrentModuleDirectoryPath(), '../../../logs/rest.log'),
        },
      },
      {
        target: 'pino/file',
        level: 'info',
        options: {},
      },
    ],
  }));

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
