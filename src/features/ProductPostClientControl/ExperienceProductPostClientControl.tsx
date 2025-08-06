'use client';

import Input from '@/components/elements/LoginItem/Input';
import { uploadFile } from '@/shared/data/actions/file';
import { createProduct } from '@/shared/data/actions/product';
import { useAuthStore } from '@/shared/store/authStore';
import { fileResponse } from '@/shared/types/file';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

type ProductForm = {
  title: string;
  content: string;
  quantity: string;
  productCnt: string;
  price: string;
  dcRate?: string;
  shippingFees: string;
  mainImages: File | null;
  detail: File | null;
  startDate: string;
  endDate: string;
  experienceRegion: string;
  departRegion: string;
  include: string;
  uninclude: string;
  guideName: string;
  guidePhone: string;
  guideCompany: string;
};

export default function ExperienceProductPostClientControl() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string>('');
  const [imageFile, setImageFile] = useState<File | null>(null);

  const detailFileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedDetailFileName, setSelectedDetailFileName] = useState<string>('');
  const [detailFile, setDetailFile] = useState<File | null>(null);

  const [form, setForm] = useState<ProductForm>({
    title: '',
    content: '',
    quantity: '',
    productCnt: '',
    price: '',
    dcRate: '',
    shippingFees: '',
    mainImages: null,
    detail: null,
    startDate: '',
    endDate: '',
    experienceRegion: '',
    departRegion: '',
    include: '',
    uninclude: '',
    guideName: '',
    guidePhone: '',
    guideCompany: '',
  });
  const [detailText, setDetailText] = useState<string>('');

  // 숫자만 입력받는 필드
  const numberFields = ['quantity', 'productCnt', 'price', 'dcRate', 'shippingFees'];

  const token = useAuthStore(state => state.token);
  const router = useRouter();

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

  const handlePost = async () => {
    if (token === null) return;

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
        productType: 'experience' as const,
        region: form.experienceRegion,
        meetingPlace: form.departRegion,
        departureDate: form.startDate,
        returnDate: form.endDate,
        includedItems: form.include.split(','),
        unincludedItems: form.uninclude.split(','),
        productCnt: Number(form.productCnt) || 1,
        dcRate: Number(form.dcRate) || 0,
        productDetailContent: detailText,
        detailImages: [
          {
            path: detailImageItem.path,
            name: detailImageItem.name,
            originalname: detailImageItem.originalname,
          },
        ],
        guideInfo: {
          name: form.guideName,
          contact: form.guidePhone,
          company: form.guideCompany,
        },
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
        type="unitTwo"
        title="상품구성"
        placeholder="체험 출발 일자 (YYYY-MM-DD)"
        secondPlaceholder="체험 종료 일자 (YYYY-MM-DD)"
        id="title"
        required={true}
        unit="시작"
        secontUnit="종료"
        value={form.startDate}
        onChange={e => handleChange('startDate', e.target.value)}
        secondValue={form.endDate}
        onSecondChange={e => handleChange('endDate', e.target.value)}
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
        type="basic"
        title="체험 지역"
        placeholder="체험 상품이 진행되는 장소, 위치"
        id="experienceRegion"
        required={true}
        value={form.experienceRegion}
        onChange={e => handleChange('experienceRegion', e.target.value)}
      />
      <Input
        type="basic"
        title="출발 지역"
        placeholder="참여 인원이 모이는 장소, 위치"
        id="departRegion"
        required={true}
        value={form.departRegion}
        onChange={e => handleChange('departRegion', e.target.value)}
      />
      <Input
        type="basic"
        title="포함"
        placeholder="ex) 조식, 중식, 석식, 야식, 간식, 숙소, 픽업"
        id="title"
        required={true}
        value={form.include}
        onChange={e => handleChange('include', e.target.value)}
      />
      <Input
        type="basic"
        title="불포함"
        placeholder="ex) 가이드 비, 체험 추가비"
        id="title"
        required={true}
        value={form.uninclude}
        onChange={e => handleChange('uninclude', e.target.value)}
      />
      <Input
        type="basic"
        title="여행사"
        placeholder="여행사명을 입력해주세요"
        id="guideCompany"
        required={true}
        value={form.guideCompany}
        onChange={e => handleChange('guideCompany', e.target.value)}
      />
      <Input
        type="unitTwo"
        title="가이드 정보"
        placeholder="가이드 명"
        secondPlaceholder="가이드 번호"
        id="guideName"
        required={true}
        secondRequired={false}
        value={form.guideName}
        onChange={e => handleChange('guideName', e.target.value)}
        secondValue={form.guidePhone}
        onSecondChange={e => handleChange('guidePhone', e.target.value)}
      />
      {/* <IncludedItemsCheckbox /> */}
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
        aria-label="상품 등록 버튼"
        className={` flex flex-1 items-center justify-center text-center 
                 bg-oguogu-main text-oguogu-white
                 px-[24px] py-[6px] rounded-[4px]`}
      >
        상품 등록
      </button>
    </>
  );
}
