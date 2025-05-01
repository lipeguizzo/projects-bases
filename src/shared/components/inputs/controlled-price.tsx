/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

const TextMask = forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, value, ...other } = props;

    const hasValue = value !== undefined && value !== null;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        mask={Number}
        scale={2}
        padFractionalZeros={false}
        radix="."
        mapToRadix={['.']}
        value={hasValue ? parseFloat(value).toString() : ''}
        onAccept={(value: string) => {
          const numericValue = value ? parseFloat(value).toString() : 0;
          onChange({ target: { name, value: numericValue } });
        }}
      />
    );
  },
);

export function ControlledPrice({
  label = '',
  fullWidth = true,
  size = 'medium',
  variant = 'outlined',
  color = 'secondary',
  ...props
}: Props) {
  const {
    field,
    fieldState: { error },
  } = useController(props);

  return (
    <TextField
      {...props}
      {...field}
      label={label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          inputComponent: TextMask,
          endAdornment: (
            <IconButton color={color} sx={{ fontSize: '30px' }}>
              <AttachMoneyRoundedIcon fontSize="inherit" />
            </IconButton>
          ),
        },
      }}
    />
  );
}
