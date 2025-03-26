import { ContactSection } from '../components';
import {
  HomeSection,
  AboutSection,
  UsesSection,
  ProjectsDetailsSection,
} from './components/';

export default function HomePage() {
  return (
    <main>
      <HomeSection />
      <AboutSection />
      <UsesSection />
      <ProjectsDetailsSection />
      <ContactSection />
    </main>
  );
}
