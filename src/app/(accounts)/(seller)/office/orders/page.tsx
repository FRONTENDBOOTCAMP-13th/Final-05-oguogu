import LinkHeader from '@/components/layouts/Header/LinkHeader';
import OfficeOrderClientContorl from '@/features/officeOrderClientControl/officeOrderClientControl';

export default function OrdersForSeller() {
  return (
    <>
      <LinkHeader title="주문내역" />
      <OfficeOrderClientContorl />
    </>
  );
}
