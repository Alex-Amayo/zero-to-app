import { supabase } from './supabase';

// Initialize Supabase client

describe('Supabase Integration Tests', () => {
  test('Insert a record and verify its existence', async () => {
    const tableName = 'test_table';
    const record = { test_data: 'Test Data' };

    // Insert a new record into the table
    const { data: insertData, error: insertError } = await supabase.from(tableName).insert([record]);

    // Log the error for debugging
    if (insertError) {
      console.error('Error inserting record:', JSON.stringify(insertError, null, 2));
      throw new Error('Failed to insert record');
    }

    // Verify the record was inserted
    const { data: selectData, error: selectError } = await supabase.from(tableName).select('*').eq('test_data', 'Test Data');

    // Log the error for debugging
    if (selectError) {
      console.error('Error selecting record:', JSON.stringify(selectError, null, 2));
      throw new Error('Failed to select record');
    }

    // Check if the record exists
    expect(selectData).toHaveLength(1);
    expect(selectData[0].test_data).toBe('Test Data');
  });
});