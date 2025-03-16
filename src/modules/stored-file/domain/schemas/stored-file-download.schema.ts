import { z } from 'zod';

export const StoredFileDownloadSchema = z.object({
  params: z.object({
    uuid: z.string({ message: 'UUID inválido!' }),
  }),
});
