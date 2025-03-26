import { contactLinks } from '@/data/contact.data';
import Link from 'next/link';
import { Container } from '../containers';

export function ContactNavbar() {
  return (
    <Container className="gap-5">
      {contactLinks.map((link) => (
        <Link key={link.href} href={link.href} legacyBehavior passHref>
          <a target="_blank" className="hover:-translate-y-[4px] duration-300">
            {link.icon}
          </a>
        </Link>
      ))}
    </Container>
  );
}
