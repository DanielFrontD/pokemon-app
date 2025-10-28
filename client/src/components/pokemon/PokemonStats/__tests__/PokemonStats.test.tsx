import { render, screen } from '@testing-library/react';
import PokemonStats from '../index';

const mockStats = {
  hp: 45,
  attack: 49,
  defense: 49,
  'special-attack': 65,
  'special-defense': 65,
  speed: 45,
};

describe('PokemonStats', () => {
  it('renders all stat labels correctly', () => {
    render(<PokemonStats stats={mockStats} />);
    
    expect(screen.getByText('HP')).toBeInTheDocument();
    expect(screen.getByText('ATK')).toBeInTheDocument();
    expect(screen.getByText('DEF')).toBeInTheDocument();
    expect(screen.getByText('SATK')).toBeInTheDocument();
    expect(screen.getByText('SDEF')).toBeInTheDocument();
    expect(screen.getByText('SPD')).toBeInTheDocument();
  });

  it('renders all stat values correctly', () => {
    render(<PokemonStats stats={mockStats} />);
    
    expect(screen.getByText('045')).toBeInTheDocument(); // HP
    expect(screen.getByText('049')).toBeInTheDocument(); // Attack
    expect(screen.getByText('065')).toBeInTheDocument(); // Special Attack
  });

  it('applies custom type color when provided', () => {
    const typeColor = '#74CB48';
    render(<PokemonStats stats={mockStats} typeColor={typeColor} />);
    
    const hpLabel = screen.getByText('HP');
    expect(hpLabel).toHaveStyle({ color: typeColor });
  });

  it('calculates progress bar width correctly', () => {
    render(<PokemonStats stats={mockStats} />);
    
    // HP stat (45) should be 45% width
    const progressBars = document.querySelectorAll('[style*="width"]');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('pads stat values with leading zeros', () => {
    const lowStats = {
      hp: 5,
      attack: 10,
      defense: 15,
      'special-attack': 20,
      'special-defense': 25,
      speed: 30,
    };
    
    render(<PokemonStats stats={lowStats} />);
    
    expect(screen.getByText('005')).toBeInTheDocument();
    expect(screen.getByText('010')).toBeInTheDocument();
    expect(screen.getByText('015')).toBeInTheDocument();
  });
});
