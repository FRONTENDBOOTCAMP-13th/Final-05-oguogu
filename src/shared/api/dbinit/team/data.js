import dayjs from 'dayjs';

function getTime(day = 0, second = 0) {
  return dayjs().add(day, 'days').add(second, 'seconds').format('YYYY.MM.DD HH:mm:ss');
}

export const initData = async (clientId, nextSeq) => {
  // 리뷰 더미 데이터 (총 150개)
  const review = [];

  const dummyUsers = [
    { _id: 1, name: '홍길동' },
    { _id: 2, name: '김철수' },
    { _id: 3, name: '박영희' },
    { _id: 4, name: '이민호' },
    { _id: 5, name: '최지우' },
    { _id: 6, name: '정수빈' },
    { _id: 7, name: '한예슬' },
    { _id: 8, name: '정길용' },
    { _id: 9, name: '김데레사' },
    { _id: 10, name: '송하윤' },
  ];

  const dummyTitles = [
    '정말 맛있어요!',
    '좀 아쉬워요',
    '배송 빨랐어요',
    '다음에도 구매할게요',
    '별로였어요',
    '고양이도 좋아해요',
    '완전 강추!',
    '생각보다 별로네요',
    '기대 이상이에요',
    '쫀득쫀득 맛있어요',
  ];

  const dummyContents = [
    '옥수수가 달고 쫀득해서 너무 맛있어요!',
    '생각보다 양이 적어요.',
    '배송이 조금 느렸어요.',
    '포장 깔끔하고 맛도 좋아요.',
    '딱딱해서 씹기 힘들었어요.',
    '저희 강아지도 좋아해요.',
    '가족들과 함께 맛있게 먹었습니다.',
    '식감이 별로네요...',
    '친구한테 선물했는데 만족했대요.',
    '삶기만 하면 바로 먹을 수 있어서 좋아요.',
  ];

  for (let product_id = 1; product_id <= 30; product_id++) {
    for (let i = 0; i < 5; i++) {
      const user = dummyUsers[Math.floor(Math.random() * dummyUsers.length)];
      const title = dummyTitles[Math.floor(Math.random() * dummyTitles.length)];
      const content = dummyContents[Math.floor(Math.random() * dummyContents.length)];
      const rating = Math.floor(Math.random() * 5) + 1;

      review.push({
        _id: await nextSeq('review'),
        rating,
        content,
        user_id: user._id,
        product_id,
        extra: {
          name: title,
          image: [{ url: '/' }, { url: '/' }],
        },
        createdAt: getTime(-Math.floor(Math.random() * 30), -60 * 60 * Math.floor(Math.random() * 24)),

        // 주문자 정보
        user: {
          _id: user._id,
          name: user.name,
          image: `user-${user._id}.webp`,
        },

        // 판매자 상품 정보
        product: {
          _id: product_id,
          name: `상품명 ${product_id}`,
          image: {
            path: `files/openmarket/sample-${product_id}.jpg`,
            name: `sample-${product_id}.jpg`,
            originalname: `original-${product_id}.jpg`,
          },
        },
      });
    }
  }
  return {
    /**
     ** 회원 관리
     * 1. 관리자 => type: 'admin'
     * - 관리자
     
     * 2. 판매자 => type: 'seller'
     * - 흥부네농산물 
     * - 놀부네농산물
     * - 서울상회
     * - 국제농업
     * - 제주농산물
     * - 업타운
     
     * 3. 사용자 => type: 'user'
     * - 정길용
     * - 김데레사
     * - 정재인
     */
    user: [
      /* 1. 관리자 */
      {
        _id: await nextSeq('user'),
        email: 'admin@5959.com',
        password: '$2b$10$S.8GNMDyvUF0xzujPtHBu.j5gtS19.OhRmYbpJBnCHg2S83WLx1T2',
        name: '관리자',
        phone: '01059595959',
        address: '서울시 강남구 역삼동 123',
        type: 'admin',
        loginType: 'email',
        image: `/files/${clientId}/admin-1-profile.png`,
        createdAt: getTime(-100, -60 * 60 * 3),
        updatedAt: getTime(-100, -60 * 60 * 3),
        extra: {
          birthday: '2000-01-01',
        },
      },

      /* 2. 판매자 */
      {
        _id: await nextSeq('user'),
        email: 'seller1@5959.com',
        password: 'seller1',
        name: '김흥부',
        phone: '01044532341',
        address: '서울특별시 강남구 테헤란로 123',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-2-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '흥부네농산물',

          // 대표자명
          representativeName: '김흥부',

          // 사업자 번호
          businessNumber: '123-45-67890',

          // 대표 번호
          tel: '02-891-0123',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'seller2@5959.com',
        password: 'seller2',
        name: '이놀부',
        phone: '01034212258',
        address: '부산광역시 해운대구 센텀중앙로 45',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-3-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '놀부네농산물',

          // 대표자명
          representativeName: '이놀부',

          // 사업자 번호
          businessNumber: '343-21-45332',

          // 대표 번호
          tel: '02-456-7891',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'seller3@5959.com',
        password: 'seller3',
        name: '송서울',
        phone: '01082824545',
        address: '대구광역시 수성구 동대구로 456',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-4-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '서울상회',

          // 대표자명
          representativeName: '송서울',

          // 사업자 번호
          businessNumber: '897-21-11235',

          // 대표 번호
          tel: '02-987-6543',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'seller4@5959.com',
        password: 'seller4',
        name: '박성남',
        phone: '01028841123',
        address: '경기도 성남시 분당구 판교역로 235',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-5-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '국제농업',

          // 대표자명
          representativeName: '박성남',

          // 사업자 번호
          businessNumber: '342-42-18753',

          // 대표 번호
          tel: '02-987-6543',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'seller5@5959.com',
        password: 'seller5',
        name: '최제주',
        phone: '01089975655',
        address: '제주특별자치도 제주시 연삼로 123-4',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-6-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '제주농산물',

          // 대표자명
          representativeName: '최제주',

          // 사업자 번호
          businessNumber: '546-25-11231',

          // 대표 번호
          tel: '070-223-1212',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'seller6@5959.com',
        password: 'seller6',
        name: '정신나',
        phone: '01022314884',
        address: '서울특별시 성동구 왕십리로 125',
        type: 'seller',
        loginType: 'email',
        image: `/files/${clientId}/seller-6-profile.png`,
        createdAt: getTime(-50),
        updatedAt: getTime(-30, -60 * 60 * 3),
        extra: {
          // 상호명
          businessName: '업타운',

          // 대표자명
          representativeName: '정신나',

          // 사업자 번호
          businessNumber: '221-87-00154',

          // 대표 번호
          tel: '070-882-4545',

          // 첨부 파일 : 사업자등록증, 통신판매업신고증
          businessLicenseImage: '/files/201/business-license.jpg',
          telecomRegistrationImage: '/files/201/telecom-cert.jpg',

          // 인증 상태 정보
          certification: {
            status: 'approved', // 'pending' | 'rejected' | 'approved' : 승인 | 'certified' : 인증
            requestedAt: '2025-07-01T09:30:00Z',
            reviewedAt: '2025-07-03T15:45:00Z',
            reviewer: 'admin@5959.com',
            reason: '서류 이상 없음',
          },
        },
      },

      /* 3. 사용자 */
      {
        _id: await nextSeq('user'),
        email: 'user1@gmail.com',
        password: 'user1',
        name: '정길용',
        phone: '01012123434',
        address: '서울 강서구 염창동 300',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-profile-MC03.svg`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '1990-01-01',
          membershipClass: 'MC03', // 예: 'MC01(seed)' -> 'MC02(sprout)' -> 'MC03(grain)'
          coupons: [
            { id: 'C001', name: '5% 할인 쿠폰', expiresAt: '2025-08-01' },
            { id: 'C002', name: '무료배송 쿠폰', expiresAt: '2025-09-15' },
          ],
          address: [
            { id: 1, name: '회사', value: '서울 종로구 청진동 246' },
            { id: 2, name: '집', value: '서울 강서구 염창동 300' },
          ],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'user2@gmail.com',
        password: 'user2',
        name: '김데레사',
        phone: '01056567878',
        address: '경기 성남시 수정구 창곡동 572',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-profile-MC02.svg`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '1990-07-07',
          membershipClass: 'MC02',
          coupons: [
            { id: 'C001', name: '5% 할인 쿠폰', expiresAt: '2025-08-01' },
            { id: 'C002', name: '무료배송 쿠폰', expiresAt: '2025-09-15' },
          ],
          address: [
            { id: 1, name: '회사', value: '서울 종로구 청진동 246' },
            { id: 2, name: '집', value: '경기 성남시 수정구 창곡동 572' },
          ],
        },
      },
      {
        _id: await nextSeq('user'),
        email: 'user3@gmail.com',
        password: 'user3',
        name: '정재인',
        phone: '01091912323',
        address: '서울 송파구 신천동 29',
        type: 'user',
        loginType: 'email',
        image: `/files/${clientId}/user-profile-MC03.svg`,
        createdAt: getTime(-20, -60 * 30),
        updatedAt: getTime(-10, -60 * 60 * 12),
        extra: {
          birthday: '2000-02-02',
          membershipClass: 'MC01',
          coupons: [
            { id: 'C001', name: '5% 할인 쿠폰', expiresAt: '2025-08-01' },
            { id: 'C002', name: '무료배송 쿠폰', expiresAt: '2025-09-15' },
          ],
          address: [
            { id: 1, name: '회사', value: '서울 종로구 청진동 246' },
            { id: 2, name: '집', value: '서울 송파구 신천동 29' },
          ],
        },
      },
    ],

    /**
     ** 상품 관리
     * 1. 일반 상품 => extra { productType: 'crop' }
     * [x] seller_id: 2 * 5개
     * [x] seller_id: 3 * 5개
     * [x] seller_id: 4 * 5개
     * [x] seller_id: 5 * 5개
     * [x] seller_id: 6 * 5개

     * 2. 체험 상품 => extra { productType: 'experience' }
     * [x] seller_id: 2 * 2개
     * [x] seller_id: 7 * 2개

     * 3. 텃밭 상품 => extra { productType: 'gardening' }
     * [x] seller_id: 3 * 3개
     * [x] seller_id: 5 * 3개
     * */
    product: [
      /* 1. 농산물 상품 */
      // seller_id: 2
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: "남다른 쫀득함! 신품종 전남 해남 25년 '햇' 오색촬옥수수",
        content: '씹으면 씹을수록 느껴지는 달짝지근함과 쫀득쫀득한 찰진 식감',
        price: 29900,
        shippingFees: 3000,
        quantity: 1000,
        buyQuantity: 500,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '전라남도 해남군',

          // 상품 구성
          composition: '30개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 12499,

          // 할인율
          dcRate: 40,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: '쫀득함이 남다른 의령 햇 미백 찰옥수수',
        content: '쫀득함과 구수한 맛이 일품인 건강한 미백 찰옥수수',
        price: 18500,
        shippingFees: 3000,
        quantity: 1000,
        buyQuantity: 0,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '경상남도 의령',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 2155,

          // 할인율
          dcRate: 41,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: true }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: '은은하게 퍼지는 고소함과 달큰함이 좋은 유기농 냉동 찰옥수수',
        content: '이른 봄 씨앗을 파종해 직접 재배한 100% 국내산 냉동 찐 찰옥수수',
        price: 41900,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 100,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          type: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수', '찰옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 충주',

          // 상품 구성
          composition: '18개입 * 6개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 854,

          // 할인율
          dcRate: 26,

          // 최대 구매 가능 수량
          productCnt: 4,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: "남다른 쫀득함! 신품종 전남 해남 25년 '햇' 오색촬옥수수",
        content: '재배 농가가 많지 않은 귀한 품종',
        price: 29900,
        shippingFees: 0,
        quantity: 300,
        buyQuantity: 250,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '전라남도 해남',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 1021,

          // 할인율
          dcRate: 40,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: true }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: '유기농 홍천 찰옥수수 3입',
        content: '간편하게 누리는 찰진 고소함',
        price: 10900,
        shippingFees: 3000,
        quantity: 100,
        buyQuantity: 8,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 홍천',

          // 상품 구성
          composition: '3개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 34,

          // 할인율
          dcRate: 8,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      // seller_id: 3
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '괴산 대학🌽찰 옥수수🌽30개✨달콤하고 쫀득함이 일품✨',
        content: '달콤하고 쫀득한 여름 대표 간식',
        price: 29800,
        shippingFees: 0,
        quantity: 300,
        buyQuantity: 20,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '30개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 4,

          // 할인율
          dcRate: 0,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '❗특대 사이즈 찰옥수수 10개 ❗꿀맛 보장!! 부담없는 가격에 득템!!',
        content: '지금이 제일 맛있는 특대 사이즈 찰옥수수',
        price: 11900,
        shippingFees: 3000,
        quantity: 200,
        buyQuantity: 3,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '전라남도 남원',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 0,

          // 할인율
          dcRate: 0,

          // 최대 구매 가능 수량
          productCnt: 100,

          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '미백 찰옥수수 10송이 11-15cm 내외',
        content: '고랭지에서 재배해 더 쫀득한 미백 찰옥수수',
        price: 11900,
        shippingFees: 0,
        quantity: 300,
        buyQuantity: 90,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 홍천',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 0,

          // 할인율
          dcRate: 0,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          isNew: true, // 신상품
          isInSeason: true, // 제철 상품 (농산물 전용)
          isBest: false, // 인기 상품
          isLowStock: false, // 품절 임박 상품
          isSold: false, // 품절 상품
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '쫀득 구수한~흑찰 옥수수 10개 20개 30개',
        content: '칼슘 흑찰옥수수! 우리 아이들이 좋아하는 흑찰옥수수',
        price: 19900,
        shippingFees: 0,
        quantity: 500,
        buyQuantity: 480,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 홍천',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 4532,

          // 할인율
          dcRate: 35,

          // 최대 구매 가능 수량
          productCnt: 10,

          badge: [
            { isNew: true }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: true }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '경남 고성 찰옥수수 10개 미백찰 미흑찰 제철 생 옥수수',
        content: '고성바다의 시원한 바람결로 알알이 영근 찰옥수수를 만나보세요',
        price: 28000,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 664,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '경상남도 고성',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 8775,

          // 할인율
          dcRate: 55,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      // seller_id: 4
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        name: '찰옥수수 더 쫀득하고 연한 강원도 햇 옥수수',
        content: '충분한 퇴비, 두둑 간격을 넓혀 품질 향상',
        price: 15000,
        shippingFees: 3000,
        quantity: 9999,
        buyQuantity: 7500,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 영월',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 18664,

          // 할인율
          dcRate: 7,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        name: '특품 사이즈 찰옥수수 햇 옥수수 생 제철',
        content: '일반옥수수보다 가늘지만 알 하나 사이즈가 큰 튼실한 옥수수',
        price: 16000,
        shippingFees: 0,
        quantity: 5000,
        buyQuantity: 2742,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 9475,

          // 할인율
          dcRate: 31,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        name: '초당옥수수 특품사이즈 옥수수 당도보장',
        content: '16cm 이상 특품만 선별!',
        price: 26000,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 884,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '제주도 서귀포',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 2712,

          // 할인율
          dcRate: 27,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        name: '갓 삶아 냉동한 찰옥수수 20개 홍찰 백찰 알록이 황찰 반반 절단 진공 옥수수',
        content: '올해 수확 햇옥수수 특품 선별 가공',
        price: 20000,
        shippingFees: 0,
        quantity: 499,
        buyQuantity: 120,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '중국',

          // 생산지
          productionPlace: '중국',

          // 상품 구성
          composition: '20개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 799,

          // 할인율
          dcRate: 32,

          // 최대 구매 가능 수량
          productCnt: 999,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 4,
        name: '2025년 잘영근 햇 괴산대학 찰옥수수',
        content: '찰지도 단맛이 강한 연농 1호 찰옥수수',
        price: 25900,
        shippingFees: 0,
        quantity: 5000,
        buyQuantity: 4199,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '20개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 35112,

          // 할인율
          dcRate: 7,

          // 최대 구매 가능 수량
          productCnt: 50,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      // seller_id: 5
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '쫀득톡톡 괴산 대학찰옥수수 30개입 대학찰 미백찰',
        content: '한 대씩 키운 품질 좋은 대학찰옥수수',
        price: 27000,
        shippingFees: 0,
        quantity: 2000,
        buyQuantity: 1200,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 1800,

          // 할인율
          dcRate: 5,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '강원도 찰옥수수 미백 흑 찰옥수수 홍천 햇 생옥수수 ',
        content: '인증 받은 비료만 사용! 건강하고 싱싱한 옥수수',
        price: 7900,
        shippingFees: 3000,
        quantity: 1000,
        buyQuantity: 40,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 홍천',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 84,

          // 할인율
          dcRate: 0,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '초당옥수수 괴산대학찰옥수수 10개',
        content: '진~짜 쫀득 탱글한 대학찰옥수수',
        price: 30000,
        shippingFees: 0,
        quantity: 1500,
        buyQuantity: 1500,
        show: false,
        active: false,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '10개입 * 2개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 3122,

          // 할인율
          dcRate: 43,

          // 최대 구매 가능 수량
          productCnt: 5,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: true }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '강원도 정선 흑찰 생옥수수 냉동 찐 삶은',
        content: '700고지 구름밭에서 자란 달콤한 흑찰옥수수',
        price: 38000,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 899,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '강원도 정선',

          // 상품 구성
          composition: '20개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 1992,

          // 할인율
          dcRate: 29,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '25년 곡성 햇 생 흑찰 옥수수 특품',
        content: '700고지 구름밭에서 자란 달콤한 흑찰옥수수',
        price: 16900,
        shippingFees: 0,
        quantity: 1500,
        buyQuantity: 452,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '전라남도 곡성',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 1200,

          // 할인율
          dcRate: 13,

          // 최대 구매 가능 수량
          productCnt: 99,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      // seller_id: 6
      {
        _id: await nextSeq('product'),
        seller_id: 6,
        name: '햇 괴산 대학찰옥수수 찐옥수수 장작불 가마솥에 삶은 냉동 옥수수',
        content: '나무 장작불로 삶아낸 국도에서 먹던 그맛!',
        price: 60000,
        shippingFees: 0,
        quantity: 10000,
        buyQuantity: 8142,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '30개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 31211,

          // 할인율
          dcRate: 51,

          // 최대 구매 가능 수량
          productCnt: 99,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: true }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 6,
        name: '국내산 초당옥수수',
        content: '돌아온 여름, 온 가족이 즐겨먹는 여름별미!',
        price: 56000,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 50,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '5개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 122,

          // 할인율
          dcRate: 79,

          // 최대 구매 가능 수량
          productCnt: 10,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 6,
        name: '초당옥수수 콧털삼촌 농장 3차선별 당일수확 산지직송 옥수수',
        content: '7년동안의 노하우! 초당옥수수 전문 생산, 유통',
        price: 34800,
        shippingFees: 0,
        quantity: 2000,
        buyQuantity: 754,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '충청북도 괴산',

          // 상품 구성
          composition: '5개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 1124,

          // 할인율
          dcRate: 50,

          // 최대 구매 가능 수량
          productCnt: 50,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 6,
        name: '초당옥수수 고당도 제철 3차선별 옥수수',
        content: '청정산지에서 생산하는 옥수수',
        price: 24000,
        shippingFees: 0,
        quantity: 1000,
        buyQuantity: 550,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '국산',

          // 생산지
          productionPlace: '경상남도 의령',

          // 상품 구성
          composition: '5개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 882,

          // 할인율
          dcRate: 50,

          // 최대 구매 가능 수량
          productCnt: 30,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 6,
        name: '기장찰옥수수 신선하게 삶아낸 냉동 찰옥수수 다양한 맛과 품종',
        content: '상위2% 전문가가 직접 만든 무첨가 기장찰옥수수',
        price: 37900,
        shippingFees: 0,
        quantity: 3000,
        buyQuantity: 2412,
        show: true,
        active: true,
        mainImages: [
          {
            // seller-${seller_id}-${productType}${_id}-${numbering}
            path: `/files/${clientId}/seller-2-crop1-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-crop2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'crop',

          // 2차 카테고리 : 'veggie', 'fruit', 'grain', 'mushroom'
          category: 'veggie',

          // 3차 카테고리
          filter: ['옥수수'],

          // 원산지
          originPlace: '중국',

          // 생산지
          productionPlace: '중국',

          // 상품 구성
          composition: '10개입 * 1개',

          // 배송 관련 추가 정보
          deliveryInfo: '평일 1~2일 소요',

          // 찜 수
          likeCount: 882,

          // 할인율
          dcRate: 73,

          // 최대 구매 가능 수량
          productCnt: 100,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: true }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },

      /* 2. 체험 상품 */
      // seller_id: 2
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: '강원도 산골마을 찰옥수수 수확체험',
        content: '1인 20개 수확! 바베큐 중식 제공!',
        price: 30000,
        shippingFees: 0,
        quantity: 20,
        buyQuantity: 12,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-exp2-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-exp2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'experience',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 체험 장소 위치
          region: '강원도 인제',

          // 출발 지역
          meetingPlace: '강원도 인제군 남면 부평정자로 1555',

          // 가는 날짜
          departureDate: '2025-08-12',

          // 오는 날짜
          returnDate: '2025-08-12',

          // 할인율
          dcRate: 40,

          // 최대 예약 가능 인원 수
          productCnt: 4,

          // 대표 키워드
          representitiveKeyword: ['체험', '웰빙', '힐링'],

          // 포함 상품 : '식사 제공', '숙소 제공', '픽업 버스 운행', '체험 상품'
          includedItems: ['식사 제공', '체험 상품'],

          // 일정
          schedule: [
            { day: 1, startTime: '11:00', title: '마을 소개 및 옥수수 재배법 교육' },
            { day: 1, startTime: '12:00', title: '점심 식사' },
            { day: 1, startTime: '13:30', title: '찰옥수수 수확' },
            { day: 1, startTime: '14:30', title: '찰옥수수 시식' },
          ],

          // 가이드 정보
          guideInfo: {
            name: '신세경',
            contact: '010-7677-8123',
          },

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: true }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 2,
        name: '옥수수 수확 체험',
        content: '직접 딴 옥수수를 바로 삶아먹어요',
        price: 10000,
        shippingFees: 0,
        quantity: 40,
        buyQuantity: 18,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-exp2-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-exp2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'experience',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 체험 장소 위치
          region: '경상남도 거창',

          // 출발 지역
          meetingPlace: '경상남도 거창군 북상면 송계로 738',

          // 가는 날짜
          departureDate: '2025-08-12',

          // 오는 날짜
          returnDate: '2025-08-12',

          // 할인율
          dcRate: 0,

          // 최대 예약 가능 인원 수
          productCnt: 4,

          // 대표 키워드
          representitiveKeyword: ['체험'],

          // 포함 상품 : '식사 제공', '숙소 제공', '픽업 버스 운행', '체험 상품'
          includedItems: ['체험 상품'],

          // 일정
          schedule: [
            { day: 1, startTime: '14:00', title: '옥수수 수확' },
            { day: 1, startTime: '15:00', title: '옥수수 시식' },
          ],

          // 가이드 정보
          guideInfo: {
            name: '전농희',
            contact: '010-4445-6667',
          },

          // 뱃지용
          badge: [
            { isNew: true }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },
      // seller_id: 7
      {
        _id: await nextSeq('product'),
        seller_id: 7,
        name: '[컨츄리타운] 촌캉스',
        content: '폭스클럽과 유명연예인도 다녀간 촌캉스!',
        price: 198000,
        shippingFees: 0,
        quantity: 20,
        buyQuantity: 20,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-exp2-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-exp2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'experience',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 체험 장소 위치
          region: '강원도 홍천',

          // 출발 지역
          meetingPlace: '홍천터미널 정문 앞',

          // 가는 날짜
          departureDate: '2025-08-15',

          // 오는 날짜
          returnDate: '2025-08-16',

          // 할인율
          dcRate: 30,

          // 최대 예약 가능 인원 수
          productCnt: 2,

          // 대표 키워드
          representitiveKeyword: ['낭만', '청춘', '젊음'],

          // 포함 상품 : '식사 제공', '숙소 제공', '픽업 버스 운행', '체험 상품'
          includedItems: ['식사 제공', '숙소 제공', '픽업 버스 운행', '체험 상품'],

          // 일정
          schedule: [
            { day: 1, startTime: '14:00', title: '농촌마을 전입신고' },
            { day: 1, startTime: '15:00', title: '1부 프로그램' },
            { day: 1, startTime: '18:00', title: '시골 밥상(저녁)' },
            { day: 1, startTime: '20:00', title: '2부 프로그램' },
            { day: 2, startTime: '10:00', title: '정겨운 아침밥(아침)' },
            { day: 2, startTime: '11:00', title: '퇴소신고' },
          ],

          // 가이드 정보
          guideInfo: {
            name: '김우리',
            contact: '010-1234-5678',
          },

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: true }, // 품절 상품
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 7,
        name: '고소한 대화 한 조각, 임실치즈마을 가족소풍',
        content: '임실 대표 관광지 치즈마을 당일 여행!',
        price: 92000,
        shippingFees: 0,
        quantity: 20,
        buyQuantity: 4,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-exp2-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-exp2-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'experience',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 체험 장소 위치
          region: '전라북도 임실',

          // 출발 지역
          meetingPlace: '전북특별자치도 임실군 임실읍 치즈마을길 96',

          // 가는 날짜
          departureDate: '2025-08-09',

          // 오는 날짜
          returnDate: '2025-08-09',

          // 할인율
          dcRate: 45,

          // 최대 예약 가능 인원 수
          productCnt: 4,

          // 대표 키워드
          representitiveKeyword: ['가족', '대화', '힐링'],

          // 포함 상품 : '식사 제공', '숙소 제공', '픽업 버스 운행', '체험 상품'
          includedItems: ['식사 제공', '체험 상품'],

          // 일정
          schedule: [
            { day: 1, startTime: '13:00', title: '오리엔테이션' },
            { day: 1, startTime: '13:30', title: '경운기 투어' },
            { day: 1, startTime: '14:00', title: '임실치즈피자 만들기' },
            { day: 1, startTime: '15:00', title: '마을 산책 - 농사이야기' },
            { day: 1, startTime: '15:30', title: '피크닉' },
            { day: 1, startTime: '17:00', title: '성가리 벽화마을 투어' },
          ],

          // 가이드 정보
          guideInfo: {
            name: '이하나',
            contact: '010-1234-5678',
          },

          // 뱃지용
          badge: [
            { isNew: true }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],
        },
      },

      /* 3. 텃밭 상품 */
      // seller_id: 3
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '양배추',
        content: '양배추에서 조세호가 될 때까지',
        price: 30000,
        shippingFees: 0,
        quantity: 40,
        buyQuantity: 32,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '경기 여주시 산북면 광여로 1509',

          // 판매 마감일
          deadline: '2025-08-15',

          // 수확 예정일
          harvestExpectedDate: '2025년 11월',

          // 예상 수확량
          harvestExpectedCnt: '5통',

          // 할인율
          dcRate: 35,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: true }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-08-18',
              image: 'src',
              status: 'seeding',
              content: '양배추 재배, 오늘 시작합니다',
            },
            {
              date: '2025-09-04',
              image: 'src',
              status: 'growing',
              content: '잘 커라 양배추야',
            },
            {
              date: '2025-09-17',
              image: 'src',
              status: 'growing',
              content: '무럭무럭 잘 자라고 있습니다.',
            },
            {
              date: '2025-10-04',
              image: 'src',
              status: 'growing',
              content: '곧 있으면 수확할 수 있겠네요.',
            },
            {
              date: '2025-10-15',
              image: 'src',
              status: 'havested',
              content: '엄청 실하네요ㅎㅎ곧 배송 예정!',
            },
          ],

          // 텃밭 판매 현황 (상호작용 UI용)
          // plots: [
          //   {
          //     plotNumber: 1,
          //     name: 'A-1',
          //     isAvailable: false,
          //     ownerUserId: 1002,
          //     plantedAt: '2025-07-01',
          //     status: 'seeding', // available | seeding | growing | harvested
          //   },
          //   {
          //     plotNumber: 2,
          //     name: 'A-2',
          //     isAvailable: true,
          //     ownerUserId: null,
          //     plantedAt: '2025-07-01',
          //     status: 'seeding', // available | seeding | growing | harvested
          //   },
          //   {
          //     plotNumber: 3,
          //     name: 'A-3',
          //     isAvailable: true,
          //     ownerUserId: null,
          //     plantedAt: null,
          //     status: 'available',
          //   },
          //   {
          //     plotNumber: 4,
          //     name: 'A-4',
          //     isAvailable: true,
          //     ownerUserId: null,
          //     plantedAt: null,
          //     status: 'available',
          //   },
          //   {
          //     plotNumber: 5,
          //     name: 'A-5',
          //     isAvailable: true,
          //     ownerUserId: null,
          //     plantedAt: null,
          //     status: 'available',
          //   },
          // ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '청경채',
        content: '청경채의 성장 여정을 함께 해요',
        price: 15000,
        shippingFees: 0,
        quantity: 300,
        buyQuantity: 112,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '경기 여주시 산북면 광여로 1509',

          // 판매 마감일
          deadline: '2025-08-09',

          // 수확 예정일
          harvestExpectedDate: '2025년 10월 초',

          // 예상 수확량
          harvestExpectedCnt: '2kg',

          // 할인율
          dcRate: 25,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: true }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-08-12',
              image: 'src',
              status: 'seeding',
              content: '싹을 심었습니다.',
            },
            {
              date: '2025-08-25',
              image: 'src',
              status: 'growing',
              content: '싹이 자랐습니다.',
            },
            {
              date: '2025-09-16',
              image: 'src',
              status: 'growing',
              content: '잎이 무럭무럭 자라고 있습니다.',
            },
            {
              date: '2025-09-30',
              image: 'src',
              status: 'growing',
              content: '곧 있으면 수확할 수 있겠네요.',
            },
            {
              date: '2025-10-19',
              image: 'src',
              status: 'havested',
              content: '재배를 했습니다.',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 3,
        name: '옥수수',
        content: '겨울에 수확하는 옥수수? 같이 키워주세요!',
        price: 27000,
        shippingFees: 0,
        quantity: 200,
        buyQuantity: 41,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '중국',

          // 판매 마감일
          deadline: '2025-08-25',

          // 수확 예정일
          harvestExpectedDate: '2025년 12월',

          // 예상 수확량
          harvestExpectedCnt: '20개',

          // 할인율
          dcRate: 59,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-09-02',
              image: 'src',
              status: 'seeding',
              content: '무럭 무럭 자라라',
            },
            {
              date: '2025-09-23',
              image: 'src',
              status: 'growing',
              content: '체계적인 생산 공정 덕분에 신선하고 건강하게 자라고 있어요',
            },
            {
              date: '2025-10-12',
              image: 'src',
              status: 'growing',
              content: '유전자 조작 아닙니다. 대박이죠?',
            },
            {
              date: '2025-11-02',
              image: 'src',
              status: 'havested',
              content: '올해는 조금 늦었습니다. 수확 완료!',
            },
          ],

          // 텃밭 판매 현황 (상호작용 UI용)
          plots: [
            {
              plotNumber: 1,
              name: 'A-1',
              isAvailable: false,
              ownerUserId: 1002,
              plantedAt: '2025-07-01',
              status: 'seeding', // available | seeding | growing | harvested
            },
            {
              plotNumber: 2,
              name: 'A-2',
              isAvailable: true,
              ownerUserId: null,
              plantedAt: '2025-07-01',
              status: 'seeding', // available | seeding | growing | harvested
            },
            {
              plotNumber: 3,
              name: 'A-3',
              isAvailable: true,
              ownerUserId: null,
              plantedAt: null,
              status: 'available',
            },
            {
              plotNumber: 4,
              name: 'A-4',
              isAvailable: true,
              ownerUserId: null,
              plantedAt: null,
              status: 'available',
            },
            {
              plotNumber: 5,
              name: 'A-5',
              isAvailable: true,
              ownerUserId: null,
              plantedAt: null,
              status: 'available',
            },
          ],
        },
      },
      // seller_id: 5
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '배추',
        content: '배추의 성장 여정을 함께 해요',
        price: 25000,
        shippingFees: 0,
        quantity: 50,
        buyQuantity: 45,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '경기 여주시 산북면 광여로 1509',

          // 판매 마감일
          deadline: '2025-08-10',

          // 수확 예정일
          harvestExpectedDate: '2025년 10월 ~ 11월',

          // 예상 수확량
          harvestExpectedCnt: '6포기',

          // 할인율
          dcRate: 40,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: true }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-08-13',
              image: 'src',
              status: 'seeding',
              content: '싹을 심었습니다.',
            },
            {
              date: '2025-08-31',
              image: 'src',
              status: 'growing',
              content: '싹이 자랐습니다.',
            },
            {
              date: '2025-09-14',
              image: 'src',
              status: 'growing',
              content: '잎이 무럭무럭 자라고 있습니다.',
            },
            {
              date: '2025-10-01',
              image: 'src',
              status: 'growing',
              content: '곧 있으면 수확할 수 있겠네요.',
            },
            {
              date: '2025-10-21',
              image: 'src',
              status: 'havested',
              content: '재배를 했습니다.',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '무',
        content: '무의 성장 여정을 함께 해요',
        price: 35000,
        shippingFees: 0,
        quantity: 100,
        buyQuantity: 100,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '경기도 여주시 가남읍 상활1길 68',

          // 판매 마감일
          deadline: '2025-08-13',

          // 수확 예정일
          harvestExpectedDate: '2025년 10월 ~ 11월',

          // 예상 수확량
          harvestExpectedCnt: '10수',

          // 할인율
          dcRate: 50,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: true }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: true }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-08-20',
              image: 'src',
              status: 'seeding',
              content: '싹을 심었습니다.',
            },
            {
              date: '2025-09-12',
              image: 'src',
              status: 'growing',
              content: '잎이 넓은게 올해 무는 기대가 됩니다',
            },
            {
              date: '2025-10-04',
              image: 'src',
              status: 'havested',
              content: '알이 실하죠? 곧 배송해드릴게요ㅎㅎ',
            },
          ],
        },
      },
      {
        _id: await nextSeq('product'),
        seller_id: 5,
        name: '브로콜리',
        content: '브로콜리의 성장 여정을 함께 해요',
        price: 22000,
        shippingFees: 0,
        quantity: 300,
        buyQuantity: 179,
        show: true,
        active: true,
        mainImages: [
          {
            path: `/files/${clientId}/seller-2-gdn3-1.jpg`,
            name: 'image-1.jpg',
            originalname: '상품이미지-1.jpg',
          },
          {
            path: `/files/${clientId}/seller-2-gdn3-2.jpg`,
            name: 'image-2.jpg',
            originalname: '상품이미지-2.jpg',
          },
        ],
        createdAt: getTime(-41, -60 * 60 * 2),
        updatedAt: getTime(-40, -60 * 15),
        extra: {
          // 상품 타입 : 'crop' | 'experience' | 'gardening'
          productType: 'gardening',

          // 2차 카테고리
          category: [],

          // 3차 카테고리
          filter: [],

          // 텃밭 위치
          region: '경기도 여주시 가남읍 상활1길 68',

          // 판매 마감일
          deadline: '2025-08-12',

          // 수확 예정일
          harvestExpectedDate: '2025년 10월 ~ 11월',

          // 예상 수확량
          harvestExpectedCnt: '2kg',

          // 할인율
          dcRate: 50,

          // 최대 구매 가능 수량
          productCnt: 1,

          // 뱃지용
          badge: [
            { isNew: false }, // 신상품
            { isInSeason: null }, // 제철 상품 (농산물 전용)
            { isBest: false }, // 인기 상품
            { isLowStock: false }, // 품절 임박 상품
            { isSold: false }, // 품절 상품
          ],

          // 텃밭 구독자 제공 정보 (주기별 상품 상태 메시지) : seeding | growing | harvested
          period: [
            {
              date: '2025-08-14',
              image: 'src',
              status: 'seeding',
              content: '싹을 심었습니다.',
            },
            {
              date: '2025-09-08',
              image: 'src',
              status: 'growing',
              content: '잎이 넓은게 올해 무는 기대가 됩니다',
            },
            {
              date: '2025-10-07',
              image: 'src',
              status: 'havested',
              content: '알이 실하죠? 곧 배송해드릴게요ㅎㅎ',
            },
          ],
        },
      },
    ],

    /* 주문 */
    order: [
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS020',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS020',
            name: '헬로카봇 스톰다이버',
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: 'sample-diver.jpg',
              originalname: '헬로카봇.jpg',
            },
            quantity: 2,
            price: 34520,
            review_id: 3,
          },
        ],
        cost: {
          products: 34520,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 37020,
        },
        address: {
          name: '회사',
          value: '서울시 강남구 신사동 234',
        },
        createdAt: getTime(-6, -60 * 60 * 3),
        updatedAt: getTime(-6, -60 * 60 * 3),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS010',
        products: [
          {
            _id: 3,
            seller_id: 2,
            state: 'OS010',
            name: '레고 클래식 라지 조립 박스 10698',
            image: {
              path: `/files/${clientId}/sample-classic.jpg`,
              name: 'sample-classic.jpg',
              originalname: '레고 클래식.jpg',
            },
            quantity: 1,
            price: 48870,
          },
          {
            _id: 4,
            seller_id: 3,
            state: 'OS010',
            name: '레고 테크닉 42151 부가티 볼리드',
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: 'sample-bugatti.png',
              originalname: '부가티.png',
            },
            quantity: 2,
            price: 90000,
            review_id: 2,
          },
        ],
        cost: {
          products: 138840,
          shippingFees: 3500,
          discount: {
            products: 13880,
            shippingFees: 3500,
          },
          total: 124960,
        },
        address: {
          name: '집',
          value: '서울시 강남구 역삼동 123',
        },
        createdAt: getTime(-4, -60 * 60 * 22),
        updatedAt: getTime(-2, -60 * 60 * 12),
      },
      {
        _id: await nextSeq('order'),
        user_id: 4,
        state: 'OS040',
        products: [
          {
            _id: 4,
            seller_id: 3,
            state: 'OS110',
            name: '레고 테크닉 42151 부가티 볼리드',
            image: {
              path: `/files/${clientId}/sample-bugatti.png`,
              name: 'sample-bugatti.png',
              originalname: '부가티.png',
            },
            quantity: 1,
            price: 45000,
            review_id: 1,
          },
        ],
        cost: {
          products: 45000,
          shippingFees: 3500,
          discount: {
            products: 4500,
            shippingFees: 0,
          },
          total: 44000,
        },
        address: {
          name: '학교',
          value: '서울시 강남구 역삼동 234',
        },
        payment: {
          success: true,
          imp_uid: 'imp_138601212227',
          pay_method: 'card',
          merchant_uid: 'mid_1702540599641',
          name: '레고 테크닉 42151 부가티 볼리드',
          paid_amount: 45000,
          currency: 'KRW',
          pg_provider: 'html5_inicis',
          pg_type: 'payment',
          pg_tid: 'StdpayCARDINIpayTest20231214165706277441',
          apply_num: '30123157',
          buyer_name: '제이지',
          buyer_email: 'aceppin@daum.net',
          buyer_tel: '01044445555',
          buyer_addr: '',
          buyer_postcode: '',
          custom_data: null,
          status: 'paid',
          paid_at: 1702540626,
          receipt_url:
            'https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=StdpayCARDINIpayTest20231214165706277441&noMethod=1',
          card_name: '국민KB카드',
          bank_name: null,
          card_quota: 0,
          card_number: '457973*********5',
        },
        delivery: {
          company: '한진 택배',
          trackingNumber: '364495958003',
          url: 'https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003',
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
      {
        _id: await nextSeq('order'),
        user_id: 2,
        state: 'OS040',
        products: [
          {
            _id: 2,
            seller_id: 2,
            state: 'OS310',
            name: '헬로카봇 스톰다이버',
            image: {
              path: `/files/${clientId}/sample-diver.jpg`,
              name: 'sample-diver.jpg',
              originalname: '헬로카봇.jpg',
            },
            quantity: 1,
            price: 17260,
            review_id: 2,
          },
        ],
        cost: {
          products: 17260,
          shippingFees: 2500,
          discount: {
            products: 0,
            shippingFees: 0,
          },
          total: 19760,
        },
        address: {
          name: '학교',
          value: '서울시 강남구 역삼동 234',
        },
        delivery: {
          company: '한진 택배',
          trackingNumber: '364495958003',
          url: 'https://trace.cjlogistics.com/next/tracking.html?wblNo=364495958003',
        },
        createdAt: getTime(-3, -60 * 60 * 18),
        updatedAt: getTime(-1, -60 * 60 * 1),
      },
    ],

    /* 후기 */
    review,
    /*  review: [
      // user_id: 8 (정길용)
      {
        _id: await nextSeq('review'),
        rating: 1,
        content:
          '찰옥수수라고 해서 시켰는데, 딱딱해서 씹을 수가 없어요. 물론 제가 안삶아서 그렇긴 한데 이렇게 딱딱할 수 있나요? 어이가 없어서 정말', // 본문
        user_id: 8,
        product_id: 25,
        extra: {
          name: '찰옥수수가 아니라 철옥수수네요', // 제목
          image: [
            {
              url: '/',
            },
            {
              url: '/',
            },
          ],
        },
        createdAt: getTime(-4, -60 * 60 * 12),

        // 주문자 정보
        user: {
          _id: 8,
          name: '정길용',
        },

        // 판매자 정보
        product: {
          _id: 25,
          name: '제주농산물',
        },
      },
      // user_id: 9 (김데레사)
      {
        _id: await nextSeq('review'),
        rating: 5,
        content: '고양이도 맛있게 먹네요. 추천합니다', // 본문
        user_id: 9,
        product_id: 21,
        extra: {
          name: '저희 고양이도 좋아해요', // 제목
          image: [
            {
              url: '/',
            },
            {
              url: '/',
            },
          ],
        },
        createdAt: getTime(-4, -60 * 60 * 12),

        // 주문자 정보
        user: {
          _id: 9,
          image: 'user-jayg.webp',
          name: '김데레사',
        },

        // 판매 상품 정보
        product: {
          _id: 21,
          image: {
            path: 'files/openmarket/sample-diver.jpg',
            name: 'sample-diver.jpg',
            originalname: '헬로카봇.jpg',
          },
          name: '햇 괴산 대학찰옥수수 찐옥수수 장작불 가마솥에 삶은 냉동 옥수수',
        },
      },
    ], */

    /* 장바구니 */
    cart: [],

    /* 즐겨찾기/북마크 */
    bookmark: [],

    /* 게시판 : QnA, 공지사항 등 */
    post: [
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 4,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼마만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 1,
              name: '관리자',
              image: 'user-neo.png',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },

      {
        _id: await nextSeq('post'),
        type: 'notice',
        views: 10,
        user: {
          _id: 1,
          name: '무지',
          image: 'user-muzi.png',
        },
        title: '배송지연 안내',
        content: '크리스마스 물류 증가로 인해 평소보다 2~3일 지연될 예정입니다.',
        createdAt: getTime(-4, -60 * 60 * 2),
        updatedAt: getTime(-2, -60 * 60 * 13),
      },

      {
        _id: await nextSeq('post'),
        type: 'farm', // '내 농장물 자랑하기' 게시판
        product_id: 11, // (선택) 구독 상품과 연결 가능
        seller_id: 3,
        views: 0,
        user: {
          _id: 3,
          name: '김농부',
          image: 'user-farmer.png',
        },
        title: '우리 밭에서 상추가 자라요!',
        content: '비 온 다음날이라 그런지 훨씬 푸릇푸릇해졌어요 🌱',
        images: ['/files/3/farm-lettuce1.jpg', '/files/3/farm-lettuce2.jpg'],
        createdAt: getTime(-1, -60 * 60 * 6),
        updatedAt: getTime(-1, -60 * 60 * 2),
        extra: {
          weather: '비 온 뒤 맑음',
          temperature: '22도',
          memo: '다음주엔 김장 채소 심기!',
        },
      },
      {
        _id: await nextSeq('post'),
        type: 'faq',
        views: 210,
        title: '배송은 얼마나 걸리나요?',
        content: '기본 배송은 평일 기준 1~3일 소요됩니다. 산간지역은 1~2일 추가될 수 있습니다.',
        createdAt: getTime(-10, -60 * 60 * 5),
        updatedAt: getTime(-8, -60 * 60 * 4),
        extra: {
          category: '배송', // 분류: 배송, 결제, 회원, 쿠폰 등
        },
      },

      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 1,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '언제 배달이 되나요??',
        content: '주문한지 1년이 지났는데 소식이 없어요..',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 1,
              name: '관리자',
              image: 'user-neo.png',
            },
            content: '오늘 출발했습니다. 죄송합니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 1,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼마만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 1,
              name: '관리자',
              image: 'user-neo.png',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 11,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼마만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 1,
              name: '관리자',
              image: 'user-neo.png',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
      {
        _id: await nextSeq('post'),
        type: 'qna',
        product_id: 1,
        seller_id: 2,
        views: 5,
        user: {
          _id: 11,
          name: '제이지',
          image: 'user-jayg.webp',
        },
        title: '크기가 얼마만한가요?',
        content: '아이가 6살인데 가지고 놀기 적당한 크기인가요?',
        replies: [
          {
            _id: await nextSeq('reply'),
            user: {
              _id: 1,
              name: '관리자',
              image: 'user-neo.png',
            },
            content: '크기는 상품 상세정보에 나와 있습니다.',
            like: 5,
            createdAt: getTime(-2, -60 * 60 * 20),
            updatedAt: getTime(-2, -60 * 60 * 2),
          },
        ],
        createdAt: getTime(-3, -60 * 60 * 2),
        updatedAt: getTime(-3, -60 * 60 * 2),
      },
    ],

    // 코드
    code: [],

    // 설정
    config: [],
  };
};
