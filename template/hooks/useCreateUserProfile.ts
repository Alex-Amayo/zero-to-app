import { useMutation } from '@tanstack/react-query';
import { createUserProfile } from '../api/mutations/createUserProfile';

/**
 * Create a user profile in the db
 * @param user_id The user ID
 * @param first_name The user's first name
 * @param last_name The user's last name
 */

export const useCreateUserProfile = (user_id: string, first_name: string, last_name: string) => {
  return useMutation<void, Error>({
    mutationFn: () => createUserProfile(user_id, first_name, last_name),
  });
};
