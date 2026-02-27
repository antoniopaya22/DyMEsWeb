import { useState, useMemo, useCallback } from 'react';

// ─── SRD Summary Data ────────────────────────────────────────────────

interface SrdEntry {
  id: string;
  nombre: string;
  icon: string;
  descripcion: string;
  details: { label: string; value: string }[];
}

const RACES: SrdEntry[] = [
  { id: 'humano', nombre: 'Humano', icon: 'fa-solid fa-user', descripcion: 'Los humanos son los más adaptables y ambiciosos de las razas comunes. Sus características varían enormemente dependiendo de dónde vivan.',
    details: [{ label: 'Bonificación', value: '+1 a todas las características' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Tamaño', value: 'Mediano' }, { label: 'Idiomas', value: 'Común + 1 adicional' }] },
  { id: 'elfo', nombre: 'Elfo', icon: 'fa-solid fa-hat-wizard', descripcion: 'Los elfos son un pueblo mágico de gracia sobrenatural que habitan el mundo sin pertenecer del todo a él.',
    details: [{ label: 'Bonificación', value: 'DES +2' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Sentidos agudos, Ancestros feéricos, Trance' }] },
  { id: 'enano', nombre: 'Enano', icon: 'fa-solid fa-hammer', descripcion: 'Los enanos son gente robusta y corpulenta, tan estoicos y firmes como las montañas que adoran.',
    details: [{ label: 'Bonificación', value: 'CON +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Resistencia enana, Entrenamiento de combate, Dominio con herramientas, Afinidad con la piedra' }] },
  { id: 'mediano', nombre: 'Mediano', icon: 'fa-solid fa-clover', descripcion: 'Los medianos son gente práctica y menuda que no desean aventuras ni la gloria.',
    details: [{ label: 'Bonificación', value: 'DES +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Tamaño', value: 'Pequeño' }, { label: 'Rasgos', value: 'Afortunado, Valiente, Agilidad mediana' }] },
  { id: 'draconido', nombre: 'Dracónido', icon: 'fa-solid fa-dragon', descripcion: 'Los dracónidos poseen su propia estirpe orgullosa y creen fervientemente que fueron creados por los propios dioses dragón.',
    details: [{ label: 'Bonificación', value: 'FUE +2, CAR +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Rasgos', value: 'Linaje dracónico, Arma de aliento, Resistencia al daño' }] },
  { id: 'gnomo', nombre: 'Gnomo', icon: 'fa-solid fa-screwdriver-wrench', descripcion: 'Los gnomos son seres llenos de energía y entusiasmo, siempre curiosos y deseosos de aprender.',
    details: [{ label: 'Bonificación', value: 'INT +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Astucia gnómica' }] },
  { id: 'semielfo', nombre: 'Semielfo', icon: 'fa-solid fa-leaf', descripcion: 'Los semielfos combinan las mejores cualidades de sus progenitores elficos y humanos.',
    details: [{ label: 'Bonificación', value: 'CAR +2, dos +1 a elección' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Ancestros feéricos, Versatilidad en habilidades' }] },
  { id: 'semiorco', nombre: 'Semiorco', icon: 'fa-solid fa-hand-fist', descripcion: 'Los semiorcos combinan la fuerza de sus ancestros orcos con la tenacidad humana.',
    details: [{ label: 'Bonificación', value: 'FUE +2, CON +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Amenazante, Resistencia incesante, Ataques salvajes' }] },
  { id: 'tiefling', nombre: 'Tiefling', icon: 'fa-solid fa-fire', descripcion: 'Los tieflings descienden de linajes humanos que han sido tocados por la esencia de los Nueve Infiernos.',
    details: [{ label: 'Bonificación', value: 'CAR +2, INT +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Resistencia infernal, Legado infernal (taumaturgia, represión infernal, oscuridad)' }] },
];

const CLASSES: SrdEntry[] = [
  { id: 'barbaro', nombre: 'Bárbaro', icon: 'fa-solid fa-hand-back-fist', descripcion: 'Un fiero guerrero de origen primitivo que puede entrar en frenesí de batalla.',
    details: [{ label: 'Dado de golpe', value: 'd12' }, { label: 'Salvaciones', value: 'FUE, CON' }, { label: 'Armaduras', value: 'Ligeras, medias, escudos' }, { label: 'Armas', value: 'Armas sencillas, armas marciales' }] },
  { id: 'bardo', nombre: 'Bardo', icon: 'fa-solid fa-music', descripcion: 'Un maestro inspirador de la música, la magia y el combate cuyas palabras infunden poder.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'DES, CAR' }, { label: 'Magia', value: 'Lanzador completo (CAR)' }, { label: 'Rasgos', value: 'Inspiración de bardo, Bribón experto' }] },
  { id: 'brujo', nombre: 'Brujo', icon: 'fa-solid fa-moon', descripcion: 'Un wielder de la magia derivada de un pacto con una entidad extraplanar.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Magia de pacto (CAR)' }, { label: 'Rasgos', value: 'Patrón de ultratumba, Magia de pacto, Invocaciones sobrenaturales' }] },
  { id: 'clerigo', nombre: 'Clérigo', icon: 'fa-solid fa-cross', descripcion: 'Un campeón sacerdotal que empuña la magia divina al servicio de un poder superior.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Lanzador completo (SAB)' }, { label: 'Rasgos', value: 'Dominio divino, Canalizar divinidad' }] },
  { id: 'druida', nombre: 'Druida', icon: 'fa-solid fa-tree', descripcion: 'Un sacerdote de la Vieja Fe, con poder sobre la naturaleza y capaz de tomar forma animal.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'INT, SAB' }, { label: 'Magia', value: 'Lanzador completo (SAB)' }, { label: 'Rasgos', value: 'Druídico, Forma salvaje' }] },
  { id: 'explorador', nombre: 'Explorador', icon: 'fa-solid fa-bullseye', descripcion: 'Un guerrero que utiliza la destreza marcial y la magia de la naturaleza para combatir amenazas.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'FUE, DES' }, { label: 'Magia', value: 'Medio lanzador (SAB)' }, { label: 'Rasgos', value: 'Enemigo predilecto, Explorador natural' }] },
  { id: 'guerrero', nombre: 'Guerrero', icon: 'fa-solid fa-shield-halved', descripcion: 'Un maestro del combate marcial con una variedad de armas y armaduras.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'FUE, CON' }, { label: 'Armaduras', value: 'Todas las armaduras, escudos' }, { label: 'Rasgos', value: 'Estilo de combate, Tomar aliento, Acción de oleada' }] },
  { id: 'hechicero', nombre: 'Hechicero', icon: 'fa-solid fa-wand-sparkles', descripcion: 'Un lanzador de conjuros que obtiene su magia inherente de un linaje o don sobrenatural.',
    details: [{ label: 'Dado de golpe', value: 'd6' }, { label: 'Salvaciones', value: 'CON, CAR' }, { label: 'Magia', value: 'Lanzador completo (CAR)' }, { label: 'Rasgos', value: 'Origen de hechicería, Fuente de magia, Metamagia' }] },
  { id: 'mago', nombre: 'Mago', icon: 'fa-solid fa-book-open', descripcion: 'Un usuario erudito de la magia arcana capaz de manipular las estructuras de la realidad.',
    details: [{ label: 'Dado de golpe', value: 'd6' }, { label: 'Salvaciones', value: 'INT, SAB' }, { label: 'Magia', value: 'Lanzador completo (INT)' }, { label: 'Rasgos', value: 'Recuperación arcana, Tradición arcana, Libro de conjuros' }] },
  { id: 'monje', nombre: 'Monje', icon: 'fa-solid fa-yin-yang', descripcion: 'Un maestro de las artes marciales que aprovecha el poder del cuerpo en busca de la perfección.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'FUE, DES' }, { label: 'Armas', value: 'Armas sencillas, espadas cortas' }, { label: 'Rasgos', value: 'Defensa sin armadura, Artes marciales, Ki' }] },
  { id: 'paladin', nombre: 'Paladín', icon: 'fa-solid fa-sun', descripcion: 'Un santo guerrero vinculado a un juramento sagrado.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Medio lanzador (CAR)' }, { label: 'Rasgos', value: 'Sentido divino, Imposición de manos, Estilo de combate, Castigo divino' }] },
  { id: 'picaro', nombre: 'Pícaro', icon: 'fa-solid fa-user-ninja', descripcion: 'Un bribón que utiliza el sigilo y los engaños para superar los obstáculos y enemigos.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'DES, INT' }, { label: 'Rasgos', value: 'Experiencia, Ataque furtivo, Jerga de ladrones, Acción astuta' }] },
];

const BACKGROUNDS: SrdEntry[] = [
  { id: 'acolito', nombre: 'Acólito', icon: 'fa-solid fa-church', descripcion: 'Has dedicado tu vida al servicio de un templo consagrado a un dios.',
    details: [{ label: 'Habilidades', value: 'Perspicacia, Religión' }, { label: 'Idiomas', value: '2 a elección' }, { label: 'Rasgo', value: 'Refugio del Fiel' }] },
  { id: 'charlatan', nombre: 'Charlatán', icon: 'fa-solid fa-masks-theater', descripcion: 'Siempre has tenido facilidad para relacionarte con la gente… y sacar tajada.',
    details: [{ label: 'Habilidades', value: 'Engaño, Juego de manos' }, { label: 'Herramientas', value: 'Kit de disfraz, kit de falsificación' }, { label: 'Rasgo', value: 'Identidad Falsa' }] },
  { id: 'criminal', nombre: 'Criminal', icon: 'fa-solid fa-lock-open', descripcion: 'Eres un delincuente experimentado con un historial de infringir la ley.',
    details: [{ label: 'Habilidades', value: 'Engaño, Sigilo' }, { label: 'Herramientas', value: 'Un tipo de juego, herramientas de ladrón' }, { label: 'Rasgo', value: 'Contacto Criminal' }] },
  { id: 'artista', nombre: 'Artista', icon: 'fa-solid fa-palette', descripcion: 'Prosperas frente al público. Sabes cómo cautivar, entretener e incluso inspirar.',
    details: [{ label: 'Habilidades', value: 'Acrobacias, Interpretación' }, { label: 'Herramientas', value: 'Kit de disfraz, un instrumento musical' }, { label: 'Rasgo', value: 'Favor del Público' }] },
  { id: 'heroe_popular', nombre: 'Héroe Popular', icon: 'fa-solid fa-star', descripcion: 'Provienes de un entorno humilde pero estás destinado a mucho más.',
    details: [{ label: 'Habilidades', value: 'Trato con animales, Supervivencia' }, { label: 'Herramientas', value: 'Un tipo de herramientas de artesano, vehículos de tierra' }, { label: 'Rasgo', value: 'Hospitalidad Rústica' }] },
  { id: 'ermitano', nombre: 'Ermitaño', icon: 'fa-solid fa-mountain', descripcion: 'Has vivido en reclusión durante gran parte de tu vida.',
    details: [{ label: 'Habilidades', value: 'Medicina, Religión' }, { label: 'Herramientas', value: 'Kit de herboristería' }, { label: 'Rasgo', value: 'Descubrimiento' }] },
  { id: 'noble', nombre: 'Noble', icon: 'fa-solid fa-crown', descripcion: 'Comprendes la riqueza, el poder y los privilegios.',
    details: [{ label: 'Habilidades', value: 'Historia, Persuasión' }, { label: 'Herramientas', value: 'Un tipo de juego' }, { label: 'Rasgo', value: 'Posición Privilegiada' }] },
  { id: 'forajido', nombre: 'Forajido', icon: 'fa-solid fa-campground', descripcion: 'Creciste en la naturaleza, lejos de la civilización y de las comodidades de la ciudad.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Supervivencia' }, { label: 'Herramientas', value: 'Un instrumento musical' }, { label: 'Rasgo', value: 'Vagabundo' }] },
  { id: 'sabio', nombre: 'Sabio', icon: 'fa-solid fa-book', descripcion: 'Has dedicado años de tu vida al estudio del multiverso.',
    details: [{ label: 'Habilidades', value: 'Arcanos, Historia' }, { label: 'Idiomas', value: '2 a elección' }, { label: 'Rasgo', value: 'Investigador' }] },
  { id: 'marinero', nombre: 'Marinero', icon: 'fa-solid fa-anchor', descripcion: 'Has navegado durante años y has resistido tormentas terribles.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Percepción' }, { label: 'Herramientas', value: 'Herramientas de navegante, vehículos acuáticos' }, { label: 'Rasgo', value: 'Pasaje por Barco' }] },
  { id: 'soldado', nombre: 'Soldado', icon: 'fa-solid fa-medal', descripcion: 'Pasaste años sirviendo en la milicia o en un ejército mercenario.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Intimidación' }, { label: 'Herramientas', value: 'Un tipo de juego, vehículos de tierra' }, { label: 'Rasgo', value: 'Rango Militar' }] },
  { id: 'urchin', nombre: 'Pilluelo', icon: 'fa-solid fa-street-view', descripcion: 'Creciste en las calles, solo, huérfano y pobre.',
    details: [{ label: 'Habilidades', value: 'Juego de manos, Sigilo' }, { label: 'Herramientas', value: 'Kit de disfraz, herramientas de ladrón' }, { label: 'Rasgo', value: 'Secretos de la Ciudad' }] },
  { id: 'guildartisan', nombre: 'Artesano Gremial', icon: 'fa-solid fa-gavel', descripcion: 'Eres miembro de un gremio de artesanos y dominas un conjunto de habilidades especiales.',
    details: [{ label: 'Habilidades', value: 'Perspicacia, Persuasión' }, { label: 'Herramientas', value: 'Un tipo de herramientas de artesano' }, { label: 'Rasgo', value: 'Membresía del Gremio' }] },
];

type TabId = 'razas' | 'clases' | 'trasfondos';

const PUBLIC_LINKS: { id: TabId; label: string; href: string; icon: string }[] = [
  { id: 'razas', label: 'Razas completas', href: '/compendio/razas', icon: 'fa-solid fa-users' },
  { id: 'clases', label: 'Clases completas', href: '/compendio/clases', icon: 'fa-solid fa-shield-halved' },
  { id: 'trasfondos', label: 'Trasfondos completos', href: '/compendio/trasfondos', icon: 'fa-solid fa-scroll' },
];

const EXTRA_PUBLIC_LINKS: { label: string; href: string; icon: string }[] = [
  { label: 'Conjuros', href: '/compendio/conjuros', icon: 'fa-solid fa-wand-sparkles' },
  { label: 'Reglas', href: '/compendio/reglas', icon: 'fa-solid fa-scale-balanced' },
];

export default function Compendium() {
  const [activeTab, setActiveTab] = useState<TabId>('razas');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const data = activeTab === 'razas' ? RACES : activeTab === 'clases' ? CLASSES : BACKGROUNDS;
  const query = searchQuery.toLowerCase().trim();

  const filtered = useMemo(() => {
    if (!query) return data;
    return data.filter(e =>
      e.nombre.toLowerCase().includes(query) || e.id.toLowerCase().includes(query)
    );
  }, [data, query]);

  const toggleExpand = useCallback((id: string) => {
    setExpandedId(prev => prev === id ? null : id);
  }, []);

  const TABS: { id: TabId; label: string; icon: string; count: number }[] = [
    { id: 'razas', label: 'Razas', icon: 'fa-solid fa-users', count: RACES.length },
    { id: 'clases', label: 'Clases', icon: 'fa-solid fa-shield-halved', count: CLASSES.length },
    { id: 'trasfondos', label: 'Trasfondos', icon: 'fa-solid fa-scroll', count: BACKGROUNDS.length },
  ];

  const activePublicLink = PUBLIC_LINKS.find(l => l.id === activeTab);

  return (
    <div className="animate-fade-in relative">
      {/* ── Header Banner ─────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden mb-8 p-6 sm:p-8" style={{
        background: 'linear-gradient(135deg, rgba(143,61,56,0.12) 0%, rgba(40,38,27,0.95) 50%, rgba(128,121,83,0.10) 100%)',
        border: '1px solid rgba(143,61,56,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}>
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-[0.06] pointer-events-none -translate-y-1/2 translate-x-1/4" style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }} />
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-white flex items-center gap-3 tracking-wide">
              <span className="text-2xl sm:text-3xl"><i className="fa-solid fa-book-open"></i></span>
              Compendio SRD
            </h1>
            <p className="text-sm text-[#AAA37B] mt-1.5 font-light max-w-lg">
              Referencia rápida del System Reference Document 5.1. Explora las entradas o visita el compendio público para información detallada.
            </p>
          </div>
          <a
            href="/compendio"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium text-[#CDC9B2] transition-all duration-200 hover:text-white shrink-0"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            Compendio público
          </a>
        </div>
      </div>

      {/* ── Quick Links to Public Compendio ────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[...PUBLIC_LINKS, ...EXTRA_PUBLIC_LINKS].map(link => (
          <a
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#AAA37B] transition-all duration-200 hover:text-white hover:border-[rgba(143,61,56,0.3)]"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span><i className={link.icon}></i></span>
            <span>{link.label}</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="opacity-40"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        ))}
      </div>

      <div className="dymes-divider !my-5" />

      {/* ── Tabs ──────────────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex gap-1.5 p-1 rounded-xl flex-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setExpandedId(null); setSearchQuery(''); }}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-[#807953] hover:text-[#CDC9B2]'
              }`}
              style={activeTab === tab.id ? {
                background: 'linear-gradient(135deg, rgba(143,61,56,0.2), rgba(143,61,56,0.08))',
                boxShadow: '0 0 12px rgba(143,61,56,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
              } : {}}
            >
              <span className="text-base"><i className={tab.icon}></i></span>
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="text-[10px] opacity-50">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Search ────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-[#807953]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder={`Buscar ${activeTab}...`}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="dymes-input !pl-11 !pr-20"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {searchQuery && (
              <>
                <span className="text-[10px] text-[#807953] tabular-nums">{filtered.length}</span>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-[#807953] hover:text-white transition-colors p-1 rounded-lg hover:bg-white/5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Section Label ────────────────────────────────── */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-5 rounded-full" style={{ background: 'linear-gradient(to bottom, #8f3d38, rgba(143,61,56,0.3))' }} />
          <p className="text-xs text-[#807953] uppercase tracking-widest font-medium">
            {filtered.length} {activeTab === 'razas' ? 'raza' : activeTab === 'clases' ? 'clase' : 'trasfondo'}{filtered.length !== 1 ? 's' : ''}
            {query ? ` — "${searchQuery}"` : ''}
          </p>
        </div>
        {activePublicLink && (
          <a
            href={activePublicLink.href}
            className="text-[10px] text-[#807953] hover:text-[#CDC9B2] transition-colors uppercase tracking-wider font-medium flex items-center gap-1"
          >
            Ver todo
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6"/></svg>
          </a>
        )}
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 rounded-2xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#807953" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
          <p className="text-sm text-[#807953] mb-1">No se encontraron resultados para &ldquo;{searchQuery}&rdquo;</p>
          <button onClick={() => setSearchQuery('')} className="text-xs text-[#8f3d38] hover:text-[#b25550] transition-colors">Limpiar búsqueda</button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {filtered.map(entry => (
            <CompendiumCard
              key={entry.id}
              entry={entry}
              isExpanded={expandedId === entry.id}
              onToggle={() => toggleExpand(entry.id)}
            />
          ))}
        </div>
      )}

      {/* ── SRD Attribution ──────────────────────────────── */}
      <div className="mt-16">
        <div className="dymes-divider" />
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs text-[#807953] text-center leading-relaxed">
            Contenido basado en el System Reference Document 5.1 (SRD 5.1) de Wizards of the Coast,<br className="hidden sm:inline" /> disponible bajo la Open Gaming License (OGL 1.0a).
          </p>
          <a
            href="/compendio"
            className="inline-flex items-center gap-1.5 text-xs text-[#8f3d38] hover:text-[#b25550] transition-colors font-medium"
          >
            Explorar compendio público completo
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function CompendiumCard({ entry, isExpanded, onToggle }: { entry: SrdEntry; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isExpanded ? 'shadow-lg' : ''}`}
      style={{
        background: isExpanded
          ? 'linear-gradient(145deg, rgba(40,38,27,0.98), rgba(28,26,18,0.95))'
          : 'linear-gradient(145deg, rgba(40,38,27,0.8), rgba(28,26,18,0.7))',
        borderColor: isExpanded ? 'rgba(143,61,56,0.3)' : 'rgba(81,77,53,0.2)',
        boxShadow: isExpanded
          ? '0 8px 32px rgba(0,0,0,0.35), 0 0 20px rgba(143,61,56,0.06), inset 0 1px 0 rgba(255,255,255,0.05)'
          : '0 2px 8px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.02)',
      }}
    >
      {/* Top accent when expanded */}
      {isExpanded && (
        <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(143,61,56,0.4), rgba(178,172,136,0.15), transparent)' }} />
      )}

      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 sm:p-5 text-left group"
      >
        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-xl sm:text-2xl shrink-0 transition-all duration-300" style={{
          background: isExpanded
            ? 'linear-gradient(135deg, rgba(143,61,56,0.15), rgba(143,61,56,0.05))'
            : 'rgba(255,255,255,0.04)',
          border: `1px solid ${isExpanded ? 'rgba(143,61,56,0.25)' : 'rgba(255,255,255,0.06)'}`,
        }}>
          {entry.icon && <i className={entry.icon}></i>}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-display font-semibold text-white group-hover:text-[#CDC9B2] transition-colors">{entry.nombre}</h3>
          {!isExpanded && (
            <p className="text-xs text-[#807953] mt-0.5 truncate">{entry.descripcion}</p>
          )}
        </div>
        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${isExpanded ? 'bg-white/5 rotate-180' : ''}`}>
          <svg
            className={`w-4 h-4 transition-colors duration-300 ${isExpanded ? 'text-[#CDC9B2]' : 'text-[#807953]'}`}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="m6 9 6 6 6-6"/>
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div className="px-4 sm:px-5 pb-5 pt-0 animate-fade-in">
          <div className="sm:ml-16">
            <p className="text-sm text-[#AAA37B] mb-4 leading-relaxed">{entry.descripcion}</p>
            <div className="grid sm:grid-cols-2 gap-2">
              {entry.details.map((d, i) => (
                <div key={i} className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg" style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
                  border: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <span className="text-[10px] text-[#807953] whitespace-nowrap uppercase tracking-wider font-semibold pt-px">{d.label}</span>
                  <span className="text-xs text-[#CDC9B2] leading-relaxed">{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
