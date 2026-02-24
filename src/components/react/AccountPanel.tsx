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
      <div className="flex items-center justify-center py-20">
        <svg className="animate-spin h-8 w-8 text-[#8f3d38]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = '/login';
    return null;
  }

  return (
    <div className="animate-fade-in max-w-lg mx-auto px-4 sm:px-6 py-8">
      <h1 className="text-2xl font-display font-bold text-white mb-2">Cuenta</h1>
      <p className="text-sm text-[#AAA37B] mb-8">Gestiona tu perfil y sesión</p>

      {/* Profile card */}
      <div className="dymes-card p-6 mb-6">
        <div className="flex items-center gap-4">
          {profile?.avatar_url ? (
            <img
              src={profile.avatar_url}
              alt="Avatar"
              className="w-14 h-14 rounded-full border-2 border-[#514D35]"
            />
          ) : (
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-display font-bold text-[#CDC9B2]"
              style={{ background: 'rgba(143,61,56,0.15)', border: '2px solid rgba(143,61,56,0.3)' }}
            >
              {(profile?.nombre ?? user?.email)?.[0]?.toUpperCase() ?? '?'}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-display font-semibold text-white truncate">
              {profile?.nombre ?? 'Aventurero'}
            </h2>
            <p className="text-xs text-[#807953] truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Session info */}
      <div className="dymes-card divide-y divide-[rgba(255,255,255,0.06)] mb-6">
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-[#AAA37B]">Proveedor</div>
          <div className="text-sm text-white font-medium">
            {user?.app_metadata?.provider === 'google' ? '🔵 Google' : '📧 Email'}
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="text-sm text-[#AAA37B]">Estado</div>
          <div className="flex items-center gap-2 text-sm text-[#22c55e]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e]" />
            Conectado
          </div>
        </div>
        {profile?.codigo_jugador && (
          <div className="flex items-center justify-between p-4">
            <div className="text-sm text-[#AAA37B]">Código de jugador</div>
            <div className="text-sm text-white font-mono">{profile.codigo_jugador}</div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="dymes-card p-5">
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-sm font-semibold text-white transition-colors disabled:opacity-50"
          style={{ background: 'rgba(143,61,56,0.3)', border: '1px solid rgba(143,61,56,0.4)' }}
        >
          {signingOut ? (
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>
          )}
          Cerrar sesión
        </button>
      </div>
    </div>
  );
}
