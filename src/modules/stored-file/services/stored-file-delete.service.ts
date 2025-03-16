import { prisma } from '../../../infra/database/prisma.service';
import { awsFileSystem } from '../../../infra/file-system/implementations/aws.file-system';
import { NotFoundException } from '../../../shared/exceptions';

class StoredFileDeleteService {
  async execute(uuid: string): Promise<void> {
    const storedFile = await prisma.storedFile.findUnique({
      where: { uuid },
    });

    if (!storedFile) throw new NotFoundException('Arquivo não encontrado!');

    await awsFileSystem.delete(
      `${storedFile.relativePath}/${storedFile.storedName}`,
    );

    await prisma.storedFile.delete({ where: { uuid } });
  }
}
export const storedFileDeleteService = new StoredFileDeleteService();
