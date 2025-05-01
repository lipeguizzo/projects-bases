import { removeSpecialCharacters } from '@/shared/utils/string';
import { LinkText } from '../buttons';
import { formatPhoneNumber } from '@/shared/utils/phone';

interface Props {
  value: string;
}

export function DataTableColumnPhone({ value, ...props }: Props) {
  return (
    <LinkText
      to={`https://wa.me/55${removeSpecialCharacters(value)}`}
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
      {formatPhoneNumber(removeSpecialCharacters(value))}
    </LinkText>
  );
}
