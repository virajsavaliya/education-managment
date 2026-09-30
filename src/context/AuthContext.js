'use client';

import React, { createContext, useContext } from 'react';
import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext();

function AuthProviderWrapper({ children }) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  
  // Extract user details.
  // NextAuth exposes token fields (role, id) on session.user if configured in callbacks.
  const user = session?.user ? {
    id: session.user.id,
    name: session.user.name,
    email: session.user.email,
    role: session.user.role || 'STUDENT'
  } : null;

  const login = async (email, password) => {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      throw new Error(result.error);
    }
    return result;
  };

  const register = async (name, email, phone, password) => {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }
    return data;
  };

  const logout = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      <AuthProviderWrapper>{children}</AuthProviderWrapper>
    </SessionProvider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
