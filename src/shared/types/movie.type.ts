export type Movie = {
  title: string;
  description: string;
  releaseYear: number;
  genre: string;
  rating: number;
  ratingsCount: number;
  durationMinutes: number;
  posterUrl: string;
  backgroundImageUrl: string;
  videoUrl: string;
  director: string;
  actors: string[];
  preview: {
    imageUrl: string;
    videoUrl: string;
  };
}
