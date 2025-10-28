import { PokemonBox } from "@/components/common";
import { Pokemon } from "@/types/pokemon";
import LoadingGrid from "./LoadingGrid";

interface PokemonListResultsProps {
  error: Error | null;
  showLoading: boolean;
  pokemons: Pokemon[];
  searchQuery: string;
  handlePokemonClick: (id: number) => void;
}

export default function PokemonListResults({
  error,
  showLoading,
  pokemons,
  searchQuery,
  handlePokemonClick,
}: PokemonListResultsProps) {
  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-drop-2 p-6 text-center">
        <p className="text-body-1 text-primary mb-4">
          Error loading Pokemon: {error.message}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90"
        >
          Retry
        </button>
      </div>
    );
  }

  if (showLoading) {
    return <LoadingGrid />;
  }

  if (pokemons.length) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {pokemons.map((pokemon) => (
          <PokemonBox
            key={pokemon.number}
            pokemon={pokemon}
            onClick={handlePokemonClick}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-drop-2 p-6 text-center">
      <p className="text-body-1 text-grayscale-medium">
        {searchQuery
          ? "No Pokemon found matching your search."
          : "No Pokemon available."}
      </p>
    </div>
  );
}
