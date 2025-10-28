# Phase 2: Core Components - Implementation Guide

## Overview
Phase 2 focuses on developing the core components for Pokemon search, display, and interaction functionality.

## Tasks To Complete

### 1. Common Components Development

#### SearchPokemonTextField
- Real-time search with debouncing
- Integration with Pokemon search API
- Loading and error states
- Clear search functionality

#### PokemonBox
- Display Pokemon number, name, and image
- Clickable navigation to detail view
- Responsive design for grid layout
- Loading skeleton state

#### SortRadioButtons
- "Number" and "Name" sorting options
- Controlled component with callback
- Pokemon theme styling

### 2. Pokemon-Specific Components

#### AboutPokemon
- Flexible display component for Pokemon info
- Props: icon, value, label
- Used for height, weight, abilities display
- Consistent styling with theme

#### PokemonTypePill
- Color-coded type pills using Tailwind theme
- Support for multiple types (dual-type Pokemon)
- Responsive pill layout

#### PokemonStats
- Progress bars for Pokemon stats
- 0-100 scale with animated fill
- Color-coded stat bars
- Responsive layout

#### ChangePokemonArrow
- Left/right navigation arrows
- Handle edge cases (first/last Pokemon)
- Disabled states for boundaries

### 3. Pokemon Detail Components

#### PokemonDetailHeader
- Pokemon name, number display
- Navigation arrows integration
- Pokemon image display
- Back to search functionality

#### PokemonDetailBody
- Layout container for Pokemon information
- Responsive design for mobile/desktop
- Integration of AboutPokemon, PokemonTypePill, PokemonStats

### 4. Component Testing

#### Unit Tests for Each Component
- Props validation and rendering
- User interaction testing
- Loading and error state testing
- Snapshot testing for UI consistency

### 5. API Integration Preparation

#### Pokemon Service Layer
- API calls for Pokemon list, search, and detail
- Error handling and response formatting
- Integration with React Query for caching

## Implementation Order

1. **Create Pokemon service layer** with API integration
2. **Build SearchPokemonTextField** with real API calls
3. **Implement PokemonBox** for grid display
4. **Add SortRadioButtons** for list sorting
5. **Create AboutPokemon** flexible info component
6. **Build PokemonTypePill** with theme colors
7. **Implement PokemonStats** with progress bars
8. **Add ChangePokemonArrow** navigation
9. **Create PokemonDetailHeader** layout
10. **Build PokemonDetailBody** container
11. **Write component tests** for all components
12. **Integration testing** with Pokemon pages

## Success Criteria

- ✅ All common components functional and tested
- ✅ Pokemon-specific components with proper theming
- ✅ Detail view components with responsive layout
- ✅ Real API integration with error handling
- ✅ Component tests passing
- ✅ Search functionality working end-to-end
- ✅ Pokemon detail navigation functional
- ✅ Responsive design on mobile and desktop

## API Integration Points

### Pokemon List API
```typescript
POST /pokemons
{
  "pageSize": 9,
  "pageNumber": 1,
  "sortCriteria": "number" | "name"
}
```

### Pokemon Search API
```typescript
GET /pokemons/search/{name}
```

### Pokemon Detail API
```typescript
GET /pokemons/{id}
```

## Component Props Interfaces

### SearchPokemonTextField
```typescript
interface SearchPokemonTextFieldProps {
  onSearch: (query: string) => void;
  isLoading?: boolean;
  placeholder?: string;
}
```

### PokemonBox
```typescript
interface PokemonBoxProps {
  pokemon: Pokemon;
  onClick: (id: number) => void;
}
```

### SortRadioButtons
```typescript
interface SortRadioButtonsProps {
  value: 'number' | 'name';
  onChange: (value: 'number' | 'name') => void;
}
```

### AboutPokemon
```typescript
interface AboutPokemonProps {
  icon: ReactNode;
  value: string | number;
  label: string;
}
```

### PokemonTypePill
```typescript
interface PokemonTypePillProps {
  types: string[];
}
```

### PokemonStats
```typescript
interface PokemonStatsProps {
  stats: {
    hp: number;
    attack: number;
    defense: number;
    'special-attack': number;
    'special-defense': number;
    speed: number;
  };
}
```

## Next Phase Preview

Phase 3 will focus on:
- Custom hooks implementation (useFetchPokemons, useCurrentPokemon)
- React Query integration for caching
- Advanced error handling and loading states
- Performance optimization
