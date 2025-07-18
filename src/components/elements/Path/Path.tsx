import Image from 'next/image';
import Link from 'next/link';

// CHECKLIST
// [ ] params="crops" subParams="veggie" 로 넣었는데 경로 수정 필요한지 확인해주세요.
// [ ] 추후 리팩토링이 필요합니다.

export function PathCaseOne({ title }: { title: string }) {
  return (
    <div className="flex text-3 gap-2">
      <Link href={`/`} className="text-oguogu-gray-4">
        홈
      </Link>
      <Image src={'/svgs/arrow-right.svg'} alt="arrowIcon" width={6} height={10} className="mb-[1px]" />
      {document.referrer.includes('/search') ? (
        <>
          <Link href="/search" className="text-oguogu-gray-4">
            검색
          </Link>
          <Image src="/svgs/arrow-right.svg" alt="arrowIcon" width={6} height={10} className="mb-[1px]" />
        </>
      ) : document.referrer.includes('/product') ? (
        <>
          <Link href="/product/crop" className="text-oguogu-gray-4">
            탐색
          </Link>
          <Image src="/svgs/arrow-right.svg" alt="arrowIcon" width={6} height={10} className="mb-[1px]" />
        </>
      ) : (
        ''
      )}

      <Link href={`/`}>{title}</Link>
    </div>
  );
}
export function PathCaseTwo({ title, params, subParams }: { title: string; params: string; subParams: string }) {
  return (
    <div className="flex text-[12px] gap-[8px]">
      <Link href={`/`} className="text-oguogu-gray-4">
        홈
      </Link>
      <Image src={`/svgs/arrow-right.svg`} alt="arrowIcon" width={6} height={10} />
      <Link href={`/product`} className="text-oguogu-gray-4">
        탐색
      </Link>
      <Image src={'/svgs/arrow-right.svg'} alt="arrowIcon" width={6} height={10} />
      <Link href={`/product/${params}/${subParams}`}>{title}</Link>
    </div>
  );
}

export function PathCaseThree({ title, params, subParams }: { title: string; params: string; subParams: string }) {
  return (
    <div className="flex text-[12px] gap-[8px]">
      <Link href={`/`} className="text-oguogu-gray-4">
        홈
      </Link>
      <Image src={'/svgs/arrow-right.svg'} alt="arrowIcon" width={6} height={10} />
      <Link href={`/product/${params}/${subParams}`}>{title}</Link>
    </div>
  );
}
