export const CommandName = {} as const;

export type CommandName = typeof CommandName[keyof typeof CommandName];
