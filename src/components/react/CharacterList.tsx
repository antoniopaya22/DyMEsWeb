import { useEffect, useState, useMemo } from 'react';
import { useCharacterListStore } from '../../stores/characterListStore';
import { CLASS_NAMES, CLASS_ICONS, RACE_NAMES } from '../../constants/character';
import type { CharacterSummary } from '../../types/character';

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
      {/* Atmospheric glow */}
      <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">Mis Personajes</h1>
          <p className="text-sm text-[#AAA37B] mt-1.5 font-light">
            {characters.length === 0 ? 'Crea tu primer personaje para empezar' : `${characters.length} personaje${characters.length !== 1 ? 's' : ''} en tu grupo`}
          </p>
        </div>
        <a
          href="/app/characters/create"
          className="btn-gold text-sm !px-6 !py-3 rounded-xl inline-flex items-center gap-2.5 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:rotate-90 duration-300"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Nuevo personaje
        </a>
      </div>

      {/* Search */}
      {characters.length > 0 && (
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#807953]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por nombre, clase o raza..."
              className="dymes-input !pl-11"
            />
          </div>
        </div>
      )}

      {/* Stats row */}
      {characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total" value={characters.length.toString()} icon="⚔️" color="#8f3d38" />
          <StatCard
            label="Nivel medio"
            value={characters.length > 0
              ? (characters.reduce((s, c) => s + c.nivel, 0) / characters.length).toFixed(1)
              : '—'
            }
            icon="📊"
            color="#f59e0b"
          />
          <StatCard
            label="Clases"
            value={new Set(characters.map(c => c.clase)).size.toString()}
            icon="🎭"
            color="#3b82f6"
          />
          <StatCard
            label="Razas"
            value={new Set(characters.map(c => c.raza)).size.toString()}
            icon="🧝"
            color="#22c55e"
          />
        </div>
      )}

      {/* Divider */}
      {characters.length > 0 && <div className="dymes-divider !mb-8" />}

      {/* Character grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-[#514D35] border-t-[#8f3d38] animate-spin" />
            <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-transparent border-b-[#CDC9B2]/20 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
          </div>
          <p className="text-sm text-[#807953]">Cargando personajes...</p>
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState hasCharacters={characters.length > 0} />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color: string }) {
  return (
    <div className="dymes-stat-pill group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-[0.06] -translate-y-4 translate-x-4 transition-opacity group-hover:opacity-[0.12]" style={{ background: `radial-gradient(circle, ${color}, transparent 70%)` }} />
      <div className="text-lg mb-0.5 opacity-60">{icon}</div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-[#807953] uppercase tracking-widest mt-1 font-medium">{label}</div>
    </div>
  );
}

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
      className="group relative rounded-2xl border transition-all duration-300 overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(40,38,27,0.95), rgba(28,26,18,0.9))',
        borderColor: 'rgba(81,77,53,0.3)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        animationDelay: `${index * 0.06}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(143,61,56,0.4)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 30px rgba(143,61,56,0.1), inset 0 1px 0 rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(81,77,53,0.3)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,61,56,0.3), rgba(178,172,136,0.15), transparent)' }} />

      <a href={`/app/characters/view?id=${character.id}`} className="block p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0 overflow-hidden" style={{
            background: 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))',
            border: '1px solid rgba(143,61,56,0.25)',
            boxShadow: '0 4px 12px rgba(143,61,56,0.1)',
          }}>
            {character.avatarUri ? (
              <img src={character.avatarUri} alt="" className="w-full h-full rounded-2xl object-cover" />
            ) : (
              <span className="drop-shadow-lg">{icon}</span>
            )}
            {/* Level badge */}
            <div className="absolute -bottom-0.5 -right-0.5 px-1.5 py-0.5 rounded-tl-lg rounded-br-xl text-[10px] font-bold text-white"
              style={{ background: 'linear-gradient(135deg, #8f3d38, #a04540)', boxShadow: '0 2px 6px rgba(143,61,56,0.4)' }}>
              {character.nivel}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-display font-semibold text-white truncate group-hover:text-[#CDC9B2] transition-colors duration-300">
              {character.nombre}
            </h3>
            <p className="text-sm text-[#AAA37B] mt-1">
              {className}
            </p>
            <p className="text-xs text-[#807953] mt-0.5">
              {raceName}
            </p>
          </div>

          {/* Arrow */}
          <div className="w-9 h-9 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#CDC9B2" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </a>

      {/* Footer */}
      <div className="px-5 pb-4 pt-0 flex items-center justify-between">
        <div className="h-px flex-1 mr-3" style={{ background: 'linear-gradient(90deg, rgba(81,77,53,0.3), transparent)' }} />
        <button
          onClick={(e) => { e.preventDefault(); onDelete(); }}
          className={`text-xs transition-all duration-300 px-2.5 py-1 rounded-lg ${
            deleteConfirm
              ? 'text-red-400 font-semibold bg-red-400/10 border border-red-400/20'
              : 'text-[#807953] hover:text-red-400 hover:bg-red-400/5'
          }`}
        >
          {deleteConfirm ? '¿Confirmar?' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ hasCharacters }: { hasCharacters: boolean }) {
  return (
    <div className="text-center py-24 relative">
      {/* Atmospheric glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-64 h-64 rounded-full opacity-[0.06]" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
      </div>

      <div className="relative">
        <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, rgba(143,61,56,0.12), rgba(143,61,56,0.04))',
          border: '1px solid rgba(143,61,56,0.2)',
          boxShadow: '0 8px 32px rgba(143,61,56,0.1)',
        }}>
          {hasCharacters ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(143,61,56,0.5)" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          ) : (
            <span className="text-4xl">⚔️</span>
          )}
        </div>
        <h3 className="text-xl font-display font-semibold text-white mb-3">
          {hasCharacters ? 'Sin resultados' : 'Tu aventura comienza aquí'}
        </h3>
        <p className="text-sm text-[#AAA37B] mb-8 max-w-sm mx-auto leading-relaxed">
          {hasCharacters
            ? 'No se encontraron personajes con ese filtro.'
            : 'Crea tu primer personaje y da los primeros pasos en tu gran aventura.'}
        </p>
        {!hasCharacters && (
          <a href="/app/characters/create" className="btn-gold text-sm !px-8 !py-3.5 rounded-xl inline-flex items-center gap-2.5 group">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:rotate-90 duration-300"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Crear personaje
          </a>
        )}
      </div>
    </div>
  );
}
