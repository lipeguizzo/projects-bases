import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { ELocale } from '@/domain/enums/locale.enum';

export const routing = defineRouting({
  locales: Object.entries(ELocale).map(([, value]) => value as string),

  defaultLocale: ELocale.PT_BR,
});

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
