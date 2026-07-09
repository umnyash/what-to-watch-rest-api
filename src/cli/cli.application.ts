import { CommandName } from './commands/command-name.enum.js';
import { Command } from './commands/command.interface.js';
import { CommandParser } from './command.parser.js';
import { cliStyles } from './cli.styles.js';

type CommandCollection = Record<CommandName, Command>;

function isCommandName(name: string): name is CommandName {
  return Object.values(CommandName).includes(name as CommandName);
}

export class CLIApplication {
  private commands: Partial<CommandCollection> = {};

  constructor(
    private readonly defaultCommandName = CommandName.Help,
  ) { }

  public registerCommands(commandList: Command[]): void {
    commandList.forEach((command) => {
      if (this.commands[command.getName()]) {
        throw new Error(cliStyles.error(`Command ${command.getName()} is already registered.`));
      }

      this.commands[command.getName()] = command;
    });
  }

  public async processCommand(argv: string[]): Promise<void> {
    const parsedCommand = CommandParser.parse(argv);
    const command = this.getCommand(parsedCommand.name);
    await command.execute(...parsedCommand.arguments);
  }

  private getCommand(commandName: string): Command {
    if (!isCommandName(commandName)) {
      console.error(cliStyles.error(`Неизвестная команда: "${commandName}".`));
      return this.getDefaultCommand();
    }

    const command = this.commands[commandName];

    if (!command) {
      throw new Error(cliStyles.error(`Command "${commandName}" is not registered.`));
    }

    return command;
  }

  private getDefaultCommand(): Command {
    const command = this.commands[this.defaultCommandName];

    if (!command) {
      throw new Error(cliStyles.error(`Default command ("${this.defaultCommandName}") is not registered.`));
    }

    return command;
  }
}
