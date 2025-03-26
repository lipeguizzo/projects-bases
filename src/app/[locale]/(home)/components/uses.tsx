'use client';
import { Section, SectionContent, SectionHeader } from '@/components/section';
import { Paragraph, Title } from '@/components/texts';
import { usesItems } from '@/data/uses.data';
import { useTranslations } from 'next-intl';

export function UsesSection() {
  const translate = useTranslations('HomePage.UsesSection');

  return (
    <Section id="uses" className="bg-black min-h-[120vh] md:min-h-[50vh] p-5">
      <SectionHeader>
        <Title size="4xl" color="primary" className="text-center">
          {translate('title')}
        </Title>
      </SectionHeader>
      <SectionContent className="flex-col md:flex-row justify-evenly items-center flex-wrap gap-5 p-5">
        <ul className="min-w-full min-h-full flex flex-col justify-center items-center gap-5">
          {usesItems.map((item) => (
            <li key={item.label}>
              <Paragraph size="2xl" color="white" className="text-center">
                {translate(item.label)}
              </Paragraph>
            </li>
          ))}
        </ul>
      </SectionContent>
    </Section>
  );
}
