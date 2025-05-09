export const API_BASE_URL = 'https://api.jikan.moe/v4';

export const ENDPOINTS = {
  ANIME_LIST: '/anime',
  ANIME_SEARCH: '/anime',
  ANIME_DETAILS: '/anime/:id',
  ANIME_RECOMMENDATIONS: '/anime/:id/recommendations',
  ANIME_REVIEWS: '/anime/:id/reviews',
  ANIME_CHARACTERS: '/anime/:id/characters',
} as const;

export const DEFAULT_SEARCH_PARAMS = {
  limit: 20,
  page: 1,
} as const;
