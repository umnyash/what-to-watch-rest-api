import chalk from 'chalk';

export const cliStyles = {
  accent: chalk.yellow,
  commandArguments: chalk.cyan,
  commandName: chalk.blue,
  error: chalk.redBright,
  heading: chalk.magenta,
  success: chalk.greenBright,
} as const;
