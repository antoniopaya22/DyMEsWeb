import { useEffect, useState } from 'react';
import { useCampaignStore } from '../../stores/campaignStore';
import type { Campaign } from '../../types/campaign';

export default function CampaignList() {
  const { campaigns, loading, loadCampaigns, createCampaign, deleteCampaign } = useCampaignStore();
  const [showCreate, setShowCreate] = useState(false);
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => { loadCampaigns(); }, []);

  const filtered = campaigns.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  function handleCreate() {
    if (!nombre.trim()) return;
    createCampaign({ nombre, descripcion });
    setNombre('');
    setDescripcion('');
    setShowCreate(false);
  }

  function handleDelete() {
    if (deleteId) {
      deleteCampaign(deleteId);
      setDeleteId(null);
    }
  }

  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Ahora mismo';
    if (mins < 60) return `Hace ${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `Hace ${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `Hace ${days}d`;
  }

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-display font-bold text-white">Campañas</h1>
          <p className="text-sm text-[#AAA37B] mt-1">Gestiona tus partidas de D&D</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-gold text-sm !px-5 !py-2.5 rounded-lg inline-flex items-center gap-2 self-start">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
          Nueva Campaña
        </button>
      </div>

      {/* Search */}
      {campaigns.length > 0 && (
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar campañas..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="dymes-input max-w-sm"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#514D35] border-t-[#CDC9B2] rounded-full animate-spin" />
        </div>
      )}

      {/* Empty state */}
      {!loading && campaigns.length === 0 && (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🗺️</div>
          <h3 className="text-lg font-display font-semibold text-[#CDC9B2] mb-2">Sin campañas</h3>
          <p className="text-sm text-[#807953] mb-6 max-w-sm mx-auto">Crea tu primera campaña para organizar tus partidas y personajes</p>
          <button onClick={() => setShowCreate(true)} className="btn-gold text-sm !px-6 !py-2.5 rounded-lg inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Crear Campaña
          </button>
        </div>
      )}

      {/* Campaigns grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(campaign => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onDelete={() => setDeleteId(campaign.id)}
            />
          ))}
        </div>
      )}

      {!loading && campaigns.length > 0 && filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-[#807953]">No se encontraron campañas para "{search}"</p>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowCreate(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-md rounded-xl border p-6 animate-fade-in"
            style={{ background: '#323021', borderColor: '#514D35' }}
            onClick={e => e.stopPropagation()}
          >
            <h2 className="text-lg font-display font-semibold text-[#CDC9B2] mb-4">Nueva Campaña</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#807953] uppercase tracking-wider mb-1.5">Nombre *</label>
                <input
                  type="text"
                  value={nombre}
                  onChange={e => setNombre(e.target.value)}
                  placeholder="Ej: La Maldición de Strahd"
                  className="dymes-input"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-xs text-[#807953] uppercase tracking-wider mb-1.5">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  placeholder="Notas sobre la campaña..."
                  className="dymes-input min-h-[80px] resize-y"
                  rows={3}
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button onClick={() => setShowCreate(false)} className="btn-ghost text-sm !px-4 !py-2 rounded-lg">Cancelar</button>
              <button
                onClick={handleCreate}
                disabled={!nombre.trim()}
                className="btn-gold text-sm !px-5 !py-2 rounded-lg disabled:opacity-40"
              >
                Crear
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setDeleteId(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm rounded-xl border p-6 animate-fade-in"
            style={{ background: '#323021', borderColor: '#514D35' }}
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-lg font-display font-semibold text-[#CDC9B2] mb-2">¿Eliminar campaña?</h3>
            <p className="text-sm text-[#AAA37B] mb-6">Esta acción no se puede deshacer. Se eliminará la campaña y sus datos asociados.</p>
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-ghost text-sm !px-4 !py-2 rounded-lg">Cancelar</button>
              <button
                onClick={handleDelete}
                className="text-sm px-5 py-2 rounded-lg font-semibold text-white transition-colors"
                style={{ background: '#8f3d38' }}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CampaignCard({ campaign, onDelete }: { campaign: Campaign; onDelete: () => void }) {
  function timeAgo(dateStr: string): string {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Ahora';
    if (mins < 60) return `${mins}m`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h`;
    const days = Math.floor(hrs / 24);
    return `${days}d`;
  }

  return (
    <div
      className="group rounded-xl border p-5 transition-all duration-200 hover:border-[rgba(178,172,136,0.3)] hover:shadow-lg cursor-pointer"
      style={{
        background: 'rgba(50,48,33,0.8)',
        borderColor: 'rgba(81,77,53,0.5)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-display font-semibold text-white truncate">{campaign.nombre}</h3>
          {campaign.descripcion && (
            <p className="text-xs text-[#AAA37B] mt-1 line-clamp-2">{campaign.descripcion}</p>
          )}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-[#807953] hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 p-1"
          title="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3 mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#807953]">
          {campaign.personajeId ? (
            <>
              <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
              Personaje vinculado
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-[#807953]" />
              Sin personaje
            </>
          )}
        </span>
        <span className="ml-auto text-xs text-[#807953]">{timeAgo(campaign.actualizadoEn)}</span>
      </div>
    </div>
  );
}
