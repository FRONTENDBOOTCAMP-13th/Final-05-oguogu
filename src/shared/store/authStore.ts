'use client';
import { UserSellerExtraType } from '@/shared/types/user';
import { create } from 'zustand';

// 임시로 _id, 이름, 타입만 전역에서 바로 확인할 수 있도록 설정 (추후 확장 가능)
export interface userInfo {
  _id: number;
  name: string;
  type: 'user' | 'seller' | 'admin';
  extra?: UserSellerExtraType;
}

// 인증 zustand 스토어 타입
interface authState {
  token: string | null;
  userInfo: userInfo | null;
  isLoggedIn: boolean;

  setToken: (token: string) => void;
  setUserInfo: (info: userInfo) => void;
  logout: () => void;
  setStorageType: (autoLogin: boolean) => void;
}

// Zustand store 생성
export const useAuthStore = create<authState>((set, get) => ({
  token: null,
  userInfo: null,
  isLoggedIn: false,

  // 로그인 후 accessToken을 저장하고 로그인 상태를 true로 설정
  setToken: token =>
    set(() => ({
      token: token,
      isLoggedIn: true,
    })),

  // 로그인 후 사용자 정보를 저장
  setUserInfo: (info: userInfo) =>
    set(() => ({
      userInfo: info,
    })),

  // 로그아웃 처리: 상태에 따라 초기화
  logout: () => {
    localStorage.removeItem('auth-storage');
    sessionStorage.removeItem('user-storage');
    set(() => ({
      token: null,
      userInfo: null,
      isLoggedIn: false,
    }));
  },

  // 자동 로그인 상태에 따라 저장소 결정
  setStorageType: (autoLogin: boolean) => {
    const state = get();
    const storage = autoLogin ? localStorage : sessionStorage;
    const key = autoLogin ? 'auth-storage' : 'user-storage';

    localStorage.removeItem('auth-storage');
    sessionStorage.removeItem('user-storage');

    const dataToStore = {
      state: {
        token: state.token,
        userInfo: state.userInfo,
        isLoggedIn: state.isLoggedIn,
      },
    };

    if (autoLogin) {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 60 * 60 * 24 * 1000; // 만료기간 : 하루

      storage.setItem(
        key,
        JSON.stringify({
          ...dataToStore,
          expireAt: expirationTime,
        }),
      );
    } else {
      storage.setItem(key, JSON.stringify(dataToStore));
    }
  },
}));

/*
 사용 예시

1. 로그인 후 상태 설정:
import { useAuthStore } from "@/stores/authStore";
const { setToken, setUserInfo, setStorageType } = useAuthStore.getState();

setToken("my-access-token"); =>  my-access-token 값은 api를 통해 로그인을 진행하고 돌아오는 값 중 토큰을 의미함.
setUserInfo({
  _id: 1,
  name: "홍길동",
  type: "user",
});

setStorageType(true); // true: localStorage (자동 로그인 체크O), false: sessionStorage (자동 로그인 체크x)


2. 로그인 여부 확인:
const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


3. 사용자 이름 출력:
const user = useAuthStore((state) => state.userInfo);
console.log(user?.name); // "홍길동"


4. 로그아웃 처리:
const logout = useAuthStore.getState().logout;  Or  const {logout} = useAuthStore();
logout(); // 상태 및 localStorage 초기화됨

5. initAuthSotre.tsx에서 사용 자세한건 파일에서 확인

*/
