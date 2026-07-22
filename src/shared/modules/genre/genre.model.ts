import { Document, Schema, model } from 'mongoose';

import { GenreNameLength } from '../../constants/index.js';
import { Genre } from '../../types/index.js';

export interface GenreDocument extends Document, Genre {
  createdAt: Date,
  updatedAt: Date,
}

const genreSchema = new Schema({
  name: {
    type: String,
    trim: true,
    lowercase: true,
    minLength: GenreNameLength.Min,
    maxLength: GenreNameLength.Max,
    required: true,
    unique: true,
  },
}, { collection: 'genres', timestamps: true });

export const GenreModel = model<GenreDocument>('Genre', genreSchema);
