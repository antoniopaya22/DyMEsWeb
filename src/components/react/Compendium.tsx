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
  { id: 'humano', nombre: 'Humano', icon: '👤', descripcion: 'Los humanos son los más adaptables y ambiciosos de las razas comunes. Sus características varían enormemente dependiendo de dónde vivan.',
    details: [{ label: 'Bonificación', value: '+1 a todas las características' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Tamaño', value: 'Mediano' }, { label: 'Idiomas', value: 'Común + 1 adicional' }] },
  { id: 'elfo', nombre: 'Elfo', icon: '🧝', descripcion: 'Los elfos son un pueblo mágico de gracia sobrenatural que habitan el mundo sin pertenecer del todo a él.',
    details: [{ label: 'Bonificación', value: 'DES +2' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Sentidos agudos, Ancestros feéricos, Trance' }] },
  { id: 'enano', nombre: 'Enano', icon: '⛏️', descripcion: 'Los enanos son gente robusta y corpulenta, tan estoicos y firmes como las montañas que adoran.',
    details: [{ label: 'Bonificación', value: 'CON +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Resistencia enana, Entrenamiento de combate, Dominio con herramientas, Afinidad con la piedra' }] },
  { id: 'mediano', nombre: 'Mediano', icon: '🍀', descripcion: 'Los medianos son gente práctica y menuda que no desean aventuras ni la gloria.',
    details: [{ label: 'Bonificación', value: 'DES +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Tamaño', value: 'Pequeño' }, { label: 'Rasgos', value: 'Afortunado, Valiente, Agilidad mediana' }] },
  { id: 'draconido', nombre: 'Dracónido', icon: '🐉', descripcion: 'Los dracónidos poseen su propia estirpe orgullosa y creen fervientemente que fueron creados por los propios dioses dragón.',
    details: [{ label: 'Bonificación', value: 'FUE +2, CAR +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Rasgos', value: 'Linaje dracónico, Arma de aliento, Resistencia al daño' }] },
  { id: 'gnomo', nombre: 'Gnomo', icon: '🔧', descripcion: 'Los gnomos son seres llenos de energía y entusiasmo, siempre curiosos y deseosos de aprender.',
    details: [{ label: 'Bonificación', value: 'INT +2' }, { label: 'Velocidad', value: '25 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Astucia gnómica' }] },
  { id: 'semielfo', nombre: 'Semielfo', icon: '🌿', descripcion: 'Los semielfos combinan las mejores cualidades de sus progenitores elficos y humanos.',
    details: [{ label: 'Bonificación', value: 'CAR +2, dos +1 a elección' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Ancestros feéricos, Versatilidad en habilidades' }] },
  { id: 'semiorco', nombre: 'Semiorco', icon: '💪', descripcion: 'Los semiorcos combinan la fuerza de sus ancestros orcos con la tenacidad humana.',
    details: [{ label: 'Bonificación', value: 'FUE +2, CON +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Amenazante, Resistencia incesante, Ataques salvajes' }] },
  { id: 'tiefling', nombre: 'Tiefling', icon: '😈', descripcion: 'Los tieflings descienden de linajes humanos que han sido tocados por la esencia de los Nueve Infiernos.',
    details: [{ label: 'Bonificación', value: 'CAR +2, INT +1' }, { label: 'Velocidad', value: '30 pies' }, { label: 'Visión', value: 'Visión en la oscuridad (60 pies)' }, { label: 'Rasgos', value: 'Resistencia infernal, Legado infernal (taumaturgia, represión infernal, oscuridad)' }] },
];

const CLASSES: SrdEntry[] = [
  { id: 'barbaro', nombre: 'Bárbaro', icon: '🪓', descripcion: 'Un fiero guerrero de origen primitivo que puede entrar en frenesí de batalla.',
    details: [{ label: 'Dado de golpe', value: 'd12' }, { label: 'Salvaciones', value: 'FUE, CON' }, { label: 'Armaduras', value: 'Ligeras, medias, escudos' }, { label: 'Armas', value: 'Armas sencillas, armas marciales' }] },
  { id: 'bardo', nombre: 'Bardo', icon: '🎵', descripcion: 'Un maestro inspirador de la música, la magia y el combate cuyas palabras infunden poder.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'DES, CAR' }, { label: 'Magia', value: 'Lanzador completo (CAR)' }, { label: 'Rasgos', value: 'Inspiración de bardo, Bribón experto' }] },
  { id: 'brujo', nombre: 'Brujo', icon: '🌑', descripcion: 'Un wielder de la magia derivada de un pacto con una entidad extraplanar.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Magia de pacto (CAR)' }, { label: 'Rasgos', value: 'Patrón de ultratumba, Magia de pacto, Invocaciones sobrenaturales' }] },
  { id: 'clerigo', nombre: 'Clérigo', icon: '✝️', descripcion: 'Un campeón sacerdotal que empuña la magia divina al servicio de un poder superior.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Lanzador completo (SAB)' }, { label: 'Rasgos', value: 'Dominio divino, Canalizar divinidad' }] },
  { id: 'druida', nombre: 'Druida', icon: '🌿', descripcion: 'Un sacerdote de la Vieja Fe, con poder sobre la naturaleza y capaz de tomar forma animal.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'INT, SAB' }, { label: 'Magia', value: 'Lanzador completo (SAB)' }, { label: 'Rasgos', value: 'Druídico, Forma salvaje' }] },
  { id: 'explorador', nombre: 'Explorador', icon: '🏹', descripcion: 'Un guerrero que utiliza la destreza marcial y la magia de la naturaleza para combatir amenazas.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'FUE, DES' }, { label: 'Magia', value: 'Medio lanzador (SAB)' }, { label: 'Rasgos', value: 'Enemigo predilecto, Explorador natural' }] },
  { id: 'guerrero', nombre: 'Guerrero', icon: '⚔️', descripcion: 'Un maestro del combate marcial con una variedad de armas y armaduras.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'FUE, CON' }, { label: 'Armaduras', value: 'Todas las armaduras, escudos' }, { label: 'Rasgos', value: 'Estilo de combate, Tomar aliento, Acción de oleada' }] },
  { id: 'hechicero', nombre: 'Hechicero', icon: '✨', descripcion: 'Un lanzador de conjuros que obtiene su magia inherente de un linaje o don sobrenatural.',
    details: [{ label: 'Dado de golpe', value: 'd6' }, { label: 'Salvaciones', value: 'CON, CAR' }, { label: 'Magia', value: 'Lanzador completo (CAR)' }, { label: 'Rasgos', value: 'Origen de hechicería, Fuente de magia, Metamagia' }] },
  { id: 'mago', nombre: 'Mago', icon: '🔮', descripcion: 'Un usuario erudito de la magia arcana capaz de manipular las estructuras de la realidad.',
    details: [{ label: 'Dado de golpe', value: 'd6' }, { label: 'Salvaciones', value: 'INT, SAB' }, { label: 'Magia', value: 'Lanzador completo (INT)' }, { label: 'Rasgos', value: 'Recuperación arcana, Tradición arcana, Libro de conjuros' }] },
  { id: 'monje', nombre: 'Monje', icon: '👊', descripcion: 'Un maestro de las artes marciales que aprovecha el poder del cuerpo en busca de la perfección.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'FUE, DES' }, { label: 'Armas', value: 'Armas sencillas, espadas cortas' }, { label: 'Rasgos', value: 'Defensa sin armadura, Artes marciales, Ki' }] },
  { id: 'paladin', nombre: 'Paladín', icon: '🛡️', descripcion: 'Un santo guerrero vinculado a un juramento sagrado.',
    details: [{ label: 'Dado de golpe', value: 'd10' }, { label: 'Salvaciones', value: 'SAB, CAR' }, { label: 'Magia', value: 'Medio lanzador (CAR)' }, { label: 'Rasgos', value: 'Sentido divino, Imposición de manos, Estilo de combate, Castigo divino' }] },
  { id: 'picaro', nombre: 'Pícaro', icon: '🗡️', descripcion: 'Un bribón que utiliza el sigilo y los engaños para superar los obstáculos y enemigos.',
    details: [{ label: 'Dado de golpe', value: 'd8' }, { label: 'Salvaciones', value: 'DES, INT' }, { label: 'Rasgos', value: 'Experiencia, Ataque furtivo, Jerga de ladrones, Acción astuta' }] },
];

const BACKGROUNDS: SrdEntry[] = [
  { id: 'acolito', nombre: 'Acólito', icon: '⛪', descripcion: 'Has dedicado tu vida al servicio de un templo consagrado a un dios.',
    details: [{ label: 'Habilidades', value: 'Perspicacia, Religión' }, { label: 'Idiomas', value: '2 a elección' }, { label: 'Rasgo', value: 'Refugio del Fiel' }] },
  { id: 'charlatan', nombre: 'Charlatán', icon: '🎭', descripcion: 'Siempre has tenido facilidad para relacionarte con la gente… y sacar tajada.',
    details: [{ label: 'Habilidades', value: 'Engaño, Juego de manos' }, { label: 'Herramientas', value: 'Kit de disfraz, kit de falsificación' }, { label: 'Rasgo', value: 'Identidad Falsa' }] },
  { id: 'criminal', nombre: 'Criminal', icon: '🔓', descripcion: 'Eres un delincuente experimentado con un historial de infringir la ley.',
    details: [{ label: 'Habilidades', value: 'Engaño, Sigilo' }, { label: 'Herramientas', value: 'Un tipo de juego, herramientas de ladrón' }, { label: 'Rasgo', value: 'Contacto Criminal' }] },
  { id: 'artista', nombre: 'Artista', icon: '🎪', descripcion: 'Prosperas frente al público. Sabes cómo cautivar, entretener e incluso inspirar.',
    details: [{ label: 'Habilidades', value: 'Acrobacias, Interpretación' }, { label: 'Herramientas', value: 'Kit de disfraz, un instrumento musical' }, { label: 'Rasgo', value: 'Favor del Público' }] },
  { id: 'heroe_popular', nombre: 'Héroe Popular', icon: '🦸', descripcion: 'Provienes de un entorno humilde pero estás destinado a mucho más.',
    details: [{ label: 'Habilidades', value: 'Trato con animales, Supervivencia' }, { label: 'Herramientas', value: 'Un tipo de herramientas de artesano, vehículos de tierra' }, { label: 'Rasgo', value: 'Hospitalidad Rústica' }] },
  { id: 'ermitano', nombre: 'Ermitaño', icon: '🏔️', descripcion: 'Has vivido en reclusión durante gran parte de tu vida.',
    details: [{ label: 'Habilidades', value: 'Medicina, Religión' }, { label: 'Herramientas', value: 'Kit de herboristería' }, { label: 'Rasgo', value: 'Descubrimiento' }] },
  { id: 'noble', nombre: 'Noble', icon: '👑', descripcion: 'Comprendes la riqueza, el poder y los privilegios.',
    details: [{ label: 'Habilidades', value: 'Historia, Persuasión' }, { label: 'Herramientas', value: 'Un tipo de juego' }, { label: 'Rasgo', value: 'Posición Privilegiada' }] },
  { id: 'forajido', nombre: 'Forajido', icon: '🌲', descripcion: 'Creciste en la naturaleza, lejos de la civilización y de las comodidades de la ciudad.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Supervivencia' }, { label: 'Herramientas', value: 'Un instrumento musical' }, { label: 'Rasgo', value: 'Vagabundo' }] },
  { id: 'sabio', nombre: 'Sabio', icon: '📚', descripcion: 'Has dedicado años de tu vida al estudio del multiverso.',
    details: [{ label: 'Habilidades', value: 'Arcanos, Historia' }, { label: 'Idiomas', value: '2 a elección' }, { label: 'Rasgo', value: 'Investigador' }] },
  { id: 'marinero', nombre: 'Marinero', icon: '⚓', descripcion: 'Has navegado durante años y has resistido tormentas terribles.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Percepción' }, { label: 'Herramientas', value: 'Herramientas de navegante, vehículos acuáticos' }, { label: 'Rasgo', value: 'Pasaje por Barco' }] },
  { id: 'soldado', nombre: 'Soldado', icon: '🎖️', descripcion: 'Pasaste años sirviendo en la milicia o en un ejército mercenario.',
    details: [{ label: 'Habilidades', value: 'Atletismo, Intimidación' }, { label: 'Herramientas', value: 'Un tipo de juego, vehículos de tierra' }, { label: 'Rasgo', value: 'Rango Militar' }] },
  { id: 'urchin', nombre: 'Pilluelo', icon: '🐀', descripcion: 'Creciste en las calles, solo, huérfano y pobre.',
    details: [{ label: 'Habilidades', value: 'Juego de manos, Sigilo' }, { label: 'Herramientas', value: 'Kit de disfraz, herramientas de ladrón' }, { label: 'Rasgo', value: 'Secretos de la Ciudad' }] },
  { id: 'guildartisan', nombre: 'Artesano Gremial', icon: '🔨', descripcion: 'Eres miembro de un gremio de artesanos y dominas un conjunto de habilidades especiales.',
    details: [{ label: 'Habilidades', value: 'Perspicacia, Persuasión' }, { label: 'Herramientas', value: 'Un tipo de herramientas de artesano' }, { label: 'Rasgo', value: 'Membresía del Gremio' }] },
];

type TabId = 'razas' | 'clases' | 'trasfondos';

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
    { id: 'razas', label: 'Razas', icon: '🧝', count: RACES.length },
    { id: 'clases', label: 'Clases', icon: '⚔️', count: CLASSES.length },
    { id: 'trasfondos', label: 'Trasfondos', icon: '📖', count: BACKGROUNDS.length },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-3">
          <span className="text-3xl">📚</span>
          Compendio SRD
        </h1>
        <p className="text-sm text-[#AAA37B] mt-1">Referencia del System Reference Document 5.1 de D&D 5e</p>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#807953]" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
          </svg>
          <input
            type="text"
            placeholder="Buscar en el compendio..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="dymes-input !pl-10"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#807953] hover:text-white transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => { setActiveTab(tab.id); setExpandedId(null); }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-white shadow-lg'
                : 'text-[#807953] hover:text-[#AAA37B]'
            }`}
            style={activeTab === tab.id ? {
              background: 'rgba(143,61,56,0.15)',
              border: '1px solid rgba(143,61,56,0.3)',
            } : {
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
            }}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
            <span className="text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-[#807953] mb-4">
        {filtered.length} {activeTab === 'razas' ? 'raza' : activeTab === 'clases' ? 'clase' : 'trasfondo'}{filtered.length !== 1 ? 's' : ''}
        {query ? ` para "${searchQuery}"` : ''}
      </p>

      {/* Content */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-3">🔍</div>
          <p className="text-sm text-[#807953]">No se encontraron resultados para "{searchQuery}"</p>
        </div>
      ) : (
        <div className="space-y-3">
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

      {/* SRD Attribution */}
      <div className="mt-12 pt-6 border-t border-[#514D35]">
        <p className="text-xs text-[#807953] text-center">
          Contenido basado en el System Reference Document 5.1 (SRD 5.1) de Wizards of the Coast, disponible bajo la Open Gaming License (OGL 1.0a).
        </p>
      </div>
    </div>
  );
}

function CompendiumCard({ entry, isExpanded, onToggle }: { entry: SrdEntry; isExpanded: boolean; onToggle: () => void }) {
  return (
    <div
      className={`rounded-xl border transition-all duration-200 ${
        isExpanded ? 'border-[rgba(178,172,136,0.3)] shadow-lg' : 'border-[rgba(81,77,53,0.5)] hover:border-[rgba(178,172,136,0.2)]'
      }`}
      style={{ background: isExpanded ? 'rgba(50,48,33,0.9)' : 'rgba(50,48,33,0.6)' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-4 p-4 text-left"
      >
        <span className="text-2xl flex-shrink-0">{entry.icon}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-display font-semibold text-white">{entry.nombre}</h3>
          {!isExpanded && (
            <p className="text-xs text-[#807953] mt-0.5 truncate">{entry.descripcion}</p>
          )}
        </div>
        <svg
          className={`w-4 h-4 text-[#807953] flex-shrink-0 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
        >
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      {isExpanded && (
        <div className="px-4 pb-4 pt-0 animate-fade-in">
          <p className="text-sm text-[#AAA37B] mb-4 leading-relaxed">{entry.descripcion}</p>
          <div className="grid sm:grid-cols-2 gap-2">
            {entry.details.map((d, i) => (
              <div key={i} className="flex gap-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                <span className="text-xs text-[#807953] whitespace-nowrap">{d.label}:</span>
                <span className="text-xs text-white">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
