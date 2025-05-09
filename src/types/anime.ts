export interface Anime {
  mal_id: number;
  title: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  synopsis: string;
  score: number;
  episodes: number;
  status: string;
  aired: {
    from: string;
    to: string;
  };
  genres: Array<{
    mal_id: number;
    name: string;
  }>;
}

export interface AnimeSearchResponse {
  pagination: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
  data: Anime[];
}

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
