import { CreateMovieDto } from './dto/create-movie.dto.js';
import { MovieDocument } from './movie.model.js';

export interface MovieService {
  create(dto: CreateMovieDto): Promise<MovieDocument>;
  findById(id: string): Promise<MovieDocument | null>;
}
