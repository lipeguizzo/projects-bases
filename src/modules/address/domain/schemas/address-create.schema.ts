import { z } from 'zod';

export const AddressCreateSchema = z.object({
  state: z.string({
    message: 'Estado inválido!',
  }),
  city: z.string({
    message: 'Cidade inválido!',
  }),
  street: z.string({
    message: 'Logradouro inválido!',
  }),
  neighborhood: z.string({
    message: 'Bairro inválido!',
  }),
  complement: z
    .string({
      message: 'Complemento inválido!',
    })
    .optional(),
});
