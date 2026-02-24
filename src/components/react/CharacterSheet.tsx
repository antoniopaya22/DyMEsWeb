import { useEffect, useState } from 'react';
import type { Character } from '../../types/character';
import { CLASS_NAMES, CLASS_ICONS, RACE_NAMES, ABILITY_NAMES, ABILITY_ABBR, SKILLS } from '../../constants/character';
import { calcModifier, calcProficiencyBonus, formatModifier } from '../../utils/character';
import { getItem, STORAGE_KEYS } from '../../utils/storage';

type Tab = 'general' | 'combat' | 'spells' | 'inventory' | 'notes';

const TABS: { key: Tab; label: string; icon: string }[] = [
  { key: 'general', label: 'General', icon: '📋' },
  { key: 'combat', label: 'Combate', icon: '⚔️' },
  { key: 'spells', label: 'Hechizos', icon: '✨' },
  { key: 'inventory', label: 'Inventario', icon: '🎒' },
  { key: 'notes', label: 'Notas', icon: '📝' },
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
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-[#8f3d38]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center"
          style={{ background: 'rgba(143,61,56,0.08)', border: '1px solid rgba(143,61,56,0.15)' }}>
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">Personaje no encontrado</h3>
        <p className="text-sm text-[#AAA37B] mb-6">No se pudo cargar este personaje.</p>
        <a href="/app" className="btn-gold text-sm !px-6 !py-3 rounded-lg">Volver a personajes</a>
      </div>
    );
  }

  const icon = CLASS_ICONS[character.clase] ?? '⚔️';
  const className = CLASS_NAMES[character.clase] ?? character.clase;
  const raceName = RACE_NAMES[character.raza] ?? character.raza;

  return (
    <div className="animate-fade-in">
      {/* Back link */}
      <a href="/app" className="inline-flex items-center gap-2 text-sm text-[#AAA37B] hover:text-white transition-colors mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        Mis Personajes
      </a>

      {/* Character header */}
      <div className="rounded-2xl border overflow-hidden mb-8" style={{ background: '#323021', borderColor: '#514D35' }}>
        <div className="relative h-32" style={{ background: 'linear-gradient(135deg, rgba(143,61,56,0.3), rgba(50,48,33,0.8))' }}>
          <div className="absolute inset-0 bg-gradient-to-t from-[#323021] to-transparent"></div>
        </div>
        <div className="px-6 pb-6 -mt-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-xl"
              style={{ background: '#423E2B', border: '3px solid #514D35' }}>
              {character.appearance.avatarUri ? (
                <img src={character.appearance.avatarUri} alt="" className="w-full h-full rounded-2xl object-cover" />
              ) : icon}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="text-2xl font-display font-bold text-white">{character.nombre}</h1>
              <p className="text-[#AAA37B] mt-1">
                {raceName} — {className} {character.subclase ? `(${character.subclase})` : ''}
              </p>
            </div>

            {/* Quick stats */}
            <div className="flex gap-3">
              <QuickStat label="Nivel" value={character.nivel.toString()} color="#8f3d38" />
              <QuickStat label="CA" value={character.hp ? '—' : '—'} color="#3b82f6" />
              <QuickStat label="PG" value={`${character.hp.current}/${character.hp.max}`} color="#22c55e" />
              <QuickStat label="Bonus" value={formatModifier(character.proficiencyBonus)} color="#f59e0b" />
            </div>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`dymes-tab whitespace-nowrap flex items-center gap-2 ${activeTab === tab.key ? 'active' : ''}`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="animate-fade-in" key={activeTab}>
        {activeTab === 'general' && <GeneralTab character={character} />}
        {activeTab === 'combat' && <CombatTab character={character} />}
        {activeTab === 'spells' && <SpellsTab character={character} />}
        {activeTab === 'inventory' && <InventoryTab character={character} />}
        {activeTab === 'notes' && <NotesTab character={character} />}
      </div>
    </div>
  );
}

function QuickStat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center px-4 py-2 rounded-xl" style={{
      background: `${color}15`,
      border: `1px solid ${color}30`,
    }}>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-[10px] uppercase tracking-wider" style={{ color }}>{label}</div>
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
              <div key={key} className="text-center p-3 rounded-xl" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div className="text-[10px] text-[#807953] uppercase tracking-wider mb-1">
                  {ABILITY_ABBR[key]}
                </div>
                <div className="text-2xl font-bold text-white">{detail.total}</div>
                <div className="text-sm font-semibold" style={{ color: detail.modifier >= 0 ? '#22c55e' : '#ef4444' }}>
                  {formatModifier(detail.modifier)}
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Skills */}
      <SectionCard title="Habilidades" icon="📊">
        <div className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
          {(Object.keys(SKILLS) as Array<keyof typeof SKILLS>).map(key => {
            const skill = SKILLS[key];
            const prof = character.skillProficiencies[key];
            const abilityMod = character.abilityScores[skill.habilidad].modifier;
            const bonus = abilityMod + (prof.level !== 'none' ? character.proficiencyBonus * (prof.level === 'expertise' ? 2 : 1) : 0);
            const isProficient = prof.level !== 'none';

            return (
              <div key={key} className="flex items-center justify-between py-1.5 px-3 rounded-lg hover:bg-white/3 transition-colors">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${isProficient ? 'bg-[#22c55e]' : 'bg-[#514D35]'}`}></span>
                  <span className="text-sm text-[#AAA37B]">{skill.nombre}</span>
                  <span className="text-[10px] text-[#807953]">({ABILITY_ABBR[skill.habilidad]})</span>
                </div>
                <span className={`text-sm font-semibold ${bonus >= 0 ? 'text-white' : 'text-red-400'}`}>
                  {formatModifier(bonus)}
                </span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Saving Throws */}
      <SectionCard title="Tiradas de Salvación" icon="🛡️">
        <div className="grid grid-cols-2 gap-2">
          {abilityKeys.map(key => {
            const save = character.savingThrows[key];
            const mod = character.abilityScores[key].modifier;
            const bonus = mod + (save.proficient ? character.proficiencyBonus : 0);
            return (
              <div key={key} className="flex items-center justify-between p-2.5 rounded-lg" style={{
                background: save.proficient ? 'rgba(34,197,94,0.06)' : 'rgba(255,255,255,0.02)',
                border: `1px solid ${save.proficient ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)'}`,
              }}>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${save.proficient ? 'bg-[#22c55e]' : 'bg-[#514D35]'}`}></span>
                  <span className="text-sm text-[#AAA37B]">{ABILITY_NAMES[key]}</span>
                </div>
                <span className="text-sm font-semibold text-white">{formatModifier(bonus)}</span>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Traits */}
      <SectionCard title="Rasgos y Capacidades" icon="⭐">
        {character.traits.length === 0 ? (
          <p className="text-sm text-[#807953] text-center py-4">Sin rasgos registrados</p>
        ) : (
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {character.traits.map(trait => (
              <div key={trait.id} className="p-3 rounded-lg" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-semibold text-white">{trait.nombre}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full" style={{
                    background: 'rgba(178,172,136,0.1)',
                    color: '#AAA37B',
                    border: '1px solid rgba(178,172,136,0.2)',
                  }}>{trait.origen}</span>
                </div>
                <p className="text-xs text-[#AAA37B] leading-relaxed">{trait.descripcion}</p>
                {trait.maxUses !== null && (
                  <div className="mt-2 text-[10px] text-[#807953]">
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
        </div>
      </SectionCard>

      {/* Proficiencies */}
      <SectionCard title="Competencias" icon="🔑">
        <div className="space-y-3">
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
        <div className="text-center mb-4">
          <div className="text-4xl font-bold text-white">{character.hp.current}</div>
          <div className="text-sm text-[#AAA37B]">/ {character.hp.max} PG</div>
          {character.hp.temp > 0 && (
            <div className="text-sm text-[#3b82f6] mt-1">+{character.hp.temp} temp</div>
          )}
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full transition-all duration-500" style={{
            width: `${Math.min(hpPercent, 100)}%`,
            background: `linear-gradient(90deg, ${hpColor}, ${hpColor}cc)`,
          }}></div>
        </div>
      </SectionCard>

      {/* Speed & Death Saves */}
      <SectionCard title="Movimiento y Muerte" icon="💀">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-lg font-bold text-white">{character.speed.walk} pies</div>
            <div className="text-[10px] text-[#807953] uppercase tracking-wider">Velocidad</div>
          </div>
          <div className="p-3 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="text-lg font-bold text-white">{character.hitDice.remaining}/{character.hitDice.total}</div>
            <div className="text-[10px] text-[#807953] uppercase tracking-wider">Dados Golpe ({character.hitDice.die})</div>
          </div>
        </div>
        <div className="flex items-center justify-center gap-6">
          <div className="text-center">
            <div className="text-sm text-[#22c55e] font-semibold">{character.deathSaves.successes}/3</div>
            <div className="text-[10px] text-[#807953]">Éxitos</div>
          </div>
          <div className="text-[#514D35]">|</div>
          <div className="text-center">
            <div className="text-sm text-[#ef4444] font-semibold">{character.deathSaves.failures}/3</div>
            <div className="text-[10px] text-[#807953]">Fallos</div>
          </div>
        </div>
      </SectionCard>

      {/* Conditions */}
      <SectionCard title="Condiciones Activas" icon="⚠️">
        {character.conditions.length === 0 ? (
          <p className="text-sm text-[#807953] text-center py-4">Sin condiciones activas</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {character.conditions.map((c, i) => (
              <span key={i} className="dymes-badge" style={{
                background: 'rgba(245,158,11,0.1)',
                color: '#f59e0b',
                border: '1px solid rgba(245,158,11,0.2)',
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
          <p className="text-sm text-[#807953] text-center py-4">Sin modificadores</p>
        ) : (
          <div className="space-y-2">
            {character.damageModifiers.map((dm, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg" style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>
                <span className="text-sm text-white capitalize">{dm.type}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{
                  background: dm.modifier === 'resistance' ? 'rgba(59,130,246,0.1)' : dm.modifier === 'immunity' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                  color: dm.modifier === 'resistance' ? '#3b82f6' : dm.modifier === 'immunity' ? '#22c55e' : '#ef4444',
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

function SpellsTab({ character }: { character: Character }) {
  return (
    <SectionCard title="Hechizos" icon="✨">
      <div className="text-center py-8">
        <span className="text-4xl mb-4 block">✨</span>
        <p className="text-sm text-[#AAA37B]">
          {character.knownSpellIds.length > 0
            ? `${character.knownSpellIds.length} hechizos conocidos, ${character.preparedSpellIds.length} preparados`
            : 'Sin hechizos. Este personaje no es un lanzador de hechizos o aún no ha aprendido ninguno.'}
        </p>
      </div>
    </SectionCard>
  );
}

function InventoryTab({ character }: { character: Character }) {
  return (
    <SectionCard title="Inventario" icon="🎒">
      <div className="text-center py-8">
        <span className="text-4xl mb-4 block">🎒</span>
        <p className="text-sm text-[#AAA37B]">
          Gestión de inventario disponible en la aplicación completa.
        </p>
      </div>
    </SectionCard>
  );
}

function NotesTab({ character }: { character: Character }) {
  return (
    <SectionCard title="Notas" icon="📝">
      <div className="text-center py-8">
        <span className="text-4xl mb-4 block">📝</span>
        <p className="text-sm text-[#AAA37B]">
          Sistema de notas y diario disponible en la aplicación completa.
        </p>
      </div>
    </SectionCard>
  );
}

// ─── Shared components ───────────────────────────────────────────────

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-5" style={{ background: '#323021', borderColor: '#514D35' }}>
      <h3 className="flex items-center gap-2 text-base font-semibold text-[#CDC9B2] mb-4">
        <span>{icon}</span>
        {title}
      </h3>
      {children}
    </div>
  );
}

function PersonalityField({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <div className="text-[10px] text-[#807953] uppercase tracking-wider mb-1">{label}</div>
      <p className="text-sm text-[#AAA37B]">{value}</p>
    </div>
  );
}

function ProficiencyGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <div className="text-[10px] text-[#807953] uppercase tracking-wider mb-1.5">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {items.map(item => (
          <span key={item} className="text-xs px-2 py-1 rounded-md" style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            color: '#AAA37B',
          }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
