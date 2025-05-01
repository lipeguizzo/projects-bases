/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, IconButton, TextFieldProps, Typography } from '@mui/material';
import { useState, DragEvent, ChangeEvent, MouseEvent, useEffect } from 'react';
import { useController, UseControllerProps } from 'react-hook-form';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

interface Props
  extends UseControllerProps<any>,
    Omit<TextFieldProps, 'defaultValue' | 'name'> {
  label?: string;
}

export function ControlledUpload({
  label = 'Arraste e solte o arquivo aqui ou clique para selecionar',
  ...props
}: Props) {
  const { field } = useController(props);

  const [dragOver, setDragOver] = useState<boolean>(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    field.onChange(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  };

  const handleClear = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setPreview(null);
    field.onChange(null);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      handleFileChange(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (field.value) {
      if (typeof field.value === 'string') {
        setPreview(field.value);
      } else if (field.value instanceof File) {
        handleFileChange(field.value);
      }
    }
  }, [field.value]);

  return (
    <Box
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById(`${field.name}-file`)?.click()}
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '200px',
        padding: 1,
        border: '2px dashed',
        borderColor: dragOver ? 'secondary.main' : 'primary.main',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
      }}
    >
      <input
        id={`${field.name}-file`}
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
      {field.value ? null : <Typography variant="h6">{label}</Typography>}
      {preview && (
        <Box width="100%" height="100%">
          <img
            src={preview}
            alt="Pré-visualização"
            style={{ width: '100%', height: '100%', objectFit: 'fill' }}
          />
        </Box>
      )}

      {field.value && (
        <IconButton
          color="secondary"
          onClick={handleClear}
          sx={{
            position: 'absolute',
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            right: -10,
            top: -10,
            width: '30px',
            height: '30px',
            borderRadius: '100px',
            backgroundColor: 'primary.main',
            transition: '0.3s',
            '&:hover': {
              backgroundColor: 'primary.main',
              transform: 'scale(1.1)',
            },
          }}
        >
          <CloseRoundedIcon fontSize="inherit" />
        </IconButton>
      )}
    </Box>
  );
}
