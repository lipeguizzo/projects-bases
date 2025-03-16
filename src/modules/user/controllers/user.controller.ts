import { Response } from 'express';
import { PaginationResponseDto } from '../../../shared/domain/dto/pagination-response.dto';
import { IRequest } from '../../../shared/domain/interfaces/request.interface';
import { UserCreateDto } from '../domain/dto/user-create.dto';
import { UserFindManyDto } from '../domain/dto/user-find-many.dto';
import { UserUpdateStatusDto } from '../domain/dto/user-update-status.dto';
import { UserUpdateDto } from '../domain/dto/user-update.dto';
import { UserEntity } from '../domain/entities/user.entity';
import { userCreateService } from '../services/user-create.service';
import { userDeleteService } from '../services/user-delete.service';
import { userFindManyService } from '../services/user-find-many.service';
import { userFindOneService } from '../services/user-find-one.service';
import { userFindSelfService } from '../services/user-find-self.service';
import { userUpdateSelfService } from '../services/user-update-self.service';
import { userUpdateStatusService } from '../services/user-update-status.service';
import { userUpdateService } from '../services/user-update.service';
import { UserRequest } from './../../../shared/types/user-request';
import { userUpdateAvatarService } from '../services/user-update-avatar.service';
import { generateJsonError } from '../../../shared/utils/error';
import { userDeleteAvatarService } from '../services/user-delete-avatar.service';

class UserController {
  async findAll(request: IRequest, response: Response) {
    try {
      const params: UserFindManyDto = new UserFindManyDto(request.query);
      const userRequest: UserRequest = request.user;
      const users: PaginationResponseDto<UserEntity> =
        await userFindManyService.execute(params, userRequest);
      response.status(200).json(users);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findOne(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const user = await userFindOneService.execute(id, userRequest);
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async findSelf(request: IRequest, response: Response) {
    try {
      const userRequest: UserRequest = request.user;
      const user = await userFindSelfService.execute(userRequest);
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async create(request: IRequest, response: Response) {
    try {
      const dto: UserCreateDto = request.body;
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userCreateService.execute(
        dto,
        userRequest,
      );
      response.status(201).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async update(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: UserUpdateDto = request.body;
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userUpdateService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateSelf(request: IRequest, response: Response) {
    try {
      const userRequest: UserRequest = request.user;
      const dto: UserUpdateDto = request.body;
      const user: UserEntity = await userUpdateSelfService.execute(
        dto,
        userRequest,
      );
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const file: Express.Multer.File = request.file as Express.Multer.File;
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userUpdateAvatarService.execute(
        id,
        file,
        userRequest,
      );
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async deleteAvatar(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userDeleteAvatarService.execute(
        id,
        userRequest,
      );
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async updateStatus(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const dto: UserUpdateStatusDto = request.body;
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userUpdateStatusService.execute(
        id,
        dto,
        userRequest,
      );
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }

  async delete(request: IRequest, response: Response) {
    try {
      const id: number = Number(request.params.id);
      const userRequest: UserRequest = request.user;
      const user: UserEntity = await userDeleteService.execute(id, userRequest);
      response.status(200).json(user);
    } catch (error) {
      generateJsonError(error, response);
    }
  }
}

export const userController = new UserController();
