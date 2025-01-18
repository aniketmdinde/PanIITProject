import create from 'zustand';

export const useAgreementStore = create((set) => ({
  agreements: [],
  filters: {},
  setFilters: (filters) => set({ filters }),
  addAgreement: (agreement) =>
    set((state) => ({ agreements: [...state.agreements, agreement] })),
  updateAgreement: (id, agreement) =>
    set((state) => ({
      agreements: state.agreements.map((a) =>
        a.id === id ? { ...a, ...agreement } : a
      ),
    })),
}));