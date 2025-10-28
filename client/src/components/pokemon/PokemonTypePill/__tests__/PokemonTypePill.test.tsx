import { render, screen } from '@testing-library/react';
import PokemonTypePill from '../index';

describe('PokemonTypePill', () => {
  it('renders single type correctly', () => {
    render(<PokemonTypePill types={['fire']} />);
    
    expect(screen.getByText('fire')).toBeInTheDocument();
  });

  it('renders multiple types correctly', () => {
    render(<PokemonTypePill types={['fire', 'flying']} />);
    
    expect(screen.getByText('fire')).toBeInTheDocument();
    expect(screen.getByText('flying')).toBeInTheDocument();
  });

  it('applies correct CSS classes for type colors', () => {
    render(<PokemonTypePill types={['water']} />);
    
    const typePill = screen.getByText('water');
    expect(typePill).toHaveClass('bg-type-water');
  });

  it('handles unknown types with fallback color', () => {
    render(<PokemonTypePill types={['unknown']} />);
    
    const typePill = screen.getByText('unknown');
    expect(typePill).toHaveClass('bg-grayscale-medium');
  });

  it('capitalizes type names', () => {
    render(<PokemonTypePill types={['electric']} />);
    
    const typePill = screen.getByText('electric');
    expect(typePill).toHaveClass('capitalize');
  });
});
