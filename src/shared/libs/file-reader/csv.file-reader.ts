import { readFileSync } from 'node:fs';

import { FileReader } from './file-reader.interface.js';
import { Mapper } from './mappers/mapper.interface.js';
import { CSVParser } from './csv.parser.js';

export class CSVFileReader<T> implements FileReader<T> {
  private rawData = '';

  constructor(
    private readonly fileName: string,
    private readonly mapper: Mapper<T>,
  ) { }

  public read(): void {
    this.rawData = readFileSync(this.fileName, { encoding: 'utf-8' });
  }

  public parse(): T[] {
    this.checkRawData();
    const parsedData = CSVParser.parse(this.rawData);
    return this.mapper.map(parsedData);
  }

  private checkRawData(): void {
    if (!this.rawData) {
      throw new Error('File was not read.');
    }
  }
}
