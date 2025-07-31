'use client';

import CommonButton from '@/components/elements/CommonButton/CommonButton';
import { ProductDropdown, UploadDropdown } from '@/components/elements/OrderOption/OrderOption';
import ProductItemListForSeller from '@/components/elements/ProductItem/List/ProductItemListForSeller';
import { getProductSeller } from '@/shared/data/functions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { Item } from '@/shared/types/product';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SellerProductClientControl() {
  const router = useRouter();
  const token = useAuthStore(state => state.token);
  const [productList, setProductList] = useState<Item[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOption, setSortOption] = useState('recent');

  useEffect(() => {
    const fetch = async () => {
      if (!token) return;
      const res = await getProductSeller(token);
      console.log('결과', res);
      // setOrderRes(res);
      setProductList(res.item);
    };
    fetch();
  }, [token]);

  const filteredProductData = (item: Item[]) => {
    switch (selectedCategory) {
      case 'crop':
        return item.filter(item => item.extra?.productType === 'crop');
      case 'experience':
        return item.filter(item => item.extra?.productType === 'experience');
      case 'gardening':
        return item.filter(item => item.extra?.productType === 'gardening');
      default:
        return item;
    }
  };

  const getCategoryName = (type?: string) => {
    switch (type) {
      case 'crop':
        return '농산물';
      case 'experience':
        return '체험';
      case 'gardening':
        return '텃밭';
      default:
        return '기타';
    }
  };

  const sortProducts = (products: Item[]) => {
    switch (sortOption) {
      case 'recent':
        return [...products].sort(
          (a, b) => new Date(b.createdAt ?? '').getTime() - new Date(a.createdAt ?? '').getTime(),
        );
      case 'oldest':
        return [...products].sort(
          (a, b) => new Date(a.createdAt ?? '').getTime() - new Date(b.createdAt ?? '').getTime(),
        );
      case 'priceHigh':
        return [...products].sort((a, b) => b.price - a.price);
      case 'priceLow':
        return [...products].sort((a, b) => a.price - b.price);
      case 'stockHigh':
        return [...products].sort((a, b) => (b.quantity ?? 0) - (a.quantity ?? 0));
      case 'stockLow':
        return [...products].sort((a, b) => (a.quantity ?? 0) - (b.quantity ?? 0));
      default:
        return products;
    }
  };

  const handleLink = () => {
    router.push('products/select');
  };

  return (
    <>
      <div className="flex gap-x-2">
        <ProductDropdown onChange={value => setSelectedCategory(value)} />
        <UploadDropdown onChange={value => setSortOption(value)} />
      </div>

      <div className="mt-[6px] mb-[16px]">
        <CommonButton
          feature="+ 상품 등록"
          textSize="text-[12px]"
          width="w-full"
          height="h-[30px]"
          type="button"
          bgColor="bg-oguogu-white"
          textColor="text-oguogu-black"
          border="border"
          borderColor="border-oguogu-main"
          cursorPointer
          onClick={handleLink}
        />
      </div>
      <div className="flex justify-between gap-2 border-b pb-1 mb-2 text-[12px] text-oguogu-gray-4">
        <div className="flex-shrink-0 w-[40px] ">구분</div>
        <div className="truncate min-w-0 flex-1 ">상품명</div>
        <div className="flex-shrink-0 w-[58px] ">가격</div>
        <div className="flex-shrink-0 w-[35px] ">관리</div>
      </div>

      {sortProducts(filteredProductData(productList)).map((item: Item) => (
        <ProductItemListForSeller
          key={item._id}
          title={item.name}
          category={getCategoryName(item.extra?.productType)}
          price={`${item.price.toLocaleString()}`}
        />
      ))}

      {/* {selectedCategory === 'crop' &&
        sortProducts(filteredProductData(productList)).map((item: Item) => (
          <ProductItemListForSeller
            key={item._id}
            title={item.name}
            category={"농산물"}
            price={`${item.price.toLocaleString()}`}
          />
        ))}

      {selectedCategory === 'experience' &&
        sortProducts(filteredProductData(productList)).map((item: Item) => (
          <ProductItemListForSeller
            key={item._id}
            title={item.name}
            category={"체험"}
            price={`${item.price.toLocaleString()}`}
          />
        ))}

      {selectedCategory === 'gardening' &&
        sortProducts(filteredProductData(productList)).map((item: Item) => (
          <ProductItemListForSeller
            key={item._id}
            title={item.name}
            category={"텃밭"}
            price={`${item.price.toLocaleString()}`}
          />
        ))} */}
    </>
  );
}
