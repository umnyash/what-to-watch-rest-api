import { Container } from 'inversify';
import { Model } from 'mongoose';

import { Component } from '../../types/index.js';
import { MovieDocument, MovieModel } from './movie.model.js';

export function createMovieContainer() {
  const container = new Container();

  container.bind<Model<MovieDocument>>(Component.MovieModel).toConstantValue(MovieModel);

  return container;
}
