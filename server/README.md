# Pokemon API

A Node.js REST API that provides Pokemon data with JWT authentication, built with Express.js and SQLite.

## Built with AI Assistance

This application was developed using **Generative AI** assistance:
- **AI Assistant**: Amazon Q Developer
- **Development Environment**: Ubuntu console with Q CLI
- **LLM**: Claude (Anthropic)

## Features

- **JWT Authentication** with 2-hour token expiration and reuse
- **Pokemon Data Integration** with PokeAPI
- **SQLite Database** for user management
- **Comprehensive Testing** with Jest
- **RESTful Endpoints** for Pokemon operations

## Tech Stack

- Node.js
- Express.js
- SQLite3
- JWT (jsonwebtoken)
- bcrypt
- axios
- Jest (testing)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3001`

## Default User

A default user is automatically created:
- **Username**: `admin`
- **Password**: `pokemon123`

Credentials are also available in `user.txt` file.

## API Endpoints

### Authentication

#### Login
```http
POST /login
Content-Type: application/json

{
  "username": "admin",
  "password": "pokemon123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Logout
```http
POST /logout
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "message": "Logout successful"
}
```

### Pokemon Endpoints (Require Authentication)

All Pokemon endpoints require the JWT token in the Authorization header:
```
Authorization: Bearer YOUR_JWT_TOKEN
```

#### Get Pokemon List
```http
POST /pokemons
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "pageSize": 9,
  "pageNumber": 1,
  "sortCriteria": "number"
}
```

**Response:**
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

#### Search Pokemon by Name
```http
GET /pokemons/search/pikachu
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
```json
{
  "pokemons": [
    {
      "name": "pikachu",
      "number": 25,
      "image": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
    }
  ]
}
```

#### Get Pokemon Details by ID
```http
GET /pokemons/25
Authorization: Bearer YOUR_JWT_TOKEN
```

**Response:**
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

## Usage Example

1. **Login to get JWT token:**
```bash
curl -X POST http://localhost:3001/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "pokemon123"}'
```

2. **Use token to get Pokemon data:**
```bash
curl -X POST http://localhost:3001/pokemons \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"pageSize": 9, "pageNumber": 1, "sortCriteria": "number"}'
```

3. **Search for specific Pokemon:**
```bash
curl -X GET http://localhost:3001/pokemons/search/pikachu \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Development

### Run in development mode:
```bash
npm run dev
```

### Run tests:
```bash
npm test
```

### Run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
├── src/
│   ├── controllers/          # Request handlers
│   ├── services/            # Business logic
│   ├── middlewares/         # Authentication middleware
│   ├── database/
│   │   ├── entities/        # Database models
│   │   └── connection.js    # SQLite connection
│   ├── constants.js         # Application constants
│   └── index.js            # Routes definition
├── tests/                  # Unit tests
├── docs/                   # Documentation
├── app.js                  # Express server setup
├── user.txt               # Default user credentials
└── README.md              # This file
```

## Authentication Flow

1. User logs in with credentials
2. Server validates password and generates JWT token (2-hour expiration)
3. Token is stored in database for reuse
4. Subsequent requests include token in Authorization header
5. Middleware validates token before accessing protected endpoints
6. If token expires, user must login again for new token

## Error Responses

- **400**: Bad Request (invalid input)
- **401**: Unauthorized (missing/invalid token)
- **404**: Not Found (Pokemon not found)
- **500**: Internal Server Error
