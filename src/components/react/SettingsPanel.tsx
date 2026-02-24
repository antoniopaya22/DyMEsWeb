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
      {/* Atmospheric glow */}
      <div className="absolute -top-16 -right-16 w-60 h-60 rounded-full opacity-[0.03] pointer-events-none" style={{ background: 'radial-gradient(circle, #8f3d38, transparent 70%)' }} />

      <h1 className="text-3xl font-display font-bold text-white mb-3 tracking-wide">Ajustes</h1>
      <p className="text-sm text-[#AAA37B] mb-10 font-light">Personaliza la aplicación a tu gusto</p>

      {/* Theme */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 text-sm font-display font-semibold text-[#CDC9B2] uppercase tracking-widest mb-4">
          <span>🎨</span> Apariencia
        </h2>
        <div className="dymes-section-card">
          <label className="block text-sm text-[#AAA37B] mb-4 font-light">Tema de la interfaz</label>
          <div className="flex gap-2.5">
            {([
              { key: 'oscuro' as ThemeMode, label: '🌙 Oscuro' },
              { key: 'claro' as ThemeMode, label: '☀️ Claro' },
              { key: 'auto' as ThemeMode, label: '💻 Auto' },
            ]).map(opt => {
              const active = settings.tema === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setTheme(opt.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active ? 'text-white' : 'text-[#807953] hover:text-[#AAA37B]'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
                    border: '1px solid rgba(143,61,56,0.35)',
                    boxShadow: '0 2px 12px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                  } : {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Units */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 text-sm font-display font-semibold text-[#CDC9B2] uppercase tracking-widest mb-4">
          <span>📏</span> Unidades
        </h2>
        <div className="dymes-section-card">
          <label className="block text-sm text-[#AAA37B] mb-4 font-light">Sistema de medidas</label>
          <div className="flex gap-2.5">
            {([
              { key: 'metrico' as UnitSystem, label: '📏 Métrico (m, kg)' },
              { key: 'imperial' as UnitSystem, label: '📐 Imperial (pies, lb)' },
            ]).map(opt => {
              const active = settings.unidades === opt.key;
              return (
                <button
                  key={opt.key}
                  onClick={() => setUnits(opt.key)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    active ? 'text-white' : 'text-[#807953] hover:text-[#AAA37B]'
                  }`}
                  style={active ? {
                    background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
                    border: '1px solid rgba(143,61,56,0.35)',
                    boxShadow: '0 2px 12px rgba(143,61,56,0.15), inset 0 1px 0 rgba(255,255,255,0.05)',
                  } : {
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Optional Rules */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 text-sm font-display font-semibold text-[#CDC9B2] uppercase tracking-widest mb-4">
          <span>📜</span> Reglas Opcionales
        </h2>
        <div className="dymes-section-card !p-0 overflow-hidden">
          {(Object.keys(OPTIONAL_RULE_LABELS) as (keyof OptionalRules)[]).map((rule, i, arr) => {
            const { label, desc } = OPTIONAL_RULE_LABELS[rule];
            const enabled = settings.reglasOpcionales[rule];
            return (
              <div key={rule}>
                <div className="flex items-center justify-between p-5 gap-4 transition-colors duration-200 hover:bg-white/[.02]">
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white">{label}</div>
                    <div className="text-xs text-[#807953] mt-1 leading-relaxed">{desc}</div>
                  </div>
                  <button
                    onClick={() => toggleOptionalRule(rule)}
                    className="relative w-12 h-7 rounded-full transition-all duration-300 flex-shrink-0"
                    style={{
                      background: enabled
                        ? 'linear-gradient(135deg, rgba(143,61,56,0.8), rgba(143,61,56,0.6))'
                        : 'rgba(81,77,53,0.4)',
                      boxShadow: enabled
                        ? '0 2px 8px rgba(143,61,56,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                        : 'inset 0 1px 3px rgba(0,0,0,0.2)',
                    }}
                  >
                    <span className={`absolute top-1 w-5 h-5 rounded-full shadow-md transition-all duration-300 ${
                      enabled ? 'left-[26px]' : 'left-1'
                    }`} style={{
                      background: enabled ? '#fff' : 'rgba(255,255,255,0.6)',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    }} />
                  </button>
                </div>
                {i < arr.length - 1 && (
                  <div className="mx-5 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(81,77,53,0.25), transparent)' }} />
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Data management */}
      <section className="mb-8">
        <h2 className="flex items-center gap-2.5 text-sm font-display font-semibold text-[#CDC9B2] uppercase tracking-widest mb-4">
          <span>💾</span> Datos
        </h2>
        <div className="dymes-section-card">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Restablecer ajustes</div>
              <div className="text-xs text-[#807953] mt-1 leading-relaxed">Vuelve a los valores predeterminados</div>
            </div>
            <button
              onClick={resetSettings}
              className="btn-ghost text-xs !px-5 !py-2.5 rounded-xl"
            >
              Restablecer
            </button>
          </div>
        </div>
      </section>

      {/* App Info */}
      <div className="dymes-divider my-8" />
      <div className="text-center py-4">
        <p className="text-xs text-[#807953] font-light">DyMEs v1.0.0 · Versión Web</p>
        <p className="text-xs text-[#807953] mt-1.5 font-light">D&D 5e Companion App</p>
      </div>
    </div>
  );
}
