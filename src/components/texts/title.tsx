import { fontSizeMapper } from '@/mappers';
import { ReactNode } from 'react';

interface Props {
  size?:
    | 'xs'
    | 'sm'
    | 'base'
    | 'lg'
    | 'xl'
    | '2xl'
    | '3xl'
    | '4xl'
    | '5xl'
    | '6xl'
    | '7xl'
    | '8xl'
    | '9xl';
  color?: string;
  className?: string;
  children: ReactNode;
}

export function Title({
  size = '4xl',
  color = 'black',
  className = '',
  children,
}: Props) {
  return (
    <h1
      style={{
        fontFamily: 'OuterSans',
        fontSize: fontSizeMapper[size],
      }}
      className={`text-${color} ${className}`}
    >
      {children}
    </h1>
  );
}
