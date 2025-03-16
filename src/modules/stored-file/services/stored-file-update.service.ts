import { prisma } from '../../../infra/database/prisma.service';
import { FileAdapter } from '../../../infra/file-system/adapters/file-adapter';
import { awsFileSystem } from '../../../infra/file-system/implementations/aws.file-system';
import { NotFoundException } from '../../../shared/exceptions';
import { generateFileName } from '../../../shared/utils/file';
import { hashMd5 } from '../../../shared/utils/hash';
import { StoredFileUpdateDto } from '../domain/dto/stored-file-update.dto';
import { StoredFileEntity } from '../domain/entities/stored-file.entity';

class StoredFileUpdateService {
  async execute(
    uuid: string,
    file: FileAdapter,
    dto: StoredFileUpdateDto,
  ): Promise<StoredFileEntity> {
    const storedFile = await prisma.storedFile.findUnique({
      where: { uuid: uuid },
    });

    if (!storedFile) throw new NotFoundException('Arquivo não encontrado!');

    const storedName = generateFileName(dto.name ?? file.name);

    await awsFileSystem.delete(
      `${storedFile.relativePath}/${storedFile.storedName}`,
    );

    await awsFileSystem.put({
      name: storedName,
      relativePath: dto.relativePath ?? storedFile.relativePath,
      content: file.content,
      length: file.length,
      contentType: file.contentType,
    });

    const updatedStoredFile = await prisma.storedFile.update({
      where: { uuid: uuid },
      data: {
        alt: dto.alt,
        checksum: await hashMd5(file.content),
        originalName: file.name,
        storedName: storedName,
        relativePath: dto.relativePath,
        contentType: file.contentType,
        isPublic: dto.isPublic,
      },
    });

    return new StoredFileEntity(updatedStoredFile);
  }
}

export const storedFileUpdateService = new StoredFileUpdateService();
