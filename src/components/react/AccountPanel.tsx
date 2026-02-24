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
        <p className="text-sm text-[#807953]">Cargando cuenta...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto px-4 sm:px-6 py-8 relative">
      {/* Atmospheric glow */}
      <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-60 h-60 rounded-full opacity-[0.04] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />

      <h1 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">Cuenta</h1>
      <p className="text-sm text-[#AAA37B] mb-10 font-light">Gestiona tu perfil y sesión</p>

      {/* Profile card */}
      <div className="dymes-section-card !p-6 mb-6">
        <div className="flex items-center gap-5">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-16 h-16 rounded-2xl object-cover"
              style={{
                border: '2px solid rgba(143,61,56,0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 12px rgba(143,61,56,0.1)',
              }}
            />
          ) : (
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-display font-bold text-[#CDC9B2]" style={{
              background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
              border: '2px solid rgba(143,61,56,0.3)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 12px rgba(143,61,56,0.1)',
            }}>
              {(profile?.nombre ?? user?.email)?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-display font-semibold text-white truncate">
              {profile?.nombre ?? 'Aventurero'}
            </h2>
            <p className="text-xs text-[#807953] truncate mt-1">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Session info */}
      <div className="dymes-section-card !p-0 overflow-hidden mb-6">
        <div className="flex items-center justify-between p-5 hover:bg-white/[.02] transition-colors">
          <div className="text-sm text-[#AAA37B]">Proveedor</div>
          <div className="text-sm text-white font-medium flex items-center gap-2">
            {user?.app_metadata?.provider === 'google' ? (
              <>
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{
                  background: 'rgba(59,130,246,0.15)',
                  border: '1px solid rgba(59,130,246,0.25)',
                }}>G</span>
                Google
              </>
            ) : (
              <>
                <span className="text-xs">📧</span>
                Email
              </>
            )}
          </div>
        </div>
        <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(81,77,53,0.25), transparent)' }} />
        <div className="flex items-center justify-between p-5 hover:bg-white/[.02] transition-colors">
          <div className="text-sm text-[#AAA37B]">Estado</div>
          <div className="flex items-center gap-2.5 text-sm text-[#22c55e] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            Conectado
          </div>
        </div>
        {profile?.codigo_jugador && (
          <>
            <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(81,77,53,0.25), transparent)' }} />
            <div className="flex items-center justify-between p-5 hover:bg-white/[.02] transition-colors">
              <div className="text-sm text-[#AAA37B]">Código de jugador</div>
              <div className="text-sm text-white font-mono px-3 py-1 rounded-lg" style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)',
              }}>{profile.codigo_jugador}</div>
            </div>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="dymes-section-card !p-5">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-center gap-2.5 px-4 py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 hover:brightness-110 active:scale-[0.98]"
          style={{
            background: 'linear-gradient(135deg, rgba(143,61,56,0.35), rgba(143,61,56,0.2))',
            border: '1px solid rgba(143,61,56,0.4)',
            boxShadow: '0 2px 12px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
          }}
        >
          {signingOut ? (
            <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          )}
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
