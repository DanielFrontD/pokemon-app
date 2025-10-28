import { render, screen, fireEvent } from '@testing-library/react';
import PokemonBox from '../index';
import { Pokemon } from '@/types/pokemon';

const mockPokemon: Pokemon = {
  name: 'pikachu',
  number: 25,
  image: 'https://example.com/pikachu.png',
};

const mockOnClick = jest.fn();

describe('PokemonBox', () => {
  beforeEach(() => {
    mockOnClick.mockClear();
  });

  it('renders pokemon information correctly', () => {
    render(<PokemonBox pokemon={mockPokemon} onClick={mockOnClick} />);
    
    expect(screen.getByText('pikachu')).toBeInTheDocument();
    expect(screen.getByText('#025')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu Pokemon')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    render(<PokemonBox pokemon={mockPokemon} onClick={mockOnClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockOnClick).toHaveBeenCalledWith(25);
  });

  it('calls onClick when Enter key is pressed', () => {
    render(<PokemonBox pokemon={mockPokemon} onClick={mockOnClick} />);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: 'Enter' });
    expect(mockOnClick).toHaveBeenCalledWith(25);
  });

  it('calls onClick when Space key is pressed', () => {
    render(<PokemonBox pokemon={mockPokemon} onClick={mockOnClick} />);
    
    fireEvent.keyDown(screen.getByRole('button'), { key: ' ' });
    expect(mockOnClick).toHaveBeenCalledWith(25);
  });

  it('has proper accessibility attributes', () => {
    render(<PokemonBox pokemon={mockPokemon} onClick={mockOnClick} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'View details for pikachu, Pokemon number 25');
    expect(button).toHaveAttribute('tabIndex', '0');
  });
});
