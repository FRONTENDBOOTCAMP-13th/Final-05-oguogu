import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default async function Info() {
  return (
    <>
      <LinkHeader title="오구텃밭 소개" />
      <main className="min-h-[calc(100vh-48px)] text-gray-800 text-balance">
        {/* 배너 이미지 */}
        <section
          className="w-full h-[180px] sm:h-[260px] bg-cover bg-center"
          style={{ backgroundImage: 'url(/images/info.png)' }}
        />

        {/* 브랜드 미션 */}
        <section className="bg-[#FFFDF5] px-4 sm:px-6 py-12 sm:py-16 max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold mb-5 sm:mb-6 text-oguogu-black leading-snug">
            <span className="text-oguogu-main">로컬</span>이 답이다
          </h1>
          <p className="text-base leading-relaxed text-gray-700 space-y-4">
            오구텃밭은 지역 농부가 직접 키운 신선한 먹거리를 도시의 식탁과 연결합니다.
          </p>
          <p className="text-base leading-relaxed text-gray-700 mt-4">
            유통 단계를 줄여 더 합리적인 가격으로, 더 신선한 품질을 제공합니다.
          </p>
          <p className="text-base leading-relaxed text-gray-700 mt-4">
            자연과 가까운 삶, 이제는 선택이 아니라 우리의 일상이 되어야 합니다.
          </p>
        </section>

        {/* 사용자 가치 제안 */}
        <section className="bg-[#E6F4D9] px-4 sm:px-6 py-14 sm:py-20 text-left sm:text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-oguogu-black">왜 오구텃밭일까요?</h2>
            <p className="text-base leading-relaxed text-gray-700">
              오구텃밭은 식탁 위의 건강이 생산자의 철학에서 시작된다고 믿습니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700 mt-4">
              농부의 손끝에서 시작된 정성이 도시의 식탁까지 따뜻하게 전해지도록, 한 땀 한 땀 오구오구 키운 작물을
              정직하게 전달합니다.
            </p>
            <p className="text-base leading-relaxed text-gray-700 mt-4">
              단순한 쇼핑몰이 아닌, 마음과 마음을 잇는 건강한 연결. 그것이 바로 오구텃밭입니다.
            </p>
          </div>
        </section>

        {/* 서비스 소개 */}
        <section className="bg-white px-4 ">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-oguogu-main">01. 지역 농산물 직거래</h3>
            <p className="text-base leading-relaxed text-gray-700">
              제철 채소, 과일, 곡류, 버섯 등 다양한 작물을 농부로부터 직접 유통합니다. 농약 없이 건강하게 재배된 작물은
              생산자의 얼굴과 이야기와 함께 도착해요. 유통 마진은 줄이고, 정당한 보상은 농부에게. 모두가 만족하는 구조를
              만듭니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-oguogu-main">02. 농촌 체험 관광</h3>
            <p className="text-base leading-relaxed text-gray-700">
              수확 체험, 농장 피크닉, 전통 음식 만들기 등 계절마다 달라지는 다양한 프로그램을 즐겨보세요. 단순한 여행을
              넘어, 자연과 사람을 잇는 진짜 관계를 만들어갑니다.
            </p>
          </div>

          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-oguogu-main">03. 나만의 맞춤 텃밭</h3>
            <p className="text-base leading-relaxed text-gray-700">
              원하는 작물을 신청하면, 농부가 씨앗부터 수확까지 정성껏 길러드립니다. 작물의 성장 과정은 사진과 이야기로
              전달되며, 마치 나만의 농장을 가꾸는 듯한 특별한 경험이 됩니다.
            </p>
          </div>
        </section>

        {/* 엔딩 슬로건 */}
        <section className="bg-[#FAFAFA] text-center border-t border-gray-100 py-10 sm:py-14 px-4 sm:px-6">
          <p className="text-xs sm:text-sm text-gray-500">함께 키우고, 함께 나누는 삶</p>
          <p className="text-base sm:text-lg font-medium mt-2 text-oguogu-black">지금, 오구텃밭에서 시작하세요.</p>
        </section>
      </main>
    </>
  );
}
