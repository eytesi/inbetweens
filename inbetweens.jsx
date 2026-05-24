import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// NARRATIVAS — todo el texto del juego
// ═══════════════════════════════════════════════════════════
const N = {

  // ── INTRO por aspiración ──
  "intro:familia": [
    "El apartamento en La Vega huele a pintura fresca y posibilidades. Desde la ventana se ve el barrio despertando: jóvenes con mochilas, una vecina regando sus plantas, el olor a café flotando desde algún piso de abajo.\n\nA lo lejos, entre los techos, brilla el Lago Miren.\n\n*Velin*, pensás. Esto puede ser casa.",
  ],
  "intro:artista": [
    "La primera luz del Veloer entra por las cortinas y te pinta la pared de dorado. Ya estás pensando en cómo capturarlo: con palabras, con notas, con lo que sea que usés para hacer lo que hacés.\n\nVeloria desde acá parece un lugar que tiene ganas de ser representado. Bien.",
  ],
  "intro:empresario": [
    "El apartamento es una inversión. La ciudad, una oportunidad. Veloria desde la ventana se ve pequeña pero tiene algo: un ritmo propio, un mercado que conoce sus reglas, gente que confía en quienes demuestran que merecen confianza.\n\nHoy es día uno.",
  ],
  "intro:alma": [
    "Abajo, el barrio despierta. Alguien hace café dos pisos más abajo. Una nena corre por la vereda. Desde la esquina, una Twin mayor te saluda aunque todavía no te conozca.\n\nVeloria es un lugar donde eso pasa. Donde la gente todavía se saluda. Eso es lo que viniste a buscar.",
  ],

  // ── ACCIONES EN CASA ──
  sleep: [
    "Te recostás y el día se derrama en silencio. Afuera, Veloria sigue girando: el Lago Miren respira, el Velin dorado canta una nota lejana.\n\nCuando abrís los ojos, la luz del Veloer ya empezó su carrera hacia el horizonte.",
    "Soñás con el lago, con voces que hablaban Twinés y te llamaban por un nombre que no era exactamente el tuyo.\n\nTe despertás despejado/a, con algo parecido a la paz.",
  ],
  cook: [
    "El olor a Pan Velin recién hecho llena cada rincón del apartamento. Los vecinos deben estar respirándolo también.\n\nHay algo en cocinar en Veloria que se siente como un ritual antiguo, como si la comida fuera otra forma de decir *Kalei*.",
    "La cocina es pequeña pero perfecta. Seguís una receta de memoria, añadiendo especias doradas del mercado. El resultado no es perfecto pero es tuyo.",
  ],
  shower: [
    "El agua caliente borra las últimas capas del cansancio. Salís con la piel fresca y la cabeza más liviana.\n\nEn Veloria hasta ducharse se siente diferente; quizás porque el agua viene del Miren.",
  ],
  bathroom: [
    "Te tomás un momento. La ventana del baño da a un patio interno con un Mireno pequeño. Sus hojas claras se mueven despacio.",
  ],
  rest: [
    "Te tirás en el sillón con una taza de Té Miren. El barrio hace sus ruidos habituales: pasos, alguna voz, el viento entre los lofts.\n\nNo pensás en nada especial. Ese es justamente el punto.",
    "Un rato sin hacer nada en particular. La tarde avanza despacio. Te acordás de por qué viniste a Veloria: para tener tiempo para esto.",
  ],
  hobby: [
    "Agarrás lo que te llama hoy y dejás que las manos hagan lo suyo. No todo sale bien. Pero hay un momento, breve y exacto, en que algo hace click y te sentís más vos mismo/a que en todo el día.",
    "Dos horas adentro de tu hobbie y el mundo de afuera desapareció. Cuando parás, hay algo nuevo donde antes había una página en blanco.",
  ],

  // ── CAFÉ DE ARIA ──
  coffee: [
    "El café de Aria es exactamente lo que necesitabas. La taza calienta las manos. Por la ventana ves pasar a los Twins de La Vega con sus ritmos propios.",
    "Pedís el habitual. Aria lo pone en la barra sin preguntar — ya empezó a conocerte. Tiene algo de Hierba Luma, levísimo, que hace que todo parezca más llevadero.",
  ],
  read_cafe: [
    "Te instalás en el rincón del fondo con un libro. Dos horas después levantás la vista y el café está frío. No importa.\n\nAlgo del texto se quedó adentro tuyo como una canción que no recordás haber aprendido.",
  ],
  observe: [
    "Mirás la calle desde la ventana. La Vega tiene su propio ritmo: rápido, joven, un poco desprolijo. Ven pasar Twins con mochilas, con plantas en macetas, con cajas.\n\nVeloria entra y sale sin pedir permiso.",
    "Una hora mirando sin propósito fijo. Aprendés más de un barrio observando que preguntando. La Vega es un lugar que todavía se está inventando a sí mismo.",
  ],

  // ── PLAZA DEL VELOER ──
  walk_plaza: [
    "La Plaza del Veloer es el corazón de El Casco. Los adoquines brillan levemente húmedos. La estatua de Miren Veloer mira hacia el lago como siempre.\n\nHay algo permanente en este lugar que el resto de la ciudad no tiene.",
    "El Casco tiene una gravedad propia. Caminás y sentís el peso de cuatrocientos años debajo de los pies. Cada piedra de la plaza fue pisada por todos los que vinieron antes que vos.",
  ],
  market: [
    "El mercado ofrece de todo: especias doradas del norte, flores Velora en pequeños ramos, libros de segunda mano, semillas para plantar. Hablás con dos vendedores, probás algo, no comprás nada. Pero te vas más rico/a de todos modos.",
    "Entre los puestos encontrás cosas que no sabías que buscabas. Un Twin viejo te ofrece Hierba Luma fresca y te cuenta cómo preparar el Té Miren como lo hacía su madre.",
  ],

  // ── LIBRERÍA DE SOREN ──
  browse_books: [
    "La librería de Soren huele a papel viejo y madera clara. Las estanterías llegan hasta el techo con una escalera en rieles que cruje un poco.\n\nEncontrás tres libros que te llaman y te quedás parado/a leyendo primeras páginas durante demasiado tiempo.",
    "Cada libro tiene una nota a mano de Soren en la primera página: una frase corta, un contexto, a veces una advertencia. *Este te va a romper el corazón*, dice uno. Lo dejás. Lo agarrás de nuevo.",
  ],
  buy_book: [
    "Soren envuelve el libro en papel marrón sin que se lo pidas. *Para preservar la primera impresión*, dice sin mirarte.\n\nLo guardás en la mochila y sentís que compraste algo más que papel.",
  ],

  // ── MUELLE Y LAGO ──
  fish: [
    "La caña casi no pesa. El Lago Miren refleja las nubes con una claridad que marea un poco. Esperás. Eso es todo lo que hay que hacer.\n\nDos horas después tenés tres Mirenpeces y la cabeza vacía de todo lo que la tenía llena.",
    "Pescar en el Miren es aprender paciencia de una manera que ningún libro puede enseñar. El agua espeja el Veloer cuando empieza a caer. Un Mirenpez pica, jalás, y por un momento sos solo eso: alguien tirando de algo brillante en la luz.",
  ],
  sit_lake: [
    "Te sentás en el borde del muelle y dejás los pies colgar. El lago es quieto hoy. Las escamas de los Mirenpeces brillan bajo el agua, puntos de plata en el verde.\n\nPensás en lo que le contarías al lago si fueras a hablarle. Quizás la próxima vez.",
    "El agua del Miren hace un ruido suave contra la madera. Nada que resolver, nada que decir. El Lago escucha de todas formas.",
  ],
  swim: [
    "El Lago Miren entra en el cuerpo como una revelación. Frío al principio, después perfectamente tuyo. Nadás lejos hasta que el muelle parece pequeño y Veloria desde acá es solo tejados y árboles y el campanario del Casco.\n\nLa vuelta siempre llega demasiado pronto.",
  ],
  secret_lake: [
    "Te acercás a la orilla donde el agua está más quieta. Mirás alrededor: no hay nadie. En voz baja le contás algo al lago. Un pensamiento que no le dijiste a nadie.\n\nEl agua sigue igual. Pero vos te sentís un poco más liviano/a.",
    "La leyenda dice que el Lago Miren no olvida. Le contás tu secreto de todas formas. Hay algo liberador en confiarle algo a alguien que nunca va a repetírtelo.",
  ],
  walk_shore: [
    "La orilla del Miren al atardecer es uno de los mejores lugares del mundo. No de Veloria: del mundo. La luz se vuelve dorada y el lago la duplica.\n\nCaminás despacio, sin destino, recogiendo piedras planas para después.",
    "Las flores Velora crecen a lo largo de la orilla sur. Sus pétalos dorados abren solo al atardecer. Caminás entre ellas con cuidado. Llevar una sin que te la den sería una ofensa que Veloria no perdona fácilmente.",
  ],

  // ── RESTAURANTE DE NELA ──
  eat_dish: [
    "El Mirenpez al Veloer de Nela es exactamente igual a como lo describieron: el pescado se deshace solo, las especias doradas hacen el trabajo callado de transformar algo bueno en algo sagrado.\n\nComés despacio. No querés que se termine.",
    "El plato llega humeando. Nela lo puso sin decir nada, solo asintió una vez como si supiera que ibas a necesitarlo. Tenía razón.",
  ],
  cena: [
    "La cena completa en el restaurante de Nela es una experiencia. Tres platos, Lumaven joven al final, y la vista al lago desde la mesa del fondo.\n\nVeloria desde acá se ve exactamente como debería verse: perfecta en su imperfección.",
  ],

  // ── BIBLIOTECA ──
  research: [
    "Los archivos de la Biblioteca guardan cuatrocientos años de historia de Veloria. Leés sobre la Llegada, sobre la Era de las Luces. Pero hay algo raro: las referencias a los fundadores siempre mencionan doce nombres. Solo doce. Nunca más.",
    "Entre las páginas de un libro antiguo encontrás una nota manuscrita olvidada: *¿Quién fue el primero en cruzar?* No tiene firma ni fecha.\n\nLa doblás de vuelta y la dejás donde estaba.",
  ],
  read_lib: [
    "La sala de lectura de Veleta tiene ventanas al jardín interno. Leés durante horas con el único ruido de las páginas y, de vez en cuando, los pasos de Ciro en algún pasillo lejano.\n\nEs uno de los mejores lugares para pensar sin tener que pensar.",
  ],

  // ── TEATRO DE CAEL ──
  watch_show: [
    "La obra de esta semana habla de dos Twins que se buscan sin saber que ya se encontraron. El teatro es pequeño y la actuación tan cercana que podés ver los ojos de los actores.\n\nSalís con la sensación de que algo en el mundo se ordenó un poco.",
    "Cael dirige desde el fondo de la sala, de pie, con los brazos cruzados. Sus obras siempre tienen ese algo que no podés nombrar: una verdad que no se dice pero que todos los que miraron se llevan a casa.",
  ],

  // ── PARQUE ──
  walk_park: [
    "Los árboles del Parque de Los Prados son viejos, de los que hacen sombra de verdad. Caminás entre ellos y el ruido de Veloria se apaga un poco.\n\nUn Lumino — el animal nocturno con la cola larga — te observa desde una rama antes de desaparecer.",
    "El parque en esta hora está casi vacío. Solo un Twin mayor haciendo footing y dos chicos jugando al Mirone con piedras planas. Veloria desde adentro del parque suena diferente: más suave, más antigua.",
  ],
  picnic: [
    "La hierba del parque es verde y seca a la vez, perfecta para tenderse. Sacás lo que trajiste, lo ponés en el pasto, y te quedás mirando el cielo hasta que las nubes hacen formas que se parecen a cosas que conocés.",
  ],

  // ── CONSULTORIO DE BREN ──
  checkup: [
    "Bren te recibe con esa calma que solo dan años de oficio. Hace las preguntas de siempre, escucha con atención, no apura nada.\n\n*Estás bien*, dice al final. *Pero dormí más.* Sale rápido, como si tuviera todo el tiempo del mundo pero supiera que no.",
  ],

  // ── NPCs ──
  "npc:Aria Ven:low": [
    "'¿Qué vas a pedir?' pregunta Aria sin levantar la vista del mostrador. Aún no saben mucho el uno del otro, pero hay algo en su forma de atender que dice que está prestando atención aunque no lo parezca.",
  ],
  "npc:Aria Ven:mid": [
    "'¿El mismo de siempre?' pregunta antes de que abras la boca. Asintió y arrancó a prepararlo. Hablaron un rato de La Vega, de cómo el barrio cambia según la hora. Aria conoce este lugar como la palma de su mano.",
  ],
  "npc:Aria Ven:high": [
    "Aria se sienta un momento del otro lado de la barra — cosa que no hace con todo el mundo — y habla en voz baja. Te cuenta por qué abrió el café, una decisión de hace cuatro años que todavía no sabe si fue la correcta.\n\n'*Sora* por escuchar', dice después, y vuelve al trabajo.",
  ],
  "npc:Oren Mirende:low": [
    "Oren amarra una barca con un nudo que hace en un segundo y que a vos te llevaría diez minutos. Te ve mirarlo y sonríe. 'Todo tiene su técnica', dice. No dice mucho más pero la invitación a preguntar está clara.",
  ],
  "npc:Oren Mirende:mid": [
    "Oren habla del lago como alguien habla de una persona que quiere: con respeto y un poco de temor. Te cuenta los mejores horarios para pescar, qué zonas evitar en verano. En el tema de la noche se detiene un segundo antes de cambiar de tema.",
  ],
  "npc:Oren Mirende:high": [
    "Oren te lleva al lado sur del muelle, donde nadie va a molestarlos. Dice que su abuelo también pescaba acá. Después de un silencio largo, dice: 'Una noche vi una luz en el centro del lago. No era el reflejo de nada. Mi viejo también la vio una vez. Nunca hablamos de eso.'\n\nMira el agua. No dice más.",
  ],
  "npc:Nela Mirende:low": [
    "Nela te trae el plato con una eficiencia que habla de años de oficio. No es fría, pero tampoco es de las que arrancan conversación con desconocidos. Ribera la formó así: directa, justa, sin vueltas.",
  ],
  "npc:Nela Mirende:mid": [
    "'¿Cómo te está tratando Veloria?' pregunta Nela mientras limpia la barra. No es una pregunta vacía: espera la respuesta real. Hablaste del barrio, de cómo Ribera se siente diferente a todo lo demás. Ella asintió. 'Este lugar te elige a vos, no al revés.'",
  ],
  "npc:Nela Mirende:high": [
    "Nela te invita a quedarte después del cierre con un Té Miren. 'Solo los que me caen bien', aclara antes de que preguntes. Habla de su divorcio sin amargura, como quien ya hizo las paces con algo que dolió mucho. 'Veloria ayuda', dice. 'El lago escucha si se lo pedís.'",
  ],
  "npc:Ciro Orlen:low": [
    "Ciro levanta la vista de sus archivos un segundo, asiente, y vuelve a bajarla. No es mala educación: simplemente su mente está en otro lado. Está revisando registros del Año 120.",
  ],
  "npc:Ciro Orlen:mid": [
    "Ciro te muestra un mapa antiguo de Veloria que encontró en los fondos de archivo. 'La Plaza del Veloer era más grande', dice señalando. 'Demolieron una sección entera en el Año 200. Nadie sabe por qué.' Habla con la precisión de alguien que lleva años rastreando algo que todavía no encontró.",
  ],
  "npc:Ciro Orlen:high": [
    "Ciro baja la voz aunque estén solos. 'Los fundadores fueron doce, dice la historia oficial. Pero hay una firma en el Acta de la Llegada que no pertenece a ninguno de los doce.'\n\nTe muestra el documento. La firma dice solo: *V.*\n\n'Llevo dos años sin poder dormir bien', dice.",
  ],
  "npc:Aldric Veloer:low": [
    "Aldric Veloer camina por la Plaza con la autoridad tranquila de alguien que nunca necesitó apurar el paso. Te saluda con una inclinación de cabeza. Para él, cada nuevo Twin en Veloria es una historia que todavía no se escribió.",
  ],
  "npc:Aldric Veloer:mid": [
    "Aldric te ofrece un Velorcito y habla de la historia de la Plaza como quien vivió parte de ella. Tiene esa forma de contar de los Velistas: sin dramatismo, dejando que el peso de las palabras haga el trabajo.",
  ],
  "npc:Aldric Veloer:high": [
    "Aldric te lleva hacia el borde de la Plaza, lejos del mercado. 'Hay algo en el Lago Miren que la gente joven ya no sabe', dice. 'No porque nadie lo cuente. Sino porque hay cosas que solo se ven cuando uno está listo.'\n\nTe mira un momento largo. 'Creo que vos estás empezando a estar listo/a.'",
  ],
  "npc:Elowen Sorvei:low": [
    "Elowen está sentada en el banco del jardín con un cuaderno sobre las rodillas. Te ve pasar y asiente levemente, como si ya supiera quién sos. Quizás ya lo sabía.",
  ],
  "npc:Elowen Sorvei:mid": [
    "Elowen te habla del Otreven como si fuera un lugar que cualquiera puede visitar con la preparación correcta. 'No es un lugar físico', dice. 'Es más como un entre. El espacio entre dos notas de música.' Escribe algo en su cuaderno mientras habla.",
  ],
  "npc:Elowen Sorvei:high": [
    "Elowen te pide que te sientes con la calma de quien sabe que lo que va a decir importa. 'Estoy escribiendo sobre algo que pasó de verdad', dice. 'Un fundador que tomó una decisión que nadie en Veloria está listo para entender todavía.'\n\nTe mira. 'Me alegra que hayas llegado a esta ciudad en este momento.'",
  ],
  "npc:Soren Lume:low": [
    "Soren no levanta la vista cuando entrás, pero dice *Buenos días* antes de que abras la boca. La librería parece ordenada al principio. Después te das cuenta de que el orden es suyo, incomprensible para los demás.",
  ],
  "npc:Soren Lume:mid": [
    "Soren te recomienda un libro sin que lo pidas. Te lo pone en las manos: 'Leé la primera página. Si no te enganchó, lo devolvés.' No sonríe pero hay algo en sus ojos que sí. Hablaron de por qué algunos libros llegan en el momento exacto en que los necesitás.",
  ],
  "npc:Soren Lume:high": [
    "La librería ya cerró pero Soren no te apura. Hay mate sobre la barra — cosa rarísima en él — y habla de Elowen Sorvei sin que vos preguntés. 'La conocí a los dieciocho. Entré a una lectura suya por accidente. Nunca más fui el mismo.'\n\nUna pausa. 'Nunca se lo dije.'\n\nNo te mira. 'No me hagas preguntas.'",
  ],
  "npc:Bren Orlen:low": [
    "Bren Orlen tiene ese silencio de médico: el que dice *te estoy escuchando* sin decirlo. Responde con precisión y economía de palabras. Nada de más, nada de menos.",
  ],
  "npc:Bren Orlen:mid": [
    "Bren te ofrece un Té Miren mientras espera resultados. Habla de Los Prados con el afecto tranquilo de alguien que eligió este barrio deliberadamente. 'Acá la gente vive', dice. 'No actúa. Hay una diferencia.'",
  ],
  "npc:Bren Orlen:high": [
    "Bren te mira un momento largo antes de hablar. 'Mi familia guarda algo', dice al fin. 'Hace generaciones. Un conocimiento que pesa.'\n\nUna pausa. 'Los fundadores tomaron una decisión en la Llegada que la historia oficial borró. No por maldad. Por miedo a lo que significaba.'\n\nMira hacia la ventana. 'Hay una puerta que sigue abierta, en algún lugar de este mundo.'",
  ],
  "npc:Cael Sorvei:low": [
    "Cael no tiene conversación pequeña. O habla de teatro, de emoción, de la vida como representación, o no habla. Te hace una sola pregunta: '¿Por qué viniste a Veloria?' Y después escucha con toda su atención.",
  ],
  "npc:Cael Sorvei:mid": [
    "Cael te lleva al backstage y te muestra los telones pintados a mano por un artista que murió hace veinte años. 'El arte sobrevive al artista', dice. 'Eso es lo único que importa.' Hay algo melancólico en cómo lo dice.",
  ],
  "npc:Cael Sorvei:high": [
    "Cael se sienta en el borde del escenario vacío. 'Hay alguien en esta ciudad que no sé si voy a poder tener nunca', dice. No da nombre. 'Pero el amor que no podés tener te hace mejor artista. O te destruye. Todavía estoy averiguando cuál de los dos me está pasando a mí.'",
  ],
  "npc:Niven Sorvei:low": [
    "Niven no para de trabajar mientras hablás. El tatuaje que está terminando requiere toda su concentración. Pero entre trazos contesta tus preguntas con una honestidad directa que sorprende.",
  ],
  "npc:Niven Sorvei:mid": [
    "Niven te muestra el mural que está pintando: Veloria pero no es Veloria. Los edificios están ligeramente torcidos, el lago es demasiado oscuro, el cielo tiene un color que no existe en ningún atardecer real. 'La verdad tiene que deformarse un poco para caber en un cuadro', dice.",
  ],
  "npc:Niven Sorvei:high": [
    "Niven limpia sus pinceles despacio. 'La mayoría de la gente quiere que le digan lo que quieren escuchar', dice. 'Vos no sos así.'\n\nEs un cumplido. De Niven, es el más alto que existe.",
  ],
  "npc:Luma Sorvei:low": [
    "Luma está tocando guitarra en el borde de la vereda. Te saluda con la mano sin parar. La melodía que toca suena a algo entre el Veloer y el lago: dorada y azul al mismo tiempo.",
  ],
  "npc:Luma Sorvei:mid": [
    "Luma te enseña tres acordes que, según él, son los que necesitás para tocar cualquier canción de Veloria. 'La música acá tiene su propio idioma', dice. 'Es Twinés pero con notas.'",
  ],
  "npc:Luma Sorvei:high": [
    "Luma toca casi una hora mientras charlás. Al final baja la guitarra. 'Este lugar tiene algo', dice. 'Hay una canción que escucho a veces, cuando el lago está muy quieto. No sé de dónde viene. Nadie más la escucha.'\n\nUna pausa. 'O sí la escuchan y no lo dicen.'",
  ],
  "npc:Riven Lumaren:low": [
    "Riven Lumaren tiene ese encanto fácil de la gente criada con plata. Te recibe con una sonrisa amplia y preguntas genuinas. Si no supieras quién es, lo tomarías por un vecino más del barrio.",
  ],
  "npc:Riven Lumaren:mid": [
    "Riven te habla del banco con el tono de alguien que repite una historia que no le gusta pero que sabe de memoria. Después para. 'Hay noches que toco guitarra en casa hasta la madrugada', dice de la nada. 'Nadie en mi familia lo sabe.'",
  ],
  "npc:Riven Lumaren:high": [
    "Riven te muestra en el teléfono una grabación de tres minutos: él tocando en un depósito vacío. Es bueno. Muy bueno. 'Un día', dice. Solo eso.\n\nNo sabe todavía que ese *un día* puede ser ahora.",
  ],
  "npc:Tomas Mirende:low": [
    "Tomas Mirende tiene la paciencia del lago: infinita y sin prisa. Habla poco. Cuando lo hace, lo que dice vale.",
  ],
  "npc:Tomas Mirende:mid": [
    "Tomas te cuenta que su familia pesca el Miren desde hace cuatro generaciones. 'El lago cambia', dice. 'Cada año es distinto. Pero siempre te devuelve algo, aunque no sea lo que pediste.'",
  ],
  "npc:Tomas Mirende:high": [
    "Tomas clava los ojos en el lago un rato antes de hablar. 'Una noche, hace veinte años. Medianoche. Vi una luz en el centro del Miren que no era el reflejo de nada.'\n\nTe mira. 'Mi padre también la vio una vez. Nunca lo hablamos. En esta familia hay cosas que no se dicen.'",
  ],
  "npc:Dora Velin:low": [
    "Dora Velin tiene noventa y tantos años y los lleva con una dignidad sin esfuerzo. Te da los buenos días con el humor seco de quien vio pasar demasiadas modas como para tomarlas en serio.",
  ],
  "npc:Dora Velin:mid": [
    "Dora recuerda a los padres de los padres de gente que hoy tiene sesenta años. Te habla de cómo era la Plaza antes del último remodelado, de un café que ya no existe donde se reunían los Velistas. 'Veloria cambia menos de lo que cree', dice.",
  ],
  "npc:Dora Velin:high": [
    "Dora te agarra del brazo con una fuerza que no esperabas. 'Escuchame bien porque solo lo voy a decir una vez', dice. 'Yo conocí al Velista Mayor. Sí. No era un mito.' Una pausa. 'Me dijo algo sobre el lago que nunca le conté a nadie. Pero a vos... a vos creo que sí te lo puedo decir. Otro día. Cuando estés listo/a.'",
  ],
  "npc:Leva Sorin:low": [
    "Leva Sorin da clase de historia con una intensidad que hace que incluso los temas áridos parezcan urgentes. Te habla de los primeros años de Veloria con algo que va más allá de la academia: hay una inquietud personal en cómo busca.",
  ],
  "npc:Leva Sorin:mid": [
    "Leva baja la voz aunque no hay nadie cerca. 'Hay huecos en la historia oficial de Veloria que nadie quiere ver', dice. 'Yo los veo. Llevo diez años viéndolos. Y cuanto más busco, más raro se pone todo.'",
  ],
  "npc:Leva Sorin:high": [
    "Leva te muestra su cuaderno lleno de notas, fechas, nombres tachados, flechas. 'Los fundadores fundaron algo más que una ciudad', dice. 'Fundaron un secreto. Y alguien decidió que ese secreto era demasiado grande para que Veloria lo pudiera cargar.'\n\nUna pausa larga. 'Pero la carga sigue ahí. En el lago. En los registros. En la gente que sabe y calla.'",
  ],

  // NPCs sin narrativa propia → fallback genérico
  "npc:default:low": ["Intercambiás unas palabras con [NPC]. Todavía están conociéndose. Veloria tiene esa cosa: da tiempo."],
  "npc:default:mid": ["[NPC] y vos se llevan bien. La conversación fluye natural, sin forzar nada."],
  "npc:default:high": ["[NPC] te habla con la confianza de los amigos de verdad. Hay cosas que solo se dicen cuando ya no hacen falta las formas."],

  // ── TRABAJO ──
  "work:arte": [
    "El turno pasa entre telas, pinceles o textos y la presión buena de un deadline. Cael te pide que repases una escena hasta que suene *real, no ensayada*. Cuando lo lográs, algo en el cuarto cambia de temperatura.",
    "Trabajás en el fondo mientras los actores ensayan. Alguien del elenco te pide opinión sobre una escena. La das. La toman en serio. Eso es nuevo.",
  ],
  "work:cocina": [
    "El turno empieza con el mise en place y termina con las manos oliendo a especias doradas y Mirenpez. Nela corrige dos veces, elogia una. De ella eso equivale a un aplauso.",
    "Servicio del mediodía: quince cubiertos, dos errores, ningún desastre. Nela dice: 'Vas mejorando.' No sonríe pero tampoco hace falta.",
  ],
  "work:comercio": [
    "La Plaza a la mañana tiene otra energía. Empezás a conocer los ritmos: quién llega primero, quién regatea, quién compra sin mirar el precio. El comercio en Veloria es una conversación larga.",
    "Un cliente difícil, tres transacciones complicadas, un proveedor tarde. Al final del turno todo cerró. Eso es suficiente.",
  ],
  "work:medicina": [
    "Una mañana de consultas con Bren. Observás más de lo que hacés, que es exactamente lo que él quiere. 'Un médico que no sabe mirar no sabe nada', dice. 'Mirá primero. Siempre.'",
    "Primer turno solo en la sala de espera. Veloria enferma poco. Pero cuando lo hace, confía en vos. Eso pesa.",
  ],
  "work:educacion": [
    "La clase tiene quince alumnos con preguntas que no esperabas. Al final hay uno que pregunta algo que te hace pensar en el camino de vuelta. Eso justifica todo lo demás.",
    "Burocracia, planificaciones, una reunión larga. Pero hay un momento — solo uno — en que algo que decís hace click en alguien. Ese momento justifica el día.",
  ],
  "work:pesca": [
    "Seis horas en el lago con Oren. El trabajo es físico y silencioso: redes, líneas, el peso del agua. Al final del día vendés la pesca y el dinero sabe diferente cuando salió de las manos.",
    "El Mirenpez tiene su temporada y esta semana está buena. Volvés con los hombros cansados y eso, descubrís, se siente bien de una manera muy específica.",
  ],

  // ── BUSCAR TRABAJO ──
  "apply:arte": ["Cael te escucha describir lo que sabés hacer y lo que querés aprender. No interrumpe. Al final dice: 'Empezás el lunes. Llegá temprano: el teatro tiene sus propios horarios y no son los de nadie más.'"],
  "apply:cocina": ["Nela te pide que prepares un plato básico con lo que hay. Lo prueba. Hace una mueca que podría ser crítica o aprobación. 'Empezás mañana', dice. 'Vas a aprender todo de nuevo aunque ya sepas cocinar.'"],
  "apply:comercio": ["El encargado del pabellón te explica cómo funciona el mercado de Veloria: turnos, productores locales, las reglas tácitas que nadie escribió pero todos respetan. 'Si tratás bien a la gente, la gente vuelve. Acá eso todavía funciona.'"],
  "apply:medicina": ["Bren te hace tres preguntas concretas. Respondés lo que sabés. 'Bien', dice. 'El resto lo aprendés acá. Mañana a las ocho.'"],
  "apply:educacion": ["La directora te muestra el aula y el material. 'Veloria necesita gente que quiera enseñar', dice. 'No solo gente que sepa. Hay diferencia.' Firmás el contrato con la pluma de madera de Mireno que te ofrece."],
  "apply:pesca": ["Tomas te mira de arriba abajo y después mira el lago. 'Sos nuevo/a en esto', dice. No es una pregunta. 'Bien. Los que ya saben son los más difíciles de enseñar.' Oren te da un par de botas. 'Mañana a las cinco. El lago no espera.'"],

  // ── EVENTOS DEL CALENDARIO ──
  "event:0": ["La Plaza está llena a primera hora. Cada Twin lleva algo para plantar: semillas, esquejes, bulbos en tela. La tradición dice que lo que sembrás el Primer Brote determina qué crece en vos durante el año.\n\nPlantás lo tuyo con más seriedad de la que esperabas."],
  "event:1": ["El mercado flotante es exactamente lo que suena: veinte barcas amarradas entre sí con tablas de Mireno, cubiertas de productos de toda la región. Navegás entre los puestos sin destino fijo y comprás tres cosas que no necesitabas y una que sí."],
  "event:2": ["La Noche de los Nombres tiene una magia incómoda y hermosa: alguien te dice cómo te ve. No tu nombre real — el nombre que te daría si tuviera que inventarte uno.\n\nEscuchás el tuyo y tardás en procesar lo que significa."],
  "event:3": ["Toda Ribera está en el lago. Los Twins mayores marcan el comienzo con un salto desde el muelle principal; después todos los demás siguen.\n\nEl agua del Miren en esta época tiene una temperatura que no se explica: fría pero acogedora, como si hubiera estado esperando."],
  "event:4": ["La Velorfesta dura tres días pero la primera noche es la que importa. Las calles del Casco se llenan de luces, músicos en cada esquina, el olor a Velorcitos y Lumaven en el aire.\n\nHay un momento, justo cuando el sol toca el lago y todo se vuelve oro, en que Veloria es el lugar más hermoso del mundo."],
  "event:5": ["Salís a la Plaza a medianoche, como todo el mundo. El cielo está despejado. Te sentás en los escalones de la estatua de Miren Veloer y le hacés una promesa al cielo.\n\nNo la decís en voz alta. Las promesas de la Noche Larga se sellan solas."],
  "event:6": ["Las Llanuras Doradas al atardecer son exactamente eso: doradas. El festival de la Cosecha tiene concursos de cocina, música folk, niños corriendo entre los puestos.\n\nComés tres veces más de lo que necesitabas. Eso también es parte de la tradición."],
  "event:7": ["Los Twins traen flores al lago. No hay discursos ni ceremonias: cada uno va a su ritmo, deja su ramo en el agua, se queda un momento mirando cómo se aleja.\n\nEl Lago Miren las recibe todas igual. Recordás a alguien. El lago lo sabe ahora."],
  "event:8": ["Veloria tiene más clubs de lo que pensabas: jardín, lectura, natación, Lumen, fotografía, cocina experimental. Recorrés tres en una tarde. En el último te quedás más tiempo del planeado."],
  "event:9": ["Los Nocturnos empiezan cuando el frío lo hace imposible de ignorar. Te quedás en casa con una Sopa Noctuvel y una vela encendida en la ventana, que es la única regla real de la temporada.\n\nAfuera nieva un poco. Veloria en invierno tiene una quietud diferente: más densa, más honesta."],
  "event:10": ["El lago se congela una vez al año y toda Veloria lo celebra como si fuera la primera vez. Alquilás patines y salís al hielo con más confianza de la que corresponde. Caés dos veces. La segunda te hace reír.\n\nSobre el hielo del Miren todo parece más liviano."],
  "event:11": ["La tradición de la Víspera es quemar algo pequeño que represente lo que ya no va con vos. Lo hacés en el fuego común de la Plaza.\n\nCuando el reloj da las doce, alguien grita *Velin* y toda la Plaza responde. Es el año nuevo de Veloria. Empezás de vuelta."],

  // ── ROMANCE ──
  "romance:ask_out": ["Las palabras salen más directas de lo que planeabas. [NPC] te mira un momento — ese momento que parece más largo de lo que es — y después sonríe. '*Ora*', dice. Sí.\n\nEse *ora* reordena algo en vos."],
  "romance:propose": ["No ensayaste el discurso. Las palabras no salieron perfectas pero salieron verdaderas, que es lo que importa. [NPC] no responde de inmediato. Respira. Después dice sí con la calma de quien ya lo sabía y solo estaba esperando que vos también lo supieras."],
  "romance:marry": ["La ceremonia es simple como Veloria manda: pocas palabras, muchas presencias. Hay flores Velora, hay Lumaven, hay el lago como testigo silencioso.\n\nEn algún momento alguien dice algo en Twinés que no entendés del todo pero que sentís completamente. Salís casado/a. El cielo tiene exactamente el color del Veloer."],
  "romance:breakup": ["No hay una sola causa y los dos lo saben. La conversación es larga y honesta de la manera que duele pero que es necesaria.\n\n[NPC] no llora pero tiene esa expresión de quien acaba de perder algo que no va a recuperar. Vos también. Salís al frío de Veloria y caminás hasta que el Lago Miren aparece y te quedás mirándolo un rato."],
  "romance:divorce": ["Veloria tiene una palabra en Twinés para el amor que se termina: *sorvelin*. Lo que fue y ya no es, pero que igual fue.\n\nLa separación se firma en silencio, con Bren Orlen como testigo porque es el único que no juzga. Salís a la Plaza y la ciudad sigue igual. Eso duele un poco. Y también ayuda."],

  // ── NACIMIENTO ──
  birth: [
    "El apartamento se llena de un silencio distinto. No el vacío sino el lleno — lleno de algo nuevo, de algo que respira.\n\n[CHILD] es pequeño/a y perfecto/a y les parece imposible que hayan sido capaces de hacer algo así. [PARTNER] te mira. Ninguno de los dos dice nada. No hace falta.\n\nVeloria afuera sigue siendo Veloria. Pero desde hoy es una ciudad diferente.",
  ],

  // ── TRAVEL ──
  "travel:Tu apartamento": ["Subís las escaleras con el peso del día encima. Tu apartamento es pequeño y tuyo. Eso es suficiente."],
  "travel:Café de Aria": ["El Café de Aria está a dos cuadras del apartamento. En La Vega todo está cerca."],
  "travel:Plaza del Veloer": ["El camino a El Casco atraviesa dos barrios y una diferencia de siglos. Los adoquines del Casco son más irregulares, más viejos. Los pies lo notan antes que la cabeza."],
  "travel:Librería de Soren": ["La librería queda en una callecita lateral de El Casco. Si no supieras que está ahí, no la encontrarías. Eso, te parece, es parte del punto."],
  "travel:Muelle": ["Ribera huele a lago antes de que llegues. El viento trae algo de algas y pesca fresca. Bajás hacia el muelle por las escalinatas de piedra."],
  "travel:Restaurante de Nela": ["El restaurante de Nela tiene terraza con vista directa al lago. Cuando llegás hay dos mesas ocupadas y el olor de las especias ya hizo el trabajo de convencerte."],
  "travel:Lago Miren": ["La orilla sur del Miren está a diez minutos del muelle pero parece otro mundo. Más quieto, más verde, con las flores Velora en el borde del agua."],
  "travel:Biblioteca": ["La Biblioteca de Veleta es el edificio más alto del barrio. Sus ventanas de arco dan al jardín interior. Empujás la puerta pesada de madera y adentro hay ese silencio específico de los lugares que guardan cosas."],
  "travel:Teatro de Cael": ["El Teatro de Cael queda en la esquina más iluminada de Veleta. Hay siempre un cartel nuevo en la entrada con algo críptico que Cael escribe él mismo y que tarda días en entender."],
  "travel:Parque": ["Los Prados es el barrio más tranquilo de Veloria. Las calles arboladas hacen sombra desde temprano. El parque central tiene árboles que deben tener cien años por lo menos."],
  "travel:Consultorio de Bren": ["El consultorio está en la planta baja de la casa de los Orlen. Hay siempre uno o dos Twins esperando con esa paciencia de la gente sana que igual viene a ver a Bren."],

  default: ["El tiempo avanza en Veloria."],
};

// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
const TRAITS = [
  { id:"creativo",     label:"Creativo",     emoji:"🎨", desc:"Bonus en hobbies artísticos" },
  { id:"sociable",     label:"Sociable",     emoji:"💬", desc:"Relaciones crecen más rápido" },
  { id:"introvertido", label:"Introvertido", emoji:"📚", desc:"Se recarga solo, bonus en casa" },
  { id:"ambicioso",    label:"Ambicioso",    emoji:"⭐", desc:"Ascensos y carrera más rápidos" },
  { id:"empatico",     label:"Empático",     emoji:"💛", desc:"Relaciones más profundas" },
  { id:"hogareno",     label:"Hogareño",     emoji:"🏠", desc:"Bonus en cocina y decoración" },
  { id:"romantico",    label:"Romántico",    emoji:"🌸", desc:"El amor lo afecta profundamente" },
  { id:"aventurero",   label:"Aventurero",   emoji:"🌿", desc:"Bonus en exploración y naturaleza" },
];
const ASPIRATIONS = [
  { id:"familia",    label:"Fundador de familia", emoji:"👨‍👩‍👧", desc:"Crear un hogar y un legado en Veloria" },
  { id:"artista",    label:"Artista",             emoji:"🎭", desc:"Dejar tu huella creativa en la ciudad" },
  { id:"empresario", label:"Empresario",          emoji:"💼", desc:"Construir riqueza y reputación" },
  { id:"alma",       label:"Alma del pueblo",     emoji:"🌟", desc:"Conocer a cada Twin de Veloria" },
];
const NEIGHBORHOODS = {
  "La Vega":    { emoji:"🏙", color:"#7BB8B9", places:["Tu apartamento","Café de Aria"] },
  "El Casco":   { emoji:"🏛", color:"#D4A853", places:["Plaza del Veloer","Librería de Soren"] },
  "Ribera":     { emoji:"⛵", color:"#4A8B8C", places:["Muelle","Restaurante de Nela","Lago Miren"] },
  "Veleta":     { emoji:"🎭", color:"#A08060", places:["Biblioteca","Teatro de Cael"] },
  "Los Prados": { emoji:"🌳", color:"#6B9E5E", places:["Parque","Consultorio de Bren"] },
};
const PLACE_ACTIONS = {
  "Tu apartamento":      [{id:"sleep",label:"🌙 Dormir",time:8},{id:"cook",label:"🍳 Cocinar",time:1},{id:"shower",label:"🚿 Ducharse",time:0.5},{id:"bathroom",label:"🚽 Baño",time:0.1},{id:"hobby",label:"🎨 Practicar hobbie",time:2},{id:"rest",label:"🛋 Descansar",time:1}],
  "Café de Aria":        [{id:"coffee",label:"☕ Tomar café",time:1,cost:3},{id:"chat_npc",label:"💬 Charlar con Aria",time:1,npc:"Aria Ven"},{id:"read_cafe",label:"📖 Leer",time:2},{id:"observe",label:"👁 Observar el barrio",time:1}],
  "Plaza del Veloer":    [{id:"walk_plaza",label:"🚶 Pasear",time:1},{id:"market",label:"🛒 Explorar el mercado",time:1},{id:"chat_npc",label:"💬 Hablar con Aldric",time:1,npc:"Aldric Veloer"}],
  "Librería de Soren":   [{id:"browse_books",label:"📚 Explorar libros",time:1},{id:"chat_npc",label:"💬 Hablar con Soren",time:1,npc:"Soren Lume"},{id:"buy_book",label:"📘 Comprar un libro",time:0.5,cost:15}],
  "Muelle":              [{id:"fish",label:"🎣 Pescar",time:3},{id:"chat_npc",label:"⛵ Hablar con Oren",time:1,npc:"Oren Mirende"},{id:"sit_lake",label:"🌊 Contemplar el lago",time:1}],
  "Restaurante de Nela": [{id:"eat_dish",label:"🐟 Mirenpez al Veloer",time:1.5,cost:35},{id:"chat_npc",label:"💬 Charlar con Nela",time:1,npc:"Nela Mirende"},{id:"cena",label:"🍷 Cena completa",time:2,cost:55}],
  "Lago Miren":          [{id:"swim",label:"🏊 Nadar",time:2},{id:"secret_lake",label:"🌊 Contarle un secreto al lago",time:0.5},{id:"walk_shore",label:"🌅 Caminar por la orilla",time:1}],
  "Biblioteca":          [{id:"research",label:"📜 Investigar historia de Veloria",time:2},{id:"chat_npc",label:"📖 Hablar con Ciro",time:1,npc:"Ciro Orlen"},{id:"read_lib",label:"📚 Leer en silencio",time:2}],
  "Teatro de Cael":      [{id:"watch_show",label:"🎭 Ver una obra",time:2.5,cost:25},{id:"chat_npc",label:"🎬 Hablar con Cael",time:1,npc:"Cael Sorvei"}],
  "Parque":              [{id:"walk_park",label:"🌳 Caminar entre los árboles",time:1},{id:"picnic",label:"🧺 Picnic al sol",time:2}],
  "Consultorio de Bren": [{id:"checkup",label:"⚕️ Consulta médica",time:1,cost:40},{id:"chat_npc",label:"💊 Conversar con Bren",time:1,npc:"Bren Orlen"}],
};
const BASE_EFFECTS = {
  sleep:{sueno:70,hambre:-15,vejiga:-20}, cook:{hambre:45,diversion:10}, shower:{higiene:55}, bathroom:{vejiga:90},
  rest:{sueno:15,diversion:8}, hobby:{diversion:35}, coffee:{hambre:8,diversion:12},
  read_cafe:{diversion:20}, read_lib:{diversion:20}, observe:{diversion:10,social:5},
  walk_plaza:{diversion:15,social:8}, market:{diversion:10}, browse_books:{diversion:15},
  buy_book:{diversion:10}, fish:{diversion:25}, sit_lake:{diversion:22},
  swim:{higiene:-10,diversion:35}, secret_lake:{diversion:18,social:5}, walk_shore:{diversion:18},
  eat_dish:{hambre:60,diversion:25,social:8}, cena:{hambre:80,diversion:30,social:12},
  research:{diversion:15}, watch_show:{diversion:40,social:15}, walk_park:{diversion:15},
  picnic:{hambre:30,diversion:25}, checkup:{},
  work_shift:{sueno:-20,social:-10,diversion:-15,higiene:-10},
  event_attend:{diversion:40,social:30,hambre:-10},
};
const NEED_CFG = {
  hambre:{label:"Hambre",emoji:"🍽",color:"#E8943A"}, sueno:{label:"Sueño",emoji:"😴",color:"#7B8CDE"},
  higiene:{label:"Higiene",emoji:"🧼",color:"#4AB8C1"}, social:{label:"Social",emoji:"💬",color:"#E87B9E"},
  diversion:{label:"Diversión",emoji:"🎮",color:"#A67BD6"}, vejiga:{label:"Vejiga",emoji:"💧",color:"#6BC47E"},
};
const MONTHS  = ["Nevelin","Mirenal","Nomeven","Mirenable","Velorfesta","Solein","Velcora","Memoveli","Clubven","Noctuvel","Mireneis","Nevelin II"];
const SEASONS = ["🌸 Primavera","🌸 Primavera","🌸 Primavera","☀️ Verano","☀️ Verano","☀️ Verano","🍂 Otoño","🍂 Otoño","🍂 Otoño","❄️ Invierno","❄️ Invierno","❄️ Invierno"];
const CAREERS = {
  arte:      {label:"Arte",      emoji:"🎨",places:["Teatro de Cael","Biblioteca"],      levels:["Aspirante","Artista","Artista reconocido","Maestro del Veleta"],   wages:[30,55,90,140],shiftH:6},
  cocina:    {label:"Cocina",    emoji:"🍳",places:["Restaurante de Nela"],               levels:["Ayudante","Cocinero","Chef","Chef ejecutivo"],                     wages:[25,45,80,130],shiftH:8},
  comercio:  {label:"Comercio",  emoji:"💼",places:["Plaza del Veloer"],                  levels:["Vendedor","Gerente","Director","Empresario"],                      wages:[35,60,100,160],shiftH:8},
  medicina:  {label:"Medicina",  emoji:"⚕️",places:["Consultorio de Bren"],               levels:["Practicante","Médico","Especialista","Jefe médico"],               wages:[40,70,110,170],shiftH:8},
  educacion: {label:"Educación", emoji:"📚",places:["Biblioteca"],                        levels:["Auxiliar","Docente","Profesor titular","Director"],                wages:[30,50,85,130],shiftH:6},
  pesca:     {label:"Pesca",     emoji:"🎣",places:["Muelle"],                            levels:["Aprendiz","Pescador","Pescador experto","Patrón del Lago"],        wages:[20,40,70,110],shiftH:5},
};
const ROMANCEABLE = new Set(["Aria Ven","Lior Veloer","Oren Mirende","Nela Mirende","Riven Lumaren","Vael Lumaren","Cael Sorvei","Niven Sorvei","Luma Sorvei","Soren Lume","Ciro Orlen","Elia Orlen","Iva Norven","Cela Miren","Tev Solan","Dael Miru","Mira Belven","Rael Nora","Leva Sorin"]);
const CALENDAR_EVENTS = {
  0:{name:"Día del Primer Brote",emoji:"🌱",desc:"Hay que plantar algo hoy. La tradición lo dice."},
  1:{name:"El Mercado Miren",emoji:"⛵",desc:"El mercado flotante abre sobre el lago."},
  2:{name:"La Noche de los Nombres",emoji:"💌",desc:"Se revelan apodos cariñosos a personas queridas."},
  3:{name:"Las Aguas Abiertas",emoji:"🏊",desc:"Gran celebración en Ribera. Primer día de natación."},
  4:{name:"Velorfesta",emoji:"✨",desc:"La celebración más importante. Tres días de música y fuegos."},
  5:{name:"La Noche Larga",emoji:"⭐",desc:"Los Twins hacen promesas bajo las estrellas."},
  6:{name:"La Cosecha",emoji:"🌾",desc:"Festival en Las Llanuras Doradas. Gastronomía y concursos."},
  7:{name:"El Día del Recuerdo",emoji:"🌊",desc:"Flores en el lago para los Twins que ya no están."},
  8:{name:"La Feria de los Clubs",emoji:"🎪",desc:"Todos los clubs de Veloria abren sus puertas."},
  9:{name:"Los Nocturnos",emoji:"🕯",desc:"Reuniones íntimas en casa. El frío une a los Twins."},
  10:{name:"El Hielo del Miren",emoji:"⛸",desc:"El lago se congela. Los Twins salen a patinar."},
  11:{name:"La Víspera del Brote",emoji:"🔥",desc:"Quemar lo viejo, guardar lo nuevo. Medianoche: Velin."},
};
const NPC_TRAITS_MAP = {
  "Aria Ven":["pragmática","acogedora","observadora"],"Lior Veloer":["rebelde","curioso","libre"],
  "Oren Mirende":["aventurero","romántico","libre"],"Nela Mirende":["cálido","fuerte","protector"],
  "Riven Lumaren":["encantador","generoso","soñador"],"Vael Lumaren":["creativo","impulsivo","apasionado"],
  "Cael Sorvei":["dramático","apasionado","perfeccionista"],"Niven Sorvei":["intenso","directo","artístico"],
  "Luma Sorvei":["libre","alegre","magnético"],"Soren Lume":["introvertido","brillante","leal"],
  "Ciro Orlen":["meticuloso","callado","curioso"],"Elia Orlen":["sociable","optimista","generosa"],
  "Iva Norven":["observadora","artístico","sensible"],"Cela Miren":["empático","trabajador","sensible"],
  "Tev Solan":["alegre","talentoso","impulsivo"],"Dael Miru":["perfeccionista","apasionado","orgulloso"],
  "Mira Belven":["energético","social","creativo"],"Rael Nora":["gentil","divertido","compasivo"],
  "Leva Sorin":["apasionado","exigente","curioso"],
};
const PROMO_SHIFTS=[5,10,15,20];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
function getNarrative(key, repl={}){
  const opts = N[key] || N["default"];
  let txt = pick(opts);
  for(const[k,v] of Object.entries(repl)) txt = txt.replace(new RegExp(`\\[${k}\\]`,"g"),v);
  return txt;
}
function toTimeStr(h){
  const hour=((h%24)+24)%24,hh=Math.floor(hour),mm=Math.round((hour-hh)*60);
  return `${hh.toString().padStart(2,"0")}:${(mm>=60?0:mm).toString().padStart(2,"0")}`;
}
function relStatus(lv){
  if(lv<10)return"Extraño";if(lv<25)return"Conocido";if(lv<50)return"Amigo";if(lv<75)return"Amigo cercano";return"Mejor amigo";
}
function clamp(v,mn=0,mx=100){return Math.max(mn,Math.min(mx,v));}
const sleep=(ms)=>new Promise(r=>setTimeout(r,ms));

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════
function NeedBar({needKey,value,dark}){
  const cfg=NEED_CFG[needKey],barColor=value<25?"#E05555":value<50?"#E8943A":cfg.color;
  return(
    <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"7px"}}>
      <span style={{fontSize:"12px",width:"16px",textAlign:"center"}}>{cfg.emoji}</span>
      <div style={{flex:1,height:"5px",background:dark?"#3D2B1F":"#E8D5B8",borderRadius:"3px",overflow:"hidden"}}>
        <div style={{height:"100%",width:`${value}%`,background:barColor,borderRadius:"3px",transition:"width 0.6s ease"}}/>
      </div>
      <span style={{fontSize:"10px",color:"#8B7355",width:"22px",textAlign:"right"}}>{Math.round(value)}</span>
    </div>
  );
}
function NarrativeBlock({entry,dark}){
  const accent={intro:"#D4A853",story:"#7BB8B9",travel:"#A08060",system:"#6B5040",romance:"#E87B9E",work:"#6B9E5E",event:"#D4A853"};
  return(
    <div style={{marginBottom:"22px",paddingLeft:"14px",borderLeft:`2px solid ${accent[entry.type]||"#7BB8B9"}`}}>
      {entry.place&&<div style={{fontSize:"10px",color:"#A08060",marginBottom:"5px",letterSpacing:"0.08em",textTransform:"uppercase"}}>{entry.place}{entry.time?` · ${entry.time}`:""}</div>}
      <div style={{fontSize:"14px",lineHeight:"1.75",color:dark?"#EDE0CC":"#3D2B1F",fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{entry.text}</div>
    </div>
  );
}

function EstadoTab({needs,dark,currentEvent,onEventAttend,loading}){
  const muted=dark?"#6B5040":"#A08060";
  return(
    <div>
      {currentEvent&&(
        <div style={{background:"rgba(212,168,83,0.08)",border:"1px solid rgba(212,168,83,0.25)",borderRadius:"8px",padding:"10px",marginBottom:"14px"}}>
          <div style={{fontSize:"16px",marginBottom:"3px"}}>{currentEvent.emoji}</div>
          <div style={{fontSize:"11px",fontWeight:600,color:"#D4A853",marginBottom:"3px"}}>{currentEvent.name}</div>
          <div style={{fontSize:"10px",color:muted,marginBottom:"8px",lineHeight:"1.4"}}>{currentEvent.desc}</div>
          <button onClick={onEventAttend} disabled={loading} style={{width:"100%",padding:"5px",fontSize:"10px",borderRadius:"5px",border:"1px solid #D4A853",background:"transparent",color:"#D4A853",cursor:loading?"not-allowed":"pointer"}}>✦ Participar en el evento</button>
        </div>
      )}
      <div style={{fontSize:"9px",letterSpacing:"0.15em",textTransform:"uppercase",color:muted,marginBottom:"10px"}}>Necesidades</div>
      {Object.keys(needs).map(k=><NeedBar key={k} needKey={k} value={needs[k]} dark={dark}/>)}
    </div>
  );
}

function RelacionesTab({rels,family,currentDay,dark,loading,onRomanceAction}){
  const [sel,setSel]=useState(null);
  const muted=dark?"#6B5040":"#A08060", tc=dark?"#EDE0CC":"#3D2B1F", border=dark?"#3D2B1F":"#E8D5B8";
  const sorted=Object.entries(rels).sort(([,a],[,b])=>(b.friendship||0)-(a.friendship||0));
  function getRomanceActions(npcName){
    const fr=(rels[npcName]?.friendship||0),isPartner=family.partner===npcName,acts=[];
    if(!isPartner&&!family.partner&&ROMANCEABLE.has(npcName)&&fr>40) acts.push({id:"ask_out",label:"💕 Invitar a salir",color:"#E87B9E"});
    if(isPartner&&family.romanticStatus==="dating"&&fr>65) acts.push({id:"propose",label:"💍 Proponer matrimonio",color:"#D4A853"});
    if(isPartner&&family.romanticStatus==="engaged") acts.push({id:"marry",label:"💒 Casarse",color:"#D4A853"});
    if(isPartner&&family.romanticStatus==="married") acts.push({id:"have_child",label:"👶 Tener un hijo",color:"#7BB8B9"});
    if(isPartner&&(family.romanticStatus==="dating"||family.romanticStatus==="engaged")) acts.push({id:"breakup",label:"💔 Terminar",color:"#E05555"});
    if(isPartner&&family.romanticStatus==="married") acts.push({id:"divorce",label:"💔 Separarse",color:"#E05555"});
    return acts;
  }
  const sLabel={dating:"💕 En pareja con",engaged:"💍 Comprometido/a con",married:"💒 Casado/a con"};
  return(
    <div>
      {family.partner&&(
        <div style={{background:"rgba(232,123,158,0.08)",border:"1px solid rgba(232,123,158,0.25)",borderRadius:"8px",padding:"8px",marginBottom:"10px"}}>
          <div style={{fontSize:"9px",color:"#E87B9E",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"2px"}}>{sLabel[family.romanticStatus]||"💕"}</div>
          <div style={{fontSize:"12px",fontWeight:600,color:tc}}>{family.partner}</div>
        </div>
      )}
      {family.children.length>0&&(
        <div style={{marginBottom:"10px"}}>
          <div style={{fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:muted,marginBottom:"6px"}}>Hijos</div>
          {family.children.map((c,i)=>(
            <div key={i} style={{fontSize:"11px",color:dark?"#D4C4A0":"#5C4A32",marginBottom:"3px",lineHeight:"1.4"}}>
              👶 {c.name} · {Math.floor((currentDay-c.birthDay)/30)} años
              <br/><span style={{fontSize:"9px",color:muted}}>{c.traits.slice(0,2).join(", ")}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:muted,marginBottom:"8px"}}>NPCs conocidos ({sorted.length})</div>
      {sorted.length===0&&<div style={{fontSize:"11px",color:muted,fontStyle:"italic",lineHeight:"1.5"}}>Todavía no conocés a nadie. Salí y hablá con los Twins de Veloria.</div>}
      {sorted.map(([npcName,rel])=>{
        const isSel=sel===npcName,isPartner=family.partner===npcName,romActs=getRomanceActions(npcName);
        return(
          <div key={npcName} style={{marginBottom:"5px"}}>
            <button onClick={()=>setSel(isSel?null:npcName)} style={{width:"100%",padding:"5px 8px",borderRadius:"6px",textAlign:"left",border:isSel?`1px solid rgba(212,168,83,0.5)`:`1px solid ${border}`,background:isSel?"rgba(212,168,83,0.06)":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:"11px",color:dark?"#D4C4A0":"#5C4A32",fontWeight:500}}>{isPartner?"💕 ":""}{npcName}</span>
              <span style={{fontSize:"9px",color:muted}}>{relStatus(rel.friendship||0)}</span>
            </button>
            {isSel&&(
              <div style={{padding:"6px 8px",background:"rgba(212,168,83,0.03)",borderRadius:"0 0 6px 6px"}}>
                <div style={{marginBottom:"6px"}}>
                  <div style={{fontSize:"9px",color:muted,marginBottom:"2px"}}>Amistad {Math.round(rel.friendship||0)}/100</div>
                  <div style={{height:"4px",background:dark?"#3D2B1F":"#E8D5B8",borderRadius:"2px",overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${rel.friendship||0}%`,background:"#7BB8B9",transition:"width 0.5s"}}/>
                  </div>
                </div>
                {romActs.map(ra=>(
                  <button key={ra.id} disabled={loading} onClick={()=>{setSel(null);onRomanceAction(ra.id,npcName);}} style={{display:"block",width:"100%",marginTop:"4px",padding:"4px 8px",fontSize:"10px",borderRadius:"5px",border:`1px solid ${ra.color}`,background:"transparent",color:ra.color,cursor:loading?"not-allowed":"pointer",textAlign:"left"}}>{ra.label}</button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function TrabajoTab({career,loc,dark,loading,onApply,onWork}){
  const muted=dark?"#6B5040":"#A08060", border=dark?"#3D2B1F":"#E8D5B8";
  if(!career){
    return(
      <div>
        <div style={{fontSize:"10px",color:muted,marginBottom:"12px",lineHeight:"1.5"}}>Todavía no tenés trabajo. Elegí una carrera para empezar en Veloria.</div>
        {Object.entries(CAREERS).map(([id,c])=>(
          <button key={id} onClick={()=>onApply(id)} disabled={loading} style={{display:"flex",alignItems:"center",gap:"8px",width:"100%",padding:"8px",marginBottom:"5px",borderRadius:"7px",border:`1px solid ${border}`,background:"transparent",color:dark?"#D4C4A0":"#5C4A32",cursor:loading?"not-allowed":"pointer",opacity:loading?0.4:1,textAlign:"left"}}
            onMouseEnter={e=>{if(!loading){e.currentTarget.style.borderColor="#6B9E5E";e.currentTarget.style.color="#6B9E5E";}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=dark?"#D4C4A0":"#5C4A32";}}>
            <span style={{fontSize:"18px"}}>{c.emoji}</span>
            <div><div style={{fontSize:"12px",fontWeight:500}}>{c.label}</div><div style={{fontSize:"10px",color:muted}}>Desde L{c.wages[0]}/turno · {c.shiftH}h</div></div>
          </button>
        ))}
      </div>
    );
  }
  const c=CAREERS[career.track],isAtWorkplace=c.places.includes(loc.place);
  const progress=career.level>=3?100:Math.min(100,(career.shiftsWorked%PROMO_SHIFTS[career.level])/PROMO_SHIFTS[career.level]*100);
  const progressLabel=career.level>=3?"Nivel máximo":`${career.shiftsWorked%PROMO_SHIFTS[career.level]}/${PROMO_SHIFTS[career.level]} turnos para ascenso`;
  return(
    <div>
      <div style={{background:"rgba(107,158,94,0.08)",border:"1px solid rgba(107,158,94,0.25)",borderRadius:"8px",padding:"10px",marginBottom:"12px"}}>
        <div style={{fontSize:"18px",marginBottom:"3px"}}>{c.emoji}</div>
        <div style={{fontSize:"12px",fontWeight:600,color:"#6B9E5E"}}>{c.levels[career.level]}</div>
        <div style={{fontSize:"10px",color:muted}}>{c.label} · L{c.wages[career.level]}/turno · {career.shiftsWorked} turnos</div>
      </div>
      {career.level<3&&(
        <div style={{marginBottom:"12px"}}>
          <div style={{height:"5px",background:dark?"#3D2B1F":"#E8D5B8",borderRadius:"3px",overflow:"hidden",marginBottom:"4px"}}>
            <div style={{height:"100%",width:`${progress}%`,background:"#6B9E5E",transition:"width 0.5s"}}/>
          </div>
          <div style={{fontSize:"9px",color:muted}}>{progressLabel}</div>
        </div>
      )}
      {isAtWorkplace?(
        <button onClick={onWork} disabled={loading} style={{width:"100%",padding:"8px",fontSize:"11px",borderRadius:"7px",border:"1px solid #6B9E5E",background:"rgba(107,158,94,0.1)",color:"#6B9E5E",cursor:loading?"not-allowed":"pointer",fontWeight:500}}>
          💼 Trabajar turno ({c.shiftH}h) → +L{c.wages[career.level]}
        </button>
      ):(
        <div style={{fontSize:"10px",color:muted,fontStyle:"italic",lineHeight:"1.5"}}>Tu lugar de trabajo es {c.places.join(" o ")}. Andá para trabajar.</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// CREATION SCREEN
// ═══════════════════════════════════════════════════════════
function CreationScreen({onStart}){
  const [step,setStep]=useState(0),[name,setName]=useState(""),[traits,setTraits]=useState([]),[aspiration,setAspiration]=useState("");
  const toggleTrait=id=>{if(traits.includes(id))setTraits(traits.filter(t=>t!==id));else if(traits.length<3)setTraits([...traits,id]);};
  const canNext=[name.trim().length>1,traits.length===3,aspiration!==""][step];
  const next=()=>{if(!canNext)return;if(step<2)setStep(step+1);else onStart({name:name.trim(),traits,aspiration});};
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(155deg,#1A1008 0%,#2C1F14 60%,#1A0E08 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 16px",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <div style={{fontSize:"44px",color:"#D4A853",fontFamily:"'Lora',serif",letterSpacing:"0.18em"}}>inbetweens</div>
        <div style={{fontSize:"11px",color:"#6B5040",letterSpacing:"0.35em",textTransform:"uppercase",marginTop:"4px"}}>Veloria · Otherwhen</div>
      </div>
      <div style={{display:"flex",gap:"6px",marginBottom:"28px"}}>
        {["Nombre","Rasgos","Aspiración"].map((s,i)=>(
          <div key={i} style={{padding:"4px 14px",borderRadius:"20px",fontSize:"10px",letterSpacing:"0.12em",textTransform:"uppercase",background:i===step?"#D4A853":i<step?"rgba(212,168,83,0.2)":"transparent",color:i===step?"#2C1F14":i<step?"#D4A853":"#4A3525",border:i>=step?"1px solid #3D2B1F":"none"}}>{s}</div>
        ))}
      </div>
      <div style={{background:"rgba(212,168,83,0.04)",border:"1px solid rgba(212,168,83,0.2)",borderRadius:"16px",padding:"28px",width:"100%",maxWidth:"460px"}}>
        {step===0&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>¿Cuál es tu nombre, Twin?</div>
          <div style={{color:"#6B5040",fontSize:"12px",marginBottom:"22px"}}>Este nombre te seguirá por toda Veloria.</div>
          <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&next()} placeholder="Tu nombre..." style={{width:"100%",padding:"12px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,168,83,0.35)",borderRadius:"8px",color:"#FDF6E9",fontSize:"20px",fontFamily:"'Lora',serif",outline:"none"}}/>
        </div>)}
        {step===1&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>Elegí 3 rasgos</div>
          <div style={{color:"#6B5040",fontSize:"12px",marginBottom:"18px"}}>{traits.length}/3 seleccionados</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px"}}>
            {TRAITS.map(t=>{const sel=traits.includes(t.id),dis=!sel&&traits.length===3;return(
              <button key={t.id} onClick={()=>!dis&&toggleTrait(t.id)} style={{padding:"10px",borderRadius:"8px",textAlign:"left",cursor:dis?"not-allowed":"pointer",border:sel?"1px solid #D4A853":"1px solid rgba(212,168,83,0.15)",background:sel?"rgba(212,168,83,0.12)":"transparent",color:dis&&!sel?"#3D2B1F":"#FDF6E9",opacity:dis&&!sel?0.35:1,transition:"all 0.15s"}}>
                <div style={{fontSize:"18px",marginBottom:"2px"}}>{t.emoji}</div>
                <div style={{fontSize:"12px",fontWeight:500}}>{t.label}</div>
                <div style={{fontSize:"10px",color:"#8B7355"}}>{t.desc}</div>
              </button>
            );})}
          </div>
        </div>)}
        {step===2&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>¿Qué buscás en Veloria?</div>
          <div style={{color:"#6B5040",fontSize:"12px",marginBottom:"18px"}}>Tu aspiración de vida.</div>
          <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
            {ASPIRATIONS.map(a=>(
              <button key={a.id} onClick={()=>setAspiration(a.id)} style={{padding:"13px 16px",borderRadius:"8px",textAlign:"left",cursor:"pointer",border:aspiration===a.id?"1px solid #D4A853":"1px solid rgba(212,168,83,0.15)",background:aspiration===a.id?"rgba(212,168,83,0.12)":"transparent",color:"#FDF6E9",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.15s"}}>
                <span style={{fontSize:"24px"}}>{a.emoji}</span>
                <div><div style={{fontSize:"13px",fontWeight:500}}>{a.label}</div><div style={{fontSize:"11px",color:"#8B7355"}}>{a.desc}</div></div>
              </button>
            ))}
          </div>
        </div>)}
      </div>
      <button onClick={next} disabled={!canNext} style={{marginTop:"22px",padding:"11px 38px",borderRadius:"24px",border:"none",background:canNext?"#D4A853":"#2C1F14",color:canNext?"#1A1008":"#4A3525",fontSize:"12px",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",cursor:canNext?"pointer":"not-allowed",transition:"all 0.2s"}}>
        {step===2?"✨ Llegar a Veloria":"Continuar →"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN GAME
// ═══════════════════════════════════════════════════════════
export default function InbetweensGame(){
  const [phase,setPhase]=useState("creation"),[twin,setTwin]=useState(null);
  const [needs,setNeeds]=useState({hambre:75,sueno:80,higiene:80,social:50,diversion:55,vejiga:70});
  const [money,setMoney]=useState(250),[gt,setGt]=useState({hour:8,day:1,monthIdx:0});
  const [loc,setLoc]=useState({hood:"La Vega",place:"Tu apartamento"});
  const [rels,setRels]=useState({}),[career,setCareer]=useState(null);
  const [family,setFamily]=useState({partner:null,romanticStatus:null,children:[]});
  const [log,setLog]=useState([]),[loading,setLoading]=useState(false);
  const [sideTab,setSideTab]=useState("estado");
  const [namingChild,setNamingChild]=useState(false),[childNameInput,setChildNameInput]=useState("");
  const logEnd=useRef(null);

  const scrollLog=()=>logEnd.current?.scrollIntoView({behavior:"smooth"});
  const addEntry=e=>setLog(prev=>[...prev,{id:Date.now()+Math.random(),...e}]);

  const tick=(hours,changes={})=>{
    setNeeds(prev=>({
      hambre:clamp(prev.hambre-hours*4+(changes.hambre||0)),sueno:clamp(prev.sueno-hours*3+(changes.sueno||0)),
      higiene:clamp(prev.higiene-hours*1.5+(changes.higiene||0)),social:clamp(prev.social-hours*2+(changes.social||0)),
      diversion:clamp(prev.diversion-hours*2.5+(changes.diversion||0)),vejiga:clamp(prev.vejiga-hours*8+(changes.vejiga||0)),
    }));
    setGt(prev=>{
      const total=prev.hour+hours,daysGained=Math.floor(total/24),newDay=prev.day+daysGained;
      return{hour:total%24,day:newDay,monthIdx:clamp(prev.monthIdx+Math.floor(newDay/30)-Math.floor(prev.day/30),0,11)};
    });
    setTimeout(scrollLog,100);
  };

  async function handleStart(twinData){
    setTwin(twinData);setPhase("playing");setLoading(true);
    await sleep(500);
    const text=getNarrative(`intro:${twinData.aspiration}`)||getNarrative("intro:alma");
    addEntry({text,type:"intro",place:"Tu apartamento",time:"08:00"});
    setLoading(false);
  }

  async function handleAction(action){
    if(loading)return;
    const cost=action.cost||0;
    if(money<cost){addEntry({text:`No tenés suficientes Luces (necesitás L${cost}).`,type:"system"});return;}
    setLoading(true);
    await sleep(350+Math.random()*200);

    if(action.id==="chat_npc"&&action.npc){
      const fr=rels[action.npc]?.friendship||0;
      const level=fr<30?"low":fr<65?"mid":"high";
      const npcKey=`npc:${action.npc}:${level}`;
      const text=getNarrative(N[npcKey]?npcKey:`npc:default:${level}`,{NPC:action.npc.split(" ")[0]});
      const gain=Math.floor(Math.random()*6)+7;
      tick(action.time,{social:10,diversion:8});
      if(cost>0)setMoney(m=>m-cost);
      setRels(prev=>({...prev,[action.npc]:{friendship:clamp((prev[action.npc]?.friendship||0)+gain)}}));
      addEntry({text,type:"story",place:loc.place,time:toTimeStr(gt.hour+action.time)});
    } else {
      const text=getNarrative(action.id)||getNarrative("default");
      const base=BASE_EFFECTS[action.id]||{};
      tick(action.time||0.5,base);
      if(cost>0)setMoney(m=>m-cost);
      addEntry({text,type:"story",place:loc.place,time:toTimeStr(gt.hour+(action.time||0.5))});
    }
    setLoading(false);
  }

  async function handleWork(){
    if(!career||loading)return;
    const c=CAREERS[career.track],wage=c.wages[career.level];
    setLoading(true);await sleep(400);
    const text=getNarrative(`work:${career.track}`);
    tick(c.shiftH,BASE_EFFECTS["work_shift"]||{});
    setMoney(m=>m+wage);
    const newShifts=career.shiftsWorked+1;
    const newLevel=career.level<3&&newShifts%PROMO_SHIFTS[career.level]===0?career.level+1:career.level;
    const promoted=newLevel>career.level;
    setCareer(prev=>({...prev,shiftsWorked:newShifts,level:newLevel}));
    addEntry({text:promoted?text+`\n\n✦ ¡Ascenso! Ahora sos ${c.levels[newLevel]} en ${c.label}.`:text,type:"work",place:loc.place,time:toTimeStr(gt.hour+c.shiftH)});
    setLoading(false);
  }

  async function handleApplyJob(trackId){
    if(loading)return;
    const c=CAREERS[trackId];setLoading(true);await sleep(400);
    setCareer({track:trackId,level:0,shiftsWorked:0});
    addEntry({text:getNarrative(`apply:${trackId}`),type:"work",place:loc.place,time:toTimeStr(gt.hour+1)});
    setLoading(false);
  }

  async function handleEventAttend(){
    const ev=CALENDAR_EVENTS[gt.monthIdx];
    if(!ev||loading)return;setLoading(true);await sleep(500);
    tick(3,BASE_EFFECTS["event_attend"]||{});
    addEntry({text:getNarrative(`event:${gt.monthIdx}`),type:"event",place:loc.place,time:toTimeStr(gt.hour+3)});
    setLoading(false);
  }

  async function handleRomanceAction(type,npcName){
    if(loading)return;
    if(type==="have_child"){setNamingChild(true);setChildNameInput("");return;}
    setLoading(true);await sleep(400);
    const text=getNarrative(`romance:${type}`,{NPC:npcName});
    const positive=type==="ask_out"||type==="propose"||type==="marry";
    tick(1,positive?{social:20,diversion:25}:{social:-25,diversion:-20});
    if(type==="ask_out") setFamily(f=>({...f,partner:npcName,romanticStatus:"dating"}));
    else if(type==="propose") setFamily(f=>({...f,romanticStatus:"engaged"}));
    else if(type==="marry") setFamily(f=>({...f,romanticStatus:"married"}));
    else if(type==="breakup"||type==="divorce"){
      setFamily(f=>({...f,partner:null,romanticStatus:null}));
      setRels(prev=>({...prev,[npcName]:{friendship:clamp((prev[npcName]?.friendship||0)-20)}}));
    }
    addEntry({text,type:"romance",place:loc.place,time:toTimeStr(gt.hour+1)});
    setLoading(false);
  }

  async function handleHaveChild(){
    const name=childNameInput.trim();if(!name)return;
    setNamingChild(false);setLoading(true);await sleep(500);
    const pTraits=NPC_TRAITS_MAP[family.partner]||["curioso","alegre","cálido"];
    const pool=[...new Set([...(twin?.traits||[]),...pTraits])].sort(()=>0.5-Math.random());
    const childTraits=pool.slice(0,3);
    setFamily(f=>({...f,children:[...f.children,{name,birthDay:gt.day,traits:childTraits,otherParent:family.partner}]}));
    tick(0,{social:30,diversion:20});
    addEntry({text:getNarrative("birth",{CHILD:name,PARTNER:family.partner||"tu pareja"}),type:"intro",place:"Tu apartamento",time:toTimeStr(gt.hour)});
    setLoading(false);
  }

  async function handleGoTo(hood,place){
    if(loading||(loc.hood===hood&&loc.place===place))return;
    setLoc({hood,place});setLoading(true);await sleep(300);
    tick(loc.hood!==hood?0.5:0.2,{});
    addEntry({text:getNarrative(`travel:${place}`)||`Llegás a ${place}.`,type:"travel",place,time:toTimeStr(gt.hour+(loc.hood!==hood?0.5:0.2))});
    setLoading(false);
  }

  if(phase==="creation")return<CreationScreen onStart={handleStart}/>;

  const dark=gt.hour>=21||gt.hour<6;
  const hoodData=NEIGHBORHOODS[loc.hood]||{},hoodColor=hoodData.color||"#D4A853";
  const bg=dark?"#120D07":"#FDF6E9",panelBg=dark?"#1C1208":"#FAF0DC";
  const border=dark?"#2C1F14":"#E8D5B8",muted=dark?"#6B5040":"#A08060";
  const isAtWorkplace=career&&CAREERS[career.track]?.places.includes(loc.place);
  const workBtn=isAtWorkplace?[{id:"_work",label:`💼 Trabajar turno (+L${CAREERS[career.track].wages[career.level]})`,time:CAREERS[career.track].shiftH,isWork:true}]:[];
  const displayActions=[...workBtn,...(PLACE_ACTIONS[loc.place]||[])];
  const SIDE_TABS=[{id:"estado",emoji:"🎮",label:"Estado"},{id:"relaciones",emoji:"💬",label:"Relaciones"},{id:"trabajo",emoji:"💼",label:"Trabajo"}];
  const currentEvent=CALENDAR_EVENTS[gt.monthIdx];

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:bg,fontFamily:"'DM Sans',sans-serif",color:dark?"#EDE0CC":"#3D2B1F",overflow:"hidden",transition:"background 2s"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:rgba(212,168,83,0.35);border-radius:2px}button{font-family:inherit}`}</style>

      {namingChild&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.75)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:panelBg,border:`1px solid ${border}`,borderRadius:"16px",padding:"28px",width:"320px",textAlign:"center"}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>👶</div>
            <div style={{fontFamily:"'Lora',serif",fontSize:"18px",color:"#D4A853",marginBottom:"6px"}}>¿Cómo se llama?</div>
            <div style={{fontSize:"11px",color:muted,marginBottom:"20px"}}>El nombre de tu hijo/a en Veloria.</div>
            <input value={childNameInput} onChange={e=>setChildNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&childNameInput.trim()&&handleHaveChild()} placeholder="Nombre..." style={{width:"100%",padding:"10px 14px",background:"transparent",border:`1px solid ${border}`,borderRadius:"8px",color:dark?"#FDF6E9":"#3D2B1F",fontSize:"16px",fontFamily:"'Lora',serif",outline:"none",marginBottom:"12px"}}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setNamingChild(false)} style={{flex:1,padding:"8px",borderRadius:"8px",border:`1px solid ${border}`,background:"transparent",color:muted,cursor:"pointer"}}>Cancelar</button>
              <button onClick={handleHaveChild} disabled={!childNameInput.trim()} style={{flex:1,padding:"8px",borderRadius:"8px",border:"none",background:"#D4A853",color:"#1A1008",cursor:"pointer",fontWeight:600}}>✦ Confirmar</button>
            </div>
          </div>
        </div>
      )}

      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 18px",borderBottom:`1px solid ${border}`,background:panelBg,flexShrink:0}}>
        <div>
          <span style={{fontFamily:"'Lora',serif",fontSize:"15px",color:"#D4A853"}}>{twin?.name}</span>
          <span style={{fontSize:"10px",color:muted,marginLeft:"7px"}}>{twin?.traits?.join(" · ")}</span>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"17px",color:dark?"#7BB8B9":"#D4A853"}}>{toTimeStr(gt.hour)}</div>
          <div style={{fontSize:"9px",color:muted}}>Día {gt.day} · {MONTHS[gt.monthIdx]} · {SEASONS[gt.monthIdx]}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"13px",color:"#D4A853",fontWeight:600}}>✦ L {money}</div>
          <div style={{fontSize:"9px",color:muted}}>{career?CAREERS[career.track].levels[career.level]:"Sin trabajo"}{family.partner?` · ${family.partner.split(" ")[0]} 💕`:""}</div>
        </div>
      </div>

      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"5px 18px",fontSize:"10px",color:hoodColor,borderBottom:`1px solid ${border}`,letterSpacing:"0.1em",textTransform:"uppercase",flexShrink:0}}>📍 {loc.hood} → {loc.place}</div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 22px"}}>
            {log.map(e=><NarrativeBlock key={e.id} entry={e} dark={dark}/>)}
            {loading&&<div style={{color:"#D4A853",fontSize:"13px",opacity:0.6,fontStyle:"italic",fontFamily:"'Lora',serif"}}>✦ ...</div>}
            <div ref={logEnd}/>
          </div>
        </div>

        <div style={{width:"220px",borderLeft:`1px solid ${border}`,display:"flex",flexDirection:"column",background:panelBg,flexShrink:0}}>
          <div style={{display:"flex",borderBottom:`1px solid ${border}`,flexShrink:0}}>
            {SIDE_TABS.map(t=>(
              <button key={t.id} onClick={()=>setSideTab(t.id)} style={{flex:1,padding:"7px 2px",fontSize:"9px",border:"none",borderBottom:sideTab===t.id?`2px solid ${hoodColor}`:"2px solid transparent",background:"transparent",color:sideTab===t.id?hoodColor:muted,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px"}}>
                <span style={{fontSize:"13px"}}>{t.emoji}</span>
                <span style={{letterSpacing:"0.06em",textTransform:"uppercase"}}>{t.label}</span>
              </button>
            ))}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
            {sideTab==="estado"&&<EstadoTab needs={needs} dark={dark} currentEvent={currentEvent} onEventAttend={handleEventAttend} loading={loading}/>}
            {sideTab==="relaciones"&&<RelacionesTab rels={rels} family={family} currentDay={gt.day} dark={dark} loading={loading} onRomanceAction={handleRomanceAction}/>}
            {sideTab==="trabajo"&&<TrabajoTab career={career} loc={loc} dark={dark} loading={loading} onApply={handleApplyJob} onWork={handleWork}/>}
          </div>
        </div>
      </div>

      <div style={{borderTop:`1px solid ${border}`,background:panelBg,flexShrink:0}}>
        <div style={{display:"flex",overflowX:"auto",padding:"7px 12px",gap:"10px",borderBottom:`1px solid ${border}`}}>
          {Object.entries(NEIGHBORHOODS).map(([hood,d])=>(
            <div key={hood} style={{flexShrink:0}}>
              <div style={{fontSize:"9px",color:loc.hood===hood?d.color:muted,letterSpacing:"0.05em",marginBottom:"4px",textAlign:"center"}}>{d.emoji} {hood}</div>
              <div style={{display:"flex",gap:"3px"}}>
                {d.places.map(p=>(
                  <button key={p} onClick={()=>handleGoTo(hood,p)} disabled={loading} style={{padding:"3px 7px",fontSize:"9px",borderRadius:"4px",border:`1px solid ${loc.place===p?d.color:dark?"#3D2B1F":"#D4C4A0"}`,background:loc.place===p?d.color:"transparent",color:loc.place===p?"#FDF6E9":dark?"#C4A87A":"#5C4A32",cursor:loading?"not-allowed":"pointer",opacity:loading?0.45:1,whiteSpace:"nowrap",transition:"all 0.12s"}}>
                    {p.length>12?p.slice(0,11)+"…":p}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"5px",padding:"7px 12px"}}>
          {displayActions.map(a=>(
            <button key={a.id} onClick={()=>a.isWork?handleWork():handleAction(a)} disabled={loading} style={{padding:"5px 11px",fontSize:"11px",borderRadius:"6px",border:`1px solid ${a.isWork?"#6B9E5E":dark?"#3D2B1F":"#D4C4A0"}`,background:a.isWork?"rgba(107,158,94,0.1)":"transparent",color:a.isWork?"#6B9E5E":dark?"#C4A87A":"#5C4A32",cursor:loading?"not-allowed":"pointer",opacity:loading?0.4:1,display:"flex",alignItems:"center",gap:"4px",transition:"all 0.12s"}}
              onMouseEnter={e=>{if(!loading){e.currentTarget.style.background=a.isWork?"#6B9E5E":hoodColor;e.currentTarget.style.color="#FDF6E9";}}}
              onMouseLeave={e=>{e.currentTarget.style.background=a.isWork?"rgba(107,158,94,0.1)":"transparent";e.currentTarget.style.color=a.isWork?"#6B9E5E":dark?"#C4A87A":"#5C4A32";}}>
              {a.label}{a.cost&&<span style={{fontSize:"9px",opacity:0.6}}>L{a.cost}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
