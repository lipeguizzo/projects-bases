import { ReactNode } from 'react';

interface Props {
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  justify?:
    | 'normal'
    | 'start'
    | 'end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';
  items?: 'start' | 'end' | 'center' | 'baseline' | 'stretch';
  className?: string;
  children: ReactNode;
}

export function Stack({
  direction = 'column',
  justify = 'start',
  items = 'start',
  className = '',
  children,
}: Props) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: items,
      }}
      className={className}
    >
      {children}
    </div>
  );
}
