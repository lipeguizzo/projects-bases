import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { FileAdapter } from 'src/infra/file-system/adapters/file-adapter';
import { AwsFileSystem } from 'src/infra/file-system/implementations/aws.file-system';

@Injectable()
export class StoredFileDownloadService {
  constructor(
    private prisma: PrismaService,
    private awsFileSystem: AwsFileSystem,
  ) {}
  async execute(uuid: string, isPublic?: boolean): Promise<FileAdapter> {
    const storedFile = await this.prisma.storedFile.findUnique({
      where: { uuid: uuid, isPublic: isPublic },
    });

    if (!storedFile) throw new NotFoundException('Arquivo não encontrado!');

    return await this.awsFileSystem.get(
      storedFile.relativePath,
      storedFile.storedName,
    );
  }
}
