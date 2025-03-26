import { fontSizeMapper } from '@/mappers';
import { ReactNode } from 'react';

interface Props {
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  color?: string;
  className?: string;
  children: ReactNode;
}

export function Paragraph({
  size = '2xl',
  color = 'black',
  className = '',
  children,
}: Props) {
  return (
    <p
      style={{
        fontSize: fontSizeMapper[size],
      }}
      className={`text-${color} ${className}`}
    >
      {children}
    </p>
  );
}
