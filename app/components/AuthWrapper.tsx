'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import PasswordLogin from './PasswordLogin';
import LogoutButton from './LogoutButton';

// Pages that don't require the legacy password protection
const PUBLIC_ROUTES = ['/login'];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, userRole, isLoading } = useAuth();
  const pathname = usePathname();

  // Allow public routes without authentication
  if (PUBLIC_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softSand">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-oceanBlue mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is logged in via Supabase (teacher or student), bypass legacy password
  if (userRole === 'teacher' || userRole === 'student') {
    return <>{children}</>;
  }

  // Otherwise, check legacy auth
  if (!isAuthenticated) {
    return <PasswordLogin />;
  }

  return (
    <>
      <LogoutButton />
      {children}
    </>
  );
}