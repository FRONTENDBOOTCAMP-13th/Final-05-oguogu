import { ImageCategoryItem, TextCategoryItem } from '@/components/elements/CategoryItem/CategoryItem';
import ProductLink from '@/components/elements/ProductLink/ProductLink';

/**
 * 이미지형 카테고리 컴포넌트
 * @returns {HTMLElement}
 */
export function ImageCategory() {
  return (
    <>
      <section className="flex flex-col items-center pt-4 pb-2">
        <div className="flex gap-5">
          <ImageCategoryItem params="veggie" title="채소" />
          <ImageCategoryItem params="fruit" title="과일" />
          <ImageCategoryItem params="grain" title="쌀/곡류" />
          <ImageCategoryItem params="mushroom" title="버섯" />
        </div>
      </section>
      <ProductLink linkTitle="전체 농산물" />
    </>
  );
}

/**
 * 텍스트형 1차 카테고리 컴포넌트
 * @description 상품 타입(type)별 구분
 * @returns {HTMLElement}
 */
export function TextCategory() {
  return (
    <nav className="flex items-center">
      <TextCategoryItem params="crop" subParams="" title="농산물" isClick={true} />
      <TextCategoryItem params="experience" subParams="" title="체험" isClick={false} />
      <TextCategoryItem params="gardening" subParams="" title="텃밭" isClick={false} />
    </nav>
  );
}

/**
 * 텍스트형 2차 카테고리 컴포넌트
 * @description 농산물 하위 카테고리(category)별 구분
 * @returns {HTMLElement}
 */
export function FilteredTextCategory() {
  return (
    <nav className="flex">
      <TextCategoryItem params="crop" subParams="veggie" title="채소" isClick={false} />
      <TextCategoryItem params="crop" subParams="fruit" title="과일" isClick={false} />
      <TextCategoryItem params="crop" subParams="grain" title="쌀/곡류" isClick={false} />
      <TextCategoryItem params="crop" subParams="mushroom" title="버섯" isClick={false} />
    </nav>
  );
}
