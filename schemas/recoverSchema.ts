import { z } from 'zod';

export const recoverSchema = z.object({
  email: z.string().email({ message: 'Email is  invalid.' }),
});

export type recoverSchemaValues = z.infer<typeof recoverSchema>;
