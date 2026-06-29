"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  useEffect(() => {
    // Hydrate session from localStorage on initial render safely
    const storedToken = localStorage.getItem('aarvi_session_token');
    const storedRole = localStorage.getItem('aarvi_session_role');
    if (storedToken && storedRole) {
      setToken(storedToken);
      setUserRole(storedRole);
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Invalid username or password credentials.');
      const data = await res.json();

      localStorage.setItem('aarvi_session_token', data.access_token);
      localStorage.setItem('aarvi_session_role', data.role);
      setToken(data.access_token);
      setUserRole(data.role);

      router.push('/admin/dashboard');
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('aarvi_session_token');
    localStorage.removeItem('aarvi_session_role');
    setToken(null);
    setUserRole(null);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ token, userRole, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);