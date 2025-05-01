import { z } from 'zod';

export const AddressRegisterSchema = z.object({
  id: z.coerce.number().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  street: z.string().optional(),
  neighborhood: z.string().optional(),
  complement: z.string().optional(),
});

export type AddressRegisterData = z.infer<typeof AddressRegisterSchema>;
