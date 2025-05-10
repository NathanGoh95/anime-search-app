// Image Types
export interface AnimeImageJPG {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface AnimeImages {
  jpg: AnimeImageJPG;
}

// Genre
export interface Genre {
  mal_id: number;
  name: string;
}

// Aired Dates
export interface AiredDateRange {
  from: string;
  to: string;
}

// Anime Object
export interface Anime {
  mal_id: number;
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  images: AnimeImages;
  synopsis: string;
  score: number;
  rank: number;
  episodes: number;
  status: string;
  aired: AiredDateRange;
  genres: Genre[];
}

// Pagination
export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page: number;
  items: PaginationItems;
}

// Search Response
export interface AnimeResponse {
  pagination: Pagination;
  data: Anime[];
}

// Search Parameters
export interface AnimeSearchParams {
  q?: string;
  page?: number;
  limit?: number;
  type?: 'tv' | 'movie' | 'ova' | 'special' | 'ona' | 'music';
  status?: 'airing' | 'complete' | 'upcoming';
  rating?: 'g' | 'pg' | 'pg13' | 'r17' | 'r' | 'rx';
  order_by?: 'title' | 'start_date' | 'end_date' | 'score' | 'type' | 'members' | 'id' | 'episodes' | 'rating';
  sort?: 'asc' | 'desc';
}
