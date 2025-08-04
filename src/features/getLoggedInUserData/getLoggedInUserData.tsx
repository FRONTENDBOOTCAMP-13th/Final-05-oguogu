'use client';

import { useAuthStore } from '@/shared/store/authStore';

export default function GetLoggedInUserData({ type }: { type: 'id' | 'name' | 'type' }) {
  const LoggedInUser = useAuthStore(state => state.userInfo);

  const userId = LoggedInUser?._id;
  const userName = LoggedInUser?.name;
  const userType = LoggedInUser?.type;

  return (
    <>
      <span>{type === 'id' ? userId : type === 'name' ? userName : userType}</span>
    </>
  );
}
