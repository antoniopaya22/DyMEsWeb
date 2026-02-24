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
    <div className="animate-fade-in">
      {/* Back */}
      <a href="/app" className="inline-flex items-center gap-2 text-sm text-[#AAA37B] hover:text-white transition-colors mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Volver
      </a>

      <h1 className="text-2xl font-display font-bold text-white mb-2">Crear Personaje</h1>
      <p className="text-sm text-[#AAA37B] mb-8">Completa los pasos para crear tu nuevo personaje</p>

      {/* Step indicator */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {STEPS.map((step, i) => (
          <div key={step.key} className="flex items-center gap-2">
            <button
              onClick={() => i <= stepIndex ? setCurrentStep(step.key) : null}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                step.key === currentStep
                  ? 'text-white'
                  : i < stepIndex
                  ? 'text-[#22c55e] cursor-pointer'
                  : 'text-[#807953] cursor-default'
              }`}
              style={step.key === currentStep ? {
                background: 'rgba(143,61,56,0.12)',
                border: '1px solid rgba(143,61,56,0.3)',
              } : {}}
            >
              <span>{i < stepIndex ? '✓' : step.icon}</span>
              <span className="hidden sm:inline">{step.label}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`w-6 h-px ${i < stepIndex ? 'bg-[#22c55e]' : 'bg-[#514D35]'}`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step content */}
      <div className="rounded-xl border p-6 lg:p-8 mb-6" style={{ background: '#323021', borderColor: '#514D35' }}>
        {currentStep === 'name' && (
          <div className="max-w-md">
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-4">Nombre del Personaje</h2>
            <input
              type="text"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
              placeholder="Ej: Thorin Escudo de Roble"
              className="dymes-input text-lg"
              autoFocus
            />
            <p className="text-xs text-[#807953] mt-2">Al menos 2 caracteres</p>
          </div>
        )}

        {currentStep === 'race' && (
          <div>
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-4">Elige tu Raza</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {RACES.map(r => (
                <button
                  key={r}
                  onClick={() => setRaza(r)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                    raza === r ? 'border-[rgba(143,61,56,0.5)] shadow-[0_0_20px_rgba(143,61,56,0.15)]' : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(178,172,136,0.3)]'
                  }`}
                  style={{
                    background: raza === r ? 'rgba(143,61,56,0.1)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <div className="text-base font-semibold text-white">{RACE_NAMES[r]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'class' && (
          <div>
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-4">Elige tu Clase</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {CLASSES.map(c => (
                <button
                  key={c}
                  onClick={() => setClase(c)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex items-center gap-3 ${
                    clase === c ? 'border-[rgba(143,61,56,0.5)] shadow-[0_0_20px_rgba(143,61,56,0.15)]' : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(178,172,136,0.3)]'
                  }`}
                  style={{
                    background: clase === c ? 'rgba(143,61,56,0.1)' : 'rgba(255,255,255,0.03)',
                  }}
                >
                  <span className="text-2xl">{CLASS_ICONS[c]}</span>
                  <div className="text-base font-semibold text-white">{CLASS_NAMES[c]}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === 'abilities' && (
          <div>
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-2">Puntuaciones de Característica</h2>
            <p className="text-sm text-[#AAA37B] mb-6">Asigna valores a cada característica (8-20)</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => (
                <div key={key} className="p-4 rounded-xl text-center" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <div className="text-sm text-[#AAA37B] mb-2">{ABILITY_NAMES[key]}</div>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => setAbilities(prev => ({ ...prev, [key]: Math.max(3, prev[key] - 1) }))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >−</button>
                    <span className="text-2xl font-bold text-white w-10 text-center">{abilities[key]}</span>
                    <button
                      onClick={() => setAbilities(prev => ({ ...prev, [key]: Math.min(20, prev[key] + 1) }))}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >+</button>
                  </div>
                  <div className="text-sm font-semibold mt-1" style={{ color: calcModifier(abilities[key]) >= 0 ? '#22c55e' : '#ef4444' }}>
                    {calcModifier(abilities[key]) >= 0 ? '+' : ''}{calcModifier(abilities[key])}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => {
                  const shuffled = [...STANDARD_ARRAY].sort(() => Math.random() - 0.5);
                  const keys: AbilityKey[] = ['fue', 'des', 'con', 'int', 'sab', 'car'];
                  setAbilities(Object.fromEntries(keys.map((k, i) => [k, shuffled[i]])) as Record<AbilityKey, number>);
                }}
                className="btn-ghost text-xs !px-4 !py-2 rounded-lg"
              >
                Array Estándar (aleatorio)
              </button>
              <button
                onClick={() => setAbilities({ fue: 10, des: 10, con: 10, int: 10, sab: 10, car: 10 })}
                className="btn-ghost text-xs !px-4 !py-2 rounded-lg"
              >
                Reiniciar
              </button>
            </div>
          </div>
        )}

        {currentStep === 'summary' && (
          <div className="max-w-md">
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-6">Resumen</h2>
            <div className="space-y-4">
              <SummaryRow label="Nombre" value={nombre} />
              <SummaryRow label="Raza" value={RACE_NAMES[raza as string] ?? '—'} />
              <SummaryRow label="Clase" value={`${CLASS_ICONS[clase as ClassId] ?? ''} ${CLASS_NAMES[clase as ClassId] ?? '—'}`} />
              <SummaryRow label="Nivel" value="1" />
              <div className="border-t border-[#514D35] pt-4">
                <div className="text-[10px] text-[#807953] uppercase tracking-wider mb-2">Características</div>
                <div className="grid grid-cols-3 gap-2">
                  {(['fue', 'des', 'con', 'int', 'sab', 'car'] as AbilityKey[]).map(key => (
                    <div key={key} className="text-center text-sm">
                      <span className="text-[#807953]">{ABILITY_NAMES[key].slice(0, 3)}: </span>
                      <span className="text-white font-semibold">{abilities[key]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className={`btn-ghost text-sm !px-5 !py-2.5 rounded-lg ${stepIndex === 0 ? 'invisible' : ''}`}
        >
          ← Anterior
        </button>

        {currentStep === 'summary' ? (
          <button
            onClick={handleCreate}
            disabled={creating}
            className="btn-gold text-sm !px-6 !py-2.5 rounded-lg inline-flex items-center gap-2 disabled:opacity-50"
          >
            {creating ? (
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : null}
            Crear Personaje
          </button>
        ) : (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className="btn-gold text-sm !px-5 !py-2.5 rounded-lg disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Siguiente →
          </button>
        )}
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-[#AAA37B]">{label}</span>
      <span className="text-sm font-semibold text-white">{value}</span>
    </div>
  );
}
