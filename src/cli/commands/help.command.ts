import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { cliStyles } from '../cli.styles.js';

export class HelpCommand implements Command {
  public getName(): CommandName {
    return CommandName.Help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
        ${cliStyles.heading('Программа для подготовки данных для REST API сервера')}

        Использование:
            ${cliStyles.accent('cli.js')} <${cliStyles.commandName('command')}> [${cliStyles.commandArguments('arguments')}]

        Команды:
            ${cliStyles.commandName(CommandName.Version)}:                     # выводит номер версии
            ${cliStyles.commandName(CommandName.Help)}:                        # выводит этот текст
            ${cliStyles.commandName(CommandName.Import)} <${cliStyles.commandArguments('path')}>:               # импортирует данные из TSV
            ${cliStyles.commandName(CommandName.Generate)} <${cliStyles.commandArguments('n')}> <${cliStyles.commandArguments('path')}> <${cliStyles.commandArguments('url')}>:   # генерирует заданное количество тестовых данных
    `);
  }
}
