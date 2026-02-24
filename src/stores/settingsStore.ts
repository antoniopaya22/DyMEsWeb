/**
 * Settings Store — Web version
 */
import { create } from 'zustand';
import { STORAGE_KEYS, setItem, getItem } from '../utils/storage';

export type ThemeMode = 'claro' | 'oscuro' | 'auto';
export type UnitSystem = 'imperial' | 'metrico';

export interface OptionalRules {
  dotesActivas: boolean;
  multiclase: boolean;
  pvFijos: boolean;
  compraPuntos: boolean;
  encumbranceDetallada: boolean;
}

export interface AppSettings {
  tema: ThemeMode;
  unidades: UnitSystem;
  reglasOpcionales: OptionalRules;
}

const DEFAULT_SETTINGS: AppSettings = {
  tema: 'oscuro',
  unidades: 'metrico',
  reglasOpcionales: {
    dotesActivas: true,
    multiclase: false,
    pvFijos: true,
    compraPuntos: true,
    encumbranceDetallada: false,
  },
};

interface SettingsState {
  settings: AppSettings;
  loaded: boolean;
}

interface SettingsActions {
  loadSettings: () => void;
  setTheme: (tema: ThemeMode) => void;
  setUnits: (unidades: UnitSystem) => void;
  toggleOptionalRule: (rule: keyof OptionalRules) => void;
  resetSettings: () => void;
}

function persistSettings(settings: AppSettings) {
  setItem(STORAGE_KEYS.SETTINGS, settings);
}

export const useSettingsStore = create<SettingsState & SettingsActions>((set, get) => ({
  settings: DEFAULT_SETTINGS,
  loaded: false,

  loadSettings: () => {
    const saved = getItem<AppSettings>(STORAGE_KEYS.SETTINGS);
    if (saved) {
      set({ settings: { ...DEFAULT_SETTINGS, ...saved }, loaded: true });
    } else {
      set({ loaded: true });
    }
  },

  setTheme: (tema) => {
    const settings = { ...get().settings, tema };
    set({ settings });
    persistSettings(settings);
    // Apply dark class to document
    if (typeof document !== 'undefined') {
      const isDark = tema === 'oscuro' || (tema === 'auto' && window.matchMedia('(prefers-color-scheme: dark)').matches);
      document.documentElement.classList.toggle('dark', isDark);
    }
  },

  setUnits: (unidades) => {
    const settings = { ...get().settings, unidades };
    set({ settings });
    persistSettings(settings);
  },

  toggleOptionalRule: (rule) => {
    const current = get().settings;
    const settings = {
      ...current,
      reglasOpcionales: {
        ...current.reglasOpcionales,
        [rule]: !current.reglasOpcionales[rule],
      },
    };
    set({ settings });
    persistSettings(settings);
  },

  resetSettings: () => {
    set({ settings: DEFAULT_SETTINGS });
    persistSettings(DEFAULT_SETTINGS);
  },
}));

// Convenience selectors
export const useTemaActual = () => useSettingsStore(s => s.settings.tema);
export const useUnidadesActuales = () => useSettingsStore(s => s.settings.unidades);

export const APP_INFO = {
  name: 'DyMEs',
  version: '1.0.0',
  description: 'Gestiona tus partidas y personajes de D&D 5e en español',
  srdLicense: 'Contenido basado en SRD 5.1 bajo OGL 1.0a',
  techStack: ['Astro', 'React', 'Tailwind CSS', 'TypeScript', 'Supabase', 'Zustand'],
};
