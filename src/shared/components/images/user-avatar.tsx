/* eslint-disable @typescript-eslint/no-explicit-any */
import { Avatar, AvatarProps } from '@mui/material';

interface Props extends Omit<AvatarProps, 'defaultValue' | 'name'> {
  userName: string;
  url: string;
  onClick: (event: any) => void;
}

export function UserAvatar({ userName, url, onClick, ...props }: Props) {
  return url !== '' ? (
    <Avatar
      onClick={onClick}
      alt="avatar"
      srcSet={url}
      sx={{
        cursor: 'pointer',
      }}
      {...props}
    ></Avatar>
  ) : (
    <Avatar
      onClick={onClick}
      alt="avatar"
      sx={{
        cursor: 'pointer',
        display: 'flex',
        bgcolor: 'secondary.main',
      }}
      {...props}
    >
      {userName.charAt(0).toUpperCase()}
    </Avatar>
  );
}
