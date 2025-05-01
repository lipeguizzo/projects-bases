import { RoleEntity } from '@/modules/role/domain/entities/role.entity';
import { DataGridProps, GridColDef, GridRowParams } from '@mui/x-data-grid';
import {
  DataTable,
  DataTableColumnText,
  DataTableColumnStatus,
  DataTableColumnBoolean,
  DataTableColumnOrganization,
  DataTableColumnCompany,
  DataTableColumnReference,
} from '@/shared/components/data-table';
import { IPaginationRequest } from '@/shared/domain/interfaces/pagination-request.interface';
import { IPaginationResponse } from '@/shared/domain/interfaces/pagination-response.interface';
import { useNavigate } from 'react-router-dom';
import { Sort } from '@/shared/types/sort';

interface Props {
  data: IPaginationResponse<RoleEntity> | undefined;
  loading: boolean;
  pagination: IPaginationRequest;
  onChangePagination: (pagination: IPaginationRequest) => void;
  reload: () => void;
}

export function RoleTable({
  data,
  loading,
  pagination,
  onChangePagination,
}: Props) {
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    {
      field: 'isDefault',
      headerName: 'Padrão',
      width: 100,
      renderCell: (params) => <DataTableColumnBoolean value={params.value} />,
    },
    {
      field: 'name',
      headerName: 'Nome',
      width: 150,
      renderCell: (params) => <DataTableColumnText value={params.value} />,
    },
    {
      field: 'reference',
      headerName: 'Referência',
      width: 100,
      renderCell: (params) => (
        <DataTableColumnReference reference={params.value} />
      ),
    },
    {
      field: 'organizationId',
      headerName: 'Organização',
      width: 150,
      renderCell: (params) => (
        <DataTableColumnOrganization organization={params.row.organization} />
      ),
    },
    {
      field: 'companyId',
      headerName: 'Empresa',
      width: 150,
      renderCell: (params) => (
        <DataTableColumnCompany company={params.row.company} />
      ),
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
