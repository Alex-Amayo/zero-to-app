import { create } from 'zustand';
import { supabase } from '../../utils/supabase'; // Ensure supabase is imported correctly
import { AuthState, AuthActions } from './authTypes';
import { Session as SupabaseSession, AuthChangeEvent } from '@supabase/supabase-js';

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  // Initialize auth state
  initialize: async () => {
    set({ loading: true });
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    set({
      session: session ?? null,
      user: session?.user ?? null,
      loading: false,
      error: error?.message || null,
    });
  },

  // Sign up function
  signUp: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });
  },

  // Log in function
  logIn: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });
  },

  // Log out function
  logOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    set({ user: null, session: null, loading: false, error: error?.message || null });
  },

  // Handle auth state changes
  handleAuthStateChange: (
    callback: (event: AuthChangeEvent, session: SupabaseSession | null) => void,
  ) => {
    supabase.auth.onAuthStateChange((event, session) => {
      set({ user: session?.user ?? null, session: session ?? null, error: null });
      if (callback) {
        callback(event, session ?? null);
      }
    });
  },
}));

export default useAuthStore;
