import { inject, injectable } from 'inversify';
import { Model } from 'mongoose';

import { Component } from '../../types/index.js';
import { CreateGenreDto } from './dto/create-genre.dto.js';
import { GenreDocument } from './genre.model.js';
import { GenreService } from './genre-service.interface.js';
import { Logger } from '../../libs/logger/index.js';

@injectable()
export class DefaultGenreService implements GenreService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.GenreModel) private readonly genreModel: Model<GenreDocument>,
  ) { }

  public async create(dto: CreateGenreDto): Promise<GenreDocument> {
    const createdGenre = await this.genreModel.create(dto);
    this.logger.info(`Genre created: ${createdGenre.name}`);
    return createdGenre;
  }

  public async findById(id: string): Promise<GenreDocument | null> {
    return this.genreModel.findById(id);
  }

  public async findByName(name: string): Promise<GenreDocument | null> {
    return this.genreModel.findOne({ name });
  }

  public async findOrCreate(dto: CreateGenreDto): Promise<GenreDocument> {
    const existingGenre = await this.findByName(dto.name);
    return existingGenre ?? this.create(dto);
  }
}
