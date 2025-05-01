import { GridLocaleText } from '@mui/x-data-grid';

export const DataTableTranslate: Partial<GridLocaleText> = {
  noRowsLabel: 'Sem resultados!',
  paginationRowsPerPage: 'Itens por página',
  paginationDisplayedRows: ({ from, to, count }) =>
    `${from}–${to} de ${count !== -1 ? count : `mais de ${to}`}`,
  footerRowSelected: (count: number) =>
    count !== 1 ? `${count} linhas selecionadas` : '1 linha selecionada',
};
