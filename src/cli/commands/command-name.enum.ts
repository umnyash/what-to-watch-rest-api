export const CommandName = {
  Help: '--help',
  Version: '--version',
} as const;

export type CommandName = typeof CommandName[keyof typeof CommandName];
