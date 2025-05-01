/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from '@/shared/domain/interfaces/option.interface';
import { AutocompleteProps } from '@mui/material';
import { ControlledAutocomplete } from '.';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { CompanyFindManyDto } from '@/modules/company/domain/dto/company-find-many.dto';
import { CompanyRepository } from '@/modules/company/repositories/company.repository';
import { formatErrorForNotification } from '@/shared/utils/error';
import { toast } from 'react-toastify';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, false, false, false>,
      | 'defaultValue'
      | 'name'
      | 'renderInput'
      | 'options'
      | 'getOptionLabel'
      | 'isOptionEqualToValue'
    > {
  label?: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
  optionsParams?: CompanyFindManyDto;
}

export function ControlledCompany({
  optionsParams,
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const companyRepository = new CompanyRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [companies, setCompanies] = useState<IOption[]>([]);

  async function getCompanies(search?: string) {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await companyRepository.findMany({
        ...optionsParams,
        search,
        page: 1,
        pageSize: 25,
      });

      setCompanies(
        data.map((company) => ({
          label: company.name,
          value: company.id,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCompanies();
  }, [optionsParams]);

  return (
    <ControlledAutocomplete
      {...props}
      options={companies}
      translate={null}
      label={label}
      variant={variant}
      color={color}
      loading={loading}
    />
  );
}
