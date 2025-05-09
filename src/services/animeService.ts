import { API_BASE_URL, ENDPOINTS, DEFAULT_SEARCH_PARAMS } from '../constants/api';
import type { AnimeSearchParams, AnimeSearchResponse, Anime } from '../types/anime';

const createAnimeService = () => {
  const baseUrl = API_BASE_URL;

  const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(id);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(id);
      throw error;
    }
  };

  const buildUrl = (endpoint: string, params?: Record<string, string | number>): string => {
    const url = new URL(`${baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    return url.toString();
  };

  return {
    searchAnime: async (params: AnimeSearchParams = {}): Promise<AnimeSearchResponse> => {
      const searchParams = {
        ...DEFAULT_SEARCH_PARAMS,
        ...params,
      };

      const url = buildUrl(ENDPOINTS.ANIME_SEARCH, searchParams);
      return fetchWithTimeout(url);
    },

    getAnimeDetails: async (id: number): Promise<{ data: Anime }> => {
      const url = buildUrl(ENDPOINTS.ANIME_DETAILS.replace(':id', String(id)));
      return fetchWithTimeout(url);
    },

    getAnimeRecommendations: async (id: number) => {
      const url = buildUrl(ENDPOINTS.ANIME_RECOMMENDATIONS.replace(':id', String(id)));
      return fetchWithTimeout(url);
    },

    getAnimeReviews: async (id: number) => {
      const url = buildUrl(ENDPOINTS.ANIME_REVIEWS.replace(':id', String(id)));
      return fetchWithTimeout(url);
    },

    getAnimeCharacters: async (id: number) => {
      const url = buildUrl(ENDPOINTS.ANIME_CHARACTERS.replace(':id', String(id)));
      return fetchWithTimeout(url);
    },
  };
};

// Create a singleton instance
export const animeService = createAnimeService();
