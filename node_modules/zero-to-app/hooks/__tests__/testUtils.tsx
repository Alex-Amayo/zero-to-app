// This file is used to setup for the tests that use the React Query hooks
// It defines a wrapper function that provides the React Query client to the children components.

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';

// Create a new instance of the React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Turn off retries for queries
      retry: false,
    },
    mutations: {
      // Turn off retries for mutations
      retry: false,
    },
  },
});

// This wrapper is used to provide the React Query client to the hooks
export const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export const setupTests = () => {
  beforeEach(() => {
    // Clear the query client before each test
    queryClient.clear();
  });

  afterEach(() => {
    // Cancel any ongoing queries and reset the query client
    queryClient.cancelQueries();
    queryClient.resetQueries();
  });

  afterAll(() => {
    // Ensure all queries are cancelled and the query client is cleared after all tests
    queryClient.cancelQueries();
    queryClient.clear();
  });
};

// Create a test user with a random UUID
export const createTestUser = () => {
  return {
    user_id: uuidv4(),
    first_name: 'John',
    last_name: 'Doe',
  };
};
