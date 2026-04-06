"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  User,
  AuthSession,
  LoginCredentials,
  RegisterCredentials,
} from "../types";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const SESSION_KEY = "spaces_session";

const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise((r) => setTimeout(r, 600)); // simulate network
  if (password.length < 1) throw new Error("Invalid credentials");
  // Accept any email/password for mock purposes
  const [firstName, ...rest] = email.split("@")[0].split(".");
  return {
    id: `user_${Date.now()}`,
    firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
    lastName:
      rest.length > 0 ? rest[0].charAt(0).toUpperCase() + rest[0].slice(1) : "",
    email,
  };
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Hydrate session on mount
  useEffect(() => {
    try {
      const raw =
        localStorage.getItem(SESSION_KEY) ||
        sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session: AuthSession = JSON.parse(raw);
        setUser(session.user);
      }
    } catch {}
    setIsLoading(false);
  }, []);

  const persistSession = (user: User, rememberMe: boolean) => {
    const session: AuthSession = {
      user,
      token: `mock_token_${Date.now()}`,
      rememberMe,
    };
    const store = rememberMe ? localStorage : sessionStorage;
    store.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(user);
  };

  const login = useCallback(
    async ({ email, password, rememberMe }: LoginCredentials) => {
      const user = await mockLogin(email, password);
      persistSession(user, rememberMe);
    },
    [],
  );

  const register = useCallback(async (creds: RegisterCredentials) => {
    await new Promise((r) => setTimeout(r, 600));
    const user: User = {
      id: `user_${Date.now()}`,
      firstName: creds.firstName,
      lastName: creds.lastName,
      email: creds.email,
      phone: creds.phone,
    };
    persistSession(user, false);
  }, []);

  const loginAsGuest = useCallback(() => {
    const guest: User = {
      id: `guest_${Date.now()}`,
      firstName: "Guest",
      lastName: "",
      email: "guest@spaces.app",
      isGuest: true,
    };
    persistSession(guest, false);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, loginAsGuest, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
