import type { HitDie } from '../types/character';

export function calcModifier(score: number): number {
  return Math.floor((score - 10) / 2);
}

export function calcProficiencyBonus(level: number): number {
  return Math.floor((level - 1) / 4) + 2;
}

export function hitDieValue(die: HitDie): number {
  const values: Record<HitDie, number> = { d6: 6, d8: 8, d10: 10, d12: 12 };
  return values[die];
}

export function hitDieFixedValue(die: HitDie): number {
  return hitDieValue(die) / 2 + 1;
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}
