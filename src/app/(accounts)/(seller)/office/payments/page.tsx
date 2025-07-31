import AccountItem from '@/components/elements/AccoutItem/AccountItem';
import LinkHeader from '@/components/layouts/Header/LinkHeader';

export default function PaymentsForSeller() {
  console.log('sellerpage');
  return (
    <>
      <LinkHeader title="정산" />
      <AccountItem />
    </>
  );
}
