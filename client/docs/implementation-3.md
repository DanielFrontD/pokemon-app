# Phase 3: Hooks & API Integration - Implementation Guide

## Overview
Phase 3 focuses on custom hooks implementation, React Query integration, and advanced data management.

## Tasks To Complete

### 1. React Query Setup
- Configure QueryClient with proper defaults
- Add React Query provider to app
- Set up error boundaries and loading states
- Configure caching strategies

### 2. Custom Hooks Implementation

#### useFetchPokemons
- Paginated Pokemon list fetching
- Search functionality integration
- Sorting by number/name
- Loading and error states
- Cache management

#### useCurrentPokemon
- Single Pokemon detail fetching
- Navigation between Pokemon
- Error handling for invalid IDs
- Optimistic updates

#### usePokemonSearch
- Real-time search with debouncing
- Search result caching
- Clear search functionality
- Loading states

### 3. Advanced Error Handling
- API error boundaries
- Network error handling
- Token expiration handling
- User-friendly error messages

### 4. Performance Optimization
- Query caching strategies
- Background refetching
- Stale-while-revalidate patterns
- Memory optimization

### 5. Hook Testing
- Custom hook testing with React Testing Library
- Mock API responses
- Error scenario testing
- Loading state validation

## Implementation Order

1. **Setup React Query** with proper configuration
2. **Create useFetchPokemons hook** with pagination
3. **Implement useCurrentPokemon hook** for details
4. **Add usePokemonSearch hook** for search
5. **Setup error boundaries** and handling
6. **Write hook tests** for all custom hooks
7. **Optimize performance** with caching strategies
8. **Integration testing** with components

## Success Criteria

- ✅ React Query configured and working
- ✅ All custom hooks functional and tested
- ✅ Proper error handling and user feedback
- ✅ Optimized caching and performance
- ✅ Hook tests passing
- ✅ Integration with existing components
- ✅ Background data fetching working
- ✅ Memory leaks prevented

## Hook Interfaces

### useFetchPokemons
```typescript
interface UseFetchPokemonsResult {
  pokemons: Pokemon[];
  isLoading: boolean;
  error: Error | null;
  hasNextPage: boolean;
  fetchNextPage: () => void;
  refetch: () => void;
}

interface UseFetchPokemonsParams {
  pageSize: number;
  sortCriteria: 'number' | 'name';
  searchQuery?: string;
}
```

### useCurrentPokemon
```typescript
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
```

### usePokemonSearch
```typescript
interface UsePokemonSearchResult {
  searchResults: Pokemon[];
  isSearching: boolean;
  searchError: Error | null;
  search: (query: string) => void;
  clearSearch: () => void;
}
```

## React Query Configuration

### QueryClient Setup
```typescript
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
```

### Query Keys
```typescript
export const queryKeys = {
  pokemons: ['pokemons'] as const,
  pokemonList: (params: UseFetchPokemonsParams) => 
    [...queryKeys.pokemons, 'list', params] as const,
  pokemonDetail: (id: number) => 
    [...queryKeys.pokemons, 'detail', id] as const,
  pokemonSearch: (query: string) => 
    [...queryKeys.pokemons, 'search', query] as const,
};
```

## Error Handling Strategy

### API Error Types
```typescript
interface APIError {
  status: number;
  message: string;
  code?: string;
}

interface NetworkError {
  message: string;
  isNetworkError: true;
}
```

### Error Boundary Component
```typescript
interface ErrorBoundaryProps {
  fallback: ComponentType<{ error: Error; retry: () => void }>;
  children: ReactNode;
}
```

## Next Phase Preview

Phase 4 will focus on:
- Complete page implementations
- Navigation and routing
- Protected route enhancements
- Final integration testing
