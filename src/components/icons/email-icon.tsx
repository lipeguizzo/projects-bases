import Image from 'next/image';

interface Props {
  size?: number;
}

export function EmailIcon({ size = 100 }: Props) {
  return (
    <Image
      src="/assets/email-icon.svg"
      alt="email-icon.svg"
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
