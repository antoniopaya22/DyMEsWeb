export interface SubclassOption {
  id: string;
  nombre: string;
  descripcion: string;
  fuente: string;
}

export const SUBCLASS_OPTIONS: Record<string, SubclassOption[]> = {
  barbaro: [
    { id: "senda_berserker", nombre: "Senda del Berserker", descripcion: "Canalizas tu furia en un frenesí violento e imparable. Tu rabia incontrolable te permite atacar sin cesar y aterrorizar al enemigo.", fuente: "SRD" },
    { id: "senda_corazon_salvaje", nombre: "Senda del Corazón Salvaje", descripcion: "Tu furia te conecta con espíritus animales que te otorgan poderes sobrenaturales: la resistencia del oso, el vuelo del águila o la ferocidad del lobo.", fuente: "PHB" },
    { id: "senda_arbol_mundo", nombre: "Senda del Árbol del Mundo", descripcion: "Tu furia te conecta al Árbol del Mundo, el puente cósmico entre los planos. Proteges aliados, teletransportas combatientes y golpeas con raíces ancestrales.", fuente: "PHB" },
  ],

  bardo: [
    { id: "colegio_conocimiento", nombre: "Colegio del Conocimiento", descripcion: "Recoges conocimiento de casi cualquier fuente. Tu saber y tus palabras cortantes inspiran y desmoralizan a partes iguales.", fuente: "SRD" },
    { id: "colegio_valor", nombre: "Colegio del Valor", descripcion: "Inspiras a otros con actos heroicos. Ganas competencia en armaduras medias, escudos y armas marciales.", fuente: "PHB" },
    { id: "colegio_espadas", nombre: "Colegio de las Espadas", descripcion: "Combinas el arte escénico con la destreza marcial, usando florituras de combate como extensión de tu actuación.", fuente: "XGtE" },
    { id: "colegio_danza", nombre: "Colegio de la Danza", descripcion: "Tu arte es el movimiento. Tu danza inspira a tus aliados, desconcierta a tus enemigos y te protege del peligro.", fuente: "PHB" },
  ],

  brujo: [
    { id: "patron_feerico", nombre: "El Archihada", descripcion: "Tu pacto se nutre del poder del Feywild. Tu patrón es un archihada caprichosa que te otorga magia de encantamiento y teletransportación.", fuente: "SRD" },
    { id: "patron_infernal", nombre: "El Infernal", descripcion: "Tu pacto se nutre de los Planos Inferiores. Tu patrón es un señor demoníaco o diablo que te otorga poder destructivo y resistencia infernal.", fuente: "PHB" },
    { id: "patron_gran_antiguo", nombre: "El Gran Antiguo", descripcion: "Tu pacto se nutre de saber prohibido de seres inefables del Reino Lejano. Tu patrón te otorga poder telepático y magia psíquica.", fuente: "PHB" },
    { id: "patron_celestial", nombre: "El Celestial", descripcion: "Tu pacto se nutre de los Planos Superiores. Tu patrón es un ser celestial que te otorga magia curativa y energía radiante.", fuente: "XGtE" },
  ],

  clerigo: [
    { id: "dominio_vida", nombre: "Dominio de la Vida", descripcion: "Te especializas en la energía positiva que sustenta la vida. Tus conjuros curativos son excepcionalmente potentes.", fuente: "SRD" },
    { id: "dominio_luz", nombre: "Dominio de la Luz", descripcion: "Canalizas el poder divino para traer fuego abrasador y revelación. Dispersas la oscuridad y castigas con resplandor radiante.", fuente: "PHB" },
    { id: "dominio_guerra", nombre: "Dominio de la Guerra", descripcion: "Eres un campeón divino en el campo de batalla. Atacas con acción adicional y guías los golpes de tus aliados.", fuente: "PHB" },
    { id: "dominio_tempestad", nombre: "Dominio de la Tempestad", descripcion: "Dominas el poder de las tormentas. Castigas a los atacantes con relámpagos y truenos.", fuente: "PHB" },
    { id: "dominio_engano", nombre: "Dominio del Engaño", descripcion: "Tu magia se centra en el engaño, la ilusión y el sigilo. Creas duplicados ilusorios y te teletransportas.", fuente: "PHB" },
    { id: "dominio_naturaleza", nombre: "Dominio de la Naturaleza", descripcion: "Sirves a una deidad de la naturaleza, obteniendo poder sobre plantas, animales y los elementos.", fuente: "PHB" },
  ],

  druida: [
    { id: "circulo_tierra", nombre: "Círculo de la Tierra", descripcion: "Salvaguardas conocimiento y ritos antiguos. Eliges un tipo de tierra que te otorga conjuros adicionales.", fuente: "SRD" },
    { id: "circulo_luna", nombre: "Círculo de la Luna", descripcion: "Usas magia lunar para transformarte en bestias más poderosas, con formas mejoradas y mayor resistencia.", fuente: "PHB" },
    { id: "circulo_estrellas", nombre: "Círculo de las Estrellas", descripcion: "Lees los astros y canalizas su poder. Adoptas formas estelares que potencian tu magia.", fuente: "TCoE" },
    { id: "circulo_esporas", nombre: "Círculo de las Esporas", descripcion: "Encuentras belleza en la descomposición. Usas esporas y necrosis como armas.", fuente: "TCoE" },
  ],

  explorador: [
    { id: "cazador", nombre: "Cazador", descripcion: "Proteges la naturaleza y a las personas de las fuerzas que las destruirían, acechando a tu presa en las tierras salvajes.", fuente: "SRD" },
    { id: "senor_bestias", nombre: "Señor de las Bestias", descripcion: "Forjas un vínculo místico con una bestia primordial, canalizando magia primordial.", fuente: "PHB" },
    { id: "acechador_sombrio", nombre: "Acechador Sombrío", descripcion: "Estás como en casa en los lugares más oscuros, empuñando magia del Shadowfell.", fuente: "XGtE" },
    { id: "asesino_monstruos", nombre: "Asesino de Monstruos", descripcion: "Te especializas en cazar vampiros, dragones, infernales y otras amenazas mágicas.", fuente: "XGtE" },
  ],

  guerrero: [
    { id: "campeon", nombre: "Campeón", descripcion: "Persigues la excelencia física. Amplías tu rango de crítico y resistes en las peores situaciones.", fuente: "SRD" },
    { id: "maestro_batalla", nombre: "Maestro de Batalla", descripcion: "Empleas maniobras tácticas con dados de superioridad para controlar el campo de batalla.", fuente: "PHB" },
    { id: "caballero_sobrenatural", nombre: "Caballero Sobrenatural", descripcion: "Complementas tu maestría marcial con conjuros arcanos de mago, combinando espada y hechicería.", fuente: "PHB" },
    { id: "samurai", nombre: "Samurái", descripcion: "Tu espíritu inquebrantable te otorga ventaja en ataques, PG temporales y la capacidad de desafiar a la muerte.", fuente: "XGtE" },
  ],

  hechicero: [
    { id: "linaje_draconico", nombre: "Linaje Dracónico", descripcion: "Tu magia innata proviene del don de un dragón. Ganas escamas, afinidad elemental y alas dracónicas.", fuente: "SRD" },
    { id: "magia_salvaje", nombre: "Magia Salvaje", descripcion: "Tu magia innata surge del caos. Oleadas impredecibles de magia pueden tener efectos aleatorios.", fuente: "PHB" },
    { id: "alma_divina", nombre: "Alma Divina", descripcion: "Una chispa divina alimenta tu magia. Puedes acceder a conjuros de clérigo además de los de hechicero.", fuente: "XGtE" },
    { id: "mente_aberrante", nombre: "Mente Aberrante", descripcion: "Una influencia alienígena envuelve tu mente, otorgándote poder psiónico y telepatía.", fuente: "TCoE" },
  ],

  mago: [
    { id: "escuela_evocacion", nombre: "Escuela de Evocación", descripcion: "Dominas la energía destructiva pura. Tus conjuros de área pueden proteger aliados y tus trucos causan daño mínimo asegurado.", fuente: "SRD" },
    { id: "escuela_abjuracion", nombre: "Escuela de Abjuración", descripcion: "Te especializas en magia protectora. Ganas un Escudo Arcano de PG temporales.", fuente: "PHB" },
    { id: "escuela_adivinacion", nombre: "Escuela de Adivinación", descripcion: "Percibes el futuro. Tras cada descanso largo tiras dados de Portento para reemplazar tiradas.", fuente: "PHB" },
    { id: "escuela_ilusion", nombre: "Escuela de Ilusión", descripcion: "Creas engaños mágicos cada vez más realistas e incluso parcialmente reales.", fuente: "PHB" },
    { id: "escuela_nigromancia", nombre: "Escuela de Nigromancia", descripcion: "Manipulas las fuerzas de la vida y la muerte. Puedes drenar vitalidad y crear siervos no muertos.", fuente: "PHB" },
    { id: "escuela_transmutacion", nombre: "Escuela de Transmutación", descripcion: "Alteras la forma y propiedades de la materia. Creas la Piedra del Transmutador.", fuente: "PHB" },
  ],

  monje: [
    { id: "mano_abierta", nombre: "Camino de la Mano Abierta", descripcion: "Dominas las técnicas de combate desarmado. Tus golpes pueden impedir reacciones, empujar o derribar enemigos.", fuente: "SRD" },
    { id: "sombra", nombre: "Camino de la Sombra", descripcion: "Canalizas el poder del Shadowfell para manipular sombras, teletransportarte y volverte invisible.", fuente: "PHB" },
    { id: "elementos", nombre: "Camino de los Cuatro Elementos", descripcion: "Canalizas el poder elemental para potenciar golpes con ácido, frío, fuego, rayo o trueno.", fuente: "PHB" },
    { id: "misericordia", nombre: "Camino de la Misericordia", descripcion: "Manipulas la fuerza vital: curas heridas con un toque y traes la muerte con el otro.", fuente: "TCoE" },
  ],

  paladin: [
    { id: "juramento_devocion", nombre: "Juramento de Devoción", descripcion: "Dedicado a los ideales de justicia y orden. Eres un faro de esperanza, protección y virtud.", fuente: "SRD" },
    { id: "juramento_antiguos", nombre: "Juramento de los Antiguos", descripcion: "Proteges la luz y la vida en el mundo. Amas lo bello y lo vivificante.", fuente: "PHB" },
    { id: "juramento_venganza", nombre: "Juramento de Venganza", descripcion: "Juraste castigar a quienes cometieron actos gravemente malvados. Tu furia sagrada se dirige contra el mal.", fuente: "PHB" },
    { id: "juramento_conquista", nombre: "Juramento de Conquista", descripcion: "Aplastas el caos con fuerza implacable. Buscas gloria en batalla y la subyugación de tus enemigos.", fuente: "XGtE" },
  ],

  picaro: [
    { id: "ladron", nombre: "Ladrón", descripcion: "Perfeccionas las artes del hurto y la infiltración. Ganas manos rápidas y habilidad para usar objetos mágicos.", fuente: "SRD" },
    { id: "asesino", nombre: "Asesino", descripcion: "Te especializas en la eliminación rápida. Ganas competencia con venenos y daño devastador contra desprevenidos.", fuente: "PHB" },
    { id: "embaucador_arcano", nombre: "Embaucador Arcano", descripcion: "Complementas tu agilidad con conjuros de mago, focalizándote en encantamiento e ilusión.", fuente: "PHB" },
    { id: "espadachin", nombre: "Espadachín", descripcion: "Combinas encanto, agilidad y destreza con la espada. Provocas y esquivas con elegancia.", fuente: "XGtE" },
  ],
};
