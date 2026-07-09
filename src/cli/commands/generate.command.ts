import { MockServerData } from '../../shared/types/index.js';
import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { getErrorMessage, parseInteger } from '../../shared/utils/index.js';
import { CSVMovieGenerator } from '../../shared/libs/movie-generator/index.js';
import { CSVFileWriter } from '../../shared/libs/file-writer/index.js';
import { cliStyles } from '../cli.styles.js';

function isMockServerData(data: unknown): data is MockServerData {
  const expectedKeys = ['titles', 'genres', 'descriptions', 'names'];

  if (typeof data !== 'object' || Array.isArray(data) || data === null) {
    return false;
  }

  const object = data as Record<string, unknown>;

  for (const key of expectedKeys) {
    if (
      !Object.hasOwn(object, key) ||
      !Array.isArray(object[key]) ||
      !object[key].every((item) => typeof item === 'string')
    ) {
      return false;
    }
  }

  return true;
}

export class GenerateCommand implements Command {
  private basicData: MockServerData;

  public getName(): CommandName {
    return CommandName.Generate;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filePath, url] = parameters;
    const moviesCount = parseInteger(count);

    try {
      await this.loadBasicData(url);
      await this.write(filePath, moviesCount);
      console.info(cliStyles.success(`File ${filePath} was created!`));
    } catch (err: unknown) {
      console.error(cliStyles.error('Can\'t generate data.'));
      console.error(cliStyles.error(getErrorMessage(err)));
    }
  }

  private async loadBasicData(url: string) {
    let data: unknown;

    try {
      const response = await fetch(url);
      data = await response.json();
    } catch {
      throw new Error(cliStyles.error(`Can't load data from ${url}`));
    }

    if (!isMockServerData(data)) {
      throw new Error(cliStyles.error('Invalid data from server'));
    }

    this.basicData = data;
  }

  private async write(filePath: string, moviesCount: number) {
    const csvMovieGenerator = new CSVMovieGenerator(this.basicData);
    const csvFileWriter = new CSVFileWriter(filePath);

    for (let i = 0; i < moviesCount; i++) {
      await csvFileWriter.write(csvMovieGenerator.generate());
    }
  }
}
