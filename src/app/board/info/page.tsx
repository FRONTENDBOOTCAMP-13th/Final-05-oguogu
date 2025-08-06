import LinkHeader from '@/components/layouts/Header/LinkHeader';

import { Leaf, MapPin, Sprout } from 'lucide-react';
import Footer from '@/components/layouts/Footer/Footer';
import { DeveloperTeamSection, VideoPreviewSection } from '@/app/board/info/InfoClientComponents';

export default function Info() {
  const features = [
    {
      icon: <Leaf className="w-8 h-8 text-oguogu-main" />,
      title: '지역 농산물 직거래',
      description:
        '제철 채소, 과일, 곡류, 버섯 등 다양한 작물을 농부로부터 직접 유통합니다. 농약 없이 건강하게 재배된 작물은 생산자의 얼굴과 이야기와 함께 도착해요.',
      color: 'bg-oguogu-main-light border-oguogu-main',
    },
    {
      icon: <MapPin className="w-8 h-8 text-amber-600" />,
      title: '농촌 체험 관광',
      description:
        '수확 체험, 농장 피크닉, 전통 음식 만들기 등 계절마다 달라지는 다양한 프로그램을 즐겨보세요. 단순한 여행을 넘어, 자연과 사람을 잇는 진짜 관계를 만들어갑니다.',
      color: 'bg-amber-50 border-amber-200',
    },
    {
      icon: <Sprout className="w-8 h-8 text-oguogu-main-dark" />,
      title: '나만의 맞춤 텃밭',
      description:
        '원하는 작물을 신청하면, 농부가 씨앗부터 수확까지 정성껏 길러드립니다. 작물의 성장 과정은 사진과 이야기로 전달되며, 마치 나만의 농장을 가꾸는 듯한 특별한 경험이 됩니다.',
      color: 'bg-oguogu-main-light border-oguogu-main-dark',
    },
  ];

  const previews = [
    {
      title: '사용자 기능 가이드',
      description: '농산물 주문부터 체험 예약까지, 구매자를 위한 완벽 가이드',
      videoUrl: '/videos/userGuide.mp4',
      thumbnail: '🛒',
      color: 'from-oguogu-main to-oguogu-main-dark',
    },
    {
      title: '판매자 기능 가이드',
      description: '상품 등록부터 주문 관리까지, 농부님을 위한 판매 가이드',
      videoUrl: '/videos/sellerGuide.mp4',
      thumbnail: '🧑‍🌾',
      color: 'from-amber-400 to-orange-500',
    },
  ];

  const farmers = [
    {
      name: '최영준 농부님',
      role: '팀장, PM',
      github: 'https://github.com/jjmullan',
      message: '사용자가 쉽게 농산물을 찾을 수 있도록 UI를 가꿨습니다 ',
      avatar: '🧑‍🌾',
      fullReview:
        '처음에는 농산물 쇼핑몰이라는 주제가 어색했지만, 개발하면서 정말 의미 있는 프로젝트라는 걸 깨달았어요. 사용자 경험을 고민하며 직관적인 인터페이스를 만들기 위해 노력했습니다. 특히 농부님들의 스토리를 어떻게 전달할지, 신선함을 어떻게 시각적으로 표현할지 고민이 많았어요. React와 Next.js를 활용해서 성능 최적화도 신경 쓰면서 개발했는데, 결과물을 보니 뿌듯합니다. 앞으로도 사용자와 농부를 잇는 다리 역할을 하는 서비스가 되었으면 좋겠어요!',
    },
    {
      name: '정원식 농부님',
      role: '팀원',
      github: 'https://github.com/jwe0516',
      message: '든든한 서버로 농산물 데이터를 안전하게 관리했어요 ',
      avatar: '👩‍🌾',
      fullReview:
        '백엔드 개발을 담당하면서 가장 중요하게 생각한 건 데이터의 신뢰성이었어요. 농산물의 신선도, 재고 관리, 주문 처리 등 모든 과정이 실시간으로 정확하게 반영되어야 하니까요. Node.js와 Express를 사용해서 RESTful API를 구축했고, 데이터베이스 설계할 때도 확장성을 많이 고려했습니다. 특히 농부님들이 쉽게 상품을 등록하고 관리할 수 있는 시스템을 만드는 게 목표였어요. 보안 부분도 신경 써서 사용자 정보와 결제 데이터를 안전하게 보호하도록 구현했습니다.',
    },
    {
      name: '김지연 농부님',
      role: '팀원',
      github: 'https://github.com/ji-yeoni',
      message: '프론트부터 백엔드까지, 모든 밭을 골고루 가꿨습니다 ',
      avatar: '🧑‍🌾',
      fullReview:
        '풀스택 개발자로서 프론트엔드와 백엔드를 오가며 전체적인 서비스 흐름을 책임졌어요. 가장 기억에 남는 건 실시간 채팅 기능을 구현할 때였는데, 농부님과 고객이 직접 소통할 수 있는 창구를 만드는 게 정말 의미 있다고 느꼈거든요. Socket.io를 활용해서 실시간 소통이 가능하도록 했고, 모바일에서도 원활하게 작동하도록 반응형 디자인에도 신경 썼습니다. 개발하면서 농업과 기술이 만나는 지점에서 새로운 가능성을 많이 발견했어요. 앞으로 더 많은 기능을 추가해서 농촌과 도시를 잇는 플랫폼으로 발전시키고 싶습니다.',
    },
    {
      name: '김재현 농부님',
      role: '팀원, PL',
      github: 'https://github.com/jaehyun0620',
      message: '이제, 두렵지 않아요! ',
      avatar: '👩‍🌾',
      fullReview:
        "부트캠프를 시작할 때, 도움이 되는 팀원, 1인분을 해내는 개발자가 되고 싶다는 목표를 세웠습니다. 그리고 이번 프로젝트를 통해 그 목표에 한 발짝 더 가까워진 것 같아 뿌듯합니다. Next.js와 React를 기반으로 zustand로 전역상태를 관리하고, API를 사용해 데이터를 다루는 등 다양한 기술을 직접 다뤄보며 실전 감각을 익힐 수 있었습니다. 또한 Git을 통한 협업 경험은 실무에 대한 자신감을 키우는 데 큰 도움이 되었습니다. 무엇보다 팀원들과 유쾌하게 소통하며 즐겁게 프로젝트를 완주할 수 있었던 시간이 오래도록 기억에 남을 것 같습니다. 함께한 '오구오구' 팀원들의 앞날을 진심으로 응원합니다.",
    },
  ];

  return (
    <>
      <LinkHeader title="오구텃밭 소개" />
      <main className="min-h-[calc(100vh-48px)] text-gray-800">
        {/* 히어로 섹션 */}
        <section className="relative overflow-hidden bg-gradient-to-br from-oguogu-main-light via-oguogu-white to-oguogu-main-light">
          <div className="absolute inset-0 bg-[url('/images/mainInfo.png')] bg-cover bg-center opacity-30"></div>
          <div className="relative px-4 sm:px-6 py-20 max-w-4xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
                <span className="text-oguogu-main">로컬</span>이 답이다
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
                오구텃밭은 지역 농부가 직접 키운 신선한 먹거리를 도시의 식탁과 연결합니다.
              </p>
              <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg inline-block border border-oguogu-main shadow-lg">
                <p className="text-oguogu-main-dark">
                  자연과 가까운 삶, 이제는 선택이 아니라 우리의 일상이 되어야 합니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 브랜드 가치 섹션 */}
        <section className="bg-white px-4 sm:px-6 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-oguogu-main-light px-4 py-2 rounded-full mb-6">
              <span className="text-oguogu-main-dark font-medium">왜 오구텃밭일까요?</span>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              마음과 마음을 잇는 <span className="text-oguogu-main">건강한 연결</span>
            </h2>
            <div className="bg-gradient-to-r from-oguogu-main-light to-oguogu-main-light p-8 rounded-lg border border-oguogu-main shadow-lg">
              <p className="text-lg text-gray-700 leading-relaxed">
                오구텃밭은 식탁 위의 건강이 생산자의 철학에서 시작된다고 믿습니다. 농부의 손끝에서 시작된 정성이 도시의
                식탁까지 따뜻하게 전해지도록, 한 땀 한 땀 오구오구 키운 작물을 정직하게 전달합니다.
              </p>
            </div>
          </div>
        </section>

        {/* 주요 기능 섹션 */}
        <section className="bg-gray-50 px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                오구텃밭의 <span className="text-oguogu-main">서비스</span>
              </h2>
              <p className="text-gray-600">농부와 소비자를 잇는 세 가지 방법</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-oguogu-main-light p-4 rounded-full mb-6">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 기능 미리보기 섹션 */}
        <section className="bg-gray-50 px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="text-oguogu-main">실제 서비스</span> 미리보기
              </h2>
            </div>

            <VideoPreviewSection previews={previews} />
          </div>
        </section>

        {/* 개발팀 소개 섹션 */}
        <section className="bg-white px-4 sm:px-6 py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                <span className="text-oguogu-main">개발팀</span> 소개
              </h2>
            </div>

            <DeveloperTeamSection farmers={farmers} />
          </div>
        </section>

        {/* 마무리 섹션 */}
        <Footer />
      </main>
    </>
  );
}
