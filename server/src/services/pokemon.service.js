const axios = require('axios');
const { POKEMON_API } = require('../constants');

const getPokemons = async (pageSize, pageNumber, sortCriteria) => {
  const start = (pageNumber - 1) * pageSize;
  const end = pageSize;

  try {
    const response = await axios.get(`${POKEMON_API}/pokemon?limit=${end}&offset=${start}`);

    const pokemonPromises = response.data.results.map(async (pokemon) => {
      const pokemonDetail = await axios.get(pokemon.url);
      return {
        name: pokemon.name,
        number: pokemonDetail.data.id,
        image: pokemonDetail.data.sprites.other['official-artwork'].front_default
      };
    });

    const pokemons = await Promise.all(pokemonPromises);

    // Sort by criteria
    pokemons.sort((a, b) => {
      if (sortCriteria === 'number') {
        return a.number - b.number;
      } else if (sortCriteria === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return pokemons;
  } catch (error) {
    throw new Error('Error fetching Pokemon data');
  }
};

const searchPokemon = async (name) => {
  try {
    const response = await axios.get(`${POKEMON_API}/pokemon/${name.toLowerCase()}`);

    return [{
      name: response.data.name,
      number: response.data.id,
      image: response.data.sprites.other['official-artwork'].front_default
    }];
  } catch (error) {
    throw new Error('Pokemon not found');
  }
};

const getPokemonById = async (id) => {
  try {
    const response = await axios.get(`${POKEMON_API}/pokemon/${id}`);
    const data = response.data;

    const stats = {};
    data.stats.forEach(stat => {
      stats[stat.stat.name] = stat.base_stat;
    });

    return {
      name: data.name,
      id: data.id,
      image: data.sprites.other['official-artwork'].front_default,
      types: data.types.map(type => type.type.name),
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.map(ability => ability.ability.name),
      stats
    };
  } catch (error) {
    throw new Error('Pokemon not found');
  }
};

module.exports = {
  getPokemons,
  searchPokemon,
  getPokemonById
};
