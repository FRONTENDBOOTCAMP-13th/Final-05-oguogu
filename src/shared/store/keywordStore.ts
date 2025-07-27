import { keywordState } from '@/shared/types/keyword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSearchKeywordStore = create<keywordState>()(
  persist(
    (set, get) => ({
      originKeyword: null,
      saveKeyword: (keyword: string) => set({ originKeyword: keyword }),
      clearKeyword: () => set({ originKeyword: null }),
      getKeyword: () => get().originKeyword,
    }),
    {
      name: 'keyword',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
