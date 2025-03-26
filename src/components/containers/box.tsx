import { ReactNode } from 'react';

interface Props {
  className?: string;
  children: ReactNode;
}

export function Box({ className = '', children }: Props) {
  return <div className={className}>{children}</div>;
}
