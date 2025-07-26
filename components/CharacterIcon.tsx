// components/CharacterIcon.tsx
"use client";

type Props = {
  src: string;
  alt: string;
  className?: string;
};

export default function CharacterIcon({ src, alt, className }: Props) {
  return <img src={src} alt={alt} className={className} />;
}
