export const CommandName = {
  Generate: '--generate',
  Help: '--help',
  Import: '--import',
  Version: '--version',
} as const;

export type CommandName = typeof CommandName[keyof typeof CommandName];
