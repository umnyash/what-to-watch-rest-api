import { CreateGenreDto } from './dto/create-genre.dto.js';
import { GenreDocument } from './genre.model.js';

export interface GenreService {
  create(dto: CreateGenreDto): Promise<GenreDocument>;
  findById(id: string): Promise<GenreDocument | null>;
  findByName(name: string): Promise<GenreDocument | null>;
  findOrCreate(dto: CreateGenreDto): Promise<GenreDocument>;
}
