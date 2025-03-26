import { ReactNode } from 'react';

interface Props {
  id: string;
  className?: string;
  children: ReactNode;
}

export function Section({ id = '', className = '', children }: Props) {
  return (
    <section
      id={id}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
        minWidth: '100%',
      }}
      className={className}
    >
      {children}
    </section>
  );
}
