/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IOption } from '@/shared/domain/interfaces/option.interface';
import { AutocompleteProps } from '@mui/material';
import { ControlledAutocomplete } from '.';
import { useEffect, useState } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { OrganizationFindManyDto } from '@/modules/organization/domain/dto/organization-find-many.dto';
import { OrganizationRepository } from '@/modules/organization/repositories/organization.repository';
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
  optionsParams?: OrganizationFindManyDto;
}

export function ControlledOrganization({
  optionsParams,
  label = '',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const organizationRepository = new OrganizationRepository();

  const [loading, setLoading] = useState<boolean>(false);
  const [organizations, setOrganizations] = useState<IOption[]>([]);

  async function getOrganizations(search?: string) {
    if (loading) return;

    try {
      setLoading(true);

      const { data } = await organizationRepository.findMany({
        ...optionsParams,
        search,
        page: 1,
        pageSize: 25,
      });

      setOrganizations(
        data.map((organization) => ({
          label: organization.name,
          value: organization.id,
        })),
      );
    } catch (error) {
      toast.error(formatErrorForNotification(error));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getOrganizations();
  }, [optionsParams]);

  return (
    <ControlledAutocomplete
      {...props}
      options={organizations}
      translate={null}
      label={label}
      variant={variant}
      color={color}
      loading={loading}
    />
  );
}
