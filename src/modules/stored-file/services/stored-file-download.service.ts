import { prisma } from '../../../infra/database/prisma.service';
import { FileAdapter } from '../../../infra/file-system/adapters/file-adapter';
import { awsFileSystem } from '../../../infra/file-system/implementations/aws.file-system';
import { NotFoundException } from '../../../shared/exceptions';

class StoredFileDownloadService {
  async execute(uuid: string, isPublic?: boolean): Promise<FileAdapter> {
    const storedFile = await prisma.storedFile.findUnique({
      where: { uuid: uuid, isPublic: isPublic },
    });

    if (!storedFile) throw new NotFoundException('Arquivo não encontrado!');

    return await awsFileSystem.get(
      storedFile.relativePath,
      storedFile.storedName,
    );
  }
}
export const storedFileDownloadService = new StoredFileDownloadService();
