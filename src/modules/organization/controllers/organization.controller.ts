import { $Enums } from '@prisma/client';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/shared/decorators/user.decorator';
import { OrganizationCreateDto } from '../domain/dto/organization-create.dto';
import { OrganizationFindManyDto } from '../domain/dto/organization-find-many.dto';
import { OrganizationUpdateStatusDto } from '../domain/dto/organization-update-status.dto';
import { OrganizationUpdateDto } from '../domain/dto/organization-update.dto';
import { OrganizationCreateService } from '../services/organization-create.service';
import { OrganizationDeleteService } from '../services/organization-delete.service';
import { OrganizationFindManyService } from '../services/organization-find-many.service';
import { OrganizationFindOneService } from '../services/organization-find-one.service';
import { OrganizationUpdateStatusService } from '../services/organization-update-status.service';
import { OrganizationUpdateService } from '../services/organization-update.service';
import { UserRequest } from 'src/shared/types/user-request';
import { RequireAbilities } from 'src/shared/decorators/require-abilities.decorator';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { PaginationResponseDto } from 'src/shared/domain/dto/pagination-response.dto';
import { OrganizationUpdateAvatarService } from '../services/organization-update-avatar.service';
import { OrganizationDeleteAvatarService } from '../services/organization-delete-avatar.service';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('Organizations')
@Controller('organizations')
export class OrganizationController {
  constructor(
    private readonly organizationFindManyService: OrganizationFindManyService,
    private readonly organizationFindOneService: OrganizationFindOneService,
    private readonly organizationCreateService: OrganizationCreateService,
    private readonly organizationUpdateService: OrganizationUpdateService,
    private readonly organizationUpdateStatusService: OrganizationUpdateStatusService,
    private readonly organizationDeleteService: OrganizationDeleteService,
    private readonly organizationUpdateAvatarService: OrganizationUpdateAvatarService,
    private readonly organizationDeleteAvatarService: OrganizationDeleteAvatarService,
  ) {}

  @Get()
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.READ,
  )
  async findAll(
    @Query() params: OrganizationFindManyDto,
    @User() userRequest: UserRequest,
  ): Promise<PaginationResponseDto<OrganizationEntity>> {
    return await this.organizationFindManyService.execute(params, userRequest);
  }

  @Get(':id')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.READ,
  )
  async findOne(
    @Param('id') id: number,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationFindOneService.execute(id, userRequest);
  }

  @Post()
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.CREATE,
  )
  async create(
    @Body() dto: OrganizationCreateDto,
  ): Promise<OrganizationEntity> {
    return await this.organizationCreateService.execute(dto);
  }

  @Post(':id/avatar')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  )
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationUpdateAvatarService.execute(
      id,
      file,
      userRequest,
    );
  }

  @Delete(':id/avatar')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.DELETE,
  )
  async deleteAvatar(
    @Param('id') id: number,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationDeleteAvatarService.execute(id, userRequest);
  }

  @Put(':id')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  )
  async update(
    @Param('id') id: number,
    @Body() dto: OrganizationUpdateDto,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationUpdateService.execute(id, dto, userRequest);
  }

  @Delete(':id')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.DELETE,
  )
  async delete(
    @Param('id') id: number,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationDeleteService.execute(id, userRequest);
  }

  @Patch(':id/status')
  @RequireAbilities(
    $Enums.AbilityCodes.ORGANIZATIONS,
    $Enums.AbilityActions.UPDATE,
  )
  async updateStatus(
    @Param('id') id: number,
    @Body() dto: OrganizationUpdateStatusDto,
    @User() userRequest: UserRequest,
  ): Promise<OrganizationEntity> {
    return await this.organizationUpdateStatusService.execute(
      id,
      dto,
      userRequest,
    );
  }
}
