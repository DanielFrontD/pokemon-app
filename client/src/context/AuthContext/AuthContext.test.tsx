import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from './index';

// Test component to use the hook
function TestComponent() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <div>
      <div data-testid="authenticated">{isAuthenticated.toString()}</div>
      <div data-testid="loading">{isLoading.toString()}</div>
    </div>
  );
}

describe('AuthContext', () => {
  it('provides initial auth state after loading', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });

    expect(screen.getByTestId('authenticated')).toHaveTextContent('false');
  });
});
