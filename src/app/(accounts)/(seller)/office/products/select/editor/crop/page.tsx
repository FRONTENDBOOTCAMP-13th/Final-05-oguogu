import Input from '@/components/elements/LoginItem/Input';
import SellerProductEditOption from '@/components/elements/OrderOption/SellerProductEditOption';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function CropProductEditor() {
  return (
    <>
      <LinkHeader title="농산물 상품 등록/수정" />
      <main className="p-4 flex flex-col gap-4">
        <Input type="basic" title="제목" placeholder="상품명 (최대 30자)" id="title" required={true} />
        <Input type="basic" title="부제목" placeholder="상품 설명 (최대 30자)" id="title" required={true} />
        <SellerProductEditOption />
        <Input
          type="unitOne"
          title="총 판매 수량"
          placeholder="상품 설명 (최대 30자)"
          id="title"
          required={true}
          unit="개"
        />
        <Input
          type="unitOne"
          title="최대 구매 가능 수량"
          placeholder="상품명 (최대 30자)"
          id="title"
          required={true}
          unit="개"
        />
        <Input
          type="unitTwo"
          title="상품구성"
          placeholder="상품별 낱개 수량"
          secondPlaceholder="포장된 상품 수량"
          id="title"
          required={true}
          unit="개"
          secontUnit="개"
        />
        <Input
          type="unitTwo"
          title="판매 가격 및 할인율"
          placeholder="상품명 (최대 30자)"
          secondPlaceholder="(선택) 할인율"
          id="title"
          required={true}
          secondRequired={false}
          unit="원"
          secontUnit="%"
        />
        <Input type="readOnly" title="최종 가격" placeholder="(최종 가격 계산식)" id="title" required={true} />
        <Input
          type="unitOne"
          title="배송비"
          placeholder="(선택) 건당 배송비 (미작성시 무료)"
          id="title"
          required={false}
          unit="원"
        />
        <Input type="file" title="대표 이미지" id="title" required={true} />
        <Input type="fileDetail" title="상품 상세 설명" id="title" required={true} />
        <button
          type="button"
          className={` flex flex-1 items-center justify-center text-center 
         bg-oguogu-main text-oguogu-white
         px-[24px] py-[6px] rounded-[4px]`}
        >
          상품 등록
        </button>
      </main>
    </>
  );
}
