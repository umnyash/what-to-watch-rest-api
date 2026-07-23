import 'reflect-metadata';
import { Container } from 'inversify';

import { Component } from './shared/types/index.js';
import { createGenreContainer } from './shared/modules/genre/index.js';
import { createMovieContainer } from './shared/modules/movie/index.js';
import { createRestApplicationContainer } from './rest/index.js';
import { RestApplication } from './rest/index.js';

async function bootstrap() {
  const appContainer = Container.merge(
    createGenreContainer(),
    createMovieContainer(),
    createRestApplicationContainer(),
  );

  const application = appContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

await bootstrap();
