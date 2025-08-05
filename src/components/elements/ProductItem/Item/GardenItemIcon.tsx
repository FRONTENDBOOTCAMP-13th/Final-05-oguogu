import Image from 'next/image';

export default function GardenItemIcon({ icon }: { icon: 'remain' | 'start' | 'end' }) {
  let src: string = '';
  if (icon === 'remain') {
    src = '/images/iconImage/icon-remain.svg';
  } else if (icon === 'start') {
    src = '/images/iconImage/icon-start.svg';
  } else if (icon === 'end') {
    src = '/images/iconImage/icon-end.svg';
  }

  return <Image src={src} alt="" aria-hidden="true" width={10} height={10} />;
}
