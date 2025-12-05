import { create } from 'zustand';

interface PersonalizationState {
  isDropdownOpen: boolean;
  toggleDropdown: () => void;
}

export const usePersonalizationStore = create<PersonalizationState>((set, get) => ({
  isDropdownOpen: false,
  toggleDropdown: () => {
    set((state) => ({ isDropdownOpen: !state.isDropdownOpen }));
    console.log('Personalization dropdown toggled. New state:', get().isDropdownOpen);
  },
}));
