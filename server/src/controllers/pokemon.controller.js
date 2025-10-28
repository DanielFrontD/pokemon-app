const pokemonService = require('../services/pokemon.service');

const getPokemons = async (req, res) => {
  const { pageSize, pageNumber, sortCriteria } = req.body;

  // Validation
  if (!pageSize || !pageNumber || !sortCriteria) {
    return res.status(400).json({ error: 'pageSize, pageNumber, and sortCriteria are required' });
  }

  if (typeof pageSize !== 'number' || typeof pageNumber !== 'number' || pageSize <= 0 || pageNumber <= 0) {
    return res.status(400).json({ error: 'pageSize and pageNumber must be positive numbers' });
  }

  if (!['number', 'name'].includes(sortCriteria)) {
    return res.status(400).json({ error: 'sortCriteria must be "number" or "name"' });
  }

  try {
    const pokemons = await pokemonService.getPokemons(pageSize, pageNumber, sortCriteria);
    
    res.status(200).json({
      pokemons,
      pageSize,
      pageNumber,
      sortCriteria
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const searchPokemon = async (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ error: 'Pokemon name is required' });
  }

  try {
    const pokemons = await pokemonService.searchPokemon(name);
    
    res.status(200).json({
      pokemons
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getPokemonById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'Pokemon ID is required' });
  }

  try {
    const pokemon = await pokemonService.getPokemonById(id);
    
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getPokemons,
  searchPokemon,
  getPokemonById
};
