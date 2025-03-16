import { Response } from 'express';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { UserRequest } from '../../../shared/types/user-request';
import { generateJsonError } from '../../../shared/utils/error';
import { CompanyFindManyDto } from '../domain/dto/company-find-many.dto';
import { CompanyEntity } from '../domain/entities/company.entity';
import { companyFindManyService } from '../services/company-find-many.service';
import { companyFindOneService } from '../services/company-find-one.service';
import { companyCreateService } from '../services/company-create.service';
import { CompanyCreateDto } from '../domain/dto/company-create.dto';
import { companyUpdateAvatarService } from '../services/company-update-avatar.service';
import { companyDeleteAvatarService } from '../services/company-delete-avatar.service';
import { CompanyUpdateDto } from '../domain/dto/company-update.dto';
import { companyUpdateService } from '../services/company-update.service';
import { CompanyUpdateStatusDto } from '../domain/dto/company-update-status.dto';
import { companyUpdateStatusService } from '../services/company-update-status.service';
import { companyDeleteService } from '../services/company-delete.service';

class CompanyController {
  async findAll(request: IRequest, response: Response) {
    try {
      const params: CompanyFindManyDto = new CompanyFindManyDto(request.query);
      const userRequest: UserRequest = request.user;
      const companies: PaginationResponseDto<CompanyEntity> =
        await companyFindManyService.execute(params, userRequest);
      response.status(200).json(companies);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findOne(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const company = await companyFindOneService.execute(id, userRequest);
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async create(request: IRequest, response: Response) {
    try {
      const dto: CompanyCreateDto = request.body;
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyCreateService.execute(
        dto,
        userRequest,
      );
      response.status(201).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const file: Express.Multer.File = request.file as Express.Multer.File;
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyUpdateAvatarService.execute(
        id,
        file,
        userRequest,
      );
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async deleteAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyDeleteAvatarService.execute(
        id,
        userRequest,
      );
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async update(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: CompanyUpdateDto = request.body;
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyUpdateService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateStatus(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: CompanyUpdateStatusDto = request.body;
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyUpdateStatusService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async delete(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const company: CompanyEntity = await companyDeleteService.execute(
        id,
        userRequest,
      );
      response.status(200).json(company);
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const companyController = new CompanyController();
