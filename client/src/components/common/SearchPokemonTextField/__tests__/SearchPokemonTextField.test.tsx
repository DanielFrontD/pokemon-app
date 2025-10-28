import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPokemonTextField from '../index';

const mockOnSearch = jest.fn();

describe('SearchPokemonTextField', () => {
  beforeEach(() => {
    mockOnSearch.mockClear();
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('renders with placeholder text', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} />);
    
    expect(screen.getByPlaceholderText('Search Pokemon...')).toBeInTheDocument();
  });

  it('calls onSearch after debounce delay', async () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'pikachu' } });
    
    expect(mockOnSearch).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(300);
    
    expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
  });

  it('shows clear button when input has value', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
  });

  it('clears input when clear button is clicked', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    
    const clearButton = screen.getByLabelText('Clear search');
    fireEvent.click(clearButton);
    
    expect(input.value).toBe('');
  });

  it('clears input when Escape key is pressed', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} />);
    
    const input = screen.getByRole('textbox') as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.keyDown(input, { key: 'Escape' });
    
    expect(input.value).toBe('');
  });

  it('shows loading indicator when isLoading is true', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} isLoading={true} />);
    
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading search results')).toBeInTheDocument();
  });

  it('disables input when isLoading is true', () => {
    render(<SearchPokemonTextField onSearch={mockOnSearch} isLoading={true} />);
    
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
