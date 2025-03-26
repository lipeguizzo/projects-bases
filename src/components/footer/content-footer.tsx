import { useTranslations } from 'next-intl';
import { Container } from '../containers';
import { Title } from '../texts';

export function ContentFooter() {
  const translate = useTranslations('Components.Footer');
  const currentYear = new Date().getFullYear();

  return (
    <Container direction="column" className="gap-5">
      <Title size="2xl" color="white" className="text-center">
        © {currentYear} {translate('reserved')}
      </Title>
    </Container>
  );
}
