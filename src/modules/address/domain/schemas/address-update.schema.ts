import { z } from 'zod';

export const AddressUpdateSchema = z.object({
  state: z
    .string({
      message: 'Estado inválido!',
    })
    .optional(),
  city: z
    .string({
      message: 'Cidade inválido!',
    })
    .optional(),
  street: z
    .string({
      message: 'Logradouro inválido!',
    })
    .optional(),
  neighborhood: z
    .string({
      message: 'Bairro inválido!',
    })
    .optional(),
  complement: z
    .string({
      message: 'Complemento inválido!',
    })
    .optional(),
});
