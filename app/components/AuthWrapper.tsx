'use client';

import { useAuth } from '../contexts/AuthContext';
import PasswordLogin from './PasswordLogin';
import LogoutButton from './LogoutButton';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

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