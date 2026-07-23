import { Document, Schema, model } from 'mongoose';

import {
  MAX_PERSON_NAME_LENGTH,
  MAX_MOVIE_TITLE_LENGTH,
  MIN_MOVIE_RATINGS_COUNT,
  MIN_MOVIE_RELEASE_YEAR,
  NO_MOVIE_RATING,
  MovieDescriptionLength,
  MovieDurationMinutes,
  MovieRating,
} from '../../constants/index.js';

import { Movie } from '../../types/index.js';
import { GenreModel } from '../genre/index.js';

type MovieDb = Omit<Movie, 'genre'> & {
  genreId: string;
};

export interface MovieDocument extends Document, MovieDb {
  createdAt: Date,
  updatedAt: Date,
};

const previewSchema = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
});

const movieSchema = new Schema({
  title: {
    type: String,
    maxLength: MAX_MOVIE_TITLE_LENGTH,
    required: true,
  },
  description: {
    type: String,
    minLength: MovieDescriptionLength.Min,
    maxLength: MovieDescriptionLength.Max,
    required: true,
  },
  releaseYear: {
    type: Number,
    required: true,
    min: MIN_MOVIE_RELEASE_YEAR,
  },
  genreId: {
    type: Schema.Types.ObjectId,
    ref: GenreModel.name,
    required: true,
  },
  rating: {
    type: Number,
    min: NO_MOVIE_RATING,
    max: MovieRating.Max,
    default: NO_MOVIE_RATING,
  },
  ratingsCount: {
    type: Number,
    min: MIN_MOVIE_RATINGS_COUNT,
    default: MIN_MOVIE_RATINGS_COUNT,
  },
  durationMinutes: {
    type: Number,
    min: MovieDurationMinutes.Min,
    max: MovieDurationMinutes.Max,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  backgroundImageUrl: {
    type: String,
    required: true,
  },
  videoUrl: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    maxLength: MAX_PERSON_NAME_LENGTH,
    required: true,
  },
  actors: {
    type: [{
      type: String,
      maxLength: MAX_PERSON_NAME_LENGTH,
    }],
    required: true,
  },
  preview: {
    type: previewSchema,
    required: true,
    _id: false,
  },
}, { collection: 'movies', timestamps: true });

export const MovieModel = model<MovieDocument>('Movie', movieSchema);
