/**
 * Auth Store — Web version using Supabase
 */
import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Session, User } from '@supabase/supabase-js';
import { clearUserData } from '../utils/storage';

export type AppMode = 'jugador' | 'master';

export interface Profile {
  id: string;
  nombre: string;
  avatar_url: string | null;
  codigo_jugador: string;
  es_premium: boolean;
  modo_actual: AppMode;
}

interface AuthState {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  appMode: AppMode;
}

interface AuthActions {
  initialize: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<{ error: string | null }>;
  signUpWithEmail: (email: string, password: string, nombre: string) => Promise<{ error: string | null; needsConfirmation?: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  setAppMode: (mode: AppMode) => Promise<void>;
  clearError: () => void;
}

async function fetchProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data as Profile;
}

export const useAuthStore = create<AuthState & AuthActions>((set, get) => ({
  session: null,
  user: null,
  profile: null,
  loading: true,
  initialized: false,
  error: null,
  appMode: 'jugador',

  initialize: async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        set({
          session,
          user: session.user,
          profile,
          appMode: profile?.modo_actual ?? 'jugador',
          loading: false,
          initialized: true,
        });
      } else {
        set({ loading: false, initialized: true });
      }

      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const profile = await fetchProfile(session.user.id);
          set({
            session,
            user: session.user,
            profile,
            appMode: profile?.modo_actual ?? 'jugador',
          });
        } else if (event === 'SIGNED_OUT') {
          set({ session: null, user: null, profile: null, appMode: 'jugador' });
        }
      });
    } catch (error) {
      console.error('[Auth] Init error:', error);
      set({ loading: false, initialized: true, error: 'Error al inicializar' });
    }
  },

  signInWithEmail: async (email, password) => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const msg = translateAuthError(error.message);
      set({ loading: false, error: msg });
      return { error: msg };
    }
    set({ loading: false });
    return { error: null };
  },

  signUpWithEmail: async (email, password, nombre) => {
    set({ loading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { nombre } },
    });
    if (error) {
      const msg = translateAuthError(error.message);
      set({ loading: false, error: msg });
      return { error: msg };
    }
    const needsConfirmation = !data.session;
    set({ loading: false });
    return { error: null, needsConfirmation };
  },

  signInWithGoogle: async () => {
    set({ loading: true, error: null });
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: typeof window !== 'undefined' ? window.location.origin + '/app' : undefined,
      },
    });
    if (error) {
      set({ loading: false, error: 'Error con Google: ' + error.message });
    }
  },

  signOut: async () => {
    set({ loading: true });
    await supabase.auth.signOut();
    clearUserData();
    set({
      session: null,
      user: null,
      profile: null,
      loading: false,
      appMode: 'jugador',
    });
  },

  setAppMode: async (mode) => {
    set({ appMode: mode });
    const user = get().user;
    if (user) {
      await supabase.from('profiles').update({ modo_actual: mode }).eq('id', user.id);
    }
  },

  clearError: () => set({ error: null }),
}));

// Selectors
export const selectIsAuthenticated = (state: AuthState) => !!state.session;
export const selectPlayerCode = (state: AuthState) => state.profile?.codigo_jugador ?? '';
export const selectAppMode = (state: AuthState) => state.appMode;
export const selectIsPremium = (state: AuthState) => state.profile?.es_premium ?? false;

function translateAuthError(msg: string): string {
  if (msg.includes('Invalid login')) return 'Email o contraseña incorrectos';
  if (msg.includes('already registered')) return 'Este email ya está registrado';
  if (msg.includes('rate limit')) return 'Demasiados intentos. Espera un momento';
  if (msg.includes('network')) return 'Error de conexión. Verifica tu internet';
  return msg;
}
