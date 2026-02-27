import { useEffect, useState, useMemo, type ReactNode } from 'react';
import { useCharacterListStore } from '../../stores/characterListStore';
import { CLASS_NAMES, CLASS_ICONS, RACE_NAMES } from '../../constants/character';
import type { CharacterSummary } from '../../types/character';

/* ─── Lucide-style SVG icon helpers ─── */
const IconPlus = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="M5 12h14"/><path d="M12 5v14"/></svg>
);
const IconBookOpen = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
);
const IconLibrary = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg>
);
const IconGlobe = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
);
const IconSwords = (p: { className?: string; size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={p.size ?? 20} height={p.size ?? 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><polyline points="14.5 17.5 3 6 3 3 6 3 17.5 14.5"/><line x1="13" x2="19" y1="19" y2="13"/><line x1="16" x2="20" y1="16" y2="20"/><line x1="19" x2="21" y1="21" y2="19"/><polyline points="14.5 6.5 18 3 21 3 21 6 17.5 9.5"/><line x1="5" x2="9" y1="14" y2="18"/><line x1="7" x2="4" y1="17" y2="20"/><line x1="3" x2="5" y1="19" y2="21"/></svg>
);
const IconBarChart = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
);
const IconShield = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
);
const IconUsers = (p: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={p.className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 6) return 'Buenas noches';
  if (h < 12) return 'Buenos días';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export default function CharacterList() {
  const { characters, loading, loadCharacters, deleteCharacter } = useCharacterListStore();
  const [search, setSearch] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadCharacters();
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return characters;
    const q = search.toLowerCase();
    return characters.filter(c =>
      c.nombre.toLowerCase().includes(q) ||
      CLASS_NAMES[c.clase]?.toLowerCase().includes(q) ||
      RACE_NAMES[c.raza]?.toLowerCase().includes(q)
    );
  }, [characters, search]);

  function handleDelete(id: string) {
    if (deleteConfirm === id) {
      deleteCharacter(id);
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
      setTimeout(() => setDeleteConfirm(null), 3000);
    }
  }

  return (
    <div className="animate-fade-in relative">
      {/* ── Welcome Banner ── */}
      <div className="relative overflow-hidden rounded-2xl mb-8" style={{
        background: 'var(--app-banner-bg)',
        border: '1px solid var(--app-border)',
      }}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
        <div className="absolute -bottom-12 -left-12 w-40 h-40 opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #CDC9B2, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(143,61,56,0.25) 50%, transparent 90%)' }} />

        <div className="relative px-6 sm:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-[11px] app-text-faint uppercase tracking-[0.2em] mb-1.5">{getGreeting()}, aventurero</p>
              <h1 className="text-2xl sm:text-3xl font-display font-bold app-text tracking-wide">Mis Personajes</h1>
              <p className="text-sm app-text-muted mt-2 font-light leading-relaxed">
                {characters.length === 0
                  ? 'Crea tu primer personaje para comenzar la aventura'
                  : `${characters.length} personaje${characters.length !== 1 ? 's' : ''} listo${characters.length !== 1 ? 's' : ''} para la aventura`}
              </p>
            </div>
            <a
              href="/app/characters/create"
              className="btn-gold text-sm !px-6 !py-3 rounded-xl inline-flex items-center gap-2.5 group shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:rotate-90 duration-300"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Nuevo personaje
            </a>
          </div>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      {characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          <QuickAction href="/app/characters/create" icon={<IconPlus />} label="Crear personaje" />
          <QuickAction href="/compendio" icon={<IconGlobe />} label="Compendio SRD" external />
          <QuickAction href="/app/settings" icon={<IconLibrary />} label="Ajustes" />
        </div>
      )}

      {/* ── Stats Row ── */}
      {characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total" value={characters.length.toString()} icon={<IconSwords />} accent="#8f3d38" />
          <StatCard
            label="Nivel medio"
            value={(characters.reduce((s, c) => s + c.nivel, 0) / characters.length).toFixed(1)}
            icon={<IconBarChart />}
            accent="#d4a052"
          />
          <StatCard
            label="Clases"
            value={new Set(characters.map(c => c.clase)).size.toString()}
            icon={<IconShield />}
            accent="#6b8cce"
          />
          <StatCard
            label="Razas"
            value={new Set(characters.map(c => c.raza)).size.toString()}
            icon={<IconUsers />}
            accent="#7ab06b"
          />
        </div>
      )}

      {/* ── Search bar ── */}
      {characters.length > 0 && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 app-text-faint" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre, clase o raza..."
              aria-label="Buscar personajes"
              className="dymes-input !pl-11"
            />
            {search && (
              <button onClick={() => setSearch('')} aria-label="Limpiar búsqueda" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md app-text-faint transition-colors hover:bg-[var(--app-hover-bg)]">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
              </button>
            )}
          </div>
          {search && <p className="text-xs app-text-faint mt-2">{filtered.length} resultado{filtered.length !== 1 ? 's' : ''}</p>}
        </div>
      )}

      {/* ── Section header ── */}
      {characters.length > 0 && !search && (
        <div className="flex items-center gap-3 mb-5">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--app-divider), transparent)' }} />
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold shrink-0" style={{ color: 'var(--app-text-faint)', opacity: 0.7 }}>Tu grupo</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, var(--app-divider))' }} />
        </div>
      )}

      {/* ── Character Grid ── */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-[var(--app-text-faint)] border-t-[#8f3d38] animate-spin" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-[#CDC9B2]/20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="text-sm app-text-faint">Cargando personajes...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState hasCharacters={characters.length > 0} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((char, i) => (
            <CharacterCard
              key={char.id}
              character={char}
              index={i}
              deleteConfirm={deleteConfirm === char.id}
              onDelete={() => handleDelete(char.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────── Quick Action Pill ─────────── */
function QuickAction({ href, icon, label, external }: { href: string; icon: ReactNode; label: string; external?: boolean }) {
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className="group flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer quick-action-pill"
    >
      <span className="text-base opacity-70 group-hover:opacity-100 transition-opacity" aria-hidden="true">{icon}</span>
      <span className="text-[12px] app-text-muted font-medium transition-colors truncate">{label}</span>
      {external && (
        <svg className="w-3 h-3 app-text-faint ml-auto opacity-0 group-hover:opacity-70 transition-opacity shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      )}
    </a>
  );
}

/* ─────────── Stat Card ─────────── */
function StatCard({ label, value, icon, accent }: { label: string; value: string; icon: ReactNode; accent: string }) {
  return (
    <div className="group relative rounded-xl overflow-hidden transition-all duration-200" style={{
      background: 'var(--app-surface-gradient)',
      border: '1px solid var(--app-border-subtle)',
    }}>
      <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-[0.04] -translate-y-6 translate-x-6 transition-opacity group-hover:opacity-[0.08]" style={{ background: `radial-gradient(circle, ${accent}, transparent 70%)` }} />
      <div className="relative px-4 py-3.5 flex items-center gap-3">
        <span className="text-lg opacity-60 group-hover:opacity-80 transition-opacity" aria-hidden="true">{icon}</span>
        <div>
          <div className="text-xl font-bold app-text leading-tight">{value}</div>
          <div className="text-[9px] app-text-faint uppercase tracking-[0.12em] font-semibold mt-0.5">{label}</div>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Character Card ─────────── */
function CharacterCard({ character, index, deleteConfirm, onDelete }: {
  character: CharacterSummary;
  index: number;
  deleteConfirm: boolean;
  onDelete: () => void;
}) {
  const icon = CLASS_ICONS[character.clase] ?? '⚔️';
  const className = CLASS_NAMES[character.clase] ?? character.clase;
  const raceName = RACE_NAMES[character.raza] ?? character.raza;

  return (
    <div
      className="group relative rounded-2xl border transition-all duration-300 overflow-hidden character-card-hover"
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,61,56,0.25), rgba(178,172,136,0.12), transparent)' }} />

      <a href={`/app/characters/view?id=${character.id}`} className="block p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative w-14 h-14 rounded-xl flex items-center justify-center text-xl shrink-0 overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(143,61,56,0.12), rgba(143,61,56,0.04))',
            border: '1px solid rgba(143,61,56,0.2)',
          }}>
            {character.avatarUri ? (
              <img src={character.avatarUri} alt="" className="w-full h-full rounded-xl object-cover" />
            ) : (
              <span className="drop-shadow-lg">{icon}</span>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] font-display font-semibold app-text truncate group-hover:app-text-secondary transition-colors duration-300">
                {character.nombre}
              </h3>
              {/* Level badge */}
              <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold text-white" style={{
                background: 'linear-gradient(135deg, rgba(143,61,56,0.5), rgba(143,61,56,0.3))',
                border: '1px solid rgba(143,61,56,0.3)',
              }}>
                Nv.{character.nivel}
              </span>
            </div>
            <p className="text-[13px] app-text-muted mt-1">{className}</p>
            <p className="text-[11px] app-text-faint mt-0.5">{raceName}</p>
          </div>

          {/* Arrow */}
          <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-0.5 self-center"
               style={{ background: 'var(--app-hover-bg)', border: '1px solid var(--app-input-border)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="app-text-secondary"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </a>

      {/* Footer with delete */}
      <div className="px-5 pb-3.5 pt-0 flex items-center justify-end">
        <button
          onClick={(e) => { e.preventDefault(); onDelete(); }}
          className={`text-[11px] transition-all duration-300 px-2.5 py-1 rounded-lg ${
            deleteConfirm
              ? 'text-red-400 font-semibold bg-red-400/10 border border-red-400/20'
              : 'app-text-faint opacity-60 hover:text-red-400 hover:bg-red-400/5'
          }`}
        >
          {deleteConfirm ? '¿Confirmar eliminación?' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

/* ─────────── Empty State ─────────── */
function EmptyState({ hasCharacters }: { hasCharacters: boolean }) {
  return (
    <div className="text-center py-20 relative">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 rounded-full opacity-[0.04]" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
      </div>

      <div className="relative">
        <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, rgba(143,61,56,0.1), rgba(143,61,56,0.03))',
          border: '1px solid rgba(143,61,56,0.15)',
          boxShadow: '0 8px 32px rgba(143,61,56,0.08)',
        }}>
          {hasCharacters ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(143,61,56,0.5)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          ) : (
            <IconSwords size={32} className="opacity-50" />
          )}
        </div>
        <h3 className="text-xl font-display font-semibold app-text mb-2">
          {hasCharacters ? 'Sin resultados' : 'Tu aventura comienza aquí'}
        </h3>
        <p className="text-sm app-text-muted mb-8 max-w-sm mx-auto leading-relaxed">
          {hasCharacters
            ? 'No se encontraron personajes con ese filtro.'
            : 'Crea tu primer personaje y da los primeros pasos en tu gran aventura.'}
        </p>
        {!hasCharacters && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href="/app/characters/create" className="btn-gold text-sm !px-8 !py-3.5 rounded-xl inline-flex items-center gap-2.5 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:rotate-90 duration-300"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              Crear personaje
            </a>
            <a href="/compendio" target="_blank" className="btn-ghost text-sm !px-6 !py-3 rounded-xl inline-flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>
              Explorar compendio
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
