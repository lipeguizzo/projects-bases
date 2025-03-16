import { Response } from 'express';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { RoleCreateDto } from '../domain/dto/role-create.dto';
import { RoleFindManyDto } from '../domain/dto/role-find-many.dto';
import { RoleUpdateStatusDto } from '../domain/dto/role-update-status.dto';
import { AbilityEntity } from '../domain/entities/ability.entity';
import { RoleEntity } from '../domain/entities/role.entity';
import { roleCreateService } from '../services/role-create.service';
import { roleDeleteService } from '../services/role-delete.service';
import { roleFindAbilitiesService } from '../services/role-find-abilities.service';
import { roleFindManyService } from '../services/role-find-many.service';
import { roleFindOneService } from '../services/role-find-one.service';
import { roleUpdateStatusService } from '../services/role-update-status.service';
import { roleUpdateService } from '../services/role-update.service';
import { roleFindAllAbilitiesService } from '../services/role-find-all-abilities.service';
import { RoleUpdateDto } from '../domain/dto/role-update.dto';
import { UserRequest } from '../../../shared/types/user-request';
import { generateJsonError } from '../../../shared/utils/error';

class RoleController {
  async findAll(request: IRequest, response: Response) {
    try {
      const params: RoleFindManyDto = new RoleFindManyDto(request.query);
      const userRequest: UserRequest = request.user;
      const roles: PaginationResponseDto<RoleEntity> =
        await roleFindManyService.execute(params, userRequest);
      response.status(200).json(roles);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findOne(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const role: RoleEntity = await roleFindOneService.execute(
        id,
        userRequest,
      );
      response.status(200).json(role);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findAbilities(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const abilities: AbilityEntity[] = await roleFindAbilitiesService.execute(
        id,
        userRequest,
      );
      response.status(200).json(abilities);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findAllAbilities(_request: IRequest, response: Response) {
    try {
      const abilities: AbilityEntity[] =
        await roleFindAllAbilitiesService.execute();
      response.status(200).json(abilities);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async create(request: IRequest, response: Response) {
    try {
      const dto: RoleCreateDto = request.body;
      const userRequest: UserRequest = request.user;
      const role: RoleEntity = await roleCreateService.execute(
        dto,
        userRequest,
      );
      response.status(201).json(role);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async update(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: RoleUpdateDto = request.body;
      const userRequest: UserRequest = request.user;
      const role: RoleEntity = await roleUpdateService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(role);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateStatus(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: RoleUpdateStatusDto = request.body;
      const userRequest: UserRequest = request.user;
      const role: RoleEntity = await roleUpdateStatusService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(role);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async delete(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const role: RoleEntity = await roleDeleteService.execute(id, userRequest);
      response.status(200).json(role);
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const roleController = new RoleController();
