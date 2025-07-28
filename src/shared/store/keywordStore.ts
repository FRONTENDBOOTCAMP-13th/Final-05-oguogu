import { keywordState } from '@/shared/types/keyword';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useSearchKeywordStore = create<keywordState>()(
  persist(
    (set, get) => ({
      originKeyword: [],
      saveKeyword: (keyword: string) => {
        const keywords = get().originKeyword;
        if (!keywords.includes(keyword)) {
          set({ originKeyword: [...keywords, keyword] });
        }
      },
      clearKeyword: () => set({ originKeyword: [] }),
      getKeyword: () => get().originKeyword,
    }),
    {
      name: 'keyword',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
