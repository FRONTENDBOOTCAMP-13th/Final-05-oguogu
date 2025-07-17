import Title from '@/components/elements/CommonTitleItem/Title';
import CropItem from '@/components/elements/ProductItem/CropItem/CropItem';
import ExperienceItem from '@/components/elements/ProductItem/ExperienceItem/ExperienceItem';
import GardenItem from '@/components/elements/ProductItem/SubscribeItem/GardenItem';
import QnaItem from '@/components/elements/QnaItem/QnaItem';
import ReviewItem from '@/components/elements/ReviewItem/ReviewItem';

export default function ProductListByType() {
  return (
    <>
      <h1>1차 카테고리 상품 목록 페이지</h1>
      <h2>experience : 체험 상품</h2>
      <h2>gardening : 텃밭 상품</h2>
      <h2>crop : 농산물 상품</h2>
      <Title title="온 가족이 함께 즐기는 텃밭 체험" content="7월 한 달 간 체험 상품 20% 할인!" />
      <QnaItem state={true} isPrivate={true} viewerRole="other" />
      {/* 예시로 이름이랑 이메일 넘겼습니다. 사용할때는 api에서 이름 이메일 뽑아서 props로 전달하면 됩니다. */}
      <ReviewItem name="김재현" email="1234@gamil.com" />
      <CropItem _id={1} name="쫀득쫀든 대학 미백 찰옥수수 30개입" originPrice="11,800" />
      <GardenItem />
      <ExperienceItem />
    </>
  );
}
