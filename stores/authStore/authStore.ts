import { create } from 'zustand';
import { supabase } from '../../supabase/supabase';
import { AuthState, AuthActions } from './authTypes';
import { Session as SupabaseSession, AuthChangeEvent } from '@supabase/supabase-js';
import { router } from 'expo-router';

// Authentication store with Zustand and supabase

// Timeout amount for error messages in milliseconds
const ERRORTIMEOUT = 5000;

// Redirect URL for password reset
const RESETPASSWORDREDIRECT = 'https://example.com';

const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  session: null,
  loading: false,
  error: null,

  /**
   * Initialize the auth store
   * This function checks if there is a session and sets the user and session in the store
   */
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

  /**
   * Returns the user id if the user is authenticated
   * @returns {string} user id or null if the user is not authenticated
   */
  getUserId: (): string | null => {
    const state = useAuthStore.getState();
    return state.user ? state.user.id : null;
  },

  /**
   * Checks if the user is authenticated
   * @returns {boolean} true if the user is authenticated, false otherwise
   */
  isAuthenticated: (): boolean => {
    return useAuthStore.getState().session !== null;
  },

  /**
   * Clears the auth store state
   */
  clearAuthState: () => {
    set({
      user: null,
      session: null,
      loading: false,
      error: null,
    });
  },

  /**
   * Sets an error message in the auth store
   * @param errorMessage {string} error message to be displayed
   */
  setAuthError: (errorMessage: string) => {
    set({ error: errorMessage });
    //clear the auth state after 5 seconds
    setTimeout(() => {
      useAuthStore.getState().clearAuthState();
    }, ERRORTIMEOUT);
  },

  /**
   * Logs out the user, clears the user session, and redirects to the login page.
   */
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

  /**
   * Signs up a user with email and password and sets the user and session in the store.
   * @param email {string}
   * @param password {string}
   * @returns user, session, and error data
   */
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
    // Return the user and session and error data
    return {
      user: data.user ?? null,
      session: data.session ?? null,
      error: error?.message || null,
    };
  },

  /**
   * Logs in a user with email and password and sets the user and session in the auth store.
   * @param email {string}
   * @param password {string}
   */
  logInWithEmail: async (email: string, password: string) => {
    set({ loading: true });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
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

  /**
   * Handles the auth state change and sets the user and session in the auth store.
   * @param callback {function} callback function to handle the auth state change
   */
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

  /**
   * Sends and email reset email to the user if they are registered.
   * This function does not check if the email is registered.
   * It will NOT return an error if the email is not registered.
   * @param email {string}
   * @returns error message if there is an error
   */
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

  /**
   * Changes the user password
   * This function requires the user to be authenticated
   * @param newPassword {string} new password to be set
   */
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
