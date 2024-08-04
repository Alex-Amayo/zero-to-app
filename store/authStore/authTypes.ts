import { Session as SupabaseSession, User as SupabaseUser } from '@supabase/supabase-js';
import { AuthChangeEvent } from '@supabase/supabase-js';

export interface AuthState {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  loading: boolean;
  error: string | null;
}

export interface AuthActions {
  initialize: () => Promise<void>;
  clearAuthState: () => void;
  setAuthError: (errorMessage: string) => void;
  signUpWithEmail: (email: string, password: string) => Promise<void>;
  logInWithEmail: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  resetPasswordWithEmail: (email: string) => Promise<void>;
  changePasswordWithEmail: (newPassword: string) => Promise<void>;
  handleAuthStateChange: (
    callback: (event: AuthChangeEvent, session: SupabaseSession | null) => void,
  ) => void;
}
