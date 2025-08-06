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
      message: '저는 절대 팀장 안해요',
      avatar: '🧑‍🌾',
      fullReview:
        '팀의 리더보다는 팀의 일원으로서 팀을 돕는 것이 좋았다. 그것이 나의 역할이고, 나의 강점이라고 생각했다. 이번에 팀장을 맡게 되면서 많은 걱정이 있었다. 그래서 더 많이 공부했다. 어떻게 하면 프로젝트를 잘 마무리할 수 있을지 고민하고, 늦은 시간까지 자리를 지키려 노력했던 것 같다. 멋진 팀원들과 함께 하나의 완성된 결과물을 만들어내기 위해 노력해 온 지난 한 달의 시간은 너무나 값진 시간이었다. 당장 배운 기술을 써먹기도 힘들어 코드 한 줄도 쓰기 어려웠던 내가, 이제는 팀원이 작성한 코드를 보면서 수정해 나가는 걸 보면 많이 성장했음을 느낀다. 프로젝트를 완수하기 위해 매일 늦은 시간, 심지어는 주말까지 할애하여 묵묵하게 각자의 업무를 다해준 팀원분들께 감사의 말을 전한다.',
    },
    {
      name: '정원식 농부님',
      role: '팀원, QA 담당',
      github: 'https://github.com/jwe0516',
      message: '상상한 것을 만들고 싶어요',
      avatar: '👩‍🌾',
      fullReview:
        '이번 프로젝트를 통해 가장 크게 깨달은 것은 체계적인 계획과 이를 착실히 실행해 나가는 것의 중요성이었습니다. 먼저 매일 팀 노션을 정리하며 팀의 흐름을 잘 이끌어준 팀장님께 정말 감사드립니다. 덕분에 프로젝트 첫 주차에 주차별 목표를 세분화해 계획을 세우고 이를 바탕으로 팀의 방향성을 명확히 설정하여 효과적인 팀 회의를 매일 진행할 수 있었습니다. 개발 과정에서 느꼈던 것은 단순히 기능 구현만으로는 프로젝트를 완성할 수 없다는 점이었습니다. 주차별 배포의 중요성을 실감했으며 배포 후 발생하는 버그를 발견하고 리팩토링하는 과정에 충분한 시간을 할애해야 한다는 점을 배웠습니다. 배포 결과에 예상치 못한 버그나 이슈가 발생했을 때 빠르게 대응하려고 했지만 원하는 방식대로 해결되지 않는 경우가 많았습니다. 이때 제가 겪고 있는 문제에 대해서 원인도 모르고 AI에게 도움을 받으면서도 당장 문제를 해결하여도 코드에 대해 명확히 설명하지 못해서 아쉽게 느껴집니다. 이러한 아쉬움을 발판 삼아 단순히 돌아가는 코드가 아닌 더 나은 구조와 명확한 의도를 가진 코드를 작성하고 설명할 수 있는 개발자가 되도록 노력하겠습니다. 마지막으로 좋은 팀원들을 만나 많은 것을 배울 수 있었음에 진심으로 감사드립니다. 각자의 역할을 충실히 해내며 서로를 배려하고 격려해준 덕분에 잘 마무리할 수 있었습니다. 여러분의 앞날을 진심으로 응원하며 다들 원하는 목표를 꼭 이루시길 바랍니다 !',
    },
    {
      name: '김지연 농부님',
      role: '팀원, 문서 담당',
      github: 'https://github.com/ji-yeoni',
      message: '좋은 팀과 함께여서 가능했던 완주!',
      avatar: '🧑‍🌾',
      fullReview:
        '파이널 프로젝트를 시작하기 전에는 React와 Next.js 수업을 따라가는 것조차 벅차 자신감이 없었고, 팀원들에게 피해를 주지 않을까 걱정도 많았습니다. 특히 이번 프로젝트는 기획부터 디자인, 개발, 배포까지 전 과정을 팀원들과 함께 만들어가야 했기 때문에 더 큰 부담감을 느꼈습니다. 하지만 다행히도 좋은 팀원 분들을 만나 함께하며 많은 것을 배우고 성장할 수 있었습니다. 처음에는 작은 기능 하나 구현하는 것도 쉽지 않았지만 코드 리뷰, 기능 분담, 팀 회고 등을 통해 점차 실무에 가까운 개발 흐름을 익히고 협업 방식에 적응해 나가면서 개발자로서의 자신감과 책임감을 키울 수 있었습니다. 또한 이번 경험을 통해 단순한 기능 구현을 넘어 사용자 흐름, UX 개선, 코드의 유지보수성 등 다양한 관점에서 고민하고 적용해보는 뜻 깊은 시간을 보낼 수 있었습니다. 아직 부족한 점이 많지만, 프로젝트 종료 이후에도 지속적으로 리팩토링 및 고도화를 시도해보고 싶습니다. 프로젝트를 함께한 오구오구 팀원분들, 정말 고생 많으셨고 감사합니다! 🙇‍♀️',
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
