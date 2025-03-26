import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function SectionHeader({ className = '', children }: Props) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
      }}
      className={className}
    >
      {children}
    </header>
  );
}
