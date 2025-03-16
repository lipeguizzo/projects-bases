import { prisma } from '../../../infra/database/prisma.service';
import { EFolder } from '../../../infra/file-system/enums/folder.enum';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { generateFileAdapterFromUploadFile } from '../../../shared/utils/file';
import { storedFileCreateService } from '../../stored-file/services/stored-file-create.service';
import { storedFileUpdateService } from '../../stored-file/services/stored-file-update.service';
import { UserEntity } from '../domain/entities/user.entity';

class UserUpdateAvatarService {
  async execute(
    id: number,
    file: Express.Multer.File,
    userRequest: UserRequest,
  ): Promise<UserEntity> {
    const user = await prisma.user.findFirst({
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
      ? await storedFileCreateService.execute(
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
            relativePath: `${EFolder.USERS}/${user.id}`,
            isPublic: true,
          },
        )
      : await storedFileUpdateService.execute(
          user?.avatar?.uuid,
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
          },
        );

    const updatedUser = await prisma.user.update({
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

export const userUpdateAvatarService = new UserUpdateAvatarService();
