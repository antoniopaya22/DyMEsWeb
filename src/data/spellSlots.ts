// =============================================================================
// spellSlots.ts — Tablas de espacios de conjuro y trucos/conjuros conocidos
// Portado desde DyMEsApp/src/constants/spells.ts
// =============================================================================

// ─── Espacios de conjuro: Lanzador Completo ──────────────────────────
// Bardo, Clérigo, Druida, Hechicero, Mago
// Cada entrada es un array donde el índice 0 = nv. 1, índice 1 = nv. 2, etc.
export const FULL_CASTER_SLOTS: Record<number, number[]> = {
  1: [2],
  2: [3],
  3: [4, 2],
  4: [4, 3],
  5: [4, 3, 2],
  6: [4, 3, 3],
  7: [4, 3, 3, 1],
  8: [4, 3, 3, 2],
  9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2],
  11: [4, 3, 3, 3, 2, 1],
  12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1],
  14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1],
  16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
};

// ─── Espacios de conjuro: Medio Lanzador ─────────────────────────────
// Explorador, Paladín (sin espacios a nv. 1)
export const HALF_CASTER_SLOTS: Record<number, number[]> = {
  2: [2],
  3: [3],
  4: [3],
  5: [4, 2],
  6: [4, 2],
  7: [4, 3],
  8: [4, 3],
  9: [4, 3, 2],
  10: [4, 3, 2],
  11: [4, 3, 3],
  12: [4, 3, 3],
  13: [4, 3, 3, 1],
  14: [4, 3, 3, 1],
  15: [4, 3, 3, 2],
  16: [4, 3, 3, 2],
  17: [4, 3, 3, 3, 1],
  18: [4, 3, 3, 3, 1],
  19: [4, 3, 3, 3, 2],
  20: [4, 3, 3, 3, 2],
};

// ─── Espacios de conjuro: Magia de Pacto (Brujo) ────────────────────
// [número de espacios, nivel del espacio]
export const WARLOCK_PACT_SLOTS: Record<number, [number, number]> = {
  1: [1, 1],
  2: [2, 1],
  3: [2, 2],
  4: [2, 2],
  5: [2, 3],
  6: [2, 3],
  7: [2, 4],
  8: [2, 4],
  9: [2, 5],
  10: [2, 5],
  11: [3, 5],
  12: [3, 5],
  13: [3, 5],
  14: [3, 5],
  15: [3, 5],
  16: [3, 5],
  17: [4, 5],
  18: [4, 5],
  19: [4, 5],
  20: [4, 5],
};

// ─── Trucos conocidos por clase ──────────────────────────────────────
export const CANTRIPS_KNOWN: Record<string, Record<number, number>> = {
  bardo: {
    1: 2, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 4,
    11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4,
  },
  brujo: {
    1: 2, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 4,
    11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4,
  },
  clerigo: {
    1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 5,
    11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5,
  },
  druida: {
    1: 2, 2: 2, 3: 2, 4: 3, 5: 3, 6: 3, 7: 3, 8: 3, 9: 3, 10: 4,
    11: 4, 12: 4, 13: 4, 14: 4, 15: 4, 16: 4, 17: 4, 18: 4, 19: 4, 20: 4,
  },
  hechicero: {
    1: 4, 2: 4, 3: 4, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5, 9: 5, 10: 6,
    11: 6, 12: 6, 13: 6, 14: 6, 15: 6, 16: 6, 17: 6, 18: 6, 19: 6, 20: 6,
  },
  mago: {
    1: 3, 2: 3, 3: 3, 4: 4, 5: 4, 6: 4, 7: 4, 8: 4, 9: 4, 10: 5,
    11: 5, 12: 5, 13: 5, 14: 5, 15: 5, 16: 5, 17: 5, 18: 5, 19: 5, 20: 5,
  },
};

// ─── Conjuros conocidos por clase ────────────────────────────────────
// Solo clases que "conocen" conjuros (no las que preparan)
export const SPELLS_KNOWN: Record<string, Record<number, number>> = {
  bardo: {
    1: 4, 2: 5, 3: 6, 4: 7, 5: 8, 6: 9, 7: 10, 8: 11, 9: 12, 10: 14,
    11: 15, 12: 15, 13: 16, 14: 18, 15: 19, 16: 19, 17: 20, 18: 22, 19: 22, 20: 22,
  },
  brujo: {
    1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 10,
    11: 11, 12: 11, 13: 12, 14: 12, 15: 13, 16: 13, 17: 14, 18: 14, 19: 15, 20: 15,
  },
  explorador: {
    1: 2, 2: 3, 3: 5, 4: 6, 5: 7, 6: 7, 7: 8, 8: 8, 9: 10, 10: 10,
    11: 11, 12: 11, 13: 12, 14: 12, 15: 13, 16: 13, 17: 14, 18: 14, 19: 15, 20: 15,
  },
  hechicero: {
    1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: 10, 10: 11,
    11: 12, 12: 12, 13: 13, 14: 13, 15: 14, 16: 14, 17: 15, 18: 15, 19: 15, 20: 15,
  },
};

// ─── Tipo de lanzador por clase ──────────────────────────────────────
export type CasterType = 'full' | 'half' | 'pact' | 'none';

export const CLASS_CASTER_TYPE: Record<string, CasterType> = {
  barbaro: 'none',
  bardo: 'full',
  brujo: 'pact',
  clerigo: 'full',
  druida: 'full',
  explorador: 'half',
  guerrero: 'none',
  hechicero: 'full',
  mago: 'full',
  monje: 'none',
  paladin: 'half',
  picaro: 'none',
};

// ─── Utilidad para obtener espacios de conjuro de una clase a un nivel ──
export function getSpellSlotsForClass(classId: string, level: number): number[] | null {
  const casterType = CLASS_CASTER_TYPE[classId];
  if (casterType === 'none') return null;
  if (casterType === 'pact') {
    const pact = WARLOCK_PACT_SLOTS[level];
    return pact ? [pact[0]] : null; // Simplified for display
  }
  if (casterType === 'full') return FULL_CASTER_SLOTS[level] || null;
  if (casterType === 'half') return HALF_CASTER_SLOTS[level] || null;
  return null;
}
