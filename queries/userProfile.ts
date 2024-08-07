import { supabase } from '../supabase/supabase';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
};

export const fetchUserProfile = async (id: string): Promise<UserProfile> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('user_id, first_name, last_name')
    .eq('user_id', id)
    .single();
  if (error) {
    throw new Error(error.message);
  }
  return {
    user_id: data.user_id,
    first_name: data.first_name,
    last_name: data.last_name,
  };
};

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
