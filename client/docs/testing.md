# Testing Documentation

## Overview
This project uses Jest and React Testing Library for unit testing components and utilities.

## Test Structure

### Component Tests
- **PokemonBox**: Tests rendering, click handlers, keyboard navigation, and accessibility
- **SearchPokemonTextField**: Tests search functionality, debouncing, clear functionality, and loading states
- **PokemonTypePill**: Tests type rendering and color application
- **PokemonStats**: Tests stat display, progress bars, and value formatting
- **SortRadioButtons**: Tests radio button selection and change handlers

### Utility Tests
- **typeColors**: Tests color utility functions for Pokemon types
- **validateJWT**: Tests JWT token validation and expiration logic

## Running Tests

### Basic Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### Test Coverage
The test suite covers:
- Component rendering and props
- User interactions (click, keyboard)
- Accessibility features
- Utility functions
- Error handling
- Loading states

## Test Setup

### Configuration
- **Jest Config**: `jest.config.js`
- **Setup File**: `src/setupTests.ts`
- **Mocks**: Next.js Image, Router, and React Query

### Mocked Dependencies
- `next/image`: Replaced with regular img element
- `next/navigation`: Mocked router functions
- `@tanstack/react-query`: Mocked query hooks

## Writing New Tests

### Component Test Template
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import Component from '../Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interaction', () => {
    const mockHandler = jest.fn();
    render(<Component onAction={mockHandler} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandler).toHaveBeenCalled();
  });
});
```

### Utility Test Template
```typescript
import { utilityFunction } from '../utility';

describe('utilityFunction', () => {
  it('returns expected result', () => {
    expect(utilityFunction('input')).toBe('expected');
  });

  it('handles edge cases', () => {
    expect(utilityFunction('')).toBe('fallback');
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on what the component does, not how it does it
2. **Use Accessible Queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
3. **Mock External Dependencies**: Mock API calls, routing, and external libraries
4. **Test Accessibility**: Ensure components work with keyboard navigation and screen readers
5. **Cover Edge Cases**: Test error states, empty data, and boundary conditions

## Coverage Goals

- **Components**: 80%+ coverage for all interactive components
- **Utilities**: 90%+ coverage for pure functions
- **Critical Paths**: 100% coverage for authentication and data validation
