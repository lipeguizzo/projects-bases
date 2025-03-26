'use client';
import { Section, SectionContent } from '@/components/section';
import { Title } from '@/components/texts';
import { Button } from '@/components/ui/button';
import { ELocale } from '@/domain/enums/locale.enum';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export function ProjectsDetailsSection() {
  const translate = useTranslations('HomePage.ProjectsDetailsSection');
  const locale = useLocale() as ELocale;
  const { isMobile } = useMediaQuery();

  return (
    <Section
      id="projects-details"
      className="bg-secondary min-h-[90vh] md:min-h-[60vh]"
    >
      <SectionContent className="justify-evenly items-center gap-10 min-h-[90vh] md:min-h-[60vh]">
        <Title
          size="5xl"
          color="white"
          className="absolute md:relative top-[80px] md:top-auto left-10 md:left-auto"
        >
          {translate.rich(isMobile ? 'title-mobile' : 'title', {
            br: (chunks) => (
              <>
                <br />
                {chunks}
              </>
            ),
            span: (chunks) => <span className="text-primary">{chunks}</span>,
          })}
        </Title>
        <Button
          className="absolute md:relative top-[650px] md:top-auto left-10 md:left-auto w-[45vw] md:w-[15vw] text-xl bg-primary hover:bg-black hover:text-white"
          asChild
        >
          <Link href={'/projetos#'} locale={locale}>
            {translate('button')}
          </Link>
        </Button>
      </SectionContent>
    </Section>
  );
}
