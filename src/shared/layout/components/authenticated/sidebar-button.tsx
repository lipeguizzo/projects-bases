import {
  IconButton,
  IconButtonProps,
  Theme,
  useMediaQuery,
} from '@mui/material';
import NavigateBeforeRoundedIcon from '@mui/icons-material/NavigateBeforeRounded';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';

interface Props extends Omit<IconButtonProps, 'component'> {
  open: boolean;
  onClick: () => void;
}

export function AuthenticatedSidebarButton({ open, onClick, ...props }: Props) {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm'),
  );

  return (
    !isMobile && (
      <IconButton
        onClick={onClick}
        sx={{
          position: 'absolute',
          color: 'secondary.main',
          width: '30px',
          height: '30px',
          top: '50%',
          left: open ? '85px' : '-35px',
          borderRadius: '50px',
          backgroundColor: 'primary.main',
          transition: '0.3s',
          '&:hover': {
            backgroundColor: 'primary.main',
            transform: 'scale(1.1)',
          },
        }}
        {...props}
      >
        {open ? (
          <NavigateBeforeRoundedIcon fontSize="inherit" />
        ) : (
          <NavigateNextRoundedIcon fontSize="inherit" />
        )}
      </IconButton>
    )
  );
}
