import { create } from 'zustand';
import { supabase } from '../../supabase/supabase';
import { AuthState, AuthActions } from './authTypes';
import { Session as SupabaseSession, AuthChangeEvent } from '@supabase/supabase-js';
import { router } from 'expo-router';

// Authentication store with Zustand

// Timeout amount for error messages in milliseconds
const ERRORTIMEOUT = 5000;

// Redirect URL for password reset
const RESETPASSWORDREDIRECT = 'https://example.com';

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

  // Check if the user is authenticated
  isAuthenticated: (): boolean => {
    return useAuthStore.getState().session !== null;
  },

  // Clears auth store state
  clearAuthState: () => {
    set({
      user: null,
      session: null,
      loading: false,
      error: null,
    });
  },

  // Set auth error message
  setAuthError: (errorMessage: string) => {
    set({ error: errorMessage });
    //clear the auth state after 5 seconds
    setTimeout(() => {
      useAuthStore.getState().clearAuthState();
    }, ERRORTIMEOUT);
  },

  // Log out function
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

  // Sign up function
  signUpWithEmail: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signUp({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });
    // If there is an error, clear the auth state after 5 seconds
    if (error) {
      setTimeout(() => {
        useAuthStore.getState().clearAuthState();
      }, ERRORTIMEOUT);
    }
  },

  // Log in function
  logInWithEmail: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    set({
      user: data.user ?? null,
      session: data.session ?? null,
      loading: false,
      error: error?.message || null,
    });

    // If login is successful, push the /core route
    if (data.user) {
      router.push('/core');
    }

    // If there is an error, clear the auth state after 5 seconds
    if (error) {
      setTimeout(() => {
        useAuthStore.getState().clearAuthState();
      }, ERRORTIMEOUT);
    }
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

  // Reset password with email function
  resetPasswordWithEmail: async (email: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: RESETPASSWORDREDIRECT,
    });
    set({ loading: false, error: error?.message || null });
    // If there is an error, clear the auth state after 5 seconds
    if (error) {
      setTimeout(() => {
        useAuthStore.getState().clearAuthState();
      }, ERRORTIMEOUT);
    }
  },

  // Change password , should only be called in an authenticated route
  changePassword: async (newPassword: string) => {
    set({ loading: true });
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    set({ loading: false, error: error?.message || null });
    // If there is an error, clear the auth state after 5 seconds
    if (error) {
      setTimeout(() => {
        useAuthStore.getState().clearAuthState();
      }, ERRORTIMEOUT);
    }
  },
}));

export default useAuthStore;
