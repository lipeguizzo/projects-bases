/* eslint-disable @typescript-eslint/no-explicit-any */
import { AutocompleteProps } from '@mui/material';
import { UseControllerProps } from 'react-hook-form';
import { ControlledAutocomplete } from '.';

interface Props
  extends UseControllerProps<any>,
    Omit<
      AutocompleteProps<any, boolean, false, false>,
      'renderInput' | 'translate' | 'options' | 'onChange' | 'value'
    > {
  options: Record<string, string>;
  translate?: Record<string, string>;
  excludeOptions?: string[];
  label: string;
  variant?: 'outlined' | 'filled' | 'standard';
  color?: 'secondary' | 'error' | 'primary' | 'info' | 'success' | 'warning';
}

export function ControlledEnum({
  multiple,
  options,
  excludeOptions = [],
  label,
  translate,
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const formattedOptions = Object.entries(options)
    .map(([key, value]) => ({
      label: key,
      value: value,
    }))
    .filter((options) => !excludeOptions.includes(options.value));

  return (
    <ControlledAutocomplete
      {...props}
      multiple={multiple}
      options={formattedOptions}
      translate={translate}
      label={label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      loading={false}
    />
  );
}
