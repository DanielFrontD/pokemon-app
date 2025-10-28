import { useQuery } from '@tanstack/react-query';
import { pokemonService } from '@/utils/api/pokemonService';
import { queryKeys } from '@/utils/queryClient';
import { PokemonDetail } from '@/types/pokemon';
import { useRouter } from 'next/navigation';

interface UseCurrentPokemonResult {
  pokemon: PokemonDetail | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  navigateNext: () => void;
  navigatePrevious: () => void;
  canNavigateNext: boolean;
  canNavigatePrevious: boolean;
}

export function useCurrentPokemon(id: number): UseCurrentPokemonResult {
  const router = useRouter();
  
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: queryKeys.pokemonDetail(id),
    queryFn: () => pokemonService.getPokemonById(id),
    enabled: !!id && id > 0,
  });

  const navigateNext = () => {
    if (id < 1025) { // Assuming max Pokemon ID
      router.push(`/pokemons/${id + 1}`);
    }
  };

  const navigatePrevious = () => {
    if (id > 1) {
      router.push(`/pokemons/${id - 1}`);
    }
  };

  return {
    pokemon: data || null,
    isLoading,
    error: error as Error | null,
    refetch,
    navigateNext,
    navigatePrevious,
    canNavigateNext: id < 1025,
    canNavigatePrevious: id > 1,
  };
}
