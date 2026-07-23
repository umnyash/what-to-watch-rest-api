import { Movie } from '../../shared/types/index.js';
import { CommandName } from './command-name.enum.js';
import { Command } from './command.interface.js';
import { CSVFileReader, FileReaderEventName, mapMovieRow } from '../../shared/libs/file-reader/index.js';
import { getErrorMessage } from '../../shared/utils/index.js';
import { cliStyles } from '../cli.styles.js';

import { DatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { GenreModel, GenreService, DefaultGenreService } from '../../shared/modules/genre/index.js';
import { Logger, ConsoleLogger } from '../../shared/libs/logger/index.js';
import { MovieModel, MovieService, DefaultMovieService } from '../../shared/modules/movie/index.js';

export class ImportCommand implements Command {
  private databaseClient: DatabaseClient;
  private genreService: GenreService;
  private movieService: MovieService;

  constructor() {
    const logger: Logger = new ConsoleLogger();
    this.databaseClient = new MongoDatabaseClient(logger);
    this.genreService = new DefaultGenreService(logger, GenreModel);
    this.movieService = new DefaultMovieService(logger, MovieModel);
  }

  public getName(): CommandName {
    return CommandName.Import;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [fileName, mongoUri] = parameters;
    // mongo uri format: mongodb://userName:password@host:port/databaseName?authSource=admin

    await this.databaseClient.connect(mongoUri);

    try {
      const fileReader = new CSVFileReader<Movie>(fileName.trim(), mapMovieRow);

      fileReader.addListener(FileReaderEventName.Line, (movie: Movie, resolve: () => void) => {
        void this.onLineRead(movie, resolve);
      });

      fileReader.addListener(FileReaderEventName.End, (count: number) => {
        void this.onReadingEnd(count);
      });

      await fileReader.read();
    } catch (err: unknown) {
      console.error(cliStyles.error(`Can't import data from file: ${fileName}`));
      console.error(cliStyles.error(getErrorMessage(err)));
    }
  }

  private async saveMovie(movie: Movie): Promise<void> {
    const genre = await this.genreService.findOrCreate({
      name: movie.genre,
    });

    await this.movieService.create({
      title: movie.title,
      description: movie.description,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      genreId: String(genre.id),
      ratingsCount: movie.ratingsCount,
      durationMinutes: movie.durationMinutes,
      posterUrl: movie.posterUrl,
      backgroundImageUrl: movie.backgroundImageUrl,
      videoUrl: movie.videoUrl,
      director: movie.director,
      actors: movie.actors,
      preview: movie.preview,
    });
  }

  private async onLineRead(movie: Movie, resolve: () => void): Promise<void> {
    await this.saveMovie(movie);
    resolve();
  }

  private async onReadingEnd(count: number): Promise<void> {
    console.info(cliStyles.success(`${String(count)} rows imported.`));
    await this.databaseClient.disconnect();
  }
}
