'use client';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Container } from '../containers';
import { ContactFooter, MainFooter, ContentFooter } from '.';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  const { isMobile } = useMediaQuery();

  return (
    <footer className="relative min-w-full min-h-[80vh] md:min-h-[50vh] flex flex-col justify-between items-center p-5 gap-5 z-10 bg-secondary">
      <Container
        direction={isMobile ? 'column' : 'row'}
        justify="space-evenly"
        items="start"
        className="min-w-full gap-5"
      >
        <Container
          justify="center"
          items="start"
          className="min-w-full md:min-w-[25vw] min-h-[45vh] md:min-h-[40vh] gap-5"
        >
          <MainFooter />
        </Container>
        {isMobile && <Separator />}
        <Container
          justify="center"
          items="start"
          className="min-w-full md:min-w-[25vw] min-h-[20vh] md:min-h-[40vh] gap-5"
        >
          <ContactFooter />
        </Container>
        {isMobile && <Separator />}
      </Container>
      <Container
        direction="column"
        justify="space-evenly"
        items="center"
        className="min-w-full min-h-[5vh] gap-5"
      >
        {!isMobile && <Separator />}
        <ContentFooter />
      </Container>
    </footer>
  );
}
