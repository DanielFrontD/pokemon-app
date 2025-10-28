import Cookies from 'js-cookie';

const TOKEN_KEY = 'pokemon_token';

export const tokenStorage = {
  set: (token: string) => {
    Cookies.set(TOKEN_KEY, token, { expires: 2/24 }); // 2 hours
  },
  get: () => {
    return Cookies.get(TOKEN_KEY);
  },
  remove: () => {
    Cookies.remove(TOKEN_KEY);
  },
};
