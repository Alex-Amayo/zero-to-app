// userProfile.test.ts
import { createUserProfile, fetchUserProfile } from '../../queries/userProfile';
import { supabaseTestClient } from '../../supabase/supabaseTestClient';

// Integration tests for the UserProfile hooks

export const testProfile = {
  user_id: 'e403e6d2-cf79-4904-bded-b084240902b7',
  first_name: 'Test',
  last_name: 'User',
};

describe('UserProfile Integration Tests', () => {
  const supabase = supabaseTestClient;

  beforeEach(async () => {
    // Deletes the test profile if it exists before each test
    await supabase.from('profiles').delete().eq('user_id', testProfile.user_id);
  });

  afterEach(async () => {
    // Deletes the test profile if it exists after each test
    await supabase.from('profiles').delete().eq('user_id', testProfile.user_id);
  });

  it('should create a user profile successfully', async () => {
    // Act
    await createUserProfile(testProfile.user_id, testProfile.first_name, testProfile.last_name);

    // Assert
    const { data, error } = await supabase
      .from('profiles')
      .select('user_id, first_name, last_name')
      .eq('user_id', testProfile.user_id)
      .single();

    expect(error).toBeNull();
    expect(data).toEqual(testProfile);
  });

  it('should fetch a user profile successfully', async () => {
    // Arrange
    await createUserProfile(testProfile.user_id, testProfile.first_name, testProfile.last_name);

    // Act
    const profile = await fetchUserProfile(testProfile.user_id);

    // Assert
    expect(profile).toEqual(testProfile);
  });
});
