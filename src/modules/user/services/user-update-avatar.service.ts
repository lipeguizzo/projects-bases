import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { StoredFileCreateService } from 'src/modules/stored-file/services/stored-file-create.service';
import { StoredFileUpdateService } from 'src/modules/stored-file/services/stored-file-update.service';
import { UserRequest } from 'src/shared/types/user-request';
import { generateFileAdapterFromUploadFile } from 'src/shared/utils/file';
import { UserEntity } from '../domain/entities/user.entity';
import { EFolder } from 'src/infra/file-system/enums/folder.enum';

@Injectable()
export class UserUpdateAvatarService {
  constructor(
    private prisma: PrismaService,
    private storedFileCreateService: StoredFileCreateService,
    private storedFileUpdateService: StoredFileUpdateService,
  ) {}
  async execute(
    id: number,
    file: Express.Multer.File,
    userRequest: UserRequest,
  ): Promise<UserEntity> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
        organizationId: userRequest?.organizationId ?? undefined,
        companyId: userRequest?.companyId ?? undefined,
        deletedAt: null,
      },
      include: {
        role: true,
        organization: true,
        company: true,
        avatar: true,
      },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado!');

    const storedFile = !user?.avatar
      ? await this.storedFileCreateService.execute(
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
            relativePath: `${EFolder.USERS}/${user.id}`,
            isPublic: true,
          },
        )
      : await this.storedFileUpdateService.execute(
          user?.avatar?.uuid,
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
          },
        );

    const updatedUser = await this.prisma.user.update({
      data: {
        avatar: !user?.avatar
          ? {
              connect: {
                id: storedFile.id,
              },
            }
          : {
              update: {
                id: storedFile.id,
              },
            },
      },
      where: { id: user?.id },
      include: {
        avatar: true,
      },
    });
    return new UserEntity(updatedUser);
  }
}
