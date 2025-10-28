interface PokemonTypePillProps {
  types: string[];
}

const typeColors: Record<string, string> = {
  bug: 'bg-type-bug',
  dark: 'bg-type-dark',
  dragon: 'bg-type-dragon',
  electric: 'bg-type-electric',
  fairy: 'bg-type-fairy',
  fighting: 'bg-type-fighting',
  fire: 'bg-type-fire',
  flying: 'bg-type-flying',
  ghost: 'bg-type-ghost',
  grass: 'bg-type-grass',
  ground: 'bg-type-ground',
  ice: 'bg-type-ice',
  normal: 'bg-type-normal',
  poison: 'bg-type-poison',
  psychic: 'bg-type-psychic',
  rock: 'bg-type-rock',
  steel: 'bg-type-steel',
  water: 'bg-type-water',
};

export default function PokemonTypePill({ types }: PokemonTypePillProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {types.map((type) => (
        <span
          key={type}
          className={`px-3 py-1 rounded-full text-white text-body-2 font-medium capitalize ${
            typeColors[type] || 'bg-grayscale-medium'
          }`}
        >
          {type}
        </span>
      ))}
    </div>
  );
}
