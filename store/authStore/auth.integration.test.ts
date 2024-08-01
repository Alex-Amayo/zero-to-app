import { createClient, AuthApiError } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { describe, it, expect } from '@jest/globals';

/*
This file is an integration test for Supabase authentication
This test requires you to disable email confirmations on in your Supabase dashboard auth/providers.
It will test the following: sign up, sign in, and sign out.a
*/

// Load environment variables from .env file
config();

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const randomNumber = Math.floor(Math.random() * 1000);
const testEmail = `test.${randomNumber}@test.com`;
const testPassword = 'password';

describe('Supabase Authentication Integration Tests', () => {
  it('should handle signup, sign-in, and sign-out correctly', async () => {
    let skipTest = false;

    try {
      // Attempt to sign up
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: testEmail,
        password: testPassword,
      });

      if (signUpError) {
        if (signUpError.message.includes('Email already exists')) {
          console.warn('Email already exists, skipping signup.');
          skipTest = true;
        } else if (signUpError.message.includes('Email rate limit exceeded')) {
          console.warn('Email rate limit exceeded, skipping signup.');
          skipTest = true;
        } else {
          throw signUpError; // Rethrow if it's another error
        }
      } else {
        // Check if sign up was successful
        expect(signUpData?.user).toBeDefined();

        // Proceed with sign in
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testEmail,
          password: testPassword,
        });

        // Check if sign in was successful
        expect(signInError).toBeNull();
        expect(signInData?.user).toBeDefined();
        expect(signInData?.session).toBeDefined();

        // Proceed with sign out
        const { error: signOutError } = await supabase.auth.signOut();

        // Check if sign out was successful
        expect(signOutError).toBeNull();
      }
    } catch (error) {
      if (error instanceof AuthApiError) {
        if (error.message.includes('Email already exists')) {
          console.warn('Email already exists, skipping signup.');
          skipTest = true;
        } else if (error.message.includes('Email rate limit exceeded')) {
          console.warn('Email rate limit exceeded, skipping signup.');
          skipTest = true;
        } else {
          throw error; // Rethrow if it's not a rate limit or existing email error
        }
      } else {
        throw error; // Rethrow if it's not an AuthApiError
      }
    }

    if (skipTest) {
      // Skip the remaining part of the test if necessary
      expect(true).toBe(true); // Pass the test as a placeholder
    }
  });
});
