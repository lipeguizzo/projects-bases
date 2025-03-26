import Image from 'next/image';

interface Props {
  size?: number;
}

export function WhatsappIcon({ size = 100 }: Props) {
  return (
    <Image
      src="/assets/whatsapp-icon.svg"
      alt="whatsapp-icon.svg"
      style={{
        width: `${size}px`,
        height: 'auto',
        objectFit: 'cover',
      }}
      width={0}
      height={0}
    />
  );
}
