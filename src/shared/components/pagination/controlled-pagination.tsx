import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { Typography, Pagination } from '@mui/material';
import { ChangeEvent, useState } from 'react';

interface Props {
  firstPage: number;
  count: number;
  pagination: IPaginationRequest;
  variant?: 'outlined' | 'text';
  color?: 'standard' | 'secondary' | 'primary';
  onChangePagination: (pagination: IPaginationRequest) => void;
}
export function ControlledPagination({
  firstPage,
  count,
  pagination,
  variant,
  color,
  onChangePagination,
}: Props) {
  const [page, setPage] = useState(firstPage);
  const handleChange = (_event: ChangeEvent<unknown>, value: number) => {
    onChangePagination({
      ...pagination,
      page: value,
    });
    setPage(value);
  };

  return count <= 0 ? (
    <Typography variant="body1" component="p">
      Sem resultados!
    </Typography>
  ) : (
    <Pagination
      count={count}
      page={page}
      variant={variant}
      color={color}
      onChange={handleChange}
    />
  );
}
