import { Page, PageContent, PageHeader } from '@/shared/layout/components/page';
import { CardList, WelcomeTitle } from '../components';

export function Home() {
  return (
    <Page>
      <PageHeader>
        <WelcomeTitle />
      </PageHeader>
      <PageContent>
        <CardList />
      </PageContent>
    </Page>
  );
}
