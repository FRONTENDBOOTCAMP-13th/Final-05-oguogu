import { keywordState } from '@/shared/types/keyword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSearchKeywordStore = create<keywordState>()(
  persist(
    set => ({
      originKeyword: null,
      saveKeyword: (keyword: string) => set({ originKeyword: keyword }),
      clearKeyword: () => set({ originKeyword: null }),
    }),
    {
      name: 'keyword',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
