import { act, renderHook } from '@testing-library/react-hooks';
import { createTestUser, setupTests, wrapper } from './testUtils';
import { useCreateUserProfile } from '../useCreateUserProfile';
import { useFetchUserProfile } from '../useFetchUserProfile';

/**
 * This test suite tests the useCreateUserProfile and useFetchuserProfile hooks.
 */

describe('useUserProfile and useCreateUserProfile', () => {
  const { user_id, first_name, last_name } = createTestUser();

  // Setup the testing environment
  setupTests();

  it('creates a user profile and then fetches it', async () => {
    // Create the user profile
    const { result: createResult } = renderHook(
      () => useCreateUserProfile(user_id, first_name, last_name),
      { wrapper },
    );

    await act(async () => {
      await createResult.current.mutateAsync();
    });

    // Fetch the user profile
    const { result: fetchResult, waitFor: waitForFetch } = renderHook(
      () => useFetchUserProfile(user_id),
      { wrapper },
    );

    await waitForFetch(() => fetchResult.current.isSuccess);

    // Assert that the fetched profile matches the created profile
    expect(fetchResult.current.data).toEqual({
      user_id,
      first_name,
      last_name,
    });
  });
});
