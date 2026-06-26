import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';

export class HelpCommand implements Command {
  public getName(): CommandName {
    return CommandName.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        Программа для подготовки данных для REST API сервера

        Использование:
            cli.js <command> [arguments]

        Команды:
            ${CommandName.Help}:                        # выводит этот текст
    `);
  }
}
