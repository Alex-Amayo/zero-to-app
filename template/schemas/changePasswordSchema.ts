import { z } from 'zod';

export const changePasswordSchema = z
  .object({
    newPassword: z.string().min(1, {
      message: 'New password is required.',
    }),
    newPasswordConfirmation: z.string().min(1, {
      message: 'Password confirmation is required.',
    }),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'Make sure your passwords match.',
    path: ['passwordConfirmation'],
  });

export type changePasswordSchemaValues = z.infer<typeof changePasswordSchema>;
