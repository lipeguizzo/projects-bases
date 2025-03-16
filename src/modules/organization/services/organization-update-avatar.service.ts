import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { EFolder } from 'src/infra/file-system/enums/folder.enum';
import { StoredFileCreateService } from 'src/modules/stored-file/services/stored-file-create.service';
import { StoredFileUpdateService } from 'src/modules/stored-file/services/stored-file-update.service';
import { UserRequest } from 'src/shared/types/user-request';
import { generateFileAdapterFromUploadFile } from 'src/shared/utils/file';
import { userOrganizationValidator } from 'src/shared/validators/user-organization.validator';
import { OrganizationEntity } from '../domain/entities/organization.entity';

@Injectable()
export class OrganizationUpdateAvatarService {
  constructor(
    private prisma: PrismaService,
    private storedFileCreateService: StoredFileCreateService,
    private storedFileUpdateService: StoredFileUpdateService,
  ) {}
  async execute(
    id: number,
    file: Express.Multer.File,
    userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    const organization = await this.prisma.organization.findFirst({
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
      ? await this.storedFileCreateService.execute(
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
            relativePath: `${EFolder.ORGANIZATIONS}/${organization.id}`,
            isPublic: true,
          },
        )
      : await this.storedFileUpdateService.execute(
          organization?.avatar?.uuid,
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
          },
        );

    const updatedOrganization = await this.prisma.organization.update({
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
