import { useEffect, useState } from 'react';
import type { Character } from '../../types/character';
import { CLASS_NAMES, CLASS_ICONS, RACE_NAMES, ABILITY_NAMES, ABILITY_ABBR, SKILLS } from '../../constants/character';
import { calcModifier, calcProficiencyBonus, formatModifier } from '../../utils/character';
import { getItem, STORAGE_KEYS } from '../../utils/storage';

type Tab = 'general' | 'combat' | 'abilities' | 'inventory' | 'notes';

const TabIcons: Record<Tab, React.ReactNode> = {
  general: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>,
  combat: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>,
  abilities: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>,
  inventory: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  notes: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838.838-2.872a2 2 0 0 1 .506-.855z"/></svg>,
};

const TABS: { key: Tab; label: string }[] = [
  { key: 'general', label: 'Información general' },
  { key: 'combat', label: 'Combate' },
  { key: 'abilities', label: 'Habilidades' },
  { key: 'inventory', label: 'Inventario' },
  { key: 'notes', label: 'Notas' },
];

export default function CharacterSheet({ characterId }: { characterId: string }) {
  const [character, setCharacter] = useState<Character | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>('general');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getItem<Character>(STORAGE_KEYS.CHARACTER(characterId));
    setCharacter(data);
    setLoading(false);
  }, [characterId]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-2 border-[var(--app-text-faint)] border-t-[#8f3d38] animate-spin" />
        </div>
        <p className="text-sm app-text-faint">Cargando personaje...</p>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-24 animate-fade-in relative">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-64 h-64 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
        </div>
        <div className="relative">
          <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, rgba(143,61,56,0.12), rgba(143,61,56,0.04))',
            border: '1px solid rgba(143,61,56,0.2)',
            boxShadow: '0 8px 32px rgba(143,61,56,0.1)',
          }}>
            <span className="text-4xl">🔍</span>
          </div>
          <h3 className="text-xl font-display font-semibold app-text mb-3">Personaje no encontrado</h3>
          <p className="text-sm app-text-muted mb-8">No se pudo cargar este personaje.</p>
          <a href="/app" className="btn-gold text-sm !px-8 !py-3.5 rounded-xl">Volver a personajes</a>
        </div>
      </div>
    );
  }

  const icon = CLASS_ICONS[character.clase] ?? '⚔️';
  const className = CLASS_NAMES[character.clase] ?? character.clase;
  const raceName = RACE_NAMES[character.raza] ?? character.raza;

  return (
    <div className="animate-fade-in relative">
      {/* Atmospheric glows */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
      <div className="absolute top-60 -left-20 w-60 h-60 rounded-full opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />

      {/* Back link */}
      <a href="/app" className="inline-flex items-center gap-2 text-sm app-text-muted hover:app-text transition-colors mb-8 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:-translate-x-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Mis Personajes
      </a>

      {/* Character header */}
      <div className="rounded-2xl border overflow-hidden mb-10" style={{
        background: 'linear-gradient(145deg, rgba(40,38,27,0.98), rgba(25,23,15,0.95))',
        borderColor: 'rgba(81,77,53,0.3)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}>
        <div className="relative h-36" style={{ background: 'linear-gradient(135deg, rgba(143,61,56,0.25), rgba(50,48,33,0.8), rgba(59,130,246,0.08))' }}>
          <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgba(25,23,15,0.95) 100%)' }} />
          {/* Decorative elements */}
          <div className="absolute top-4 right-6 w-20 h-20 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #8f3d38, transparent)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,61,56,0.4), rgba(178,172,136,0.2), transparent)' }} />
        </div>
        <div className="px-6 sm:px-8 pb-8 -mt-14 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-5">
            {/* Avatar */}
            <div className="w-28 h-28 rounded-2xl flex items-center justify-center text-5xl shrink-0 overflow-hidden" style={{
              background: 'linear-gradient(145deg, rgba(50,48,33,0.95), rgba(35,33,22,0.9))',
              border: '3px solid rgba(143,61,56,0.3)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(143,61,56,0.1)',
            }}>
              {character.appearance.avatarUri ? (
                <img src={character.appearance.avatarUri} alt="" className="w-full h-full rounded-2xl object-cover" />
              ) : <span className="drop-shadow-lg">{icon}</span>}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-white tracking-wide">{character.nombre}</h1>
              <p className="text-[#AAA37B] mt-1 text-sm font-light">
                {raceName} — {className} {character.subclase ? `(${character.subclase})` : ''}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3 flex-wrap">
              <QuickStat label="Nivel" value={character.nivel.toString()} color="#8f3d38" />
              <QuickStat label="CA" value={character.hp ? '—' : '—'} color="#3b82f6" />
              <QuickStat label="PG" value={`${character.hp.current}/${character.hp.max}`} color="#22c55e" />
              <QuickStat label="Bonus" value={formatModifier(character.proficiencyBonus)} color="#f59e0b" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile tab bar ── */}
      <div className="lg:hidden flex gap-2 mb-6 overflow-x-auto pb-2 -mx-1 px-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`dymes-tab whitespace-nowrap flex items-center gap-2 ${activeTab === tab.key ? 'active' : ''}`}
          >
            <span className="shrink-0">{TabIcons[tab.key]}</span>
            <span className="text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* ── Sidebar + Content layout ── */}
      <div className="flex gap-8">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="sticky top-6 space-y-1">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'app-text shadow-sm'
                    : 'app-text-muted hover:app-text dark:hover:bg-white/[0.04] hover:bg-black/[0.04]'
                }`}
                style={activeTab === tab.key ? {
                  background: 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.06))',
                  border: '1px solid rgba(143,61,56,0.2)',
                  boxShadow: '0 2px 8px rgba(143,61,56,0.1)',
                } : { border: '1px solid transparent' }}
              >
                <span className="shrink-0" style={activeTab === tab.key ? { color: '#8f3d38' } : {}}>{TabIcons[tab.key]}</span>
                {tab.label}
              </button>
            ))}

            {/* Divider */}
            <div className="!my-4 h-px" style={{ background: 'linear-gradient(to right, rgba(81,77,53,0.3), transparent)' }} />

            {/* Character quick info */}
            <div className="px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
              <div className="text-[10px] app-text-faint uppercase tracking-widest mb-2 font-medium">Personaje</div>
              <p className="text-sm app-text-secondary font-semibold truncate">{character.nombre}</p>
              <p className="text-xs app-text-faint mt-0.5">{raceName} · {className} Nv.{character.nivel}</p>
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 animate-fade-in" key={activeTab}>
          {activeTab === 'general' && <GeneralTab character={character} />}
          {activeTab === 'combat' && <CombatTab character={character} />}
          {activeTab === 'abilities' && <AbilitiesTab character={character} />}
          {activeTab === 'inventory' && <InventoryTab character={character} />}
          {activeTab === 'notes' && <NotesTab character={character} />}
        </div>
      </div>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center px-4 py-2.5 rounded-2xl transition-all duration-300" style={{
      background: `linear-gradient(145deg, ${color}18, ${color}08)`,
      border: `1px solid ${color}30`,
      boxShadow: `0 2px 8px ${color}10`,
    }}>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[9px] uppercase tracking-widest font-semibold" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── General Tab ─────────────────────────────────────────────────────

function GeneralTab({ character }: { character: Character }) {
  const abilityKeys = ['fue', 'des', 'con', 'int', 'sab', 'car'] as const;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Ability Scores */}
      <SectionCard title="Características" icon="🎯">
        <div className="grid grid-cols-3 gap-3">
          {abilityKeys.map(key => {
            const detail = character.abilityScores[key];
            return (
              <div key={key} className="text-center p-3.5 rounded-2xl transition-all duration-300 group" style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
                border: '1px solid rgba(255,255,255,0.06)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
              }}>
                <div className="text-[10px] app-text-faint uppercase tracking-widest mb-1.5 font-medium">
                  {ABILITY_ABBR[key]}
                </div>
                <div className="text-2xl font-bold app-text">{detail.total}</div>
                <div className="text-sm font-bold mt-0.5" style={{ color: detail.modifier >= 0 ? '#22c55e' : '#ef4444' }}>
                  {formatModifier(detail.modifier)}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Habilidades" icon="📊">
        <div className="space-y-1 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
          {(Object.keys(SKILLS) as Array<keyof typeof SKILLS>).map(key => {
            const skill = SKILLS[key];
            const prof = character.skillProficiencies[key];
            const abilityMod = character.abilityScores[skill.habilidad].modifier;
            const bonus = abilityMod + (prof.level !== 'none' ? character.proficiencyBonus * (prof.level === 'expertise' ? 2 : 1) : 0);
            const isProficient = prof.level !== 'none';

            return (
              <div key={key} className="flex items-center justify-between py-2 px-3 rounded-xl hover:bg-white/[.03] transition-all duration-200">
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full transition-all ${isProficient ? 'bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.4)]' : 'bg-[#514D35]'}`}></span>
                  <span className="text-sm app-text-muted">{skill.nombre}</span>
                  <span className="text-[9px] app-text-faint uppercase tracking-wider">({ABILITY_ABBR[skill.habilidad]})</span>
                </div>
                <span className={`text-sm font-bold ${bonus >= 0 ? 'app-text' : 'text-red-400'}`}>
                  {formatModifier(bonus)}
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Saving Throws */}
      <SectionCard title="Tiradas de Salvación" icon="🛡️">
        <div className="grid grid-cols-2 gap-2.5">
          {abilityKeys.map(key => {
            const save = character.savingThrows[key];
            const mod = character.abilityScores[key].modifier;
            const bonus = mod + (save.proficient ? character.proficiencyBonus : 0);
            return (
              <div key={key} className="flex items-center justify-between p-3 rounded-xl transition-all duration-200" style={{
                background: save.proficient
                  ? 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(34,197,94,0.03))'
                  : 'rgba(255,255,255,0.02)',
                border: `1px solid ${save.proficient ? 'rgba(34,197,94,0.2)' : 'rgba(255,255,255,0.04)'}`,
              }}>
                <div className="flex items-center gap-2.5">
                  <span className={`w-2 h-2 rounded-full ${save.proficient ? 'bg-[#22c55e] shadow-[0_0_6px_rgba(34,197,94,0.4)]' : 'bg-[#514D35]'}`}></span>
                  <span className="text-sm app-text-muted">{ABILITY_NAMES[key]}</span>
                </div>
                <span className="text-sm font-bold app-text">{formatModifier(bonus)}</span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Traits */}
      <SectionCard title="Rasgos y Capacidades" icon="⭐">
        {character.traits.length === 0 ? (
          <EmptyTabContent icon="⭐" text="Sin rasgos registrados" />
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {character.traits.map(trait => (
              <div key={trait.id} className="p-3.5 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div className="flex items-center justify-between mb-1.5">
                  <h4 className="text-sm font-semibold app-text">{trait.nombre}</h4>
                  <span className="text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider font-medium" style={{
                    background: 'rgba(178,172,136,0.1)',
                    color: '#AAA37B',
                    border: '1px solid rgba(178,172,136,0.15)',
                  }}>{trait.origen}</span>
                </div>
                <p className="text-xs app-text-muted leading-relaxed">{trait.descripcion}</p>
                {trait.maxUses !== null && (
                  <div className="mt-2.5 text-[10px] app-text-faint font-medium">
                    Usos: {trait.currentUses}/{trait.maxUses}
                    {trait.recharge && ` (${trait.recharge === 'short_rest' ? 'Descanso corto' : trait.recharge === 'long_rest' ? 'Descanso largo' : 'Amanecer'})`}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Personality */}
      <SectionCard title="Personalidad" icon="🎭">
        <div className="space-y-3">
          {character.personality.traits.length > 0 && (
            <PersonalityField label="Rasgos" value={character.personality.traits.join(', ')} />
          )}
          {character.personality.ideals && <PersonalityField label="Ideales" value={character.personality.ideals} />}
          {character.personality.bonds && <PersonalityField label="Vínculos" value={character.personality.bonds} />}
          {character.personality.flaws && <PersonalityField label="Defectos" value={character.personality.flaws} />}
          {character.personality.backstory && <PersonalityField label="Historia" value={character.personality.backstory} />}
          {!character.personality.traits.length && !character.personality.ideals && !character.personality.bonds && !character.personality.flaws && (
            <EmptyTabContent icon="🎭" text="Sin personalidad definida" />
          )}
        </div>
      </SectionCard>

      {/* Proficiencies */}
      <SectionCard title="Competencias" icon="🔑">
        <div className="space-y-4">
          {character.proficiencies.languages.length > 0 && (
            <ProficiencyGroup label="Idiomas" items={character.proficiencies.languages} />
          )}
          {character.proficiencies.weapons.length > 0 && (
            <ProficiencyGroup label="Armas" items={character.proficiencies.weapons} />
          )}
          {character.proficiencies.armors.length > 0 && (
            <ProficiencyGroup label="Armaduras" items={character.proficiencies.armors} />
          )}
          {character.proficiencies.tools.length > 0 && (
            <ProficiencyGroup label="Herramientas" items={character.proficiencies.tools} />
          )}
          {!character.proficiencies.languages.length && !character.proficiencies.weapons.length && (
            <EmptyTabContent icon="🔑" text="Sin competencias registradas" />
          )}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── Combat Tab ──────────────────────────────────────────────────────

function CombatTab({ character }: { character: Character }) {
  const hpPercent = character.hp.max > 0 ? (character.hp.current / character.hp.max) * 100 : 0;
  const hpColor = hpPercent > 50 ? '#22c55e' : hpPercent > 25 ? '#f59e0b' : '#ef4444';

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* HP */}
      <SectionCard title="Puntos de Golpe" icon="❤️">
        <div className="text-center mb-5">
          <div className="text-5xl font-bold app-text">{character.hp.current}</div>
          <div className="text-sm app-text-muted mt-1">/ {character.hp.max} PG</div>
          {character.hp.temp > 0 && (
            <div className="text-sm text-[#3b82f6] mt-1 font-medium">+{character.hp.temp} temporales</div>
          )}
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)' }}>
          <div className="h-full rounded-full transition-all duration-700" style={{
            width: `${Math.min(hpPercent, 100)}%`,
            background: `linear-gradient(90deg, ${hpColor}, ${hpColor}cc)`,
            boxShadow: `0 0 12px ${hpColor}40`,
          }}></div>
        </div>
      </SectionCard>

      {/* Speed & Death Saves */}
      <SectionCard title="Movimiento y Muerte" icon="💀">
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="dymes-stat-pill">
            <div className="text-lg font-bold app-text">{character.speed.walk} pies</div>
            <div className="text-[9px] app-text-faint uppercase tracking-widest font-medium">Velocidad</div>
          </div>
          <div className="dymes-stat-pill">
            <div className="text-lg font-bold app-text">{character.hitDice.remaining}/{character.hitDice.total}</div>
            <div className="text-[9px] app-text-faint uppercase tracking-widest font-medium">Dados ({character.hitDice.die})</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-8 p-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="text-center">
            <div className="text-sm text-[#22c55e] font-bold">{character.deathSaves.successes}/3</div>
            <div className="text-[10px] app-text-faint mt-0.5">Éxitos</div>
          </div>
          <div className="w-px h-8" style={{ background: 'linear-gradient(180deg, transparent, rgba(81,77,53,0.4), transparent)' }} />
          <div className="text-center">
            <div className="text-sm text-[#ef4444] font-bold">{character.deathSaves.failures}/3</div>
            <div className="text-[10px] app-text-faint mt-0.5">Fallos</div>
          </div>
        </div>
      </SectionCard>

      {/* Conditions */}
      <SectionCard title="Condiciones Activas" icon="⚠️">
        {character.conditions.length === 0 ? (
          <EmptyTabContent icon="✅" text="Sin condiciones activas" />
        ) : (
          <div className="flex flex-wrap gap-2">
            {character.conditions.map((c, i) => (
              <span key={i} className="dymes-badge" style={{
                background: 'linear-gradient(135deg, rgba(245,158,11,0.12), rgba(245,158,11,0.04))',
                color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.25)',
              }}>
                {c.condition}
                {c.note && <span className="ml-1 text-[10px] opacity-70">({c.note})</span>}
              </span>
            ))}
          </div>
        )}
      </SectionCard>

      {/* Damage Modifiers */}
      <SectionCard title="Modificadores de Daño" icon="🔥">
        {character.damageModifiers.length === 0 ? (
          <EmptyTabContent icon="🔥" text="Sin modificadores" />
        ) : (
          <div className="space-y-2.5">
            {character.damageModifiers.map((dm, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl" style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span className="text-sm app-text capitalize font-medium">{dm.type}</span>
                <span className="text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold" style={{
                  background: dm.modifier === 'resistance' ? 'rgba(59,130,246,0.12)' : dm.modifier === 'immunity' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
                  color: dm.modifier === 'resistance' ? '#3b82f6' : dm.modifier === 'immunity' ? '#22c55e' : '#ef4444',
                  border: `1px solid ${dm.modifier === 'resistance' ? 'rgba(59,130,246,0.25)' : dm.modifier === 'immunity' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}`,
                }}>
                  {dm.modifier === 'resistance' ? 'Resistencia' : dm.modifier === 'immunity' ? 'Inmunidad' : 'Vulnerabilidad'}
                </span>
              </div>
            ))}
          </div>
        )}
      </SectionCard>
    </div>
  );
}

// ─── Placeholder tabs ────────────────────────────────────────────────

function AbilitiesTab({ character }: { character: Character }) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <SectionCard title="Hechizos" icon="✨">
        <EmptyTabContent
          icon="✨"
          text={character.knownSpellIds.length > 0
            ? `${character.knownSpellIds.length} hechizos conocidos, ${character.preparedSpellIds.length} preparados`
            : 'Sin hechizos. Este personaje no es un lanzador o aún no ha aprendido ninguno.'}
        />
      </SectionCard>
      <SectionCard title="Rasgos de clase" icon="⚡">
        <EmptyTabContent icon="⚡" text="Los rasgos de clase aparecerán aquí conforme subas de nivel." />
      </SectionCard>
    </div>
  );
}

function InventoryTab({ character }: { character: Character }) {
  return (
    <SectionCard title="Inventario" icon="🎒">
      <EmptyTabContent icon="🎒" text="Gestión de inventario disponible en la aplicación completa." />
    </SectionCard>
  );
}

function NotesTab({ character }: { character: Character }) {
  return (
    <SectionCard title="Notas" icon="📝">
      <EmptyTabContent icon="📝" text="Sistema de notas y diario disponible en la aplicación completa." />
    </SectionCard>
  );
}

// ─── Shared components ───────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="dymes-section-card">
      <h3 className="flex items-center gap-2.5 text-base font-display font-semibold app-text-secondary mb-5">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function EmptyTabContent({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="text-center py-8">
      <div className="w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center" style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.05)',
      }}>
        <span className="text-2xl opacity-60">{icon}</span>
      </div>
      <p className="text-sm app-text-faint max-w-xs mx-auto leading-relaxed">{text}</p>
    </div>
  );
}

function PersonalityField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3.5 rounded-xl" style={{
      background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="text-[10px] app-text-faint uppercase tracking-widest mb-1.5 font-medium">{label}</div>
      <p className="text-sm app-text-muted leading-relaxed">{value}</p>
    </div>
  );
}

function ProficiencyGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[10px] app-text-faint uppercase tracking-widest mb-2 font-medium">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map(item => (
          <span key={item} className="text-xs px-2.5 py-1 rounded-lg" style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
            border: '1px solid rgba(255,255,255,0.08)',
            color: 'var(--app-text-secondary)',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
