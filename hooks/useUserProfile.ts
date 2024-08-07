import { useQuery, useMutation } from '@tanstack/react-query';
import { createUserProfile, fetchUserProfile } from '../queries/userProfile';

type UserProfile = {
  user_id: string;
  first_name: string;
  last_name: string;
};

export const useUserProfile = (user_id: string) => {
  return useQuery<UserProfile, Error>({
    queryKey: ['userProfile', user_id],
    queryFn: () => fetchUserProfile(user_id),
  });
};

export const useCreateUserProfile = (user_id: string, first_name: string, last_name: string) => {
  return useMutation<void, Error>({
    mutationFn: () => createUserProfile(user_id, first_name, last_name),
  });
};
