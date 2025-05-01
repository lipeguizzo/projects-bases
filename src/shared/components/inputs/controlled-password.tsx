/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, TextField, TextFieldProps } from '@mui/material';
import { useState } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {}

export function ControlledPassword({
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

  const [visibility, setVisibility] = useState<boolean>(false);

  function handleShowPassword() {
    setVisibility(!visibility);
  }

  return (
    <TextField
      {...props}
      {...field}
      label={props.label}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      color={color}
      type={visibility ? 'text' : 'password'}
      error={!!error}
      helperText={error ? error.message : null}
      slotProps={{
        input: {
          endAdornment: (
            <IconButton
              color={color}
              onClick={handleShowPassword}
              sx={{
                fontSize: '30px',
              }}
            >
              {visibility ? (
                <VisibilityOutlinedIcon fontSize="inherit" />
              ) : (
                <VisibilityOffOutlinedIcon fontSize="inherit" />
              )}
            </IconButton>
          ),
        },
      }}
    />
  );
}
