import { Container } from 'inversify';
import { Model } from 'mongoose';

import { Component } from '../../types/index.js';
import { DefaultMovieService } from './default-movie.service.js';
import { MovieDocument, MovieModel } from './movie.model.js';
import { MovieService } from './movie-service.interface.js';

export function createMovieContainer() {
  const container = new Container();

  container.bind<Model<MovieDocument>>(Component.MovieModel).toConstantValue(MovieModel);
  container.bind<MovieService>(Component.MovieService).to(DefaultMovieService).inSingletonScope();

  return container;
}
