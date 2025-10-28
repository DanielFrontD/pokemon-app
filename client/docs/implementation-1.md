# Phase 1: Setup & Authentication - Implementation Guide

## Overview
Phase 1 focuses on project initialization, configuration setup, and basic authentication system implementation.

## Tasks Completed ✅

### 1. Project Planning ✅
- Created comprehensive plan.md with architecture
- Defined folder structure (type->feature pattern)
- Created Tailwind config with Pokemon theme
- Set up prompts tracking system

### 2. Next.js Project Initialization ✅
- Initialized Next.js project with TypeScript, Tailwind, ESLint
- Configured src directory and import aliases

### 3. Dependencies Installation ✅
- Installed React Query, axios, js-cookie
- Installed testing dependencies (Jest, React Testing Library)

### 4. Project Structure Creation ✅
- Created complete folder structure according to plan
- Organized components, hooks, context, types, and utils

### 5. Configuration Files Setup ✅
- Jest configuration with Next.js integration
- Jest setup file with testing-library/jest-dom
- Updated package.json with test scripts

### 6. Authentication System Implementation ✅
- API configuration with base URL and endpoints
- Updated auth types for username-based authentication
- Real API integration with JWT token management
- Cookie-based token storage with 2-hour expiration
- Axios interceptors for automatic token handling
- Error handling for 401 responses

### 7. Basic Pages Setup ✅
- Login page with real API integration
- Protected pokemons page with authentication check
- Error handling and user feedback

### 8. Global Styles Setup ✅
- Updated Tailwind configuration with Pokemon theme
- Applied global styles with grayscale background

### 2. Next.js Project Initialization
```bash
npx create-next-app@latest pokemon-app --typescript --tailwind --eslint --app
cd pokemon-app
```

### 3. Dependencies Installation
```bash
# Core dependencies
npm install @tanstack/react-query axios js-cookie
npm install @types/js-cookie

# Development dependencies
npm install -D jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### 4. Project Structure Creation
Create the following folder structure:
```
src/
├── components/
│   ├── common/
│   └── pokemon/
├── hooks/
│   ├── auth/
│   └── pokemon/
├── context/
│   ├── AuthContext/
│   └── PokemonContext/
├── types/
├── utils/
│   ├── auth/
│   └── api/
└── styles/
```

### 5. Configuration Files Setup

#### Jest Configuration (jest.config.js)
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```

#### Jest Setup (jest.setup.js)
```javascript
import '@testing-library/jest-dom'
```

#### TypeScript Configuration Updates
- Ensure proper path aliases for clean imports
- Configure strict mode for better type safety

### 6. Authentication System Implementation

#### API Configuration (src/utils/config.ts)
```typescript
export const API_BASE_URL = 'http://localhost:3001';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  POKEMONS: '/pokemons',
  POKEMON_SEARCH: '/pokemons/search',
  POKEMON_DETAIL: '/pokemons',
} as const;

export const DEFAULT_CREDENTIALS = {
  username: 'admin',
  password: 'pokemon123',
} as const;
```

#### Types Definition (src/types/auth.ts)
```typescript
export interface User {
  id: string;
  username: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}
```

#### Auth Service (src/utils/auth/authService.ts)
```typescript
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '../config';
import { LoginCredentials, LoginResponse } from '@/types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    const response = await axios.post(
      `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
      credentials
    );
    return response.data;
  },
};
```

#### Auth Context (src/context/AuthContext/index.tsx)
- Implement AuthProvider with real API integration
- JWT token management with cookies
- Token expiration validation
- Axios interceptors for automatic token inclusion

#### Cookie Management (src/utils/auth/cookies.ts)
```typescript
import Cookies from 'js-cookie';

const TOKEN_KEY = 'pokemon_token';

export const tokenStorage = {
  set: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 1/12 }); // 2 hours
  },
  get: () => {
    return Cookies.get(TOKEN_KEY);
  },
  remove: () => {
    Cookies.remove(TOKEN_KEY);
  },
};
```

### 7. Basic Pages Setup

#### Login Page (src/pages/index.tsx)
- Simple login form
- Form validation
- Redirect logic after successful login

#### Protected Route Wrapper
- getServerSideProps implementation
- Token validation on server side
- Redirect logic for unauthorized access

### 8. Global Styles Setup (src/styles/globals.css)
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-grayscale-background text-grayscale-dark;
  }
}
```

## Implementation Order

1. **Initialize Next.js project** with TypeScript and Tailwind
2. **Install dependencies** for React Query, testing, and utilities
3. **Create folder structure** according to plan
4. **Setup configuration files** (Jest, TypeScript paths)
5. **Implement type definitions** for authentication
6. **Create AuthContext** with basic state management
7. **Implement useAuth hook** with login/logout logic
8. **Create auth utilities** for token management
9. **Build login page** with form and validation
10. **Setup protected route logic** with getServerSideProps
11. **Configure global styles** with Tailwind base styles
12. **Write basic tests** for auth components and hooks

## Success Criteria

- ✅ Next.js project initialized with TypeScript
- ✅ All dependencies installed and configured
- ✅ Folder structure matches the plan
- ✅ Jest testing environment working
- ✅ Custom API integration configured
- ✅ JWT authentication system functional
- ✅ Token storage with cookies implemented
- ✅ Login page connects to real API
- ✅ Protected routes with server-side validation
- ✅ Axios interceptors for token management
- ✅ Error handling for API responses
- ✅ Tailwind theme applied correctly

## API Integration Checklist

- ✅ API configuration with base URL and endpoints
- ✅ Authentication service with real login
- ✅ JWT token storage in cookies
- ✅ Axios interceptors for automatic token inclusion
- ✅ Error handling for 401 (unauthorized) responses
- ✅ Token expiration handling
- ✅ Default credentials integration (admin/pokemon123)

## Next Phase Preview

Phase 2 will focus on:
- Core component development (SearchPokemonTextField, PokemonBox, etc.)
- Component testing setup
- Basic Pokemon API integration preparation

## Notes

- Keep authentication simple for now (mock API)
- Focus on structure and patterns over complex logic
- Ensure all configurations work before moving to Phase 2
- Test each component as it's built
