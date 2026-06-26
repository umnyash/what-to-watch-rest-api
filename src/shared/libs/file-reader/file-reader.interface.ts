export interface FileReader<T> {
  read(): void;
  parse(): T[];
}
