import { Router } from 'express';
import { storedFileController } from '../../modules/stored-file/controllers/stored-file.controller';
import { StoredFileDownloadSchema } from '../../modules/stored-file/domain/schemas/stored-file-download.schema';
import { zodValidateMiddleware } from '../../shared/middlewares/zod-validate.middleware';

export const storedFileRouter: Router = Router();

storedFileRouter.get(
  '/files/:uuid',
  zodValidateMiddleware(StoredFileDownloadSchema),
  storedFileController.download,
);

storedFileRouter.get(
  '/files/public/:uuid',
  zodValidateMiddleware(StoredFileDownloadSchema),
  storedFileController.downloadPublic,
);
