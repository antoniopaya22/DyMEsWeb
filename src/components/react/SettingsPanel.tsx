import { useEffect } from 'react';
import { useSettingsStore, type ThemeMode, type UnitSystem, type OptionalRules } from '../../stores/settingsStore';

const OPTIONAL_RULE_LABELS: Record<keyof OptionalRules, { label: string; desc: string }> = {
  dotesActivas: { label: 'Dotes', desc: 'Permite a los personajes adquirir dotes al subir de nivel' },
  multiclase: { label: 'Multiclase', desc: 'Permite combinar dos o más clases' },
  pvFijos: { label: 'Puntos de vida fijos', desc: 'Usa el valor fijo en vez de tirar dados al subir de nivel' },
  compraPuntos: { label: 'Compra de puntos', desc: 'Permite asignar características con el sistema de compra de puntos' },
  encumbranceDetallada: { label: 'Carga detallada', desc: 'Usa reglas de encumbrance detalladas en vez de simplificadas' },
};

export default function SettingsPanel() {
  const { settings, loadSettings, setTheme, setUnits, toggleOptionalRule, resetSettings } = useSettingsStore();

  useEffect(() => { loadSettings(); }, []);

  return (
    <div className="animate-fade-in max-w-2xl relative">
      {/* ── Header Banner ── */}
      <div className="relative overflow-hidden rounded-2xl mb-8" style={{
        background: 'var(--app-banner-bg)',
        border: '1px solid var(--app-border)',
      }}>
        <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent 10%, var(--app-border) 50%, transparent 90%)' }} />
        <div className="relative px-6 sm:px-8 py-6 sm:py-8">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-xl">⚙️</span>
            <p className="text-[11px] app-text-faint uppercase tracking-[0.2em]">Configuración</p>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold app-text tracking-wide">Ajustes</h1>
          <p className="text-sm app-text-muted mt-2 font-light">Personaliza la aplicación a tu gusto</p>
        </div>
      </div>

      {/* ── Appearance ── */}
      <SettingsSection icon="🎨" title="Apariencia">
        <div className="px-5 py-4">
          <label className="block text-[12px] app-text-muted mb-3">Tema de la interfaz</label>
          <div className="flex gap-2.5 flex-wrap">
            {([
              { key: 'oscuro' as ThemeMode, label: '🌙 Oscuro' },
              { key: 'claro' as ThemeMode, label: '☀️ Claro' },
              { key: 'auto' as ThemeMode, label: '💻 Auto' },
            ]).map(opt => (
              <OptionButton key={opt.key} label={opt.label} active={settings.tema === opt.key} onClick={() => setTheme(opt.key)} />
            ))}
          </div>
        </div>
      </SettingsSection>

      {/* ── Units ── */}
      <SettingsSection icon="📏" title="Unidades">
        <div className="px-5 py-4">
          <label className="block text-[12px] app-text-muted mb-3">Sistema de medidas</label>
          <div className="flex gap-2.5 flex-wrap">
            {([
              { key: 'metrico' as UnitSystem, label: '📏 Métrico (m, kg)' },
              { key: 'imperial' as UnitSystem, label: '📐 Imperial (pies, lb)' },
            ]).map(opt => (
              <OptionButton key={opt.key} label={opt.label} active={settings.unidades === opt.key} onClick={() => setUnits(opt.key)} />
            ))}
          </div>
        </div>
      </SettingsSection>

      {/* ── Optional Rules ── */}
      <SettingsSection icon="📜" title="Reglas Opcionales" noPadding>
        {(Object.keys(OPTIONAL_RULE_LABELS) as (keyof OptionalRules)[]).map((rule, i, arr) => {
          const { label, desc } = OPTIONAL_RULE_LABELS[rule];
          const enabled = settings.reglasOpcionales[rule];
          return (
            <div key={rule}>
              <div className="flex items-center justify-between px-5 py-4 gap-4 transition-colors duration-200" style={{ background: 'transparent' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--app-hover-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <div className="flex-1 min-w-0">
                  <div className="text-[13px] font-medium app-text">{label}</div>
                  <div className="text-[11px] app-text-faint mt-0.5 leading-relaxed">{desc}</div>
                </div>
                <button
                  onClick={() => toggleOptionalRule(rule)}
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
      <SettingsSection icon="💾" title="Datos">
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

      {/* ── App info footer ── */}
      <div className="mt-8 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, var(--app-divider), transparent)' }} />
          <span className="text-[10px] uppercase tracking-[0.15em] font-semibold shrink-0" style={{ color: 'var(--app-text-faint)', opacity: 0.5 }}>Información</span>
          <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, var(--app-divider))' }} />
        </div>
        <div className="text-center">
          <p className="text-[11px]" style={{ color: 'var(--app-text-faint)', opacity: 0.6 }}>DyMEs v1.0.0 · Web</p>
          <p className="text-[10px] mt-1" style={{ color: 'var(--app-text-faint)', opacity: 0.4 }}>D&D 5e Companion · SRD 5.1</p>
        </div>
      </div>
    </div>
  );
}

/* ─────────── Settings Section Wrapper ─────────── */
function SettingsSection({ icon, title, children, noPadding }: { icon: string; title: string; children: React.ReactNode; noPadding?: boolean }) {
  return (
    <section className="mb-5">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-sm">{icon}</span>
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
function OptionButton({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-xl text-[12px] font-medium transition-all duration-300 ${
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
      {label}
    </button>
  );
}
