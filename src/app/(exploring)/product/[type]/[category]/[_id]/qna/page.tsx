import ProductLinkItem from '@/components/elements/ProductLink/ProductLink';
import QnaItem from '@/components/elements/QnaItem/QnaItem';
import { QnaSortBar } from '@/components/layouts/SortBar/Sortbar';

{
  /* <BuyBoxOption type="crop" name="쫀득쫀득 대학 미백 찰옥수수 30개입" price={11800} maxQuantity={10} />
      <BuyBoxOption type="experience" name="감자 캐기 체험" price={10000} maxQuantity={4} />
      <BuyBoxOption type="gardening" name="초당옥수수 7월 수확" price={10000} /> */
}

export default function ProductQna() {
  const loggined: boolean = false;

  return (
    <div>
      <QnaSortBar />
      <section className="px-4 flex flex-col gap-4">
        {loggined ? (
          <button className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            문의글 작성하기
          </button>
        ) : (
          <button className="border-2 py-1 border-oguogu-main-dark rounded-[4px] flex items-center text-center justify-center">
            <p className="text-oguogu-main pr-1 ">로그인</p> 후 문의글 작성하기
          </button>
        )}
        <ProductLinkItem linkTitle="전체 농산물" />
      </section>

      <section>
        <QnaItem state={true} isPrivate={false} viewerRole="other" />
        <QnaItem state={true} isPrivate={true} viewerRole="other" />
        <QnaItem state={false} isPrivate={false} viewerRole="other" />
        <QnaItem state={true} isPrivate={true} viewerRole="owner" />
        <QnaItem state={true} isPrivate={false} viewerRole="other" />
        <QnaItem state={true} isPrivate={false} viewerRole="other" />
        <QnaItem state={true} isPrivate={false} viewerRole="other" />
        <QnaItem state={true} isPrivate={false} viewerRole="other" />
      </section>
    </div>
  );
}
