export const MAX_PERSON_NAME_LENGTH = 100;
export const MAX_MOVIE_TITLE_LENGTH = 200;
export const MIN_MOVIE_RATINGS_COUNT = 0;
export const MIN_MOVIE_RELEASE_YEAR = 1888;
export const MOVIE_RATING_FRACTION_DIGITS = 1;
export const NO_MOVIE_RATING = 0;

export const MovieDescriptionLength = {
  Min: 20,
  Max: 2000,
} as const;

export const MovieDurationMinutes = {
  Min: 1,
  Max: 1000,
}

export const MovieRating = {
  Min: 1,
  Max: 10,
} as const;
