import { getTypeColor, getPrimaryTypeColor } from '../typeColors';

describe('typeColors utilities', () => {
  describe('getTypeColor', () => {
    it('returns correct color for known types', () => {
      expect(getTypeColor('fire')).toBe('var(--color-type-fire)');
      expect(getTypeColor('water')).toBe('var(--color-type-water)');
      expect(getTypeColor('grass')).toBe('var(--color-type-grass)');
    });

    it('handles case insensitive input', () => {
      expect(getTypeColor('FIRE')).toBe('var(--color-type-fire)');
      expect(getTypeColor('Fire')).toBe('var(--color-type-fire)');
    });

    it('returns fallback color for unknown types', () => {
      expect(getTypeColor('unknown')).toBe('var(--color-type-normal)');
      expect(getTypeColor('')).toBe('var(--color-type-normal)');
    });
  });

  describe('getPrimaryTypeColor', () => {
    it('returns color of first type in array', () => {
      expect(getPrimaryTypeColor(['fire', 'flying'])).toBe('var(--color-type-fire)');
      expect(getPrimaryTypeColor(['water', 'ice'])).toBe('var(--color-type-water)');
    });

    it('returns fallback color for empty array', () => {
      expect(getPrimaryTypeColor([])).toBe('var(--color-type-normal)');
    });

    it('handles single type array', () => {
      expect(getPrimaryTypeColor(['electric'])).toBe('var(--color-type-electric)');
    });
  });
});
