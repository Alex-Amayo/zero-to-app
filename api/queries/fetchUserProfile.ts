import { supabase } from '../../supabase/supabase';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
};

/**
 * Fetches the user profile from the database based on the provided user ID.
 *
 * @param id - The ID of the user whose profile is to be fetched.
 * @returns A promise that resolves to the user's profile.
 * @throws An error if the query fails.
 */
export const fetchUserProfile = async (id: string): Promise<UserProfile> => {
  // Query the 'profiles' table to select the user profile with the given user ID
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, first_name, last_name')
    .eq('user_id', id)
    .single();

  // If there's an error with the query, throw an error with the message
  if (error) {
    throw new Error(error.message);
  }

  // Return the user profile data
  return {
    user_id: data.user_id,
    first_name: data.first_name,
    last_name: data.last_name,
  };
};
