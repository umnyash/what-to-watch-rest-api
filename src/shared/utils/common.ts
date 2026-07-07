export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function parseInteger(string: string): number {
  return Number.parseInt(string, 10);
}
