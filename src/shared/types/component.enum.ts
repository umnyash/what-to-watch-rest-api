export const Component = {
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  GenreModel: Symbol.for('GenreModel'),
  GenreService: Symbol.for('GenreService'),
  Logger: Symbol.for('Logger'),
  MovieModel: Symbol.for('MovieModel'),
  MovieService: Symbol.for('MovieService'),
  RestApplication: Symbol.for('RestApplication'),
} as const;
