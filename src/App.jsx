import { useState, useRef, useEffect } from "react";

// ═══════════════════ NARRATIVAS ═══════════════════
const N = {
  "intro:familia":["El apartamento en La Vega huele a pintura fresca y posibilidades. Desde la ventana se ve el barrio despertando: jóvenes con mochilas, una vecina regando sus plantas, el olor a café flotando desde algún piso de abajo.\n\nA lo lejos, entre los techos, brilla el Lago Miren.\n\n*Velin*, pensás. Esto puede ser casa."],
  "intro:artista":["La primera luz del Veloer entra por las cortinas y te pinta la pared de dorado. Ya estás pensando en cómo capturarlo: con palabras, con notas, con lo que sea que usés para hacer lo que hacés.\n\nVeloria desde acá parece un lugar que tiene ganas de ser representado. Bien."],
  "intro:empresario":["El apartamento es una inversión. La ciudad, una oportunidad. Veloria desde la ventana se ve pequeña pero tiene algo: un ritmo propio, gente que confía en quienes demuestran que merecen confianza.\n\nHoy es día uno."],
  "intro:alma":["Abajo, el barrio despierta. Alguien hace café dos pisos más abajo. Una nena corre por la vereda. Desde la esquina, una Twin mayor te saluda aunque todavía no te conozca.\n\nVeloria es un lugar donde eso pasa. Eso es lo que viniste a buscar."],
  sleep:["Te recostás y el día se derrama en silencio. Afuera, Veloria sigue girando: el Lago Miren respira, el Velin dorado canta una nota lejana.\n\nCuando abrís los ojos, la luz del Veloer ya empezó su carrera hacia el horizonte.","Soñás con el lago, con voces que hablaban Twinés y te llamaban por un nombre que no era exactamente el tuyo.\n\nTe despertás despejado/a, con algo parecido a la paz."],
  cook:["El olor a Pan Velin recién hecho llena cada rincón del apartamento. Hay algo en cocinar en Veloria que se siente como un ritual antiguo, como si la comida fuera otra forma de decir *Kalei*.","La cocina es pequeña pero perfecta. Seguís una receta de memoria, añadiendo especias doradas del mercado. El resultado no es perfecto pero es tuyo."],
  shower:["El agua caliente borra las últimas capas del cansancio. Salís con la piel fresca y la cabeza más liviana.\n\nEn Veloria hasta ducharse se siente diferente; quizás porque el agua viene del Miren."],
  bathroom:["Te tomás un momento. La ventana del baño da a un patio interno con un Mireno pequeño. Sus hojas claras se mueven despacio."],
  rest:["Te tirás en el sillón con una taza de Té Miren. El barrio hace sus ruidos habituales: pasos, alguna voz, el viento entre los lofts.\n\nNo pensás en nada especial. Ese es justamente el punto.","Un rato sin hacer nada en particular. La tarde avanza despacio. Te acordás de por qué viniste a Veloria: para tener tiempo para esto."],
  hobby:["Agarrás lo que te llama hoy y dejás que las manos hagan lo suyo. No todo sale bien. Pero hay un momento, breve y exacto, en que algo hace click y te sentís más vos mismo/a que en todo el día.","Dos horas adentro de tu hobbie y el mundo de afuera desapareció. Cuando parás, hay algo nuevo donde antes había una página en blanco."],
  coffee:["El café de Aria es exactamente lo que necesitabas. La taza calienta las manos. Por la ventana ves pasar a los Twins de La Vega con sus ritmos propios.","Pedís el habitual. Aria lo pone en la barra sin preguntar — ya empezó a conocerte. Tiene algo de Hierba Luma que hace que todo parezca más llevadero."],
  read_cafe:["Te instalás en el rincón del fondo con un libro. Dos horas después levantás la vista y el café está frío. No importa.\n\nAlgo del texto se quedó adentro tuyo como una canción que no recordás haber aprendido."],
  observe:["Mirás la calle desde la ventana. La Vega tiene su propio ritmo: rápido, joven, un poco desprolijo. Veloria entra y sale sin pedir permiso.","Una hora mirando sin propósito fijo. Aprendés más de un barrio observando que preguntando. La Vega es un lugar que todavía se está inventando a sí mismo."],
  walk_plaza:["La Plaza del Veloer es el corazón de El Casco. Los adoquines brillan levemente húmedos. La estatua de Miren Veloer mira hacia el lago como siempre.\n\nHay algo permanente en este lugar que el resto de la ciudad no tiene.","El Casco tiene una gravedad propia. Caminás y sentís el peso de cuatrocientos años debajo de los pies."],
  market:["El mercado ofrece de todo: especias doradas, flores Velora en pequeños ramos, libros de segunda mano, semillas. Hablás con dos vendedores, probás algo. Te vas más rico/a de todos modos.","Entre los puestos encontrás cosas que no sabías que buscabas. Un Twin viejo te cuenta cómo preparar el Té Miren como lo hacía su madre."],
  browse_books:["La librería de Soren huele a papel viejo y madera clara. Encontrás tres libros que te llaman y te quedás parado/a leyendo primeras páginas durante demasiado tiempo.","Cada libro tiene una nota a mano de Soren en la primera página. *Este te va a romper el corazón*, dice uno. Lo dejás. Lo agarrás de nuevo."],
  buy_book:["Soren envuelve el libro en papel marrón sin que se lo pidas. *Para preservar la primera impresión*, dice sin mirarte.\n\nLo guardás en la mochila y sentís que compraste algo más que papel."],
  fish:["La caña casi no pesa. El Lago Miren refleja las nubes con una claridad que marea un poco. Dos horas después tenés tres Mirenpeces y la cabeza vacía de todo lo que la tenía llena.","Pescar en el Miren es aprender paciencia de una manera que ningún libro puede enseñar. Un Mirenpez pica y por un momento sos solo eso: alguien tirando de algo brillante en la luz."],
  sit_lake:["Te sentás en el borde del muelle y dejás los pies colgar. Las escamas de los Mirenpeces brillan bajo el agua, puntos de plata en el verde.\n\nPensás en lo que le contarías al lago si fueras a hablarle.","El agua del Miren hace un ruido suave contra la madera. Nada que resolver. El Lago escucha de todas formas."],
  swim:["El Lago Miren entra en el cuerpo como una revelación. Frío al principio, después perfectamente tuyo. Nadás lejos hasta que el muelle parece pequeño y Veloria desde acá es solo tejados y árboles.\n\nLa vuelta siempre llega demasiado pronto."],
  secret_lake:["Te acercás a la orilla más quieta. Mirás alrededor: no hay nadie. En voz baja le contás algo al lago.\n\nEl agua sigue igual. Pero vos te sentís un poco más liviano/a.","La leyenda dice que el Lago Miren no olvida. Le contás tu secreto de todas formas. Hay algo liberador en confiarle algo a alguien que nunca va a repetírtelo."],
  walk_shore:["La orilla del Miren al atardecer es uno de los mejores lugares del mundo. La luz se vuelve dorada y el lago la duplica. Caminás despacio, sin destino, recogiendo piedras planas.","Las flores Velora crecen a lo largo de la orilla sur. Sus pétalos dorados abren solo al atardecer. Caminás entre ellas con cuidado."],
  eat_dish:["El Mirenpez al Veloer de Nela es exactamente igual a como lo describieron: el pescado se deshace solo, las especias doradas transforman algo bueno en algo sagrado.\n\nComés despacio. No querés que se termine.","El plato llega humeando. Nela lo puso sin decir nada, solo asintió como si supiera que ibas a necesitarlo. Tenía razón."],
  cena:["La cena completa en el restaurante de Nela es una experiencia. Tres platos, Lumaven joven al final, la vista al lago.\n\nVeloria desde acá se ve exactamente como debería verse: perfecta en su imperfección."],
  research:["Los archivos guardan cuatrocientos años de historia. Leés sobre la Llegada, sobre la Era de las Luces. Hay algo raro: las referencias a los fundadores siempre mencionan doce nombres. Solo doce. Nunca más.","Entre las páginas de un libro antiguo encontrás una nota manuscrita: *¿Quién fue el primero en cruzar?* No tiene firma ni fecha.\n\nLa doblás de vuelta y la dejás donde estaba."],
  read_lib:["La sala de lectura tiene ventanas al jardín interno. Leés durante horas con el único ruido de las páginas y, de vez en cuando, los pasos de Ciro en algún pasillo lejano."],
  watch_show:["La obra habla de dos Twins que se buscan sin saber que ya se encontraron. El teatro es pequeño y la actuación tan cercana que podés ver los ojos de los actores.\n\nSalís con la sensación de que algo en el mundo se ordenó un poco.","Cael dirige desde el fondo de la sala con los brazos cruzados. Sus obras siempre tienen ese algo que no podés nombrar: una verdad que no se dice pero que todos los que miraron se llevan a casa."],
  walk_park:["Los árboles del Parque de Los Prados son viejos, de los que hacen sombra de verdad. Caminás entre ellos y el ruido de Veloria se apaga un poco.","El parque en esta hora está casi vacío. Veloria desde adentro del parque suena diferente: más suave, más antigua."],
  picnic:["La hierba del parque es perfecta para tenderse. Sacás lo que trajiste, lo ponés en el pasto, y te quedás mirando el cielo hasta que las nubes hacen formas que se parecen a cosas que conocés."],
  checkup:["Bren te recibe con esa calma que solo dan años de oficio. *Estás bien*, dice al final. *Pero dormí más.* Sale rápido, como si tuviera todo el tiempo del mundo pero supiera que no."],
  "npc:Aria Ven:low":["'¿Qué vas a pedir?' pregunta Aria sin levantar la vista del mostrador. Aún no saben mucho el uno del otro, pero hay algo en su forma de atender que dice que está prestando atención."],
  "npc:Aria Ven:mid":["'¿El mismo de siempre?' pregunta antes de que abras la boca. Asintió y arrancó a prepararlo. Hablaron de La Vega, de cómo el barrio cambia según la hora. Aria conoce este lugar como la palma de su mano."],
  "npc:Aria Ven:high":["Aria se sienta un momento del otro lado de la barra — cosa que no hace con todo el mundo — y habla en voz baja. Te cuenta por qué abrió el café, una decisión de hace cuatro años que todavía no sabe si fue la correcta.\n\n'*Sora* por escuchar', dice después, y vuelve al trabajo."],
  "npc:Oren Mirende:low":["Oren amarra una barca con un nudo que hace en un segundo. Te ve mirarlo y sonríe. 'Todo tiene su técnica', dice. La invitación a preguntar está clara."],
  "npc:Oren Mirende:mid":["Oren habla del lago como alguien habla de una persona que quiere: con respeto y un poco de temor. Te cuenta los mejores horarios para pescar. En el tema de la noche se detiene un segundo antes de cambiar de tema."],
  "npc:Oren Mirende:high":["Oren te lleva al lado sur del muelle, donde nadie va a molestarlos. 'Una noche vi una luz en el centro del lago. No era el reflejo de nada. Mi viejo también la vio, una vez. Nunca hablamos de eso.'\n\nMira el agua. No dice más."],
  "npc:Nela Mirende:low":["Nela te trae el plato con una eficiencia que habla de años de oficio. Directa, justa, sin vueltas."],
  "npc:Nela Mirende:mid":["'¿Cómo te está tratando Veloria?' pregunta Nela mientras limpia la barra. Espera la respuesta real. 'Este lugar te elige a vos, no al revés.'"],
  "npc:Nela Mirende:high":["Nela te invita a quedarte después del cierre con un Té Miren. 'Solo los que me caen bien.' Habla de su divorcio sin amargura, como quien ya hizo las paces con algo que dolió mucho. 'El lago escucha si se lo pedís.'"],
  "npc:Ciro Orlen:low":["Ciro levanta la vista de sus archivos un segundo, asiente, y vuelve a bajarla. Su mente está en otro lado."],
  "npc:Ciro Orlen:mid":["Ciro te muestra un mapa antiguo de Veloria. 'La Plaza del Veloer era más grande. Demolieron una sección en el Año 200. Nadie sabe por qué.' Habla con la precisión de alguien rastreando algo que todavía no encontró."],
  "npc:Ciro Orlen:high":["Ciro baja la voz aunque estén solos. 'Los fundadores fueron doce, dice la historia oficial. Pero hay una firma en el Acta de la Llegada que no pertenece a ninguno de los doce.'\n\nTe muestra el documento. La firma dice solo: *V.*\n\n'Llevo dos años sin poder dormir bien', dice."],
  "npc:Aldric Veloer:low":["Aldric Veloer camina por la Plaza con la autoridad tranquila de alguien que nunca necesitó apurar el paso. Te saluda con una inclinación de cabeza."],
  "npc:Aldric Veloer:mid":["Aldric te ofrece un Velorcito y habla de la historia de la Plaza como quien vivió parte de ella. Tiene esa forma de contar de los Velistas: sin dramatismo, dejando que el peso de las palabras haga el trabajo."],
  "npc:Aldric Veloer:high":["Aldric te lleva lejos del mercado. 'Hay algo en el Lago Miren que la gente joven ya no sabe. No porque nadie lo cuente. Sino porque hay cosas que solo se ven cuando uno está listo.'\n\nTe mira un momento largo. 'Creo que vos estás empezando a estar listo/a.'"],
  "npc:Elowen Sorvei:low":["Elowen está sentada en el banco del jardín con un cuaderno sobre las rodillas. Te ve pasar y asiente levemente."],
  "npc:Elowen Sorvei:mid":["Elowen te habla del Otreven como si fuera un lugar que cualquiera puede visitar. 'No es un lugar físico. Es el espacio entre dos notas de música.' Escribe algo en su cuaderno mientras habla."],
  "npc:Elowen Sorvei:high":["'Estoy escribiendo sobre algo que pasó de verdad', dice Elowen. 'Un fundador que tomó una decisión que nadie en Veloria está listo para entender todavía.'\n\nTe mira. 'Me alegra que hayas llegado a esta ciudad en este momento.'"],
  "npc:Soren Lume:low":["Soren no levanta la vista cuando entrás, pero dice *Buenos días* antes de que abras la boca."],
  "npc:Soren Lume:mid":["Soren te recomienda un libro: 'Leé la primera página. Si no te enganchó, lo devolvés.' Hablaron de por qué algunos libros llegan en el momento exacto en que los necesitás."],
  "npc:Soren Lume:high":["La librería cerró pero Soren no te apura. Hay mate sobre la barra. Habla de Elowen Sorvei sin que vos preguntés. 'La conocí a los dieciocho. Entré a una lectura suya por accidente. Nunca más fui el mismo.'\n\n'Nunca se lo dije.' No te mira. 'No me hagas preguntas.'"],
  "npc:Bren Orlen:low":["Bren Orlen tiene ese silencio de médico: el que dice *te estoy escuchando* sin decirlo."],
  "npc:Bren Orlen:mid":["Bren te ofrece un Té Miren. 'Acá la gente vive', dice. 'No actúa. Hay una diferencia.'"],
  "npc:Bren Orlen:high":["'Mi familia guarda algo', dice Bren al fin. 'Los fundadores tomaron una decisión en la Llegada que la historia oficial borró. No por maldad. Por miedo.'\n\nMira hacia la ventana. 'Hay una puerta que sigue abierta, en algún lugar de este mundo.'"],
  "npc:Cael Sorvei:low":["Cael no tiene conversación pequeña. Te hace una sola pregunta: '¿Por qué viniste a Veloria?' Y después escucha."],
  "npc:Cael Sorvei:mid":["Cael te lleva al backstage y te muestra los telones pintados a mano. 'El arte sobrevive al artista. Eso es lo único que importa.'"],
  "npc:Cael Sorvei:high":["'Hay alguien en esta ciudad que no sé si voy a poder tener nunca', dice Cael. No da nombre. 'Pero el amor que no podés tener te hace mejor artista. O te destruye. Todavía estoy averiguando cuál.'"],
  "npc:Niven Sorvei:low":["Niven no para de trabajar mientras hablás. Entre trazos contesta con una honestidad directa que sorprende."],
  "npc:Niven Sorvei:mid":["Niven te muestra el mural que está pintando: Veloria pero no es Veloria. Los edificios levemente torcidos, el lago demasiado oscuro. 'La verdad tiene que deformarse un poco para caber en un cuadro.'"],
  "npc:Niven Sorvei:high":["Niven limpia sus pinceles despacio. 'La mayoría de la gente quiere que le digan lo que quieren escuchar. Vos no sos así.'\n\nEs el cumplido más alto que existe, viniendo de ella."],
  "npc:Luma Sorvei:low":["Luma está tocando guitarra en el borde de la vereda. La melodía suena a algo entre el Veloer y el lago: dorada y azul al mismo tiempo."],
  "npc:Luma Sorvei:mid":["Luma te enseña tres acordes. 'La música acá tiene su propio idioma. Es Twinés pero con notas.'"],
  "npc:Luma Sorvei:high":["'Hay una canción que escucho a veces, cuando el lago está muy quieto. No sé de dónde viene. Nadie más la escucha.'\n\nUna pausa. 'O sí la escuchan y no lo dicen.'"],
  "npc:Riven Lumaren:low":["Riven Lumaren te recibe con una sonrisa amplia y preguntas genuinas. Si no supieras quién es, lo tomarías por un vecino más."],
  "npc:Riven Lumaren:mid":["'Hay noches que toco guitarra en casa hasta la madrugada', dice de la nada. 'Nadie en mi familia lo sabe.'"],
  "npc:Riven Lumaren:high":["Riven te muestra una grabación: él tocando en un depósito vacío. Es muy bueno. 'Un día', dice. Solo eso.\n\nNo sabe todavía que ese *un día* puede ser ahora."],
  "npc:Tomas Mirende:low":["Tomas Mirende tiene la paciencia del lago. Habla poco. Cuando lo hace, lo que dice vale."],
  "npc:Tomas Mirende:mid":["Tomas te cuenta que su familia pesca el Miren desde hace cuatro generaciones. 'El lago cambia cada año. Pero siempre te devuelve algo.'"],
  "npc:Tomas Mirende:high":["'Una noche, hace veinte años. Vi una luz en el centro del Miren que no era el reflejo de nada.'\n\nTe mira. 'En esta familia hay cosas que no se dicen.' Una pausa. 'Hasta hoy.'"],
  "npc:Dora Velin:low":["Dora Velin tiene noventa y tantos años y los lleva con una dignidad sin esfuerzo. Te da los buenos días con humor seco."],
  "npc:Dora Velin:mid":["Dora recuerda a los padres de los padres de gente que hoy tiene sesenta. 'Veloria cambia menos de lo que cree.'"],
  "npc:Dora Velin:high":["Dora te agarra del brazo con una fuerza que no esperabas. 'Yo conocí al Velista Mayor. Sí. No era un mito.'\n\nUna pausa. 'Me dijo algo sobre el lago que nunca le conté a nadie. Pero a vos creo que sí te lo puedo decir. Otro día. Cuando estés listo/a.'"],
  "npc:Leva Sorin:low":["Leva Sorin da clase de historia con una intensidad que hace que incluso los temas áridos parezcan urgentes."],
  "npc:Leva Sorin:mid":["'Hay huecos en la historia oficial de Veloria que nadie quiere ver', dice Leva. 'Yo los veo. Llevo diez años viéndolos.'"],
  "npc:Leva Sorin:high":["Leva te muestra su cuaderno lleno de notas, fechas, nombres tachados. 'Los fundadores fundaron algo más que una ciudad. Fundaron un secreto.'\n\nUna pausa. 'Pero la carga sigue ahí. En el lago. En los registros. En la gente que sabe y calla.'"],
  "npc:default:low":["Intercambiás unas palabras con [NPC]. Todavía están conociéndose. Veloria da tiempo."],
  "npc:default:mid":["[NPC] y vos se llevan bien. La conversación fluye natural, sin forzar nada."],
  "npc:default:high":["[NPC] te habla con la confianza de los amigos de verdad. Hay cosas que solo se dicen cuando ya no hacen falta las formas."],
  "work:arte":["El turno pasa entre telas y la presión buena de un deadline. Cael te pide que repases una escena hasta que suene *real, no ensayada*. Cuando lo lográs, algo en el cuarto cambia de temperatura.","Alguien del elenco te pide tu opinión. La das. La toman en serio. Eso es nuevo."],
  "work:cocina":["El turno empieza con el mise en place y termina con las manos oliendo a especias doradas. Nela corrige dos veces, elogia una. De ella eso equivale a un aplauso.","Servicio del mediodía: quince cubiertos, dos errores, ningún desastre. Nela dice: 'Vas mejorando.'"],
  "work:comercio":["La Plaza a la mañana tiene otra energía. Empezás a conocer los ritmos: quién llega primero, quién regatea, quién compra sin mirar el precio.","Un cliente difícil, tres transacciones complicadas. Al final del turno todo cerró. Eso es suficiente."],
  "work:medicina":["Una mañana de consultas con Bren. 'Un médico que no sabe mirar no sabe nada. Mirá primero. Siempre.'","Veloria enferma poco. Pero cuando lo hace, confía en vos. Eso pesa."],
  "work:educacion":["La clase tiene quince alumnos con preguntas que no esperabas. Al final hay uno que pregunta algo que te hace pensar en el camino de vuelta. Ese momento justifica el día.","Burocracia, planificaciones, una reunión larga. Pero hay un momento en que algo que decís hace click en alguien."],
  "work:pesca":["Seis horas en el lago con Oren. El trabajo es físico y silencioso. Al final del día vendés la pesca y el dinero sabe diferente cuando salió de las manos.","El Mirenpez tiene su temporada y esta semana está buena. Volvés con los hombros cansados de la manera correcta."],
  "apply:arte":["Cael te escucha y dice: 'Empezás el lunes. Llegá temprano: el teatro tiene sus propios horarios y no son los de nadie más.'"],
  "apply:cocina":["Nela te pide que prepares un plato básico. Lo prueba. 'Empezás mañana. Vas a aprender todo de nuevo aunque ya sepas cocinar.'"],
  "apply:comercio":["'Si tratás bien a la gente, la gente vuelve. Acá eso todavía funciona.' Firmás el contrato sobre el mostrador de la Plaza."],
  "apply:medicina":["Bren te hace tres preguntas concretas. 'Bien. El resto lo aprendés acá. Mañana a las ocho.'"],
  "apply:educacion":["'Veloria necesita gente que quiera enseñar. No solo gente que sepa. Hay diferencia.' Firmás con la pluma de Mireno que te ofrece."],
  "apply:pesca":["Tomas te mira de arriba abajo. 'Sos nuevo/a en esto. Bien. Los que ya saben son los más difíciles de enseñar.' Oren te da un par de botas. 'Mañana a las cinco.'"],
  "event:0":["La Plaza está llena a primera hora. Cada Twin lleva algo para plantar. La tradición dice que lo que sembrás el Primer Brote determina qué crece en vos durante el año.\n\nPlantás lo tuyo con más seriedad de la que esperabas."],
  "event:1":["El mercado flotante: veinte barcas amarradas entre sí con tablas de Mireno. Navegás entre los puestos y comprás tres cosas que no necesitabas y una que sí."],
  "event:2":["La Noche de los Nombres: alguien te dice cómo te ve. No tu nombre real — el nombre que te daría si tuviera que inventarte uno.\n\nEscuchás el tuyo y tardás en procesar lo que significa."],
  "event:3":["Toda Ribera está en el lago. El agua del Miren en esta época tiene una temperatura que no se explica: fría pero acogedora, como si hubiera estado esperando."],
  "event:4":["La Velorfesta. Las calles del Casco se llenan de luces, músicos en cada esquina, el olor a Velorcitos y Lumaven.\n\nHay un momento, justo cuando el sol toca el lago y todo se vuelve oro, en que Veloria es el lugar más hermoso del mundo."],
  "event:5":["Salís a la Plaza a medianoche. Te sentás en los escalones de la estatua y le hacés una promesa al cielo.\n\nNo la decís en voz alta. Las promesas de la Noche Larga se sellan solas."],
  "event:6":["Las Llanuras Doradas al atardecer. Comés tres veces más de lo que necesitabas. Eso también es parte de la tradición."],
  "event:7":["Los Twins traen flores al lago. No hay discursos: cada uno va a su ritmo, deja su ramo en el agua, se queda un momento.\n\nRecordás a alguien. El lago lo sabe ahora."],
  "event:8":["Veloria tiene más clubs de lo que pensabas: jardín, lectura, natación, fotografía, cocina. En el último te quedás más tiempo del planeado."],
  "event:9":["Los Nocturnos. Te quedás en casa con una Sopa Noctuvel y una vela encendida. Afuera nieva un poco. Veloria en invierno tiene una quietud diferente: más densa, más honesta."],
  "event:10":["El lago se congela y toda Veloria lo celebra como si fuera la primera vez. Caés dos veces sobre el hielo. La segunda te hace reír.\n\nSobre el hielo del Miren todo parece más liviano."],
  "event:11":["La Víspera: quemar algo pequeño que represente lo que ya no va con vos. Cuando el reloj da las doce, alguien grita *Velin* y toda la Plaza responde.\n\nEmpezás de vuelta."],
  "romance:ask_out":["Las palabras salen más directas de lo que planeabas. [NPC] te mira un momento — ese momento que parece más largo de lo que es — y después sonríe. '*Ora*', dice.\n\nEse *ora* reordena algo en vos."],
  "romance:propose":["No ensayaste el discurso. Las palabras no salieron perfectas pero salieron verdaderas. [NPC] respira. Después dice sí con la calma de quien ya lo sabía y solo estaba esperando que vos también lo supieras."],
  "romance:marry":["La ceremonia es simple como Veloria manda: pocas palabras, muchas presencias. Hay flores Velora, hay Lumaven, hay el lago como testigo.\n\nSalís casado/a. El cielo tiene exactamente el color del Veloer."],
  "romance:breakup":["No hay una sola causa y los dos lo saben. La conversación es larga y honesta de la manera que duele pero que es necesaria.\n\n[NPC] tiene esa expresión de quien acaba de perder algo que no va a recuperar. Vos también."],
  "romance:divorce":["Veloria tiene una palabra en Twinés para el amor que se termina: *sorvelin*. Lo que fue y ya no es, pero que igual fue.\n\nSalís a la Plaza y la ciudad sigue igual. Eso duele un poco. Y también ayuda."],
  birth:["El apartamento se llena de un silencio distinto. No el vacío sino el lleno — lleno de algo que respira.\n\n[CHILD] es pequeño/a y perfecto/a y les parece imposible haber sido capaces de hacer algo así. [PARTNER] te mira. Ninguno dice nada. No hace falta.\n\nVeloria afuera sigue siendo Veloria. Pero desde hoy es una ciudad diferente."],
  "travel:Tu apartamento":["Subís las escaleras con el peso del día encima. Tu apartamento es pequeño y tuyo. Eso es suficiente."],
  "travel:Café de Aria":["El Café de Aria está a dos cuadras del apartamento. En La Vega todo está cerca."],
  "travel:Plaza del Veloer":["El camino a El Casco atraviesa dos barrios y una diferencia de siglos. Los adoquines del Casco son más irregulares, más viejos."],
  "travel:Librería de Soren":["La librería queda en una callecita lateral. Si no supieras que está ahí, no la encontrarías. Eso es parte del punto."],
  "travel:Muelle":["Ribera huele a lago antes de que llegues. Bajás hacia el muelle por las escalinatas de piedra."],
  "travel:Restaurante de Nela":["El restaurante tiene terraza con vista directa al lago. El olor de las especias ya hizo el trabajo de convencerte."],
  "travel:Lago Miren":["La orilla sur del Miren está a diez minutos del muelle pero parece otro mundo. Más quieto, más verde."],
  "travel:Biblioteca":["La Biblioteca de Veleta. Empujás la puerta pesada y adentro hay ese silencio específico de los lugares que guardan cosas."],
  "travel:Teatro de Cael":["Hay siempre un cartel nuevo en la entrada con algo críptico que Cael escribe él mismo y que tarda días en entender."],
  "travel:Parque":["Los Prados es el barrio más tranquilo de Veloria. El parque central tiene árboles que deben tener cien años."],
  "travel:Consultorio de Bren":["Hay siempre uno o dos Twins esperando con esa paciencia de la gente sana que igual viene a ver a Bren."],
  default:["El tiempo avanza en Veloria."],
};

// ═══════════════════ DATA ═══════════════════
const TRAITS=[{id:"creativo",label:"Creativo",emoji:"🎨",desc:"Bonus en hobbies artísticos"},{id:"sociable",label:"Sociable",emoji:"💬",desc:"Relaciones crecen más rápido"},{id:"introvertido",label:"Introvertido",emoji:"📚",desc:"Se recarga solo, bonus en casa"},{id:"ambicioso",label:"Ambicioso",emoji:"⭐",desc:"Ascensos y carrera más rápidos"},{id:"empatico",label:"Empático",emoji:"💛",desc:"Relaciones más profundas"},{id:"hogareno",label:"Hogareño",emoji:"🏠",desc:"Bonus en cocina y decoración"},{id:"romantico",label:"Romántico",emoji:"🌸",desc:"El amor lo afecta profundamente"},{id:"aventurero",label:"Aventurero",emoji:"🌿",desc:"Bonus en exploración y naturaleza"}];
const ASPIRATIONS=[{id:"familia",label:"Fundador de familia",emoji:"👨‍👩‍👧",desc:"Crear un hogar y un legado en Veloria"},{id:"artista",label:"Artista",emoji:"🎭",desc:"Dejar tu huella creativa en la ciudad"},{id:"empresario",label:"Empresario",emoji:"💼",desc:"Construir riqueza y reputación"},{id:"alma",label:"Alma del pueblo",emoji:"🌟",desc:"Conocer a cada Twin de Veloria"}];
const NEIGHBORHOODS={"La Vega":{emoji:"🏙",color:"#7BB8B9",places:["Tu apartamento","Café de Aria"]},"El Casco":{emoji:"🏛",color:"#D4A853",places:["Plaza del Veloer","Librería de Soren"]},"Ribera":{emoji:"⛵",color:"#4A8B8C",places:["Muelle","Restaurante de Nela","Lago Miren"]},"Veleta":{emoji:"🎭",color:"#A08060",places:["Biblioteca","Teatro de Cael"]},"Los Prados":{emoji:"🌳",color:"#6B9E5E",places:["Parque","Consultorio de Bren"]}};
const PLACE_ACTIONS={"Tu apartamento":[{id:"sleep",label:"Dormir",emoji:"🌙",time:8},{id:"cook",label:"Cocinar",emoji:"🍳",time:1},{id:"shower",label:"Ducharse",emoji:"🚿",time:0.5},{id:"bathroom",label:"Baño",emoji:"🚽",time:0.1},{id:"hobby",label:"Practicar hobbie",emoji:"🎨",time:2},{id:"rest",label:"Descansar",emoji:"🛋",time:1}],"Café de Aria":[{id:"coffee",label:"Tomar café",emoji:"☕",time:1,cost:3},{id:"chat_npc",label:"Charlar con Aria",emoji:"💬",time:1,npc:"Aria Ven"},{id:"read_cafe",label:"Leer",emoji:"📖",time:2},{id:"observe",label:"Observar el barrio",emoji:"👁",time:1}],"Plaza del Veloer":[{id:"walk_plaza",label:"Pasear",emoji:"🚶",time:1},{id:"market",label:"Explorar el mercado",emoji:"🛒",time:1},{id:"chat_npc",label:"Hablar con Aldric",emoji:"💬",time:1,npc:"Aldric Veloer"}],"Librería de Soren":[{id:"browse_books",label:"Explorar libros",emoji:"📚",time:1},{id:"chat_npc",label:"Hablar con Soren",emoji:"💬",time:1,npc:"Soren Lume"},{id:"buy_book",label:"Comprar un libro",emoji:"📘",time:0.5,cost:15}],"Muelle":[{id:"fish",label:"Pescar",emoji:"🎣",time:3},{id:"chat_npc",label:"Hablar con Oren",emoji:"⛵",time:1,npc:"Oren Mirende"},{id:"sit_lake",label:"Contemplar el lago",emoji:"🌊",time:1}],"Restaurante de Nela":[{id:"eat_dish",label:"Mirenpez al Veloer",emoji:"🐟",time:1.5,cost:35},{id:"chat_npc",label:"Charlar con Nela",emoji:"💬",time:1,npc:"Nela Mirende"},{id:"cena",label:"Cena completa",emoji:"🍷",time:2,cost:55}],"Lago Miren":[{id:"swim",label:"Nadar",emoji:"🏊",time:2},{id:"secret_lake",label:"Contarle un secreto al lago",emoji:"🌊",time:0.5},{id:"walk_shore",label:"Caminar por la orilla",emoji:"🌅",time:1}],"Biblioteca":[{id:"research",label:"Investigar historia de Veloria",emoji:"📜",time:2},{id:"chat_npc",label:"Hablar con Ciro",emoji:"📖",time:1,npc:"Ciro Orlen"},{id:"read_lib",label:"Leer en silencio",emoji:"📚",time:2}],"Teatro de Cael":[{id:"watch_show",label:"Ver una obra",emoji:"🎭",time:2.5,cost:25},{id:"chat_npc",label:"Hablar con Cael",emoji:"🎬",time:1,npc:"Cael Sorvei"}],"Parque":[{id:"walk_park",label:"Caminar entre los árboles",emoji:"🌳",time:1},{id:"picnic",label:"Picnic al sol",emoji:"🧺",time:2}],"Consultorio de Bren":[{id:"checkup",label:"Consulta médica",emoji:"⚕️",time:1,cost:40},{id:"chat_npc",label:"Conversar con Bren",emoji:"💊",time:1,npc:"Bren Orlen"}]};
const BASE_EFFECTS={sleep:{sueno:70,hambre:-15,vejiga:-20},cook:{hambre:45,diversion:10},shower:{higiene:55},bathroom:{vejiga:90},rest:{sueno:15,diversion:8},hobby:{diversion:35},coffee:{hambre:8,diversion:12},read_cafe:{diversion:20},read_lib:{diversion:20},observe:{diversion:10,social:5},walk_plaza:{diversion:15,social:8},market:{diversion:10},browse_books:{diversion:15},buy_book:{diversion:10},fish:{diversion:25},sit_lake:{diversion:22},swim:{higiene:-10,diversion:35},secret_lake:{diversion:18,social:5},walk_shore:{diversion:18},eat_dish:{hambre:60,diversion:25,social:8},cena:{hambre:80,diversion:30,social:12},research:{diversion:15},watch_show:{diversion:40,social:15},walk_park:{diversion:15},picnic:{hambre:30,diversion:25},checkup:{},work_shift:{sueno:-20,social:-10,diversion:-15,higiene:-10},event_attend:{diversion:40,social:30,hambre:-10}};
const NEED_CFG={hambre:{label:"Hambre",emoji:"🍽",color:"#E8943A"},sueno:{label:"Sueño",emoji:"😴",color:"#7B8CDE"},higiene:{label:"Higiene",emoji:"🧼",color:"#4AB8C1"},social:{label:"Social",emoji:"💬",color:"#E87B9E"},diversion:{label:"Diversión",emoji:"🎮",color:"#A67BD6"},vejiga:{label:"Vejiga",emoji:"💧",color:"#6BC47E"}};
const MONTHS=["Nevelin","Mirenal","Nomeven","Mirenable","Velorfesta","Solein","Velcora","Memoveli","Clubven","Noctuvel","Mireneis","Nevelin II"];
const SEASONS=["🌸 Primavera","🌸 Primavera","🌸 Primavera","☀️ Verano","☀️ Verano","☀️ Verano","🍂 Otoño","🍂 Otoño","🍂 Otoño","❄️ Invierno","❄️ Invierno","❄️ Invierno"];
const CAREERS={arte:{label:"Arte",emoji:"🎨",places:["Teatro de Cael","Biblioteca"],levels:["Aspirante","Artista","Artista reconocido","Maestro del Veleta"],wages:[30,55,90,140],shiftH:6},cocina:{label:"Cocina",emoji:"🍳",places:["Restaurante de Nela"],levels:["Ayudante","Cocinero","Chef","Chef ejecutivo"],wages:[25,45,80,130],shiftH:8},comercio:{label:"Comercio",emoji:"💼",places:["Plaza del Veloer"],levels:["Vendedor","Gerente","Director","Empresario"],wages:[35,60,100,160],shiftH:8},medicina:{label:"Medicina",emoji:"⚕️",places:["Consultorio de Bren"],levels:["Practicante","Médico","Especialista","Jefe médico"],wages:[40,70,110,170],shiftH:8},educacion:{label:"Educación",emoji:"📚",places:["Biblioteca"],levels:["Auxiliar","Docente","Profesor titular","Director"],wages:[30,50,85,130],shiftH:6},pesca:{label:"Pesca",emoji:"🎣",places:["Muelle"],levels:["Aprendiz","Pescador","Pescador experto","Patrón del Lago"],wages:[20,40,70,110],shiftH:5}};
const ROMANCEABLE=new Set(["Aria Ven","Lior Veloer","Oren Mirende","Nela Mirende","Riven Lumaren","Vael Lumaren","Cael Sorvei","Niven Sorvei","Luma Sorvei","Soren Lume","Ciro Orlen","Elia Orlen","Iva Norven","Cela Miren","Tev Solan","Dael Miru","Mira Belven","Rael Nora","Leva Sorin"]);
const CALENDAR_EVENTS={0:{name:"Día del Primer Brote",emoji:"🌱",desc:"Plantar algo hoy. La tradición lo dice."},1:{name:"El Mercado Miren",emoji:"⛵",desc:"El mercado flotante abre sobre el lago."},2:{name:"La Noche de los Nombres",emoji:"💌",desc:"Se revelan apodos cariñosos a personas queridas."},3:{name:"Las Aguas Abiertas",emoji:"🏊",desc:"Gran celebración en Ribera. Primer día de natación."},4:{name:"Velorfesta",emoji:"✨",desc:"La celebración más importante. Tres días de música."},5:{name:"La Noche Larga",emoji:"⭐",desc:"Los Twins hacen promesas bajo las estrellas."},6:{name:"La Cosecha",emoji:"🌾",desc:"Festival en Las Llanuras Doradas."},7:{name:"El Día del Recuerdo",emoji:"🌊",desc:"Flores en el lago para los Twins que ya no están."},8:{name:"La Feria de los Clubs",emoji:"🎪",desc:"Todos los clubs de Veloria abren sus puertas."},9:{name:"Los Nocturnos",emoji:"🕯",desc:"Reuniones íntimas en casa. El frío une."},10:{name:"El Hielo del Miren",emoji:"⛸",desc:"El lago se congela. Los Twins patinen."},11:{name:"La Víspera del Brote",emoji:"🔥",desc:"Quemar lo viejo, guardar lo nuevo."}};
const NPC_TRAITS_MAP={"Aria Ven":["pragmática","acogedora","observadora"],"Lior Veloer":["rebelde","curioso","libre"],"Oren Mirende":["aventurero","romántico","libre"],"Nela Mirende":["cálido","fuerte","protector"],"Riven Lumaren":["encantador","generoso","soñador"],"Vael Lumaren":["creativo","impulsivo","apasionado"],"Cael Sorvei":["dramático","apasionado","perfeccionista"],"Niven Sorvei":["intenso","directo","artístico"],"Luma Sorvei":["libre","alegre","magnético"],"Soren Lume":["introvertido","brillante","leal"],"Ciro Orlen":["meticuloso","callado","curioso"],"Elia Orlen":["sociable","optimista","generosa"],"Iva Norven":["observadora","artístico","sensible"],"Cela Miren":["empático","trabajador","sensible"],"Tev Solan":["alegre","talentoso","impulsivo"],"Dael Miru":["perfeccionista","apasionado","orgulloso"],"Mira Belven":["energético","social","creativo"],"Rael Nora":["gentil","divertido","compasivo"],"Leva Sorin":["apasionado","exigente","curioso"]};
const NPC_HOOD_COLOR={"Aria Ven":"#7BB8B9","Lior Veloer":"#7BB8B9","Elia Orlen":"#7BB8B9","Tev Solan":"#7BB8B9","Oren Mirende":"#4A8B8C","Nela Mirende":"#4A8B8C","Tomas Mirende":"#4A8B8C","Riven Lumaren":"#4A8B8C","Iva Norven":"#4A8B8C","Ciro Orlen":"#A08060","Elowen Sorvei":"#A08060","Cael Sorvei":"#A08060","Niven Sorvei":"#A08060","Luma Sorvei":"#A08060","Vael Lumaren":"#A08060","Leva Sorin":"#A08060","Aldric Veloer":"#D4A853","Soren Lume":"#D4A853","Dora Velin":"#D4A853","Dael Miru":"#D4A853","Mira Belven":"#D4A853","Bren Orlen":"#6B9E5E","Cela Miren":"#6B9E5E","Rael Nora":"#6B9E5E"};
const NPC_DESC={"Aria Ven":"Dueña del café · La Vega","Lior Veloer":"Estudiante rebelde · La Vega","Oren Mirende":"Pescador y guía del lago · Ribera","Nela Mirende":"Restaurante del muelle · Ribera","Tomas Mirende":"Pescador mayor · Ribera","Riven Lumaren":"Gerente del banco · Ribera","Ciro Orlen":"Archivista · Veleta","Elowen Sorvei":"Escritora anciana · Veleta","Cael Sorvei":"Director del teatro · Veleta","Niven Sorvei":"Pintora y tatuadora · Veleta","Luma Sorvei":"Músico callejero · Veleta","Vael Lumaren":"Diseñadora · Veleta","Leva Sorin":"Profesora de historia · Veleta","Aldric Veloer":"Figura moral de Veloria · El Casco","Soren Lume":"Librero · El Casco","Dora Velin":"La Twin más anciana · El Casco","Dael Miru":"Chef · El Casco","Mira Belven":"Organizadora de eventos · El Casco","Bren Orlen":"Médico · Los Prados","Cela Miren":"Enfermera · Los Prados","Rael Nora":"Veterinario · Los Prados"};
const NPC_AT_PLACE={"Café de Aria":["Aria Ven"],"Plaza del Veloer":["Aldric Veloer","Dora Velin"],"Librería de Soren":["Soren Lume"],"Muelle":["Oren Mirende","Tomas Mirende"],"Restaurante de Nela":["Nela Mirende"],"Lago Miren":["Oren Mirende"],"Biblioteca":["Ciro Orlen","Elowen Sorvei","Leva Sorin"],"Teatro de Cael":["Cael Sorvei","Niven Sorvei"],"Parque":[],"Consultorio de Bren":["Bren Orlen"],"Tu apartamento":[]};
const PROMO_SHIFTS=[5,10,15,20];
const INV_CATS=[{id:"all",label:"Todos",emoji:"📦"},{id:"food",label:"Comida",emoji:"🍽"},{id:"book",label:"Libros",emoji:"📚"},{id:"fish",label:"Pesca",emoji:"🐟"},{id:"gift",label:"Regalos",emoji:"🎁"},{id:"plant",label:"Plantas",emoji:"🌿"},{id:"other",label:"Otros",emoji:"✨"}];

// ═══════════════════ HELPERS ═══════════════════
const pick=arr=>arr[Math.floor(Math.random()*arr.length)];
function getNarrative(key,repl={}){const opts=N[key]||N["default"];let t=pick(opts);for(const[k,v]of Object.entries(repl))t=t.replace(new RegExp(`\\[${k}\\]`,"g"),v);return t;}
function toTimeStr(h){const hour=((h%24)+24)%24,hh=Math.floor(hour),mm=Math.round((hour-hh)*60);return`${hh.toString().padStart(2,"0")}:${(mm>=60?0:mm).toString().padStart(2,"0")}`;}
function relStatus(lv){if(lv<10)return"Extraño";if(lv<25)return"Conocido";if(lv<50)return"Amigo";if(lv<75)return"Amigo cercano";return"Mejor amigo";}
function clamp(v,mn=0,mx=100){return Math.max(mn,Math.min(mx,v));}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
function getMood(needs){
  if(needs.sueno<20)return["Agotado/a","#7B8CDE"];
  if(needs.hambre<20)return["Con hambre","#E8943A"];
  if(needs.vejiga<10)return["Urgente...","#6BC47E"];
  if(needs.social<25)return["Solitario/a","#E87B9E"];
  if(needs.diversion<25)return["Aburrido/a","#A67BD6"];
  if(needs.higiene<25)return["Sucio/a","#4AB8C1"];
  if(needs.sueno>75&&needs.diversion>65)return["Descansado/a","#D4A853"];
  if(needs.social>75)return["Sociable","#E87B9E"];
  if(needs.diversion>75)return["Inspirado/a","#A67BD6"];
  return["Bien","#6B9E5E"];
}

// ═══════════════════ ATOM COMPONENTS ═══════════════════
function NeedDots({needKey,value}){
  const cfg=NEED_CFG[needKey],filled=Math.round(value/20);
  const barColor=value<25?"#E05555":value<50?"#E8943A":cfg.color;
  return(
    <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"6px"}}>
      <span style={{fontSize:"11px",width:"14px",opacity:0.8}}>{cfg.emoji}</span>
      <div style={{display:"flex",gap:"3px"}}>
        {[0,1,2,3,4].map(i=>(
          <div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:i<filled?barColor:"transparent",border:`1.5px solid ${i<filled?barColor:"#3D2B1F"}`,transition:"all 0.4s ease"}}/>
        ))}
      </div>
      <span style={{fontSize:"9px",color:"#5C4030",width:"18px"}}>{Math.round(value)}</span>
    </div>
  );
}
function NPCAvatar({name,size=28}){
  const color=NPC_HOOD_COLOR[name]||"#8B7355";
  return(
    <div style={{width:size,height:size,borderRadius:"50%",background:`${color}22`,border:`1.5px solid ${color}66`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:size*0.38,color,fontWeight:700,flexShrink:0,letterSpacing:0}}>
      {name.charAt(0)}
    </div>
  );
}
function ActionBtn({action,onClick,disabled,accentColor}){
  const [hov,setHov]=useState(false);
  return(
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 12px",borderRadius:"20px",fontSize:"12px",border:`1px solid ${hov?accentColor:"#3D2B1F"}`,background:hov?`${accentColor}18`:"transparent",color:hov?accentColor:"#8B7355",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,transition:"all 0.15s",whiteSpace:"nowrap"}}>
      <span>{action.emoji}</span>{action.label}{action.cost&&<span style={{fontSize:"9px",color:"#5C4030"}}>L{action.cost}</span>}
    </button>
  );
}

// ═══════════════════ TAB COMPONENTS ═══════════════════
function AccionesTab({loc,career,NEIGHBORHOODS,PLACE_ACTIONS,loading,dark,onGoTo,onAction,onWork}){
  const hoodColor=(NEIGHBORHOODS[loc.hood]||{}).color||"#D4A853";
  const isAtWorkplace=career&&CAREERS[career.track]?.places.includes(loc.place);
  const actions=PLACE_ACTIONS[loc.place]||[];
  return(
    <div style={{display:"flex",flexDirection:"column",gap:"10px",padding:"10px 14px",overflowY:"auto",height:"100%"}}>
      <div style={{overflowX:"auto",display:"flex",gap:"8px",paddingBottom:"4px",flexShrink:0}}>
        {Object.entries(NEIGHBORHOODS).map(([hood,d])=>(
          <div key={hood} style={{flexShrink:0}}>
            <div style={{fontSize:"9px",color:loc.hood===hood?d.color:"#5C4030",textAlign:"center",marginBottom:"3px",letterSpacing:"0.05em"}}>{d.emoji} {hood}</div>
            <div style={{display:"flex",gap:"3px"}}>
              {d.places.map(p=>(
                <button key={p} onClick={()=>onGoTo(hood,p)} disabled={loading}
                  style={{padding:"3px 8px",fontSize:"9px",borderRadius:"12px",border:`1px solid ${loc.place===p?d.color:"#3D2B1F"}`,background:loc.place===p?`${d.color}22`:"transparent",color:loc.place===p?d.color:"#8B7355",cursor:loading?"not-allowed":"pointer",whiteSpace:"nowrap",transition:"all 0.12s"}}>
                  {p.length>12?p.slice(0,11)+"…":p}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:"6px",flexShrink:0}}>
        {isAtWorkplace&&(
          <button onClick={onWork} disabled={loading}
            style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 14px",borderRadius:"20px",fontSize:"12px",border:"1px solid #6B9E5E",background:"rgba(107,158,94,0.12)",color:"#6B9E5E",cursor:loading?"not-allowed":"pointer",fontWeight:600}}>
            💼 Trabajar ({CAREERS[career.track].shiftH}h) → +L{CAREERS[career.track].wages[career.level]}
          </button>
        )}
        {actions.map(a=>(
          <ActionBtn key={a.id} action={a} onClick={()=>onAction(a)} disabled={loading} accentColor={hoodColor}/>
        ))}
      </div>
    </div>
  );
}

function SocialTab({rels,family,currentDay,dark,loading,onRomanceAction}){
  const [sel,setSel]=useState(null);
  const sorted=Object.entries(rels).sort(([,a],[,b])=>(b.friendship||0)-(a.friendship||0));
  function getRomActs(npcName){
    const fr=rels[npcName]?.friendship||0,isP=family.partner===npcName,acts=[];
    if(!isP&&!family.partner&&ROMANCEABLE.has(npcName)&&fr>40)acts.push({id:"ask_out",label:"Invitar a salir",color:"#E87B9E"});
    if(isP&&family.romanticStatus==="dating"&&fr>65)acts.push({id:"propose",label:"Proponer matrimonio",color:"#D4A853"});
    if(isP&&family.romanticStatus==="engaged")acts.push({id:"marry",label:"Casarse",color:"#D4A853"});
    if(isP&&family.romanticStatus==="married")acts.push({id:"have_child",label:"Tener un hijo",color:"#7BB8B9"});
    if(isP&&(family.romanticStatus==="dating"||family.romanticStatus==="engaged"))acts.push({id:"breakup",label:"Terminar",color:"#E05555"});
    if(isP&&family.romanticStatus==="married")acts.push({id:"divorce",label:"Separarse",color:"#E05555"});
    return acts;
  }
  const sLabel={dating:"💕 En pareja",engaged:"💍 Comprometido/a",married:"💒 Casado/a"};
  const selRel=sel?rels[sel]:null;
  return(
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      {/* NPC List */}
      <div style={{width:"160px",borderRight:"1px solid #2C1F14",overflowY:"auto",padding:"8px"}}>
        {family.partner&&(
          <div style={{fontSize:"9px",color:"#E87B9E",textTransform:"uppercase",letterSpacing:"0.08em",padding:"4px 6px",marginBottom:"4px"}}>{sLabel[family.romanticStatus]||"💕"}</div>
        )}
        {family.children.length>0&&(
          <div style={{marginBottom:"8px",padding:"4px 6px",background:"rgba(212,168,83,0.05)",borderRadius:"6px"}}>
            {family.children.map((c,i)=>(
              <div key={i} style={{fontSize:"10px",color:"#8B7355",marginBottom:"2px"}}>👶 {c.name} · {Math.floor((currentDay-c.birthDay)/30)}a</div>
            ))}
          </div>
        )}
        {sorted.length===0&&<div style={{fontSize:"10px",color:"#5C4030",fontStyle:"italic",padding:"6px",lineHeight:"1.4"}}>Todavía no conocés a nadie. Salí y hablá con los Twins.</div>}
        {sorted.map(([name,rel])=>(
          <button key={name} onClick={()=>setSel(sel===name?null:name)}
            style={{width:"100%",display:"flex",alignItems:"center",gap:"7px",padding:"6px",borderRadius:"8px",border:sel===name?"1px solid #3D2B1F":"1px solid transparent",background:sel===name?"#1F1308":"transparent",cursor:"pointer",marginBottom:"3px",textAlign:"left"}}>
            <NPCAvatar name={name} size={24}/>
            <div style={{flex:1,overflow:"hidden"}}>
              <div style={{fontSize:"10px",color:sel===name?"#D4A853":"#A08060",fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{family.partner===name?"💕 ":""}{name.split(" ")[0]}</div>
              <div style={{fontSize:"9px",color:"#5C4030"}}>{relStatus(rel.friendship||0)}</div>
            </div>
          </button>
        ))}
      </div>
      {/* NPC Detail */}
      <div style={{flex:1,overflowY:"auto",padding:"12px"}}>
        {!sel&&<div style={{color:"#5C4030",fontSize:"11px",fontStyle:"italic",marginTop:"16px",textAlign:"center"}}>Seleccioná un Twin para ver su perfil</div>}
        {sel&&selRel&&(
          <div>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"}}>
              <NPCAvatar name={sel} size={40}/>
              <div>
                <div style={{fontSize:"13px",color:"#EDE0CC",fontWeight:600}}>{sel}</div>
                <div style={{fontSize:"10px",color:"#8B7355"}}>{NPC_DESC[sel]||""}</div>
              </div>
            </div>
            <div style={{marginBottom:"10px"}}>
              <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"4px"}}>Relación</div>
              <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                <div style={{flex:1,height:"4px",background:"#2C1F14",borderRadius:"2px",overflow:"hidden"}}>
                  <div style={{height:"100%",width:`${selRel.friendship||0}%`,background:NPC_HOOD_COLOR[sel]||"#7BB8B9",transition:"width 0.5s"}}/>
                </div>
                <span style={{fontSize:"10px",color:"#8B7355",flexShrink:0}}>{relStatus(selRel.friendship||0)}</span>
              </div>
            </div>
            {selRel.history?.length>0&&(
              <div style={{marginBottom:"10px"}}>
                <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Recuerda</div>
                {selRel.history.slice(-3).map((h,i)=>(
                  <div key={i} style={{display:"flex",alignItems:"flex-start",gap:"6px",marginBottom:"4px"}}>
                    <span style={{color:"#4A3525",fontSize:"10px",flexShrink:0}}>✦</span>
                    <span style={{fontSize:"10px",color:"#8B7355",lineHeight:"1.4"}}>{h}</span>
                  </div>
                ))}
              </div>
            )}
            {getRomActs(sel).length>0&&(
              <div style={{borderTop:"1px solid #2C1F14",paddingTop:"10px",display:"flex",flexWrap:"wrap",gap:"5px"}}>
                {getRomActs(sel).map(ra=>(
                  <button key={ra.id} disabled={loading} onClick={()=>{setSel(null);onRomanceAction(ra.id,sel);}}
                    style={{padding:"5px 10px",fontSize:"10px",borderRadius:"14px",border:`1px solid ${ra.color}`,background:"transparent",color:ra.color,cursor:loading?"not-allowed":"pointer"}}>
                    {ra.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TrabajoTabContent({career,loc,dark,loading,onApply,onWork}){
  if(!career){
    return(
      <div style={{padding:"10px 14px",overflowY:"auto",height:"100%"}}>
        <div style={{fontSize:"10px",color:"#5C4030",marginBottom:"10px"}}>Elegí una carrera para empezar en Veloria.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
          {Object.entries(CAREERS).map(([id,c])=>(
            <button key={id} onClick={()=>onApply(id)} disabled={loading}
              style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",borderRadius:"10px",border:"1px solid #3D2B1F",background:"transparent",color:"#8B7355",cursor:loading?"not-allowed":"pointer",opacity:loading?0.4:1,transition:"all 0.12s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#6B9E5E";e.currentTarget.style.color="#6B9E5E";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#3D2B1F";e.currentTarget.style.color="#8B7355";}}>
              <span style={{fontSize:"18px"}}>{c.emoji}</span>
              <div>
                <div style={{fontSize:"11px",fontWeight:500}}>{c.label}</div>
                <div style={{fontSize:"9px",color:"#5C4030"}}>L{c.wages[0]}/turno</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }
  const c=CAREERS[career.track],isAt=c.places.includes(loc.place);
  const prog=career.level>=3?100:Math.min(100,(career.shiftsWorked%PROMO_SHIFTS[career.level])/PROMO_SHIFTS[career.level]*100);
  return(
    <div style={{padding:"10px 14px",display:"flex",gap:"12px",alignItems:"flex-start",height:"100%",overflowY:"auto"}}>
      <div style={{background:"#1A1208",border:"1px solid #3D2B1F",borderRadius:"10px",padding:"10px",minWidth:"160px"}}>
        <div style={{fontSize:"20px",marginBottom:"4px"}}>{c.emoji}</div>
        <div style={{fontSize:"12px",fontWeight:600,color:"#6B9E5E",marginBottom:"2px"}}>{c.levels[career.level]}</div>
        <div style={{fontSize:"10px",color:"#5C4030"}}>{c.label} · L{c.wages[career.level]}/turno</div>
        <div style={{fontSize:"9px",color:"#5C4030",marginTop:"2px"}}>{career.shiftsWorked} turnos trabajados</div>
        {career.level<3&&<div style={{marginTop:"8px"}}>
          <div style={{height:"3px",background:"#2C1F14",borderRadius:"2px",overflow:"hidden",marginBottom:"3px"}}>
            <div style={{height:"100%",width:`${prog}%`,background:"#6B9E5E",transition:"width 0.5s"}}/>
          </div>
          <div style={{fontSize:"9px",color:"#5C4030"}}>{Math.round(prog)}% hacia {c.levels[career.level+1]}</div>
        </div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
        {isAt?(
          <button onClick={onWork} disabled={loading} style={{padding:"8px 14px",borderRadius:"10px",border:"1px solid #6B9E5E",background:"rgba(107,158,94,0.1)",color:"#6B9E5E",fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:600}}>
            💼 Trabajar turno ({c.shiftH}h) → +L{c.wages[career.level]}
          </button>
        ):(
          <div style={{fontSize:"10px",color:"#5C4030",fontStyle:"italic",maxWidth:"200px",lineHeight:"1.5"}}>Tu lugar de trabajo es {c.places.join(" o ")}. Andá para trabajar.</div>
        )}
      </div>
    </div>
  );
}

function InventarioTab({inventory,onUseItem}){
  const [cat,setCat]=useState("all");
  const filtered=cat==="all"?inventory:inventory.filter(i=>i.type===cat);
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",gap:"4px",padding:"8px 14px",borderBottom:"1px solid #2C1F14",overflowX:"auto",flexShrink:0}}>
        {INV_CATS.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)}
            style={{padding:"3px 9px",borderRadius:"12px",fontSize:"9px",border:`1px solid ${cat===c.id?"#D4A853":"#2C1F14"}`,background:cat===c.id?"rgba(212,168,83,0.12)":"transparent",color:cat===c.id?"#D4A853":"#5C4030",cursor:"pointer",whiteSpace:"nowrap"}}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {filtered.length===0&&<div style={{fontSize:"11px",color:"#5C4030",fontStyle:"italic",textAlign:"center",marginTop:"16px"}}>Nada en esta categoría todavía.</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
          {filtered.map(item=>(
            <div key={item.id} style={{background:"#1A1208",border:"1px solid #2C1F14",borderRadius:"8px",padding:"8px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>{item.emoji}</span>
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:"10px",color:"#A08060",fontWeight:600,marginBottom:"1px"}}>{item.name}</div>
                <div style={{fontSize:"9px",color:"#5C4030",lineHeight:"1.3",marginBottom:"4px"}}>{item.desc}</div>
                {item.qty>1&&<div style={{fontSize:"9px",color:"#3D2B1F"}}>x{item.qty}</div>}
                {item.useable&&<button onClick={()=>onUseItem(item)} style={{fontSize:"9px",padding:"2px 7px",borderRadius:"8px",border:"1px solid #D4A853",background:"transparent",color:"#D4A853",cursor:"pointer",marginTop:"3px"}}>Usar</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"6px 14px",borderTop:"1px solid #2C1F14",fontSize:"9px",color:"#5C4030",flexShrink:0}}>
        {inventory.length} / 30 objetos
      </div>
    </div>
  );
}

function CalendarioTab({gt}){
  const [viewMonth,setViewMonth]=useState(gt.monthIdx);
  const event=CALENDAR_EVENTS[viewMonth];
  const daysInMonth=30,currentInView=viewMonth===gt.monthIdx;
  const days=Array.from({length:daysInMonth},(_,i)=>i+1);
  const eventDay=currentInView?((gt.day-1)%30)+1:null;
  return(
    <div style={{display:"flex",height:"100%",overflow:"hidden",gap:"0"}}>
      <div style={{flex:1,padding:"10px 14px",overflowY:"auto"}}>
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"10px"}}>
          <button onClick={()=>setViewMonth(m=>Math.max(0,m-1))} style={{background:"transparent",border:"1px solid #2C1F14",color:"#5C4030",borderRadius:"6px",width:"22px",height:"22px",cursor:"pointer",fontSize:"12px"}}>‹</button>
          <div style={{flex:1,textAlign:"center",fontSize:"11px",color:"#A08060",fontWeight:600}}>{MONTHS[viewMonth]} · {SEASONS[viewMonth]}</div>
          <button onClick={()=>setViewMonth(m=>Math.min(11,m+1))} style={{background:"transparent",border:"1px solid #2C1F14",color:"#5C4030",borderRadius:"6px",width:"22px",height:"22px",cursor:"pointer",fontSize:"12px"}}>›</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"3px"}}>
          {days.map(d=>{
            const isToday=currentInView&&d===eventDay;
            const hasEvent=CALENDAR_EVENTS[viewMonth]&&d===1;
            return(
              <div key={d} style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:"6px",fontSize:"10px",background:isToday?"rgba(212,168,83,0.15)":"transparent",border:isToday?"1px solid #D4A853":"1px solid transparent",color:isToday?"#D4A853":"#5C4030",position:"relative"}}>
                {d}
                {hasEvent&&<span style={{position:"absolute",bottom:"1px",fontSize:"6px"}}>{CALENDAR_EVENTS[viewMonth].emoji}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{width:"150px",borderLeft:"1px solid #2C1F14",padding:"10px",overflowY:"auto"}}>
        <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"8px"}}>Evento del mes</div>
        {event?(
          <div style={{background:"rgba(212,168,83,0.06)",border:"1px solid #3D2B1F",borderRadius:"8px",padding:"8px"}}>
            <div style={{fontSize:"18px",marginBottom:"3px"}}>{event.emoji}</div>
            <div style={{fontSize:"10px",color:"#D4A853",fontWeight:600,marginBottom:"3px"}}>{event.name}</div>
            <div style={{fontSize:"9px",color:"#5C4030",lineHeight:"1.4"}}>{event.desc}</div>
          </div>
        ):<div style={{fontSize:"10px",color:"#5C4030",fontStyle:"italic"}}>Mes tranquilo.</div>}
        <div style={{marginTop:"10px",fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Próximos</div>
        {Array.from({length:3},(_,i)=>{const mi=(viewMonth+i+1)%12;const ev=CALENDAR_EVENTS[mi];if(!ev)return null;return(
          <div key={mi} style={{marginBottom:"6px",display:"flex",gap:"5px",alignItems:"flex-start"}}>
            <span style={{fontSize:"12px"}}>{ev.emoji}</span>
            <div><div style={{fontSize:"9px",color:"#8B7355"}}>{ev.name}</div><div style={{fontSize:"8px",color:"#5C4030"}}>{MONTHS[mi]}</div></div>
          </div>
        );})}
      </div>
    </div>
  );
}

function DiarioTab({log,gt}){
  const byDay={};
  [...log].reverse().forEach(e=>{
    const d=e.day||1;
    if(!byDay[d])byDay[d]=[];
    byDay[d].push(e);
  });
  const days=Object.keys(byDay).map(Number).sort((a,b)=>b-a);
  const typeLabel={intro:"Llegada",story:"Acción",travel:"Viaje",romance:"Romance",work:"Trabajo",event:"Evento",system:"Nota"};
  return(
    <div style={{height:"100%",overflowY:"auto",padding:"10px 14px"}}>
      {days.length===0&&<div style={{color:"#5C4030",fontSize:"11px",fontStyle:"italic",textAlign:"center",marginTop:"16px"}}>El diario empieza a escribirse cuando jugás.</div>}
      {days.map(d=>(
        <div key={d} style={{marginBottom:"14px"}}>
          <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px",borderBottom:"1px solid #2C1F14",paddingBottom:"4px"}}>
            Día {d} · {MONTHS[Math.min(Math.floor((d-1)/30),11)]}
          </div>
          {byDay[d].map(e=>(
            <div key={e.id} style={{marginBottom:"6px",paddingLeft:"10px",borderLeft:"1px solid #2C1F14"}}>
              <div style={{fontSize:"9px",color:"#5C4030",marginBottom:"2px"}}>{typeLabel[e.type]||"·"}{e.place?` · ${e.place}`:""}{e.time?` · ${e.time}`:""}</div>
              <div style={{fontSize:"11px",color:"#8B7355",fontStyle:"italic",lineHeight:"1.4",fontFamily:"'Lora',serif"}}>{(e.text||"").slice(0,120)}{(e.text||"").length>120?"…":""}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════ CHARACTER CARD ═══════════════════
function CharacterCard({twin,needs,money,gt,rels,family}){
  const [moodLabel,moodColor]=getMood(needs);
  const topRels=Object.entries(rels).sort(([,a],[,b])=>(b.friendship||0)-(a.friendship||0)).slice(0,2);
  return(
    <div style={{width:"176px",borderRight:"1px solid #2C1F14",display:"flex",flexDirection:"column",padding:"12px",gap:"0",overflowY:"auto",flexShrink:0}}>
      {/* Avatar */}
      <div style={{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"12px"}}>
        <div style={{width:"52px",height:"52px",borderRadius:"50%",background:"rgba(212,168,83,0.1)",border:"2px solid rgba(212,168,83,0.4)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",color:"#D4A853",fontFamily:"'Lora',serif",fontWeight:700,marginBottom:"6px"}}>
          {twin?.name?.charAt(0)||"?"}
        </div>
        <div style={{fontSize:"12px",color:"#EDE0CC",fontWeight:600,marginBottom:"2px"}}>{twin?.name}</div>
        <div style={{fontSize:"9px",color:moodColor,background:`${moodColor}18`,padding:"2px 8px",borderRadius:"10px",border:`1px solid ${moodColor}44`}}>{moodLabel}</div>
      </div>
      {/* Needs */}
      <div style={{marginBottom:"10px"}}>
        {Object.keys(needs).map(k=><NeedDots key={k} needKey={k} value={needs[k]}/>)}
      </div>
      {/* Mini stats */}
      <div style={{borderTop:"1px solid #2C1F14",paddingTop:"8px",marginBottom:"8px"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
          <span style={{fontSize:"9px",color:"#5C4030"}}>Luces</span>
          <span style={{fontSize:"10px",color:"#D4A853",fontWeight:600}}>L {money}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:"4px"}}>
          <span style={{fontSize:"9px",color:"#5C4030"}}>Día</span>
          <span style={{fontSize:"10px",color:"#8B7355"}}>{gt.day}</span>
        </div>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:"9px",color:"#5C4030"}}>Mes</span>
          <span style={{fontSize:"10px",color:"#8B7355"}}>{MONTHS[gt.monthIdx]}</span>
        </div>
      </div>
      {/* Mini relations */}
      {topRels.length>0&&(
        <div style={{borderTop:"1px solid #2C1F14",paddingTop:"8px"}}>
          <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Relaciones</div>
          {topRels.map(([name,rel])=>(
            <div key={name} style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"5px"}}>
              <NPCAvatar name={name} size={20}/>
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:"9px",color:"#8B7355",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{family.partner===name?"💕 ":""}{name.split(" ")[0]}</div>
                <div style={{height:"2px",background:"#2C1F14",borderRadius:"1px",overflow:"hidden",marginTop:"2px"}}>
                  <div style={{height:"100%",width:`${rel.friendship||0}%`,background:NPC_HOOD_COLOR[name]||"#7BB8B9"}}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════ PAUSA MODAL ═══════════════════
function PausaModal({onClose,log,gt,twin}){
  const lastEntries=[...log].reverse().slice(0,3);
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}}>
      <div style={{background:"#120D07",border:"1px solid #3D2B1F",borderRadius:"16px",width:"560px",maxWidth:"95vw",overflow:"hidden",display:"flex"}}>
        <div style={{width:"200px",background:"#0F0A06",borderRight:"1px solid #2C1F14",padding:"28px 20px",display:"flex",flexDirection:"column"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"22px",color:"#D4A853",letterSpacing:"0.15em",marginBottom:"4px"}}>inbetweens</div>
          <div style={{fontSize:"9px",color:"#5C4030",letterSpacing:"0.2em",marginBottom:"24px"}}>VELORIA · OTHERWHEN</div>
          {["Continuar","Guardar","Nueva partida","Salir"].map((label,i)=>(
            <button key={i} onClick={label==="Continuar"?onClose:undefined}
              style={{padding:"9px 12px",marginBottom:"5px",borderRadius:"8px",border:"1px solid #2C1F14",background:"transparent",color:label==="Continuar"?"#D4A853":"#5C4030",cursor:"pointer",textAlign:"left",fontSize:"12px",transition:"all 0.12s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#3D2B1F";e.currentTarget.style.color="#A08060";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#2C1F14";e.currentTarget.style.color=label==="Continuar"?"#D4A853":"#5C4030";}}>
              {label}
            </button>
          ))}
          <div style={{flex:1}}/>
          <div style={{fontSize:"9px",color:"#3D2B1F"}}>Día {gt.day} · {twin?.name}</div>
        </div>
        <div style={{flex:1,padding:"24px",overflowY:"auto"}}>
          <div style={{fontSize:"9px",color:"#5C4030",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:"12px"}}>Memoria del día</div>
          {lastEntries.length===0&&<div style={{color:"#3D2B1F",fontSize:"11px",fontStyle:"italic"}}>El diario empieza a llenarse mientras jugás.</div>}
          {lastEntries.map(e=>(
            <div key={e.id} style={{marginBottom:"14px",paddingLeft:"10px",borderLeft:"2px solid #2C1F14"}}>
              {e.place&&<div style={{fontSize:"9px",color:"#5C4030",marginBottom:"4px"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
              <div style={{fontSize:"12px",color:"#8B7355",fontStyle:"italic",fontFamily:"'Lora',serif",lineHeight:"1.6"}}>{(e.text||"").slice(0,200)}{(e.text||"").length>200?"…":""}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════ CREATION SCREEN ═══════════════════
function CreationScreen({onStart}){
  const [step,setStep]=useState(0),[name,setName]=useState(""),[traits,setTraits]=useState([]),[aspiration,setAspiration]=useState("");
  const toggle=id=>{if(traits.includes(id))setTraits(traits.filter(t=>t!==id));else if(traits.length<3)setTraits([...traits,id]);};
  const canNext=[name.trim().length>1,traits.length===3,aspiration!==""][step];
  const next=()=>{if(!canNext)return;if(step<2)setStep(step+1);else onStart({name:name.trim(),traits,aspiration});};
  return(
    <div style={{minHeight:"100vh",background:"linear-gradient(155deg,#080503 0%,#1A1008 50%,#0F0A06 100%)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"32px 16px",fontFamily:"'DM Sans',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*{box-sizing:border-box}`}</style>
      <div style={{textAlign:"center",marginBottom:"36px"}}>
        <div style={{fontSize:"48px",color:"#D4A853",fontFamily:"'Lora',serif",letterSpacing:"0.2em",marginBottom:"4px"}}>inbetweens</div>
        <div style={{fontSize:"10px",color:"#3D2B1F",letterSpacing:"0.4em",textTransform:"uppercase"}}>Veloria · Otherwhen</div>
      </div>
      <div style={{display:"flex",gap:"5px",marginBottom:"28px"}}>
        {["Nombre","Rasgos","Aspiración"].map((s,i)=>(
          <div key={i} style={{padding:"3px 12px",borderRadius:"20px",fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",background:i===step?"#D4A853":i<step?"rgba(212,168,83,0.15)":"transparent",color:i===step?"#0F0A06":i<step?"#D4A853":"#3D2B1F",border:i>=step?"1px solid #2C1F14":"none"}}>{s}</div>
        ))}
      </div>
      <div style={{background:"rgba(212,168,83,0.03)",border:"1px solid #2C1F14",borderRadius:"16px",padding:"28px",width:"100%",maxWidth:"440px"}}>
        {step===0&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>¿Cuál es tu nombre, Twin?</div>
          <div style={{color:"#3D2B1F",fontSize:"11px",marginBottom:"22px"}}>Este nombre te seguirá por toda Veloria.</div>
          <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&next()} placeholder="Tu nombre..." style={{width:"100%",padding:"12px 16px",background:"rgba(255,255,255,0.03)",border:"1px solid #2C1F14",borderRadius:"8px",color:"#EDE0CC",fontSize:"20px",fontFamily:"'Lora',serif",outline:"none"}}/>
        </div>)}
        {step===1&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>Elegí 3 rasgos</div>
          <div style={{color:"#3D2B1F",fontSize:"11px",marginBottom:"16px"}}>{traits.length}/3 seleccionados</div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"7px"}}>
            {TRAITS.map(t=>{const sel=traits.includes(t.id),dis=!sel&&traits.length===3;return(
              <button key={t.id} onClick={()=>!dis&&toggle(t.id)} style={{padding:"10px",borderRadius:"8px",textAlign:"left",cursor:dis?"not-allowed":"pointer",border:sel?"1px solid #D4A853":"1px solid #2C1F14",background:sel?"rgba(212,168,83,0.1)":"transparent",color:dis&&!sel?"#2C1F14":"#EDE0CC",opacity:dis&&!sel?0.3:1,transition:"all 0.12s"}}>
                <div style={{fontSize:"18px",marginBottom:"2px"}}>{t.emoji}</div>
                <div style={{fontSize:"11px",fontWeight:500}}>{t.label}</div>
                <div style={{fontSize:"9px",color:"#5C4030"}}>{t.desc}</div>
              </button>
            );})}
          </div>
        </div>)}
        {step===2&&(<div>
          <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>¿Qué buscás en Veloria?</div>
          <div style={{color:"#3D2B1F",fontSize:"11px",marginBottom:"16px"}}>Tu aspiración de vida.</div>
          <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
            {ASPIRATIONS.map(a=>(
              <button key={a.id} onClick={()=>setAspiration(a.id)} style={{padding:"12px 14px",borderRadius:"8px",textAlign:"left",cursor:"pointer",border:aspiration===a.id?"1px solid #D4A853":"1px solid #2C1F14",background:aspiration===a.id?"rgba(212,168,83,0.1)":"transparent",color:"#EDE0CC",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.12s"}}>
                <span style={{fontSize:"22px"}}>{a.emoji}</span>
                <div><div style={{fontSize:"12px",fontWeight:500}}>{a.label}</div><div style={{fontSize:"10px",color:"#5C4030"}}>{a.desc}</div></div>
              </button>
            ))}
          </div>
        </div>)}
      </div>
      <button onClick={next} disabled={!canNext} style={{marginTop:"20px",padding:"10px 36px",borderRadius:"24px",border:"none",background:canNext?"#D4A853":"#1A1008",color:canNext?"#0F0A06":"#3D2B1F",fontSize:"11px",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",cursor:canNext?"pointer":"not-allowed",transition:"all 0.2s"}}>
        {step===2?"✨ Llegar a Veloria":"Continuar →"}
      </button>
    </div>
  );
}

// ═══════════════════ MAIN GAME ═══════════════════
export default function InbetweensGame(){
  const [phase,setPhase]=useState("creation"),[twin,setTwin]=useState(null);
  const [needs,setNeeds]=useState({hambre:75,sueno:80,higiene:80,social:50,diversion:55,vejiga:70});
  const [money,setMoney]=useState(250),[gt,setGt]=useState({hour:8,day:1,monthIdx:0});
  const [loc,setLoc]=useState({hood:"La Vega",place:"Tu apartamento"});
  const [rels,setRels]=useState({}),[career,setCareer]=useState(null);
  const [family,setFamily]=useState({partner:null,romanticStatus:null,children:[]});
  const [inventory,setInventory]=useState([
    {id:1,name:"Té Miren",type:"food",emoji:"🍵",qty:2,desc:"Una taza calienta más que el cuerpo.",useable:true},
    {id:2,name:"Pan Velin",type:"food",emoji:"🥐",qty:1,desc:"El pan de Veloria, siempre recién hecho.",useable:true},
  ]);
  const [log,setLog]=useState([]),[loading,setLoading]=useState(false);
  const [activeTab,setActiveTab]=useState("acciones"),[showPausa,setShowPausa]=useState(false);
  const [namingChild,setNamingChild]=useState(false),[childNameInput,setChildNameInput]=useState("");
  const logEnd=useRef(null);
  useEffect(()=>{logEnd.current?.scrollIntoView({behavior:"smooth"});},[log]);

  const addEntry=e=>setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,...e}]);
  const tick=(hours,changes={})=>{
    setNeeds(prev=>({hambre:clamp(prev.hambre-hours*4+(changes.hambre||0)),sueno:clamp(prev.sueno-hours*3+(changes.sueno||0)),higiene:clamp(prev.higiene-hours*1.5+(changes.higiene||0)),social:clamp(prev.social-hours*2+(changes.social||0)),diversion:clamp(prev.diversion-hours*2.5+(changes.diversion||0)),vejiga:clamp(prev.vejiga-hours*8+(changes.vejiga||0))}));
    setGt(prev=>{const total=prev.hour+hours,daysG=Math.floor(total/24),newDay=prev.day+daysG;return{hour:total%24,day:newDay,monthIdx:clamp(prev.monthIdx+Math.floor(newDay/30)-Math.floor(prev.day/30),0,11)};});
  };
  const addInvItem=(item)=>setInventory(prev=>{const ex=prev.find(i=>i.name===item.name);if(ex)return prev.map(i=>i.name===item.name?{...i,qty:i.qty+1}:i);return[...prev,{id:Date.now(),...item,qty:1}];});

  async function handleStart(twinData){
    setTwin(twinData);setPhase("playing");setLoading(true);
    await sleep(500);
    addEntry({text:getNarrative(`intro:${twinData.aspiration}`),type:"intro",place:"Tu apartamento",time:"08:00"});
    setLoading(false);
  }
  async function handleAction(action){
    if(loading)return;
    if(money<(action.cost||0)){addEntry({text:`No tenés suficientes Luces (necesitás L${action.cost}).`,type:"system"});return;}
    setLoading(true);await sleep(350+Math.random()*200);
    if(action.id==="chat_npc"&&action.npc){
      const fr=rels[action.npc]?.friendship||0,level=fr<30?"low":fr<65?"mid":"high";
      const key=`npc:${action.npc}:${level}`,gain=Math.floor(Math.random()*6)+7;
      const memNote=fr<30?`Primera conversación en ${loc.place}`:`Charlaron en ${loc.place}`;
      tick(action.time,{social:10,diversion:8});
      if(action.cost)setMoney(m=>m-action.cost);
      setRels(prev=>({...prev,[action.npc]:{friendship:clamp((prev[action.npc]?.friendship||0)+gain),history:[...(prev[action.npc]?.history||[]).slice(-4),memNote]}}));
      addEntry({text:getNarrative(N[key]?key:`npc:default:${level}`,{NPC:action.npc.split(" ")[0]}),type:"story",place:loc.place,time:toTimeStr(gt.hour+action.time)});
    } else {
      tick(action.time||0.5,BASE_EFFECTS[action.id]||{});
      if(action.cost)setMoney(m=>m-action.cost);
      if(action.id==="cook")addInvItem({name:"Comida casera",type:"food",emoji:"🍲",desc:"Cocinado en casa con especias de Veloria.",useable:true});
      if(action.id==="buy_book")addInvItem({name:"Libro de Veloria",type:"book",emoji:"📖",desc:"Una historia del mundo de Otherwhen.",useable:false});
      if(action.id==="fish")addInvItem({name:"Mirenpez fresco",type:"fish",emoji:"🐟",desc:"Pescado esta mañana en el Lago Miren.",useable:false});
      addEntry({text:getNarrative(action.id)||getNarrative("default"),type:"story",place:loc.place,time:toTimeStr(gt.hour+(action.time||0.5))});
    }
    setLoading(false);
  }
  async function handleWork(){
    if(!career||loading)return;
    const c=CAREERS[career.track],wage=c.wages[career.level];
    setLoading(true);await sleep(400);
    tick(c.shiftH,BASE_EFFECTS["work_shift"]||{});
    setMoney(m=>m+wage);
    const newShifts=career.shiftsWorked+1,newLevel=career.level<3&&newShifts%PROMO_SHIFTS[career.level]===0?career.level+1:career.level,promoted=newLevel>career.level;
    setCareer(prev=>({...prev,shiftsWorked:newShifts,level:newLevel}));
    const text=getNarrative(`work:${career.track}`);
    addEntry({text:promoted?text+`\n\n✦ ¡Ascenso! Ahora sos ${c.levels[newLevel]} en ${c.label}.`:text,type:"work",place:loc.place,time:toTimeStr(gt.hour+c.shiftH)});
    setLoading(false);
  }
  async function handleApplyJob(trackId){
    if(loading)return;
    setLoading(true);await sleep(400);
    setCareer({track:trackId,level:0,shiftsWorked:0});
    addEntry({text:getNarrative(`apply:${trackId}`),type:"work",place:loc.place,time:toTimeStr(gt.hour+1)});
    setLoading(false);
  }
  async function handleEventAttend(){
    const ev=CALENDAR_EVENTS[gt.monthIdx];if(!ev||loading)return;
    setLoading(true);await sleep(500);
    tick(3,BASE_EFFECTS["event_attend"]||{});
    addEntry({text:getNarrative(`event:${gt.monthIdx}`),type:"event",place:loc.place,time:toTimeStr(gt.hour+3)});
    setLoading(false);
  }
  async function handleRomanceAction(type,npcName){
    if(loading)return;
    if(type==="have_child"){setNamingChild(true);setChildNameInput("");return;}
    setLoading(true);await sleep(400);
    const positive=type==="ask_out"||type==="propose"||type==="marry";
    tick(1,positive?{social:20,diversion:25}:{social:-25,diversion:-20});
    if(type==="ask_out")setFamily(f=>({...f,partner:npcName,romanticStatus:"dating"}));
    else if(type==="propose")setFamily(f=>({...f,romanticStatus:"engaged"}));
    else if(type==="marry")setFamily(f=>({...f,romanticStatus:"married"}));
    else if(type==="breakup"||type==="divorce"){setFamily(f=>({...f,partner:null,romanticStatus:null}));setRels(prev=>({...prev,[npcName]:{...prev[npcName],friendship:clamp((prev[npcName]?.friendship||0)-20)}}));}
    addEntry({text:getNarrative(`romance:${type}`,{NPC:npcName}),type:"romance",place:loc.place,time:toTimeStr(gt.hour+1)});
    setLoading(false);
  }
  async function handleHaveChild(){
    const name=childNameInput.trim();if(!name)return;
    setNamingChild(false);setLoading(true);await sleep(500);
    const pT=NPC_TRAITS_MAP[family.partner]||["curioso","alegre","cálido"];
    const pool=[...new Set([...(twin?.traits||[]),...pT])].sort(()=>0.5-Math.random());
    setFamily(f=>({...f,children:[...f.children,{name,birthDay:gt.day,traits:pool.slice(0,3),otherParent:family.partner}]}));
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
  function handleUseItem(item){
    if(item.type==="food"){tick(0,{hambre:40});setInventory(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));addEntry({text:`Comés ${item.name.toLowerCase()}. El hambre cede un poco.`,type:"story",place:loc.place});}
  }

  if(phase==="creation")return<CreationScreen onStart={handleStart}/>;

  const hoodColor=(NEIGHBORHOODS[loc.hood]||{}).color||"#D4A853";
  const TABS=[{id:"acciones",label:"Acciones",emoji:"🎮"},{id:"social",label:"Social",emoji:"💬"},{id:"trabajo",label:"Trabajo",emoji:"💼"},{id:"inventario",label:"Inventario",emoji:"📦"},{id:"calendario",label:"Calendario",emoji:"📅"},{id:"diario",label:"Diario",emoji:"📖"}];
  const currentEvent=CALENDAR_EVENTS[gt.monthIdx];
  const npcsHere=(NPC_AT_PLACE[loc.place]||[]).filter(n=>rels[n]);

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:"#0F0A06",fontFamily:"'DM Sans',sans-serif",color:"#EDE0CC",overflow:"hidden"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:#2C1F14;border-radius:2px}button{font-family:inherit}@keyframes fadeSlideIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {showPausa&&<PausaModal onClose={()=>setShowPausa(false)} log={log} gt={gt} twin={twin}/>}
      {namingChild&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.8)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{background:"#1A1208",border:"1px solid #3D2B1F",borderRadius:"16px",padding:"28px",width:"300px",textAlign:"center"}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>👶</div>
            <div style={{fontFamily:"'Lora',serif",fontSize:"17px",color:"#D4A853",marginBottom:"6px"}}>¿Cómo se llama?</div>
            <div style={{fontSize:"10px",color:"#5C4030",marginBottom:"18px"}}>El nombre de tu hijo/a en Veloria.</div>
            <input value={childNameInput} onChange={e=>setChildNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&childNameInput.trim()&&handleHaveChild()} placeholder="Nombre..." style={{width:"100%",padding:"9px 13px",background:"transparent",border:"1px solid #2C1F14",borderRadius:"8px",color:"#EDE0CC",fontSize:"15px",fontFamily:"'Lora',serif",outline:"none",marginBottom:"12px"}}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setNamingChild(false)} style={{flex:1,padding:"7px",borderRadius:"8px",border:"1px solid #2C1F14",background:"transparent",color:"#5C4030",cursor:"pointer"}}>Cancelar</button>
              <button onClick={handleHaveChild} disabled={!childNameInput.trim()} style={{flex:1,padding:"7px",borderRadius:"8px",border:"none",background:"#D4A853",color:"#0F0A06",cursor:"pointer",fontWeight:600}}>✦ Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 16px",borderBottom:"1px solid #1A1208",background:"#0F0A06",flexShrink:0,height:"48px"}}>
        <div style={{fontFamily:"'Lora',serif",fontSize:"16px",color:"#D4A853",letterSpacing:"0.1em"}}>inbetweens</div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"18px",color:gt.hour>=21||gt.hour<6?"#7BB8B9":"#D4A853",lineHeight:1}}>{toTimeStr(gt.hour)}</div>
          <div style={{fontSize:"8px",color:"#3D2B1F",letterSpacing:"0.05em"}}>{loc.hood} · {loc.place.length>16?loc.place.slice(0,15)+"…":loc.place}</div>
        </div>
        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
          {currentEvent&&<button onClick={handleEventAttend} disabled={loading} style={{fontSize:"14px",background:"transparent",border:"none",cursor:"pointer",opacity:loading?0.4:1}} title={currentEvent.name}>{currentEvent.emoji}</button>}
          <button onClick={()=>setShowPausa(true)} style={{background:"transparent",border:"1px solid #2C1F14",color:"#5C4030",borderRadius:"6px",width:"28px",height:"28px",cursor:"pointer",fontSize:"14px",display:"flex",alignItems:"center",justifyContent:"center"}}>⏸</button>
        </div>
      </div>

      {/* MAIN: character card + narrative */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        <CharacterCard twin={twin} needs={needs} money={money} gt={gt} rels={rels} family={family}/>
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* NPCs present indicator */}
          {npcsHere.length>0&&(
            <div style={{padding:"4px 14px",display:"flex",gap:"6px",alignItems:"center",borderBottom:"1px solid #1A1208",flexShrink:0}}>
              <span style={{fontSize:"9px",color:"#3D2B1F",letterSpacing:"0.06em"}}>AQUÍ</span>
              {npcsHere.map(n=><div key={n} style={{display:"flex",alignItems:"center",gap:"3px"}}><NPCAvatar name={n} size={16}/><span style={{fontSize:"9px",color:"#5C4030"}}>{n.split(" ")[0]}</span></div>)}
            </div>
          )}
          {/* Narrative */}
          <div style={{flex:1,overflowY:"auto",padding:"16px 20px"}}>
            {log.map(e=>(
              <div key={e.id} style={{marginBottom:"20px",paddingLeft:"12px",borderLeft:`2px solid ${{intro:"#D4A853",story:"#3D2B1F",travel:"#2C1F14",system:"#1A1208",romance:"#E87B9E",work:"#6B9E5E",event:"#D4A853"}[e.type]||"#2C1F14"}`,animation:"fadeSlideIn 0.4s ease"}}>
                {e.place&&<div style={{fontSize:"9px",color:"#3D2B1F",marginBottom:"4px",letterSpacing:"0.06em",textTransform:"uppercase"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
                <div style={{fontSize:"13px",lineHeight:"1.8",color:"#A08060",fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{e.text}</div>
              </div>
            ))}
            {loading&&<div style={{color:"#3D2B1F",fontSize:"12px",fontStyle:"italic",fontFamily:"'Lora',serif",animation:"fadeSlideIn 0.3s ease"}}>✦ ...</div>}
            <div ref={logEnd}/>
          </div>
        </div>
      </div>

      {/* BOTTOM: tabs + content */}
      <div style={{borderTop:"1px solid #1A1208",background:"#0D0905",flexShrink:0,height:"240px",display:"flex",flexDirection:"column"}}>
        {/* Tab bar */}
        <div style={{display:"flex",borderBottom:"1px solid #1A1208",flexShrink:0,height:"42px"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{flex:1,border:"none",borderBottom:activeTab===t.id?`2px solid ${hoodColor}`:"2px solid transparent",background:"transparent",color:activeTab===t.id?hoodColor:"#3D2B1F",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1px",padding:"4px 2px",transition:"color 0.15s"}}>
              <span style={{fontSize:"12px"}}>{t.emoji}</span>
              <span style={{fontSize:"8px",letterSpacing:"0.05em",textTransform:"uppercase"}}>{t.label}</span>
            </button>
          ))}
        </div>
        {/* Tab content */}
        <div style={{flex:1,overflow:"hidden"}}>
          {activeTab==="acciones"&&<AccionesTab loc={loc} career={career} NEIGHBORHOODS={NEIGHBORHOODS} PLACE_ACTIONS={PLACE_ACTIONS} loading={loading} dark={true} onGoTo={handleGoTo} onAction={handleAction} onWork={handleWork}/>}
          {activeTab==="social"&&<SocialTab rels={rels} family={family} currentDay={gt.day} dark={true} loading={loading} onRomanceAction={handleRomanceAction}/>}
          {activeTab==="trabajo"&&<TrabajoTabContent career={career} loc={loc} dark={true} loading={loading} onApply={handleApplyJob} onWork={handleWork}/>}
          {activeTab==="inventario"&&<InventarioTab inventory={inventory} onUseItem={handleUseItem}/>}
          {activeTab==="calendario"&&<CalendarioTab gt={gt}/>}
          {activeTab==="diario"&&<DiarioTab log={log} gt={gt}/>}
        </div>
      </div>
    </div>
  );
}
