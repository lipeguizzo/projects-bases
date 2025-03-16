import { Sort } from '../../types/sort';

export class PaginationRequestDto {
  page?: number = 1;
  pageSize?: number = 10;

  ordering?: Sort = 'asc';

  orderBy?: string;
}
