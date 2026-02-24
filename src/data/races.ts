// ─── Race types & data ──────────────────────────────────
export interface RaceTrait {
  nombre: string;
  desc: string;
}

export interface RaceDetail {
  label: string;
  value: string;
}

export interface Subrace {
  nombre: string;
  desc: string;
  rasgos: string;
}

export interface Race {
  id: string;
  nombre: string;
  icon: string;
  descripcion: string;
  details: RaceDetail[];
  rasgos: RaceTrait[];
  subraza: Subrace | null;
}

export const RACES: Race[] = [
  { id: 'humano', nombre: 'Humano', icon: '👤',
    descripcion: 'Los humanos son la raza más adaptable y ambiciosa. Son tremendamente diversos en cuanto a gustos, moral y costumbres.',
    details: [
      { label: 'Bonificación', value: '+1 a todas las características' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Normal' },
      { label: 'Rasgos', value: 'Idioma adicional' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Todas tus puntuaciones de característica aumentan en 1.' },
      { nombre: 'Edad', desc: 'Los humanos llegan a la madurez al final de la adolescencia y viven menos de un siglo.' },
      { nombre: 'Tamaño', desc: 'Los humanos varían mucho en altura y complexión, desde apenas 1,50 m hasta más de 1,80 m. Tu tamaño es Mediano.' },
      { nombre: 'Velocidad', desc: 'Tu velocidad base al caminar es de 9 metros.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y un idioma adicional de tu elección.' },
    ],
    subraza: null,
  },
  { id: 'elfo', nombre: 'Elfo', icon: '🧝',
    descripcion: 'Los elfos son un pueblo mágico de gracia sobrenatural que viven en el mundo sin pertenecer del todo a él.',
    details: [
      { label: 'Bonificación', value: 'DES +2' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Sentidos agudos, Linaje feérico, Trance' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Destreza aumenta en 2.' },
      { nombre: 'Edad', desc: 'Los elfos alcanzan la madurez física a una edad similar a la de los humanos, pero su comprensión adulta llega en torno a los cien años. Viven hasta los 750 años.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Sentidos Agudos', desc: 'Eres competente en la habilidad Percepción.' },
      { nombre: 'Linaje Feérico', desc: 'Tienes ventaja en las tiradas de salvación para evitar que te hechicen y la magia no puede dormirte.' },
      { nombre: 'Trance', desc: 'Los elfos no duermen. En lugar de eso, meditan profundamente durante 4 horas al día (trance). Tras descansar de esta forma obtienes los beneficios de un descanso largo de 8 horas.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y elfo.' },
    ],
    subraza: { nombre: 'Alto Elfo', desc: 'Los altos elfos poseen una mente afilada y un dominio de la magia al menos en sus formas elementales.', rasgos: 'INT +1, competencia con espada larga/corta/arco largo/corto, un truco de mago a elección (INT), idioma extra.' },
  },
  { id: 'enano', nombre: 'Enano', icon: '⛏️',
    descripcion: 'Los enanos son gente resistente y tradicional, famosos por su habilidad en la guerra y la artesanía.',
    details: [
      { label: 'Bonificación', value: 'CON +2' },
      { label: 'Velocidad', value: '7,5 m (25 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Resistencia enana, Entrenamiento enano' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Constitución aumenta en 2.' },
      { nombre: 'Edad', desc: 'Los enanos maduran al mismo ritmo que los humanos, pero se consideran jóvenes hasta los 50 años. De media viven unos 350 años.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Resistencia Enana', desc: 'Tienes ventaja en las tiradas de salvación contra veneno y resistencia al daño de veneno.' },
      { nombre: 'Entrenamiento de Combate Enano', desc: 'Eres competente con el hacha de batalla, el hacha de mano, el martillo ligero y el martillo de guerra.' },
      { nombre: 'Competencia con Herramientas', desc: 'Eres competente con las herramientas de artesano que elijas entre: herramientas de albañil, herramientas de herrero o suministros de cervecero.' },
      { nombre: 'Afinidad con la Piedra', desc: 'Cuando hagas una prueba de INT (Historia) relativa al origen de trabajo de albañilería, se te considera competente y sumas el doble de tu bonificador de competencia.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y enano.' },
    ],
    subraza: { nombre: 'Enano de las Colinas', desc: 'Los enanos de las colinas poseen sentidos agudos, una intuición profunda y una resistencia notable.', rasgos: 'SAB +1, Resistencia Enana (PG máx. +1 por nivel).' },
  },
  { id: 'mediano', nombre: 'Mediano', icon: '🍀',
    descripcion: 'Los medianos son un pueblo amable, curioso y con una suerte asombrosa. Su pequeño tamaño les ayuda a pasar desapercibidos.',
    details: [
      { label: 'Bonificación', value: 'DES +2' },
      { label: 'Velocidad', value: '7,5 m (25 pies)' },
      { label: 'Visión', value: 'Normal' },
      { label: 'Rasgos', value: 'Afortunado, Valiente, Agilidad mediana' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Destreza aumenta en 2.' },
      { nombre: 'Edad', desc: 'Los medianos llegan a la madurez a los 20 años y generalmente viven hasta la mitad de su segundo siglo.' },
      { nombre: 'Afortunado', desc: 'Cuando saques un 1 en una tirada de ataque, prueba de característica o tirada de salvación, puedes volver a tirar el dado y usar el nuevo resultado.' },
      { nombre: 'Valiente', desc: 'Tienes ventaja en las tiradas de salvación para evitar que te asusten.' },
      { nombre: 'Agilidad Mediana', desc: 'Puedes pasar a través del espacio de cualquier criatura cuyo tamaño sea mayor que el tuyo.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y mediano.' },
    ],
    subraza: { nombre: 'Piesligeros', desc: 'Los medianos Piesligeros son muy hábiles a la hora de ocultarse, incluso usan a otras criaturas como cobertura.', rasgos: 'CAR +1, Sigiloso por Naturaleza (puedes intentar esconderte incluso cuando sólo te tapa una criatura de tamaño mayor que el tuyo).' },
  },
  { id: 'draconido', nombre: 'Dracónido', icon: '🐉',
    descripcion: 'Los dracónidos se parecen a los dragones, caminando erguidos en una forma humanoide, sin cola ni alas.',
    details: [
      { label: 'Bonificación', value: 'FUE +2, CAR +1' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Normal' },
      { label: 'Rasgos', value: 'Arma de aliento, Resistencia al daño' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Fuerza aumenta en 2 y tu Carisma en 1.' },
      { nombre: 'Edad', desc: 'Los dracónidos jóvenes crecen rápidamente, caminan horas después de salir del huevo y alcanzan el tamaño y desarrollo de un niño humano de 10 años a los 3. Llegan a la madurez a los 15 y viven unos 80 años.' },
      { nombre: 'Ascendencia Dracónica', desc: 'Elige un tipo de dragón. Tu arma de aliento y tu resistencia al daño están determinadas por dicho tipo.' },
      { nombre: 'Arma de Aliento', desc: 'Puedes usar tu acción para exhalar energía destructiva. Tu ascendencia dracónica determina el tamaño, la forma y el tipo de daño de tu exhalación. Salvación (CD = 8 + CON mod + competencia); éxito = mitad de daño. Daño: 2d6 (nv 1), 3d6 (nv 6), 4d6 (nv 11), 5d6 (nv 16). 1/descanso corto o largo.' },
      { nombre: 'Resistencia al Daño', desc: 'Tienes resistencia al tipo de daño asociado con tu ascendencia dracónica.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y dracónico.' },
    ],
    subraza: null,
  },
  { id: 'gnomo', nombre: 'Gnomo', icon: '🔧',
    descripcion: 'Los gnomos son seres llenos de energía y entusiasmo, siempre curiosos y deseosos de aprender.',
    details: [
      { label: 'Bonificación', value: 'INT +2' },
      { label: 'Velocidad', value: '7,5 m (25 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Astucia gnómica' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Inteligencia aumenta en 2.' },
      { nombre: 'Edad', desc: 'Los gnomos maduran al mismo ritmo que los humanos y se espera que se comporten como adultos en torno a los cuarenta años. Pueden vivir entre trescientos cincuenta y casi quinientos años.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Astucia Gnoma', desc: 'Tienes ventaja en todas las tiradas de salvación de Inteligencia, Sabiduría y Carisma contra magia.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y gnomo. El idioma gnomo se escribe con el alfabeto enano.' },
    ],
    subraza: { nombre: 'Gnomo de las Rocas', desc: 'Posees un ingenio natural y eres más resistente que otros gnomos.', rasgos: 'CON +1, Saber del Artífice (doble competencia en INT (Historia) sobre objetos mágicos/alquímicos/tecnológicos), Manitas (puedes construir dispositivos mecánicos Diminutos: caja de música, encendedor o juguete mecánico).' },
  },
  { id: 'semielfo', nombre: 'Semielfo', icon: '🌿',
    descripcion: 'Los semielfos combinan las mejores cualidades de sus progenitores élficos y humanos.',
    details: [
      { label: 'Bonificación', value: 'CAR +2, dos +1 a elección' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Linaje feérico, Versatilidad en habilidades' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Carisma aumenta en 2 y otras dos puntuaciones de tu elección aumentan en 1.' },
      { nombre: 'Edad', desc: 'Los semielfos maduran como los humanos pero a menudo superan los ciento ochenta años.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Linaje Feérico', desc: 'Tienes ventaja en las tiradas de salvación para evitar que te hechicen y la magia no puede dormirte.' },
      { nombre: 'Versátil con Habilidades', desc: 'Ganas competencia en dos habilidades de tu elección.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir común, elfo y un idioma adicional de tu elección.' },
    ],
    subraza: null,
  },
  { id: 'semiorco', nombre: 'Semiorco', icon: '💪',
    descripcion: 'Los semiorcos combinan la fuerza de sus ancestros orcos con la tenacidad humana.',
    details: [
      { label: 'Bonificación', value: 'FUE +2, CON +1' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Amenazador, Aguante incansable, Ataques salvajes' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Fuerza aumenta en 2 y tu Constitución en 1.' },
      { nombre: 'Edad', desc: 'Los semiorcos maduran en torno a los catorce años y rara vez viven más de setenta y cinco años.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Amenazador', desc: 'Eres competente en la habilidad Intimidación.' },
      { nombre: 'Aguante Incansable', desc: 'Cuando tus puntos de golpe se reducen a 0 pero no mueres inmediatamente, puedes recuperar 1 PG. Se recupera tras un descanso largo.' },
      { nombre: 'Ataques Salvajes', desc: 'Cuando causes un crítico con un ataque con arma cuerpo a cuerpo, puedes tirar uno de los dados de daño una vez más y sumar el resultado al daño adicional del crítico.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común y orco.' },
    ],
    subraza: null,
  },
  { id: 'tiefling', nombre: 'Tiefling', icon: '😈',
    descripcion: 'Los tieflings descienden de linajes humanos que han sido tocados por la esencia de los Nueve Infiernos.',
    details: [
      { label: 'Bonificación', value: 'CAR +2, INT +1' },
      { label: 'Velocidad', value: '9 m (30 pies)' },
      { label: 'Visión', value: 'Visión en la oscuridad (18 m)' },
      { label: 'Rasgos', value: 'Resistencia infernal, Legado infernal' },
    ],
    rasgos: [
      { nombre: 'Mejora de Característica', desc: 'Tu puntuación de Inteligencia aumenta en 1 y tu Carisma en 2.' },
      { nombre: 'Edad', desc: 'Los tieflings alcanzan la madurez al mismo ritmo que los humanos, pero viven unos cuantos años más.' },
      { nombre: 'Visión en la Oscuridad', desc: 'Puedes ver con luz tenue a 18 m como si hubiera luz brillante y en la oscuridad como si hubiera luz tenue.' },
      { nombre: 'Resistencia Infernal', desc: 'Tienes resistencia al daño de fuego.' },
      { nombre: 'Legado Infernal', desc: 'Conoces el truco taumaturgia. A nivel 3 puedes lanzar reprensión infernal como conjuro de nivel 2 (1/descanso largo). A nivel 5 puedes lanzar oscuridad (1/descanso largo). Aptitud mágica: Carisma.' },
      { nombre: 'Idiomas', desc: 'Puedes hablar, leer y escribir en común e infernal.' },
    ],
    subraza: null,
  },
];
