import { prisma } from '../../../infra/database/prisma.service';
import { EFolder } from '../../../infra/file-system/enums/folder.enum';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { generateFileAdapterFromUploadFile } from '../../../shared/utils/file';
import { userOrganizationValidator } from '../../../shared/validators/user-organization.validator';
import { storedFileCreateService } from '../../stored-file/services/stored-file-create.service';
import { storedFileUpdateService } from '../../stored-file/services/stored-file-update.service';
import { OrganizationEntity } from '../domain/entities/organization.entity';

class OrganizationUpdateAvatarService {
  async execute(
    id: number,
    file: Express.Multer.File,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await prisma.organization.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!organization)
      throw new NotFoundException('Organização não encontrada!');

    await userOrganizationValidator(id, userRequest);

    const storedFile = !organization?.avatar
      ? await storedFileCreateService.execute(
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
            relativePath: `${EFolder.ORGANIZATIONS}/${organization.id}`,
            isPublic: true,
          },
        )
      : await storedFileUpdateService.execute(
          organization?.avatar?.uuid,
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
          },
        );

    const updatedOrganization = await prisma.organization.update({
      data: {
        avatar: !organization?.avatar
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
      where: { id: organization?.id },
      include: {
        avatar: true,
      },
    });
    return new OrganizationEntity(updatedOrganization);
  }
}

export const organizationUpdateAvatarService =
  new OrganizationUpdateAvatarService();
