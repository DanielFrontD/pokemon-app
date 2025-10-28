const express = require('express');
const userController = require('./controllers/user.controller');
const pokemonController = require('./controllers/pokemon.controller');
const { authenticateToken } = require('./middlewares/auth.middleware');

const router = express.Router();

// User routes
router.post('/login', userController.login);
router.post('/logout', authenticateToken, userController.logout);

// Pokemon routes (protected)
router.post('/pokemons', authenticateToken, pokemonController.getPokemons);
router.get('/pokemons/search/:name', authenticateToken, pokemonController.searchPokemon);
router.get('/pokemons/:id', authenticateToken, pokemonController.getPokemonById);

module.exports = router;
