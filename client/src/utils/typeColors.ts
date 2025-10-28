export const typeColors: Record<string, string> = {
  bug: 'var(--color-type-bug)',
  dark: 'var(--color-type-dark)',
  dragon: 'var(--color-type-dragon)',
  electric: 'var(--color-type-electric)',
  fairy: 'var(--color-type-fairy)',
  fighting: 'var(--color-type-fighting)',
  fire: 'var(--color-type-fire)',
  flying: 'var(--color-type-flying)',
  ghost: 'var(--color-type-ghost)',
  grass: 'var(--color-type-grass)',
  ground: 'var(--color-type-ground)',
  ice: 'var(--color-type-ice)',
  normal: 'var(--color-type-normal)',
  poison: 'var(--color-type-poison)',
  psychic: 'var(--color-type-psychic)',
  rock: 'var(--color-type-rock)',
  steel: 'var(--color-type-steel)',
  water: 'var(--color-type-water)',
};

export const getTypeColor = (type: string): string => {
  return typeColors[type.toLowerCase()] || 'var(--color-type-normal)';
};

export const getPrimaryTypeColor = (types: string[]): string => {
  return types.length > 0 ? getTypeColor(types[0]) : 'var(--color-type-normal)';
};
