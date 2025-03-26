import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function SectionContent({ className = '', children }: Props) {
  return (
    <div
      style={{
        display: 'flex',
        minWidth: '100%',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
