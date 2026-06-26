import { Movie } from '../../../types/index.js';
import { Mapper } from './mapper.interface.js';
import { parseInteger } from '../../../utils/index.js';

export class MoviesMapper implements Mapper<Movie> {
  public map(data: string[][]): Movie[] {
    return data.map(this.mapItem.bind(this));
  }

  private mapItem(values: string[]): Movie {
    const [
      title,
      description,
      releaseYear,
      genre,
      rating,
      ratingsCount,
      durationMinutes,
      posterUrl,
      backgroundImageUrl,
      videoUrl,
      director,
      actors,
      previewImageUrl,
      previewVideoUrl,
    ] = values;

    return {
      title,
      description,
      releaseYear: parseInteger(releaseYear),
      genre,
      rating: parseFloat(rating),
      ratingsCount: parseInteger(ratingsCount),
      durationMinutes: parseInteger(durationMinutes),
      posterUrl,
      backgroundImageUrl,
      videoUrl,
      director,
      actors: actors.split(';'),
      preview: {
        imageUrl: previewImageUrl,
        videoUrl: previewVideoUrl,
      },
    };
  }
}
