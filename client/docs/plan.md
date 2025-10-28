# Pokédex Application Plan

## Tech Stack
- **Frontend**: ReactJS with TypeScript
- **Framework**: Next.js (for SEO)
- **Styling**: Tailwind CSS (with custom Pokemon theme)
- **Testing**: Jest
- **State Management**: React Context API
- **Data Fetching**: useQuery (React Query)

## Tailwind Configuration
Custom theme includes:
- **Pokemon Type Colors**: All 18 Pokemon types with official colors
- **Grayscale Palette**: Dark, medium, light, background, white
- **Primary Color**: Pokemon red (#E03A2D)
- **Typography Scale**: Headline, subtitles, body text, caption
- **Shadow System**: Drop shadows and inner shadows for depth

## Folder Structure (Type -> Feature Pattern)

```
client/
├── docs/
│   ├── plan.md
│   └── prompts.txt
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── SearchPokemonTextField/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── SearchPokemonTextField.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── PokemonBox/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── PokemonBox.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── SortRadioButtons/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── SortRadioButtons.test.tsx
│   │   │   │   └── types.ts
│   │   │   └── index.ts
│   │   ├── pokemon/
│   │   │   ├── AboutPokemon/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── AboutPokemon.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── PokemonTypePill/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── PokemonTypePill.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── PokemonStats/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── PokemonStats.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── ChangePokemonArrow/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── ChangePokemonArrow.test.tsx
│   │   │   │   └── types.ts
│   │   │   ├── PokemonDetail/
│   │   │   │   ├── PokemonDetailHeader/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── PokemonDetailHeader.test.tsx
│   │   │   │   │   └── types.ts
│   │   │   │   ├── PokemonDetailBody/
│   │   │   │   │   ├── index.tsx
│   │   │   │   │   ├── PokemonDetailBody.test.tsx
│   │   │   │   │   └── types.ts
│   │   │   │   └── index.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── auth/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAuth.test.ts
│   │   │   └── types.ts
│   │   ├── pokemon/
│   │   │   ├── useFetchPokemons.ts
│   │   │   ├── useFetchPokemons.test.ts
│   │   │   ├── useCurrentPokemon.ts
│   │   │   ├── useCurrentPokemon.test.ts
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── context/
│   │   ├── AuthContext/
│   │   │   ├── index.tsx
│   │   │   ├── AuthContext.test.tsx
│   │   │   └── types.ts
│   │   ├── PokemonContext/
│   │   │   ├── index.tsx
│   │   │   ├── PokemonContext.test.tsx
│   │   │   └── types.ts
│   │   └── index.ts
│   ├── pages/
│   │   ├── index.tsx (Login - route: /)
│   │   ├── pokemons/
│   │   │   ├── index.tsx (Search Pokemons - route: /pokemons)
│   │   │   └── [id].tsx (Pokemon Detail - route: /pokemons/[id])
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── types/
│   │   ├── auth.ts
│   │   ├── pokemon.ts
│   │   └── index.ts
│   ├── utils/
│   │   ├── auth/
│   │   │   ├── tokenValidation.ts
│   │   │   └── cookies.ts
│   │   ├── api/
│   │   │   └── pokemon.ts
│   │   └── index.ts
│   └── styles/
│       └── globals.css
├── public/
│   ├── icons/
│   └── images/
├── __tests__/
│   ├── setup.ts
│   └── utils/
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── jest.config.js
└── next.config.js
```

## Views Architecture

### 1. Login View (/)
- **Route**: `/`
- **Purpose**: User authentication
- **Components**: Login form
- **Features**:
  - Token-based authentication
  - Cookie storage for session management
  - Redirect to /pokemons on successful login

### 2. Search Pokemons (/pokemons)
- **Route**: `/pokemons`
- **Purpose**: Search and display Pokemon list
- **Components**:
  - SearchPokemonTextField
  - PokemonBox (multiple instances)
  - SortRadioButtons
- **Features**:
  - Search by name
  - Sort by number or name
  - Pagination
  - Protected route (requires authentication)

### 3. Pokemon Detail (/pokemons/[id])
- **Route**: `/pokemons/[id]`
- **Purpose**: Display detailed Pokemon information
- **Components**:
  - AboutPokemon
  - PokemonTypePill
  - PokemonStats
  - ChangePokemonArrow
- **Features**:
  - Detailed Pokemon information
  - Navigation between Pokemon
  - Protected route (requires authentication)

## Authorization Strategy

### getServerSideProps Implementation
- **Protected Routes**: `/pokemons` and `/pokemons/[id]`
- **Validation Process**:
  1. Extract token from cookies
  2. Validate token expiration
  3. Redirect to login if invalid/expired
  4. Allow access if valid

## Components Specification

### Common Components
1. **SearchPokemonTextField**
   - Uses `useFetchPokemons` hook
   - Real-time search functionality
   - Debounced input handling

2. **PokemonBox**
   - Displays: Pokemon number, name, image
   - Clickable for navigation to detail view
   - Responsive design

3. **SortRadioButtons**
   - Options: "Number", "Name"
   - Updates search results sorting
   - Controlled component

### Pokemon-Specific Components
4. **AboutPokemon**
   - Props: icon, value, label
   - Flexible display component
   - Used for height, weight, abilities, etc.

5. **PokemonTypePill**
   - Props: array of type strings
   - Color-coded by type
   - Multiple pills for dual-type Pokemon

6. **PokemonStats**
   - Props: stats object
   - Progress bars (0-100 scale)
   - Animated fill based on stat values

7. **ChangePokemonArrow**
   - Props: direction (left/right)
   - Navigation between Pokemon IDs
   - Handles edge cases (first/last Pokemon)

8. **PokemonDetailHeader**
   - Pokemon name, number, and navigation
   - Contains ChangePokemonArrow components
   - Pokemon image display

9. **PokemonDetailBody**
   - Contains AboutPokemon, PokemonTypePill, PokemonStats
   - Organized layout for Pokemon information
   - Responsive design for mobile/desktop

## Hooks Architecture

### 1. useAuth
- **Functions**:
  - `login(credentials)`: Authenticate user
  - `validateTokenExpiration()`: Check token validity
- **Returns**: `{ user, isAuthenticated, login, logout, isLoading }`

### 2. useFetchPokemons
- **Functions**:
  - `getPokemonByName(name)`: Search by name
  - `getPokemonsByPage(page, limit)`: Paginated results
- **Uses**: React Query for caching and state management
- **Returns**: `{ pokemons, isLoading, error, refetch }`

### 3. useCurrentPokemon
- **Functions**:
  - `getPokemonById(id)`: Fetch specific Pokemon
- **Uses**: React Query with caching
- **Returns**: `{ pokemon, isLoading, error, refetch }`

## Context API Structure

### AuthContext
- **State**: User authentication status, user data
- **Actions**: Login, logout, token validation
- **Provider**: Wraps entire application

### PokemonContext
- **State**: Current Pokemon data, search results, filters
- **Actions**: Set current Pokemon, update search results
- **Provider**: Wraps Pokemon-related pages

## Testing Strategy

### Component Testing
- Unit tests for each component
- Props validation
- User interaction testing
- Snapshot testing for UI consistency

### Hook Testing
- Custom hook testing with React Testing Library
- API call mocking
- State management validation

### Integration Testing
- Page-level testing
- Authentication flow testing
- Navigation testing

## Development Phases

### Phase 1: Setup & Authentication ✅
1. Project initialization with Next.js + TypeScript
2. Tailwind CSS configuration
3. Jest setup
4. Authentication system implementation
5. Context providers setup

### Phase 2: Core Components ✅
1. Common components development
2. Pokemon-specific components
3. Component testing

### Phase 3: Hooks & API Integration ✅
1. Custom hooks implementation
2. React Query integration
3. API service layer
4. Hook testing

### Phase 4: Views & Navigation ✅
1. Page components implementation
2. Routing setup
3. Protected routes implementation
4. Integration testing

### Phase 4.5: Visual Design Implementation
Based on design prototype analysis, implement visual improvements:

#### Pokemon List View Design Updates
1. **Header Design**:
   - Red primary background (#E03A2D) for header
   - White Pokédex text logo (omit Pokeball icon for now)
   - Centered search bar with rounded corners
   - Keep existing logout button on the right

2. **Pokemon Grid Layout**:
   - Clean white cards with subtle shadows
   - Pokemon number in top-right corner (#XXX format)
   - Larger Pokemon images (centered)
   - Pokemon name below image
   - 3-column grid on desktop
   - Consistent card spacing and proportions

3. **Visual Hierarchy**:
   - Update header styling but keep logout functionality
   - Implement proper mobile-first responsive design
   - Clean, minimal card design matching prototype

#### Pokemon Detail View Design Updates
1. **Dynamic Header Colors**:
   - Header background matches Pokemon's primary type color
   - White text and back arrow
   - Pokemon name and number in header
   - Navigation arrows on sides of Pokemon image

2. **Pokemon Image Section**:
   - Large Pokemon image on colored background
   - Left/right navigation arrows
   - Clean, centered layout

3. **Type Pills**:
   - Rounded type badges below Pokemon image
   - Type-specific colors from theme
   - Proper spacing and typography

4. **About Section**:
   - Clean white background
   - Weight, height, and moves information
   - Icon + value + label layout
   - Proper typography hierarchy

5. **Base Stats Section**:
   - Colored progress bars matching Pokemon type
   - Stat abbreviations (HP, ATK, DEF, SATK, SDEF, SPD)
   - Numerical values aligned right
   - Type-colored stat bars and labels

6. **Pokemon Description**:
   - Flavor text in clean typography
   - Proper line spacing and readability

#### Color System Updates
1. **Primary Colors**:
   - Header: #E03A2D (red)
   - Background: Clean white/light gray
   - Cards: Pure white with subtle shadows

2. **Type-Based Theming**:
   - Grass: Green tones (#74CB48)
   - Fire: Orange tones (#F57D31) 
   - Water: Blue tones (#6493EB)
   - Dynamic header colors based on Pokemon type

3. **Typography**:
   - Clean, modern font hierarchy
   - Proper contrast ratios
   - Consistent sizing and spacing

### Phase 5: Polish & Optimization
1. Performance optimization
2. SEO implementation
3. Accessibility improvements
4. Final testing and bug fixes
2. SEO implementation
3. Error handling
4. Final testing and bug fixes

## API Integration Notes

### Custom Pokemon API Server
- **Base URL**: `http://localhost:3001`
- **Authentication**: JWT-based with 2-hour token expiration
- **Default Credentials**:
  - Username: `admin`
  - Password: `pokemon123`

### API Endpoints

#### Authentication
- **POST** `/login` - User authentication
  ```json
  {
    "username": "admin",
    "password": "pokemon123"
  }
  ```

#### Pokemon Data (Requires JWT Token)
- **POST** `/pokemons` - Get paginated Pokemon list
  ```json
  {
    "pageSize": 9,
    "pageNumber": 1,
    "sortCriteria": "number" | "name"
  }
  ```

- **GET** `/pokemons/search/{name}` - Search Pokemon by name
- **GET** `/pokemons/{id}` - Get Pokemon details by ID

### Response Formats

#### Pokemon List Response
```json
{
  "pokemons": [
    {
      "name": "bulbasaur",
      "number": 1,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    }
  ],
  "pageSize": 9,
  "pageNumber": 1,
  "sortCriteria": "number"
}
```

#### Pokemon Detail Response
```json
{
  "name": "pikachu",
  "id": 25,
  "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
  "types": ["electric"],
  "height": 4,
  "abilities": ["static", "lightning-rod"],
  "stats": {
    "hp": 35,
    "attack": 55,
    "defense": 40,
    "special-attack": 50,
    "special-defense": 50,
    "speed": 90
  }
}
```

### Authentication Headers
All Pokemon endpoints require:
```
Authorization: Bearer {JWT_TOKEN}
```

### Error Handling
- **400**: Bad Request (invalid input)
- **401**: Unauthorized (missing/invalid token)
- **404**: Not Found (Pokemon not found)
- **500**: Internal Server Error

### Integration Strategy
- **Token Storage**: Store JWT in cookies for persistence
- **Token Refresh**: Handle 401 responses by redirecting to login
- **Caching**: React Query for efficient data management
- **Error Boundaries**: Comprehensive error handling and user feedback
