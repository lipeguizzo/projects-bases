import { Repository } from '@/infra/http/repository';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { ID } from '@/shared/types/id';
import { OrganizationFindManyDto } from '../domain/dto/organization-find-many.dto';
import { OrganizationEntity } from '../domain/entities/organization.entity';
import { OrganizationCreateDto } from '../domain/dto/organization-create.dto';
import { OrganizationUpdateDto } from '../domain/dto/organization-update.dto';
import { OrganizationUpdateStatusDto } from '../domain/dto/organization-update-status.dto';

export class OrganizationRepository extends Repository {
  constructor() {
    super('/organizations');
  }

  public async findMany(
    params: OrganizationFindManyDto,
  ): Promise<IPaginationResponse<OrganizationEntity>> {
    const { status, data: response } = await this.http.get<
      IPaginationResponse<OrganizationEntity>
    >('/', {
      params,
    });

    if (this.isOK(status)) {
      return {
        ...response,
        data: Array.isArray(response.data)
          ? response.data.map(
              (organization: Partial<OrganizationEntity>) =>
                new OrganizationEntity(organization),
            )
          : ([] as OrganizationEntity[]),
      };
    }

    throw new Error('Aconteceu um erro!');
  }

  public async findOne(id: ID): Promise<OrganizationEntity> {
    const { status, data } = await this.http.get<OrganizationEntity>(`/${id}`);

    if (this.isOK(status)) return new OrganizationEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async create(dto: OrganizationCreateDto): Promise<OrganizationEntity> {
    const { status, data } = await this.http.post<
      OrganizationEntity,
      OrganizationCreateDto
    >(`/`, dto);

    if (this.isOK(status)) return new OrganizationEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async update(
    id: ID,
    dto: OrganizationUpdateDto,
  ): Promise<OrganizationEntity> {
    const { status, data } = await this.http.put<
      OrganizationEntity,
      OrganizationUpdateDto
    >(`/${id}`, dto);

    if (this.isOK(status)) return new OrganizationEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateStatus(
    id: ID,
    dto: OrganizationUpdateStatusDto,
  ): Promise<OrganizationEntity> {
    const { status, data } = await this.http.patch<
      OrganizationEntity,
      OrganizationUpdateStatusDto
    >(`/${id}/status`, dto);

    if (this.isOK(status)) return new OrganizationEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async delete(id: ID): Promise<OrganizationEntity> {
    const { status, data } = await this.http.delete<OrganizationEntity>(
      `/${id}`,
    );

    if (this.isOK(status)) return new OrganizationEntity(data);

    throw new Error('Aconteceu um erro!');
  }

  public async updateAvatar(
    id: ID,
    dto: FormData,
  ): Promise<OrganizationEntity> {
    const { status, data } = await this.http.post<OrganizationEntity, FormData>(
      `/${id}/avatar`,
      dto,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }

  public async deleteAvatar(id: ID): Promise<OrganizationEntity> {
    const { status, data } = await this.http.delete<OrganizationEntity>(
      `/${id}/avatar`,
    );

    if (this.isOK(status)) return data;

    throw new Error('Aconteceu um erro!');
  }
}
