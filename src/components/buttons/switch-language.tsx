'use client';
import { useLocale, useTranslations } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ELocale } from '@/domain/enums/locale.enum';
import { BrazilIcon } from '@/components/icons/brazil-icon';
import { UnitedStatesIcon } from '@/components/icons/united-states-icon';
import { Paragraph } from '@/components/texts';
import { Link, usePathname } from '@/i18n/routing';
import { Container } from '@/components/containers';

export function SwitchLanguage() {
  const translate = useTranslations('Components.SwitchLanguage');
  const locale = useLocale() as ELocale;
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:-translate-y-1 transition-transform duration-300 ease-in-out cursor-pointer">
        {locale === ELocale.PT_BR ? (
          <BrazilIcon size={50} />
        ) : (
          <UnitedStatesIcon size={50} />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col items-center justify-center">
        <DropdownMenuLabel>{translate('label')} </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locale !== ELocale.PT_BR && (
          <DropdownMenuItem>
            <Link href={pathname} locale={ELocale.PT_BR}>
              <Container items="center" className="gap-3">
                <BrazilIcon size={30} />
                <Paragraph size="lg">{ELocale.PT_BR}</Paragraph>
              </Container>
            </Link>
          </DropdownMenuItem>
        )}
        {locale !== ELocale.EN_US && (
          <DropdownMenuItem>
            <Link href={pathname} locale={ELocale.EN_US}>
              <Container items="center" className="gap-3">
                <UnitedStatesIcon size={30} />
                <Paragraph size="lg">{ELocale.EN_US}</Paragraph>
              </Container>
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
