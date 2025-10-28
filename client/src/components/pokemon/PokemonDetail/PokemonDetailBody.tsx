import { PokemonDetail } from "@/types/pokemon";
import { AboutPokemon, PokemonTypePill, PokemonStats } from "@/components";
import { getPrimaryTypeColor } from "@/utils/typeColors";

interface PokemonDetailBodyProps {
  pokemon: PokemonDetail;
}

export default function PokemonDetailBody({ pokemon }: PokemonDetailBodyProps) {
  const primaryColor = getPrimaryTypeColor(pokemon.types);

  return (
    <div className="bg-white rounded-lg shadow-drop-2 p-6 space-y-6">
      <div className="text-center">
        <PokemonTypePill types={pokemon.types} />
      </div>

      <div>
        <h2
          className="text-subtitle-1 font-bold mb-4"
          style={{ color: primaryColor }}
        >
          About
        </h2>
        <div className="grid grid-cols-3 gap-4">
          <AboutPokemon
            value={`${pokemon.weight / 10} Kg`}
            label="Weight"
          />
          <AboutPokemon
            value={`${pokemon.weight / 10} m`}
            label="Height"
          />

          <AboutPokemon
            value={pokemon.abilities.join(", ")}
            label="Moves"
          />
        </div>
      </div>

      {/* Base Stats */}
      <div>
        <h2
          className="text-subtitle-1 font-bold mb-4"
          style={{ color: primaryColor }}
        >
          Base Stats
        </h2>
        <PokemonStats stats={pokemon.stats} typeColor={primaryColor} />
      </div>
    </div>
  );
}
