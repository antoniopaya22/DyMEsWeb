// =============================================================================
// leveling.ts — Datos de progresion por nivel para D&D 5e SRD
// =============================================================================

// -----------------------------------------------------------------------------
// Experiencia necesaria para alcanzar cada nivel (1-20)
// -----------------------------------------------------------------------------
export const XP_THRESHOLDS: Record<number, number> = {
  1: 0,
  2: 300,
  3: 900,
  4: 2700,
  5: 6500,
  6: 14000,
  7: 23000,
  8: 34000,
  9: 48000,
  10: 64000,
  11: 85000,
  12: 100000,
  13: 120000,
  14: 140000,
  15: 165000,
  16: 195000,
  17: 225000,
  18: 265000,
  19: 305000,
  20: 355000,
};

// -----------------------------------------------------------------------------
// Bonificador de competencia por nivel
// -----------------------------------------------------------------------------
export const PROFICIENCY_BONUS: Record<number, number> = {
  1: 2,
  2: 2,
  3: 2,
  4: 2,
  5: 3,
  6: 3,
  7: 3,
  8: 3,
  9: 4,
  10: 4,
  11: 4,
  12: 4,
  13: 5,
  14: 5,
  15: 5,
  16: 5,
  17: 6,
  18: 6,
  19: 6,
  20: 6,
};

// -----------------------------------------------------------------------------
// Niveles en los que cada clase obtiene Mejora de Puntuacion de Caracteristica
// (Ability Score Improvement). El guerrero y el picaro tienen niveles extra.
// -----------------------------------------------------------------------------
export const ASI_LEVELS: Record<string, number[]> = {
  barbaro: [4, 8, 12, 16, 19],
  bardo: [4, 8, 12, 16, 19],
  brujo: [4, 8, 12, 16, 19],
  clerigo: [4, 8, 12, 16, 19],
  druida: [4, 8, 12, 16, 19],
  explorador: [4, 8, 12, 16, 19],
  guerrero: [4, 6, 8, 12, 14, 16, 19],
  hechicero: [4, 8, 12, 16, 19],
  mago: [4, 8, 12, 16, 19],
  monje: [4, 8, 12, 16, 19],
  paladin: [4, 8, 12, 16, 19],
  picaro: [4, 8, 10, 12, 16, 19],
};

// -----------------------------------------------------------------------------
// Progresion especifica de clase — columnas extra para la tabla de niveles.
// Solo las clases que tienen mecanicas unicas con valores que cambian por nivel.
// -----------------------------------------------------------------------------
export interface ClassProgressionExtra {
  /** Cabecera de la columna en la tabla de niveles */
  label: string;
  /** Valor a mostrar en cada nivel (1-20) */
  data: Record<number, string>;
}

export const CLASS_PROGRESSION_EXTRAS: Record<string, ClassProgressionExtra> = {
  // Barbaro: usos de Furia y bonificador de dano de Furia
  barbaro: {
    label: 'Furia',
    data: {
      1: '2 usos, +2',
      2: '2 usos, +2',
      3: '3 usos, +2',
      4: '3 usos, +2',
      5: '3 usos, +2',
      6: '4 usos, +2',
      7: '4 usos, +2',
      8: '4 usos, +2',
      9: '4 usos, +3',
      10: '4 usos, +3',
      11: '4 usos, +3',
      12: '5 usos, +3',
      13: '5 usos, +3',
      14: '5 usos, +3',
      15: '5 usos, +3',
      16: '5 usos, +4',
      17: '6 usos, +4',
      18: '6 usos, +4',
      19: '6 usos, +4',
      20: '\u221E, +4', // infinito
    },
  },

  // Monje: dado de Artes Marciales
  monje: {
    label: 'Artes Marciales',
    data: {
      1: '1d6',
      2: '1d6',
      3: '1d6',
      4: '1d6',
      5: '1d8',
      6: '1d8',
      7: '1d8',
      8: '1d8',
      9: '1d8',
      10: '1d8',
      11: '1d10',
      12: '1d10',
      13: '1d10',
      14: '1d10',
      15: '1d10',
      16: '1d10',
      17: '1d12',
      18: '1d12',
      19: '1d12',
      20: '1d12',
    },
  },

  // Picaro: dados de Ataque Furtivo
  picaro: {
    label: 'Ataque Furtivo',
    data: {
      1: '1d6',
      2: '1d6',
      3: '2d6',
      4: '2d6',
      5: '3d6',
      6: '3d6',
      7: '4d6',
      8: '4d6',
      9: '5d6',
      10: '5d6',
      11: '6d6',
      12: '6d6',
      13: '7d6',
      14: '7d6',
      15: '8d6',
      16: '8d6',
      17: '9d6',
      18: '9d6',
      19: '10d6',
      20: '10d6',
    },
  },

  // Brujo: numero de Invocaciones Misticas y nivel de espacio de conjuro
  brujo: {
    label: 'Invocaciones / Nv. Espacio',
    data: {
      1: '1 / nv1',
      2: '3 / nv1',
      3: '3 / nv2',
      4: '3 / nv2',
      5: '5 / nv3',
      6: '5 / nv3',
      7: '6 / nv4',
      8: '6 / nv4',
      9: '7 / nv5',
      10: '7 / nv5',
      11: '7 / nv5',
      12: '8 / nv5',
      13: '8 / nv5',
      14: '8 / nv5',
      15: '8 / nv5',
      16: '8 / nv5',
      17: '8 / nv5',
      18: '8 / nv5',
      19: '8 / nv5',
      20: '8 / nv5',
    },
  },

  // Bardo: dado de Inspiración Bárdica
  bardo: {
    label: 'Inspiración Bárdica',
    data: {
      1: 'd6', 2: 'd6', 3: 'd6', 4: 'd6',
      5: 'd8', 6: 'd8', 7: 'd8', 8: 'd8', 9: 'd8',
      10: 'd10', 11: 'd10', 12: 'd10', 13: 'd10', 14: 'd10',
      15: 'd12', 16: 'd12', 17: 'd12', 18: 'd12', 19: 'd12', 20: 'd12',
    },
  },

  // Hechicero: Puntos de Hechicería
  hechicero: {
    label: 'Puntos de Hechicería',
    data: {
      1: '—', 2: '2', 3: '3', 4: '4', 5: '5',
      6: '6', 7: '7', 8: '8', 9: '9', 10: '10',
      11: '11', 12: '12', 13: '13', 14: '14', 15: '15',
      16: '16', 17: '17', 18: '18', 19: '19', 20: '20',
    },
  },

  // Clérigo: VD de Destruir Muertos Vivientes
  clerigo: {
    label: 'Destruir Muertos (VD)',
    data: {
      1: '—', 2: '—', 3: '—', 4: '—',
      5: '½', 6: '½', 7: '½',
      8: '1', 9: '1', 10: '1',
      11: '2', 12: '2', 13: '2',
      14: '3', 15: '3', 16: '3',
      17: '4', 18: '4', 19: '4', 20: '4',
    },
  },

  // Druida: VD de Forma Salvaje
  druida: {
    label: 'Forma Salvaje (VD máx.)',
    data: {
      1: '—', 2: '¼', 3: '¼', 4: '½',
      5: '½', 6: '½', 7: '½', 8: '1',
      9: '1', 10: '1', 11: '1', 12: '1',
      13: '1', 14: '1', 15: '1', 16: '1',
      17: '1', 18: '1', 19: '1', 20: '1',
    },
  },

  // Guerrero: dado de Superioridad (Maestro de Batalla) y Ataques Extra
  guerrero: {
    label: 'Ataques Extra',
    data: {
      1: '1', 2: '1', 3: '1', 4: '1',
      5: '2', 6: '2', 7: '2', 8: '2', 9: '2', 10: '2',
      11: '3', 12: '3', 13: '3', 14: '3', 15: '3', 16: '3', 17: '3', 18: '3', 19: '3',
      20: '4',
    },
  },

  // Paladín: puntos de Imposición de Manos
  paladin: {
    label: 'Imp. de Manos (PG)',
    data: {
      1: '5', 2: '10', 3: '15', 4: '20', 5: '25',
      6: '30', 7: '35', 8: '40', 9: '45', 10: '50',
      11: '55', 12: '60', 13: '65', 14: '70', 15: '75',
      16: '80', 17: '85', 18: '90', 19: '95', 20: '100',
    },
  },

  // Explorador: conjuros conocidos
  explorador: {
    label: 'Conjuros Conocidos',
    data: {
      1: '—', 2: '2', 3: '3', 4: '3', 5: '4',
      6: '4', 7: '5', 8: '5', 9: '6', 10: '6',
      11: '7', 12: '7', 13: '8', 14: '8', 15: '9',
      16: '9', 17: '10', 18: '10', 19: '11', 20: '11',
    },
  },

  // Mago: rasgos especiales no tienen columna numérica cambiante;
  // pero las cantrips sí
  mago: {
    label: 'Trucos Conocidos',
    data: {
      1: '3', 2: '3', 3: '3', 4: '4', 5: '4',
      6: '4', 7: '4', 8: '4', 9: '4', 10: '5',
      11: '5', 12: '5', 13: '5', 14: '5', 15: '5',
      16: '5', 17: '5', 18: '5', 19: '5', 20: '5',
    },
  },
};
