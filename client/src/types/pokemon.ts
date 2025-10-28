export interface Pokemon {
  name: string;
  number: number;
  image: string;
}

export interface PokemonDetail {
  name: string;
  id: number;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
}

export interface PokemonListResponse {
  pokemons: Pokemon[];
  pageSize: number;
  pageNumber: number;
  sortCriteria: 'number' | 'name';
}

export interface PokemonSearchResponse {
  pokemons: Pokemon[];
}
