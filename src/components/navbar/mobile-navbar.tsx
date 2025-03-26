import { SwitchLanguage } from '@/components/buttons';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { navbarLinks } from '@/data/navbar.data';
import { AlignJustify } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { ELocale } from '@/domain/enums/locale.enum';
import { useState } from 'react';

export function MobileNavbar() {
  const translate = useTranslations('Components.Navbar');
  const locale = useLocale() as ELocale;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Sheet open={open} onOpenChange={(open) => !open && setOpen(false)}>
      <SwitchLanguage />
      <SheetTrigger>
        <AlignJustify
          size={50}
          color="white"
          className="hover:-translate-y-[4px] transition-transform duration-300 ease-in-out cursor-pointer"
          onClick={() => setOpen(true)}
        />
      </SheetTrigger>
      <SheetContent
        side="top"
        className="flex flex-col justify-center items-center p-3 gap-5 rounded-b-2xl bg-secondary border-secondary"
      >
        <SheetTitle></SheetTitle>
        {navbarLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            locale={locale}
            onClick={() => setOpen(false)}
            className="text-2xl text-white hover:text-primary hover:-translate-y-[4px] transition-transform duration-300 ease-in-out cursor-pointer"
            passHref
          >
            {translate(link.label)}
          </Link>
        ))}
      </SheetContent>
    </Sheet>
  );
}
