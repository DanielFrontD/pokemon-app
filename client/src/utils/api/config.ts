export const API_BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  LOGOUT: '/logout',
  POKEMONS: '/pokemons',
  POKEMON_SEARCH: '/pokemons/search',
  POKEMON_DETAIL: '/pokemons',
} as const;

export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'pokemon123',
} as const;
