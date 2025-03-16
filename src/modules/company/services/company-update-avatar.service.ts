import { storedFileUpdateService } from './../../stored-file/services/stored-file-update.service';
import { prisma } from '../../../infra/database/prisma.service';
import { EFolder } from '../../../infra/file-system/enums/folder.enum';
import { NotFoundException } from '../../../shared/exceptions';
import { UserRequest } from '../../../shared/types/user-request';
import { generateFileAdapterFromUploadFile } from '../../../shared/utils/file';
import { userCompanyValidator } from '../../../shared/validators/user-company.validator';
import { storedFileCreateService } from '../../stored-file/services/stored-file-create.service';
import { CompanyEntity } from '../domain/entities/company.entity';

class CompanyUpdateAvatarService {
  async execute(
    id: number,
    file: Express.Multer.File,
    userRequest: UserRequest,
  ): Promise<CompanyEntity> {
    const company = await prisma.company.findFirst({
      where: {
        id: id,
        deletedAt: null,
      },
      include: {
        avatar: true,
      },
    });

    if (!company) throw new NotFoundException('Empresa não encontrada!');

    await userCompanyValidator(id, userRequest);

    const storedFile = !company?.avatar
      ? await storedFileCreateService.execute(
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
            relativePath: `${EFolder.COMPANIES}/${company.id}`,
            isPublic: true,
          },
        )
      : await storedFileUpdateService.execute(
          company?.avatar?.uuid,
          generateFileAdapterFromUploadFile(file),
          {
            alt: file.originalname,
            name: file.originalname,
          },
        );

    const updatedCompany = await prisma.company.update({
      data: {
        avatar: !company?.avatar
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
      where: { id: company?.id },
      include: {
        avatar: true,
      },
    });
    return new CompanyEntity(updatedCompany);
  }
}

export const companyUpdateAvatarService = new CompanyUpdateAvatarService();
