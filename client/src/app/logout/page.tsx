'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { authService } from '@/utils/auth/authService';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await authService.logout();
      } catch (error) {
        // Continue with logout even if API call fails
        console.error('Logout API error:', error);
      } finally {
        logout();
        router.push('/');
      }
    };

    handleLogout();
  }, [logout, router]);

  return (
    <div className="min-h-screen bg-grayscale-background flex items-center justify-center">
      <div className="text-center">
        <div className="text-headline text-grayscale-dark mb-4">
          Logging out...
        </div>
        <div className="text-body-1 text-grayscale-medium">
          Please wait while we sign you out.
        </div>
      </div>
    </div>
  );
}
