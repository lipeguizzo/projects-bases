import { footerLinks } from '@/data/footer.data';
import { ELocale } from '@/domain/enums/locale.enum';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Container } from '../containers';
import { Title } from '../texts';
import { useMediaQuery } from '@/hooks/use-media-query';

export function MainFooter() {
  const translate = useTranslations('Components.Footer');
  const locale = useLocale() as ELocale;
  const { isMobile } = useMediaQuery();

  return (
    <Container
      direction="column"
      items={isMobile ? 'center' : 'start'}
      className="gap-5"
    >
      <Title size="4xl" color="primary" className="uppercase md:normal-case">
        {translate('website')}
      </Title>
      {footerLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          locale={locale}
          className={`uppercase md:normal-case ${
            isMobile ? 'text-2xl' : 'text-xl'
          } text-white hover:text-primary duration-300`}
          passHref
        >
          {translate(link.label)}
        </Link>
      ))}
    </Container>
  );
}
