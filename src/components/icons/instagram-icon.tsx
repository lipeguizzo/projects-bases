import Image from 'next/image';

interface Props {
  size?: number;
}

export function InstagramIcon({ size = 100 }: Props) {
  return (
    <Image
      src="/assets/instagram-icon.svg"
      alt="instagram-icon.svg"
      style={{
        width: `${size}px`,
        height: 'auto',
        objectFit: 'cover',
      }}
      width={0}
      height={0}
      priority
    />
  );
}
