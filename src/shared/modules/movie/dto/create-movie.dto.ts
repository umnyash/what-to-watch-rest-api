export class CreateMovieDto {
  public title: string;
  public description: string;
  public releaseYear: number;
  public genreId: string;
  public rating: number;
  public ratingsCount: number;
  public durationMinutes: number;
  public posterUrl: string;
  public backgroundImageUrl: string;
  public videoUrl: string;
  public director: string;
  public actors: string[];
  public preview: {
    imageUrl: string;
    videoUrl: string;
  };
}
