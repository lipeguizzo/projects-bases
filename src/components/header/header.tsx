'use client';
import { Container } from '@/components/containers';
import { ContactNavbar, MainNavbar, MobileNavbar } from '@/components/navbar';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useEffect, useState } from 'react';

export function Header() {
  const { isMobile } = useMediaQuery();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    setIsScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 min-w-full h-[15vh] flex justify-evenly items-center duration-300 z-10 ${
        isScrolled ? 'bg-secondary/80' : 'bg-transparent'
      }`}
    >
      <Container
        justify="center"
        items="center"
        className="w-[50vw] md:w-[20vw]"
      >
        <ContactNavbar />
      </Container>
      <Container
        justify="center"
        items="center"
        className="w-[35vw] md:w-[60vw] gap-5"
      >
        {isMobile ? <MobileNavbar /> : <MainNavbar />}
      </Container>
    </header>
  );
}
