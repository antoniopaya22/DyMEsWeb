/**
 * Character List Store — Web version
 */
import { create } from 'zustand';
import type { CharacterSummary, ClassId, RaceId, SubraceId } from '../types/character';
import { STORAGE_KEYS, setItem, getItem } from '../utils/storage';

interface CharacterListState {
  characters: CharacterSummary[];
  loading: boolean;
  error: string | null;
}

interface CharacterListActions {
  loadCharacters: () => void;
  addCharacter: (summary: CharacterSummary) => void;
  updateCharacterSummary: (id: string, updates: Partial<CharacterSummary>) => void;
  deleteCharacter: (id: string) => void;
  getCharacterById: (id: string) => CharacterSummary | undefined;
  clearError: () => void;
}

function persistList(characters: CharacterSummary[]) {
  setItem(STORAGE_KEYS.CHARACTER_LIST, characters);
}

export const useCharacterListStore = create<CharacterListState & CharacterListActions>((set, get) => ({
  characters: [],
  loading: false,
  error: null,

  loadCharacters: () => {
    set({ loading: true });
    try {
      const saved = getItem<CharacterSummary[]>(STORAGE_KEYS.CHARACTER_LIST);
      set({ characters: saved ?? [], loading: false });
    } catch (err) {
      set({ loading: false, error: 'Error al cargar personajes' });
    }
  },

  addCharacter: (summary) => {
    const characters = [summary, ...get().characters];
    set({ characters });
    persistList(characters);
  },

  updateCharacterSummary: (id, updates) => {
    const characters = get().characters.map(c =>
      c.id === id ? { ...c, ...updates } : c
    );
    set({ characters });
    persistList(characters);
  },

  deleteCharacter: (id) => {
    const characters = get().characters.filter(c => c.id !== id);
    set({ characters });
    persistList(characters);
  },

  getCharacterById: (id) => get().characters.find(c => c.id === id),

  clearError: () => set({ error: null }),
}));
