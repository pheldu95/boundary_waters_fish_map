import axios from 'axios'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from './lib/types'
import LoadingSpinner from './components/placeholders/LoadingSpinner'


interface AuthState {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean;
}

const AuthContext = createContext<AuthState | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get<User>('/api/me');
      setUser(response.data);
    } catch (error) {
      setUser(null);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    )
  }

  const login = async (email: string, password: string) => {
    const response = await axios.post(
      '/api/login',
      {
        email: email,
        password: password
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );


    const userIri = response?.headers['location'];
    console.log('Login successful:', userIri);

  }

  const logout = async () => {
    await axios.post('/api/logout');
    setIsAuthenticated(false)
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, isLoading }}>
      {/* <div>
        {user?.email}
      </div> */}
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}