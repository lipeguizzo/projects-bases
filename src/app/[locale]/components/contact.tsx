'use client';
import { Container } from '@/components/containers';
import { Section, SectionContent, SectionHeader } from '@/components/section';
import { Title } from '@/components/texts';
import { contactLinks } from '@/data/contact.data';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

export function ContactSection() {
  const translate = useTranslations('SharedSection.ContactSection');
  const { isMobile } = useMediaQuery();
  return (
    <Section id="contact" className="bg-white min-h-[20vh] md:min-h-[80vh] p-5">
      <SectionHeader>
        <Title size="5xl" color="primary">
          {translate('title')}
        </Title>
      </SectionHeader>

      <SectionContent className="justify-evenly">
        <Container
          direction={isMobile ? 'row' : 'column'}
          justify="space-evenly"
          className="w-full md:w-[60vh] h-auto md:h-[50vh] p-5"
        >
          {contactLinks.map((link) => (
            <Link key={link.href} href={link.href} legacyBehavior passHref>
              <a
                target="_blank"
                className="flex items-center gap-5 text-lg md:text-xl text-primary duration-300 hover:-translate-y-[4px] hover:text-black"
              >
                {link.icon} {!isMobile && link.label}
              </a>
            </Link>
          ))}
        </Container>
        {!isMobile && (
          <Container justify="center" items="center">
            <Image
              src="/assets/contact.webp"
              alt="contact.webp"
              width={390}
              height={390}
              className="w-auto h-auto"
            />
          </Container>
        )}
      </SectionContent>
    </Section>
  );
}
