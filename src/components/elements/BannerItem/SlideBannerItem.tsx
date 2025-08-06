import { SlideBannerItemType } from '@/components/elements/BannerItem/SlideBannerItem.type';
import Link from 'next/link';
import React from 'react';

function SlideBannerItem({ order, title, subtitle, text, className, link }: SlideBannerItemType) {
  return (
    <Link href={link}>
      <figure className={`relative w-[210px] h-[280px] overflow-hidden rounded-[12px] transform ${className}`}>
        <video
          src={`/videos/main-banner-${order}.mp4`}
          autoPlay
          muted
          controls={false}
          loop
          playsInline
          preload="auto"
          className="pointer-events-none"
        ></video>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <figcaption className="absolute bottom-0 left-0 w-full text-oguogu-white text-center py-5">
          <p className="text-[20px] font-bold leading-none">{title}</p>
          <p className="text-[20px] font-bold leading-normal">{subtitle}</p>
          <p className="pt-1 text-xs leading-none text-oguogu-gray-2">{text}</p>
        </figcaption>
      </figure>
    </Link>
  );
}

export default React.memo(SlideBannerItem);
