import apiClient from './axios';
import { API_ENDPOINTS } from './config';
import { PokemonListResponse, PokemonSearchResponse, PokemonDetail } from '@/types/pokemon';

export const pokemonService = {
  getPokemons: async (params: {
    pageSize: number;
    pageNumber: number;
    sortCriteria: 'number' | 'name';
  }): Promise<PokemonListResponse> => {
    const response = await apiClient.post(API_ENDPOINTS.POKEMONS, params);
    return response.data;
  },

  searchPokemon: async (name: string): Promise<PokemonSearchResponse> => {
    const response = await apiClient.get(`${API_ENDPOINTS.POKEMON_SEARCH}/${name}`);
    return response.data;
  },

  getPokemonById: async (id: number): Promise<PokemonDetail> => {
    const response = await apiClient.get(`${API_ENDPOINTS.POKEMON_DETAIL}/${id}`);
    return response.data;
  },
};
