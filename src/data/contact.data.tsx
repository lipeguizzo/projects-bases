import { EmailIcon, InstagramIcon, WhatsappIcon } from '@/components/icons';
import { IContactLink } from '@/domain/interfaces/contact-link.interface';
import { formatPhoneNumber } from '@/utils/phone';

export const contactLinks: IContactLink[] = [
  {
    href: `https://mail.google.com/mail/?view=cm&fs=1&to=${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`,
    label: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? '',
    icon: <EmailIcon size={50} />,
  },
  {
    href: `https://api.whatsapp.com/send/?phone=${process.env.NEXT_PUBLIC_CONTACT_PHONE}`,
    label: formatPhoneNumber(process.env.NEXT_PUBLIC_CONTACT_PHONE ?? ''),
    icon: <WhatsappIcon size={50} />,
  },
  {
    href: process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM ?? '',
    label: 'Instagram',
    icon: <InstagramIcon size={50} />,
  },
];
