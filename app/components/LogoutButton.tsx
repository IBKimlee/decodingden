'use client';

import { supabase } from '@/lib/supabase';

export default function LogoutButton() {
  const handleLogout = () => {
    // Clear all localStorage
    localStorage.removeItem('decodingden_student');
    localStorage.removeItem('decodingden_auth');

    // Sign out from Supabase (don't wait for it)
    supabase.auth.signOut();

    // Redirect to login immediately
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 z-50 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}