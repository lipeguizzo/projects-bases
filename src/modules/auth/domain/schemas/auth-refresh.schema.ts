import { z } from 'zod';

export const AuthRefreshSchema = z.object({
  body: z.object({
    refreshToken: z.string({
      message: 'Refresh Token inválido!',
    }),
  }),
});
