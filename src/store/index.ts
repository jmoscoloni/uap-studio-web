import { create } from 'zustand';

interface TranslatedPaths {
  [locale: string]: string;
}

interface LocalizedText {
  en: string;
  es: string;
}

export interface ArchiveItemBase {
  id: number;
  title: string;
  architectureType: LocalizedText;
  description: LocalizedText;
  image: string;
}

export interface ArchiveItem {
  id: number;
  title: string;
  architectureType: string;
  description: string;
  image: string;
}

interface StoreState {
  canScroll: boolean;
  setCanScroll: (value: boolean) => void;

  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;

  isLoading: boolean;
  setIsLoading: (value: boolean) => void;

  isPopUpOpen: boolean;
  setIsPopUpOpen: (value: boolean) => void;

  translatedPaths: TranslatedPaths;
  setTranslatedPaths: (paths: TranslatedPaths) => void;
  clearTranslatedPaths: () => void;
}

export const useStore = create<StoreState>((set) => ({
  canScroll: true,
  setCanScroll: (value: boolean) => set({ canScroll: value }),

  isMenuOpen: false,
  setIsMenuOpen: (value: boolean) => set({ isMenuOpen: value }),

  isPopUpOpen: false,
  setIsPopUpOpen: (value: boolean) => set({ isPopUpOpen: value }),

  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),

  translatedPaths: {},
  setTranslatedPaths: (paths: TranslatedPaths) => set({ translatedPaths: paths }),
  clearTranslatedPaths: () => set({ translatedPaths: {} })
}));
