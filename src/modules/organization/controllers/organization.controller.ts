import { Response } from 'express';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { UserRequest } from '../../../shared/types/user-request';
import { generateJsonError } from '../../../shared/utils/error';
import { OrganizationFindManyDto } from '../domain/dto/organization-find-many.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { organizationFindManyService } from '../services/organization-find-many.service';
import { organizationFindOneService } from '../services/organization-find-one.service';
import { OrganizationCreateDto } from '../domain/dto/organization-create.dto';
import { organizationCreateService } from '../services/organization-create.service';
import { OrganizationUpdateDto } from '../domain/dto/organization-update.dto';
import { organizationUpdateService } from '../services/organization-update.service';
import { OrganizationUpdateStatusDto } from '../domain/dto/organization-update-status.dto';
import { organizationUpdateStatusService } from '../services/organization-update-status.service';
import { organizationDeleteService } from '../services/organization-delete.service';
import { organizationUpdateAvatarService } from '../services/organization-update-avatar.service';
import { organizationDeleteAvatarService } from '../services/organization-delete-avatar.service';

class OrganizationController {
  async findAll(request: IRequest, response: Response) {
    try {
      const params: OrganizationFindManyDto = new OrganizationFindManyDto(
        request.query,
      );
      const userRequest: UserRequest = request.user;
      const organizations: PaginationResponseDto<OrganizationEntity> =
        await organizationFindManyService.execute(params, userRequest);
      response.status(200).json(organizations);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findOne(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const organization = await organizationFindOneService.execute(
        id,
        userRequest,
      );
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async create(request: IRequest, response: Response) {
    try {
      const dto: OrganizationCreateDto = request.body;
      const organization: OrganizationEntity =
        await organizationCreateService.execute(dto);
      response.status(201).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const file: Express.Multer.File = request.file as Express.Multer.File;
      const userRequest: UserRequest = request.user;
      const organization: OrganizationEntity =
        await organizationUpdateAvatarService.execute(id, file, userRequest);
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async deleteAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const organization: OrganizationEntity =
        await organizationDeleteAvatarService.execute(id, userRequest);
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async update(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: OrganizationUpdateDto = request.body;
      const userRequest: UserRequest = request.user;
      const organization: OrganizationEntity =
        await organizationUpdateService.execute(id, dto, userRequest);
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateStatus(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: OrganizationUpdateStatusDto = request.body;
      const userRequest: UserRequest = request.user;
      const organization: OrganizationEntity =
        await organizationUpdateStatusService.execute(id, dto, userRequest);
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async delete(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const organization: OrganizationEntity =
        await organizationDeleteService.execute(id, userRequest);
      response.status(200).json(organization);
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const organizationController = new OrganizationController();
