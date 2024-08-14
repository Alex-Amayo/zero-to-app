/**
 * This hook is used to fetch user profile data.
 * @param {string} user_id The user ID
 * @returns {object} The user profile data
 */

import { useQuery } from '@tanstack/react-query';
import { fetchUserProfile } from '../api/queries/fetchUserProfile';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
};

export const useFetchUserProfile = (user_id: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', user_id],
    queryFn: () => fetchUserProfile(user_id),
  });
};
