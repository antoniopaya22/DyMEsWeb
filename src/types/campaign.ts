/**
 * Tipos para campañas (HU-01) — Web
 */

export interface Campaign {
  id: string;
  nombre: string;
  descripcion?: string;
  imagen?: string;
  personajeId?: string;
  creadoEn: string;
  actualizadoEn: string;
}

export interface CreateCampaignInput {
  nombre: string;
  descripcion?: string;
  imagen?: string;
}

export interface UpdateCampaignInput {
  nombre?: string;
  descripcion?: string;
  imagen?: string;
}
