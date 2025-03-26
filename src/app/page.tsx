import { ELocale } from '@/domain/enums/locale.enum';
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect(ELocale.PT_BR);
}
