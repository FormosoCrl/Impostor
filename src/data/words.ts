// Listas de palabras propias. Cada entrada: [palabra, palabra parecida].
// La palabra parecida se usa como pista para el impostor o como palabra del "Despistado".
export type WordPair = [string, string];

export interface Category {
  id: string;
  name: string;
  emoji: string;
  words: WordPair[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'comida', name: 'Comida', emoji: '🍕',
    words: [
      ['Pizza', 'Lasaña'], ['Paella', 'Risotto'], ['Tortilla de patatas', 'Revuelto'], ['Croqueta', 'Empanadilla'],
      ['Churros', 'Porras'], ['Gazpacho', 'Salmorejo'], ['Hamburguesa', 'Bocadillo'], ['Sushi', 'Ceviche'],
      ['Helado', 'Granizado'], ['Palomitas', 'Patatas fritas'], ['Chocolate', 'Turrón'], ['Tacos', 'Burrito'],
      ['Queso', 'Mantequilla'], ['Huevo frito', 'Huevo cocido'], ['Jamón', 'Chorizo'], ['Ensalada', 'Verduras al vapor'],
      ['Macarrones', 'Espaguetis'], ['Donut', 'Magdalena'], ['Fresa', 'Cereza'], ['Sandía', 'Melón'],
      ['Plátano', 'Mango'], ['Limón', 'Lima'], ['Pan', 'Tostada'], ['Kebab', 'Shawarma'],
      ['Albóndigas', 'Filete'], ['Sopa', 'Caldo'], ['Tarta', 'Bizcocho'], ['Galleta', 'Tortita'],
      ['Aceituna', 'Pepinillo'], ['Nachos', 'Totopos'],
    ],
  },
  {
    id: 'animales', name: 'Animales', emoji: '🦁',
    words: [
      ['León', 'Tigre'], ['Perro', 'Lobo'], ['Gato', 'Conejo'], ['Elefante', 'Rinoceronte'],
      ['Jirafa', 'Cebra'], ['Delfín', 'Tiburón'], ['Ballena', 'Orca'], ['Pingüino', 'Foca'],
      ['Águila', 'Halcón'], ['Loro', 'Canario'], ['Serpiente', 'Lagarto'], ['Cocodrilo', 'Tortuga'],
      ['Mono', 'Gorila'], ['Oso', 'Panda'], ['Caballo', 'Burro'], ['Vaca', 'Toro'],
      ['Cerdo', 'Jabalí'], ['Oveja', 'Cabra'], ['Gallina', 'Pato'], ['Ratón', 'Hámster'],
      ['Abeja', 'Avispa'], ['Mariposa', 'Libélula'], ['Araña', 'Escorpión'], ['Pulpo', 'Calamar'],
      ['Canguro', 'Koala'], ['Búho', 'Murciélago'], ['Camello', 'Llama'], ['Zorro', 'Mapache'],
      ['Caracol', 'Babosa'], ['Flamenco', 'Cigüeña'],
    ],
  },
  {
    id: 'lugares', name: 'Lugares', emoji: '🏖️',
    words: [
      ['Playa', 'Piscina'], ['Hospital', 'Farmacia'], ['Colegio', 'Universidad'], ['Aeropuerto', 'Estación de tren'],
      ['Supermercado', 'Mercado'], ['Cine', 'Teatro'], ['Discoteca', 'Bar'], ['Gimnasio', 'Polideportivo'],
      ['Biblioteca', 'Librería'], ['Iglesia', 'Museo'], ['Cárcel', 'Comisaría'], ['Zoo', 'Acuario'],
      ['Parque de atracciones', 'Feria'], ['Montaña', 'Volcán'], ['Desierto', 'Selva'], ['Restaurante', 'Cafetería'],
      ['Hotel', 'Camping'], ['Peluquería', 'Spa'], ['Banco', 'Oficina'], ['Estadio', 'Pabellón'],
      ['Cementerio', 'Funeraria'], ['Granja', 'Huerto'], ['Isla', 'Barco'], ['Castillo', 'Palacio'],
      ['Gasolinera', 'Taller'], ['Ascensor', 'Escalera'], ['Cocina', 'Baño'], ['Azotea', 'Balcón'],
      ['Metro', 'Autobús'], ['Faro', 'Puerto'],
    ],
  },
  {
    id: 'casa', name: 'Cosas de casa', emoji: '🛋️',
    words: [
      ['Sofá', 'Sillón'], ['Nevera', 'Congelador'], ['Microondas', 'Horno'], ['Lavadora', 'Lavavajillas'],
      ['Cama', 'Litera'], ['Almohada', 'Cojín'], ['Espejo', 'Ventana'], ['Escoba', 'Fregona'],
      ['Tenedor', 'Cuchara'], ['Sartén', 'Olla'], ['Paraguas', 'Chubasquero'], ['Llave', 'Candado'],
      ['Mando a distancia', 'Teclado'], ['Lámpara', 'Vela'], ['Reloj', 'Despertador'], ['Cepillo de dientes', 'Peine'],
      ['Toalla', 'Albornoz'], ['Mesa', 'Escritorio'], ['Silla', 'Taburete'], ['Tijeras', 'Cuchillo'],
      ['Cargador', 'Enchufe'], ['Ventilador', 'Aire acondicionado'], ['Cortina', 'Persiana'], ['Alfombra', 'Felpudo'],
      ['Tostadora', 'Sandwichera'], ['Cafetera', 'Tetera'], ['Secador', 'Plancha de pelo'], ['Aspiradora', 'Robot aspirador'],
      ['Grifo', 'Ducha'], ['Percha', 'Armario'],
    ],
  },
  {
    id: 'profesiones', name: 'Profesiones', emoji: '👩‍⚕️',
    words: [
      ['Médico', 'Enfermero'], ['Profesor', 'Monitor'], ['Bombero', 'Socorrista'], ['Policía', 'Guardia de seguridad'],
      ['Cocinero', 'Camarero'], ['Piloto', 'Azafato'], ['Abogado', 'Juez'], ['Dentista', 'Veterinario'],
      ['Peluquero', 'Maquillador'], ['Fontanero', 'Electricista'], ['Carpintero', 'Albañil'], ['Periodista', 'Presentador'],
      ['Actor', 'Cantante'], ['Futbolista', 'Árbitro'], ['Agricultor', 'Pescador'], ['Taxista', 'Conductor de autobús'],
      ['Astronauta', 'Científico'], ['Mago', 'Payaso'], ['Cartero', 'Repartidor'], ['Panadero', 'Pastelero'],
      ['Arquitecto', 'Ingeniero'], ['Fotógrafo', 'Pintor'], ['Programador', 'Informático'], ['Detective', 'Espía'],
      ['Soldado', 'Marinero'], ['Influencer', 'Youtuber'], ['DJ', 'Músico'], ['Cajero', 'Dependiente'],
      ['Psicólogo', 'Coach'], ['Jardinero', 'Florista'],
    ],
  },
  {
    id: 'deportes', name: 'Deportes', emoji: '⚽',
    words: [
      ['Fútbol', 'Fútbol sala'], ['Baloncesto', 'Balonmano'], ['Tenis', 'Pádel'], ['Natación', 'Waterpolo'],
      ['Ciclismo', 'Atletismo'], ['Boxeo', 'Kárate'], ['Golf', 'Minigolf'], ['Esquí', 'Snowboard'],
      ['Surf', 'Windsurf'], ['Voleibol', 'Vóley playa'], ['Rugby', 'Fútbol americano'], ['Béisbol', 'Críquet'],
      ['Ajedrez', 'Damas'], ['Escalada', 'Senderismo'], ['Patinaje', 'Skate'], ['Yoga', 'Pilates'],
      ['Bolos', 'Petanca'], ['Dardos', 'Billar'], ['Maratón', 'Triatlón'], ['Hockey', 'Curling'],
      ['Gimnasia', 'Danza'], ['Equitación', 'Polo'], ['Tiro con arco', 'Esgrima'], ['Remo', 'Piragüismo'],
      ['Ping pong', 'Bádminton'], ['Fórmula 1', 'Karting'], ['Paracaidismo', 'Puenting'], ['Buceo', 'Snorkel'],
      ['Crossfit', 'Halterofilia'], ['Parkour', 'Breakdance'],
    ],
  },
  {
    id: 'fiesta', name: 'Fiesta y previa', emoji: '🎉',
    words: [
      ['Botellón', 'Terraceo'], ['Karaoke', 'Concierto'], ['Chupito', 'Cubata'], ['Resaca', 'Insomnio'],
      ['Cumpleaños', 'Despedida de soltero'], ['Boda', 'Bautizo'], ['Nochevieja', 'Navidad'], ['Carnaval', 'Halloween'],
      ['Hielo', 'Granizo'], ['Vaso de plástico', 'Pajita'], ['Altavoz', 'Auriculares'], ['Photocall', 'Selfie'],
      ['Discomóvil', 'Verbena'], ['Brindis', 'Discurso'], ['Pulsera VIP', 'Entrada'], ['Portero', 'Camarero'],
      ['Afterparty', 'Desayuno'], ['Confeti', 'Serpentina'], ['Globo', 'Piñata'], ['Ligar', 'Bailar'],
      ['Taxi de vuelta', 'Búho nocturno'], ['Juego de beber', 'Juego de cartas'], ['Lista de reproducción', 'Radio'], ['Disfraz', 'Pijama'],
      ['Festival', 'Feria'], ['Tarta de cumpleaños', 'Velas'], ['Fuegos artificiales', 'Bengalas'], ['Barbacoa', 'Picnic'],
      ['Mensaje a tu ex', 'Llamada perdida'], ['Fiesta de pijamas', 'Acampada'],
    ],
  },
  {
    id: 'transporte', name: 'Transporte', emoji: '🚗',
    words: [
      ['Coche', 'Moto'], ['Avión', 'Helicóptero'], ['Barco', 'Submarino'], ['Tren', 'Tranvía'],
      ['Bicicleta', 'Patinete'], ['Camión', 'Furgoneta'], ['Ambulancia', 'Coche de policía'], ['Cohete', 'Ovni'],
      ['Globo aerostático', 'Dirigible'], ['Canoa', 'Kayak'], ['Teleférico', 'Funicular'], ['Tractor', 'Excavadora'],
      ['Limusina', 'Taxi'], ['Velero', 'Yate'], ['Monopatín', 'Patines'], ['Caravana', 'Autocaravana'],
      ['Moto de agua', 'Lancha'], ['Carruaje', 'Trineo'], ['Ascensor', 'Escalera mecánica'], ['Parapente', 'Ala delta'],
      ['Autobús escolar', 'Autocar'], ['Camión de bomberos', 'Grúa'], ['Quad', 'Buggy'], ['Hidroavión', 'Avioneta'],
      ['Tren de alta velocidad', 'Tren de cercanías'], ['Crucero', 'Ferry'], ['Segway', 'Hoverboard'], ['Rickshaw', 'Tuk tuk'],
      ['Carrito de golf', 'Coche de choque'], ['Montaña rusa', 'Noria'],
    ],
  },
  {
    id: 'objetos', name: 'Objetos', emoji: '🎒',
    words: [
      ['Mochila', 'Maleta'], ['Gafas de sol', 'Gorra'], ['Móvil', 'Tablet'], ['Ordenador', 'Consola'],
      ['Bolígrafo', 'Lápiz'], ['Libro', 'Revista'], ['Guitarra', 'Ukelele'], ['Piano', 'Teclado'],
      ['Batería', 'Tambor'], ['Cámara de fotos', 'Prismáticos'], ['Linterna', 'Mechero'], ['Cartera', 'Monedero'],
      ['Anillo', 'Pulsera'], ['Collar', 'Pendientes'], ['Zapatillas', 'Chanclas'], ['Bufanda', 'Corbata'],
      ['Balón', 'Raqueta'], ['Muñeca', 'Peluche'], ['Dado', 'Ficha'], ['Brújula', 'Mapa'],
      ['Martillo', 'Destornillador'], ['Tirita', 'Venda'], ['Termómetro', 'Báscula'], ['Pelota de playa', 'Flotador'],
      ['Cometa', 'Dron'], ['Bombilla', 'Pilas'], ['Sobre', 'Postal'], ['Calendario', 'Agenda'],
      ['Corona', 'Sombrero'], ['Varita mágica', 'Bastón'],
    ],
  },
  {
    id: 'naturaleza', name: 'Naturaleza y tiempo', emoji: '🌋',
    words: [
      ['Sol', 'Luna'], ['Lluvia', 'Nieve'], ['Arcoíris', 'Aurora boreal'], ['Tormenta', 'Huracán'],
      ['Río', 'Lago'], ['Mar', 'Océano'], ['Bosque', 'Jungla'], ['Cueva', 'Túnel'],
      ['Cascada', 'Fuente'], ['Terremoto', 'Tsunami'], ['Estrella', 'Planeta'], ['Nube', 'Niebla'],
      ['Árbol', 'Arbusto'], ['Rosa', 'Tulipán'], ['Cactus', 'Palmera'], ['Arena', 'Barro'],
      ['Hielo', 'Glaciar'], ['Fuego', 'Lava'], ['Viento', 'Tornado'], ['Rayo', 'Trueno'],
      ['Primavera', 'Verano'], ['Otoño', 'Invierno'], ['Amanecer', 'Atardecer'], ['Cometa', 'Meteorito'],
      ['Seta', 'Musgo'], ['Concha', 'Coral'], ['Piedra', 'Roca'], ['Pradera', 'Campo de trigo'],
      ['Isla desierta', 'Oasis'], ['Eclipse', 'Luna llena'],
    ],
  },
];

export const CUSTOM_CATEGORY_ID = 'custom';
