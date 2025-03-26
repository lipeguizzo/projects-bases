'use client';
import { Spinner } from '@/components/loadings';
import { Section, SectionContent, SectionHeader } from '@/components/section';
import { Title } from '@/components/texts';
import { Badge } from '@/components/ui/badge';
import { GithubRepository } from '@/repositories/github.repository';
import { useTranslations } from 'next-intl';
import useSWR from 'swr';

export function BaseProjectsSection() {
  const translate = useTranslations('ProjectsPage.BaseProjectsSection');

  const githubRepository = new GithubRepository();

  const { data, isLoading } = useSWR(['branches'], ([,]) =>
    githubRepository.findRepositoryBranches('lipeguizzo', 'projects-bases'),
  );

  return (
    <Section
      id="projects"
      className=" bg-black min-h-[120vh] md:min-h-[50vh] p-5"
    >
      <SectionHeader>
        <Title size="4xl" color="primary" className="text-center">
          {translate('title')}
        </Title>
      </SectionHeader>
      <SectionContent className="min-h-[110vh] md:min-h-[40vh] flex-col md:flex-row justify-evenly items-center flex-wrap gap-5 p-10">
        {data
          ?.filter((item) => item.name !== 'main')
          .map((item) => (
            <Badge
              key={item.name}
              variant="secondary"
              className="uppercase text-xl p-3"
            >
              {item.name}
            </Badge>
          ))}
        <Spinner loading={isLoading} />
      </SectionContent>
    </Section>
  );
}
