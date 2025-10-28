const axios = require('axios');
const pokemonService = require('../../src/services/pokemon.service');

jest.mock('axios');

describe('Pokemon Service', () => {
  describe('searchPokemon', () => {
    it('should return pokemon data for valid name', async () => {
      const mockResponse = {
        data: {
          name: 'pikachu',
          id: 25,
          sprites: {
            other: {
              'official-artwork': {
                front_default: 'image-url'
              }
            }
          }
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await pokemonService.searchPokemon('pikachu');

      expect(result).toEqual([{
        name: 'pikachu',
        number: 25,
        image: 'image-url'
      }]);
    });

    it('should throw error for invalid pokemon name', async () => {
      axios.get.mockRejectedValue(new Error('Not found'));

      await expect(pokemonService.searchPokemon('invalid'))
        .rejects.toThrow('Pokemon not found');
    });
  });

  describe('getPokemonById', () => {
    it('should return detailed pokemon data', async () => {
      const mockResponse = {
        data: {
          name: 'pikachu',
          id: 25,
          sprites: {
            other: {
              'official-artwork': {
                front_default: 'image-url'
              }
            }
          },
          types: [{ type: { name: 'electric' } }],
          height: 4,
          abilities: [{ ability: { name: 'static' } }],
          stats: [
            { stat: { name: 'hp' }, base_stat: 35 },
            { stat: { name: 'attack' }, base_stat: 55 }
          ]
        }
      };

      axios.get.mockResolvedValue(mockResponse);

      const result = await pokemonService.getPokemonById(25);

      expect(result).toEqual({
        name: 'pikachu',
        id: 25,
        image: 'image-url',
        types: ['electric'],
        height: 4,
        abilities: ['static'],
        stats: {
          hp: 35,
          attack: 55
        }
      });
    });

    it('should throw error for invalid pokemon id', async () => {
      axios.get.mockRejectedValue(new Error('Not found'));

      await expect(pokemonService.getPokemonById(9999))
        .rejects.toThrow('Pokemon not found');
    });
  });
});
