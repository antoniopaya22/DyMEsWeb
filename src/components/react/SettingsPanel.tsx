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
    <div className="animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-display font-bold text-white mb-2">Ajustes</h1>
      <p className="text-sm text-[#AAA37B] mb-8">Personaliza la aplicación a tu gusto</p>

      {/* Theme */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[#CDC9B2] uppercase tracking-wider mb-3">Apariencia</h2>
        <div className="rounded-xl border p-5" style={{ background: '#323021', borderColor: '#514D35' }}>
          <label className="block text-sm text-[#AAA37B] mb-3">Tema</label>
          <div className="flex gap-2">
            {([
              { key: 'oscuro' as ThemeMode, label: '🌙 Oscuro' },
              { key: 'claro' as ThemeMode, label: '☀️ Claro' },
              { key: 'auto' as ThemeMode, label: '💻 Auto' },
            ]).map(opt => (
              <button
                key={opt.key}
                onClick={() => setTheme(opt.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  settings.tema === opt.key
                    ? 'text-white'
                    : 'text-[#807953] hover:text-[#AAA37B]'
                }`}
                style={settings.tema === opt.key ? {
                  background: 'rgba(143,61,56,0.15)',
                  border: '1px solid rgba(143,61,56,0.3)',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Units */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[#CDC9B2] uppercase tracking-wider mb-3">Unidades</h2>
        <div className="rounded-xl border p-5" style={{ background: '#323021', borderColor: '#514D35' }}>
          <label className="block text-sm text-[#AAA37B] mb-3">Sistema de medidas</label>
          <div className="flex gap-2">
            {([
              { key: 'metrico' as UnitSystem, label: '📏 Métrico (m, kg)' },
              { key: 'imperial' as UnitSystem, label: '📐 Imperial (pies, lb)' },
            ]).map(opt => (
              <button
                key={opt.key}
                onClick={() => setUnits(opt.key)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  settings.unidades === opt.key
                    ? 'text-white'
                    : 'text-[#807953] hover:text-[#AAA37B]'
                }`}
                style={settings.unidades === opt.key ? {
                  background: 'rgba(143,61,56,0.15)',
                  border: '1px solid rgba(143,61,56,0.3)',
                } : {
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Rules */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[#CDC9B2] uppercase tracking-wider mb-3">Reglas Opcionales</h2>
        <div className="rounded-xl border divide-y divide-[rgba(255,255,255,0.06)]" style={{ background: '#323021', borderColor: '#514D35' }}>
          {(Object.keys(OPTIONAL_RULE_LABELS) as (keyof OptionalRules)[]).map(rule => {
            const { label, desc } = OPTIONAL_RULE_LABELS[rule];
            const enabled = settings.reglasOpcionales[rule];
            return (
              <div key={rule} className="flex items-center justify-between p-4 gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white">{label}</div>
                  <div className="text-xs text-[#807953] mt-0.5">{desc}</div>
                </div>
                <button
                  onClick={() => toggleOptionalRule(rule)}
                  className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                    enabled ? 'bg-[#8f3d38]' : 'bg-[#514D35]'
                  }`}
                >
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                    enabled ? 'left-[22px]' : 'left-0.5'
                  }`} />
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Data management */}
      <section className="mb-8">
        <h2 className="text-sm font-semibold text-[#CDC9B2] uppercase tracking-wider mb-3">Datos</h2>
        <div className="rounded-xl border p-5 space-y-4" style={{ background: '#323021', borderColor: '#514D35' }}>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">Restablecer ajustes</div>
              <div className="text-xs text-[#807953] mt-0.5">Vuelve a los valores predeterminados</div>
            </div>
            <button
              onClick={resetSettings}
              className="btn-ghost text-xs !px-4 !py-2 rounded-lg"
            >
              Restablecer
            </button>
          </div>
        </div>
      </section>

      {/* App Info */}
      <div className="text-center py-4">
        <p className="text-xs text-[#807953]">DyMEs v1.0.0 · Versión Web</p>
        <p className="text-xs text-[#807953] mt-1">D&D 5e Companion App</p>
      </div>
    </div>
  );
}
