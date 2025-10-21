export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// src/types/movie.ts

// 🎬 영화 장르
export interface Genre {
  id: number;
  name: string;
}

// 🏢 제작사 정보
export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

// 🌎 제작 국가
export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// 🗣️ 언어 정보
export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

// 📘 영화 상세 정보
export interface MovieDetail {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: unknown | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// 🎞️ 영화 목록용 (리스트 페이지)
export interface MovieSummary {
  id: number;
  title: string;
  poster_path: string | null;
  overview: string;
  release_date?: string;
  vote_average?: number;
}

// 🎞️ 리스트 API 응답
export interface MovieListResponse {
  page: number;
  total_pages: number;
  results: MovieSummary[];
}

