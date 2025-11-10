export interface Content {
  id: number;
  title: string;
  description: string;
  posterImage: string;
  backdropImage: string;
  year: number;
  ageRating: string;
  duration: string;
  genres: string[];
  isTrending?: boolean;
  matchPercentage?: number;
}

export interface Category {
  id: number;
  name: string;
  contents: Content[];
}

export interface Profile {
  id: number;
  name: string;
  avatar: string;
}