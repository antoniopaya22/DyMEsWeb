// ─── Rules reference data for the SRD 5.1 compendium ────────────────
// Core D&D 5e mechanics translated to Spanish for the web compendium.

// ─── Ability Scores ─────────────────────────────────────────────────

export interface AbilityScore {
  id: string;
  nombre: string;
  abreviatura: string;
  descripcion: string;
  habilidades: string[];
  ejemplos: string;
}

export const ABILITY_SCORES: AbilityScore[] = [
  {
    id: 'fuerza',
    nombre: 'Fuerza',
    abreviatura: 'FUE',
    descripcion: 'Mide el poder físico, la capacidad atlética y la fuerza bruta del personaje.',
    habilidades: ['Atletismo'],
    ejemplos: 'Forzar una puerta, levantar peso, empujar un objeto pesado, ataques cuerpo a cuerpo.',
  },
  {
    id: 'destreza',
    nombre: 'Destreza',
    abreviatura: 'DES',
    descripcion: 'Mide la agilidad, los reflejos, el equilibrio y la coordinación motriz.',
    habilidades: ['Acrobacias', 'Juego de manos', 'Sigilo'],
    ejemplos: 'Esquivar un obstáculo, esconderse, abrir cerraduras, ataques a distancia.',
  },
  {
    id: 'constitucion',
    nombre: 'Constitución',
    abreviatura: 'CON',
    descripcion: 'Mide la salud, la resistencia y la fuerza vital del personaje.',
    habilidades: [],
    ejemplos: 'Resistir veneno, aguantar sin dormir, mantener la concentración en un conjuro.',
  },
  {
    id: 'inteligencia',
    nombre: 'Inteligencia',
    abreviatura: 'INT',
    descripcion: 'Mide la agudeza mental, la memoria, la capacidad de razonamiento y los conocimientos.',
    habilidades: ['Arcanos', 'Historia', 'Investigación', 'Naturaleza', 'Religión'],
    ejemplos: 'Recordar información, descifrar un código, identificar un conjuro.',
  },
  {
    id: 'sabiduria',
    nombre: 'Sabiduría',
    abreviatura: 'SAB',
    descripcion: 'Mide la percepción, la intuición y la conexión con el mundo natural y espiritual.',
    habilidades: ['Medicina', 'Percepción', 'Perspicacia', 'Supervivencia', 'Trato con animales'],
    ejemplos: 'Detectar una mentira, percibir una emboscada, rastrear huellas, curar heridas.',
  },
  {
    id: 'carisma',
    nombre: 'Carisma',
    abreviatura: 'CAR',
    descripcion: 'Mide la fuerza de personalidad, la elocuencia, el liderazgo y la presencia.',
    habilidades: ['Engaño', 'Intimidación', 'Interpretación', 'Persuasión'],
    ejemplos: 'Convencer a un guardia, actuar en un escenario, liderar tropas, mentir.',
  },
];

export const MODIFIER_TABLE: { score: string; modifier: string }[] = [
  { score: '1', modifier: '-5' },
  { score: '2-3', modifier: '-4' },
  { score: '4-5', modifier: '-3' },
  { score: '6-7', modifier: '-2' },
  { score: '8-9', modifier: '-1' },
  { score: '10-11', modifier: '+0' },
  { score: '12-13', modifier: '+1' },
  { score: '14-15', modifier: '+2' },
  { score: '16-17', modifier: '+3' },
  { score: '18-19', modifier: '+4' },
  { score: '20-21', modifier: '+5' },
  { score: '22-23', modifier: '+6' },
  { score: '24-25', modifier: '+7' },
  { score: '26-27', modifier: '+8' },
  { score: '28-29', modifier: '+9' },
  { score: '30', modifier: '+10' },
];

// ─── Conditions ─────────────────────────────────────────────────────

export interface Condition {
  id: string;
  nombre: string;
  icon: string;
  descripcion: string;
  efectos: string[];
}

export const CONDITIONS: Condition[] = [
  {
    id: 'agarrado',
    nombre: 'Agarrado',
    icon: 'fa-solid fa-hand',
    descripcion: 'Una criatura agarrada ve su velocidad reducida a 0 y no se beneficia de ningún bonificador a la velocidad.',
    efectos: [
      'Tu velocidad se convierte en 0 y no puedes beneficiarte de bonificadores a la velocidad.',
      'La condición termina si quien te agarra queda incapacitado.',
      'La condición también termina si un efecto te retira del alcance del agarrador.',
    ],
  },
  {
    id: 'asustado',
    nombre: 'Asustado',
    icon: 'fa-solid fa-ghost',
    descripcion: 'Una criatura asustada tiene desventaja en pruebas de característica y tiradas de ataque mientras pueda ver la fuente de su miedo.',
    efectos: [
      'Desventaja en pruebas de característica y tiradas de ataque mientras la fuente del miedo esté a la vista.',
      'No puedes acercarte voluntariamente a la fuente de tu miedo.',
    ],
  },
  {
    id: 'aturdido',
    nombre: 'Aturdido',
    icon: 'fa-solid fa-face-dizzy',
    descripcion: 'Una criatura aturdida está incapacitada, no puede moverse y solo habla con dificultad.',
    efectos: [
      'Estás incapacitado, no puedes moverte y solo hablas con dificultad.',
      'Fallas automáticamente las tiradas de salvación de FUE y DES.',
      'Las tiradas de ataque contra ti tienen ventaja.',
    ],
  },
  {
    id: 'cegado',
    nombre: 'Cegado',
    icon: 'fa-solid fa-eye-slash',
    descripcion: 'Una criatura cegada no puede ver y falla automáticamente cualquier prueba que requiera visión.',
    efectos: [
      'Fallas automáticamente cualquier prueba que requiera visión.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Tus tiradas de ataque tienen desventaja.',
    ],
  },
  {
    id: 'derribado',
    nombre: 'Derribado',
    icon: 'fa-solid fa-person-falling',
    descripcion: 'Una criatura derribada solo puede arrastrarse, a menos que se levante terminando la condición.',
    efectos: [
      'Solo puedes moverte arrastrándote, a menos que te levantes y termines la condición.',
      'Tienes desventaja en las tiradas de ataque.',
      'Un atacante tiene ventaja si está a 1,5 m o menos; en caso contrario, tiene desventaja.',
    ],
  },
  {
    id: 'ensordecido',
    nombre: 'Ensordecido',
    icon: 'fa-solid fa-volume-xmark',
    descripcion: 'Una criatura ensordecida no puede oír y falla automáticamente cualquier prueba que requiera oído.',
    efectos: [
      'No puedes oír.',
      'Fallas automáticamente cualquier prueba de característica que requiera oír.',
    ],
  },
  {
    id: 'envenenado',
    nombre: 'Envenenado',
    icon: 'fa-solid fa-biohazard',
    descripcion: 'Una criatura envenenada tiene desventaja en tiradas de ataque y pruebas de característica.',
    efectos: [
      'Desventaja en tiradas de ataque.',
      'Desventaja en pruebas de característica.',
    ],
  },
  {
    id: 'hechizado',
    nombre: 'Hechizado',
    icon: 'fa-solid fa-heart',
    descripcion: 'Una criatura hechizada no puede atacar al encantador ni elegirlo como objetivo de habilidades o efectos mágicos dañinos.',
    efectos: [
      'No puedes atacar al encantador ni elegirlo como objetivo de habilidades o efectos mágicos dañinos.',
      'El encantador tiene ventaja en las pruebas de característica para interactuar socialmente contigo.',
    ],
  },
  {
    id: 'incapacitado',
    nombre: 'Incapacitado',
    icon: 'fa-solid fa-ban',
    descripcion: 'Una criatura incapacitada no puede llevar a cabo acciones ni reacciones.',
    efectos: [
      'No puedes llevar a cabo acciones ni reacciones.',
    ],
  },
  {
    id: 'inconsciente',
    nombre: 'Inconsciente',
    icon: 'fa-solid fa-bed-pulse',
    descripcion: 'Una criatura inconsciente está incapacitada, no puede moverse ni hablar, y no percibe lo que le rodea.',
    efectos: [
      'Estás incapacitado, no puedes moverte ni hablar, y no percibir nada.',
      'Sueltas lo que estés sujetando y caes derribado.',
      'Fallas automáticamente las tiradas de salvación de FUE y DES.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Cualquier ataque que te impacte desde 1,5 m o menos es un golpe crítico.',
    ],
  },
  {
    id: 'invisible',
    nombre: 'Invisible',
    icon: 'fa-solid fa-eye-low-vision',
    descripcion: 'Una criatura invisible es imposible de ver sin la ayuda de magia o sentidos especiales.',
    efectos: [
      'Eres imposible de ver sin la ayuda de magia o sentidos especiales.',
      'A efectos de esconderte, estás muy oscurecido. Tu posición puede revelarse por ruidos o huellas.',
      'Las tiradas de ataque contra ti tienen desventaja.',
      'Tus tiradas de ataque tienen ventaja.',
    ],
  },
  {
    id: 'paralizado',
    nombre: 'Paralizado',
    icon: 'fa-solid fa-snowflake',
    descripcion: 'Una criatura paralizada está incapacitada y no puede moverse ni hablar.',
    efectos: [
      'Estás incapacitado y no puedes moverte ni hablar.',
      'Fallas automáticamente las tiradas de salvación de FUE y DES.',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Cualquier ataque que te impacte desde 1,5 m o menos es un golpe crítico.',
    ],
  },
  {
    id: 'petrificado',
    nombre: 'Petrificado',
    icon: 'fa-solid fa-gem',
    descripcion: 'Una criatura petrificada se transforma, junto con los objetos no mágicos que lleve, en una sustancia sólida inanimada.',
    efectos: [
      'Te transformas en una sustancia sólida inanimada (normalmente piedra). Tu peso se multiplica por diez.',
      'Estás incapacitado, no puedes moverte ni hablar, y no percibir nada.',
      'Tienes resistencia a todo el daño.',
      'Eres inmune a veneno y enfermedad (los que ya tengas se suspenden).',
      'Las tiradas de ataque contra ti tienen ventaja.',
      'Fallas automáticamente las tiradas de salvación de FUE y DES.',
    ],
  },
  {
    id: 'apresado',
    nombre: 'Apresado',
    icon: '🪤',
    descripcion: 'Una criatura apresada ve su velocidad reducida a 0 y no puede beneficiarse de bonificadores a la velocidad.',
    efectos: [
      'Tu velocidad se convierte en 0 y no puedes beneficiarte de bonificadores.',
      'Las tiradas de ataque contra ti tienen ventaja y tus tiradas de ataque tienen desventaja.',
      'Tienes desventaja en las tiradas de salvación de DES.',
    ],
  },
  {
    id: 'cansancio',
    nombre: 'Cansancio (Agotamiento)',
    icon: 'fa-solid fa-battery-quarter',
    descripcion: 'El agotamiento se mide en seis niveles acumulables. Cada nivel tiene efectos cada vez más severos.',
    efectos: [
      'Nivel 1: Desventaja en pruebas de característica.',
      'Nivel 2: Velocidad reducida a la mitad.',
      'Nivel 3: Desventaja en tiradas de ataque y de salvación.',
      'Nivel 4: PG máximos reducidos a la mitad.',
      'Nivel 5: Velocidad reducida a 0.',
      'Nivel 6: Muerte.',
      'Un descanso largo con comida y bebida reduce el agotamiento en 1 nivel.',
    ],
  },
];

// ─── Combat ─────────────────────────────────────────────────────────

export interface CombatRule {
  id: string;
  titulo: string;
  icon: string;
  contenido: string;
}

export const COMBAT_RULES: CombatRule[] = [
  {
    id: 'iniciativa',
    titulo: 'Iniciativa',
    icon: 'fa-solid fa-bolt',
    contenido: 'Al comenzar el combate, cada participante hace una prueba de Destreza para determinar el orden de turno. El resultado es tu puntuación de iniciativa. El GM ordena a todos de mayor a menor. En caso de empate, el GM decide (normalmente, empate entre jugadores lo deciden ellos).',
  },
  {
    id: 'turno',
    titulo: 'Tu turno en combate',
    icon: 'fa-solid fa-rotate',
    contenido: 'En tu turno puedes: moverte una distancia igual o menor a tu velocidad, realizar una acción (Atacar, Lanzar un conjuro, Esquivar, Disparar, Ayudar, Esconderte, Preparar, Desactivar, Usar objeto), y opcionalmente una acción adicional si tienes algún rasgo que la otorgue. También puedes llevar a cabo una interacción gratuita con el entorno (abrir una puerta, desenvainar un arma).',
  },
  {
    id: 'ataque',
    titulo: 'Tirada de ataque',
    icon: 'fa-solid fa-crosshairs',
    contenido: 'Para determinar si un ataque acierta: tira 1d20 + modificador de característica + bonificador de competencia (si eres competente con el arma o conjuro). Si el resultado iguala o supera la CA (Clase de Armadura) del objetivo, el ataque impacta. Un 20 natural es siempre un golpe crítico (doble dados de daño). Un 1 natural es siempre un fallo.',
  },
  {
    id: 'dano',
    titulo: 'Tirada de daño',
    icon: 'fa-solid fa-burst',
    contenido: 'Si un ataque impacta, tira los dados de daño del arma o conjuro y suma el modificador correspondiente. Los ataques cuerpo a cuerpo suman FUE mod (o DES si es un arma sutil). Los ataques a distancia suman DES mod. Los conjuros usan su propia fórmula de daño. En un golpe crítico, tiras todos los dados de daño del ataque dos veces.',
  },
  {
    id: 'cobertura',
    titulo: 'Cobertura',
    icon: 'fa-solid fa-shield',
    contenido: 'Media cobertura: +2 a CA y salvaciones de DES (muro bajo, mueble). Tres cuartos de cobertura: +5 a CA y salvaciones de DES (reja de hierro, tronera). Cobertura total: no puedes ser objetivo directo de ataques o conjuros, aunque puedes ser alcanzado por áreas de efecto.',
  },
  {
    id: 'reacciones',
    titulo: 'Reacciones',
    icon: 'fa-solid fa-arrow-rotate-left',
    contenido: 'Algunos rasgos y conjuros te permiten realizar una reacción: una respuesta instantánea al turno de otro. El ejemplo más común es el ataque de oportunidad: cuando una criatura hostil sale de tu alcance, puedes hacer un ataque cuerpo a cuerpo contra ella. Solo puedes usar una reacción por ronda, y se recupera al inicio de tu turno.',
  },
  {
    id: 'muerte',
    titulo: 'Salvaciones de muerte',
    icon: 'fa-solid fa-skull',
    contenido: 'Cuando caes a 0 PG, caes inconsciente y comienzas a hacer tiradas de salvación de muerte al inicio de cada turno: tira 1d20. Con 10+ es un éxito, con 9 o menos es un fracaso. 3 éxitos = te estabilizas (con 0 PG). 3 fracasos = mueres. Un 20 natural te deja con 1 PG. Un 1 natural cuenta como 2 fracasos. Si recibes daño a 0 PG, sumas un fracaso (o 2 si es un crítico).',
  },
  {
    id: 'acciones_combate',
    titulo: 'Acciones en combate',
    icon: 'fa-solid fa-list-check',
    contenido: 'Atacar: realiza uno o más ataques con arma o desarmados. Lanzar un conjuro: usa tu acción para lanzar un conjuro con tiempo de 1 acción. Esquivar: todo ataque contra ti tiene desventaja y tus salvaciones de DES tienen ventaja. Desactivar: intentas derribar, agarrar o empujar a un oponente. Ayudar: el siguiente ataque de un aliado tiene ventaja. Esconderte: haces una prueba de DES (Sigilo). Preparar: preparas una acción para actuar como reacción. Correr: duplicas tu velocidad por un turno. Usar un objeto: interactúas con un objeto.',
  },
];

// ─── Resting ────────────────────────────────────────────────────────

export interface RestRule {
  id: string;
  titulo: string;
  icon: string;
  duracion: string;
  beneficios: string[];
  restricciones: string[];
}

export const REST_RULES: RestRule[] = [
  {
    id: 'corto',
    titulo: 'Descanso corto',
    icon: 'fa-solid fa-mug-hot',
    duracion: 'Al menos 1 hora',
    beneficios: [
      'Puedes gastar Dados de Golpe para recuperar PG. Por cada dado gastado, tira el dado + CON mod.',
      'Algunos rasgos de clase se recuperan (Canalizar Divinidad del Clérigo, Ki del Monje, Magia de Pacto del Brujo, Inspiración Bárdica a nv. 5+, etc.).',
      'El Bardo con Canción de Descanso puede añadir un dado extra a la curación de dados de golpe.',
    ],
    restricciones: [
      'No puedes hacer más que actividad ligera: comer, beber, leer, curar heridas.',
      'Si el descanso se interrumpe por un período de actividad extenuante (combate, lanzar conjuros, caminar...), hay que volver a empezar.',
    ],
  },
  {
    id: 'largo',
    titulo: 'Descanso largo',
    icon: 'fa-solid fa-bed',
    duracion: 'Al menos 8 horas',
    beneficios: [
      'Recuperas todos los PG perdidos.',
      'Recuperas Dados de Golpe gastados, hasta un máximo de la mitad de tus DG totales (mínimo 1).',
      'Recuperas todos los espacios de conjuro gastados.',
      'Se reinician los usos de rasgos de clase que se recuperan por descanso largo (Furias del Bárbaro, Canalizar Divinidad adicional, etc.).',
      'El agotamiento se reduce en 1 nivel (si comes y bebes).',
    ],
    restricciones: [
      'Debes dormir al menos 6 de las 8 horas (elfos: 4 horas de Trance).',
      'Solo puedes tomar un descanso largo cada 24 horas.',
      'Si se interrumpe por actividad extenuante (1 hora o más de combate, caminar, lanzar conjuros), el descanso debe reiniciarse.',
    ],
  },
];

// ─── Damage Types ───────────────────────────────────────────────────

export interface DamageType {
  nombre: string;
  icon: string;
  descripcion: string;
}

export const DAMAGE_TYPES: DamageType[] = [
  { nombre: 'Ácido', icon: 'fa-solid fa-flask', descripcion: 'El aliento corrosivo de un dragón negro o un brebaje de veneno disuelve carne y materia.' },
  { nombre: 'Contundente', icon: 'fa-solid fa-gavel', descripcion: 'Fuerza bruta: mazas, caídas, garras de criaturas.' },
  { nombre: 'Cortante', icon: 'fa-solid fa-scissors', descripcion: 'Espadas, hachas y garras que desgarran la carne.' },
  { nombre: 'Frío', icon: 'fa-solid fa-temperature-low', descripcion: 'El punzante frío infernal de un Rayo de escarcha o el aliento de un dragón blanco.' },
  { nombre: 'Fuego', icon: 'fa-solid fa-fire-flame-curved', descripcion: 'Dragones rojos, Bola de fuego y muchas criaturas y conjuros volcánicos.' },
  { nombre: 'Fuerza', icon: 'fa-solid fa-hand-sparkles', descripcion: 'Magia pura canalizada como energía destructiva, como Proyectil mágico.' },
  { nombre: 'Necrótico', icon: 'fa-solid fa-skull-crossbones', descripcion: 'Magia que corrompe la fuerza vital, común en la nigromancia.' },
  { nombre: 'Perforante', icon: 'fa-solid fa-location-arrow', descripcion: 'Flechas, colmillos y ataques punzantes.' },
  { nombre: 'Psíquico', icon: 'fa-solid fa-brain', descripcion: 'Ataques mentales que destruyen la mente desde dentro.' },
  { nombre: 'Radiante', icon: 'fa-solid fa-sun', descripcion: 'Poder divino: Llama sagrada, rayos solares y castigos divinos.' },
  { nombre: 'Relámpago', icon: 'fa-solid fa-bolt', descripcion: 'Electricidad generada por conjuros como Relámpago o el aliento de un dragón azul.' },
  { nombre: 'Trueno', icon: 'fa-solid fa-cloud-bolt', descripcion: 'Ondas de choque sónicas producidas por conjuros como Ola atronadora.' },
  { nombre: 'Veneno', icon: 'fa-solid fa-vial', descripcion: 'Picaduras venenosas, gases letales y trampas emponzoñadas.' },
];
