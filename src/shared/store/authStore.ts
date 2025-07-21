import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 임시로 _id, 이름, 타입만 전역에서 바로 확인할 수 있도록 설정 (추후 확장 가능)
export interface userInfo {
  _id: number;
  name: string;
  type: 'user' | 'seller' | 'admin';
}

// 인증 zustand 스토어 타입
interface authState {
  token: string | null;
  userInfo: userInfo | null;
  isLoggedIn: boolean;

  setToken: (token: string) => void;
  setUserInfo: (info: userInfo) => void;
  logout: () => void;
}

// Zustand store 생성 (persist 적용 -> 로컬 스토리지에서 값을 읽어와 자동으로 저장하기 위함)
export const useAuthStore = create<authState>()(
  persist(
    set => ({
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

      // 로그아웃 처리: 모든 상태 초기화
      logout: () =>
        set(() => ({
          token: null,
          userInfo: null,
          isLoggedIn: false,
        })),
    }),
    {
      name: 'auth-storage', // localStorage에 저장될 key 네임
    },
  ),
);

/*
 사용 예시

1. 로그인 후 상태 설정:
import { useAuthStore } from "@/stores/authStore";
const { setToken, setUserInfo } = useAuthStore.getState();

setToken("my-access-token"); =>  my-access-token 값은 api를 통해 로그인을 진행하고 돌아오는 값 중 토큰을 의미함.
setUserInfo({
  _id: 1,
  name: "홍길동",
  type: "user",
});


2. 로그인 여부 확인:
const isLoggedIn = useAuthStore((state) => state.isLoggedIn);


3. 사용자 이름 출력:
const user = useAuthStore((state) => state.userInfo);
console.log(user?.name); // "홍길동"


4. 로그아웃 처리:
const logout = useAuthStore.getState().logout;  Or  const {logout} = useAuthStore();
logout(); // 상태 및 localStorage 초기화됨

*/
