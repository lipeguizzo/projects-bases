import { Response } from 'express';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { storedFileDownloadService } from '../services/stored-file-download.service';
import { FileAdapter } from '../../../infra/file-system/adapters/file-adapter';
import { generateJsonError } from '../../../shared/utils/error';

class StoredFileController {
  async download(request: IRequest, response: Response) {
    try {
      const uuid: string = request.params.uuid;
      const file: FileAdapter = await storedFileDownloadService.execute(uuid);
      response.set({
        'Content-Type': file.contentType,
        'Content-Length': file.length,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      });
      response.status(200).send(file.content);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async downloadPublic(request: IRequest, response: Response) {
    try {
      const uuid: string = request.params.uuid;
      const file: FileAdapter = await storedFileDownloadService.execute(
        uuid,
        true,
      );
      response.set({
        'Content-Type': file.contentType,
        'Content-Length': file.length,
        'Content-Disposition': `attachment; filename="${file.name}"`,
      });
      response.status(200).send(file.content);
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const storedFileController = new StoredFileController();
