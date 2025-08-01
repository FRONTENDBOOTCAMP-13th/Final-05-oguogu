'use client';

import { useAuthStore } from '@/shared/store/authStore';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LogOutIcon() {
  const logout = useAuthStore(state => state.logout);
  const router = useRouter();

  const handeLogout = () => {
    toast.success('로그아웃 되었습니다.');
    logout();
    router.push('/login');
  };

  return (
    <button type="button" onClick={handeLogout} className="cursor-pointer">
      <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M4.68001 17.1663C4.29612 17.1663 3.97584 17.038 3.71918 16.7813C3.46251 16.5247 3.3339 16.2041 3.33334 15.8197V5.17967C3.33334 4.79579 3.46195 4.47551 3.71918 4.21884C3.9764 3.96217 4.29668 3.83356 4.68001 3.83301H10.0158V4.66634H4.68001C4.55168 4.66634 4.4339 4.71967 4.32668 4.82634C4.21945 4.93301 4.16612 5.05079 4.16668 5.17967V15.8205C4.16668 15.9483 4.22001 16.0658 4.32668 16.173C4.43334 16.2802 4.55084 16.3336 4.67918 16.333H10.0158V17.1663H4.68001ZM13.7183 13.4488L13.1333 12.8488L15.0658 10.9163H7.66001V10.083H15.0658L13.1325 8.14967L13.7175 7.55134L16.6667 10.4997L13.7183 13.4488Z"
          fill="black"
        />
      </svg>
    </button>
  );
}
