type ParsedCommand = {
  name: string;
  arguments: string[];
}

export class CommandParser {
  static parse(cliArguments: string[]): ParsedCommand {
    let commandName = '';
    const commandArguments: string[] = [];

    for (const argument of cliArguments) {
      if (argument.startsWith('--')) {
        if (commandName) {
          break;
        }

        commandName = argument;
      } else if (commandName && argument) {
        commandArguments.push(argument);
      }
    };

    return {
      name: commandName,
      arguments: commandArguments,
    }
  }
}
