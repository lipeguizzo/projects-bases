import Image from 'next/image';

interface Props {
  src: string;
  alt: string;
  className?: string;
}

export function SectionBackground({
  src = '',
  alt = '',
  className = '',
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={500}
      height={500}
      style={{
        position: 'absolute',
        objectFit: 'cover',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -20,
      }}
      className={className}
    />
  );
}
