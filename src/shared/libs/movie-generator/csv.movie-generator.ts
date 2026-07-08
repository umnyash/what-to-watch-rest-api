import { MOVIE_RATING_FRACTION_DIGITS, MovieRating } from '../../constants/index.js';
import { MockServerData } from '../../types/index.js';
import { generateRandomNumber, getRandomItem, getRandomItems } from '../../utils/index.js';
import { MovieGenerator } from './movie-generator.interface.js';

const ACTORS_COUNT = 3;
const ASSETS_COUNT = 10;

const Duration = {
  Min: 15,
  Max: 240,
} as const;

const RatingsCount = {
  Min: 1,
  Max: 1000,
} as const;

const ReleaseYear = {
  Min: 1980,
  Max: 2026,
} as const;

export class CSVMovieGenerator implements MovieGenerator {
  constructor(private readonly mockData: MockServerData) { }

  public generate(): string {
    const { titles, genres, descriptions, names } = this.mockData;

    const title = getRandomItem(titles);
    const description = getRandomItem(descriptions);
    const releaseYear = generateRandomNumber(ReleaseYear.Min, ReleaseYear.Max);
    const genre = getRandomItem(genres);
    const rating = generateRandomNumber(MovieRating.Min, MovieRating.Max, MOVIE_RATING_FRACTION_DIGITS);
    const ratingsCount = generateRandomNumber(RatingsCount.Min, RatingsCount.Max);
    const durationMinutes = generateRandomNumber(Duration.Min, Duration.Max);
    const posterUrl = `poster-${String(generateRandomNumber(0, ASSETS_COUNT))}.jpg`;
    const backgroundImageUrl = `background-${String(generateRandomNumber(0, ASSETS_COUNT))}.jpg`;
    const videoUrl = `video-${String(generateRandomNumber(0, title.length))}.mp4`;
    const director = getRandomItem(names);
    const actors = getRandomItems(names, ACTORS_COUNT).join(';');
    const previewImageUrl = `preview-${String(generateRandomNumber(0, ASSETS_COUNT))}.jpg`;
    const previewVideoUrl = `preview-${String(generateRandomNumber(0, ASSETS_COUNT))}.mp4`;

    return [
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
    ].map((value) => typeof value === 'string' ? this.escapeString(value) : value)
      .join(',')
  }

  private escapeString(value: string) {
    const escapedString = value.replaceAll('"', '""');

    return /[",]/.test(value)
      ? `"${escapedString}"`
      : escapedString;
  }
}
