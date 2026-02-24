// ─── Background types & data ────────────────────────────
export interface BackgroundDetail {
  label: string;
  value: string;
}

export interface Background {
  id: string;
  nombre: string;
  icon: string;
  descripcion: string;
  details: BackgroundDetail[];
  rasgoDesc: string;
}

export const BACKGROUNDS: Background[] = [
  { id: 'acolito', nombre: 'Acólito', icon: '⛪',
    descripcion: 'Has dedicado tu vida al servicio de un templo consagrado a un dios o a un panteón concretos. Intermedias entre el reino de lo sagrado y el mundo mortal, y realizas rituales religiosos y ofreces sacrificios para que los fieles puedan ser partícipes de la presencia divina.',
    details: [
      { label: 'Habilidades', value: 'Perspicacia, Religión' },
      { label: 'Idiomas', value: '2 a elección' },
      { label: 'Equipo', value: 'Símbolo sagrado, devocionario, 5 varas de incienso, vestiduras, muda de ropas comunes, bolsa con 15 po' },
      { label: 'Rasgo', value: 'Refugio del Fiel' },
    ],
    rasgoDesc: 'Mereces el respeto de todos los que profesan tu fe. Puedes esperar sanación y cuidados sin coste en templos de tu fe, y tienes residencia en un templo con el que tengas lazos.',
  },
  { id: 'charlatan', nombre: 'Charlatán', icon: '🎭',
    descripcion: 'Siempre has tenido facilidad para tratar con la gente. Sabes qué les hace reír, puedes dirigir sus emociones, y usas el ingenio para engañar y salir de apuros.',
    details: [
      { label: 'Habilidades', value: 'Engaño, Juego de manos' },
      { label: 'Herramientas', value: 'Kit de disfraz, kit de falsificación' },
      { label: 'Equipo', value: 'Un juego de ropas finas, kit de disfraz, herramientas de estafa, bolsa con 15 po' },
      { label: 'Rasgo', value: 'Identidad Falsa' },
    ],
    rasgoDesc: 'Has creado una segunda identidad con documentación, contactos y disfraces. Puedes falsificar documentos y credenciales oficiales.',
  },
  { id: 'criminal', nombre: 'Criminal', icon: '🔓',
    descripcion: 'Eres un delincuente experimentado con un historial de infringir la ley. Estás familiarizado con el mundo del asesinato, el robo y la violencia del submundo.',
    details: [
      { label: 'Habilidades', value: 'Engaño, Sigilo' },
      { label: 'Herramientas', value: 'Un tipo de juego, herramientas de ladrón' },
      { label: 'Equipo', value: 'Una palanca, muda de ropas oscuras con capucha, bolsa con 15 po' },
      { label: 'Rasgo', value: 'Contacto Criminal' },
    ],
    rasgoDesc: 'Tienes un contacto fiable que actúa como enlace con una red criminal. Sabes cómo enviar y recibir mensajes a través de mensajeros, caravanas corruptas y marineros sospechosos.',
  },
  { id: 'artista', nombre: 'Artista', icon: '🎪',
    descripcion: 'Prosperas frente al público. Sabes cómo cautivar, entretener e incluso inspirar. Tu poesía, tu música o tus danzas pueden conmover los corazones de quienes escuchan.',
    details: [
      { label: 'Habilidades', value: 'Acrobacias, Interpretación' },
      { label: 'Herramientas', value: 'Kit de disfraz, un instrumento musical' },
      { label: 'Equipo', value: 'Un instrumento musical, los favores de un admirador, un traje, bolsa con 15 po' },
      { label: 'Rasgo', value: 'Favor del Público' },
    ],
    rasgoDesc: 'Siempre encontrarás un lugar donde actuar. Cuando actúas, puedes conseguir alojamiento y comida gratis de un nivel modesto o cómodo, siempre y cuando actúes cada noche.',
  },
  { id: 'heroe_popular', nombre: 'Héroe Popular', icon: '🦸',
    descripcion: 'Provienes de un entorno humilde pero estás destinado a mucho más. Tu gente ya te considera un héroe: alguien que se levantó contra la tiranía o defendió a los indefensos.',
    details: [
      { label: 'Habilidades', value: 'Trato con animales, Supervivencia' },
      { label: 'Herramientas', value: 'Un tipo de herramientas de artesano, vehículos de tierra' },
      { label: 'Equipo', value: 'Un juego de herramientas de artesano, una pala, una olla de hierro, muda de ropas comunes, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Hospitalidad Rústica' },
    ],
    rasgoDesc: 'Como vienes del pueblo llano, encajas perfectamente entre ellos. Puedes encontrar cobijo, comida y un lugar donde esconderte entre la gente corriente, que te protegerán de la ley o de cualquiera que te busque, siempre y que no pongas en peligro a nadie.',
  },
  { id: 'ermitano', nombre: 'Ermitaño', icon: '🏔️',
    descripcion: 'Has vivido en reclusión durante gran parte de tu vida, ya sea en una comunidad aislada, en la naturaleza o meditando en un templo solitario. Es un tiempo para la reflexión y el descubrimiento espiritual.',
    details: [
      { label: 'Habilidades', value: 'Medicina, Religión' },
      { label: 'Herramientas', value: 'Kit de herboristería' },
      { label: 'Idiomas', value: '1 a elección' },
      { label: 'Equipo', value: 'Un estuche de pergaminos lleno de oraciones y estudios, una manta de invierno, muda de ropas comunes, kit de herboristería, 5 po' },
      { label: 'Rasgo', value: 'Descubrimiento' },
    ],
    rasgoDesc: 'La naturaleza tranquila de tu reclusión te ha dado acceso a un descubrimiento único e importante. Puede ser una gran verdad sobre el cosmos, los dioses, los seres de los planos exteriores o las fuerzas de la naturaleza.',
  },
  { id: 'noble', nombre: 'Noble', icon: '👑',
    descripcion: 'Comprendes la riqueza, el poder y los privilegios. Llevas un título nobiliario y tu familia posee tierras, recauda impuestos y ejerce una influencia política significativa.',
    details: [
      { label: 'Habilidades', value: 'Historia, Persuasión' },
      { label: 'Herramientas', value: 'Un tipo de juego' },
      { label: 'Idiomas', value: '1 a elección' },
      { label: 'Equipo', value: 'Ropas finas, anillo con sello, pergamino genealógico, bolsa con 25 po' },
      { label: 'Rasgo', value: 'Posición Privilegiada' },
    ],
    rasgoDesc: 'Gracias a tu noble cuna, la gente tiende a pensar lo mejor de ti. Eres bienvenido en la alta sociedad y la gente asume que tienes derecho a estar dondequiera que vayas. La gente común te trata con respeto y la nobleza te reconoce como igual.',
  },
  { id: 'forajido', nombre: 'Forajido', icon: '🌲',
    descripcion: 'Creciste en la naturaleza, lejos de la civilización y de las comodidades de la ciudad. Has observado la migración de las manadas y sobrevivido a los elementos durante estaciones enteras.',
    details: [
      { label: 'Habilidades', value: 'Atletismo, Supervivencia' },
      { label: 'Herramientas', value: 'Un instrumento musical' },
      { label: 'Idiomas', value: '1 a elección' },
      { label: 'Equipo', value: 'Un bastón, una trampa para cazar, un trofeo de un animal que mataste, muda de ropas de viajero, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Vagabundo' },
    ],
    rasgoDesc: 'Tienes una memoria excelente para los mapas y la geografía. Siempre recuerdas la disposición general del terreno, los asentamientos y otros elementos a tu alrededor. Además, puedes encontrar comida y agua fresca para ti y hasta cinco personas cada día, siempre que la tierra lo permita.',
  },
  { id: 'sabio', nombre: 'Sabio', icon: '📚',
    descripcion: 'Has dedicado años de tu vida al estudio del multiverso. Has escudriñado manuscritos, estudiado pergaminos y escuchado a los mayores expertos en los temas que te interesan.',
    details: [
      { label: 'Habilidades', value: 'Arcanos, Historia' },
      { label: 'Idiomas', value: '2 a elección' },
      { label: 'Equipo', value: 'Un bote de tinta negra, una pluma, un cuchillo pequeño, una carta de un colega con una pregunta sin resolver, muda de ropas comunes, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Investigador' },
    ],
    rasgoDesc: 'Cuando intentas aprender o recordar información, si no la sabes, a menudo sabes dónde y de quién puedes obtenerla. Normalmente esta información viene de una biblioteca, un scriptorio, una universidad o un sabio. Tu GM puede dictaminar que el conocimiento que buscas está en un lugar prácticamente inaccesible.',
  },
  { id: 'marinero', nombre: 'Marinero', icon: '⚓',
    descripcion: 'Has navegado durante años y has resistido tormentas terribles. Has explorado aguas que la mayoría no se atrevería a navegar.',
    details: [
      { label: 'Habilidades', value: 'Atletismo, Percepción' },
      { label: 'Herramientas', value: 'Herramientas de navegante, vehículos acuáticos' },
      { label: 'Equipo', value: 'Una cabilla (garrote), 15 m de cuerda de seda, un amuleto de la suerte, muda de ropas comunes, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Pasaje por Barco' },
    ],
    rasgoDesc: 'Cuando lo necesites, puedes asegurarte un pasaje gratis en un barco para ti y tus compañeros. Puede que viajes en el barco en el que servías o en otro con una tripulación que te conozca. A cambio, se espera que ayudes con las tareas del barco.',
  },
  { id: 'soldado', nombre: 'Soldado', icon: '🎖️',
    descripcion: 'Pasaste años sirviendo en la milicia o en un ejército mercenario. Estás entrenado en el uso de las armas, has soportado marchas extenuantes y sabes cómo sobrevivir en el campo de batalla.',
    details: [
      { label: 'Habilidades', value: 'Atletismo, Intimidación' },
      { label: 'Herramientas', value: 'Un tipo de juego, vehículos de tierra' },
      { label: 'Equipo', value: 'Una insignia de rango, un trofeo de un enemigo caído, un juego de dados o baraja, muda de ropas comunes, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Rango Militar' },
    ],
    rasgoDesc: 'Tu rango militar te otorga cierta influencia. Los soldados leales a tu antiguo ejército te reconocen y te respetan. Puedes invocar tu rango para obtener acceso temporal a instalaciones militares y ejercer influencia sobre soldados de rango inferior.',
  },
  { id: 'pilluelo', nombre: 'Pilluelo', icon: '🐀',
    descripcion: 'Creciste en las calles, solo, huérfano y pobre. No tuviste a nadie que velara por ti ni recursos a los que recurrir, así que aprendiste a valerte por ti mismo.',
    details: [
      { label: 'Habilidades', value: 'Juego de manos, Sigilo' },
      { label: 'Herramientas', value: 'Kit de disfraz, herramientas de ladrón' },
      { label: 'Equipo', value: 'Un cuchillo pequeño, un mapa de tu ciudad natal, un ratón mascota, un recuerdo de tus padres, muda de ropas comunes, bolsa con 10 po' },
      { label: 'Rasgo', value: 'Secretos de la Ciudad' },
    ],
    rasgoDesc: 'Conoces los pasajes secretos, los callejones traseros y las rutas alternativas de tu ciudad. Puedes encontrar el camino más rápido a través de las calles y guiar a tu grupo a una velocidad de viaje doble entre dos ubicaciones dentro de la ciudad.',
  },
  { id: 'guildartisan', nombre: 'Artesano Gremial', icon: '🔨',
    descripcion: 'Eres miembro de un gremio de artesanos y dominas un conjunto de habilidades especiales. Empezaste como aprendiz bajo un artesano maestro y aprendiste los secretos de tu oficio.',
    details: [
      { label: 'Habilidades', value: 'Perspicacia, Persuasión' },
      { label: 'Herramientas', value: 'Un tipo de herramientas de artesano' },
      { label: 'Idiomas', value: '1 a elección' },
      { label: 'Equipo', value: 'Un juego de herramientas de artesano, una carta de presentación del gremio, muda de ropas de viajero, bolsa con 15 po' },
      { label: 'Rasgo', value: 'Membresía del Gremio' },
    ],
    rasgoDesc: 'Tu gremio te proporciona alojamiento y comida si es necesario, y paga el coste de tu funeral. En algunas ciudades o pueblos, la sede del gremio ofrece un punto de reunión con posibles patrones, aliados o colaboradores. La membresía te da acceso a contactos políticos y conexiones comerciales.',
  },
];
