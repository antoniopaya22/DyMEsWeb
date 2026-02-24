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
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Mis Personajes</h1>
          <p className="text-sm text-[#AAA37B] mt-1">
            {characters.length === 0 ? 'Crea tu primer personaje' : `${characters.length} personaje${characters.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <a
          href="/app/characters/create"
          className="btn-gold text-sm !px-5 !py-2.5 rounded-lg inline-flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Nuevo personaje
        </a>
      </div>

      {/* Search */}
      {characters.length > 0 && (
        <div className="mb-6">
          <div className="relative max-w-md">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-[#807953]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar personaje..."
              className="dymes-input pl-10"
            />
          </div>
        </div>
      )}

      {/* Stats row */}
      {characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total" value={characters.length.toString()} />
          <StatCard
            label="Nivel medio"
            value={characters.length > 0
              ? (characters.reduce((s, c) => s + c.nivel, 0) / characters.length).toFixed(1)
              : '—'
            }
          />
          <StatCard
            label="Clases"
            value={new Set(characters.map(c => c.clase)).size.toString()}
          />
          <StatCard
            label="Razas"
            value={new Set(characters.map(c => c.raza)).size.toString()}
          />
        </div>
      )}

      {/* Character grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin h-8 w-8 text-[#8f3d38]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
          </svg>
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

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl p-4 text-center" style={{
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-[10px] text-[#6C6746] uppercase tracking-wider mt-1">{label}</div>
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
      className="group rounded-xl border transition-all duration-300 hover:border-[rgba(178,172,136,0.4)] hover:shadow-[0_0_20px_rgba(143,61,56,0.1)]"
      style={{
        background: '#323021',
        borderColor: '#514D35',
        animationDelay: `${index * 0.05}s`,
      }}
    >
      <a href={`/app/characters/view?id=${character.id}`} className="block p-5">
        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{
            background: 'rgba(143,61,56,0.12)',
            border: '1px solid rgba(143,61,56,0.25)',
          }}>
            {character.avatarUri ? (
              <img src={character.avatarUri} alt="" className="w-full h-full rounded-xl object-cover" />
            ) : (
              icon
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-white truncate group-hover:text-[#CDC9B2] transition-colors">
              {character.nombre}
            </h3>
            <p className="text-sm text-[#AAA37B] mt-0.5">
              {raceName} — {className}
            </p>
            <div className="flex items-center gap-3 mt-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: 'rgba(143,61,56,0.12)', color: '#ef9a97', border: '1px solid rgba(143,61,56,0.25)' }}>
                Nv. {character.nivel}
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="w-8 h-8 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#807953" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      </a>

      {/* Delete button */}
      <div className="px-5 pb-4 pt-0">
        <button
          onClick={(e) => { e.preventDefault(); onDelete(); }}
          className={`text-xs transition-all duration-200 ${
            deleteConfirm
              ? 'text-red-400 font-semibold'
              : 'text-[#807953] hover:text-red-400'
          }`}
        >
          {deleteConfirm ? '¿Confirmar eliminación?' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
}

function EmptyState({ hasCharacters }: { hasCharacters: boolean }) {
  return (
    <div className="text-center py-20">
      <div className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center" style={{
        background: 'rgba(143,61,56,0.08)',
        border: '1px solid rgba(143,61,56,0.15)',
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(143,61,56,0.5)" strokeWidth="1.5">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">
        {hasCharacters ? 'Sin resultados' : 'Sin personajes'}
      </h3>
      <p className="text-sm text-[#AAA37B] mb-6 max-w-sm mx-auto">
        {hasCharacters
          ? 'No se encontraron personajes con ese filtro.'
          : 'Crea tu primer personaje para empezar tu aventura.'}
      </p>
      {!hasCharacters && (
        <a href="/app/characters/create" className="btn-gold text-sm !px-6 !py-3 rounded-lg inline-flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Crear personaje
        </a>
      )}
    </div>
  );
}
