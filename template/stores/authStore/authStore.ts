import { create } from 'zustand';
import { supabase } from '../../supabase/supabase';
import { AuthActions, AuthState } from './authTypes';
import { AuthChangeEvent, Session as SupabaseSession } from '@supabase/supabase-js';
import { router } from 'expo-router';

// Authentication store with Zustand and supabase

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

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

  getUserId: (): string | null => {
    const state = useAuthStore.getState();
    return state.user ? state.user.id : null;
  },

  isAuthenticated: (): boolean => {
    return useAuthStore.getState().session !== null;
  },

  clearErrorState: () => {
    set({ error: null });
  },

  setAuthError: (errorMessage: string) => {
    set({ error: errorMessage });
  },

  logOut: async () => {
    set({ loading: true });
    const { error } = await supabase.auth.signOut();
    set({ user: null, session: null, loading: false, error: error?.message || null });
    router.push('/auth/login');
    // Log the error if there is one
    if (error) {
      console.error('Logout error:', error.message);
    }
  },

  signUpWithEmail: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });
    if (error) {
      set({ error: error.message });
    }
    return {
      user: data.user ?? null,
      session: data.session ?? null,
      error: error?.message || null,
    };
  },

  logInWithEmail: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });
    if (error) {
      set({ error: error.message });
    }
  },

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

  resetPasswordWithEmail: async (email: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://example.com',
    });
    set({ loading: false, error: error?.message || null });
    if (error) {
      set({ error: error.message });
    }
  },

  changePassword: async (newPassword: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    set({ loading: false, error: error?.message || null });
    if (error) {
      set({ error: error.message });
    }
  },
}));

export default useAuthStore;
