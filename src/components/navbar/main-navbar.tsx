import { SwitchLanguage } from '@/components/buttons';
import {
  NavigationMenu,
  NavigationMenuItem,
} from '@/components/ui/navigation-menu';
import { navbarLinks } from '@/data/navbar.data';
import { ELocale } from '@/domain/enums/locale.enum';
import { Link } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';

export function MainNavbar() {
  const translate = useTranslations('Components.Navbar');
  const locale = useLocale() as ELocale;
  return (
    <NavigationMenu className="min-w-full justify-evenly list-none">
      {navbarLinks.map((link) => (
        <NavigationMenuItem
          key={link.href}
          className="hover:-translate-y-[4px] duration-300"
        >
          <Link
            href={link.href}
            locale={locale}
            className="text-xl text-white hover:text-primary duration-300"
            passHref
          >
            {translate(link.label)}
          </Link>
        </NavigationMenuItem>
      ))}
      <SwitchLanguage />
    </NavigationMenu>
  );
}
