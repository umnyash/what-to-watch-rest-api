export const CommandName = {
  Help: '--help',
} as const;

export type CommandName = typeof CommandName[keyof typeof CommandName];
