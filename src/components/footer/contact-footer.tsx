import { contactLinks } from '@/data/contact.data';
import { ELocale } from '@/domain/enums/locale.enum';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../containers';
import { Title } from '../texts';
import { useMediaQuery } from '@/hooks/use-media-query';

export function ContactFooter() {
  const translate = useTranslations('Components.Footer');
  const locale = useLocale() as ELocale;
  const { isMobile } = useMediaQuery();
  return (
    <Container
      direction="column"
      items={isMobile ? 'center' : 'start'}
      className="uppercase md:normal-case gap-10"
    >
      <Title size="4xl" color="primary">
        {translate('contacts')}
      </Title>
      <Container direction={isMobile ? 'row' : 'column'} className="gap-5">
        {contactLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            locale={locale}
            className="flex items-center gap-5 text-xl text-white hover:text-primary duration-300"
            passHref
          >
            {link.icon}
            {!isMobile && link.label}
          </Link>
        ))}
      </Container>
    </Container>
  );
}
