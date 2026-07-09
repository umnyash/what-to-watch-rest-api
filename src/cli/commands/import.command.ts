import { Movie } from '../../shared/types/index.js';
import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { CSVFileReader, FileReaderEventName, mapMovieRow } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage } from '../../shared/utils/index.js';

export class ImportCommand implements Command {
  public getName(): CommandName {
    return CommandName.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName] = parameters;

    try {
      const fileReader = new CSVFileReader<Movie>(fileName.trim(), mapMovieRow);
      fileReader.addListener(FileReaderEventName.Line, this.onLineRead.bind(this));
      fileReader.addListener(FileReaderEventName.End, this.onReadingEnd.bind(this));
      await fileReader.read();
    } catch (err: unknown) {
      console.error(`Can't import data from file: ${fileName}`);
      console.error(getErrorMessage(err));
    }
  }

  private onLineRead(movie: Movie): void {
    console.info(movie);
  }

  private onReadingEnd(count: number): void {
    console.info(`${String(count)} rows imported.`);
  }
}
