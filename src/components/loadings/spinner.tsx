import { LoaderCircle } from 'lucide-react';
import { Container } from '../containers';

interface Props {
  loading: boolean;
  color?: string;
}

export function Spinner({ loading = false, color = 'primary' }: Props) {
  return (
    loading && (
      <Container
        justify="center"
        items="center"
        className="absolute top-0 left-0 min-w-full min-h-full"
      >
        <LoaderCircle size={100} className={`animate-spin text-${color}`} />
      </Container>
    )
  );
}
