import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors except 408, 429
        if (error?.status >= 400 && error?.status < 500 && ![408, 429].includes(error?.status)) {
          return false;
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

export const queryKeys = {
  pokemons: ['pokemons'] as const,
  pokemonList: (params: { pageSize: number; pageNumber: number; sortCriteria: 'number' | 'name' }) => 
    [...queryKeys.pokemons, 'list', params] as const,
  pokemonDetail: (id: number) => 
    [...queryKeys.pokemons, 'detail', id] as const,
  pokemonSearch: (query: string) => 
    [...queryKeys.pokemons, 'search', query] as const,
};

// Prefetch function for Pokemon details
export const prefetchPokemon = (id: number) => {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.pokemonDetail(id),
    staleTime: 10 * 60 * 1000, // 10 minutes for prefetched data
  });
};
