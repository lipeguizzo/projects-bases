import Image from 'next/image';

interface Props {
  size?: number;
}

export function UnitedStatesIcon({ size = 100 }: Props) {
  return (
    <Image
      src="/assets/united-states-icon.svg"
      alt="united-states-icon.svg"
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
