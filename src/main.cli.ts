#!/usr/bin/env node
import { readdir } from 'node:fs/promises';

import { Command } from './cli/commands/command.interface.js';
import { CLIApplication } from './cli/index.js';

async function loadCommands(): Promise<Command[]> {
  const commandsDirUrl = new URL('./cli/commands/', import.meta.url);
  const commandFileNamePattern = /\.command\.(ts|js)$/;
  const fileNames = await readdir(commandsDirUrl);
  const commands: Command[] = [];

  for (const fileName of fileNames) {
    if (!commandFileNamePattern.test(fileName)) {
      continue;
    }

    const moduleUrl = new URL(fileName, commandsDirUrl);
    const module = await import(moduleUrl.href) as Record<string, new () => Command>;
    const [CommandClass] = Object.values(module);
    commands.push(new CommandClass())
  }

  return commands;
}

async function bootstrap() {
  const cliApplication = new CLIApplication();
  const commands = await loadCommands();
  cliApplication.registerCommands(commands);
  await cliApplication.processCommand(process.argv);
}

await bootstrap();
