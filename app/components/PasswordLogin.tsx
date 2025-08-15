'use client';

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function PasswordLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!login(password)) {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-warmBeige to-creamyWhite">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-oceanBlue mb-2">Decoding Den</h1>
          <p className="text-gray-600">Please enter the password to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-oceanBlue focus:border-oceanBlue"
              placeholder="Enter password"
              required
              autoFocus
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-oceanBlue text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors font-medium"
          >
            Enter Site
          </button>
        </form>
        
        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Science of Reading-based Phonics Education Platform</p>
        </div>
      </div>
    </div>
  );
}