'use client';

import { useAuthStore } from '@/shared/store/authStore';

export default function GetLoggedInUserData({ type }: { type: 'id' | 'name' }) {
  const LoggedInUser = useAuthStore(state => state.userInfo);
  const userId = LoggedInUser?._id;
  const userName = LoggedInUser?.name;

  return <span>{type === 'id' ? userId : userName}</span>;
}
