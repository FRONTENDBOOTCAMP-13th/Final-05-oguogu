import { createBookmark, deleteBookmark } from '@/shared/data/actions/bookmarks';
import { getBookmarks } from '@/shared/data/functions/bookmarks';
import { useAuthStore } from '@/shared/store/authStore';
import { BookmarkResponse, BookmarkItem } from '@/shared/types/bookmarkt';
import toast from 'react-hot-toast';
import { create } from 'zustand';

interface BookmarkState {
  bookmarkedIds: number[]; // 북마크된 상품 id 리스트

  fetchBookmarks: () => Promise<void>; // 서버에서 북마크 목록 불러오기
  toggleBookmark: (productId: number) => Promise<void>; // 북마크 등록/해제 API 호출 + 상태 업데이트
}

export const useBookmarkStore = create<BookmarkState>((set, get) => ({
  bookmarkedIds: [],

  fetchBookmarks: async () => {
    try {
      const token = useAuthStore.getState().token;
      if (token === null) return;

      const res: BookmarkResponse = await getBookmarks('product', token);

      // 숫자 key만 필터링해서 BookmarkItem으로 변환
      const bookmarkItems: BookmarkItem[] = Object.values(res).filter(
        (item): item is BookmarkItem => typeof item === 'object' && 'product' in item,
      );

      const bookmarkedIds = bookmarkItems.map(item => item.product._id);
      set({ bookmarkedIds });
    } catch (error) {
      console.error('Failed to fetch bookmarks', error);
    }
  },

  toggleBookmark: async (productId: number) => {
    const { bookmarkedIds } = get();
    const token = useAuthStore.getState().token;
    const isBookmarked = bookmarkedIds.includes(productId);

    if (token === null) {
      toast.error('로그인이 필요합니다.');
      return;
    }

    try {
      if (isBookmarked) {
        await deleteBookmark(productId, { target_id: 'any' }, token);
        set({ bookmarkedIds: bookmarkedIds.filter(id => id !== productId) });
        toast.success('북마크를 해제했습니다.');
      } else {
        await createBookmark({ target_id: productId, extra: { type: 'like' } }, token);
        set({ bookmarkedIds: [...bookmarkedIds, productId] });
        toast.success('북마크를 등록했습니다.');
      }
    } catch (error) {
      console.error('Failed to toggle bookmark', error);
    }
  },
}));
