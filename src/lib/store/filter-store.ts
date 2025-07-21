import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface FilterState {
  search: string;
  status: string;
  species: string;
  gender: string;
  setSearch: (search: string) => void;
  setStatus: (status: string) => void;
  setSpecies: (species: string) => void;
  setGender: (gender: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      search: '',
      status: 'all',
      species: 'all',
      gender: 'all',
      setSearch: (search) => set({ search }),
      setStatus: (status) => set({ status: status === 'all' ? 'all' : status }),
      setSpecies: (species) => set({ species }),
      setGender: (gender) => set({ gender }),
      resetFilters: () =>
        set({
          search: '',
          status: 'all',
          species: 'all',
          gender: 'all',
        }),
    }),
    {
      name: 'filter-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
