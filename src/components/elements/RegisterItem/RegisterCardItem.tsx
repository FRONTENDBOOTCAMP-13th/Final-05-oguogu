import Image from 'next/image';
import Link from 'next/link';

export default function RegisterCardItem({ type }: { type: 'seller' | 'user' }) {
  return (
    <>
      <Link href={`/register/${type}`}>
        <div className="min-w-[288px] h-full border-1 rounded-xl bg-oguogu-main-light border-oguogu-main pl-4 py-4">
          <Image
            className="mb-3"
            src={`/images/register/register-${type}.svg`}
            alt="타입 아이콘"
            width={30}
            height={30}
          />
          <div className="flex flex-col gap-1">
            <p className="text-[16px]">
              <span className="text-oguogu-main">{type === 'seller' ? '판매자' : '구매자'}</span> 입니다
            </p>
            <p className="text-[12px] text-oguogu-gray-4">
              {type === 'seller'
                ? '내 농산물을 판매하고 고객들과 소통하고 싶어요'
                : '신선한 농산물을 구매하고 지역 농가를 지원하고 싶어요'}
            </p>
            <ul className="text-[10px] text-oguogu-gray-4 list-disc list-inside">
              {type === 'seller' ? (
                <>
                  <li className="">농산물 상품 등록 및 판매</li>
                  <li>텃밭 구독 서비스 관리</li>
                </>
              ) : (
                <>
                  <li className="">신선하고 건강한 유기농 농산물 쇼핑</li>
                  <li>텃밭 구독 서비스 이용</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
}
