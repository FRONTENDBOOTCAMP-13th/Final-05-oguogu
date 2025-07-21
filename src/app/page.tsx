'use client';

import Header from '@/components/layouts/Header/Header';
import Navigation from '@/components/layouts/Navigation/Navigation';
import SlideBanner from '@/components/layouts/Banner/SlideBanner';
import { ImageCategory } from '@/components/layouts/Category/Category';
import Title from '@/components/elements/CommonTitleItem/Title';
import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import Link from 'next/link';
import { loginUser } from '@/shared/data/actions/user';
import { useAuthStore, userInfo } from '@/shared/store/authStore';

export default function Home() {
  // 전역관리 테스트
  const { setToken, setUserInfo, logout } = useAuthStore.getState();

  const login = async () => {
    const loginRes = await loginUser({ email: '123api@market.com', password: '123123' });
    console.log(loginRes);
    setToken(loginRes.item.token.accessToken);
    const userInfo: userInfo = {
      _id: loginRes.item._id,
      name: loginRes.item.name,
      type: loginRes.item.type,
    };
    setUserInfo(userInfo);
  };

  return (
    <>
      <Header cartItemCount={100} />
      <Navigation />
      <SlideBanner />
      <ImageCategory />
      <ProductLinkItem link="/product/crop" linkTitle="전체 농산물" subTxt="보러 가기" />
      <main className="flex flex-col">
        <Title title="온 가족이 함께 즐기는 텃밭 체험" content="7월 한 달 간 체험 상품 20% 할인!" type="experience" />
        <ProductLinkItem
          keywordParams=""
          typeParams=""
          link="/product/experience"
          linkTitle="전체 체험 상품"
          subTxt="보러 가기"
        />
        <Title title="톡! 터지는 옥수수의 반전 매력" content="7월 제철 채소 옥수수🌽" type="crop" />
        <ProductLinkItem link="/search/result" keywordParams="옥수수" linkTitle="옥수수" subTxt="구매하러 가기" />
        {/* <Title title="톡! 터지는 옥수수의 반전 매력" content="7월 제철 채소 옥수수🌽" type="gardening" /> */}
      </main>
      <footer>
        <Link href="/search/result/1/detail">상세페이지로 이동하기 (임시)</Link>
        <button className="w-full bg-amber-100" type="button" onClick={login}>
          로그인 버튼(테스트용)
        </button>
        <button className="w-full bg-amber-100" type="button" onClick={logout}>
          로그아웃 버튼(테스트용)
        </button>
      </footer>
      {/* <Image
        src="/images/image.png"
        width={180}
        height={180}
        alt="ogu"
        className="hidden fixed bottom-[30px] left-1/2 translate-x-[420px] mobile-max:block"
      />
      <Image
        src="/images/qr.png"
        width={180}
        height={180}
        alt="ogu"
        className="hidden fixed bottom-2/7 left-1/2 translate-x-[420px] mobile-max:block"
      /> */}
    </>
  );
}
