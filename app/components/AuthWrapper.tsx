'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import LogoutButton from './LogoutButton';

// Public pages - no login required
const PUBLIC_ROUTES = ['/login', '/', '/research', '/teaching-tools'];

// Teacher-only pages
const TEACHER_ROUTES = ['/teacher', '/admin', '/pending-approval'];

// Student-only pages
const STUDENT_ROUTES = ['/student'];

function isTeacherRoute(pathname: string): boolean {
  return TEACHER_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

function isStudentRoute(pathname: string): boolean {
  return STUDENT_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'));
}

function isPublicRoute(pathname: string): boolean {
  return PUBLIC_ROUTES.includes(pathname);
}

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { userRole, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  // Handle redirects after auth loading completes
  useEffect(() => {
    if (isLoading) return;

    // Teacher routes require teacher login
    if (isTeacherRoute(pathname) && userRole !== 'teacher') {
      router.push('/');
      return;
    }

    // Student routes require student login
    if (isStudentRoute(pathname) && userRole !== 'student') {
      router.push('/');
      return;
    }
  }, [isLoading, userRole, pathname, router]);

  // Public routes - always accessible
  if (isPublicRoute(pathname)) {
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

  // Teacher route but not logged in as teacher
  if (isTeacherRoute(pathname) && userRole !== 'teacher') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softSand">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Student route but not logged in as student
  if (isStudentRoute(pathname) && userRole !== 'student') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-softSand">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  // Authorized - show logout button and content
  return (
    <>
      <LogoutButton />
      {children}
    </>
  );
}