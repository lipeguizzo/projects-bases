import { OrganizationEntity } from '@/modules/organization/domain/entities/organization.entity';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import {
  DataTable,
  DataTableColumnText,
  DataTableColumnEmail,
  DataTableColumnStatus,
} from '@/shared/components/data-table';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { useNavigate } from 'react-router-dom';
import { Sort } from '@/shared/types/sort';

interface Props {
  data: IPaginationResponse<OrganizationEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function OrganizationTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      renderCell: (params) => <DataTableColumnText value={params.value} />,
    },
    {
      field: 'tradeName',
      headerName: 'Nome fantasia',
      width: 150,
      renderCell: (params) => <DataTableColumnText value={params.value} />,
    },
    {
      field: 'email',
      headerName: 'E-mail',
      width: 150,
      renderCell: (params) => <DataTableColumnEmail value={params.value} />,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
      renderCell: (params) => <DataTableColumnStatus value={params.value} />,
    },
  ];

  const handleRowClick = (params: GridRowParams) => {
    const id = params.row.id;
    navigate(`${id}`);
  };

  const options: Partial<DataGridProps> = {
    paginationModel: {
      page: (pagination.page ?? 1) - 1,
      pageSize: pagination.pageSize,
    },
    onPaginationModelChange(model) {
      onChangePagination({
        ...pagination,
        page: model.page + 1,
        pageSize: model.pageSize,
      });
    },
    onSortModelChange([model]) {
      onChangePagination({
        ...pagination,
        orderBy: model.field,
        ordering: model.sort as Sort,
      });
    },
  };
  return (
    <DataTable
      data={data?.data ?? []}
      columns={columns}
      count={data?._meta.totalItems ?? 1}
      loading={loading}
      options={options}
      onRowClick={handleRowClick}
      onPaginationModelChange={onChangePagination}
    />
  );
}
