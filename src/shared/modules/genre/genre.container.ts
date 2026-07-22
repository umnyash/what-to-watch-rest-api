import { Container } from 'inversify';
import { Model } from 'mongoose';

import { Component } from '../../types/index.js';
import { DefaultGenreService } from './default-genre.service.js';
import { GenreDocument, GenreModel } from './genre.model.js';
import { GenreService } from './genre-service.interface.js';

export function createGenreContainer() {
  const container = new Container();

  container.bind<Model<GenreDocument>>(Component.GenreModel).toConstantValue(GenreModel);
  container.bind<GenreService>(Component.GenreService).to(DefaultGenreService).inSingletonScope();

  return container;
}
