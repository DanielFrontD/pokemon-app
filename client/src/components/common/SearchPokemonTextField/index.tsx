import { useState, useEffect, useId } from 'react';

interface SearchPokemonTextFieldProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}

export default function SearchPokemonTextField({
  onSearch,
  isLoading = false,
  placeholder = "Search Pokemon..."
}: SearchPokemonTextFieldProps) {
  const [query, setQuery] = useState('');
  const inputId = useId();

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleClear = () => {
    setQuery('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="relative w-full">
      <label htmlFor={inputId} className="sr-only">
        Search Pokemon by name
      </label>
      <input
        id={inputId}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={isLoading}
        aria-describedby={query ? `${inputId}-clear` : undefined}
        className="w-full p-3 bg-grayscale-background pr-10 border border-grayscale-light rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50"
      />

      {query && (
        <button
          id={`${inputId}-clear`}
          onClick={handleClear}
          aria-label="Clear search"
          className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-grayscale-medium hover:text-grayscale-dark focus:outline-none focus:text-grayscale-dark"
        >
          ✕
        </button>
      )}

      {isLoading && (
        <div 
          className="absolute right-8 top-1/2 transform -translate-y-1/2"
          aria-label="Loading search results"
          role="status"
        >
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  );
}
