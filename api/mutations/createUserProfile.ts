import { supabase } from '../../supabase/supabase';

/**
 * Create a new user profile in the database.
 *
 * @param user_id
 * @param first_name
 * @param last_name
 */

export const createUserProfile = async (
  user_id: string,
  first_name: string,
  last_name: string,
): Promise<void> => {
  const { error } = await supabase.from('profiles').insert([
    {
      user_id: user_id,
      first_name: first_name,
      last_name: last_name,
    },
  ]);

  if (error) {
    throw new Error(error.message);
  }
};
