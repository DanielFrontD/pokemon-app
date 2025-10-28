import { isTokenExpired } from '../validateJWT';

describe('validateJWT', () => {
  describe('isTokenExpired', () => {
    it('returns true for expired token', () => {
      // Create a token that expired 1 hour ago
      const expiredTime = Math.floor(Date.now() / 1000) - 3600;
      const payload = { exp: expiredTime };
      const encodedPayload = btoa(JSON.stringify(payload));
      const token = `header.${encodedPayload}.signature`;
      
      expect(isTokenExpired(token)).toBe(true);
    });

    it('returns false for valid token', () => {
      // Create a token that expires in 1 hour
      const futureTime = Math.floor(Date.now() / 1000) + 3600;
      const payload = { exp: futureTime };
      const encodedPayload = btoa(JSON.stringify(payload));
      const token = `header.${encodedPayload}.signature`;
      
      expect(isTokenExpired(token)).toBe(false);
    });

    it('returns true for malformed token', () => {
      expect(isTokenExpired('invalid.token')).toBe(true);
      expect(isTokenExpired('not-a-jwt')).toBe(true);
      expect(isTokenExpired('')).toBe(true);
    });

    it('returns true for token with invalid JSON payload', () => {
      const invalidPayload = 'invalid-json';
      const token = `header.${invalidPayload}.signature`;
      
      expect(isTokenExpired(token)).toBe(true);
    });

    it('returns true for token without exp field', () => {
      const payload = { sub: 'user123' }; // No exp field
      const encodedPayload = btoa(JSON.stringify(payload));
      const token = `header.${encodedPayload}.signature`;
      
      expect(isTokenExpired(token)).toBe(true);
    });
  });
});
