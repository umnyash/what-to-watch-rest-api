import EventEmitter from 'node:events';
import { createReadStream } from 'node:fs';

import { FileReaderEventName } from './file-reader-event-name.enum.js';
import { FileReader } from './file-reader.interface.js';
import { Mapper } from './mappers/mapper.interface.js';
import { CSVParser } from './csv.parser.js';

export class CSVFileReader<T> extends EventEmitter implements FileReader {
  private readonly CHUNK_SIZE = 16384; // 16KB

  constructor(
    private readonly fileName: string,
    private readonly mapper: Mapper<T>,
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.fileName, {
      highWaterMark: this.CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let remainingData = '';
    let importedRowsCount = 0;

    for await (const chunk of readStream as AsyncIterable<string>) {
      remainingData += chunk.toString();

      for (let lineSeparatorIndex = remainingData.indexOf('\n'); lineSeparatorIndex >= 0; lineSeparatorIndex = remainingData.indexOf('\n')) {
        const completeRow = remainingData.slice(0, lineSeparatorIndex);
        remainingData = remainingData.slice(lineSeparatorIndex + 1);
        importedRowsCount++;

        const record = this.mapper.map(CSVParser.parseRow(completeRow));
        this.emit(FileReaderEventName.Line, record);
      }
    }

    this.emit(FileReaderEventName.End, importedRowsCount);
  }
}
