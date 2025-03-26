import Image from 'next/image';

interface Props {
  size?: number;
}

export function BrazilIcon({ size = 100 }: Props) {
  return (
    <Image
      src="/assets/brazil-icon.svg"
      alt="brazil-icon.svg"
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
