import { useQuery } from '@tanstack/react-query';
import { pokemonService } from '@/utils/api/pokemonService';
import { queryKeys } from '@/utils/queryClient';
import { Pokemon } from '@/types/pokemon';

interface UseFetchPokemonsParams {
  pageSize: number;
  pageNumber: number;
  sortCriteria: 'number' | 'name';
}

interface UseFetchPokemonsResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFetchPokemons(params: UseFetchPokemonsParams): UseFetchPokemonsResult {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.pokemonList(params),
    queryFn: () => pokemonService.getPokemons(params),
  });

  return {
    pokemons: data?.pokemons || [],
    isLoading,
    error: error as Error | null,
    refetch,
  };
}
