import { useEffect, useCallback, useState, type ReactNode } from 'react';
import { useSettingsStore, type ThemeMode, type UnitSystem, type OptionalRules } from '../../stores/settingsStore';

/* ── Lucide SVG icons ── */
const IconSettings = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconPalette = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>;
const IconRuler = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z"/><path d="m14.5 12.5 2-2"/><path d="m11.5 9.5 2-2"/><path d="m8.5 6.5 2-2"/><path d="m17.5 15.5 2-2"/></svg>;
const IconScroll = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 12h-5"/><path d="M15 8h-5"/><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2"/></svg>;
const IconSave = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/><path d="M7 3v4a1 1 0 0 0 1 1h7"/></svg>;
const IconMoon = () => <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>;
const IconSun = () => <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>;
const IconMonitor = () => <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>;

const OPTIONAL_RULE_LABELS: Record<keyof OptionalRules, { label: string; desc: string }> = {
  dotesActivas: { label: 'Dotes', desc: 'Permite a los personajes adquirir dotes al subir de nivel' },
  multiclase: { label: 'Multiclase', desc: 'Permite combinar dos o más clases' },
  pvFijos: { label: 'Puntos de vida fijos', desc: 'Usa el valor fijo en vez de tirar dados al subir de nivel' },
  compraPuntos: { label: 'Compra de puntos', desc: 'Permite asignar características con el sistema de compra de puntos' },
  encumbranceDetallada: { label: 'Carga detallada', desc: 'Usa reglas de encumbrance detalladas en vez de simplificadas' },
};

export default function SettingsPanel() {
  const { settings, loadSettings, setTheme, setUnits, toggleOptionalRule, resetSettings } = useSettingsStore();
  const [open, setOpen] = useState(false);

  useEffect(() => { loadSettings(); }, []);

  // Listen for custom event from Astro shell
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-settings', handler);
    return () => window.removeEventListener('open-settings', handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKey); document.body.style.overflow = ''; };
  }, [open]);

  const close = useCallback(() => setOpen(false), []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center" role="dialog" aria-modal="true" aria-label="Ajustes">
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'var(--app-overlay-bg)', backdropFilter: 'blur(6px)' }} onClick={close} />

      {/* Modal panel */}
      <div
        className="relative w-full max-w-lg mx-4 mt-[8vh] max-h-[80vh] rounded-2xl overflow-hidden flex flex-col animate-slide-up-sm"
        style={{
          background: 'var(--app-cmd-bg)',
          border: '1px solid var(--app-cmd-border)',
          boxShadow: 'var(--app-cmd-shadow)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: '1px solid var(--app-border-subtle)' }}>
          <div className="flex items-center gap-3">
            <span className="app-text-faint" aria-hidden="true"><IconSettings /></span>
            <h2 className="text-base font-display font-semibold app-text">Ajustes</h2>
          </div>
          <button onClick={close} className="p-1.5 rounded-lg transition-colors hover:bg-[var(--app-hover-bg)]" aria-label="Cerrar ajustes">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="app-text-faint"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-1">
      {/* ── Appearance ── */}
      <SettingsSection icon={<IconPalette />} title="Apariencia">
        <div className="px-5 py-4">
          <label className="block text-[12px] app-text-muted mb-3">Tema de la interfaz</label>
          <div className="flex gap-2.5 flex-wrap" role="radiogroup" aria-label="Tema de la interfaz">
            {([
              { key: 'oscuro' as ThemeMode, icon: <IconMoon />, label: 'Oscuro' },
              { key: 'claro' as ThemeMode, icon: <IconSun />, label: 'Claro' },
              { key: 'auto' as ThemeMode, icon: <IconMonitor />, label: 'Auto' },
            ]).map(opt => (
              <OptionButton key={opt.key} icon={opt.icon} label={opt.label} active={settings.tema === opt.key} onClick={() => setTheme(opt.key)} />
            ))}
          </div>
        </div>
      </SettingsSection>

      {/* ── Units ── */}
      <SettingsSection icon={<IconRuler />} title="Unidades">
        <div className="px-5 py-4">
          <label className="block text-[12px] app-text-muted mb-3">Sistema de medidas</label>
          <div className="flex gap-2.5 flex-wrap" role="radiogroup" aria-label="Sistema de medidas">
            {([
              { key: 'metrico' as UnitSystem, icon: <IconRuler />, label: 'Métrico (m, kg)' },
              { key: 'imperial' as UnitSystem, icon: <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 22 16 8"/><path d="M3.47 12.53 5 11l1.53 1.53a3.5 3.5 0 0 1 0 4.94L5 19l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M7.47 8.53 9 7l1.53 1.53a3.5 3.5 0 0 1 0 4.94L9 15l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><path d="M11.47 4.53 13 3l1.53 1.53a3.5 3.5 0 0 1 0 4.94L13 11l-1.53-1.53a3.5 3.5 0 0 1 0-4.94Z"/><line x1="20" x2="22" y1="2" y2="4"/></svg>, label: 'Imperial (pies, lb)' },
            ]).map(opt => (
              <OptionButton key={opt.key} icon={opt.icon} label={opt.label} active={settings.unidades === opt.key} onClick={() => setUnits(opt.key)} />
            ))}
          </div>
        </div>
      </SettingsSection>

      {/* ── Optional Rules ── */}
      <SettingsSection icon={<IconScroll />} title="Reglas Opcionales" noPadding>
        {(Object.keys(OPTIONAL_RULE_LABELS) as (keyof OptionalRules)[]).map((rule, i, arr) => {
          const { label, desc } = OPTIONAL_RULE_LABELS[rule];
          const enabled = settings.reglasOpcionales[rule];
          return (
            <div key={rule}>
              <div className="flex items-center justify-between px-5 py-4 gap-4 transition-colors duration-200 hover:bg-[var(--app-hover-bg)]">
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium app-text">{label}</div>
                  <div className="text-[11px] app-text-faint mt-0.5 leading-relaxed">{desc}</div>
                </div>
                <button
                  onClick={() => toggleOptionalRule(rule)}
                  role="switch"
                  aria-checked={enabled}
                  aria-label={label}
                  className="relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0"
                  style={{
                    background: enabled
                      ? 'linear-gradient(135deg, rgba(143,61,56,0.8), rgba(143,61,56,0.6))'
                      : 'rgba(81,77,53,0.35)',
                    boxShadow: enabled
                      ? '0 2px 8px rgba(143,61,56,0.25), inset 0 1px 0 rgba(255,255,255,0.1)'
                      : 'inset 0 1px 3px rgba(0,0,0,0.2)',
                  }}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                    enabled ? 'left-[22px]' : 'left-0.5'
                  }`} style={{
                    background: enabled ? '#fff' : 'rgba(255,255,255,0.55)',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                  }} />
                </button>
              </div>
              {i < arr.length - 1 && (
                <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--app-border-subtle), transparent)' }} />
              )}
            </div>
          );
        })}
      </SettingsSection>

      {/* ── Data ── */}
      <SettingsSection icon={<IconSave />} title="Datos">
        <div className="px-5 py-4 flex items-center justify-between gap-4">
          <div>
            <div className="text-[13px] font-medium app-text">Restablecer ajustes</div>
            <div className="text-[11px] app-text-faint mt-0.5">Vuelve a los valores predeterminados</div>
          </div>
          <button onClick={resetSettings} className="btn-ghost text-[12px] !px-4 !py-2 rounded-lg shrink-0">
            Restablecer
          </button>
        </div>
      </SettingsSection>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Settings Section Wrapper ─────────── */
function SettingsSection({ icon, title, children, noPadding }: { icon: ReactNode; title: string; children: React.ReactNode; noPadding?: boolean }) {
  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-sm app-text-faint" aria-hidden="true">{icon}</span>
        <h2 className="text-[10px] font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--app-text-faint)', opacity: 0.7 }}>{title}</h2>
      </div>
      <div className={`rounded-xl overflow-hidden ${noPadding ? '' : ''}`} style={{
        background: 'var(--app-surface-gradient)',
        border: '1px solid var(--app-border-subtle)',
      }}>
        {children}
      </div>
    </section>
  );
}

/* ─────────── Option Button ─────────── */
function OptionButton({ icon, label, active, onClick }: { icon?: ReactNode; label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      role="radio"
      aria-checked={active}
      className={`px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-300 inline-flex items-center gap-1.5 ${
        active ? 'app-text' : 'app-text-faint'
      }`}
      style={active ? {
        background: 'linear-gradient(135deg, rgba(143,61,56,0.18), rgba(143,61,56,0.08))',
        border: '1px solid rgba(143,61,56,0.3)',
        boxShadow: '0 2px 10px rgba(143,61,56,0.12)',
      } : {
        background: 'var(--app-input-bg)',
        border: '1px solid var(--app-input-border)',
      }}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </button>
  );
}
