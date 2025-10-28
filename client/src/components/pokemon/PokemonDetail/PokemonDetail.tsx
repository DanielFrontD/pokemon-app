'use client';

import { useRouter } from 'next/navigation';
import { useCurrentPokemon } from '@/hooks/pokemon';
import PokemonDetailHeader from '@/components/pokemon/PokemonDetail/PokemonDetailHeader';
import PokemonDetailBody from '@/components/pokemon/PokemonDetail/PokemonDetailBody';
import ErrorBoundary from '@/components/common/ErrorBoundary';
import { getPrimaryTypeColor } from '@/utils/typeColors';

interface PokemonDetailClientProps {
  pokemonId: number;
}

export default function PokemonDetail({ pokemonId }: PokemonDetailClientProps) {
  const router = useRouter();
  const {
    pokemon,
    isLoading,
    error,
    navigateNext,
    navigatePrevious,
    canNavigateNext,
    canNavigatePrevious,
  } = useCurrentPokemon(pokemonId);

  const handleNavigateBack = () => {
    router.push('/pokemons');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-grayscale-background p-6">
        <div className="max-w-2xl mx-auto">
          {/* Loading Header */}
          <div className="bg-grayscale-light rounded-lg p-6 mb-6 animate-pulse">
            <div className="h-8 bg-grayscale-medium rounded mb-4 w-32"></div>
            <div className="h-48 bg-grayscale-medium rounded"></div>
          </div>

          {/* Loading Body */}
          <div className="bg-white rounded-lg shadow-drop-2 p-6 animate-pulse">
            <div className="space-y-6">
              <div className="flex justify-center gap-2">
                <div className="h-6 bg-grayscale-light rounded w-16"></div>
                <div className="h-6 bg-grayscale-light rounded w-16"></div>
              </div>
              <div>
                <div className="h-4 bg-grayscale-light rounded mb-4 w-16"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-12 bg-grayscale-light rounded"></div>
                  <div className="h-12 bg-grayscale-light rounded"></div>
                </div>
              </div>
              <div>
                <div className="h-4 bg-grayscale-light rounded mb-4 w-20"></div>
                <div className="space-y-3">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-3 bg-grayscale-light rounded w-12"></div>
                      <div className="flex-1 h-2 bg-grayscale-light rounded"></div>
                      <div className="h-3 bg-grayscale-light rounded w-8"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-grayscale-background p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-drop-2 p-6 text-center">
            <h2 className="text-headline text-grayscale-dark mb-4">
              Pokemon Not Found
            </h2>
            <p className="text-body-1 text-grayscale-medium mb-6">
              The Pokemon with ID {pokemonId} could not be found.
            </p>
            <button
              onClick={handleNavigateBack}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pokemon) {
    return null;
  }

  const pokemonTypeColor = getPrimaryTypeColor(pokemon.types);

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-grayscale-background p-2">
        <div className="max-w-2xl mx-auto space-y-6 p-2 rounded-lg" style={{ backgroundColor: pokemonTypeColor }}>
          <PokemonDetailHeader
            pokemon={pokemon}
            onNavigateBack={handleNavigateBack}
            onNavigateNext={navigateNext}
            onNavigatePrevious={navigatePrevious}
            canNavigateNext={canNavigateNext}
            canNavigatePrevious={canNavigatePrevious}
          />

          <PokemonDetailBody pokemon={pokemon} />
        </div>
      </div>
    </ErrorBoundary>
  );
}
