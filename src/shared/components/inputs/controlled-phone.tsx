/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';
import { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

const TextMask = forwardRef<HTMLInputElement, any>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        inputRef={ref}
        mask="(00) 00000-0000"
        definitions={{
          '0': /[0-9]/,
        }}
        onAccept={(value: string) => {
          onChange({ target: { name, value } });
        }}
      />
    );
  },
);

export function ControlledPhone({
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
          inputProps: {
            maxLength: 16,
          },
          endAdornment: (
            <IconButton color={color} sx={{ fontSize: '30px' }}>
              <PhoneRoundedIcon fontSize="inherit" />
            </IconButton>
          ),
        },
      }}
    />
  );
}
