import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z.string().email('Invalid email adress.'),
    firstName: z.string().min(1, {
      message: 'First name is required.',
    }),
    lastName: z.string().min(2, {
      message: 'Last name is required.',
    }),
    password: z.string({ required_error: 'Password is required.' }),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Make sure your passwords match',
    path: ['passwordConfirmation'],
  });

export type SignUpFormValues = z.infer<typeof signUpSchema>;
