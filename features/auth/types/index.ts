export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  isGuest?: boolean;
}

export interface AuthSession {
  user: User;
  token: string;
  rememberMe: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterCredentials {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}
