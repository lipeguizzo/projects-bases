'use client';
import { Stack } from '@/components/containers';
import {
  Section,
  SectionBackground,
  SectionContent,
} from '@/components/section';
import { Paragraph, Title } from '@/components/texts';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

export function HomeSection() {
  const translate = useTranslations('ProjectsPage.HomeSection');
  const { isMobile } = useMediaQuery();

  const fetcher = (url: string) =>
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => URL.createObjectURL(blob));

  const { data: imageUrl } = useSWR('/assets/projects-banner.gif', fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60 * 60 * 1000,
  });

  return (
    <Section id="home" className="min-h-[80vh] md:min-h-[60vh]">
      <SectionContent className="justify-evenly">
        <Stack
          justify="center"
          items="center"
          className="relative w-full md:w-[40vw] min-h-[50vh] md:min-h-[50vh] gap-5"
        >
          <Title
            size="5xl"
            color="primary"
            className="absolute md:relative top-[160px] md:top-auto left-10 md:left-auto"
          >
            {translate.rich(isMobile ? 'title-mobile' : 'title', {
              br: (chunks) => (
                <>
                  <br />
                  {chunks}
                </>
              ),
            })}
          </Title>
          <Paragraph
            size="4xl"
            color="white"
            className="absolute md:relative top-[350px] md:top-auto left-10 md:left-auto"
          >
            {translate.rich(isMobile ? 'subtitle-mobile' : 'subtitle', {
              br: (chunks) => (
                <>
                  <br />
                  {chunks}
                </>
              ),
            })}
          </Paragraph>
        </Stack>
      </SectionContent>

      <SectionBackground
        src={!imageUrl ? '/assets/projects-banner-loading.webp' : imageUrl}
        alt="projects-banner"
      />
    </Section>
  );
}
