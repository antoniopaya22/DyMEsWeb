import { useState, type FormEvent } from 'react';
import type { ClassId, RaceId, AbilityKey, Character, CharacterSummary } from '../../types/character';
import { CLASS_NAMES, CLASS_ICONS, RACE_NAMES, ABILITY_NAMES } from '../../constants/character';
import { calcModifier, calcProficiencyBonus } from '../../utils/character';
import { useCharacterListStore } from '../../stores/characterListStore';
import { setItem, STORAGE_KEYS } from '../../utils/storage';

type Step = 'name' | 'race' | 'class' | 'abilities' | 'summary';

const STEPS: { key: Step; label: string; icon: string }[] = [
  { key: 'name', label: 'Nombre', icon: '✏️' },
  { key: 'race', label: 'Raza', icon: '🧝' },
  { key: 'class', label: 'Clase', icon: '⚔️' },
  { key: 'abilities', label: 'Características', icon: '🎯' },
  { key: 'summary', label: 'Resumen', icon: '📋' },
];

const RACES: RaceId[] = ['humano', 'elfo', 'enano', 'mediano', 'draconido', 'gnomo', 'semielfo', 'semiorco', 'tiefling'];
const CLASSES: ClassId[] = ['barbaro', 'bardo', 'brujo', 'clerigo', 'druida', 'explorador', 'guerrero', 'hechicero', 'mago', 'monje', 'paladin', 'picaro'];
const STANDARD_ARRAY = [15, 14, 13, 12, 10, 8];

export default function CharacterCreation() {
  const [currentStep, setCurrentStep] = useState<Step>('name');
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState<RaceId | ''>('');
  const [clase, setClase] = useState<ClassId | ''>('');
  const [abilities, setAbilities] = useState<Record<AbilityKey, number>>({
    fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10,
  });
  const [creating, setCreating] = useState(false);

  const addCharacter = useCharacterListStore(s => s.addCharacter);
  const stepIndex = STEPS.findIndex(s => s.key === currentStep);

  function goNext() {
    if (stepIndex < STEPS.length - 1) {
      setCurrentStep(STEPS[stepIndex + 1].key);
    }
  }

  function goBack() {
    if (stepIndex > 0) {
      setCurrentStep(STEPS[stepIndex - 1].key);
    }
  }

  function canProceed(): boolean {
    switch (currentStep) {
      case 'name': return nombre.trim().length >= 2;
      case 'race': return !!raza;
      case 'class': return !!clase;
      case 'abilities': return true;
      case 'summary': return true;
    }
  }

  async function handleCreate() {
    if (!nombre || !raza || !clase) return;
    setCreating(true);

    const id = crypto.randomUUID();
    const now = new Date().toISOString();

    const character: Character = {
      id,
      nombre: nombre.trim(),
      raza,
      subraza: null,
      clase,
      subclase: null,
      nivel: 1,
      experiencia: 0,
      trasfondo: 'acolito',
      abilityScores: Object.fromEntries(
        (['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => [key, {
          base: abilities[key],
          racial: 0,
          improvement: 0,
          misc: 0,
          override: null,
          total: abilities[key],
          modifier: calcModifier(abilities[key]),
        }])
      ) as any,
      skillProficiencies: Object.fromEntries(
        ['acrobacias', 'atletismo', 'engano', 'historia', 'interpretacion', 'intimidacion',
         'investigacion', 'juego_de_manos', 'medicina', 'naturaleza', 'percepcion',
         'perspicacia', 'persuasion', 'religion', 'sigilo', 'supervivencia',
         'trato_con_animales', 'arcanos'].map(key => [key, { level: 'none' }])
      ) as any,
      savingThrows: Object.fromEntries(
        (['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => [key, { proficient: false }])
      ) as any,
      hp: { max: abilities.con + calcModifier(abilities.con), current: abilities.con + calcModifier(abilities.con), temp: 0 },
      hitDice: { die: 'd8', total: 1, remaining: 1 },
      deathSaves: { successes: 0, failures: 0 },
      speed: { walk: 30 },
      damageModifiers: [],
      conditions: [],
      concentration: null,
      proficiencies: { armors: [], weapons: [], tools: [], languages: ['Común'] },
      proficiencyBonus: 2,
      traits: [],
      personality: { traits: [], ideals: '', bonds: '', flaws: '' },
      appearance: {},
      levelHistory: [{ level: 1, date: now, hpGained: 0, hpMethod: 'fixed' }],
      knownSpellIds: [],
      preparedSpellIds: [],
      spellbookIds: [],
      inventoryId: crypto.randomUUID(),
      creadoEn: now,
      actualizadoEn: now,
    };

    // Save character data
    setItem(STORAGE_KEYS.CHARACTER(id), character);

    // Add to list
    const summary: CharacterSummary = {
      id,
      nombre: nombre.trim(),
      clase,
      raza,
      subraza: null,
      nivel: 1,
      actualizadoEn: now,
    };
    addCharacter(summary);

    // Redirect
    window.location.href = `/app/characters/view?id=${id}`;
  }

  return (
    <div className="animate-fade-in relative">
      {/* Atmospheric glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
      <div className="absolute top-80 -left-20 w-60 h-60 rounded-full opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }} />

      {/* Back */}
      <a href="/app" className="inline-flex items-center gap-2 text-sm text-[#AAA37B] hover:text-white transition-colors mb-8 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Volver
      </a>

      <h1 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">Crear Personaje</h1>
      <p className="text-sm text-[#AAA37B] mb-10 font-light">Completa los pasos para dar vida a tu nuevo héroe</p>

      {/* Step indicator */}
      <div className="flex items-center gap-1.5 mb-10 overflow-x-auto pb-2">
        {STEPS.map((step, i) => {
          const isActive = step.key === currentStep;
          const isCompleted = i < stepIndex;
          return (
            <div key={step.key} className="flex items-center gap-1.5">
              <button
                onClick={() => i <= stepIndex ? setCurrentStep(step.key) : null}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'text-white shadow-lg'
                    : isCompleted
                    ? 'text-[#22c55e] cursor-pointer hover:bg-white/[.03]'
                    : 'text-[#807953] cursor-default'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
                  border: '1px solid rgba(143,61,56,0.35)',
                  boxShadow: '0 4px 20px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                } : isCompleted ? {
                  border: '1px solid rgba(34,197,94,0.15)',
                } : {
                  border: '1px solid transparent',
                }}
              >
                {isCompleted ? (
                  <span className="w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center text-xs">✓</span>
                ) : (
                  <span>{step.icon}</span>
                )}
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px transition-colors duration-500" style={{
                  background: isCompleted
                    ? 'linear-gradient(90deg, rgba(34,197,94,0.4), rgba(34,197,94,0.15))'
                    : 'rgba(81,77,53,0.3)',
                }} />
              )}
            </div>
          );
        })}
      </div>

      {/* Step content */}
      <div className="dymes-section-card !p-6 lg:!p-8 mb-8" key={currentStep}>
        {currentStep === 'name' && (
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))',
              border: '1px solid rgba(143,61,56,0.2)',
            }}>
              <span className="text-3xl">✏️</span>
            </div>
            <h2 className="text-xl font-display font-semibold text-[#CDC9B2] mb-2">¿Cómo se llama tu personaje?</h2>
            <p className="text-sm text-[#807953] mb-6">Elige un nombre memorable para tu héroe</p>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Thorin Escudo de Roble"
              className="dymes-input text-lg text-center"
              autoFocus
            />
            <p className="text-xs text-[#807953] mt-3">Al menos 2 caracteres</p>
          </div>
        )}

        {currentStep === 'race' && (
          <div>
            <h2 className="text-xl font-display font-semibold text-[#CDC9B2] mb-2">Elige tu Raza</h2>
            <p className="text-sm text-[#807953] mb-6">Tu raza define rasgos innatos y herencia cultural</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RACES.map(r => {
                const selected = raza === r;
                return (
                  <button
                    key={r}
                    onClick={() => setRaza(r)}
                    className="p-4 rounded-2xl border text-left transition-all duration-300"
                    style={{
                      background: selected
                        ? 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      borderColor: selected ? 'rgba(143,61,56,0.45)' : 'rgba(255,255,255,0.06)',
                      boxShadow: selected ? '0 4px 24px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.02)',
                      transform: selected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div className="text-base font-semibold text-white">{RACE_NAMES[r]}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 'class' && (
          <div>
            <h2 className="text-xl font-display font-semibold text-[#CDC9B2] mb-2">Elige tu Clase</h2>
            <p className="text-sm text-[#807953] mb-6">Tu clase define tus habilidades y estilo de juego</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CLASSES.map(c => {
                const selected = clase === c;
                return (
                  <button
                    key={c}
                    onClick={() => setClase(c)}
                    className="p-4 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3"
                    style={{
                      background: selected
                        ? 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))'
                        : 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      borderColor: selected ? 'rgba(143,61,56,0.45)' : 'rgba(255,255,255,0.06)',
                      boxShadow: selected ? '0 4px 24px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)' : 'inset 0 1px 0 rgba(255,255,255,0.02)',
                      transform: selected ? 'translateY(-2px)' : 'none',
                    }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0" style={{
                      background: selected ? 'rgba(143,61,56,0.15)' : 'rgba(255,255,255,0.04)',
                      border: `1px solid ${selected ? 'rgba(143,61,56,0.3)' : 'rgba(255,255,255,0.06)'}`,
                    }}>
                      {CLASS_ICONS[c]}
                    </div>
                    <div className="text-base font-semibold text-white">{CLASS_NAMES[c]}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === 'abilities' && (
          <div>
            <h2 className="text-xl font-display font-semibold text-[#CDC9B2] mb-2">Puntuaciones de Característica</h2>
            <p className="text-sm text-[#807953] mb-6">Asigna valores a cada característica (3-20)</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => {
                const mod = calcModifier(abilities[key]);
                return (
                  <div key={key} className="p-5 rounded-2xl text-center transition-all duration-300" style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                    border: '1px solid rgba(255,255,255,0.06)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}>
                    <div className="text-[10px] text-[#807953] uppercase tracking-widest mb-3 font-medium">{ABILITY_NAMES[key]}</div>
                    <div className="flex items-center justify-center gap-3">
                      <button
                        onClick={() => setAbilities(prev => ({ ...prev, [key]: Math.max(3, prev[key] - 1) }))}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                      >−</button>
                      <span className="text-3xl font-bold text-white w-12 text-center">{abilities[key]}</span>
                      <button
                        onClick={() => setAbilities(prev => ({ ...prev, [key]: Math.min(20, prev[key] + 1) }))}
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
                          border: '1px solid rgba(255,255,255,0.1)',
                          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
                        }}
                      >+</button>
                    </div>
                    <div className="text-sm font-bold mt-2" style={{ color: mod >= 0 ? '#22c55e' : '#ef4444' }}>
                      {mod >= 0 ? '+' : ''}{mod}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="dymes-divider my-6" />
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  const shuffled = [...STANDARD_ARRAY].sort(() => Math.random() - 0.5);
                  const keys: AbilityKey[] = ['fue', 'des', 'con', 'int', 'sab', 'car'];
                  setAbilities(Object.fromEntries(keys.map((k, i) => [k, shuffled[i]])) as Record<AbilityKey, number>);
                }}
                className="btn-ghost text-xs !px-5 !py-2.5 rounded-xl"
              >
                🎲 Array Estándar (aleatorio)
              </button>
              <button
                onClick={() => setAbilities({ fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 })}
                className="btn-ghost text-xs !px-5 !py-2.5 rounded-xl"
              >
                ↩️ Reiniciar
              </button>
            </div>
          </div>
        )}

        {currentStep === 'summary' && (
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <div className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-4xl" style={{
                background: 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))',
                border: '1px solid rgba(143,61,56,0.25)',
                boxShadow: '0 8px 32px rgba(143,61,56,0.1)',
              }}>
                {CLASS_ICONS[clase as ClassId] ?? '⚔️'}
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-1">{nombre || 'Sin nombre'}</h2>
              <p className="text-sm text-[#AAA37B]">{RACE_NAMES[raza as string] ?? '—'} — {CLASS_NAMES[clase as ClassId] ?? '—'} · Nivel 1</p>
            </div>
            <div className="dymes-divider mb-6" />
            <div className="space-y-3">
              <SummaryRow label="Nombre" value={nombre} icon="✏️" />
              <SummaryRow label="Raza" value={RACE_NAMES[raza as string] ?? '—'} icon="🧝" />
              <SummaryRow label="Clase" value={`${CLASS_ICONS[clase as ClassId] ?? ''} ${CLASS_NAMES[clase as ClassId] ?? '—'}`} icon="⚔️" />
              <SummaryRow label="Nivel" value="1" icon="📊" />
            </div>
            <div className="dymes-divider my-6" />
            <div>
              <div className="text-[10px] text-[#807953] uppercase tracking-widest mb-3 font-medium text-center">Características</div>
              <div className="grid grid-cols-3 gap-2.5">
                {(['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => {
                  const mod = calcModifier(abilities[key]);
                  return (
                    <div key={key} className="text-center p-3 rounded-xl" style={{
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                      <div className="text-[9px] text-[#807953] uppercase tracking-wider">{ABILITY_NAMES[key].slice(0, 3)}</div>
                      <div className="text-lg font-bold text-white">{abilities[key]}</div>
                      <div className="text-xs font-semibold" style={{ color: mod >= 0 ? '#22c55e' : '#ef4444' }}>
                        {mod >= 0 ? '+' : ''}{mod}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className={`btn-ghost text-sm !px-6 !py-3 rounded-xl flex items-center gap-2 ${stepIndex === 0 ? 'invisible' : ''}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/></svg>
          Anterior
        </button>

        {currentStep === 'summary' ? (
          <button
            onClick={handleCreate}
            disabled={creating}
            className="btn-gold text-sm !px-8 !py-3.5 rounded-xl inline-flex items-center gap-2.5 disabled:opacity-50"
          >
            {creating ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <span>✨</span>
            )}
            Crear Personaje
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="btn-gold text-sm !px-6 !py-3 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Siguiente
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 5 7 7-7 7"/></svg>
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value, icon }: { label: string; value: string; icon?: string }) {
  return (
    <div className="flex items-center justify-between py-3 px-4 rounded-xl" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.05)',
    }}>
      <span className="text-sm text-[#AAA37B] flex items-center gap-2">
        {icon && <span className="text-xs">{icon}</span>}
        {label}
      </span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
