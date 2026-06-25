import { CommandName } from './command-name.enum.js';

export interface Command {
  getName(): CommandName;
  execute(...parameters: string[]): Promise<void>;
}
