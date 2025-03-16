import { generateFileName } from '../../../shared/utils/file';
import { hashMd5 } from '../../../shared/utils/hash';
import { StoredFileCreateDto } from '../domain/dto/stored-file-create.dto';
import { StoredFileEntity } from '../domain/entities/stored-file.entity';
import { FileAdapter } from '../../../infra/file-system/adapters/file-adapter';
import { awsFileSystem } from '../../../infra/file-system/implementations/aws.file-system';
import { prisma } from '../../../infra/database/prisma.service';

class StoredFileCreateService {
  async execute(
    file: FileAdapter,
    dto: StoredFileCreateDto,
  ): Promise<StoredFileEntity> {
    const storedName = generateFileName(dto.name ?? file.name);

    await awsFileSystem.put({
      name: storedName,
      relativePath: dto.relativePath,
      content: file.content,
      length: file.length,
      contentType: file.contentType,
    });

    const createdFile = await prisma.storedFile.create({
      data: {
        alt: dto.alt,
        checksum: await hashMd5(file?.content),
        originalName: file.name,
        storedName: storedName,
        relativePath: dto.relativePath,
        contentType: file.contentType,
        isPublic: dto.isPublic,
      },
    });

    return new StoredFileEntity(createdFile);
  }
}

export const storedFileCreateService = new StoredFileCreateService();
