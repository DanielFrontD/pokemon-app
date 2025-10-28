import { Pokemon } from "@/types/pokemon";

interface PokemonBoxProps {
  pokemon: Pokemon;
  onClick: (id: number) => void;
}

export default function PokemonBox({ pokemon, onClick }: PokemonBoxProps) {
  const handleClick = () => {
    onClick(pokemon.number);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onClick(pokemon.number);
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${pokemon.name}, Pokemon number ${pokemon.number}`}
      className="bg-white rounded-lg shadow-drop-2 p-6 cursor-pointer hover:shadow-drop-6 transition-shadow relative focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      {/* Pokemon Number */}
      <div className="absolute top-3 right-3 text-caption text-grayscale-medium font-medium">
        #{pokemon.number.toString().padStart(3, "0")}
      </div>

      <div className="text-center pt-4">
        {/* Pokemon Image */}
        <div className="w-24 h-24 mx-auto mb-4 relative">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="object-contain"
          />
        </div>

        {/* Pokemon Name */}
        <h3 className="text-body-1 text-grayscale-dark font-medium capitalize">
          {pokemon.name}
        </h3>
      </div>
    </div>
  );
}
