/**
 * Tipos para personajes de D&D 5e en español (Web version)
 */

// ─── Enums y tipos base ──────────────────────────────────────────────

export type AbilityKey = "fue" | "des" | "con" | "int" | "sab" | "car";

export type SkillKey =
  | "acrobacias" | "atletismo" | "engano" | "historia"
  | "interpretacion" | "intimidacion" | "investigacion"
  | "juego_de_manos" | "medicina" | "naturaleza"
  | "percepcion" | "perspicacia" | "persuasion"
  | "religion" | "sigilo" | "supervivencia"
  | "trato_con_animales" | "arcanos";

export interface SkillDefinition {
  nombre: string;
  habilidad: AbilityKey;
}

export type Alignment =
  | "legal_bueno" | "neutral_bueno" | "caotico_bueno"
  | "legal_neutral" | "neutral" | "caotico_neutral"
  | "legal_malvado" | "neutral_malvado" | "caotico_malvado";

export type Size = "diminuto" | "pequeno" | "mediano" | "grande";
export type HitDie = "d6" | "d8" | "d10" | "d12";
export type ProficiencyLevel = "none" | "proficient" | "expertise";
export type AbilityScoreMethod = "standard_array" | "point_buy" | "dice_roll" | "manual";

export type DamageType =
  | "acido" | "contundente" | "cortante" | "frio" | "fuego"
  | "fuerza" | "necrotico" | "perforante" | "psiquico"
  | "radiante" | "relampago" | "trueno" | "veneno";

export type Condition =
  | "agarrado" | "asustado" | "aturdido" | "cegado"
  | "derribado" | "encantado" | "ensordecido" | "envenenado"
  | "hechizado" | "incapacitado" | "inconsciente" | "invisible"
  | "paralizado" | "petrificado" | "restringido";

export type RaceId =
  | "enano" | "elfo" | "mediano" | "humano" | "draconido"
  | "gnomo" | "semielfo" | "semiorco" | "tiefling"
  | "hada" | "liebren" | "personalizada";

export type SubraceId =
  | "enano_colinas" | "enano_montanas" | "alto_elfo" | "elfo_bosque"
  | "elfo_oscuro" | "mediano_piesligeros" | "mediano_fornido"
  | "gnomo_bosque" | "gnomo_rocas" | null;

export type ClassId =
  | "barbaro" | "bardo" | "brujo" | "clerigo" | "druida"
  | "explorador" | "guerrero" | "hechicero" | "mago"
  | "monje" | "paladin" | "picaro";

export type SubclassId = string;

export type BackgroundId =
  | "acolito" | "charlatan" | "criminal" | "artista"
  | "heroe_del_pueblo" | "artesano_gremial" | "ermitano"
  | "noble" | "forastero" | "sabio" | "marinero" | "soldado"
  | "huerfano" | "peon_brujaluz" | "extraviado_feerico" | "personalizada";

// ─── Puntuaciones de característica ──────────────────────────────────

export interface AbilityScores {
  fue: number; des: number; con: number; int: number; sab: number; car: number;
}

export interface AbilityScoreDetail {
  base: number; racial: number; improvement: number; misc: number;
  override: number | null; total: number; modifier: number;
}

export type AbilityScoresDetailed = Record<AbilityKey, AbilityScoreDetail>;

// ─── Habilidades ─────────────────────────────────────────────────────

export interface SkillProficiency {
  level: ProficiencyLevel;
  source?: string;
}

export type SkillProficiencies = Record<SkillKey, SkillProficiency>;

export interface SavingThrowProficiency {
  proficient: boolean;
  source?: string;
}

export type SavingThrowProficiencies = Record<AbilityKey, SavingThrowProficiency>;

// ─── Combate ─────────────────────────────────────────────────────────

export interface HitPoints { max: number; current: number; temp: number; }
export interface HitDicePool { die: HitDie; total: number; remaining: number; }
export interface DeathSaves { successes: number; failures: number; }

export interface ArmorClassDetail {
  total: number; base: number; dexBonus: number;
  shieldBonus: number; miscBonus: number; breakdown: string;
}

export interface SpeedInfo {
  walk: number; swim?: number; climb?: number; fly?: number;
}

export interface DamageModifier {
  type: DamageType;
  modifier: "resistance" | "immunity" | "vulnerability";
  source: string;
}

export interface ActiveCondition { condition: Condition; note?: string; }

// ─── Otros ───────────────────────────────────────────────────────────

export interface Proficiencies {
  armors: string[]; weapons: string[]; tools: string[]; languages: string[];
}

export interface Trait {
  id: string; nombre: string; descripcion: string;
  origen: "raza" | "clase" | "subclase" | "trasfondo" | "dote" | "manual";
  maxUses: number | null; currentUses: number | null;
  recharge: "short_rest" | "long_rest" | "dawn" | null;
}

export interface Personality {
  traits: string[]; ideals: string; bonds: string; flaws: string; backstory?: string;
}

export interface Appearance {
  age?: string; height?: string; weight?: string;
  eyeColor?: string; hairColor?: string; skinColor?: string;
  description?: string; avatarUri?: string;
}

export interface LevelUpRecord {
  level: number; date: string; hpGained: number;
  hpMethod: "roll" | "fixed";
  abilityImprovements?: Partial<AbilityScores>;
  subclassChosen?: SubclassId;
  subclassFeatureChoices?: { choiceId: string; selectedOptionIds: string[] }[];
  spellsLearned?: string[];
  spellsSwapped?: [string, string][];
  traitsGained?: string[];
}

export interface ConcentrationState { spellId: string; spellName: string; startedAt: string; }

// ─── Personaje completo ──────────────────────────────────────────────

export interface Character {
  id: string;
  campaignId?: string;
  nombre: string;
  raza: RaceId;
  subraza: SubraceId;
  customRaceName?: string;
  clase: ClassId;
  customBackgroundName?: string;
  subclase: SubclassId | null;
  nivel: number;
  experiencia: number;
  trasfondo: BackgroundId;
  alineamiento?: Alignment;
  abilityScores: AbilityScoresDetailed;
  skillProficiencies: SkillProficiencies;
  savingThrows: SavingThrowProficiencies;
  hp: HitPoints;
  hitDice: HitDicePool;
  deathSaves: DeathSaves;
  speed: SpeedInfo;
  damageModifiers: DamageModifier[];
  conditions: ActiveCondition[];
  concentration: ConcentrationState | null;
  proficiencies: Proficiencies;
  proficiencyBonus: number;
  traits: Trait[];
  personality: Personality;
  appearance: Appearance;
  levelHistory: LevelUpRecord[];
  knownSpellIds: string[];
  preparedSpellIds: string[];
  spellbookIds: string[];
  inventoryId: string;
  creadoEn: string;
  actualizadoEn: string;
}

// ─── Character summary (for lists) ──────────────────────────────────

export interface CharacterSummary {
  id: string;
  nombre: string;
  clase: ClassId;
  raza: RaceId;
  subraza: SubraceId;
  nivel: number;
  actualizadoEn: string;
  avatarUri?: string;
}
