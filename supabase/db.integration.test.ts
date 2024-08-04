// db.integration.test.ts
import { supabase } from './supabase';

describe('Supabase Database Integration Tests', () => {
  let insertedDataId: string;

  test('Insert data into table', async () => {
    const { data, error } = await supabase
      .from('your_table_name')
      .insert([{ column1: 'value1', column2: 'value2' }])
      .single();

    console.log('Insert Error:', error); // Log the error

    expect(error).toBeNull();
    expect(data).toBeDefined();
    insertedDataId = data.id; // Assuming 'id' is the primary key
  });

  test('Fetch inserted data from table', async () => {
    const { data, error } = await supabase
      .from('your_table_name')
      .select('*')
      .eq('id', insertedDataId)
      .single();

    console.log('Fetch Error:', error); // Log the error

    expect(error).toBeNull();
    expect(data).toBeDefined();
    expect(data.column1).toBe('value1');
    expect(data.column2).toBe('value2');
  });
});
