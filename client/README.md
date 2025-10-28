# Pokédx - Pokemon Discovery Application

A modern, responsive Pokemon discovery application built with Next.js, TypeScript, and Tailwind CSS. Search, explore, and discover detailed information about Pokemon with a beautiful, accessible interface.

## Built with AI Assistance

This application was developed using **Generative AI** assistance:
- **AI Assistant**: Amazon Q Developer
- **Development Environment**: Ubuntu console with Q CLI
- **LLM**: Claude (Anthropic)

## 🌟 Features

### Core Functionality
- **Pokemon Search**: Real-time search with debounced input
- **Pokemon Grid**: Browse Pokemon with pagination and sorting
- **Detailed Views**: Comprehensive Pokemon information including stats, types, and abilities
- **Navigation**: Seamless navigation between Pokemon with arrow controls
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### User Experience
- **Authentication**: Secure JWT-based login system with 2-hour token expiration
- **Dynamic Theming**: Pokemon type-based color schemes throughout the interface
- **Loading States**: Smooth loading animations and skeleton screens
- **Error Handling**: Graceful error recovery with user-friendly messages
- **Accessibility**: Full keyboard navigation and screen reader support

### Technical Features
- **Performance Optimized**: Image optimization, lazy loading, and React Query caching
- **SEO Ready**: Dynamic meta tags, Open Graph, and structured data
- **Type Safe**: Full TypeScript implementation with strict type checking
- **Tested**: Comprehensive unit test coverage with Jest and React Testing Library

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Pokemon API server running (see server documentation)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pokemon-app/client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Configure API endpoints and other environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── pokemons/          # Pokemon list and detail pages
│   ├── logout/            # Logout functionality
│   └── globals.css        # Global styles and theme
├── components/            # Reusable UI components
│   ├── common/           # Generic components (SearchField, PokemonBox)
│   ├── pokemon/          # Pokemon-specific components
│   └── providers/        # Context providers
├── hooks/                # Custom React hooks
│   ├── pokemon/         # Pokemon-related hooks
│   └── auth/            # Authentication hooks
├── types/               # TypeScript type definitions
├── utils/               # Utility functions and helpers
│   ├── api/            # API service layer
│   ├── auth/           # Authentication utilities
│   └── typeColors.ts   # Pokemon type color mapping
└── context/            # React context providers
```

## 🎨 Design System

### Color Palette
- **Primary**: #DC0A2D (Pokemon Red)
- **Type Colors**: Dynamic colors for each Pokemon type (Fire: #F57D31, Water: #6493EB, etc.)
- **Grayscale**: Consistent grayscale palette for text and backgrounds

### Typography
- **Font**: Poppins for clean, modern readability
- **Hierarchy**: Defined text sizes from headline to caption
- **Responsive**: Scales appropriately across devices

### Components
- **Cards**: Clean white cards with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Forms**: Accessible form inputs with proper labeling
- **Navigation**: Intuitive navigation with clear visual feedback

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Coverage
- **Components**: Unit tests for all interactive components
- **Utilities**: Tests for helper functions and utilities
- **Accessibility**: Keyboard navigation and screen reader tests
- **User Interactions**: Click, form input, and navigation tests

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate test coverage report

## 🌐 API Integration

The application integrates with a Pokemon API server that provides:
- **Authentication**: JWT-based login system
- **Pokemon List**: Paginated Pokemon data with sorting
- **Pokemon Search**: Real-time search functionality
- **Pokemon Details**: Comprehensive Pokemon information

### API Endpoints
- `POST /login` - User authentication
- `POST /pokemons` - Get Pokemon list with pagination
- `GET /pokemons/search/{name}` - Search Pokemon by name
- `GET /pokemons/{id}` - Get Pokemon details

## 📱 Responsive Design

### Breakpoints
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

### Features
- **Mobile-first**: Designed for mobile and enhanced for larger screens
- **Touch-friendly**: Appropriate touch targets and gestures
- **Flexible Grid**: Responsive Pokemon grid (1-3 columns)
- **Adaptive Navigation**: Navigation adapts to screen size

## ♿ Accessibility

### WCAG Compliance
- **AA Level**: Meets WCAG 2.1 AA standards
- **Color Contrast**: Sufficient contrast ratios throughout
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Readers**: Proper ARIA labels and semantic HTML

### Features
- **Focus Management**: Clear focus indicators
- **Alternative Text**: Descriptive alt text for images
- **Form Labels**: Proper form labeling and descriptions
- **Skip Links**: Navigation skip links for screen readers

## 🚀 Performance

### Optimizations
- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Route-based and component-based splitting
- **Caching**: React Query for intelligent data caching
- **Bundle Analysis**: Optimized bundle size

### Metrics
- **Lighthouse Score**: 90+ performance score
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1

## 🔒 Security

### Authentication
- **JWT Tokens**: Secure token-based authentication
- **Token Expiration**: 2-hour token lifecycle
- **Protected Routes**: Server-side route protection
- **Secure Storage**: HTTP-only cookies for token storage

## 📚 Learn More

### Technologies Used
- **[Next.js](https://nextjs.org/)** - React framework with app router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[React Query](https://tanstack.com/query)** - Data fetching and caching
- **[Jest](https://jestjs.io/)** - JavaScript testing framework
- **[React Testing Library](https://testing-library.com/)** - Component testing utilities

### Documentation
- [Design System](./docs/design-system.md)
- [API Documentation](./docs/api.md)
- [Testing Guide](./docs/testing.md)
- [Deployment Guide](./docs/deployment.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using modern web technologies for an exceptional Pokemon discovery experience.
