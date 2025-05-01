import { formatLongString } from '@/shared/utils/string';
import { LinkText } from '../buttons';

interface Props {
  value: string;
}

export function DataTableColumnEmail({ value, ...props }: Props) {
  return (
    <LinkText
      to={`https://mail.google.com/mail/?view=cm&fs=1&to=${value}`}
      target="_blank"
      variant="body2"
      sx={{
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        minHeight: '100%',
      }}
      onClick={(e) => e.stopPropagation()}
      {...props}
    >
      {formatLongString(value)}
    </LinkText>
  );
}
