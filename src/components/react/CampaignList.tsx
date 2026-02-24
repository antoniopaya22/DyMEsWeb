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
    <div className="animate-fade-in relative">
      {/* Atmospheric glow */}
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-display font-bold text-white tracking-wide">Campañas</h1>
          <p className="text-sm text-[#AAA37B] mt-1.5 font-light">Gestiona tus partidas y aventuras</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-gold text-sm !px-6 !py-3 rounded-xl inline-flex items-center gap-2.5 self-start group">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform group-hover:rotate-90 duration-300"><path d="M12 5v14M5 12h14"/></svg>
          Nueva Campaña
        </button>
      </div>

      {/* Search */}
      {campaigns.length > 0 && (
        <div className="mb-8">
          <div className="relative max-w-md">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#807953]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              placeholder="Buscar campañas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="dymes-input !pl-11 max-w-sm"
            />
          </div>
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="relative">
            <div className="w-12 h-12 rounded-full border-2 border-[#514D35] border-t-[#8f3d38] animate-spin" />
          </div>
          <p className="text-sm text-[#807953]">Cargando campañas...</p>
        </div>
      )}

      {/* Empty state */}
      {!loading && campaigns.length === 0 && (
        <div className="text-center py-24 relative">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-64 h-64 rounded-full opacity-[0.05]" style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }} />
          </div>
          <div className="relative">
            <div className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))',
              border: '1px solid rgba(59,130,246,0.2)',
              boxShadow: '0 8px 32px rgba(59,130,246,0.08)',
            }}>
              <span className="text-4xl">🗺️</span>
            </div>
            <h3 className="text-xl font-display font-semibold text-white mb-3">Sin campañas</h3>
            <p className="text-sm text-[#AAA37B] mb-8 max-w-sm mx-auto leading-relaxed">Crea tu primera campaña para organizar tus partidas y aventuras</p>
            <button onClick={() => setShowCreate(true)} className="btn-gold text-sm !px-8 !py-3.5 rounded-xl inline-flex items-center gap-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
              Crear Campaña
            </button>
          </div>
        </div>
      )}

      {/* Campaigns grid */}
      {!loading && filtered.length > 0 && (
        <>
          <div className="dymes-divider !mb-8" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((campaign, i) => (
              <CampaignCard
                key={campaign.id}
                campaign={campaign}
                index={i}
                onDelete={() => setDeleteId(campaign.id)}
              />
            ))}
          </div>
        </>
      )}

      {!loading && campaigns.length > 0 && filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#807953" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <p className="text-sm text-[#807953]">No se encontraron campañas para "{search}"</p>
        </div>
      )}

      {/* Create modal */}
      {showCreate && (
        <div className="dymes-modal-overlay" onClick={() => setShowCreate(false)}>
          <div className="dymes-modal-backdrop" />
          <div
            className="dymes-modal-card max-w-md animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative top accent */}
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,61,56,0.4), rgba(178,172,136,0.2), transparent)' }} />

            <h2 className="text-xl font-display font-semibold text-white mb-6">Nueva Campaña</h2>
            <div className="space-y-5">
              <div>
                <label className="block text-xs text-[#807953] uppercase tracking-widest mb-2 font-medium">Nombre *</label>
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
                <label className="block text-xs text-[#807953] uppercase tracking-widest mb-2 font-medium">Descripción</label>
                <textarea
                  value={descripcion}
                  onChange={e => setDescripcion(e.target.value)}
                  placeholder="Notas sobre la campaña..."
                  className="dymes-input min-h-[100px] resize-y"
                  rows={3}
                />
              </div>
            </div>
            <div className="dymes-divider" />
            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setShowCreate(false)} className="btn-ghost text-sm !px-5 !py-2.5 rounded-xl">Cancelar</button>
              <button
                onClick={handleCreate}
                disabled={!nombre.trim()}
                className="btn-gold text-sm !px-6 !py-2.5 rounded-xl disabled:opacity-40"
              >
                Crear Campaña
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="dymes-modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="dymes-modal-backdrop" />
          <div
            className="dymes-modal-card max-w-sm animate-fade-in"
            onClick={e => e.stopPropagation()}
          >
            <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(239,68,68,0.3), transparent)' }} />

            <div className="w-14 h-14 rounded-2xl mx-auto mb-5 flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, rgba(239,68,68,0.12), rgba(239,68,68,0.04))',
              border: '1px solid rgba(239,68,68,0.2)',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="1.5"><path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
            </div>
            <h3 className="text-lg font-display font-semibold text-white mb-2 text-center">¿Eliminar campaña?</h3>
            <p className="text-sm text-[#AAA37B] mb-6 text-center leading-relaxed">Esta acción no se puede deshacer. Se eliminará la campaña y sus datos asociados.</p>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => setDeleteId(null)} className="btn-ghost text-sm !px-5 !py-2.5 rounded-xl">Cancelar</button>
              <button
                onClick={handleDelete}
                className="text-sm px-6 py-2.5 rounded-xl font-semibold text-white transition-all duration-300 hover:shadow-lg"
                style={{ background: 'linear-gradient(135deg, #dc2626, #ef4444)', boxShadow: '0 2px 8px rgba(239,68,68,0.3)' }}
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

function CampaignCard({ campaign, index, onDelete }: { campaign: Campaign; index: number; onDelete: () => void }) {
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
      className="group relative rounded-2xl border p-5 transition-all duration-300 cursor-pointer overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, rgba(40,38,27,0.95), rgba(28,26,18,0.9))',
        borderColor: 'rgba(81,77,53,0.3)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        animationDelay: `${index * 0.06}s`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(178,172,136,0.4)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.4), 0 0 25px rgba(143,61,56,0.08), inset 0 1px 0 rgba(255,255,255,0.05)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(81,77,53,0.3)';
        e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(178,172,136,0.2), transparent)' }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-lg" style={{
            background: 'linear-gradient(135deg, rgba(59,130,246,0.12), rgba(59,130,246,0.04))',
            border: '1px solid rgba(59,130,246,0.2)',
          }}>
            🗺️
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-display font-semibold text-white truncate group-hover:text-[#CDC9B2] transition-colors duration-300">{campaign.nombre}</h3>
            {campaign.descripcion && (
              <p className="text-xs text-[#AAA37B] mt-1 line-clamp-2 leading-relaxed">{campaign.descripcion}</p>
            )}
          </div>
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(); }}
          className="text-[#807953] hover:text-red-400 transition-all duration-300 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg hover:bg-red-400/5"
          title="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </button>
      </div>

      <div className="mt-4 pt-3" style={{ borderTop: '1px solid rgba(81,77,53,0.2)' }}>
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs">
            {campaign.personajeId ? (
              <>
                <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_4px_rgba(34,197,94,0.4)]" />
                <span className="text-[#AAA37B]">Personaje vinculado</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-[#514D35]" />
                <span className="text-[#807953]">Sin personaje</span>
              </>
            )}
          </span>
          <span className="text-[10px] text-[#807953] uppercase tracking-wider font-medium">{timeAgo(campaign.actualizadoEn)}</span>
        </div>
      </div>
    </div>
  );
}
