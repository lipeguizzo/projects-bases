import { IconButton, IconButtonProps } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

interface Props extends Omit<IconButtonProps, 'component'> {
  onClick: () => void;
}

export function MenuButton({ onClick, ...props }: Props) {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        display: { sm: 'block', md: 'none' },
        fontSize: '40px',
        color: 'white.main',
      }}
      {...props}
    >
      <MenuRoundedIcon fontSize="inherit" />
    </IconButton>
  );
}
