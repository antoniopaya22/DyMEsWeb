import { useEffect, useState } from 'react';
import { useAuthStore, selectIsAuthenticated } from '../../stores/authStore';

export default function AccountPanel() {
  const { user, profile, session, signOut, initialize, initialized } = useAuthStore();
  const isAuthenticated = useAuthStore(selectIsAuthenticated);
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => { if (!initialized) initialize(); }, []);

  async function handleSignOut() {
    setSigningOut(true);
    await signOut();
    window.location.href = '/login';
  }

  if (!initialized) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-[#514D35] border-t-[#8f3d38] animate-spin" />
        <p className="text-sm app-text-faint">Cargando cuenta...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  const userName = profile?.nombre ?? user?.email?.split('@')[0] ?? 'Aventurero';
  const provider = user?.app_metadata?.provider === 'google' ? 'Google' : 'Email';

  return (
    <div className="animate-fade-in max-w-2xl mx-auto relative">
      {/* ── Header Banner ── */}
      <div className="relative overflow-hidden rounded-2xl mb-8" style={{
        background: 'var(--app-banner-bg)',
        border: '1px solid var(--app-border)',
      }}>
        <div className="absolute top-0 right-0 w-64 h-64 opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, rgba(143,61,56,0.25) 50%, transparent 90%)' }} />

        <div className="relative px-6 sm:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-5">
            {profile?.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover shrink-0"
                style={{
                  border: '2px solid rgba(143,61,56,0.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 12px rgba(143,61,56,0.1)',
                }}
              />
            ) : (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl font-display font-bold app-text-secondary shrink-0" style={{
                background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
                border: '2px solid rgba(143,61,56,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 12px rgba(143,61,56,0.1)',
              }}>
                {userName[0]?.toUpperCase() ?? '?'}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl font-display font-bold app-text truncate">{userName}</h1>
              <p className="text-sm app-text-muted mt-1 truncate">{user?.email}</p>
              <div className="flex items-center gap-3 mt-3">
                <span className="inline-flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(34,197,94,0.4)]" />
                  Conectado
                </span>
                <span className="text-[#514D35]">·</span>
                <span className="text-[11px] app-text-faint">vía {provider}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Session Info ── */}
      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <InfoCard icon="📧" label="Proveedor" value={provider} detail={provider === 'Google' ? 'OAuth 2.0' : 'Email y contraseña'} />
        {profile?.codigo_jugador && (
          <InfoCard icon="🎲" label="Código de jugador" value={profile.codigo_jugador} mono detail="Comparte este código con tu Master" />
        )}
      </div>

      {/* ── Quick Links ── */}
      <div className="rounded-xl overflow-hidden mb-6" style={{
        background: 'var(--app-surface-gradient)',
        border: '1px solid var(--app-border-subtle)',
      }}>
        <a href="/app/settings" className="flex items-center gap-3 px-5 py-4 transition-colors group" style={{ background: 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--app-hover-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{
            background: 'var(--app-input-bg)',
            border: '1px solid var(--app-input-border)',
          }}>⚙️</div>
          <div className="flex-1">
            <span className="text-[13px] app-text font-medium transition-colors">Ajustes de la aplicación</span>
            <p className="text-[11px] app-text-faint mt-0.5">Tema, unidades y reglas opcionales</p>
          </div>
          <svg className="w-4 h-4 text-[#514D35] group-hover:text-[#807953] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m9 18 6-6-6-6"/></svg>
        </a>
        <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--app-border-subtle), transparent)' }} />
        <a href="/compendio" target="_blank" className="flex items-center gap-3 px-5 py-4 transition-colors group" style={{ background: 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--app-hover-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base" style={{
            background: 'var(--app-input-bg)',
            border: '1px solid var(--app-input-border)',
          }}>📚</div>
          <div className="flex-1">
            <span className="text-[13px] app-text font-medium transition-colors">Compendio SRD público</span>
            <p className="text-[11px] app-text-faint mt-0.5">Abrir referencia completa en nueva pestaña</p>
          </div>
          <svg className="w-4 h-4 text-[#514D35] group-hover:text-[#807953] transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
      </div>

      {/* ── Danger Zone ── */}
      <div className="rounded-xl overflow-hidden" style={{
        background: 'var(--app-surface-gradient)',
        border: '1px solid var(--app-border-subtle)',
      }}>
        <div className="px-5 py-3" style={{ borderBottom: '1px solid var(--app-border-subtle)' }}>
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold" style={{ color: 'var(--app-text-faint)', opacity: 0.7 }}>Sesión</span>
        </div>
        <div className="p-5">
          <button
            onClick={handleSignOut}
            disabled={signingOut}
            className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 hover:brightness-110 active:scale-[0.98]"
            style={{
              background: 'linear-gradient(135deg, rgba(143,61,56,0.3), rgba(143,61,56,0.18))',
              border: '1px solid rgba(143,61,56,0.35)',
              boxShadow: '0 2px 12px rgba(143,61,56,0.12)',
            }}
          >
            {signingOut ? (
              <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            )}
            {signingOut ? 'Cerrando sesión...' : 'Cerrar sesión'}
          </button>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, label, value, detail, mono }: { icon: string; label: string; value: string; detail?: string; mono?: boolean }) {
  return (
    <div className="rounded-xl px-5 py-4 transition-all duration-200" style={{
      background: 'var(--app-surface-gradient)',
      border: '1px solid var(--app-border-subtle)',
    }}>
      <div className="flex items-center gap-3">
        <span className="text-base">{icon}</span>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] uppercase tracking-[0.12em] font-semibold mb-1" style={{ color: 'var(--app-text-faint)', opacity: 0.7 }}>{label}</div>
          <div className={`text-[15px] app-text font-medium truncate ${mono ? 'font-mono tracking-wider' : ''}`}>{value}</div>
          {detail && <p className="text-[10px] app-text-faint mt-1">{detail}</p>}
        </div>
      </div>
    </div>
  );
}
