import {
  AuthChangeEvent,
  Session as SupabaseSession,
  User as SupabaseUser,
} from '@supabase/supabase-js';

export interface AuthState {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  initialize: () => Promise<void>;
  isAuthenticated: () => boolean;
  getUserId: () => string | null;
  clearErrorState: () => void;
  setAuthError: (errorMessage: string) => void;
  signUpWithEmail: (
    email: string,
    password: string,
  ) => Promise<{
    user: SupabaseUser | null;
    session: SupabaseSession | null;
    error: string | null;
  }>;
  logInWithEmail: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  resetPasswordWithEmail: (email: string) => Promise<void>;
  changePassword: (newPassword: string) => Promise<void>;
  handleAuthStateChange: (
    callback: (event: AuthChangeEvent, session: SupabaseSession | null) => void,
  ) => void;
}
