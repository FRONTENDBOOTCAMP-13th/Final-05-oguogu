import Image from 'next/image';

export default function CuteLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="flex items-center justify-center gap-2">
        <Image
          src="/svgs/loading-carrot.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
        />
        <Image
          src="/svgs/loading-tomato.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
          style={{ animationDelay: '0.3s' }}
        />
        <Image
          src="/svgs/loading-broccoli.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
          style={{ animationDelay: '0.6s' }}
        />
        <Image
          src="/svgs/loading-corn.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
          style={{ animationDelay: '0.9s' }}
        />
        <Image
          src="/svgs/loading-eggplant.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
          style={{ animationDelay: '1.2s' }}
        />
        <Image
          src="/svgs/loading-sweetpotato.svg"
          alt=""
          aria-hidden="true"
          width={48}
          height={48}
          className="animate-wave"
          style={{ animationDelay: '1.5s' }}
        />
      </div>
      <p className="mt-4 text-sm text-oguogu-gray animate-pulse">신선한 농산물을 준비 중이에요...</p>
    </div>
  );
}
