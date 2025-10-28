const pokemonController = require('../../src/controllers/pokemon.controller');
const pokemonService = require('../../src/services/pokemon.service');

jest.mock('../../src/services/pokemon.service');

describe('Pokemon Controller', () => {
  let req, res;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('getPokemons', () => {
    it('should return 400 if pageSize is missing', async () => {
      req.body = { pageNumber: 1, sortCriteria: 'number' };

      await pokemonController.getPokemons(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 400 if sortCriteria is invalid', async () => {
      req.body = { pageSize: 9, pageNumber: 1, sortCriteria: 'invalid' };

      await pokemonController.getPokemons(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 200 with pokemon data', async () => {
      req.body = { pageSize: 9, pageNumber: 1, sortCriteria: 'number' };
      const mockPokemons = [{ name: 'pikachu', number: 25 }];
      
      pokemonService.getPokemons.mockResolvedValue(mockPokemons);

      await pokemonController.getPokemons(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        pokemons: mockPokemons,
        pageSize: 9,
        pageNumber: 1,
        sortCriteria: 'number'
      });
    });
  });

  describe('getPokemonById', () => {
    it('should return 400 if id is missing', async () => {
      req.params = {};

      await pokemonController.getPokemonById(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it('should return 200 with pokemon data', async () => {
      req.params = { id: '25' };
      const mockPokemon = { name: 'pikachu', id: 25 };
      
      pokemonService.getPokemonById.mockResolvedValue(mockPokemon);

      await pokemonController.getPokemonById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockPokemon);
    });
  });
});
