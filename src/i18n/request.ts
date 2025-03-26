import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { ELocale } from '@/domain/enums/locale.enum';
import { isInEnum } from '@/utils/string';

export default getRequestConfig(async ({ requestLocale }) => {
  const currentLocale = await requestLocale;

  const locale =
    !currentLocale || !isInEnum(currentLocale, ELocale)
      ? routing.defaultLocale
      : currentLocale;

  return {
    locale,
    messages: (await import(`../i18n/messages/${locale}.json`)).default,
  };
});
