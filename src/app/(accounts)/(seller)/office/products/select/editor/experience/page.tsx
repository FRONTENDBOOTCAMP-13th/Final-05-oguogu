import LinkHeader from '@/components/layouts/Header/LinkHeader';
import ExperienceProductPostClientControl from '@/features/ProductPostClientControl/ExperienceProductPostClientControl';

export default function ExperienceProductEditor() {
  return (
    <>
      <LinkHeader title="체험 상품 등록/수정" />
      <main className="p-4 flex flex-col gap-4">
        <ExperienceProductPostClientControl />
      </main>
    </>
  );
}
