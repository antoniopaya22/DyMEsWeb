/**
 * Campaign/Game store – web version (localStorage).
 */

import { create } from 'zustand';
import type { Campaign, CreateCampaignInput, UpdateCampaignInput } from '../types/campaign';
import { STORAGE_KEYS, setItem, getItem } from '../utils/storage';

interface CampaignState {
  campaigns: Campaign[];
  activeCampaignId: string | null;
  loading: boolean;
  error: string | null;
}

interface CampaignActions {
  loadCampaigns: () => void;
  createCampaign: (input: CreateCampaignInput) => Campaign;
  updateCampaign: (id: string, input: UpdateCampaignInput) => Campaign | null;
  deleteCampaign: (id: string) => void;
  getCampaignById: (id: string) => Campaign | undefined;
  setActiveCampaign: (id: string | null) => void;
  linkCharacter: (campaignId: string, characterId: string) => void;
  unlinkCharacter: (campaignId: string) => void;
  clearError: () => void;
}

type CampaignStore = CampaignState & CampaignActions;

function sortByLastAccess(campaigns: Campaign[]): Campaign[] {
  return [...campaigns].sort(
    (a, b) => new Date(b.actualizadoEn).getTime() - new Date(a.actualizadoEn).getTime()
  );
}

function persist(campaigns: Campaign[]) {
  setItem(STORAGE_KEYS.CAMPAIGNS, campaigns);
}

export const useCampaignStore = create<CampaignStore>((set, get) => ({
  campaigns: [],
  activeCampaignId: null,
  loading: false,
  error: null,

  loadCampaigns: () => {
    set({ loading: true, error: null });
    try {
      const stored = getItem<Campaign[]>(STORAGE_KEYS.CAMPAIGNS);
      const campaigns = stored ? sortByLastAccess(stored) : [];
      set({ campaigns, loading: false });
    } catch (err) {
      set({ error: 'Error al cargar las partidas', loading: false });
    }
  },

  createCampaign: (input) => {
    const now = new Date().toISOString();
    const campaign: Campaign = {
      id: crypto.randomUUID(),
      nombre: input.nombre.trim(),
      descripcion: input.descripcion?.trim() || undefined,
      imagen: input.imagen || undefined,
      personajeId: undefined,
      creadoEn: now,
      actualizadoEn: now,
    };

    const updated = sortByLastAccess([...get().campaigns, campaign]);
    persist(updated);
    set({ campaigns: updated, error: null });
    return campaign;
  },

  updateCampaign: (id, input) => {
    const { campaigns } = get();
    const index = campaigns.findIndex(c => c.id === id);
    if (index === -1) return null;

    const existing = campaigns[index];
    const updatedCampaign: Campaign = {
      ...existing,
      nombre: input.nombre !== undefined ? input.nombre.trim() : existing.nombre,
      descripcion: input.descripcion !== undefined ? input.descripcion?.trim() || undefined : existing.descripcion,
      imagen: input.imagen !== undefined ? input.imagen : existing.imagen,
      actualizadoEn: new Date().toISOString(),
    };

    const updatedList = [...campaigns];
    updatedList[index] = updatedCampaign;
    const sorted = sortByLastAccess(updatedList);
    persist(sorted);
    set({ campaigns: sorted, error: null });
    return updatedCampaign;
  },

  deleteCampaign: (id) => {
    const { campaigns, activeCampaignId } = get();
    const filtered = campaigns.filter(c => c.id !== id);
    persist(filtered);
    set({
      campaigns: filtered,
      activeCampaignId: activeCampaignId === id ? null : activeCampaignId,
      error: null,
    });
  },

  getCampaignById: (id) => get().campaigns.find(c => c.id === id),

  setActiveCampaign: (id) => set({ activeCampaignId: id }),

  linkCharacter: (campaignId, characterId) => {
    const { campaigns } = get();
    const index = campaigns.findIndex(c => c.id === campaignId);
    if (index === -1) return;

    const updatedList = [...campaigns];
    updatedList[index] = { ...updatedList[index], personajeId: characterId, actualizadoEn: new Date().toISOString() };
    const sorted = sortByLastAccess(updatedList);
    persist(sorted);
    set({ campaigns: sorted, error: null });
  },

  unlinkCharacter: (campaignId) => {
    const { campaigns } = get();
    const index = campaigns.findIndex(c => c.id === campaignId);
    if (index === -1) return;

    const updatedList = [...campaigns];
    updatedList[index] = { ...updatedList[index], personajeId: undefined, actualizadoEn: new Date().toISOString() };
    const sorted = sortByLastAccess(updatedList);
    persist(sorted);
    set({ campaigns: sorted, error: null });
  },

  clearError: () => set({ error: null }),
}));
