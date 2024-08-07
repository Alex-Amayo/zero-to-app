// This file is used to create a Supabase client instance that is used in testing files

import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.SUPABASE_TEST_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_TEST_SERVICE_ROLE_KEY || '';

export const supabaseTestClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
