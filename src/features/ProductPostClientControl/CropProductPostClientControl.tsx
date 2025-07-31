'use client';
import { useRef, useState } from 'react';
import Input from '@/components/elements/LoginItem/Input';
import SellerProductEditOption from '@/components/elements/OrderOption/SellerProductEditOption';
import { createProduct } from '@/shared/data/actions/product';
import { useAuthStore } from '@/shared/store/authStore';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { fileResponse } from '@/shared/types/file';
import { uploadFile } from '@/shared/data/actions/file';

type ProductForm = {
  title: string;
  content: string;
  quantity: string;
  productCnt: string;
  productUnit: string;
  price: string;
  dcRate?: string;
  shippingFees: string;
  mainImages: File | null;
  detail: File | null;
};

const orderOptions = [
  { label: '채소', value: 'veggie' },
  { label: '과일', value: 'fruit' },
  { label: '쌀/곡류', value: 'grain' },
  { label: '버섯', value: 'mushroom' },
];

export default function CropProductPostClientControl() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const detailFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDetailFileName, setSelectedDetailFileName] = useState<string>('');
  const [detailFile, setDetailFile] = useState<File | null>(null);

  const token = useAuthStore(state => state.token);

  const router = useRouter();

  const [selected, setSelected] = useState(orderOptions[0]);
  const [form, setForm] = useState<ProductForm>({
    title: '',
    content: '',
    quantity: '',
    productCnt: '',
    productUnit: '',
    price: '',
    dcRate: '',
    shippingFees: '',
    mainImages: null,
    detail: null,
  });
  const [detailText, setDetailText] = useState<string>('');

  // 숫자만 입력받는 필드
  const numberFields = ['quantity', 'productCnt', 'price', 'dcRate', 'shippingFees'];

  const handleChange = (key: keyof ProductForm, value: string | File | null) => {
    if (numberFields.includes(key as string)) {
      // 숫자 필드는 숫자만 허용, 아니면 빈 문자열
      if (typeof value === 'string') {
        const onlyNum = value.replace(/[^0-9]/g, '');
        setForm(prev => ({
          ...prev,
          [key]: onlyNum,
        }));
        return;
      }
    }
    setForm(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePost = async () => {
    if (!token) return;

    let fileRes: fileResponse | null = null;
    let DetailFileRes: fileResponse | null = null;

    // 이미지가 있을 때만 파일 업로드 처리
    if (imageFile) {
      const formData = new FormData();
      formData.append('attach', imageFile);

      fileRes = await uploadFile(formData);

      if (!fileRes?.ok) {
        console.error(fileRes?.message);
        toast.error('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    // 이미지가 있을 때만 파일 업로드 처리
    if (detailFile) {
      const formData = new FormData();
      formData.append('attach', detailFile);

      DetailFileRes = await uploadFile(formData);

      if (!DetailFileRes?.ok) {
        console.error(DetailFileRes?.message);
        toast.error('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    const mainImageItem = fileRes?.item[0];
    const detailImageItem = DetailFileRes?.item[0];

    if (!mainImageItem || !detailImageItem) {
      toast.error('파일 업로드에 실패했습니다.');
      return;
    }

    //  등록할 데이터 값
    const productData = {
      price: Number(form.price) || 0,
      quantity: Number(form.quantity) || 0,
      name: form.title,
      content: form.content,
      shippingFees: Number(form.shippingFees) || 0,
      mainImages: [
        {
          path: mainImageItem.path,
          name: mainImageItem.name,
          originalname: mainImageItem.originalname,
        },
      ],

      extra: {
        productType: 'crop' as const,
        category: selected.value as 'veggie' | 'fruit' | 'grain' | 'mushroom',
        productCnt: Number(form.productCnt) || 1,
        productUnit: form.productUnit,
        dcRate: Number(form.dcRate) || 0,
        productDetailContent: detailText,
        detailImages: [
          {
            path: detailImageItem.path,
            name: detailImageItem.name,
            originalname: detailImageItem.originalname,
          },
        ],
      },
    };

    const postData = await createProduct(productData, token);
    if (postData.ok) {
      toast.success('상품이 정상적으로 등록되었습니다.');
      router.push('/office/products');
    } else {
      toast.error('등록을 실패했습니다.');
    }
  };

  const handleFileButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setImageFile(file);
    }
  };

  const handleCancel = () => {
    setSelectedFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDetailFileButtonClick = () => {
    detailFileInputRef.current?.click();
  };

  const handleDetailFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedDetailFileName(file.name);
      setDetailFile(file);
    }
  };

  const handleDetailCancel = () => {
    setSelectedDetailFileName('');
    if (detailFileInputRef.current) {
      detailFileInputRef.current.value = '';
    }
  };

  const finalPrice = Number(form?.price) * (1 - Number(form?.dcRate) / 100);

  return (
    <>
      <Input
        type="basic"
        title="제목"
        placeholder="상품명 (최대 30자)"
        id="title"
        required={true}
        value={form.title}
        onChange={e => handleChange('title', e.target.value)}
      />
      <Input
        type="basic"
        title="부제목"
        placeholder="상품 설명 (최대 30자)"
        id="content"
        required={true}
        value={form.content}
        onChange={e => handleChange('content', e.target.value)}
      />
      <SellerProductEditOption selected={selected} setSelected={setSelected} orderOptions={orderOptions} />
      <Input
        type="unitOne"
        title="총 판매 수량"
        placeholder="총 판매 수량"
        id="quantity"
        required={true}
        unit="개"
        value={form.quantity}
        onChange={e => handleChange('quantity', e.target.value)}
      />
      <Input
        type="unitOne"
        title="최대 구매 가능 수량"
        placeholder="최대 구매 가능 수량"
        id="productCnt"
        required={true}
        unit="개"
        value={form.productCnt}
        onChange={e => handleChange('productCnt', e.target.value)}
      />
      <Input
        type="basic"
        title="상품구성"
        placeholder="상품 수량 또는 무게"
        id="productUnit"
        required={true}
        value={form.productUnit}
        onChange={e => handleChange('productUnit', e.target.value)}
      />
      <Input
        type="unitTwo"
        title="판매 가격 및 할인율"
        placeholder="최초 판매가"
        secondPlaceholder="(선택) 할인율"
        id="price"
        required={true}
        secondRequired={false}
        unit="원"
        secontUnit="%"
        value={form.price}
        onChange={e => handleChange('price', e.target.value)}
        secondValue={form.dcRate}
        onSecondChange={e => handleChange('dcRate', e.target.value)}
      />
      <Input
        type="readOnly"
        title="최종 가격"
        placeholder={`${finalPrice.toLocaleString()}원`}
        id="title"
        required={true}
        value={10000}
      />
      <Input
        type="unitOne"
        title="배송비"
        placeholder="(선택) 건당 배송비 (미작성시 무료)"
        id="shippingFees"
        required={false}
        unit="원"
        value={form.shippingFees}
        onChange={e => handleChange('shippingFees', e.target.value)}
      />
      <Input
        type="file"
        title="대표 이미지"
        id="mainImages"
        required={true}
        value={imageFile}
        selectedFileName={selectedFileName}
        handleFileButtonClick={handleFileButtonClick}
        handleCancel={handleCancel}
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <Input
        type="fileDetail"
        title="상품 상세 설명"
        id="detail"
        required={true}
        value={detailFile}
        selectedFileName={selectedDetailFileName}
        handleFileButtonClick={handleDetailFileButtonClick}
        handleCancel={handleDetailCancel}
        fileInputRef={detailFileInputRef}
        handleFileChange={handleDetailFileChange}
        detailText={detailText} // textarea 값 전달
        onDetailTextChange={e => setDetailText(e.target.value)} // textarea 변경 핸들러 전달
      />
      <button
        onClick={handlePost}
        type="button"
        className={` flex flex-1 items-center justify-center text-center 
         bg-oguogu-main text-oguogu-white
         px-[24px] py-[6px] rounded-[4px]`}
      >
        상품 등록
      </button>
    </>
  );
}
