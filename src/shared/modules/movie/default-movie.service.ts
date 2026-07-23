import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

import { Component } from '../../types/index.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { Logger } from '../../libs/logger/index.js';
import { MovieDocument } from './movie.model.js';
import { MovieService } from './movie-service.interface.js';

@injectable()
export class DefaultMovieService implements MovieService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.MovieModel) private readonly movieModel: Model<MovieDocument>,
  ) { }

  public async create(dto: CreateMovieDto): Promise<MovieDocument> {
    const createdMovie = await this.movieModel.create(dto);
    this.logger.info(`Movie created: ${createdMovie.title}`);
    return createdMovie;
  }

  public async findById(id: string): Promise<MovieDocument | null> {
    return this.movieModel.findById(id);
  }
}
