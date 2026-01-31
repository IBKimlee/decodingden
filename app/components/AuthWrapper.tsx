'use client';

import { usePathname } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

// Pages that are fully public (no auth required)
const PUBLIC_ROUTES = ['/login', '/'];

// Pages that require teacher auth
const TEACHER_ROUTES = ['/teacher'];

// Pages that require student auth
const STUDENT_ROUTES = ['/student'];

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { userRole, isLoading } = useAuth();
  const pathname = usePathname();

  // Always allow public routes
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

  // If logged in as teacher or student, show logout button and content
  if (userRole === 'teacher' || userRole === 'student') {
    return (
      <>
        <LogoutButton />
        {children}
      </>
    );
  }

  // For all other pages (like /decoding-den), allow access without auth
  // Individual pages handle their own auth requirements
  return <>{children}</>;
}