import { useQuery } from '@tanstack/react-query';
import { pokemonService } from '@/utils/api/pokemonService';
import { queryKeys } from '@/utils/queryClient';
import { Pokemon } from '@/types/pokemon';
import { useState } from 'react';

interface UsePokemonSearchResult {
  searchResults: Pokemon[];
  isSearching: boolean;
  searchError: Error | null;
  search: (query: string) => void;
  clearSearch: () => void;
  searchQuery: string;
}

export function usePokemonSearch(): UsePokemonSearchResult {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: queryKeys.pokemonSearch(searchQuery),
    queryFn: () => pokemonService.searchPokemon(searchQuery),
    enabled: searchQuery.length > 0,
  });

  const search = (query: string) => {
    setSearchQuery(query.trim());
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    searchResults: data?.pokemons || [],
    isSearching: isLoading,
    searchError: error as Error | null,
    search,
    clearSearch,
    searchQuery,
  };
}
