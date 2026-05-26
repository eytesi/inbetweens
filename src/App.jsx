import { useState, useRef, useEffect } from "react";

const C={bg:"#F0EAE0",white:"#FFFFFF",card:"#FFFFFF",cardWarm:"#FFF8F0",cardGreen:"#F0F8EA",cardOrange:"#FFF5E5",border:"#E0D4C8",border2:"#D4C4B0",orange:"#F5A623",orangeDark:"#D48B10",orangeLight:"#FFF3DC",green:"#7AB55C",text:"#2C1A0E",textMid:"#7A5840",textDim:"#B8907A",textGhost:"#D4C4B0"};
const bento=(bg=C.white,border=C.border)=>({borderRadius:"16px",background:bg,border:`1px solid ${border}`,boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"});

function SplashScreen({onEnter}){
  const [ready,setReady]=useState(false);
  const hasSaves=anySaveExists();
  useEffect(()=>{const t=setTimeout(()=>setReady(true),400);return()=>clearTimeout(t);},[]);
  return(
    <div style={{minHeight:"100vh",background:"#F5EDE0",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 24px",fontFamily:"'Fredoka',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box}`}</style>
      {/* Logo */}
      <img src="/logo.png" alt="Inbetweens" style={{height:90,marginBottom:8,opacity:ready?1:0,transform:ready?"translateY(0)":"translateY(-10px)",transition:"opacity 0.6s,transform 0.6s"}}/>
      {/* Tagline */}
      <div style={{fontSize:11,color:"#B8907A",letterSpacing:"0.22em",textTransform:"uppercase",marginBottom:32,opacity:ready?1:0,transition:"opacity 0.6s",transitionDelay:"0.15s",fontFamily:"'Nunito',sans-serif"}}>Otherwhen · Veloria</div>
      {/* Quote */}
      <div style={{fontFamily:"'Lora',serif",fontSize:16,color:"#7A5840",fontStyle:"italic",textAlign:"center",lineHeight:1.7,maxWidth:320,marginBottom:40,opacity:ready?1:0,transition:"opacity 0.6s",transitionDelay:"0.25s"}}>
        "Hay lugares que existen porque alguien decidió que existieran.<br/>Veloria es uno de esos lugares."
      </div>
      {/* Description */}
      <div style={{fontSize:12,color:"#B8907A",textAlign:"center",lineHeight:1.6,marginBottom:40,opacity:ready?1:0,transition:"opacity 0.6s",transitionDelay:"0.35s",fontFamily:"'Nunito',sans-serif"}}>
        Un mundo de simulación de vida en Otherwhen.<br/>
        Cada Twin que llega a Veloria trae su historia.<br/>
        Esta es la tuya.
      </div>
      {/* Buttons */}
      <div style={{display:"flex",flexDirection:"column",gap:10,width:"100%",maxWidth:320,opacity:ready?1:0,transition:"opacity 0.6s",transitionDelay:"0.45s"}}>
        {hasSaves&&(
          <button onClick={()=>onEnter("load")}
            style={{padding:"13px 24px",borderRadius:"14px",border:"1.5px solid #E0D4C8",background:"#FFFFFF",color:"#7A5840",fontSize:"14px",fontWeight:600,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
            📂 Cargar partida
          </button>
        )}
        <button onClick={()=>onEnter("new")}
          style={{padding:"13px 24px",borderRadius:"14px",border:"none",background:"#F5A623",color:"#FFFFFF",fontSize:"15px",fontWeight:700,cursor:"pointer",fontFamily:"'Fredoka',sans-serif",boxShadow:"0 4px 16px rgba(245,166,35,0.35)"}}>
          Crear mi Twin →
        </button>
      </div>
      {/* Studio */}
      <div style={{position:"absolute",bottom:24,fontSize:10,color:"#D4C4B0",letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"'Nunito',sans-serif"}}>Otherwhen Studios</div>
    </div>
  );
}

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

  // ── INTERACCIONES CON NPCS ──
  "int:saludar":["Le decís *Velin* a [NPC] y él/ella lo devuelve con esa facilidad de la gente que se alegra genuinamente de verte. Breve pero real.","[NPC] te ve llegar y asiente con una sonrisa corta. El saludo de Veloria — simple, sin vueltas — dice más de lo que parece."],
  "int:charlar":["Charlan sin agenda fija. [NPC] tiene una manera de hablar que hace que el tiempo pase diferente — más despacio, o más lleno. No estás seguro/a cuál de los dos.","La conversación va y viene. [NPC] dice algo que te hace pensar y después cambia de tema antes de que llegues a una conclusión. Eso también está bien."],
  "int:chiste_ok":["El chiste aterriza exactamente bien. [NPC] se ríe de verdad — de esa manera que no se puede fingir — y por un momento Veloria parece un poco más liviana."],
  "int:chiste_fail":["El chiste no funcionó. [NPC] sonríe por compromiso y cambia de tema con una delicadeza que casi duele más que si se hubiera reído. Te prometés no volver a hacer ese chiste."],
  "int:cumplido":["Le decís algo genuino sobre [NPC] y él/ella lo recibe con una gracia que dice que lo escuchó de verdad. Esas cosas se notan.","[NPC] escucha el cumplido y por un segundo no sabe qué responder. Después dice *sora* en voz baja. Eso significa más que cualquier respuesta elaborada."],
  "int:queja":["[NPC] escucha tu queja con la paciencia de alguien que sabe que a veces lo que se necesita es que alguien escuche. No da consejos. No hace falta.","Te desahogás y [NPC] asiente en los momentos correctos. Al final dice: 'Yo también lo pensé alguna vez.' Eso ayuda."],
  "int:secreto_npc":["Le contás algo que no le dijiste a nadie más. [NPC] no interrumpe, no da opiniones. Solo escucha. Después dice: '*Sora*.' Eso es suficiente.","[NPC] recibe el secreto con la seriedad que merece. 'Queda acá', dice. Y vos le creés."],
  "int:pregunta_prof":["La pregunta era más profunda de lo que parecía cuando la formulaste. [NPC] se toma su tiempo antes de responder. La respuesta vale la espera.","[NPC] mira hacia otro lado un momento. 'No sé si tengo la respuesta', dice al final. 'Pero me alegra que me lo hayas preguntado a mí.'"],
  "int:invitar":["Proponen tomar algo juntos. Hay una espontaneidad en el plan que lo hace mejor que si hubiera sido calculado. La tarde se estira un poco más.","'Yo invito', dice [NPC] antes de que puedas decir nada. Hay algo en ese gesto pequeño que habla de cómo es la gente de verdad."],
  "int:ofrecer_ayuda":["Ofrecés ayuda antes de que [NPC] la pida. Hay un momento en su expresión — breve, casi invisible — que dice que eso importó.","'No hace falta', dice [NPC]. Pero lo acepta. Y eso, descubrís, era todo lo que necesitaba."],
  "int:dar_regalo":["Le das algo pequeño que sabés que le va a gustar. [NPC] lo recibe con esa sorpresa real de cuando alguien te presta atención de verdad. '*Sora*', dice. Y se nota que lo dice en serio."],
  "int:hacer_plan":["Planean algo juntos. El plan en sí no importa tanto como el hecho de que los dos quisieron hacerlo. 'La semana que viene entonces', dice [NPC].","Terminan de planear algo que quizás no van a hacer exactamente como lo describieron. Pero el proceso de planearlo fue bueno de todas formas."],
  "int:broma_ok":["La broma funcionó y los dos terminan riendo de algo que no tiene explicación fuera de este momento. [NPC] dice: 'Eso no se lo cuento a nadie.'"],
  "int:broma_fail":["La broma no era tan graciosa en voz alta. [NPC] sonríe con amabilidad. 'Seguí intentando', dice. Hay cariño en el sarcasmo."],
  "int:competir_win":["Ganaste. [NPC] lo acepta con más gracia de la que esperabas. 'La próxima te gano yo', dice. Ya hay una próxima vez."],
  "int:competir_lose":["Perdiste. [NPC] lo celebra con moderación — lo suficiente para que cuente, no tanto para que duela. Hay algo agradable en eso."],
  "int:confrontar":["La conversación era necesaria aunque difícil. Dijeron lo que tenían que decirse. No todo se resolvió, pero algo se movió en la dirección correcta.","Fue una conversación incómoda que ninguno de los dos quería tener. Pero a veces así son las cosas que importan."],
  "int:disculpas":["Pedís disculpas con la misma honestidad con que se piden las cosas que importan. [NPC] escucha y después asiente. '*Sorvei* aceptado', dice. Eso es más de lo que merecías esperar.","'Ya fue', dice [NPC]. Hay algo en esas dos palabras que cierran una puerta y abren otra al mismo tiempo."],
  "int:ignorar":["Pasás al lado de [NPC] sin decir nada. Lo notó. Los dos saben que lo notó. Algunas cosas se comunican mejor en silencio, aunque no siempre de la manera que uno quiere."],
  "int:coquetear_ok":["[NPC] recibe el coqueteo con una sonrisa que dice que no es indiferente. El aire cambia de temperatura, apenas. Hay algo ahí que todavía no tiene nombre."],
  "int:coquetear_fail":["[NPC] responde con amabilidad pero con una claridad tranquila que no deja lugar a malentendidos. No es el momento o no es lo que busca. Ambos siguen como si nada, que es lo correcto."],
  "int:cumplido_rom":["El cumplido era más personal de los habituales. [NPC] lo recibe en silencio y hay algo en sus ojos que no tiene nombre todavía pero que está ahí.","[NPC] baja la vista un segundo. Cuando la levanta hay algo diferente. '*Sora*', dice en voz muy baja."],
  "int:tomar_mano":["Le tomás la mano a [NPC] y él/ella la aprieta suavemente. Veloria sigue igual afuera. Adentro algo se ordenó.","Los dedos se encuentran sin que ninguno de los dos lo planee del todo. [NPC] no dice nada. No hace falta."],
  "int:abrazo_rom":["El abrazo dura un poco más de lo necesario. Eso es exactamente lo que tenía que durar.","[NPC] apoya la cabeza levemente. Afuera el Veloer empieza a caer. Hay momentos que Veloria guarda en algún lugar que no es el lago."],
  "int:beso":["Veloria a esa hora, esa luz, ese momento. El beso es exactamente correcto.","No lo planearon. Las mejores cosas nunca se planean del todo en Veloria."],
  "int:kalei":["Le decís *Kalei* — en Twinés, que suena distinto, que pesa más. [NPC] sonríe despacio. '*Kalei*', dice. Y todo Veloria se asienta un poco más."],

  // ── INTERACCIONES CON HIJOS ──
  "child:cargar":["Levantás a [CHILD] con los dos brazos y su peso es exactamente el que debería ser. Te mira con esos ojos que todavía no saben qué es el mundo. Vos tampoco estás muy seguro/a, pero los dos están bien."],
  "child:mecer":["Lo/La mecés despacio hasta que los ojos se van cerrando. El apartamento en silencio, la noche afuera, y este pequeño/a humano/a que se queda dormido/a en tus brazos. Estos momentos no duran mucho. Eso los hace mejores."],
  "child:alimentar":["Es una tarea que requiere paciencia y [CHILD] no siempre coopera. Pero cuando termina de comer y te mira con esa satisfacción total de los recién nacidos, se entiende para qué existe la palabra *sora*."],
  "child:cantar":["Cantás algo en Twinés, una canción que inventaste en el camino. [CHILD] escucha con la concentración total de alguien para quien todo es nuevo. Los ojos brillan. Siempre los ojos."],
  "child:banar_b":["El bañito de [CHILD] siempre termina con agua por todas partes. Él/Ella lo pasa bien. Vos también, aunque no te animás a admitirlo del todo."],
  "child:jugar_inf":["[CHILD] tiene una imaginación que no respeta ninguna lógica conocida. Juegan durante una hora y cuando terminás, estás un poco agotado/a y bastante más feliz.","El juego de hoy involucraba reglas que cambiaban cada cinco minutos. [CHILD] ganó de todas formas. No sabés muy bien cómo."],
  "child:cuento":["El cuento de esta noche es sobre un Mirenpez que quería volar. [CHILD] escucha con los ojos abiertos hasta la última página y después pregunta si de verdad los peces pueden volar. Decidís que en Otherwhen, sí."],
  "child:consolar":["[CHILD] llora y no puede explicar por qué — a esta edad todavía no siempre se puede. Lo/La abrazás y esperás. A veces eso es suficiente. A veces es todo lo que hay."],
  "child:ensenyar":["Hoy aprendió algo nuevo. Fue despacio, con paciencia, varias veces. Al final lo/la viste hacer la cosa solo/a y algo en tu pecho se movió de esa manera que no tiene nombre."],
  "child:abrazo_inf":["[CHILD] corre hacia vos con los brazos abiertos y ese impulso que tiene la gente cuando todavía no aprendió a guardarse. Lo/La recibís con los brazos igual de abiertos."],
  "child:tarea":["La tarea de hoy era matemática y [CHILD] no quería saber nada. Pero con paciencia y un par de Velorcitos como recompensa negociada, llegaron al final. 'Mañana me ayudás de nuevo', dice [CHILD]."],
  "child:jugar_nino":["Juegan a algo que [CHILD] inventó con reglas que cambian cada dos minutos. Hacés trampa una vez para que gane. No te vas a arrepentir.","La partida terminó en empate técnico que ninguno de los dos declaró. Así suelen terminar los mejores juegos."],
  "child:charlar_nino":["[CHILD] te cuenta su día con el detalle y la urgencia de alguien para quien todo importa mucho. Escuchás con atención. Eso importa más de lo que parece.","'¿Y vos cómo estás?' pregunta [CHILD] al final. Tiene esa costumbre, de preguntar. No sé de quién la habrá sacado."],
  "child:consejo_nino":["Le das un consejo que esperás que sirva. [CHILD] lo escucha con cara de quien todavía no sabe si va a aplicarlo. A veces se aplica igual, sin decirlo."],
  "child:reganar":["Hubo que hablar de algo que estuvo mal. No fue fácil ni para vos ni para [CHILD]. Pero fue necesario, y lo dijiste con más cuidado de lo que creías que ibas a tener. Al final [CHILD] asiente. Eso alcanza."],
  "child:charlar_adol":["[CHILD] está en esa edad donde a veces habla y a veces no hay manera. Hoy es un día de hablar. Se sientan, y resulta que tiene cosas interesantes que decir sobre Veloria, sobre la vida, sobre cosas que vos también te preguntaste."],
  "child:consejo_adol":["Pedís ser honesto/a y no sonar como un sermón. No siempre funciona. Pero hoy sí. [CHILD] escucha y dice: 'Ya sé que tenés razón. Eso no significa que sea fácil.' Y tiene razón."],
  "child:discutir":["La discusión empieza por algo pequeño y crece más de lo que debería. Los dos dicen algo de más. Los dos lo saben. A veces así son las cosas con la gente que querés.","[CHILD] cierra la puerta — no de un golpe, pero sí con intención. Mañana va a estar mejor. Pero hoy duele igual."],
  "child:apoyar":["[CHILD] está pasando por algo. No cuenta todo, pero cuenta algo. Estás ahí. No resolvés nada, no das respuestas. Eso, descubrís, es lo que más importa."],
  "child:espacio":["Hay días en que lo mejor que podés hacer por [CHILD] es no hacer nada. Darle el espacio que necesita y confiar en que sabe cómo usarlo. Es más difícil de lo que suena."],
  "child:cafe_hijo":["[CHILD] y vos tomando café como dos adultos. Es extraño y también exactamente correcto. Hablan de Veloria, de la vida, de cosas que antes no habrían hablado.","'No me acordaba que te gustaba el café solo', dice [CHILD]. Hay algo en esa frase que dice que te está mirando."],
  "child:pedir_consejo":["Ahora te pide consejo a vos. Es un giro que no esperabas del todo. Le das lo mejor que tenés y [CHILD] escucha con esa atención que reconocés de cuando eras vos el/la que escuchaba."],
  "child:charlar_adulto":["La conversación va y viene sin destino fijo. Hay un momento en que te das cuenta de que esta persona, que una vez fue tan chica, ahora es alguien de verdad. Con su propio mundo. Su propia Veloria."],
  "child:celebrar_hijo":["[CHILD] logró algo. Hay que celebrarlo. En Veloria eso siempre incluye Lumaven y demasiados Velorcitos y decir '*Kalei*' más veces de las necesarias. Nadie se queja."],

  // ── SKILL UNLOCKS ──
  "sk:fish_night":   ["Pescás de noche en el Lago Miren. El agua tiene una quietud completamente distinta. En algún momento, una luz sube del fondo — breve, clara — y desaparece antes de que puedas estar seguro/a de haberla visto."],
  "sk:fish_deep":    ["Llevás la línea más profundo de lo habitual. Lo que viene del Miren en estas aguas no es siempre Mirenpez. Hoy sale algo dorado que nunca habías visto. Lo devolvés. Esas cosas no son para quedárselas."],
  "sk:fish_tomas":   ["Tomas deja caer la caña y mira el lago largo antes de hablar. 'El Otreven no es un lugar', dice al fin. 'Es una dirección. Y el lago sabe adónde apunta.' Pausa. 'Mi padre lo cruzó una vez. Volvió distinto. Solo dijo que la puerta era pequeña y estaba en el fondo.'"],
  "sk:cook_recipe":  ["Seguís una receta de un libro viejo de la librería de Soren. El resultado es algo entre el Pan Velin y el Mirenpez al Veloer — no tiene nombre todavía, pero sabe exactamente como debería saber Veloria desde adentro."],
  "sk:dinner_party": ["Preparás la cena para alguien. La mesa es pequeña pero la conversación no necesita mucho espacio. Hay momentos que ocurren así: sin planificarlos del todo."],
  "sk:sell_art":     ["Ponés algunas de tus creaciones en el mercado de la Plaza. Los Twins las miran con curiosidad real. Vendés dos. Ganás algo de Luces. Pero más que eso, algo de vos se quedó en Veloria en manos de alguien más."],
  "sk:exhibit":      ["La Galería de Veleta cuelga tu trabajo en la pared del fondo. Cael pasa, lo mira un minuto largo, y dice una sola cosa: *Quedatelo así.* No sabés bien qué significa. Pero lo guardás."],
  "sk:care_plants":  ["Regás las Mireno de casa. Sus hojas tienen esa textura que no existe en ninguna otra planta. Algo en el espacio se siente diferente cuando están bien."],
  "sk:secret_path":  ["Al sur del lago hay un camino entre los árboles que no aparece en ningún mapa de Veloria. Seguís las piedras planas y llegás a un claro donde el agua es tan quieta que parece un espejo. Hay una roca marcada con la letra *V*."],
  "sk:research_13":  ["En el fondo del archivo encontrás un registro que no debería existir: un contrato de fundación con trece firmas. La décimotercera está tachada con tinta roja. Pero debajo, si mirás a la luz, se lee: *Vélan Orlen*."],
  "sk:elowen_home":  ["Elowen te abre la puerta de su casa. Adentro hay libros hasta el techo, mapas viejos, y algo que parece un diario abierto en la mesa. '*Lo estaba esperando*', dice. No está hablando de hoy."],
  "sk:velista":      ["Hay un momento, hoy, en que te das cuenta de que la gente en Veloria te escucha distinto. No porque hayas cambiado lo que decís. Sino porque cambiaste cómo lo decís."],
  "sk:instrument":   ["Tocás en casa. El sonido llena los rincones del apartamento de una manera que ningún objeto podría. Veloria afuera sigue igual. Adentro algo se ordena."],

  // ── HITOS DE EDAD ──
  "age:25": ["Veinticinco años en Veloria. Esa edad en que ya no sos tan nuevo/a pero todavía podés fingir que sí. El lago sigue igual. Vos, apenas un poco diferente."],
  "age:30": ["Treinta años. Hay una cosa que cambia sin que te des cuenta: empezás a reconocer a Veloria por su ritmo, no solo por sus calles. Eso lleva tiempo aprenderlo."],
  "age:40": ["Cuarenta años. La mitad de Veloria te conoce. La otra mitad te conoce de vista. Hay algo en eso que se siente como haber llegado, definitivamente, a algún lado."],
  "age:50": ["Cincuenta años. Las estaciones ya no te sorprenden. Ese conocimiento tiene su propio peso."],
  "age:60": ["Sesenta años. La ciudad te vio crecer y vos la viste cambiar. Los Twins jóvenes a veces te preguntan cosas como si supieras las respuestas. A veces las sabés."],
  "age:70": ["Setenta años en Veloria. Hay muy poca gente que te conoció cuando llegaste. Eso tiene algo de soledad y algo de libertad."],

  // ── Transiciones de etapa (nuevo sistema) ──
  "stage:adulto":  ["Algo cambió en cómo Veloria te mira. No de golpe — fue pasando. Sos Adulto/a ya. El barrio te conoce. Vos lo conocés. Hay algo que pesa y algo que libera en eso al mismo tiempo."],
  "stage:anciano": ["Los últimos días tienen una luz diferente. Más lenta. Más clara. Anciano/a en Veloria — y eso, descubrís, también es algo que se lleva con dignidad."],
  "death":  ["El Lago Miren está quieto esta mañana, más de lo habitual. Veloria se ve desde acá exactamente como la primera vez.\n\nHay una palabra en Twinés que no tiene traducción exacta: *mirenal*. Lo que el lago recuerda. Eso es lo que queda de cada Twin que vivió en esta ciudad."],
  "housing:upgrade":   ["El nuevo espacio tiene esa sensación de las cosas que te costaron algo: más real, más tuyo."],
  "housing:furniture": ["El objeto nuevo ocupa su lugar como si siempre hubiera estado ahí. Eso es señal de que elegiste bien."],

  // ── LA VEGA NUEVA ──
  "terr:amanecer":  ["La terraza del edificio antes del Veloer. Veloria desde acá es solo tejados y el Lago Miren al fondo con esa luz particular que viene antes de que el día arranque. Un buen lugar para empezar sin que nadie te vea todavía."],
  "terr:escribir":  ["Escribís o dibujás o hacés lo que sea que necesitás hacer cuando querés espacio y silencio. La terraza lo da sin pedirte nada a cambio.","Dos horas en la terraza con lo que estabas haciendo. El resultado no es perfecto. Es tuyo, que es más que perfecto."],
  "terr:estrellas": ["El cielo de Veloria tiene algo que la mayoría de los cielos no tienen: se puede leer. Las constelaciones que conocés y las que no. Buscás las que ya sabés y te quedás mirando las otras."],
  "terr:huerto":    ["El pequeño huerto de la terraza creció más de lo que esperabas. Le agregás algo, lo regás, te quedás mirando cómo está. Hay una satisfacción muy específica en esto que no sabés nombrar del todo bien."],
  "tienda:basicos": ["Comprás lo necesario en la tienda de La Vega. El dueño recuerda lo que compraste la última vez. En Veloria eso es normal: es una ciudad que presta atención."],
  "tienda:ropa":    ["Mirás la ropa sin comprar nada. Hay algo en los tejidos de Veloria — más gruesos, más reales — que los diferencia de lo que conocías antes de llegar."],
  "tienda:charlar": ["El dueño de la tienda tiene esa sabiduría práctica de quien lleva años atendiendo a las mismas personas: sabe cuándo hablar y cuándo no. Hoy habla. Vale la pena escuchar."],
  "jardin:plantar": ["Metés las manos en la tierra del Jardín Comunitario. Hay algo físico y honesto en eso: poner algo en el suelo y esperar que crezca. Veloria entiende esa paciencia mejor que la mayoría de los lugares."],
  "jardin:cosechar":["Lo que plantaste creció. Lo cosechás con más satisfacción de la que esperabas. Funciona así: uno pone algo sin calcular bien cuánto va a valer, y lo que vale es más de lo que calculó."],
  "jardin:pasear":  ["El Jardín Comunitario a media mañana. Plantas de todos los vecinos mezcladas sin orden aparente. El resultado es más bonito que cualquier jardín planeado.","Un rato entre las plantas sin hacer mucho. Los Mirenos tienen ese efecto: están quietos y te contagian."],
  "pan:comprar":    ["El Pan Velin recién horneado todavía está tibio cuando lo ponés en la mochila. Hay pocas cosas mejores que esta, específicamente, en Veloria."],
  "pan:desayuno":   ["Desayuno en la Panadería Velin. El pan, algo untado, una bebida caliente. Los vecinos de La Vega pasan y algunos se quedan. Veloria en la mañana."],
  "pan:ver_hacer":  ["Te quedás un rato mirando cómo amasan. La panadera trabaja con la concentración de quien hace lo mismo hace veinte años y todavía le importa hacerlo bien."],
  "estudio:pintar": ["El Estudio de Arte de La Vega tiene esa luz norteña que los pintores buscan. Trabajás un par de horas y cuando parás hay algo en la tela que no tenía nombre cuando empezaste."],
  "estudio:ver":    ["Recorrés lo que hicieron los otros. Hay un cuadro que te molesta un poco — no porque sea malo. Porque es muy bueno y no sabés bien cómo lo hicieron."],
  "estudio:conocer":["Conocés a alguien en el Estudio. El tipo de conversación que ocurre solo entre gente que hace cosas: directa, sin presentaciones formales.", "Dos artistas mirando el trabajo del otro sin decirse demasiado. Eso también es una conversación."],
  "estudio:tecnica":["Tres horas practicando algo específico. No sale perfecto. Sale mejor. Eso es suficiente para hoy."],
  "bar:lumaven":    ["El Lumaven joven del Bar tiene ese sabor que solo tiene cuando lo tomás en el lugar indicado. La tarde se estira un poco hacia algo que no tenía nombre antes."],
  "bar:musica":     ["Hay música en vivo. No es el tipo que se escucha — es el tipo que se siente en el pecho antes de que la cabeza lo procese. Veloria tiene eso a ciertas horas."],
  "bar:conocer":    ["El Bar Lumaven de noche es el mejor lugar de La Vega para conocer gente. No porque sea el más concurrido: sino porque la gente que va tiene algo que contar."],
  "bar:mirone":     ["El Mirone es el juego de cartas de Veloria. Las reglas son simples; la estrategia, no tanto. Jugás dos partidas. Perdés las dos. Aprendés algo de todas formas."],
  "merc:unico":     ["El Mercadillo de La Vega vende cosas que no encontrás en otro lado. Algunas tienen historia, otras son curiosidades. Te llevás algo pequeño que no sabías que necesitabas."],
  "merc:frescos":   ["Los productos frescos del Mercadillo vienen directos de Los Prados y Los Prados sabe lo que hace. Comprás más de lo que planeabas."],
  "merc:charlar":   ["Los vendedores del Mercadillo saben cosas de Veloria que no están escritas en ningún lado. Conversación de quince minutos que vale por horas."],
  "gym:entrenar":   ["Entrenás. Es incómodo mientras pasa y hay algo que se asienta cuando termina. El tipo de cansancio que no pesa, que en realidad alivia."],
  "gym:natacion":   ["La pileta del Gimnasio Miren tiene agua que dicen que viene del lago — o mezclada con él. Quizás es un cuento. Pero nadar acá tiene algo del Miren que no es fácil de explicar."],

  // ── RESPUESTAS A AUTONOMÍA DE NPCS ──
  "aut:aria_in":      ["Aria entra y se sienta como si hubiera estado antes — con esa facilidad de la gente que no necesita permiso. Hablan del barrio, del café, de nada en particular. Cuando se va, el apartamento queda con algo que no tenía antes."],
  "aut:aria_door":    ["Toman el café en la puerta. Es raro y también perfecto. Aria dice algo sobre La Vega que no habías pensado antes."],
  "aut:aria_busy":    ["Le agradecés el gesto. Aria asiente como quien entiende perfectamente. '*Sora*', dice, y sube las escaleras."],
  "aut:ciro_go":      ["Llegás y Ciro te espera en el fondo de los archivos. Tiene algo en la mano: un folio doblado. 'Nadie sabe que lo encontré', dice. La lista tiene trece nombres. El último, tachado con tinta roja. Abajo, en lápiz suave: *preguntale a Dora.*"],
  "aut:ciro_tmr":     ["Le respondés que vas mañana. Ciro contesta con una sola palabra: *Bien.* Ese bien tiene un peso que no sabés cómo medir todavía."],
  "aut:oren_go":      ["Llegás al Muelle cuando el Veloer recién empieza. Oren está parado mirando el lago. 'Esta tarde hay algo en el agua', dice. 'No siempre se puede ver. Hoy sí.' Te quedás mirando. No ves nada al principio. Después sí."],
  "aut:oren_tmr":     ["Le decís que mañana. Oren asiente. 'Va a estar igual mañana', dice. Quizás."],
  "aut:luma_bajar":   ["Bajás y Luma sigue tocando sin mirarte. Terminás sentado/a en el cordón de la vereda escuchando hasta que la canción se acaba. 'Era para vos', dice. No explica más."],
  "aut:luma_ventana": ["Abrís la ventana. Luma levanta la vista y sonríe. Sigue tocando. Una canción que no reconocés pero que suena como si ya la hubieras escuchado antes."],
  "aut:elowen_leer":  ["Abrís el libro. Las primeras páginas hablan de Veloria como si fuera un lugar que existió antes de que nadie lo fundara. En el capítulo tres hay un nombre: *Vélan Orlen*. Al lado, una nota al margen con letra de Elowen: *Preguntá quién era antes de preguntar qué pasó.*"],
  "aut:elowen_ir":    ["Elowen te abre la puerta antes de que golpées. 'Sabía que ibas a venir', dice. La casa huele a papel viejo y especias Mireno. Tiene el libro abierto en la mesa, en una página que no querés leer de pie: hay una carta del decimotercero fundador dirigida al lago."],
  "aut:soren_ir":     ["Soren saca el libro de detrás del mostrador sin que le preguntes. La tapa no tiene título. 'Es el único ejemplar que queda en Veloria', dice. 'Lo tenía guardado para alguien que supiera qué hacer con él.' Te lo da sin precio."],
  "aut:nela_ir":      ["El restaurante cerrado, solo Nela y vos y lo que cocinó. No está en el menú porque es algo que su madre hacía y que ella hace solo cuando quiere. Comés en silencio el plato más bueno que probaste en Veloria."],
  "aut:bren_ir":      ["Bren hace el control con esa calma de médico que tiene. Todo bien, dice. Pero hay algo en cómo lo dice que hace que te preguntes si 'todo bien' tiene un límite que todavía no encontraste."],
  "aut:aldric_ir":    ["Aldric te espera en el banco de la Plaza con dos tazas de Té Miren. 'Hay algo que creo que ya estás listo para saber', dice. Y te lo cuenta. No todo — todavía no. Pero suficiente para que el mundo de Veloria cambie de forma, levemente, en algo que no podés deshacer."],

  // ── Taller Cerámica ──
  "cerc:moldear":  ["Trabajás con la arcilla como si el material supiera adónde tiene que ir. No siempre. Pero hoy sí. Senia pasa y mira sin decir nada. Eso, en el taller, es el mejor elogio posible."],
  "cerc:ver":      ["Los trabajos de los otros en el taller son una clase sin palabras. Hay una pieza en el rincón que no termina de parecerse a nada conocido — eso le da algo a la tuya."],
  "cerc:torno":    ["El torno tiene su propia lógica. Le encontrás el ritmo a los veinte minutos. Cuando la pieza sale centrada, Senia asiente desde el otro lado del taller. Eso es suficiente."],
  "cerc:senia":    ["Senia habla poco. Cuando habla, dice cosas que tardás en entender. Hoy dijo que la cerámica no es hacer objetos — es aprender a escuchar lo que el material ya es."],

  // ── Cine Veloria ──
  "cine:ver":      ["La película dura dos horas en las que Veloria desaparece. La sala tiene esa oscuridad particular que hace que todo lo que se siente adentro se sienta más. Salís diferente. No sabés si es el film o el haber estado quieto/a tanto tiempo."],
  "cine:charlar":  ["Después de la película, alguien empieza a hablar en el hall. Terminás en esa conversación rara que solo ocurre cuando dos personas que no se conocen vieron la misma cosa al mismo tiempo."],
  "cine:dormido":  ["Te quedás dormido/a a los cuarenta minutos. La película sigue. Te despertás en el crédito final. Alguien te dejó una nota en el asiento: *'Igual era buena.'*"],

  // ── Taller de Música ──
  "musica:tocar":  ["El taller de música tiene esa acústica que hace que todo suene mejor de lo que es. Tocás algo que no tenía nombre y le encontrás uno. Tres Twins más están en la sala. Nadie habla. No hace falta."],
  "musica:clase":  ["La clase no es lo que esperabas. No enseñan técnica — enseñan a escuchar. Que es más difícil y más útil. Salís con el oído diferente."],
  "musica:impro":  ["Improvisás. Hay momentos en que no sabés de dónde viene lo que sale. Después de la sesión, el tipo del rincón dice: 'La segunda parte era buena.' Solo la segunda parte. Es un cumplido honesto."],

  // ── La Bodega ──
  "bodega:probar": ["El Miren Seco tiene ese amarillo que se ve solo en las bodegas de La Vega. Tomás despacio. Alguien en la barra empieza a contar algo. La noche se estira sola."],
  "bodega:historia":["El hombre que atiende lleva veinte años en La Vega. Dice que la ciudad cambió tres veces en ese tiempo. La primera fue cuando llegaron los de Ribera. La segunda cuando abrió el Teatro. La tercera no la nombra — solo levanta el vaso."],
  "bodega:contar": ["Contás algo. No todo — pero algo verdadero. La persona que escucha no te conoce. Por eso es más fácil. La Bodega tiene esa cualidad: hace que las cosas parezcan confesables."],

  // ── Micro Parque ──
  "parque2:pasto": ["El parque micro de La Vega tiene ese pasto que no parece real — demasiado verde para estar entre edificios. Te tirás un rato. El ruido de la calle sigue ahí pero más lejos de lo que debería."],
  "parque2:leer":  ["Leés al sol en el parque de La Vega. No terminás el capítulo. Te distraés viendo pasar los Twins. Veloria desde un banco de parque tiene una escala que desde ningún otro lugar."],
  "parque2:pajaros":["Los Mirelos del parque micro son más confiados que los del lago. Uno se acerca a menos de un metro. Te quedás quieto/a más tiempo del necesario para no espantarlo."],

  // ── Azotea Norte ──
  "azotea2:lago":  ["Desde la Azotea Norte se ve el Lago Miren completo. No está en ningún folleto de Veloria. Solo los que viven en el edificio saben que existe esta vista. Esta tarde, el lago tiene ese color que no tiene nombre."],
  "azotea2:dibujar":["Dibujás el horizonte. No te sale bien a la primera. A la tercera tiene algo. Guardás el papel doblado en el bolsillo. No sabés para qué, pero lo guardás."],
  "azotea2:estrellas":["De noche, desde la Azotea Norte, Veloria se ve en miniatura. El Lago Miren brilla con la luna. Hay algo en el centro del agua que no es reflejo. Lo mirás un rato. Cuando parás de mirar, ya no está."],

  // ── Feria Nocturna ──
  "feria:unico":   ["Los feriantes de La Vega venden cosas que no tienen nombre claro. Encontrás algo que no sabés para qué es pero que querés igual. El feriante sonríe: 'Eso pasa con los mejores objetos.'"],
  "feria:comida":  ["La comida de la Feria Nocturna viene de todos los barrios de Veloria. La preparación Ribera tiene especias que no encontrás en ningún otro lado. Dos porciones. No te arrepentís."],
  "feria:feriantes":["El feriante que atiende el último puesto lleva años en la Feria pero nunca tiene el mismo puesto dos veces. Hoy está en el rincón. 'Me muevo cuando la ciudad me mueve', dice. No es una explicación. Es suficiente."],

  // ── Centro Cívico ──
  "civico:taller": ["El taller del Centro dura dos horas y toca un tema que no buscabas pero necesitabas. La persona que lo coordina dice algo sobre la memoria de los barrios que te queda dando vueltas el resto del día."],
  "civico:ayuda":  ["Ofrecés dos horas de ayuda en el Centro. No es glamoroso. Es buscar sillas, acomodar cosas, escuchar. Pero cuando terminás hay algo que se siente como haber estado en el lugar correcto."],
  "civico:tablon": ["El tablón del Centro Cívico es un mapa de lo que La Vega necesita y ofrece al mismo tiempo. Entre los avisos hay uno que lleva semanas: *'Se busca alguien que sepa escuchar. Pagan en Velorcitos.'* No tiene número de contacto."],
  "civico:vecinos":["En el Centro conocés a alguien que vive en el mismo edificio hace tres años. Nunca cruzaron más de dos palabras. En veinte minutos de conversación cambia algo de eso."],

  // ── Nuevas autonomías ──
  "aut:lior_help":  ["Lior resolvió el problema solo/a. Pero queda el rastro de que preguntaste. Eso importa más de lo que parece."],
  "aut:lior_ir":    ["Lior tiene el libro abierto y el problema subrayado en rojo. Mirás juntos durante media hora. No resolvés todo, pero desbloquean algo. Al final Lior dice: 'Gracias. No sé cómo devolver esto.' Vos decís: 'Tampoco hace falta.'"],
  "aut:elia_ir":    ["La cosecha en el jardín. Elia coordina con esa eficiencia callada que tienen las personas que aprendieron a trabajar la tierra. Te enseña algo sobre cuándo las plantas están listas que no viene en ningún libro."],
  "aut:elia_tmr":   ["Le decís que vas mañana. Elia asiente. 'Las plantas no apuran', dice."],
  "aut:vael_ir":    ["El proyecto de Vael es exactamente lo que parece y también algo más. Trabajás juntos/as una tarde en el Estudio. Al final hay algo en la pared que no estaba antes y que los dos miraron un rato en silencio."],
  "aut:vael_no":    ["Le decís que no podés ahora. Vael entiende. 'Cuando puedas', dice, y eso no cierra una puerta — la deja entornada."],
  "aut:senia_taller":["Senia abre el taller solo para vos y otras dos personas. Dice que el horno tiene que estar caliente para una técnica que no enseña en los talleres normales. Tres horas. Cuando terminás, la pieza que salió no se parece a ninguna anterior. Senia la mira largo. 'Eso', dice. Nada más."],
  "aut:feria_sobre":["El sobre no tiene remitente. Adentro hay un papel con una sola frase en Twinés: *Otreven mirenal kalei.* Lo que el lago recuerda, puede verse. No sabés quién lo dejó. El feriante que atiende el puesto no estaba ayer."],

  // ── CHOICES: pesca ──
  "fish:cook":   ["Llevás el Mirenpez a casa y lo cocinás como sabés. El resultado es mejor de lo esperado — o quizás es el olor del lago que sigue en tus manos."],
  "fish:sell":   ["En el Muelle, Tomas pesa el pescado sin drama y te pasa los Luces. Eso también es una forma de cerrar el día."],
  "fish:return": ["Lo devolvés al agua. Se pierde rápido, hacia abajo. El lago sabe lo que tiene. Vos también, ahora."],
  "fish:golden": ["El Mirenpez Dorado se mueve en tu mano antes de que lo soltés. Hay un momento en que el mundo parece más grande de lo habitual."],

  // ── CHOICES: cocinar ──
  "cook:solo":   ["La mesa chica, vos solo/a, el plato caliente. Hay una honestidad en comer lo que cocinaste sin testigos."],
  "cook:share":  ["Golpeás la puerta del vecino sin demasiada certeza. Cuando la abre y huele lo que traés, no hace falta decir mucho más."],
  "cook:save":   ["Lo guardás. El apartamento huele bien por horas. Eso ya es bastante."],

  // ── CHOICES: teatro / cine ──
  "show:moved":  ["No sabés exactamente qué te hizo. Pero algo se corrió. Las obras buenas no explican — te dejan con la pregunta."],
  "show:discuss":["La persona con quien terminaste hablando no tenía las mismas conclusiones. Eso también estuvo bien."],
  "show:write":  ["Escribís dos párrafos que no tienen título. No importa. Lo que importa es que están."],
  "movie:drama": ["Salís con esa sensación de que el lago de la película y el Lago Miren son el mismo."],
  "movie:comedy":["Una hora y media de risas. El mundo es más tolerable cuando podés reírte de él."],
  "movie:mystery":["La película sobre el decimotercer fundador no da respuestas. Hace mejores preguntas. Eso es suficiente."],

  // ── CHOICES: investigar ──
  "research:history":["Los registros del Año 1 de Veloria tienen borrones en lugares que no deberían tenerlos. Ciro dice que es humedad. Vos no estás tan seguro/a."],
  "research:lake":   ["Los registros del Lago Miren empiezan en el Año 3. Los dos primeros años no hay ninguno. 'Se perdieron', dice el catálogo. Hay quien dice que no existieron."],
  "research:world":  ["Otherwhen es más grande de lo que cualquier mapa muestra. Las regiones que bordean Veloria tienen nombres que no aparecen en la historia oficial."],

  // ── CHOICES: hobby ──
  "hobby:draw":  ["El dibujo no salió como esperabas. Pero tiene algo que la imagen original no tenía. A veces así es mejor."],
  "hobby:music": ["Una hora de música que no elegiste del todo. Cuando la cosa te elige a vos, algo pasa distinto."],
  "hobby:write": ["El diario crece con cosas que no le contarías a nadie. Eso está bien. No todo tiene que circular."],

  // ── CHOICES: parque / caminata ──
  "park:bird":   ["El Mirelo te llevó por un camino que no estaba en los mapas del parque. Cuando levantás la vista, tardás un momento en saber dónde estás."],
  "park:stranger":["La persona en el banco tenía una historia que no terminó de contarte. Te deja la mitad. Con la mitad se puede hacer algo."],
  "park:continue":["Seguís. El parque termina. La calle empieza. Estuviste en el parque, y eso importa."],

  // ── CHOICES: NPC ──
  "aria:day":    ["Aria habla del café, del barrio, de un Twin que pidió algo que no existía en el menú. 'Le hice igual', dice. Eso te dice algo de Aria."],
  "aria:personal":["Le contás algo que no contaste antes. Aria escucha sin interrumpir. 'Gracias', dice. Solo eso. Es suficiente."],
  "aria:lavega": ["La Vega según Aria: un barrio que se inventó solo. 'Antes de que llegaran los primeros Twins, esto era campo'. Lo dice como si lo recordara."],
  "soren:book":  ["Soren desaparece entre las estanterías y vuelve con algo que no pediste exactamente. 'Esto es lo que necesitás', dice. Rara vez se equivoca."],
  "soren:history":["Soren conoce la historia oficial y la extraoficial. La diferencia entre las dos es más interesante que cualquiera por separado."],
  "soren:chat":  ["Charlás de lo que sea. Soren tiene opinión sobre todo y la dice sin imponerla. Eso es más difícil de lo que parece."],
  "ciro:archives":["Ciro encontró tres registros duplicados del Año 1. Uno tiene firma. Los otros dos no. 'Alguien copió algo', dice. 'O alguien quiso que pareciera así'."],
  "ciro:help":   ["Buscás con Ciro una hora. No encontrás lo que buscabas. Pero encontrás algo que no sabías que existía."],
  "ciro:13th":   ["Ciro baja la voz. 'Hay un contrato', dice. 'La firma está. Pero el nombre está borrado. Por alguien que vino después'. Te mira. No dice más."],
  "oren:fishing":["Oren habla de pesca con ese respeto de quien sabe que no entiende todo. 'El lago decide', dice. 'Vos solo estás ahí'."],
  "oren:lake":   ["'El lago tiene memoria', dice Oren. 'No recuerda todo. Pero lo que recuerda, no lo suelta'. Lo dice mirando el agua, no a vos."],
  "oren:story":  ["Oren cuenta algo sobre su padre. No es larga la historia. Pero cuando termina los dos se quedan callados un momento. Eso también es una historia."],
  "elowen:write":["'No elijo los temas', dice Elowen. 'Los temas me eligen a mí'. Lo dice en serio."],
  "elowen:secret":["Elowen te mira largo antes de responder. 'Veloria no es lo que dicen los libros. Es lo que pasa entre las líneas'. No dice más."],
  "elowen:silence":["Se puede estar en silencio con Elowen sin que sea incómodo. Eso, en Veloria o en cualquier lugar, es un regalo."],

  "intro:llegada_trabajo": ["Llegaste a La Vega con la dirección de una oficina que ya no existe. El primer día en Veloria no fue como lo planeaste. Eso no significa que fuera malo."],
  "intro:llegada_sueno":   ["No había plan. Había una imagen vaga: un lago, una ciudad pequeña, algo que hacer con las manos o la cabeza. Veloria apareció y se sintió como la respuesta a una pregunta que no habías terminado de formular."],
  "intro:llegada_escapar": ["De lo que venías corriendo no importa acá. Veloria no pregunta. La Vega recibe. Eso es suficiente por ahora."],
  "intro:llegada_buscando":["Hay alguien en Veloria. O hubo. O va a haber. No sabés exactamente qué buscás, pero el lago te parece el lugar correcto para empezar."],
  // ── SHOPS ──
  "shop:buy":    ["Lo ponés en la bolsa. La Vega sigue igual. Vos, con algo nuevo en las manos."],
  "shop:book":   ["Salís de la librería con el libro bajo el brazo. Soren te vio irse. Saber que alguien lee lo que recomendás debe ser una satisfacción rara."],
  "shop:pan_comun":       ["El pan está tibio. La panadería huele a Veloria entera.","Lo envolvés en papel. Hay algo honesto en comprar pan, en pagar por algo tan simple y tan necesario."],
  "shop:pan_miren":       ["El pan de algas Miren tiene un sabor que no existía en ningún lugar de donde venís. Salado, suave, extraño. Te gusta."],
  "shop:facturas":        ["Las guardás para mañana, pero sabés que no van a durar tanto.","La caja tiene cinta roja. Adentro, cuatro facturas. Las comés antes de llegar a casa."],
  "shop:torta_velin":     ["Velin dice que solo las hace los domingos. Y hoy es domingo. Eso ya vale la plata."],
  "shop:libro_veloria":   ["Empezás por el principio: los doce fundadores. El índice. La página 347 tiene una nota a mano: *«Hay una firma que no figura en ninguna copia oficial.»*"],
  "shop:libro_pesca":     ["Oren lo escribió. Eso ya te lo dijo Soren. Lo abrís en cualquier página. Hay un dibujo del lago a mano alzada. No se parece al lago real, pero sí se parece a lo que sentís cuando estás en él."],
  "shop:libro_botanica":  ["Las plantas de Otherwhen tienen nombres en Twinés. Algunos coinciden con nombres que ya conocés. Otros no se parecen a nada."],
  "shop:libro_recetas":   ["Las recetas son de otra época. Algunos ingredientes ya no existen. Otros sí, pero se consiguen en el mercado del Casco si sabés preguntar."],
  "shop:novela_miren":    ["La comprás sin leer la contratapa. A veces es mejor así. Cuando llegás a la página 12, entendés por qué Soren la recomendó sin decir nada."],
  "shop:compendio_13":    ["El librito no tiene editorial. La firma dice *V.O.* La última página está en blanco, pero hay marcas de presión. Como si alguien hubiera escrito encima y después arrancara la hoja. O la hubieran arrancado por otro."],
  "shop:ingredientes":    ["Cebolla, ajo, algo verde cuyo nombre no sabés todavía. Suficiente para tres días si cocinás bien."],
  "shop:objeto_unico":    ["El vendedor no sabe de dónde viene. Vos tampoco, pero te lo llevás igual. Hay cosas que no necesitan explicación para tener peso."],
  "shop:tela_miren":      ["La tela del lago se teje con fibra de Mirenpez. El proceso tarda semanas. Tocándola, lo notás."],
  "shop:especias":        ["Abren una dimensión que la comida de la Vega no tenía. Vas a tener que aprender a usarlas."],
  "shop:semillas":        ["Vienen en un sobre marrón. Adentro, tres variedades. En el sobre dice *plantar antes del Mirenal*."],
  "shop:mirenpez_veloer": ["El plato llega sin ceremonia. Nela no habla mientras cocinás. Tampoco mientras servís. El sabor lo dice todo.","Cerrás los ojos con el primer bocado. El lago en un plato. Llevás semanas en Veloria y recién ahora entendés lo que significa."],
  "shop:sopa_miren":      ["Simple, honesta. La sopa te recuerda que no todo tiene que ser elaborado para importar."],
  "shop:cena_completa":   ["Una hora sin mirar el tiempo. Nela sirve despacio. Así debe ser.","Entrada, plato, postre. El restaurante se vacía a tu alrededor y vos seguís ahí. Nela no apura."],
  "shop:postre_veloria":  ["Dulce, pero no demasiado. Como Veloria."],
  "shop:pelicula_drama":  ["Alguien vuelve a Veloria después de años. No reconoce nada. Reconoce todo. Cuando termina, no aplaudís. No podés."],
  "shop:pelicula_comedia":["Todo el mundo se conoce con todo el mundo. Por una hora y media, eso parece suficiente."],
  "shop:pelicula_misterio":["El documental dura 47 minutos. Cuando termina, la sala está en silencio. Alguien detrás tuyo susurra *«sabía que algo no cerraba»*. No preguntás quién."],
  "shop:cerveza_miren":   ["Elaborada con agua del lago. Tiene un gusto que no sabés nombrar todavía."],
  "shop:vino_veloer":     ["Viejo. Serio. El barman sirve sin preguntar. Acá los silencios no son incómodos."],
  "shop:te_miren":        ["Caliente, claro. El té del lago Miren tiene fama de aclarar la cabeza. No sabés si es verdad, pero dormís mejor esa noche."],
  // ── CHOICES ──
  "choice:fish_cook":     ["El Mirenpez va a la sartén. Algo en cocinarlo vos mismo tiene más sabor que cualquier restaurante."],
  "choice:fish_sell":     ["Treinta Luces. El vendedor del mercado no pregunta de dónde viene. El lago tampoco pregunta adónde va el dinero."],
  "choice:fish_return":   ["Lo devolvés al lago. Por un momento, antes de que desaparezca, te parece que te mira. Después el agua cierra encima de todo."],
  "choice:fish_strange":  ["El Mirenpez tiene una escama diferente. Más oscura. Como si algo en el fondo del lago lo hubiera tocado."],
  "choice:cook_simple":   ["Rápido, caliente, suficiente. A veces la comida no necesita ser más que eso."],
  "choice:cook_elaborate":["Una hora en la cocina. La concentración que requiere es casi meditativa. Sale bien. Mejor de lo que esperabas."],
  "choice:cook_share":    ["Llamás a la puerta de al lado. La cara que ponen al abrir y oler es suficiente pago."],
  "choice:park_observe":  ["Tres especies que no conocías. El parque tiene más vida de lo que parece desde afuera."],
  "choice:park_stranger": ["Intercambian diez palabras. No saben los nombres del otro. Está bien así.","Un momento raro, limpio. Dos desconocidos en un banco. Después cada uno sigue su camino."],
  "choice:park_sit":      ["No hacés nada. Es más difícil de lo que parece. Y después, de golpe, más fácil."],
  "choice:lake_secret":   ["El lago no responde. O sí responde, y todavía no sabés escuchar.","Decís algo en voz muy baja. El agua no se mueve. Eso también es una respuesta."],
  "choice:lake_contemplate":["El agua no hace nada. Eso es suficiente.","Mirás el lago largo rato. En algún momento dejás de pensar y solo mirás. Eso era lo que necesitabas."],
  "choice:lake_night":    ["De noche, el lago tiene una luz propia. No es el reflejo de la luna. Es otra cosa. No le preguntás a nadie qué es."],
  "choice:research_history":["Los registros van muy atrás. Veloria existía antes de que nadie la nombrara.","En las actas del año cero hay doce firmas. Y un espacio vacío al final, con la pluma que sangra."],
  "choice:research_science":["Las ciencias naturales de Otherwhen difieren en un punto clave: los ciclos no son anuales. Son de 59 días."],
  "choice:research_13th": ["Ciro te mira desde atrás del mostrador. No dice nada. Pero cuando buscás la página que describe la firma, la hoja está húmeda.","Encontrás tres menciones a *V.O.* en documentos distintos. En todos, el nombre está tachado. No con la misma tinta."],
  "choice:theater_moved": ["La obra te mueve algo que no sabías que tenías ahí. Salís sin hablar."],
  "choice:theater_write": ["Escribís tres páginas en el camino de vuelta. No las vas a releer, pero importaba escribirlas."],
  "choice:theater_discuss":["Hablás con alguien del público en la puerta. No se presentan. Solo hablan de la obra. Es suficiente."],
  "choice:chain_cook_mirenpez":["El Mirenpez que pescaste hoy resulta excepcional en la sartén. La cocina huele diferente cuando el ingrediente vino de tus propias manos."],
  "choice:chain_plant":   ["Las semillas van a la tierra del jardín comunitario. En 5 días, algo. En 10, más."],
  "choice:chain_ciro_13th":["Ciro te busca antes de que llegues al mostrador. *'Viste el documental'*, dice. No es una pregunta."],
};

// ═══════════════════ DATA ═══════════════════
const TRAITS=[
  // ── Mente ──
  {id:"creativo",    cat:"Mente",    emoji:"🎨",label:"Creativo/a",   desc:"Ves el arte donde otros no lo ven.",           effectLabel:"+25% Arte",              bonus:{skillMult:{arte:1.25}}},
  {id:"melancolico", cat:"Mente",    emoji:"🌑",label:"Melancólico/a",desc:"La profundidad de lo que sentís es tu fuerza.", effectLabel:"+15% Arte y Conocimiento",bonus:{skillMult:{arte:1.15,conocimiento:1.15},needDecayMult:{social:1.15}}},
  {id:"curioso",     cat:"Mente",    emoji:"🔍",label:"Curioso/a",    desc:"Cada pregunta lleva a tres más.",               effectLabel:"+20% Conocimiento",       bonus:{skillMult:{conocimiento:1.2}}},
  {id:"artesano",    cat:"Mente",    emoji:"🏺",label:"Artesano/a",   desc:"Las cosas hechas con las manos duran.",         effectLabel:"+15% Arte, +10% Naturaleza",bonus:{skillMult:{arte:1.15,naturaleza:1.1}}},
  // ── Social ──
  {id:"sociable",    cat:"Social",   emoji:"💬",label:"Sociable",     desc:"Los Twins de Veloria te recuerdan.",            effectLabel:"+20% Carisma",            bonus:{skillMult:{carisma:1.2},needDecayMult:{social:0.8}}},
  {id:"empatico",    cat:"Social",   emoji:"💛",label:"Empático/a",   desc:"Sentís lo que sienten los demás.",              effectLabel:"Amistades +30%",          bonus:{friendshipMult:1.3}},
  {id:"generoso",    cat:"Social",   emoji:"🤝",label:"Generoso/a",   desc:"Dar no te cuesta nada. Te viene solo.",         effectLabel:"+10% Carisma, amistades +15%",bonus:{skillMult:{carisma:1.1},friendshipMult:1.15}},
  {id:"romantico",   cat:"Social",   emoji:"🌸",label:"Romántico/a",  desc:"El amor lo afecta todo, para bien o mal.",     effectLabel:"Romance más rápido y profundo",bonus:{romanceMult:1.4}},
  // ── Espíritu ──
  {id:"introvertido",cat:"Espíritu", emoji:"📚",label:"Introvertido/a",desc:"Cargás mejor cuando estás solo/a.",           effectLabel:"+20% Conocimiento, +10% Arte",bonus:{skillMult:{conocimiento:1.2,arte:1.1},needDecayMult:{social:1.2}}},
  {id:"contemplativo",cat:"Espíritu",emoji:"🌊",label:"Contemplativo/a",desc:"Podés quedarte quieto/a más que nadie.",     effectLabel:"+15% Conocimiento",       bonus:{skillMult:{conocimiento:1.15},needDecayMult:{social:0.9,sueno:0.9}}},
  {id:"sensible",    cat:"Espíritu", emoji:"🫧",label:"Sensible",     desc:"Lo que te llega, te llega de verdad.",          effectLabel:"Amistades más rápidas y frágiles",bonus:{friendshipMult:1.25,friendshipLossMult:1.25}},
  {id:"noctambulo",  cat:"Espíritu", emoji:"🌙",label:"Noctámbulo/a", desc:"De noche Veloria te pertenece.",               effectLabel:"+20% XP nocturno",        bonus:{nightXPMult:1.2,needDecayMult:{sueno:0.85}}},
  // ── Carácter ──
  {id:"ambicioso",   cat:"Carácter", emoji:"⭐",label:"Ambicioso/a",  desc:"Sabés lo que querés y cómo llegar.",           effectLabel:"Carrera +25%",            bonus:{careerMult:1.25,skillMult:{carisma:1.1}}},
  {id:"tenaz",       cat:"Carácter", emoji:"💪",label:"Tenaz",        desc:"Lo que empezás, lo terminás.",                 effectLabel:"Carrera +15%, necesidades más lentas",bonus:{careerMult:1.15,needDecayMult:{sueno:0.9,hambre:0.9}}},
  {id:"hogareno",    cat:"Carácter", emoji:"🏠",label:"Hogareño/a",   desc:"Tu espacio es tu templo.",                     effectLabel:"+20% Cocina, hogar +20%", bonus:{skillMult:{cocina:1.2},homeMult:1.2}},
  {id:"aventurero",  cat:"Carácter", emoji:"🌿",label:"Aventurero/a", desc:"El exterior siempre llama.",                   effectLabel:"+25% Naturaleza, +10% Pesca",bonus:{skillMult:{naturaleza:1.25,pesca:1.1}}},
  // ── Naturaleza ──
  {id:"cocinero_nato",cat:"Naturaleza",emoji:"🍳",label:"Cocinero/a nato",desc:"Tu cocina alimenta más que el cuerpo.",   effectLabel:"+40% Cocina, hambre más lento",bonus:{skillMult:{cocina:1.4},needDecayMult:{hambre:0.8}}},
  {id:"pescador_alma",cat:"Naturaleza",emoji:"🎣",label:"Pescador/a de alma",desc:"El lago te entiende mejor que la gente.",effectLabel:"+40% Pesca",             bonus:{skillMult:{pesca:1.4,naturaleza:1.15}}},
];

const ASPIRATIONS=[
  {id:"familia",   emoji:"👨‍👩‍👧",label:"Fundador de familia",  startAge:24,
   desc:"Crear un hogar y un legado que dure más que vos en Veloria.",
   milestones:[
     {id:"m_conocer",  label:"Conocer a alguien",       check:(s)=>Object.values(s.rels).some(r=>r.friendship>=50)},
     {id:"m_enamorar", label:"Enamorarse",               check:(s)=>["dating","engaged","married"].includes(s.family.romanticStatus)},
     {id:"m_casar",    label:"Casarse en Veloria",       check:(s)=>s.family.romanticStatus==="married"},
     {id:"m_hijo",     label:"Tener un hijo/a",          check:(s)=>s.family.children.length>0},
     {id:"m_legado",   label:"Ver crecer a tu hijo/a",   check:(s)=>s.family.children.some(c=>["adolescente","adulto"].includes(getChildStage(s.day-c.birthDay||0)))},
   ]},
  {id:"artista",   emoji:"🎭",label:"Artista de Veloria",    startAge:20,
   desc:"Dejar tu huella creativa en la ciudad para siempre.",
   milestones:[
     {id:"m_arte2",    label:"Arte nivel Aprendiz",       check:(s)=>getSkillLevel(s.skills.arte)>=1},
     {id:"m_vender",   label:"Vender tu primera creación",check:(s)=>s.usedOnce.has("sell_art")},
     {id:"m_exhibir",  label:"Exhibir en la Galería",     check:(s)=>s.usedOnce.has("exhibit")},
     {id:"m_arte5",    label:"Arte nivel Maestro",        check:(s)=>getSkillLevel(s.skills.arte)>=4},
     {id:"m_cael",     label:"Ser reconocido por Cael",   check:(s)=>(s.rels["Cael Sorvei"]?.friendship||0)>=60},
   ]},
  {id:"empresario",emoji:"💼",label:"Empresario/a",           startAge:28,
   desc:"Construir riqueza y reputación en Veloria.",
   milestones:[
     {id:"m_trabajo",  label:"Conseguir un trabajo",      check:(s)=>!!s.career},
     {id:"m_ascenso",  label:"Primer ascenso",            check:(s)=>s.career&&s.career.level>=1},
     {id:"m_ahorro",   label:"Ahorrar 5000 Luces",        check:(s)=>s.money>=5000},
     {id:"m_casa",     label:"Comprar casa propia",       check:(s)=>["casa_pequena","casa_grande"].includes(s.housing)},
     {id:"m_cumbre",   label:"Llegar al tope de carrera", check:(s)=>s.career&&s.career.level>=3},
   ]},
  {id:"alma",      emoji:"🌟",label:"Alma del pueblo",        startAge:22,
   desc:"Conocer a cada Twin de Veloria y ser conocido/a por todos.",
   milestones:[
     {id:"m_5twins",   label:"Conocer 5 Twins",           check:(s)=>Object.keys(s.rels).length>=5},
     {id:"m_prof3",    label:"3 amistades de 40+",        check:(s)=>Object.values(s.rels).filter(r=>r.friendship>=40).length>=3},
     {id:"m_12twins",  label:"Conocer 12 Twins",          check:(s)=>Object.keys(s.rels).length>=12},
     {id:"m_carisma3", label:"Carisma nivel Competente",  check:(s)=>getSkillLevel(s.skills.carisma)>=2},
     {id:"m_velista",  label:"Convertirse en Velista",    check:(s)=>s.usedOnce.has("velista")||getSkillLevel(s.skills.carisma)>=3},
   ]},
  {id:"sabio",     emoji:"📜",label:"Sabio/a de Otherwhen",   startAge:22,
   desc:"Descubrir la verdad sobre Veloria y el decimotercer fundador.",
   milestones:[
     {id:"m_cono2",    label:"Conocimiento Aprendiz",     check:(s)=>getSkillLevel(s.skills.conocimiento)>=1},
     {id:"m_13",       label:"Investigar el 13° fundador",check:(s)=>s.usedOnce.has("research_13")},
     {id:"m_firma",    label:"Encontrar la firma de V.",  check:(s)=>s.usedOnce.has("research_13")&&(s.rels["Ciro Orlen"]?.friendship||0)>=30},
     {id:"m_elowen",   label:"Visitar a Elowen",          check:(s)=>s.usedOnce.has("elowen_home")},
     {id:"m_verdad",   label:"Descifrar el misterio",     check:(s)=>s.usedOnce.has("elowen_home")&&(s.rels["Elowen Sorvei"]?.friendship||0)>=60&&s.usedOnce.has("research_13")},
   ]},
  {id:"libre",     emoji:"🌊",label:"Alma libre",             startAge:21,
   desc:"Sin un camino fijo. Veloria entera es tu mapa.",
   milestones:[
     {id:"m_10lug",    label:"Visitar 10 lugares",        check:(s)=>s.visitedPlaces&&s.visitedPlaces.size>=10},
     {id:"m_3sk3",     label:"3 habilidades nivel III",   check:(s)=>Object.values(s.skills).filter(xp=>getSkillLevel(xp)>=2).length>=3},
     {id:"m_6amig",    label:"6 amistades profundas",     check:(s)=>Object.values(s.rels).filter(r=>r.friendship>=40).length>=6},
     {id:"m_5años",    label:"5 años en Veloria",         check:(s)=>s.day>=150},
     {id:"m_libre",    label:"Encontrar tu lugar",        check:(s)=>["casa_pequena","casa_grande"].includes(s.housing)&&!!s.family.partner},
   ]},
];

const ORIGINS=[
  {id:"vega",   emoji:"🏙",label:"De La Vega",
   lore:"Creciste en el barrio. Lo conocés de noche y de día. La Vega te formó con esa velocidad de los lugares que nunca terminan de inventarse a sí mismos.",
   bonusLabel:"Carisma inicial · Ya conocés a Aria Ven",
   bonus:{skills:{carisma:80},friendship:{"Aria Ven":25},
   item:{name:"Llave vieja del edificio",emoji:"🗝",type:"key",desc:"La llave del apartamento familiar. Hay algo grabado en el metal que no podés leer bien.",qty:1}}},
  {id:"ribera", emoji:"⛵",label:"De Ribera",
   lore:"Creciste cerca del lago. El agua siempre estuvo ahí — como fondo de todo. Ribera forma gente que sabe esperar, y que lee el clima antes de que cambie.",
   bonusLabel:"Pesca y Naturaleza inicial · Ya conocés a Oren Mirende",
   bonus:{skills:{pesca:80,naturaleza:50},friendship:{"Oren Mirende":25},
   item:{name:"Anzuelo antiguo",emoji:"🪝",type:"tool",desc:"El anzuelo que usó tu familia en el Lago Miren. Todavía funciona.",qty:1}}},
  {id:"veleta", emoji:"🎭",label:"De Veleta",
   lore:"El teatro, la biblioteca, los archivos. Creciste entre ideas y preguntas que nadie terminaba de responder del todo. Veleta te enseñó que eso también es una forma de aprender.",
   bonusLabel:"Conocimiento y Arte inicial · Ya conocés a Soren Lume",
   bonus:{skills:{conocimiento:80,arte:50},friendship:{"Soren Lume":25},
   item:{name:"Cuaderno sin terminar",emoji:"📓",type:"book",desc:"Lleno de notas a mitad. Ideas que no terminaron. O sí, pero de otra forma.",qty:1}}},
  {id:"prados", emoji:"🌳",label:"De Los Prados",
   lore:"Espacio, árboles, gente que cuida. Un comienzo tranquilo, de los que no se olvidan. Los Prados es el barrio más silencioso de Veloria — y el silencio también es una forma de ser.",
   bonusLabel:"Naturaleza inicial · Ya conocés a Bren Orlen",
   bonus:{skills:{naturaleza:80},friendship:{"Bren Orlen":25},
   item:{name:"Paquete de Té Miren",emoji:"🍵",type:"food",desc:"El té que tomaba tu familia. Hay quien dice que el Miren recuerda a quién lo toma.",useable:true,qty:3}}},
];
const NEIGHBORHOODS={"La Vega":{emoji:"🏙",color:"#7BB8B9",places:["Tu apartamento","Café de Aria","Terraza","Jardín Comunitario","Panadería Velin","Estudio de Arte","Bar Lumaven","Taller Cerámica","Cine Veloria","Taller de Música"]},"El Casco":{emoji:"🏛",color:"#F5A623",places:["Plaza del Veloer","Librería de Soren","Galería Veloer","Fuente del Veloer","El Mercado del Casco","Casa de Aldric"]},"Ribera":{emoji:"⛵",color:"#4A8B8C",places:["Muelle","Restaurante de Nela","Lago Miren","Puerto Viejo","Faro Miren","La Taberna"]},"Veleta":{emoji:"🎭",color:"#7A5840",places:["Biblioteca","Teatro de Cael","Sala de Ensayos","El Observatorio","Galería Sorvei","Jardín Veleta"]},"Los Prados":{emoji:"🌳",color:"#6B9E5E",places:["Parque","Consultorio de Bren","Campos Miren","Bosque Interior","La Colina","Estanque"]}};
const PLACE_ACTIONS={"Tu apartamento":[{id:"sleep",label:"Dormir",emoji:"🌙",time:8},{id:"cook",label:"Cocinar",emoji:"🍳",time:1},{id:"shower",label:"Ducharse",emoji:"🚿",time:0.5},{id:"bathroom",label:"Baño",emoji:"🚽",time:0.1},{id:"hobby",label:"Practicar hobbie",emoji:"🎨",time:2},{id:"rest",label:"Descansar",emoji:"🛋",time:1}],"Café de Aria":[{id:"coffee",label:"Tomar café",emoji:"☕",time:1,cost:3},{id:"chat_npc",label:"Charlar con Aria",emoji:"💬",time:1,npc:"Aria Ven"},{id:"read_cafe",label:"Leer",emoji:"📖",time:2},{id:"observe",label:"Observar el barrio",emoji:"👁",time:1}],"Terraza":[{id:"terr_amanecer",label:"Ver el amanecer",emoji:"🌅",time:1},{id:"terr_escribir",label:"Escribir o dibujar",emoji:"✍️",time:2},{id:"terr_estrellas",label:"Mirar las estrellas",emoji:"⭐",time:1},{id:"terr_huerto",label:"Cuidar el huerto",emoji:"🌿",time:0.5}],"Tienda de La Vega":[{id:"tienda_basicos",label:"Comprar básicos",emoji:"🛒",time:0.5,cost:15},{id:"tienda_ropa",label:"Mirar ropa",emoji:"👗",time:1},{id:"tienda_charlar",label:"Charlar con el dueño",emoji:"💬",time:1}],"Jardín Comunitario":[{id:"jardin_plantar",label:"Plantar algo",emoji:"🌱",time:2},{id:"jardin_cosechar",label:"Cosechar",emoji:"🥬",time:1},{id:"jardin_pasear",label:"Pasear entre las plantas",emoji:"🌸",time:1},{id:"chat_npc",label:"Hablar con Elia",emoji:"💬",time:1,npc:"Elia Orlen"}],"Panadería Velin":[{id:"pan_comprar",label:"Comprar Pan Velin",emoji:"🥐",time:0.3,cost:5},{id:"pan_desayuno",label:"Desayunar acá",emoji:"☕",time:1,cost:8},{id:"pan_ver_hacer",label:"Ver cómo hacen el pan",emoji:"👀",time:1}],"Estudio de Arte":[{id:"estudio_pintar",label:"Pintar",emoji:"🎨",time:2,cost:5},{id:"estudio_ver",label:"Ver el trabajo de otros",emoji:"🖼",time:1},{id:"estudio_conocer",label:"Conocer artistas",emoji:"💬",time:1},{id:"estudio_tecnica",label:"Practicar técnica",emoji:"✏️",time:3},{id:"chat_npc",label:"Hablar con Vael",emoji:"🎨",time:1,npc:"Vael Lumaren"}],"Bar Lumaven":[{id:"bar_lumaven",label:"Tomar un Lumaven",emoji:"🥂",time:1,cost:8},{id:"bar_musica",label:"Escuchar música en vivo",emoji:"🎵",time:2},{id:"bar_conocer",label:"Conocer gente",emoji:"💬",time:1},{id:"bar_mirone",label:"Jugar al Mirone",emoji:"🃏",time:1.5},{id:"chat_npc",label:"Hablar con Luma",emoji:"🎸",time:1,npc:"Luma Sorvei"}],"Mercadillo":[{id:"merc_unico",label:"Buscar objetos únicos",emoji:"🛍",time:1},{id:"merc_frescos",label:"Comprar frescos",emoji:"🥬",time:0.5,cost:12},{id:"merc_charlar",label:"Charlar con vendedores",emoji:"💬",time:1}],"Gimnasio Miren":[{id:"gym_entrenar",label:"Entrenar",emoji:"💪",time:1.5},{id:"gym_natacion",label:"Clases de natación",emoji:"🏊",time:2,cost:10}],
"Taller Cerámica":[{id:"cerc_moldear",label:"Moldear arcilla",emoji:"🏺",time:2},{id:"cerc_ver",label:"Ver el trabajo de otros",emoji:"👁",time:1},{id:"cerc_torno",label:"Intentar el torno",emoji:"⭕",time:1.5},{id:"chat_npc",label:"Hablar con Senia",emoji:"🤝",time:1,npc:"Senia Vel"}],
"Cine Veloria":[{id:"cine_ver",label:"Ver una película",emoji:"🎬",time:2.5,cost:20},{id:"cine_charlar",label:"Charlar en el hall",emoji:"💬",time:1},{id:"cine_dormido",label:"Quedarse dormido/a",emoji:"😴",time:2}],
"Taller de Música":[{id:"musica_tocar",label:"Tocar junto a otros",emoji:"🎸",time:2},{id:"musica_clase",label:"Escuchar una clase",emoji:"🎵",time:1},{id:"musica_impro",label:"Improvisar",emoji:"🎶",time:1.5},{id:"chat_npc",label:"Hablar con Vael",emoji:"🎨",time:1,npc:"Vael Lumaren"}],
"La Bodega":[{id:"bodega_probar",label:"Probar Miren Seco",emoji:"🍷",time:1,cost:15},{id:"bodega_historia",label:"Escuchar una historia",emoji:"👂",time:1},{id:"bodega_contar",label:"Contar tu historia",emoji:"💬",time:1},{id:"chat_npc",label:"Charlar con Lior",emoji:"🗣",time:1,npc:"Lior Veloer"}],
"Micro Parque":[{id:"parque2_pasto",label:"Tirarse en el pasto",emoji:"🌱",time:1},{id:"parque2_leer",label:"Leer al sol",emoji:"📖",time:1.5},{id:"parque2_pajaros",label:"Observar los Mirelos",emoji:"🐦",time:0.5}],
"Azotea Norte":[{id:"azotea2_lago",label:"Contemplar el lago",emoji:"🏔",time:1},{id:"azotea2_dibujar",label:"Dibujar el horizonte",emoji:"✏️",time:2},{id:"azotea2_estrellas",label:"Ver las estrellas",emoji:"🌟",time:1}],
"Feria Nocturna":[{id:"feria_unico",label:"Buscar objetos únicos",emoji:"🛍",time:1},{id:"feria_comida",label:"Probar comida de feria",emoji:"🍢",time:0.5,cost:12},{id:"feria_feriantes",label:"Charlar con feriantes",emoji:"💬",time:1},{id:"chat_npc",label:"Encontrar a Luma",emoji:"🎸",time:1,npc:"Luma Sorvei"}],
"Centro Cívico":[{id:"civico_taller",label:"Ir a un taller",emoji:"🧠",time:2},{id:"civico_ayuda",label:"Ofrecer ayuda",emoji:"🤲",time:2},{id:"civico_tablon",label:"Ver el tablón",emoji:"📋",time:0.5},{id:"civico_vecinos",label:"Conocer vecinos",emoji:"💬",time:1}],"Plaza del Veloer":[{id:"walk_plaza",label:"Pasear",emoji:"🚶",time:1},{id:"market",label:"Explorar el mercado",emoji:"🛒",time:1},{id:"chat_npc",label:"Hablar con Aldric",emoji:"💬",time:1,npc:"Aldric Veloer"}],"Librería de Soren":[{id:"browse_books",label:"Explorar libros",emoji:"📚",time:1},{id:"chat_npc",label:"Hablar con Soren",emoji:"💬",time:1,npc:"Soren Lume"},{id:"buy_book",label:"Comprar un libro",emoji:"📘",time:0.5,cost:15}],"Muelle":[{id:"fish",label:"Pescar",emoji:"🎣",time:3},{id:"chat_npc",label:"Hablar con Oren",emoji:"⛵",time:1,npc:"Oren Mirende"},{id:"sit_lake",label:"Contemplar el lago",emoji:"🌊",time:1}],"Restaurante de Nela":[{id:"eat_dish",label:"Mirenpez al Veloer",emoji:"🐟",time:1.5,cost:35},{id:"chat_npc",label:"Charlar con Nela",emoji:"💬",time:1,npc:"Nela Mirende"},{id:"cena",label:"Cena completa",emoji:"🍷",time:2,cost:55}],"Lago Miren":[{id:"swim",label:"Nadar",emoji:"🏊",time:2},{id:"secret_lake",label:"Contarle un secreto al lago",emoji:"🌊",time:0.5},{id:"walk_shore",label:"Caminar por la orilla",emoji:"🌅",time:1}],"Biblioteca":[{id:"research",label:"Investigar historia de Veloria",emoji:"📜",time:2},{id:"chat_npc",label:"Hablar con Ciro",emoji:"📖",time:1,npc:"Ciro Orlen"},{id:"read_lib",label:"Leer en silencio",emoji:"📚",time:2}],"Teatro de Cael":[{id:"watch_show",label:"Ver una obra",emoji:"🎭",time:2.5,cost:25},{id:"chat_npc",label:"Hablar con Cael",emoji:"🎬",time:1,npc:"Cael Sorvei"}],"Parque":[{id:"walk_park",label:"Caminar entre los árboles",emoji:"🌳",time:1},{id:"picnic",label:"Picnic al sol",emoji:"🧺",time:2}],"Consultorio de Bren":[{id:"checkup",label:"Consulta médica",emoji:"⚕️",time:1,cost:40},{id:"chat_npc",label:"Conversar con Bren",emoji:"💊",time:1,npc:"Bren Orlen"}],
"Campos Miren":[{id:"walk_park",label:"Caminar por los campos",emoji:"🌾",time:1},{id:"parque2_pajaros",label:"Observar aves",emoji:"🐦",time:0.5},{id:"picnic",label:"Picnic en el campo",emoji:"🧺",time:1.5}],
"Bosque Interior":[{id:"walk_park",label:"Sendero del bosque",emoji:"🌲",time:1.5},{id:"parque2_pajaros",label:"Escuchar el bosque",emoji:"🍃",time:0.5},{id:"parque2_pasto",label:"Descansar entre árboles",emoji:"🌱",time:1}],
"La Colina":[{id:"azotea2_lago",label:"Vista al lago Miren",emoji:"🏔",time:1},{id:"parque2_leer",label:"Leer en la colina",emoji:"📖",time:1.5},{id:"azotea2_estrellas",label:"Contemplar estrellas",emoji:"🌟",time:1}],
"Estanque":[{id:"sit_lake",label:"Sentarse al estanque",emoji:"🦆",time:1},{id:"parque2_pajaros",label:"Observar patos",emoji:"🦢",time:0.5},{id:"parque2_pasto",label:"Descansar junto al agua",emoji:"💧",time:1}],
"Galería Veloer":[{id:"estudio_ver",label:"Ver la exposición",emoji:"🖼",time:1.5},{id:"chat_npc",label:"Hablar con Aldric",emoji:"🤝",time:1,npc:"Aldric Veloer"},{id:"sell_art",label:"Ofrecer obra propia",emoji:"🎨",time:1}],
"Fuente del Veloer":[{id:"walk_plaza",label:"Sentarse en la fuente",emoji:"⛲",time:0.5},{id:"observe",label:"Ver pasar la gente",emoji:"👀",time:1},{id:"civico_vecinos",label:"Conocer vecinos",emoji:"💬",time:1}],
"El Mercado del Casco":[{id:"merc_frescos",label:"Comprar en el mercado",emoji:"🧅",time:0.5},{id:"merc_unico",label:"Buscar objetos únicos",emoji:"🛍",time:1},{id:"merc_charlar",label:"Charlar con los puestos",emoji:"💬",time:1}],
"Casa de Aldric":[{id:"chat_npc",label:"Visitar a Aldric",emoji:"🤝",time:1,npc:"Aldric Veloer"},{id:"read_lib",label:"Leer sus archivos",emoji:"📜",time:2},{id:"observe",label:"Escuchar sus historias",emoji:"👂",time:1.5}],
"Sala de Ensayos":[{id:"musica_tocar",label:"Practicar música",emoji:"🎸",time:2},{id:"musica_clase",label:"Ensayo grupal",emoji:"🎼",time:1.5},{id:"chat_npc",label:"Hablar con Vael",emoji:"🎨",time:1,npc:"Vael Lumaren"}],
"El Observatorio":[{id:"azotea2_estrellas",label:"Observar las estrellas",emoji:"🔭",time:2},{id:"research",label:"Consultar registros astronómicos",emoji:"📚",time:1.5},{id:"azotea2_lago",label:"Ver el lago desde lo alto",emoji:"🏔",time:1}],
"Galería Sorvei":[{id:"estudio_ver",label:"Ver la exposición",emoji:"🖼",time:1},{id:"exhibit",label:"Proponer obra propia",emoji:"🎨",time:1},{id:"chat_npc",label:"Hablar con Elowen",emoji:"📖",time:1,npc:"Elowen Sorvei"}],
"Jardín Veleta":[{id:"walk_park",label:"Caminar por el jardín",emoji:"🌷",time:1},{id:"parque2_pasto",label:"Descansar entre flores",emoji:"🌸",time:1},{id:"parque2_pajaros",label:"Observar mariposas",emoji:"🦋",time:0.5}],
"Puerto Viejo":[{id:"walk_shore",label:"Caminar por el muelle viejo",emoji:"⚓",time:1},{id:"observe",label:"Ver los barcos",emoji:"🚢",time:0.5},{id:"chat_npc",label:"Hablar con Tomas",emoji:"🤝",time:1,npc:"Tomas Mirende"}],
"Faro Miren":[{id:"azotea2_lago",label:"Vista desde el faro",emoji:"🔦",time:1},{id:"azotea2_estrellas",label:"Ver el lago de noche",emoji:"🌙",time:1},{id:"research",label:"Leer el registro del faro",emoji:"📓",time:1.5}],
"La Taberna":[{id:"bodega_historia",label:"Escuchar historias",emoji:"👂",time:1},{id:"bodega_contar",label:"Contar tu historia",emoji:"💬",time:1},{id:"chat_npc",label:"Hablar con Riven",emoji:"⛵",time:1,npc:"Riven Lumaren"}]};
const BASE_EFFECTS={sleep:{sueno:70,hambre:-15,vejiga:-20},cook:{hambre:45,diversion:10},shower:{higiene:55},bathroom:{vejiga:90},rest:{sueno:15,diversion:8},hobby:{diversion:35},coffee:{hambre:8,diversion:12},read_cafe:{diversion:20},read_lib:{diversion:20},observe:{diversion:10,social:5},walk_plaza:{diversion:15,social:8},market:{diversion:10},browse_books:{diversion:15},buy_book:{diversion:10},fish:{diversion:25},sit_lake:{diversion:22},swim:{higiene:-10,diversion:35},secret_lake:{diversion:18,social:5},walk_shore:{diversion:18},eat_dish:{hambre:60,diversion:25,social:8},cena:{hambre:80,diversion:30,social:12},research:{diversion:15},watch_show:{diversion:40,social:15},walk_park:{diversion:15},picnic:{hambre:30,diversion:25},checkup:{},work_shift:{sueno:-20,social:-10,diversion:-15,higiene:-10},event_attend:{diversion:40,social:30,hambre:-10},
// ── Nuevos ──
cerc_moldear:{diversion:30},cerc_ver:{diversion:15},cerc_torno:{diversion:25},
cine_ver:{diversion:40,social:5},cine_charlar:{social:18,diversion:8},cine_dormido:{sueno:20,diversion:15},
musica_tocar:{diversion:30,social:10},musica_clase:{diversion:20},musica_impro:{diversion:35},
bodega_probar:{social:12,diversion:15},bodega_historia:{social:18,diversion:10},bodega_contar:{social:22,diversion:12},
parque2_pasto:{sueno:8,diversion:20},parque2_leer:{diversion:18},parque2_pajaros:{diversion:15},
azotea2_lago:{diversion:22},azotea2_dibujar:{diversion:28},azotea2_estrellas:{diversion:20},
feria_unico:{diversion:18},feria_comida:{hambre:25,diversion:15},feria_feriantes:{social:15,diversion:10},
civico_taller:{diversion:15,social:10},civico_ayuda:{social:20,diversion:10},civico_tablon:{diversion:8},civico_vecinos:{social:22,diversion:8},
// ── Gym ──
gym_entrenar:{higiene:-15,diversion:20,sueno:-5},gym_natacion:{higiene:-10,diversion:30},
// ── La Vega existentes ──
terr_amanecer:{diversion:20},terr_escribir:{diversion:25},terr_estrellas:{diversion:20},terr_huerto:{diversion:12,naturaleza_boost:true},
tienda_basicos:{hambre:10},tienda_ropa:{diversion:12},tienda_charlar:{social:12,diversion:8},
jardin_plantar:{diversion:20},jardin_cosechar:{hambre:15,diversion:18},jardin_pasear:{diversion:15},
pan_comprar:{hambre:20},pan_desayuno:{hambre:35,diversion:18,social:8},pan_ver_hacer:{diversion:12},
estudio_pintar:{diversion:30},estudio_ver:{diversion:18},estudio_conocer:{social:15,diversion:8},estudio_tecnica:{diversion:25},
bar_lumaven:{social:18,diversion:25},bar_musica:{diversion:30,social:10},bar_conocer:{social:22,diversion:12},bar_mirone:{social:20,diversion:20},
merc_unico:{diversion:15},merc_frescos:{hambre:15},merc_charlar:{social:12},
};
const NEED_CFG={hambre:{label:"Hambre",emoji:"🍽",color:"#E8943A"},sueno:{label:"Sueño",emoji:"😴",color:"#7B8CDE"},higiene:{label:"Higiene",emoji:"🧼",color:"#4AB8C1"},social:{label:"Social",emoji:"💬",color:"#E87B9E"},diversion:{label:"Diversión",emoji:"🎮",color:"#A67BD6"},vejiga:{label:"Vejiga",emoji:"💧",color:"#6BC47E"}};
const MONTHS=["Nevelin","Mirenal","Nomeven","Mirenable","Velorfesta","Solein","Velcora","Memoveli","Clubven","Noctuvel","Mireneis","Nevelin II"];
const SEASONS=["🌸 Primavera","🌸 Primavera","🌸 Primavera","☀️ Verano","☀️ Verano","☀️ Verano","🍂 Otoño","🍂 Otoño","🍂 Otoño","❄️ Invierno","❄️ Invierno","❄️ Invierno"];

const TWIN_COLORS=["#F5A623","#E85D75","#00BCD4","#7B5CF5","#3BA55C","#E86D3A","#5B8AF5","#E8B45C"];

const LLEGADA_OPTIONS=[
  {id:"trabajo",  emoji:"💼",label:"Una oportunidad de trabajo",  hint:"Veloria ofrecía lo que necesitabas hacer.", bonusSkill:"carisma", bonusVal:60},
  {id:"sueno",    emoji:"🌙",label:"Un sueño que seguir",          hint:"No sabías bien qué. Pero sabías que acá estaba.", bonusSkill:"arte", bonusVal:60},
  {id:"escapar",  emoji:"🚪",label:"Algo de lo que alejarte",      hint:"Veloria era lejos suficiente.", bonusSkill:"conocimiento", bonusVal:50},
  {id:"buscando", emoji:"🔍",label:"Alguien a quien encontrar",    hint:"Una promesa vieja. O nueva. Todavía no sabés.", bonusSkill:"carisma", bonusVal:40},
];

// ── NPC ECONOMY & WORLD ──────────────────────────────────
const NPC_JOBS={
  "Aria Ven":      {job:"Dueña del Café de Aria",      dailySalary:85},
  "Oren Mirende":  {job:"Pescador",                     dailySalary:62},
  "Soren Lume":    {job:"Librero",                      dailySalary:70},
  "Bren Orlen":    {job:"Médico",                       dailySalary:125},
  "Ciro Orlen":    {job:"Bibliotecario",                dailySalary:72},
  "Elowen Sorvei": {job:"Escritora",                    dailySalary:55},
  "Aldric Veloer": {job:"Historiador de Veloria",       dailySalary:95},
  "Nela Mirende":  {job:"Chef y restaurantera",         dailySalary:100},
  "Vael Lumaren":  {job:"Músico y profesor",            dailySalary:65},
  "Tomas Mirende": {job:"Pescador del Puerto Viejo",    dailySalary:58},
  "Lior Veloer":   {job:"Comerciante",                  dailySalary:78},
  "Siv Norven":    {job:"Artesana",                     dailySalary:60},
  "Riven Lumaren": {job:"Barman en Lumaven",            dailySalary:55},
};

const NPC_STARTING_DATA={
  "Aria Ven":      {age:26, luces:340,  partner:null, children:[], isAlive:true},
  "Oren Mirende":  {age:44, luces:820,  partner:null, children:[], isAlive:true},
  "Soren Lume":    {age:29, luces:520,  partner:null, children:[], isAlive:true},
  "Bren Orlen":    {age:38, luces:1240, partner:null, children:[], isAlive:true},
  "Ciro Orlen":    {age:55, luces:1800, partner:null, children:[], isAlive:true},
  "Elowen Sorvei": {age:33, luces:480,  partner:null, children:[], isAlive:true},
  "Aldric Veloer": {age:62, luces:2200, partner:null, children:[], isAlive:true},
  "Nela Mirende":  {age:40, luces:950,  partner:null, children:[], isAlive:true},
  "Vael Lumaren":  {age:25, luces:280,  partner:null, children:[], isAlive:true},
  "Tomas Mirende": {age:50, luces:680,  partner:null, children:[], isAlive:true},
  "Lior Veloer":   {age:31, luces:560,  partner:null, children:[], isAlive:true},
  "Siv Norven":    {age:28, luces:320,  partner:null, children:[], isAlive:true},
  "Riven Lumaren": {age:27, luces:290,  partner:null, children:[], isAlive:true},
};

const VELORIA_CHILD_NAMES=[
  "Liren","Vela","Sael","Lorin","Tiven","Kaen","Ruen","Alven","Sorel",
  "Niven","Caela","Voren","Lumen","Thaen","Risel","Naeven","Coral","Iver","Sela",
  "Orel","Tira","Varen","Lumis","Cairen","Sovin","Naele","Imara","Sehr","Veli","Auren",
];

// ── SHOPS ──────────────────────────────────────────────
const SHOPS={
  "panaderia":{name:"Panadería Velin",emoji:"🥐",items:[
    {id:"pan_comun",    name:"Pan del día",          emoji:"🍞",price:8,  desc:"Tibio. Huele a Veloria entera.",          effectLabel:"+Hambre 25",  effects:{need:"hambre",val:25}},
    {id:"pan_miren",    name:"Pan de algas Miren",   emoji:"🌿",price:15, desc:"Especialidad de la Vega. Sabor único.",   effectLabel:"+Hambre 35 +Naturaleza XP",effects:{need:"hambre",val:35,skill:"naturaleza",xp:10}},
    {id:"facturas",     name:"Facturas",             emoji:"🥐",price:12, desc:"Para el desayuno. O para ahora.",         effectLabel:"+Hambre 30",  effects:{need:"hambre",val:30,need2:"diversion",val2:5}},
    {id:"torta_velin",  name:"Torta Velin",          emoji:"🎂",price:35, desc:"Solo los domingos. Te la guardó.",        effectLabel:"+Hambre 50 +Diversión 15",effects:{need:"hambre",val:50,need2:"diversion",val2:15}},
  ]},
  "libreria":{name:"Librería de Soren",emoji:"📚",items:[
    {id:"libro_veloria", name:"Historia de Veloria — Tomo I",emoji:"📜",price:45,desc:"Los doce fundadores. Hay una nota a mano en la p.347.",effectLabel:"+Conocimiento 80 XP",effects:{skill:"conocimiento",xp:80}},
    {id:"libro_pesca",   name:"El Arte del Lago Miren",      emoji:"🎣",price:35,desc:"Lo escribió Oren. Hay un dibujo del lago que no se parece, pero sí.",effectLabel:"+Pesca 60 XP",effects:{skill:"pesca",xp:60}},
    {id:"libro_botanica",name:"Flora de Otherwhen",          emoji:"🌿",price:40,desc:"Las plantas del mundo. Los nombres en Twinés.",effectLabel:"+Naturaleza 70 XP",effects:{skill:"naturaleza",xp:70}},
    {id:"libro_recetas", name:"Cocina del Veloer",           emoji:"🍳",price:30,desc:"Recetas de otra época. Algunos ingredientes se consiguen.",effectLabel:"+Cocina 60 XP",effects:{skill:"cocina",xp:60}},
    {id:"novela_miren",  name:"El Lago y la Niña",           emoji:"📖",price:25,desc:"Una novela. Dicen que es autobiográfica.",effectLabel:"+Diversión 30 +Conocimiento 20",effects:{need:"diversion",val:30,skill:"conocimiento",xp:20}},
    {id:"compendio_13",  name:"El Decimotercero",            emoji:"🔍",price:80,desc:"Un librito autoeditado. La firma dice V.O. La última hoja falta.",effectLabel:"+Conocimiento 120 XP ✦ Lore",effects:{skill:"conocimiento",xp:120,chainUnlock:"chain_ciro_13th"}},
  ]},
  "mercado":{name:"El Mercado del Casco",emoji:"🛒",items:[
    {id:"ingredientes",  name:"Ingredientes frescos",emoji:"🧅",price:20,desc:"Para cocinar esta semana. Cebolla, ajo, algo verde.",effectLabel:"+Cocina XP",effects:{skill:"cocina",xp:10}},
    {id:"objeto_unico",  name:"Objeto sin nombre",  emoji:"🧿",price:55,desc:"El vendedor no sabe de dónde viene.",effectLabel:"+Diversión 20",effects:{need:"diversion",val:20}},
    {id:"tela_miren",    name:"Tela del lago",      emoji:"🧵",price:40,desc:"Tejida con fibra de Mirenpez. Tarda semanas en producirse.",effectLabel:"+Arte 40 XP",effects:{skill:"arte",xp:40}},
    {id:"especias",      name:"Especias del sur",   emoji:"🌶",price:25,desc:"Hacen que todo sepa diferente.",effectLabel:"+Cocina 25 XP",effects:{skill:"cocina",xp:25}},
    {id:"semillas",      name:"Semillas Veloria",   emoji:"🌱",price:18,desc:"Tres variedades. Plantar antes del Mirenal.",effectLabel:"+Naturaleza XP ✦ Cadena",effects:{skill:"naturaleza",xp:20,chainUnlock:"chain_plant"}},
  ]},
  "restaurante":{name:"Restaurante de Nela",emoji:"🍽",items:[
    {id:"mirenpez_veloer",type:"meal",name:"Mirenpez al Veloer",emoji:"🐟",price:35,desc:"La especialidad. El lago en un plato.",effectLabel:"+Hambre 60 +Diversión 20",effects:{need:"hambre",val:60,need2:"diversion",val2:20}},
    {id:"sopa_miren",    name:"Sopa del lago",     emoji:"🥣",price:22,desc:"Simple, honesta. Lo que necesita ser.",effectLabel:"+Hambre 45",effects:{need:"hambre",val:45}},
    {id:"cena_completa", name:"Cena completa",     emoji:"🍷",price:55,desc:"Entrada, plato y postre. Una hora lenta.",effectLabel:"+Hambre 70 +Social 15 +Diversión 25",effects:{need:"hambre",val:70,need2:"social",val2:15,need3:"diversion",val3:25}},
    {id:"postre_veloria",type:"meal",name:"Postre Veloria",    emoji:"🍮",price:18,desc:"Solo para terminar bien.",effectLabel:"+Diversión 25 +Hambre 15",effects:{need:"diversion",val:25,need2:"hambre",val2:15}},
  ]},
  "cine":{name:"Cine Veloria",emoji:"🎬",items:[
    {id:"pelicula_drama",   name:"La Otra Orilla",     emoji:"🎭",price:25,desc:"Drama. Alguien vuelve a Veloria después de años. No reconoce nada. Reconoce todo.",effectLabel:"+Diversión 40 +Conocimiento 20",effects:{need:"diversion",val:40,skill:"conocimiento",xp:20}},
    {id:"pelicula_comedia", name:"Verano en el Casco", emoji:"😄",price:25,desc:"Comedia. Todo el mundo se conoce con todo el mundo.",effectLabel:"+Diversión 35 +Social 20",effects:{need:"diversion",val:35,need2:"social",val2:20}},
    {id:"pelicula_misterio",type:"experience",name:"El Decimotercero",   emoji:"🔍",price:25,desc:"Documental. Sobre la firma tachada del Acta de la Llegada. La sala queda en silencio.",effectLabel:"+Diversión 30 +Conocimiento 40 ✦ Cadena",effects:{need:"diversion",val:30,skill:"conocimiento",xp:40,chainUnlock:"chain_ciro_13th"}},
  ]},
  "bar":{name:"Bar Lumaven",emoji:"🍺",items:[
    {id:"cerveza_miren",name:"Cerveza del lago",emoji:"🍺",price:15,desc:"Elaborada con agua del Miren. Tiene un gusto sin nombre.",effectLabel:"+Social 20 +Diversión 10",effects:{need:"social",val:20,need2:"diversion",val2:10}},
    {id:"vino_veloer",  name:"Vino del Veloer", emoji:"🍷",price:28,desc:"Viejo. Serio. El barman sirve sin preguntar.",effectLabel:"+Social 15 +Diversión 20",effects:{need:"social",val:15,need2:"diversion",val2:20}},
    {id:"te_miren",     name:"Té Miren",        emoji:"🫖",price:10,desc:"Para los que no toman alcohol. Aclara la cabeza.",effectLabel:"+Diversión 15 +Sueño",effects:{need:"diversion",val:15,need2:"sueno",val2:10}},
  ]},
};

// ── SHOP TRIGGERS: qué acción abre qué tienda ──────────
const SHOP_TRIGGERS={
  "pan_comprar":"panaderia","buy_food":"panaderia",
  "buy_book":"libreria","browse_books":"libreria",
  "merc_frescos":"mercado","merc_unico":"mercado",
  "eat_dish":"restaurante","cena":"restaurante",
  "cine_ver":"cine",
  "bodega_historia":"bar",
};

// ── CHOICE EVENTS: qué acción genera elección ──────────
const CHOICE_EVENTS={
  "fish":({skills})=>{
    const lvl=SKILL_LEVELS.filter(l=>l.xp<=(skills.pesca||0)).length;
    return {
      title:"Lo sacás del agua.",
      subtitle:lvl>=3?"Un Mirenpez grande. Muy bueno.":"Un Mirenpez. Te mira.",
      options:[
        {id:"fish_cook",  emoji:"🍳",label:"Cocinarlo en casa",     hint:"Vas a necesitar estar en tu apartamento",effects:{chainUnlock:"chain_cook_mirenpez",narrative:"choice:fish_cook"}},
        {id:"fish_sell",  emoji:"💰",label:"Venderlo en el mercado",hint:`+L ${15+lvl*8} según tu nivel de Pesca`,   effects:{money:15+lvl*8,narrative:"choice:fish_sell"}},
        {id:"fish_return",emoji:"🌊",label:"Devolverlo al lago",     hint:"Algo en vos siente que es lo correcto",   effects:{need:"diversion",val:20,skill:"naturaleza",xp:15,narrative:"choice:fish_return"}},
      ]
    };
  },
  "cook":()=>({
    title:"¿Qué cocinás?",
    subtitle:"La cocina huele bien desde que abriste la hornalla.",
    options:[
      {id:"cook_simple",   emoji:"🥚",label:"Algo rápido",          hint:"Simple pero suficiente",    effects:{need:"hambre",val:35,skill:"cocina",xp:15,narrative:"choice:cook_simple"}},
      {id:"cook_elaborate",emoji:"🍲",label:"Algo elaborado",        hint:"+Cocina XP. Tarda más.",   effects:{need:"hambre",val:55,skill:"cocina",xp:50,need2:"diversion",val2:10,narrative:"choice:cook_elaborate"}},
      {id:"cook_share",    emoji:"🤝",label:"Para compartir",        hint:"Un vecino lo va a agradecer",effects:{need:"hambre",val:25,skill:"carisma",xp:25,narrative:"choice:cook_share"}},
    ]
  }),
  "walk_park":()=>({
    title:"El parque a esta hora.",
    subtitle:"¿Cómo lo pasás?",
    options:[
      {id:"park_observe", emoji:"🐦",label:"Observar pájaros",       hint:"+Naturaleza XP",            effects:{need:"diversion",val:20,skill:"naturaleza",xp:30,narrative:"choice:park_observe"}},
      {id:"park_stranger",emoji:"👋",label:"Hablar con alguien",      hint:"Un momento inesperado",     effects:{need:"social",val:30,skill:"carisma",xp:20,narrative:"choice:park_stranger"}},
      {id:"park_sit",     emoji:"☀️",label:"Sentarse y no hacer nada",hint:"A veces lo mejor",           effects:{need:"diversion",val:35,need2:"sueno",val2:15,narrative:"choice:park_sit"}},
    ]
  }),
  "sit_lake":()=>({
    title:"El lago Miren.",
    subtitle:"El agua está quieta. Siempre está quieta.",
    options:[
      {id:"lake_secret",     emoji:"🤫",label:"Contarle un secreto al lago",hint:"El lago guarda todo",  effects:{need:"social",val:15,need2:"diversion",val2:20,narrative:"choice:lake_secret"}},
      {id:"lake_contemplate",emoji:"🌊",label:"Solo mirar el agua",          hint:"+Sueño +Diversión",  effects:{need:"diversion",val:30,need2:"sueno",val2:20,narrative:"choice:lake_contemplate"}},
      {id:"lake_night",      emoji:"🌙",label:"Esperar hasta que anochezca", hint:"La luz del lago es otra de noche",effects:{need:"diversion",val:25,skill:"naturaleza",xp:20,narrative:"choice:lake_night"}},
    ]
  }),
  "research":()=>({
    title:"¿En qué te metés?",
    subtitle:"La biblioteca tiene más de lo que parece a primera vista.",
    options:[
      {id:"research_history", emoji:"📜",label:"Historia de Veloria",       hint:"A veces aparece algo que no debería estar ahí",effects:{skill:"conocimiento",xp:50,narrative:"choice:research_history"}},
      {id:"research_science", emoji:"🔬",label:"Ciencias de Otherwhen",     hint:"+Conocimiento +Naturaleza",                    effects:{skill:"conocimiento",xp:30,skill2:"naturaleza",xp2:20,narrative:"choice:research_science"}},
      {id:"research_13th",    emoji:"🔍",label:"El decimotercero fundador", hint:"Ciro está detrás del mostrador",                effects:{skill:"conocimiento",xp:65,chainUnlock:"chain_ciro_13th",narrative:"choice:research_13th"}},
    ]
  }),
  "watch_show":()=>({
    title:"La función termina.",
    subtitle:"Las luces vuelven lentamente.",
    options:[
      {id:"theater_moved",   emoji:"🎭",label:"Te quedás en silencio",             hint:"+Diversión. Algo se mueve adentro",effects:{need:"diversion",val:25,skill:"arte",xp:30,narrative:"choice:theater_moved"}},
      {id:"theater_discuss", emoji:"💬",label:"Hablar con alguien del público",   hint:"+Social +Carisma XP",              effects:{need:"social",val:25,skill:"carisma",xp:25,narrative:"choice:theater_discuss"}},
      {id:"theater_write",   emoji:"✏️",label:"Escribir algo en el camino de vuelta",hint:"+Arte XP. Necesitás sacarlo.",   effects:{skill:"arte",xp:45,need2:"diversion",val2:15,narrative:"choice:theater_write"}},
    ]
  }),
  "walk_shore":()=>({
    title:"La orilla del lago.",
    subtitle:"El agua toca los pies si te acercás.",
    options:[
      {id:"lake_contemplate",emoji:"🌊",label:"Caminar sin destino",     hint:"El lago acompaña",        effects:{need:"diversion",val:25,need2:"sueno",val2:10,narrative:"choice:lake_contemplate"}},
      {id:"lake_secret",     emoji:"🌿",label:"Recoger piedras del fondo",hint:"+Naturaleza XP",         effects:{skill:"naturaleza",xp:25,need2:"diversion",val2:15,narrative:"choice:lake_secret"}},
    ]
  }),
  "watch_show":()=>({
    title:"La función termina.",
    subtitle:"Las luces vuelven lentamente. Algo quedó en el aire.",
    options:[
      {id:"theater_moved",   emoji:"🎭",label:"Te quedás en silencio",               hint:"Algo se movió adentro. +Arte XP",         effects:{need:"diversion",val:30,skill:"arte",xp:35,narrative:"choice:theater_moved"}},
      {id:"theater_discuss", emoji:"💬",label:"Hablás con alguien del público",      hint:"+Social +Carisma",                        effects:{need:"social",val:30,skill:"carisma",xp:25,need2:"diversion",val2:15,narrative:"choice:theater_discuss"}},
      {id:"theater_write",   emoji:"✏️",label:"Escribís algo en el camino de vuelta",hint:"Necesitabas sacarlo. +Arte XP",          effects:{skill:"arte",xp:50,need2:"diversion",val2:20,narrative:"choice:theater_write"}},
    ]
  }),
  "bodega_contar":()=>({
    title:"Esta noche contás tu historia.",
    subtitle:"El bar tiene ese silencio que invita a hablar.",
    options:[
      {id:"tell_veloria",  emoji:"🏙",label:"Cómo llegaste a Veloria",              hint:"+Social. El bar escucha.",                 effects:{need:"social",val:35,skill:"carisma",xp:20,narrative:"choice:park_stranger"}},
      {id:"tell_secret",   emoji:"🤫",label:"Algo que nunca le contaste a nadie",   hint:"El Lumaven lo sella.",                    effects:{need:"social",val:40,need2:"diversion",val2:15,narrative:"choice:lake_secret"}},
      {id:"tell_nothing",  emoji:"🍺",label:"Al final no decís nada, solo escuchás",hint:"A veces escuchar es suficiente.",          effects:{need:"social",val:20,need2:"diversion",val2:20,narrative:"choice:park_sit"}},
    ]
  }),
};

// ── NPC DIALOGUES: lo que le dicen al jugador y cómo responder ──
const NPC_DIALOGUES={
  "Aria Ven":[
    {id:"aria_1",minFr:0,
      npcSays:"El café está solo hoy. ¿Cómo te va adaptando a la Vega?",
      options:[
        {id:"honest",  emoji:"😌",label:"Con honestidad — todavía me estoy acomodando",  hint:"La verdad siempre cae bien.",  effects:{fr:10,need:"social",val:20,narrative:"npc:aria_honest"}},
        {id:"positive",emoji:"☀️",label:"Bien — Veloria es más linda de lo que esperaba", hint:"+Amistad +Social",             effects:{fr:14,need:"social",val:25,narrative:"npc:aria_positive"}},
        {id:"curious", emoji:"🔍",label:"Bien, aunque tengo preguntas sobre el barrio",   hint:"Aria conoce cada rincón.",     effects:{fr:12,need:"social",val:20,narrative:"npc:aria_curious"}},
      ]},
    {id:"aria_2",minFr:30,
      npcSays:"Sé que venís seguido. No todos lo hacen. ¿Qué es lo que buscás cuando venís acá?",
      options:[
        {id:"coffee",  emoji:"☕",label:"El café. Está muy bueno, la verdad.",             hint:"Aria sonríe.",                effects:{fr:10,need:"social",val:15}},
        {id:"company", emoji:"💬",label:"La compañía. El café es solo la excusa.",          hint:"Eso la toca de verdad.",      effects:{fr:22,need:"social",val:30,narrative:"npc:aria_company"}},
        {id:"routine", emoji:"🔄",label:"Rutina. Necesito un lugar que sea siempre igual.", hint:"Lo entiende perfectamente.",  effects:{fr:16,need:"social",val:20,narrative:"npc:aria_routine"}},
      ]},
    {id:"aria_3",minFr:60,
      npcSays:"Te voy a decir algo que no le digo a mucha gente. Yo no soy de acá tampoco. Vine hace seis años y nunca me fui.",
      options:[
        {id:"stay",    emoji:"🤔",label:"¿Por qué te quedaste?",                           hint:"+Amistad. Lore de Veloria.",   effects:{fr:22,skill:"conocimiento",xp:20,narrative:"npc:aria_stay"}},
        {id:"similar", emoji:"🤝",label:"Yo también vine sin saber si me iba a quedar.",    hint:"Un momento de conexión real.", effects:{fr:28,need:"social",val:35,narrative:"npc:aria_similar"}},
        {id:"veloria", emoji:"✨",label:"Veloria hace eso. No sé cómo, pero lo hace.",      hint:"Las dos miran el lago un segundo.",effects:{fr:18,need:"social",val:25}},
      ]},
  ],
  "Soren Lume":[
    {id:"soren_1",minFr:0,
      npcSays:"¿Buscás algo específico o solo mirás?",
      options:[
        {id:"history",   emoji:"📜",label:"Algo sobre la historia de Veloria.",            hint:"+Conocimiento XP.",            effects:{fr:14,skill:"conocimiento",xp:25,narrative:"npc:soren_history"}},
        {id:"browse",    emoji:"📚",label:"Solo mirar. A veces el libro correcto te encuentra.", hint:"Asiente como si fuera la respuesta correcta.",effects:{fr:10,need:"social",val:12,narrative:"npc:soren_browse"}},
        {id:"recommend", emoji:"🤝",label:"¿Qué me recomendás vos?",                       hint:"La pregunta que más le gusta.", effects:{fr:18,need:"social",val:18,narrative:"npc:soren_recommend"}},
      ]},
    {id:"soren_2",minFr:35,
      npcSays:"Notaste que hay un libro en la estantería de atrás sin precio. ¿Lo viste?",
      options:[
        {id:"ask",   emoji:"🔍",label:"Sí. ¿Por qué no tiene precio?",                    hint:"Lore. Soren se detiene antes de responder.",effects:{fr:20,skill:"conocimiento",xp:30,narrative:"npc:soren_book"}},
        {id:"offer", emoji:"💰",label:"¿Cuánto querés por él?",                            hint:"La respuesta lo decepciona un poco.",       effects:{fr:6,need:"social",val:5,narrative:"npc:soren_nosell"}},
        {id:"wait",  emoji:"✋",label:"Lo vi, pero asumí que era personal.",               hint:"Lo aprecia. Paciencia.",                    effects:{fr:14,need:"social",val:12}},
      ]},
    {id:"soren_3",minFr:62,
      npcSays:"Hay algo sobre el decimotercero fundador que no sale en ningún libro publicado. Lo encontré en una nota que vino dentro de un libro de segunda mano.",
      options:[
        {id:"listen",   emoji:"👂",label:"Contame.",                                       hint:"Lore mayor. +Conocimiento XP.", effects:{fr:32,skill:"conocimiento",xp:65,chainUnlock:"chain_ciro_13th",narrative:"npc:soren_13th"}},
        {id:"careful",  emoji:"🤫",label:"¿Estás seguro de que querés contármelo?",        hint:"Soren aprecia la discreción.",  effects:{fr:22,skill:"conocimiento",xp:30,narrative:"npc:soren_careful"}},
        {id:"compare",  emoji:"🔍",label:"Sé un poco del tema. ¿Qué encontraste vos?",    hint:"+Conocimiento. Requiere haber investigado antes.",effects:{fr:26,skill:"conocimiento",xp:50,narrative:"npc:soren_compare"}},
      ]},
  ],
  "Bren Orlen":[
    {id:"bren_1",minFr:0,
      npcSays:"No es frecuente que alguien venga a charlar sin un motivo médico. ¿Cómo estás durmiendo?",
      options:[
        {id:"dreams",emoji:"😴",label:"Bien, aunque con sueños raros desde que llegué.",   hint:"Bren anota algo.",             effects:{fr:12,need:"sueno",val:8,narrative:"npc:bren_dreams"}},
        {id:"fine",  emoji:"🙂",label:"Bien. ¿Por qué lo preguntás?",                      hint:"Respuesta directa.",           effects:{fr:8,need:"social",val:10}},
        {id:"bad",   emoji:"😓",label:"No muy bien. Mucho en la cabeza.",                  hint:"La honestidad siempre lo alcanza.",effects:{fr:18,need:"sueno",val:12,narrative:"npc:bren_honest"}},
      ]},
    {id:"bren_2",minFr:42,
      npcSays:"Hay un objeto en mi escritorio que no sé qué es. Lo encontré entre las cosas de mi bisabuelo. Te lo muestro si prometés no preguntar de dónde viene.",
      options:[
        {id:"promise",emoji:"🤞",label:"Prometido. Mostrámelo.",                            hint:"Lore mayor. La llave del Otreven.",effects:{fr:28,skill:"conocimiento",xp:50,chainUnlock:"chain_ciro_13th",narrative:"npc:bren_key"}},
        {id:"ask",   emoji:"🔍",label:"¿Por qué no sabés qué es?",                         hint:"+Conocimiento. Bren piensa.",  effects:{fr:16,skill:"conocimiento",xp:22,narrative:"npc:bren_why"}},
        {id:"wait",  emoji:"✋",label:"Si preferís guardarlo, lo entiendo.",                hint:"Lo aprecia. La confianza crece lento.", effects:{fr:14,need:"social",val:10}},
      ]},
  ],
  "Ciro Orlen":[
    {id:"ciro_1",minFr:0,
      npcSays:"La mayoría de las personas que vienen a preguntar sobre los fundadores hacen las mismas preguntas. Usted ya parece tener preguntas distintas.",
      options:[
        {id:"13th",   emoji:"🔍",label:"¿Qué sabe sobre el decimotercero?",                hint:"Lore. Ciro se pone serio.",    effects:{fr:18,skill:"conocimiento",xp:35,narrative:"npc:ciro_13th"}},
        {id:"modest", emoji:"📚",label:"Solo soy curioso. ¿Qué suele preguntar la gente?", hint:"+Conocimiento general.",      effects:{fr:12,skill:"conocimiento",xp:18,narrative:"npc:ciro_common"}},
        {id:"direct", emoji:"📜",label:"La firma del Acta de la Llegada. La tachada.",      hint:"Directo al punto.",           effects:{fr:22,skill:"conocimiento",xp:50,narrative:"npc:ciro_signature"}},
      ]},
    {id:"ciro_2",minFr:32,
      npcSays:"Tengo tres documentos con las iniciales V.O., todos tachados con la misma tinta. Esa tinta no puede ser datada. Eso no debería ser posible.",
      options:[
        {id:"ink",   emoji:"🔬",label:"¿Por qué no puede ser datada?",                     hint:"+Conocimiento. Ciro nunca tuvo audiencia.",effects:{fr:22,skill:"conocimiento",xp:38,narrative:"npc:ciro_ink"}},
        {id:"vo",    emoji:"🔍",label:"¿Quién era V.O.?",                                  hint:"La pregunta que Ciro no puede responder.",  effects:{fr:22,skill:"conocimiento",xp:42,narrative:"npc:ciro_vo"}},
        {id:"theory",emoji:"💡",label:"Tal vez alguien no quiere que se sepa cuándo fue escrito.", hint:"Ciro deja de moverse.",effects:{fr:28,skill:"conocimiento",xp:55,narrative:"npc:ciro_theory"}},
      ]},
  ],
  "Oren Mirende":[
    {id:"oren_1",minFr:0,
      npcSays:"Llevás unos días en Veloria. ¿Ya fuiste al lago?",
      options:[
        {id:"yes",  emoji:"🌊",label:"Sí. Es diferente a lo que esperaba.",               hint:"Oren asiente como si lo supiera.",effects:{fr:14,need:"social",val:18,narrative:"npc:oren_yes"}},
        {id:"no",   emoji:"🤔",label:"Todavía no. ¿Vale la pena?",                        hint:"La respuesta tarda.",            effects:{fr:10,need:"social",val:12,narrative:"npc:oren_no"}},
        {id:"night",emoji:"🌙",label:"De noche sí. Vi algo en el agua.",                  hint:"Lore. Oren te mira diferente.",  effects:{fr:28,skill:"naturaleza",xp:25,narrative:"npc:oren_night"}},
      ]},
    {id:"oren_2",minFr:35,
      npcSays:"Mi viejo me dijo algo antes de morir: 'El lago sabe quién sos. No quién pretendés ser.' Nunca entendí bien qué quiso decir.",
      options:[
        {id:"think",  emoji:"💭",label:"Quizás el lago te ve sin defensas.",               hint:"+Social. Charla larga.",         effects:{fr:22,need:"social",val:25,narrative:"npc:oren_lake"}},
        {id:"father", emoji:"🔍",label:"¿Y tu viejo cruzó el lago alguna vez?",            hint:"Lore. Oren tarda en responder.", effects:{fr:28,skill:"conocimiento",xp:35,narrative:"npc:oren_father"}},
        {id:"accept", emoji:"🌊",label:"A veces las cosas no necesitan explicación.",       hint:"Lo entendés.",                  effects:{fr:16,need:"social",val:18}},
      ]},
  ],
  "Elowen Sorvei":[
    {id:"elowen_1",minFr:0,
      npcSays:"Estoy escribiendo algo. Todavía no sé si es una novela o un documento histórico. Probablemente las dos cosas.",
      options:[
        {id:"ask",    emoji:"📖",label:"¿Sobre qué?",                                      hint:"+Conocimiento. Ella espera la pregunta.",effects:{fr:14,skill:"conocimiento",xp:18,narrative:"npc:elowen_topic"}},
        {id:"relate", emoji:"💭",label:"A veces las dos cosas son lo mismo.",               hint:"Una idea que no tuvo antes.",   effects:{fr:18,need:"social",val:18,narrative:"npc:elowen_both"}},
        {id:"offer",  emoji:"👁",label:"¿Necesitás que alguien lo lea?",                   hint:"La oferta más valiosa.",         effects:{fr:20,skill:"conocimiento",xp:22,narrative:"npc:elowen_offer"}},
      ]},
    {id:"elowen_2",minFr:50,
      npcSays:"El capítulo que más me cuesta es el del cruce. Cómo describir algo que nadie vio y del que todos hablan.",
      options:[
        {id:"what",   emoji:"🔍",label:"¿Qué cruce?",                                      hint:"Lore mayor.",                   effects:{fr:22,skill:"conocimiento",xp:40,narrative:"npc:elowen_crossing"}},
        {id:"craft",  emoji:"✏️",label:"Quizás describís lo que quedó, no lo que fue.",    hint:"+Arte XP. Ella anota eso.",     effects:{fr:28,skill:"arte",xp:35,narrative:"npc:elowen_craft"}},
        {id:"confirm",emoji:"📜",label:"¿Estás escribiendo sobre el decimotercero?",        hint:"Lore. Activa cadena.",           effects:{fr:32,skill:"conocimiento",xp:55,chainUnlock:"chain_ciro_13th",narrative:"npc:elowen_confirm"}},
      ]},
  ],
  "Nela Mirende":[
    {id:"nela_1",minFr:0,
      npcSays:"Hoy cocinamos Mirenpez. ¿Sabés de dónde vienen los que uso?",
      options:[
        {id:"oren",   emoji:"⛵",label:"¿Del lago? ¿Los trae Oren?",                       hint:"Conexión de NPCs.",             effects:{fr:12,need:"social",val:14,narrative:"npc:nela_oren"}},
        {id:"guess",  emoji:"🌊",label:"Del Lago Miren, supongo.",                          hint:"Correcto, pero simple.",        effects:{fr:9,need:"social",val:10}},
        {id:"curious",emoji:"👂",label:"No sé. Contame.",                                  hint:"La respuesta que más le gusta.",effects:{fr:16,need:"social",val:18,narrative:"npc:nela_story"}},
      ]},
    {id:"nela_2",minFr:40,
      npcSays:"Hay una receta que no está en el menú. Solo la hago cuando veo que alguien la necesita. ¿Querés probarla?",
      options:[
        {id:"yes",    emoji:"🍽",label:"Sí, sin dudarlo.",                                  hint:"+Hambre máximo. Experiencia única.",effects:{fr:28,need:"hambre",val:75,need2:"diversion",val2:35,narrative:"npc:nela_secret"}},
        {id:"ask",    emoji:"🤔",label:"¿Cómo sabés cuándo alguien la necesita?",           hint:"+Social. Respuesta inesperada.", effects:{fr:22,need:"social",val:25,narrative:"npc:nela_how"}},
        {id:"menu",   emoji:"📜",label:"Prefiero la carta de hoy.",                         hint:"Nela sonríe y no insiste.",      effects:{fr:8,need:"social",val:8}},
      ]},
  ],
};

// Narrativas para respuestas de NPC
const N_NPC={
  "npc:aria_honest":   ["Aria asiente despacio. 'La Vega tarda. No es un barrio que se entrega rápido.' Hay algo en cómo lo dice que suena a experiencia propia."],
  "npc:aria_positive": ["Le gusta escucharlo. 'Eso le digo a todos los que vienen: dale dos semanas. Después no te vas.'"],
  "npc:aria_curious":  ["'Preguntá lo que quieras', dice. 'Si no lo sé yo, lo sabe alguien en este café.'"],
  "npc:aria_company":  ["Aria deja la taza en la barra. No dice nada. Pero cuando te vas, el café está en la cuenta de la casa."],
  "npc:aria_routine":  ["'Eso entiendo perfectamente', dice. 'Por eso abrí un café y no una librería.'"],
  "npc:aria_stay":     ["'Me quedé porque el lago me miró una vez y supe que ya no había apuro.' Hace una pausa. 'Sonará raro.' No suena raro."],
  "npc:aria_similar":  ["'¿Y?' pregunta. 'Ya sabés si te quedás.' No es una pregunta."],
  "npc:soren_history": ["Soren desaparece detrás de una estantería. Vuelve con tres libros. 'Por dónde querés empezar.'"],
  "npc:soren_browse":  ["'La mayoría dice eso', responde. 'Pero los que dicen eso terminan comprando el libro que más necesitaban y no sabían.'"],
  "npc:soren_recommend":["Soren se detiene. Nadie le pregunta eso. Tarda un momento. Después saca un libro fino sin título en el lomo."],
  "npc:soren_book":    ["'Porque si le pongo precio, alguien lo compra. Y ese libro no es para cualquiera.' Pausa. 'Todavía no sé si es para vos.'"],
  "npc:soren_nosell":  ["'No está en venta.' No hay más explicación."],
  "npc:soren_13th":    ["Soren cierra la puerta de la librería. Saca una hoja doblada de un libro sin título. Dice: 'V. Orlen firmó voluntariamente. Y también se fue voluntariamente. La diferencia es importante.'"],
  "npc:soren_careful": ["'Sí.' No duda. 'Porque si no lo cuento, desaparece conmigo.'"],
  "npc:soren_compare": ["'¿Sabés algo del tema?' Soren te mira diferente a partir de ese momento. La conversación que sigue dura una hora."],
  "npc:bren_dreams":   ["'Todos sueñan raro al principio. Veloria tiene algo.' No da más detalles. Escribe algo en su cuaderno."],
  "npc:bren_honest":   ["'Bien.' Bren sirve dos tazas de té sin preguntar. 'El Té Miren ayuda. No sé por qué, pero ayuda.'"],
  "npc:bren_key":      ["Bren abre un cajón. Saca algo pequeño, metálico, de forma imposible de describir con precisión. 'Era de mi bisabuelo. No sé qué abre.'"],
  "npc:bren_why":      ["'Porque no se parece a nada que hayamos fabricado en Veloria. Ni en Otherwhen, diría.' Lo deja sobre el escritorio entre los dos."],
  "npc:ciro_13th":     ["Ciro baja la voz aunque están solos. 'Sé que su firma fue tachada la misma noche de la Llegada. Lo que no sé es quién lo hizo ni por qué la tinta no envejece.'"],
  "npc:ciro_common":   ["'Preguntan cuántos fundadores hubo. Doce, les digo. Y después espero que me pregunten por qué en el Acta hay trece líneas.'"],
  "npc:ciro_signature":["Ciro deja de respirar un segundo. 'Muy poca gente llega a esa pregunta sola.'"],
  "npc:ciro_ink":      ["'Eso es lo que me quita el sueño', dice. 'La tinta existe. Se puede analizar. Pero todos los análisis dicen que no tiene edad. Como si no hubiera pasado el tiempo sobre ella.'"],
  "npc:ciro_vo":       ["'No lo sé. Y llevo doce años buscándolo.' Se para. 'Lo que sé es que su familia sigue en Veloria. Y que algunos de ellos tampoco lo saben.'"],
  "npc:ciro_theory":   ["Ciro se queda quieto. 'Eso es exactamente lo que creo. Pero decirlo en voz alta asusta.'"],
  "npc:oren_yes":      ["'¿Y bien?' No pregunta qué viste. Solo eso. Como si el resto ya lo supiera."],
  "npc:oren_no":       ["Oren tarda. 'Andá de noche. La primera vez que fui de noche tenía diecisiete años. No lo olvidé más.' No dice qué vio."],
  "npc:oren_night":    ["Oren te mira de otra manera. 'Pocos lo ven la primera vez.' Pausa larga. 'Menos aún la segunda.'"],
  "npc:oren_lake":     ["'Puede ser eso', dice Oren. 'O puede ser que el lago simplemente sabe más que nosotros.'"],
  "npc:oren_father":   ["'Cruzó una vez.' Larga pausa. 'Volvió. Pero no me dijo nunca qué había del otro lado. Solo dijo que había algo.'"],
  "npc:elowen_topic":  ["'El Otreven. Lo que está del otro lado del lago. Y lo que hubo aquí antes de que nadie lo llamara Veloria.'"],
  "npc:elowen_both":   ["Se detiene. Saca su libreta. 'Eso lo pongo en la introducción.'"],
  "npc:elowen_offer":  ["Elowen cierra la libreta despacio. 'Sí. Pero solo si después me decís qué sentiste al leerlo, no qué pensaste.'"],
  "npc:elowen_crossing":["'El cruce del decimotercero fundador. El que se fue voluntariamente. Lo que no sé es adónde.'"],
  "npc:elowen_craft":  ["Elowen escribe eso exactamente en su libreta. 'Gracias. Llevaba semanas sin saber cómo empezarlo.'"],
  "npc:elowen_confirm": ["Un silencio largo. 'Sí. Y cuando termine, no sé si voy a poder publicarlo.'"],
  "npc:nela_oren":     ["'Exacto. Oren los trae cada mañana. Nunca le pregunté cómo los elige. Creo que los elige el lago.'"],
  "npc:nela_story":    ["'Del lago, sí. Pero no de cualquier parte del lago. Del sector que nadie pesca. Oren lo llama el fondo del olvido. No sé por qué.'"],
  "npc:nela_secret":   ["Nela cocina en silencio durante veinte minutos. El resultado no tiene nombre en el menú. Al comerlo, algo en el pecho se afloja."],
  "npc:nela_how":      ["'No sé cómo saberlo', dice Nela. 'Simplemente... se nota. Como cuando el lago está quieto de más.'"],
};
const CHAIN_ACTIONS={
  "chain_cook_mirenpez":{
    emoji:"🍳",label:"Cocinar el Mirenpez",
    hint:"Tenés un Mirenpez fresco en casa",
    requiredPlace:"Tu apartamento",
    action:{id:"chain_cook_mirenpez",label:"Cocinar el Mirenpez",emoji:"🍳",time:1.5},
    narrative:"choice:chain_cook_mirenpez",
    effects:{need:"hambre",val:65,skill:"cocina",xp:60,need2:"diversion",val2:20},
  },
  "chain_plant":{
    emoji:"🌱",label:"Plantar las semillas",
    hint:"Tenés semillas para el jardín comunitario",
    requiredPlace:"Jardín Comunitario",
    action:{id:"chain_plant",label:"Plantar las semillas",emoji:"🌱",time:1},
    narrative:"choice:chain_plant",
    effects:{skill:"naturaleza",xp:50,need:"diversion",val:20},
  },
  "chain_ciro_13th":{
    emoji:"🔍",label:"Hablar con Ciro sobre el 13°",
    hint:"Ciro tiene algo que decirte",
    requiredPlace:null,
    action:{id:"chain_ciro_13th",label:"Hablar con Ciro",emoji:"🔍",time:1},
    narrative:"choice:chain_ciro_13th",
    effects:{skill:"conocimiento",xp:80,narrative:"choice:research_13th"},
    npc:"Ciro Orlen",
  },
  "chain_objeto_misterioso":{
    emoji:"🧿",label:"Investigar el objeto sin nombre",
    hint:"El objeto tiene algo que no tiene ningún otro",
    requiredPlace:null,
    action:{id:"chain_objeto_misterioso",label:"Investigar el objeto",emoji:"🧿",time:1.5},
    narrative:"choice:research_13th",
    effects:{skill:"conocimiento",xp:50,chainUnlock:"chain_ciro_13th"},
  },
  "chain_tela":{
    emoji:"🧵",label:"Crear algo con la tela",
    hint:"La tela del lago espera en el Estudio de Arte",
    requiredPlace:"Estudio de Arte",
    action:{id:"chain_tela",label:"Crear algo con la tela",emoji:"🎨",time:2},
    narrative:"choice:theater_write",
    effects:{skill:"arte",xp:85,need:"diversion",val:25},
  },
  "chain_nela_recipe":{
    emoji:"🍳",label:"Aprender la receta de Nela",
    hint:"Nela ofreció enseñarte su receta secreta",
    requiredPlace:"Restaurante de Nela",
    action:{id:"chain_nela_recipe",label:"Aprender la receta",emoji:"🍳",time:2},
    narrative:"npc:nela_secret",
    effects:{skill:"cocina",xp:100,need:"hambre",val:60,need2:"diversion",val2:40},
  },
};

// ── ITEM USE EFFECTS: qué hace cada item del inventario ──
const ITEM_USE_EFFECTS={
  "libro_veloria":  {skill:"conocimiento",xp:80, consume:true, narrative:"read:libro_veloria"},
  "libro_pesca":    {skill:"pesca",       xp:60, consume:true, narrative:"read:libro_pesca"},
  "libro_botanica": {skill:"naturaleza",  xp:70, consume:true, narrative:"read:libro_botanica"},
  "libro_recetas":  {skill:"cocina",      xp:60, consume:true, narrative:"read:libro_recetas"},
  "novela_miren":   {skill:"conocimiento",xp:20, need:"diversion",val:30, consume:true, narrative:"read:novela_miren"},
  "compendio_13":   {skill:"conocimiento",xp:120,consume:true, chainUnlock:"chain_ciro_13th", narrative:"read:compendio_13"},
  "pan_comun":      {need:"hambre",val:25, consume:true},
  "pan_miren":      {need:"hambre",val:35, skill:"naturaleza",xp:10, consume:true},
  "facturas":       {need:"hambre",val:30, need2:"diversion",val2:5, consume:true},
  "torta_velin":    {need:"hambre",val:50, need2:"diversion",val2:15, consume:true},
  "mirenpez_fresco":{chainUnlock:"chain_cook_mirenpez", consume:true, narrative:"item:mirenpez_fresco"},
  "cerveza_miren":  {need:"social",val:20, need2:"diversion",val2:10, consume:true},
  "vino_veloer":    {need:"social",val:15, need2:"diversion",val2:20, consume:true},
  "te_miren":       {need:"diversion",val:15, need2:"sueno",val2:10, consume:true},
  "objeto_unico":   {chainUnlock:"chain_objeto_misterioso", consume:true, narrative:"use:objeto_unico"},
  "tela_miren":     {chainUnlock:"chain_tela", consume:false, narrative:"use:tela_miren"},
  "especias":       {skill:"cocina",xp:25, consume:true},
  "ingredientes":   {skill:"cocina",xp:10, consume:true},
  "semillas":       {chainUnlock:"chain_plant", consume:true, narrative:"choice:chain_plant"},
};

// ── NPC GIFT PREFERENCES ────────────────────────────────
const NPC_GIFT_PREFS={
  "Aria Ven":      {loved:["torta_velin","flores","pan_miren"],       liked:["facturas","te_miren","cerveza_miren"],  neutral:["pan_comun"]},
  "Soren Lume":    {loved:["compendio_13","novela_miren"],            liked:["libro_veloria","libro_botanica","libro_recetas","libro_pesca"], neutral:["tela_miren"]},
  "Oren Mirende":  {loved:["libro_pesca"],                            liked:["cerveza_miren","te_miren"],             neutral:["pan_comun"]},
  "Bren Orlen":    {loved:["semillas","libro_botanica"],              liked:["te_miren","libro_veloria"],             neutral:["pan_comun"]},
  "Nela Mirende":  {loved:["libro_recetas","especias"],               liked:["ingredientes","tela_miren"],            neutral:["semillas"]},
  "Elowen Sorvei": {loved:["novela_miren","compendio_13"],            liked:["libro_veloria","tela_miren"],           neutral:["te_miren"]},
  "Ciro Orlen":    {loved:["compendio_13","libro_veloria"],           liked:["objeto_unico"],                         neutral:["te_miren"]},
  "Vael Lumaren":  {loved:["vino_veloer","cerveza_miren"],            liked:["tela_miren","libro_recetas"],           neutral:["te_miren"]},
  "Tomas Mirende": {loved:["libro_pesca","cerveza_miren"],            liked:["te_miren"],                            neutral:["pan_comun"]},
  "Aldric Veloer": {loved:["libro_veloria","compendio_13"],           liked:["vino_veloer"],                         neutral:["te_miren"]},
};

// Combos especiales: NPC + item → efectos extra
const SPECIAL_GIFT_EFFECTS={
  "Soren Lume:compendio_13":  {chainUnlock:"chain_ciro_13th", repBonus:5},
  "Ciro Orlen:compendio_13":  {chainUnlock:"chain_ciro_13th", repBonus:5},
  "Nela Mirende:libro_recetas":{chainUnlock:"chain_nela_recipe", repBonus:4},
  "Oren Mirende:libro_pesca": {repBonus:5},
};

// Narrativas de regalos
const N_GIFTS={
  "gift:neutral":  ["Lo recibe con una sonrisa educada. 'Gracias', dice. Y lo guarda."],
  "gift:liked":    ["Sus ojos se iluminan antes de que diga nada. 'No tenías que hacerlo.' Pero claramente está contento/a.","Lo recibe con ambas manos. Pequeño gesto. Importa."],
  "gift:loved":    ["Por un momento no dice nada. Solo mira el regalo. Después te mira a vos. 'Esto... gracias. De verdad.'","Hay un silencio antes de la respuesta. El tipo de silencio que vale más que las palabras."],
  "gift:disliked": ["Hace el mejor esfuerzo del mundo. 'Qué detalle', dice. Pero la incomodidad no se puede esconder del todo."],
  "gift:aria_torta_velin": ["Aria mira la torta. Después te mira a vos. 'Velin solo hace estas para alguien que le importa al que las encarga.' Pausa larga. 'Gracias.'"],
  "gift:soren_compendio_13": ["Soren lo abre de inmediato. Lee tres páginas en silencio. Cierra el libro. 'Hay algo en la página 31 que no había visto antes. Necesito releer todo.'"],
  "gift:soren_novela_miren": ["'La leí tres veces', dice Soren. 'Cada vez entiendo algo distinto.' Pausa. 'Que me la des vos tiene algo que me parece importante.'"],
  "gift:oren_libro_pesca": ["Oren lo mira. Lo da vuelta. Lo mira de nuevo. 'Este libro lo escribí yo.' Silencio largo. '¿Dónde lo conseguiste?'"],
  "gift:nela_libro_recetas": ["Nela lo hojea despacio. Se detiene en una página. 'Esta receta... mi abuela la hacía así.' Cierra el libro con cuidado. 'Gracias. No tenés idea de cuánto.'"],
  "gift:nela_especias": ["'¿Del sur?' pregunta, oliendo las especias. 'Estas son las del puesto especial del Casco.' Te mira. 'Ya sabés más de Veloria de lo que creés.'"],
  "gift:bren_semillas": ["Bren las examina una por una. 'Veloria original', dice. 'Estas no se consiguen fácil.' Las guarda con más cuidado del habitual."],
  "gift:ciro_compendio_13": ["Ciro lo abre y toca la última página — la en blanco — con la punta del dedo. 'Alguien escribió acá y arrancó la hoja.' Pausa. 'O se la arrancaron.'"],
  "gift:elowen_novela_miren": ["Elowen la sostiene con las dos manos. 'Esta novela es la razón por la que empecé a escribir', dice. 'No me preguntés por qué no la tenía.'"],
  "gift:vael_cerveza_miren": ["Vael destapa la cerveza, toma un sorbo, y dice: 'Si alguna vez necesitás que toque en algún lado, avisame.' Lo dice en serio."],
  "gift:ciro_libro_veloria": ["Ciro lo abre en la página del índice. 'Hay una línea acá que siempre me pareció rara', dice. Te la señala: *Completo en trece volúmenes.*"],
  // Book readings
  "read:libro_veloria":  ["El libro empieza con los doce fundadores. En la última página del tomo I, una nota a mano: 'El que falta sigue contando.' Sin firma.","Los registros van muy atrás. En el índice: *Completo en trece volúmenes.* En ningún lado se menciona un tomo XIII."],
  "read:libro_pesca":    ["Lo escribió Oren. En el margen de la última página, una nota: 'Solo pesca de noche quien ya no tiene miedo.'","Un tratado que lee como poesía. El dibujo del lago en la página 23 no se parece al lago real, pero sí a lo que sentís cuando estás en él."],
  "read:libro_botanica": ["Las plantas de Otherwhen tienen nombres en Twinés. Capítulo sobre el Lago Miren: 'La flora del fondo, cuando existe, no ha sido catalogada.'"],
  "read:libro_recetas":  ["La receta de la sopa del lago tiene una variante marcada con asterisco: '*Solo funciona si el Mirenpez fue devuelto antes.*'","Recetas de otra época. Algunas usan ingredientes que ya no se consiguen — salvo en el puesto especial del Casco."],
  "read:novela_miren":   ["En el penúltimo capítulo: 'El lago no me reconoció. Yo sí lo reconocí a él. Creo que eso es lo importante.'"],
  "read:compendio_13":   ["47 páginas. La última arrancada. La página 46, última frase completa: 'V.O. no cruzó por accidente. Cruzó sabiendo que no había vuelta para todos.'"],
  "use:objeto_unico":    ["El objeto no tiene nombre porque no corresponde a nada que se haya fabricado en Veloria. Ni probablemente en Otherwhen. Sostenerlo hace que el tiempo se sienta un poco distinto."],
  "use:tela_miren":      ["La tela entre tus manos tiene una textura que no se parece a nada. Tejida con fibra de Mirenpez. Solo existe dentro del lago — y ahora también acá."],
  "item:mirenpez_fresco":["El Mirenpez te mira desde tus manos. Está vivo todavía. Hay dos opciones obvias."],
};

// ── REPUTACIÓN ───────────────────────────────────────────
const REPUTATION_LEVELS=[
  {min:0,  label:"Recién llegado/a",   color:"#B8907A", desc:"Veloria todavía no sabe quién sos."},
  {min:12, label:"Cara conocida",      color:"#7AB55C", desc:"En La Vega ya te reconocen."},
  {min:28, label:"Vecino/a de Veloria",color:"#F5A623", desc:"Los Twins te saludan por la calle."},
  {min:48, label:"Figura del barrio",  color:"#4AB5B5", desc:"Tu nombre circula entre los Twins."},
  {min:68, label:"Alma de Veloria",    color:"#A67BD6", desc:"Veloria te considera uno de los suyos."},
  {min:88, label:"Leyenda de Veloria", color:"#E87B9E", desc:"Tu historia ya es parte de la ciudad."},
];
function getRepLevel(rep){return [...REPUTATION_LEVELS].reverse().find(l=>rep>=l.min)||REPUTATION_LEVELS[0];}

// ── SEASONS ──────────────────────────────────────────────
const SEASON_DATA=[
  // Primavera (months 0-2)
  {id:"primavera", emoji:"🌸", label:"Primavera",
   skillBonus:{naturaleza:1.3,arte:1.15,pesca:1.1},
   needDecayMod:{social:0.9,diversion:0.9},
   blockedActions:[],
   arrival:"La primavera llegó a Veloria. Los jardines del Veleta florecen primero. El Lago Miren parece más claro.",
   flavor:"Veloria en primavera huele a flores que no existen en otro lugar.",
   specialEvent:"velorfesta"},
  // Verano (months 3-5)
  {id:"verano", emoji:"☀️", label:"Verano",
   skillBonus:{pesca:1.3,naturaleza:1.2,carisma:1.1},
   needDecayMod:{sueno:1.15,social:0.85},
   blockedActions:[],
   arrival:"El verano se instaló en Veloria. El calor hace que todo tarde más. El lago invita.",
   flavor:"Las noches de verano en Veloria duran más de lo que el reloj indica.",
   specialEvent:null},
  // Otoño (months 6-8)
  {id:"otono", emoji:"🍂", label:"Otoño",
   skillBonus:{conocimiento:1.25,cocina:1.2,arte:1.1},
   needDecayMod:{diversion:1.1,hambre:1.1},
   blockedActions:[],
   arrival:"El otoño empezó. El Veloer de otoño dura más. Los Twins vuelven a las bibliotecas y a las cocinas.",
   flavor:"El otoño en Veloria tiene un olor que no tiene nombre en Twinés.",
   specialEvent:"cosecha"},
  // Invierno (months 9-11)
  {id:"invierno", emoji:"❄️", label:"Invierno",
   skillBonus:{conocimiento:1.3,arte:1.2},
   needDecayMod:{social:1.2,sueno:0.9},
   blockedActions:["azotea2_lago","walk_shore"],
   arrival:"El invierno llegó a Veloria. Los Nocturnos empiezan. Las calles más tranquilas. El lago, quieto.",
   flavor:"En invierno, Veloria se encoge. Todo queda más cerca.",
   specialEvent:"nocturnos"},
];
function getSeasonData(monthIdx){return SEASON_DATA[Math.floor(monthIdx/3)]||SEASON_DATA[0];}

// ── MOOD ────────────────────────────────────────────────
const MOOD_LEVELS=[
  {min:0,  label:"Muy bajo",   emoji:"😞", color:"#7B8FBF", mod:"verylow"},
  {min:20, label:"Bajo",       emoji:"😔", color:"#9B7FB0", mod:"low"},
  {min:40, label:"Neutro",     emoji:"😐", color:"#B8907A", mod:"normal"},
  {min:60, label:"Bien",       emoji:"😊", color:"#7AB55C", mod:"good"},
  {min:80, label:"Muy bien",   emoji:"✨", color:"#F5A623", mod:"great"},
];
function getMoodLevel(mood){return [...MOOD_LEVELS].reverse().find(l=>mood>=l.min)||MOOD_LEVELS[0];}

const N_MOOD_SUFFIX={
  verylow:[
    "Pero hay un peso que no terminás de sacarte.",
    "El cansancio de adentro es diferente al de afuera.",
    "Veloria no pregunta. Eso a veces ayuda.",
    "Igual. Hay que seguir.",
  ],
  low:[
    "No es el mejor día. Pero tampoco el peor.",
    "Hay algo que cargás que todavía no tiene nombre.",
  ],
  good:[
    "Hoy todo parece un poco más manejable.",
    "Hay algo ligero en el aire.",
  ],
  great:[
    "Una de esas tardes que recordás sin saber por qué.",
    "Veloria se siente exactamente como tiene que sentirse.",
    "Algo en vos está en su lugar hoy.",
  ],
};

// ── TEXTOS CON ESTADO ────────────────────────────────────
const N_STATE={
  "fish:dawn":["El lago a esta hora tiene una quietud diferente. La niebla baja sobre el agua. El anzuelo cae sin ruido.","Pescar al amanecer en el Miren es otra cosa. La ciudad no despertó todavía. El lago tampoco."],
  "fish:night":["Pescar de noche en el Miren tiene sus reglas no escritas. No se habla. No se usa linterna. Se escucha.","A esta hora el lago brilla desde adentro. No es el reflejo de nada. Oren dice que es el lago pensando."],
  "fish:expert":["El anzuelo cae exactamente donde querés. Ya no tenés que pensar en eso. Tu cuerpo sabe lo que el lago necesita escuchar.","Oren te miraría diferente si te viera hoy. Probablemente con aprobación."],
  "fish:tired":["El cansancio en los brazos hace que todo tarde más. El lago no perdona la distracción. Pero tampoco apura."],
  "fish:hungry":["El estómago ruge mientras esperás. El Mirenpez tarda. Ya estás pensando en cómo lo vas a cocinar antes de sacarlo."],
  "cook:expert":["La cocina tiene sus ritmos y vos ya los conocés. Los tiempos, los olores, cuándo agregar qué. Sale bien porque tiene que salir bien.","Es casi meditativo. Cada acción en su lugar."],
  "cook:tired":["Cocinás con los ojos medio cerrados. Sale suficientemente bien. A veces suficiente es todo lo que podés dar."],
  "cook:night":["Cocinar a esta hora tiene algo de ritual nocturno. La cocina en silencio. El barrio dormido. El olor a comida casera en un apartamento solo."],
  "cook:hungry":["Cocinás con demasiada hambre. Todo huele demasiado bien. Tardás menos de lo que deberías y comés directamente de la sartén."],
  "sit_lake:night":["De noche el Lago Miren no refleja la luna. Tiene su propia luz, más profunda. Un sonido muy suave, sin origen claro. Como si algo respirara debajo.","A esta hora, el lago hace algo que no hace de día. Oren nunca lo explica del todo bien."],
  "sit_lake:dawn":["El lago al amanecer. La luz que toca el agua primero es distinta a la que llega después. Los velistas lo llaman el Veloer del lago.","A esta hora el lago está solo. No hay pescadores todavía."],
  "sit_lake:expert":["Tu nivel de Naturaleza hace que notes cosas que antes no. Los patrones en el agua. Los colores que cambian."],
  "walk_park:morning":["El parque de mañana. Gente con mate, alguien corriendo. Veloria funcionando.","Mañana en Los Prados. El pasto tiene rocío. Hay algo agradable en pisar algo que nadie pisó antes."],
  "walk_park:night":["El parque de noche es completamente otro lugar. Los bancos libres. Las luces hacen sombras largas que no existían de día."],
  "walk_park:expert":["Tu nivel de Naturaleza hace que notes lo que otros no ven: las especies de pájaros, qué flor está en qué estado."],
  "dormir:exhausted":["Te dormís antes de que la cabeza toque la almohada. Cuando abrís los ojos, parece que pasaron años.","El cuerpo no pidió permiso. Se apagó. Lo siguiente que sabés es la mañana."],
  "dormir:dawn":["Dormirse cuando empieza a entrar la luz es una forma rara de rendirse."],
  "dormir:night":["A esta hora corresponde dormir. Lo sabés. El cuerpo lo sabe."],
  "research:expert":["Tu nivel de Conocimiento hace que los textos conecten de maneras que antes no veías. Lo que se dice al margen.","Llevás tiempo en la biblioteca. Ya sabés dónde está todo. Incluso lo que Ciro no catalogó."],
  "research:night":["La biblioteca de noche. Ciro ya se fue. Las luces de emergencia no iluminan las estanterías del fondo. Vas igual."],
  "musica_tocar:expert":["Las notas salen donde querés. Eso no siempre pasa.","Practicar cuando el instrumento ya responde tiene una calidad distinta. No es entrenamiento. Es otra cosa."],
  "musica_tocar:night":["Tocar de noche cambia algo en cómo suena. O en cómo lo escuchás."],
  "azotea2_estrellas:expert":["Tu nivel de Conocimiento hace que el cielo tenga sentido. Los patrones. Los ciclos. Otherwhen tiene un cielo que no coincide con nada conocido."],
  "azotea2_estrellas:night":["El Observatorio de noche es lo que tiene que ser. Desde acá, en noches claras, el Lago Miren brilla desde abajo."],
};

// ── EVENTOS DIARIOS ──────────────────────────────────────
const DAILY_EVENTS=[
  {id:"bread_smell",   w:4, text:"Esta mañana el olor a pan de la Panadería Velin sube hasta el tercer piso. Velin debe haber empezado antes que de costumbre."},
  {id:"plaza_music",   w:3, text:"Hay un músico en la Plaza del Veloer. Nadie lo contrató. Nadie sabe quién es. Toca algo que no existe en ningún repertorio conocido."},
  {id:"lake_fog",      w:2, text:"Hay niebla sobre el Lago Miren. Oren canceló la salida. Dice que cuando hay niebla, el lago prefiere estar solo.",
    unlock:{id:"sit_lake",emoji:"🌫",label:"Ir al lago con niebla",place:"Lago Miren"}},
  {id:"rain_veloria",  w:3, text:"Llueve en Veloria. La ciudad huele diferente. Los adoquines de El Casco brillan. La gente camina más rápido pero parece más tranquila."},
  {id:"note_door",     w:1, text:"Hay una nota doblada bajo la puerta. Sin firma. Solo dice: 'El lago recuerda lo que olvidaste.'",
    choice:{title:"Una nota sin firma.",subtitle:"Apareció bajo la puerta. No hay letra que reconozcas.",options:[
      {id:"note_keep",   emoji:"🔍",label:"Guardarla y buscar quién la mandó",   hint:"+Conocimiento",   effects:{skill:"conocimiento",xp:20,narrative:"choice:research_13th"}},
      {id:"note_ignore", emoji:"🗑",label:"Tirarla. Probablemente nada.",         hint:"-Diversión",      effects:{need:"diversion",val:-5}},
      {id:"note_accept", emoji:"📝",label:"Leerla tres veces y seguir el día.",  hint:"+Diversión",      effects:{need:"diversion",val:12}},
    ]}},
  {id:"quiet_morning", w:3, text:"Esta mañana Veloria está inusualmente silenciosa. Como si el barrio entero decidió dormir hasta tarde."},
  {id:"neighbor_cook", w:3, text:"El vecino de arriba está cocinando algo que huele muy bien. No sabés su nombre todavía. La vida en La Vega es así."},
  {id:"soren_window",  w:2, text:"Al pasar por la Librería, viste a Soren leyendo de pie en la vidriera. Te vio. No saludó. Pero dobló la esquina de la página. Algo que nunca hace."},
  {id:"lake_glow",     w:1, text:"Alguien jura que vio una luz en el fondo del Lago Miren a las 3 de la mañana. No es la primera vez que alguien lo dice.",
    unlock:{id:"sit_lake",emoji:"🌊",label:"Ir al lago a ver",place:"Lago Miren"}},
  {id:"graffiti_new",  w:1, text:"Hay graffiti nuevo en el callejón detrás de la Librería. Dice: 'Doce no alcanzaba.' Nadie lo vio aparecer.",chainUnlock:"chain_ciro_13th"},
  {id:"dream_lake",    w:2, text:"Soñaste con el lago. En el sueño el agua era completamente transparente. Había una puerta en el fondo. Estaba abierta.", effects:{skill:"conocimiento",xp:10}},
  {id:"aria_wave",     w:2, text:"Aria te saludó desde la ventana del café antes de que pudieras entrar. Tiene memoria para las caras. Para todo, parece."},
  {id:"festival_hint", w:1, text:"Empezaron a colgar luces en la Plaza del Veloer. La Velorfesta se acerca. Todo Veloria cambia cuando hay fiesta."},
  {id:"vael_street",   w:2, text:"Vael estaba tocando en la calle esta tarde. Sin micrófono, sin caso. 'A veces la música prefiere el aire libre', dijo."},
  {id:"oren_missing",  w:1, text:"El muelle está vacío. Oren no salió hoy. La barca está atada. Nunca falta sin avisar.",
    unlock:{id:"chat_npc",emoji:"⛵",label:"Ir a buscar a Oren",place:"Puerto Viejo",npc:"Oren Mirende"}},
  {id:"cine_cartel",   w:1, text:"El Cine Veloria tiene cartel nuevo: 'Función especial — esta noche únicamente'. No dice qué película.",
    unlock:{id:"cine_ver",emoji:"🎬",label:"Ir a la función especial",place:"Cine Veloria"}},
  {id:"wind_change",   w:1, text:"El viento cambió hoy. Bren una vez dijo que eso significa algo en Veloria. No te explicó qué."},
  {id:"new_bird",      w:2, text:"Un pájaro que no reconocés se posó en la ventana. Te miró tres segundos antes de irse. No sos de los que buscan señales. Pero igual lo recordás todo el día."},
  {id:"market_rare",   w:1, text:"En el Mercado del Casco apareció un puesto que nunca viste. El vendedor tiene objetos sin nombre. Aparece cada tanto.",
    unlock:{id:"merc_unico",emoji:"🧿",label:"Ver el puesto especial",place:"El Mercado del Casco"}},
  {id:"bren_closed",   w:1, text:"Bren dejó una nota en el consultorio: 'Hoy no. Fui al lago.' Primera vez en diez años que cierra sin avisar."},
];

function pickDailyEvent(shownIds=[]){
  const pool=DAILY_EVENTS.filter(e=>!shownIds.includes(e.id));
  if(!pool.length)return null;
  const total=pool.reduce((s,e)=>s+e.w,0);
  let r=Math.random()*total;
  for(const e of pool){r-=e.w;if(r<=0)return e;}
  return pool[pool.length-1];
}

// ── MEMORIA DE NPCs ──────────────────────────────────────
const NPC_MEMORY={
  "Aria Ven":{
    visit:[
      {count:3,  says:"Ya sos un habitual. El tercer día se nota."},
      {count:7,  says:"Tengo una mesa que ya pienso como tuya."},
      {count:15, says:"Llevás más semanas viniendo que mucha gente del barrio."},
    ],
    absence:[
      {days:3, says:"Hace días que no aparecías. ¿Todo bien?"},
      {days:7, says:"Me empezaba a preocupar, no te voy a mentir."},
    ]},
  "Soren Lume":{
    visit:[
      {count:3,  says:"Empezás a conocer la librería mejor que yo."},
      {count:8,  says:"Ya sé lo que buscás antes de que lo pidas."},
      {count:14, says:"Sos el cliente con más horas en la librería en años."},
    ],
    absence:[
      {days:5, says:"La librería se sintió rara sin que nadie hiciera preguntas complicadas."},
    ]},
  "Oren Mirende":{
    visit:[
      {count:4, says:"Pocas personas vuelven tantas veces. Eso me gusta."},
      {count:9, says:"Ya sos pescador de Veloria. El lago ya sabe tu nombre."},
    ],
    absence:[
      {days:4, says:"Pensé que el lago te había espantado."},
      {days:8, says:"El muelle estuvo tranquilo. No siempre es algo bueno."},
    ]},
  "Bren Orlen":{
    visit:[
      {count:3, says:"No muchos vienen a charlar sin motivo médico. Lo aprecio."},
      {count:6, says:"Ya me pregunto qué pasa cuando no venís."},
    ],
    absence:[
      {days:6, says:"Hace un tiempo que no pasabas. El consultorio tiene memoria."},
    ]},
  "Ciro Orlen":{
    visit:[
      {count:4, says:"Cada vez que venís, encontramos algo que la vez anterior no."},
      {count:8, says:"Creo que sabés casi tanto como yo sobre ciertos temas."},
    ],
    absence:[
      {days:5, says:"Los archivos esperaron. Igual que yo."},
    ]},
  "Nela Mirende":{
    visit:[
      {count:3, says:"Ya sé lo que vas a pedir antes de que te sientes."},
      {count:7, says:"Si venís tan seguido, ya sos parte del menú no escrito."},
    ],
    absence:[
      {days:5, says:"El Mirenpez al Veloer estuvo esperando."},
    ]},
  "Elowen Sorvei":{
    visit:[
      {count:3, says:"Cada conversación tuya termina en mi libreta. Lo sabés, ¿no?"},
      {count:6, says:"Ya aparecés en el libro. Sin nombre, pero sos vos."},
    ],
    absence:[
      {days:4, says:"Estuve escribiendo cosas que quería preguntarte."},
    ]},
};

// ── HELPER: narrativa según estado del Twin ──────────────
function getStateNarrative(actionId,{skills,needs,gt:g}){
  const h=g?.hour??8;
  const isNight=h>=21||h<5;
  const isDawn=h>=5&&h<8;
  const skillMap={fish:"pesca",cook:"cocina",musica_tocar:"arte",research:"conocimiento",sit_lake:"naturaleza",walk_park:"naturaleza",azotea2_estrellas:"conocimiento",dormir:"sueno"};
  const sk=skillMap[actionId];
  const skXP=sk?(skills[sk]||0):0;
  const skLvl=SKILL_LEVELS.filter(l=>l.xp<=skXP).length;
  const isExpert=skLvl>=4;
  const isHungry=(needs?.hambre??100)<25;
  const isTired=(needs?.sueno??100)<20;
  const isExhausted=(needs?.sueno??100)<8;
  const keys=[];
  if(actionId==="dormir"&&isExhausted)keys.push("dormir:exhausted");
  if(isNight)keys.push(`${actionId}:night`);
  if(isDawn)keys.push(`${actionId}:dawn`);
  if(actionId==="walk_park"&&!isNight&&!isDawn)keys.push("walk_park:morning");
  if(isExpert)keys.push(`${actionId}:expert`);
  if(isTired&&N_STATE[`${actionId}:tired`])keys.push(`${actionId}:tired`);
  if(isHungry&&N_STATE[`${actionId}:hungry`])keys.push(`${actionId}:hungry`);
  for(const k of keys){if(N_STATE[k])return pick(N_STATE[k]);}
  return null;
}


// ═══ SHOPS ═══

// ─ Shop triggers: actionId → shopId ─
// ─ Action choice triggers: actionId → fn(state) → choiceEvent | null ─
const ACTION_CHOICE_TRIGGERS={
  "fish": (s)=>({
    id:"after_fish",title:s.skills?.pesca>=300?"Mirenpez Dorado":"Mirenpez del Miren",
    text:s.skills?.pesca>=300?"El anzuelo sube con algo dorado. Nunca habías visto uno de este tamaño.":"El sedal se tensa y sacás un Mirenpez del tamaño de tu palma.",
    options:[
      {id:"f_cook",emoji:"🍳",label:"Cocinarlo en casa",hint:"+35 Hambre, +Cocina XP",needs:{hambre:35},skillXP:{cocina:15},nKey:"fish:cook"},
      {id:"f_sell",emoji:"💰",label:"Venderlo en el muelle",hint:`+L${s.skills?.pesca>=300?45:25}`,moneyDelta:s.skills?.pesca>=300?45:25,nKey:"fish:sell"},
      {id:"f_return",emoji:"🌊",label:"Devolverlo al lago",hint:"+Naturaleza XP",skillXP:{naturaleza:15},nKey:"fish:return"},
    ],
  }),
  "cook": ()=>({
    id:"after_cook",title:"La cocina huele bien",text:"Cocinaste. ¿Cómo lo servís?",
    options:[
      {id:"c_solo",emoji:"🍽",label:"Comer solo/a",hint:"+45 Hambre, +Diversión",needs:{hambre:45,diversion:10},nKey:"cook:solo"},
      {id:"c_share",emoji:"🤝",label:"Golpear la puerta del vecino",hint:"+Social, +Carisma XP",skillXP:{carisma:12},needs:{social:20},nKey:"cook:share"},
      {id:"c_save",emoji:"💛",label:"Guardarlo para después",hint:"Guardar en inventario",addItem:{name:"Comida casera",emoji:"🍲",type:"food",desc:"Lo cocinaste vos.",useable:true},nKey:"cook:save"},
    ],
  }),
  "watch_show": ()=>({
    id:"after_show",title:"El teatro se vacía",text:"Los últimos aplausos se apagaron. La obra te dejó algo — no sabés todavía qué.",
    options:[
      {id:"s_moved",emoji:"💛",label:"Quedarte pensando",hint:"+Arte XP, +Diversión",skillXP:{arte:20},needs:{diversion:15},nKey:"show:moved"},
      {id:"s_discuss",emoji:"💬",label:"Charlar con quien salga",hint:"+Carisma XP, +Social",skillXP:{carisma:15},needs:{social:20},nKey:"show:discuss"},
      {id:"s_write",emoji:"📝",label:"Escribir lo que pensás",hint:"+Conocimiento XP, +Arte XP",skillXP:{conocimiento:15,arte:10},nKey:"show:write"},
    ],
  }),
  "research": ()=>({
    id:"research_topic",title:"Archivos de Veloria",text:"La Biblioteca tiene más de lo que parece. ¿Qué investigás hoy?",
    options:[
      {id:"r_history",emoji:"📜",label:"Historia de los fundadores",hint:"+Conocimiento XP alto",skillXP:{conocimiento:35},nKey:"research:history"},
      {id:"r_lake",emoji:"🌊",label:"Registros del Lago Miren",hint:"+Conocimiento XP, pista de lore",skillXP:{conocimiento:25},nKey:"research:lake"},
      {id:"r_world",emoji:"🗺",label:"Geografía de Otherwhen",hint:"+Conocimiento XP",skillXP:{conocimiento:28},nKey:"research:world"},
    ],
  }),
  "hobby": ()=>({
    id:"hobby_type",title:"Un rato para vos",text:"Tiempo libre. ¿En qué te metés?",
    options:[
      {id:"h_draw",emoji:"✏️",label:"Dibujar algo que viste hoy",hint:"+Arte XP alto",skillXP:{arte:28},nKey:"hobby:draw"},
      {id:"h_music",emoji:"🎵",label:"Escuchar música",hint:"+Diversión, +Arte XP leve",skillXP:{arte:10},needs:{diversion:25},nKey:"hobby:music"},
      {id:"h_write",emoji:"📝",label:"Escribir en el diario",hint:"+Conocimiento XP, +Diversión",skillXP:{conocimiento:18},needs:{diversion:15},nKey:"hobby:write"},
    ],
  }),
  "walk_park": (s)=>Math.random()>0.5?null:({
    id:"park_encounter",title:"Algo en el parque",text:"A mitad del camino, algo llama tu atención.",
    options:[
      {id:"p_bird",emoji:"🐦",label:"Seguir al pájaro Mirelo",hint:"+Naturaleza XP",skillXP:{naturaleza:22},nKey:"park:bird"},
      {id:"p_stranger",emoji:"💬",label:"Hablar con quien está sentado",hint:"+Carisma XP",skillXP:{carisma:15},nKey:"park:stranger"},
      {id:"p_continue",emoji:"🚶",label:"Seguir caminando",hint:"Nada especial. O sí.",nKey:"park:continue"},
    ],
  }),
};

// ─ NPC-specific chat choices ─
const NPC_CHAT_CHOICES={
  "Aria Ven":{title:"En el café con Aria",text:"Aria limpia el mostrador y levanta la vista. ¿De qué van?",
    options:[
      {id:"a_day",emoji:"☕",label:"Preguntarle cómo fue el día",hint:"+Amistad, +Carisma XP",fr:10,skillXP:{carisma:8},nKey:"aria:day"},
      {id:"a_personal",emoji:"💬",label:"Contarle algo personal",hint:"+Amistad alto",fr:18,skillXP:{carisma:5},nKey:"aria:personal"},
      {id:"a_lavega",emoji:"🏙",label:"Preguntarle sobre La Vega",hint:"+Conocimiento XP",fr:8,skillXP:{conocimiento:12},nKey:"aria:lavega"},
    ]},
  "Soren Lume":{title:"Con Soren en la librería",text:"Soren cierra el libro. Tiene ese modo de escuchar que hace que quieras hablar.",
    options:[
      {id:"s_book",emoji:"📚",label:"Pedirle una recomendación",hint:"+Conocimiento XP",fr:8,skillXP:{conocimiento:15},nKey:"soren:book"},
      {id:"s_history",emoji:"📜",label:"Preguntarle sobre la historia de Veloria",hint:"+Conocimiento XP",fr:10,skillXP:{conocimiento:22},nKey:"soren:history"},
      {id:"s_chat",emoji:"💬",label:"Charlar de lo que sea",hint:"+Amistad",fr:14,nKey:"soren:chat"},
    ]},
  "Ciro Orlen":{title:"Con Ciro en los archivos",text:"Ciro tiene varios libros abiertos al mismo tiempo. Te hace espacio en la mesa.",
    options:[
      {id:"c_archives",emoji:"📦",label:"Preguntarle qué encontró",hint:"+Conocimiento XP alto, lore",fr:12,skillXP:{conocimiento:28},nKey:"ciro:archives"},
      {id:"c_help",emoji:"🔍",label:"Ofrecerte a buscar algo",hint:"+Amistad, +Conocimiento XP",fr:14,skillXP:{conocimiento:20},nKey:"ciro:help"},
      {id:"c_13",emoji:"✦",label:"Preguntarle sobre el 13° fundador",hint:"Solo si ya investigaste algo",fr:8,skillXP:{conocimiento:35},nKey:"ciro:13th"},
    ]},
  "Oren Mirende":{title:"Con Oren en el muelle",text:"Oren tiene esa paciencia de la gente que aprendió a esperar que el lago decida.",
    options:[
      {id:"o_fish",emoji:"🎣",label:"Hablar de pesca",hint:"+Pesca XP",fr:10,skillXP:{pesca:15},nKey:"oren:fishing"},
      {id:"o_lake",emoji:"🌊",label:"Preguntarle sobre el lago",hint:"+Conocimiento XP, lore",fr:12,skillXP:{conocimiento:18},nKey:"oren:lake"},
      {id:"o_story",emoji:"👂",label:"Escucharle contar algo",hint:"+Amistad",fr:14,skillXP:{carisma:10},nKey:"oren:story"},
    ]},
  "Elowen Sorvei":{title:"Con Elowen",text:"Elowen te mira como si supiera algo que vos todavía no sabés.",
    options:[
      {id:"e_write",emoji:"📖",label:"Preguntarle sobre lo que escribe",hint:"+Arte XP, +Conocimiento XP",fr:10,skillXP:{arte:15,conocimiento:15},nKey:"elowen:write"},
      {id:"e_secret",emoji:"✦",label:"Preguntarle algo que nadie pregunta",hint:"+Conocimiento XP alto, lore",fr:16,skillXP:{conocimiento:32},nKey:"elowen:secret"},
      {id:"e_silence",emoji:"🌿",label:"Quedarse en silencio",hint:"+Conocimiento XP, +Naturaleza XP",fr:8,skillXP:{conocimiento:12,naturaleza:12},nKey:"elowen:silence"},
    ]},
};

const CAREERS={arte:{label:"Arte",emoji:"🎨",places:["Teatro de Cael","Biblioteca"],levels:["Aspirante","Artista","Artista reconocido","Maestro del Veleta"],wages:[30,55,90,140],shiftH:6},cocina:{label:"Cocina",emoji:"🍳",places:["Restaurante de Nela"],levels:["Ayudante","Cocinero","Chef","Chef ejecutivo"],wages:[25,45,80,130],shiftH:8},comercio:{label:"Comercio",emoji:"💼",places:["Plaza del Veloer"],levels:["Vendedor","Gerente","Director","Empresario"],wages:[35,60,100,160],shiftH:8},medicina:{label:"Medicina",emoji:"⚕️",places:["Consultorio de Bren"],levels:["Practicante","Médico","Especialista","Jefe médico"],wages:[40,70,110,170],shiftH:8},educacion:{label:"Educación",emoji:"📚",places:["Biblioteca"],levels:["Auxiliar","Docente","Profesor titular","Director"],wages:[30,50,85,130],shiftH:6},pesca:{label:"Pesca",emoji:"🎣",places:["Muelle"],levels:["Aprendiz","Pescador","Pescador experto","Patrón del Lago"],wages:[20,40,70,110],shiftH:5}};
const ROMANCEABLE=new Set(["Aria Ven","Lior Veloer","Oren Mirende","Nela Mirende","Riven Lumaren","Vael Lumaren","Cael Sorvei","Niven Sorvei","Luma Sorvei","Soren Lume","Ciro Orlen","Elia Orlen","Iva Norven","Cela Miren","Tev Solan","Dael Miru","Mira Belven","Rael Nora","Leva Sorin"]);
const CALENDAR_EVENTS={0:{name:"Día del Primer Brote",emoji:"🌱",desc:"Plantar algo hoy. La tradición lo dice."},1:{name:"El Mercado Miren",emoji:"⛵",desc:"El mercado flotante abre sobre el lago."},2:{name:"La Noche de los Nombres",emoji:"💌",desc:"Se revelan apodos cariñosos a personas queridas."},3:{name:"Las Aguas Abiertas",emoji:"🏊",desc:"Gran celebración en Ribera. Primer día de natación."},4:{name:"Velorfesta",emoji:"✨",desc:"La celebración más importante. Tres días de música."},5:{name:"La Noche Larga",emoji:"⭐",desc:"Los Twins hacen promesas bajo las estrellas."},6:{name:"La Cosecha",emoji:"🌾",desc:"Festival en Las Llanuras Doradas."},7:{name:"El Día del Recuerdo",emoji:"🌊",desc:"Flores en el lago para los Twins que ya no están."},8:{name:"La Feria de los Clubs",emoji:"🎪",desc:"Todos los clubs de Veloria abren sus puertas."},9:{name:"Los Nocturnos",emoji:"🕯",desc:"Reuniones íntimas en casa. El frío une."},10:{name:"El Hielo del Miren",emoji:"⛸",desc:"El lago se congela. Los Twins patinen."},11:{name:"La Víspera del Brote",emoji:"🔥",desc:"Quemar lo viejo, guardar lo nuevo."}};
const NPC_TRAITS_MAP={"Aria Ven":["pragmática","acogedora","observadora"],"Lior Veloer":["rebelde","curioso","libre"],"Oren Mirende":["aventurero","romántico","libre"],"Nela Mirende":["cálido","fuerte","protector"],"Riven Lumaren":["encantador","generoso","soñador"],"Vael Lumaren":["creativo","impulsivo","apasionado"],"Cael Sorvei":["dramático","apasionado","perfeccionista"],"Niven Sorvei":["intenso","directo","artístico"],"Luma Sorvei":["libre","alegre","magnético"],"Soren Lume":["introvertido","brillante","leal"],"Ciro Orlen":["meticuloso","callado","curioso"],"Elia Orlen":["sociable","optimista","generosa"],"Iva Norven":["observadora","artístico","sensible"],"Cela Miren":["empático","trabajador","sensible"],"Tev Solan":["alegre","talentoso","impulsivo"],"Dael Miru":["perfeccionista","apasionado","orgulloso"],"Mira Belven":["energético","social","creativo"],"Rael Nora":["gentil","divertido","compasivo"],"Leva Sorin":["apasionado","exigente","curioso"]};
const NPC_HOOD_COLOR={"Aria Ven":"#7BB8B9","Lior Veloer":"#7BB8B9","Elia Orlen":"#7BB8B9","Senia Vel":"#7BB8B9","Tev Solan":"#7BB8B9","Oren Mirende":"#4A8B8C","Nela Mirende":"#4A8B8C","Tomas Mirende":"#4A8B8C","Riven Lumaren":"#4A8B8C","Iva Norven":"#4A8B8C","Ciro Orlen":"#7A5840","Elowen Sorvei":"#7A5840","Cael Sorvei":"#7A5840","Niven Sorvei":"#7A5840","Luma Sorvei":"#7A5840","Vael Lumaren":"#7A5840","Leva Sorin":"#7A5840","Aldric Veloer":"#F5A623","Soren Lume":"#F5A623","Dora Velin":"#F5A623","Dael Miru":"#F5A623","Mira Belven":"#F5A623","Bren Orlen":"#6B9E5E","Cela Miren":"#6B9E5E","Rael Nora":"#6B9E5E"};
const NPC_DESC={"Aria Ven":"Dueña del café · La Vega","Lior Veloer":"Estudiante rebelde · La Vega","Oren Mirende":"Pescador y guía del lago · Ribera","Nela Mirende":"Restaurante del muelle · Ribera","Tomas Mirende":"Pescador mayor · Ribera","Riven Lumaren":"Gerente del banco · Ribera","Ciro Orlen":"Archivista · Veleta","Elowen Sorvei":"Escritora anciana · Veleta","Cael Sorvei":"Director del teatro · Veleta","Niven Sorvei":"Pintora y tatuadora · Veleta","Luma Sorvei":"Músico callejero · Veleta","Vael Lumaren":"Diseñadora · Veleta","Leva Sorin":"Profesora de historia · Veleta","Aldric Veloer":"Figura moral de Veloria · El Casco","Soren Lume":"Librero · El Casco","Dora Velin":"La Twin más anciana · El Casco","Dael Miru":"Chef · El Casco","Mira Belven":"Organizadora de eventos · El Casco","Bren Orlen":"Médico · Los Prados","Cela Miren":"Enfermera · Los Prados","Rael Nora":"Veterinario · Los Prados","Senia Vel":"Ceramicista veterana · La Vega","Elia Orlen":"Vecina del jardín · La Vega"};
const NPC_SCHEDULES={
  "Aria Ven":      [{from:0,to:7,place:"La Vega (casa)",hood:"La Vega"},{from:7,to:20,place:"Café de Aria",hood:"La Vega"},{from:20,to:22,place:"Plaza del Veloer",hood:"El Casco"},{from:22,to:24,place:"La Vega (casa)",hood:"La Vega"}],
  "Lior Veloer":   [{from:0,to:9,place:"La Vega (casa)",hood:"La Vega"},{from:9,to:12,place:"Terraza",hood:"La Vega"},{from:12,to:16,place:"Biblioteca",hood:"Veleta"},{from:16,to:19,place:"Café de Aria",hood:"La Vega"},{from:19,to:22,place:"La Bodega",hood:"La Vega"},{from:22,to:24,place:"La Vega (casa)",hood:"La Vega"}],
  "Elia Orlen":    [{from:0,to:8,place:"La Vega (casa)",hood:"La Vega"},{from:8,to:11,place:"Panadería Velin",hood:"La Vega"},{from:11,to:15,place:"Jardín Comunitario",hood:"La Vega"},{from:15,to:19,place:"Café de Aria",hood:"La Vega"},{from:19,to:22,place:"Plaza del Veloer",hood:"El Casco"},{from:22,to:24,place:"La Vega (casa)",hood:"La Vega"}],
  "Oren Mirende":  [{from:0,to:5,place:"Ribera (casa)",hood:"Ribera"},{from:5,to:14,place:"Muelle",hood:"Ribera"},{from:14,to:17,place:"Lago Miren",hood:"Ribera"},{from:17,to:21,place:"Restaurante de Nela",hood:"Ribera"},{from:21,to:24,place:"Ribera (casa)",hood:"Ribera"}],
  "Nela Mirende":  [{from:0,to:8,place:"Ribera (casa)",hood:"Ribera"},{from:8,to:22,place:"Restaurante de Nela",hood:"Ribera"},{from:22,to:24,place:"Ribera (casa)",hood:"Ribera"}],
  "Tomas Mirende": [{from:0,to:4,place:"Ribera (casa)",hood:"Ribera"},{from:4,to:13,place:"Muelle",hood:"Ribera"},{from:13,to:16,place:"Restaurante de Nela",hood:"Ribera"},{from:16,to:24,place:"Ribera (casa)",hood:"Ribera"}],
  "Riven Lumaren": [{from:0,to:8,place:"Ribera (casa)",hood:"Ribera"},{from:8,to:18,place:"El Casco (banco)",hood:"El Casco"},{from:18,to:22,place:"Restaurante de Nela",hood:"Ribera"},{from:22,to:24,place:"Ribera (casa)",hood:"Ribera"}],
  "Iva Norven":    [{from:0,to:10,place:"Ribera (casa)",hood:"Ribera"},{from:10,to:18,place:"Lago Miren",hood:"Ribera"},{from:18,to:22,place:"Plaza del Veloer",hood:"El Casco"},{from:22,to:24,place:"Ribera (casa)",hood:"Ribera"}],
  "Ciro Orlen":    [{from:0,to:8,place:"Veleta (casa)",hood:"Veleta"},{from:8,to:22,place:"Biblioteca",hood:"Veleta"},{from:22,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Elowen Sorvei": [{from:0,to:7,place:"Veleta (casa)",hood:"Veleta"},{from:7,to:10,place:"Parque",hood:"Los Prados"},{from:10,to:17,place:"Biblioteca",hood:"Veleta"},{from:17,to:20,place:"Teatro de Cael",hood:"Veleta"},{from:20,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Cael Sorvei":   [{from:0,to:10,place:"Veleta (casa)",hood:"Veleta"},{from:10,to:23,place:"Teatro de Cael",hood:"Veleta"},{from:23,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Niven Sorvei":  [{from:0,to:11,place:"Veleta (casa)",hood:"Veleta"},{from:11,to:20,place:"Teatro de Cael",hood:"Veleta"},{from:20,to:23,place:"Lago Miren",hood:"Ribera"},{from:23,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Luma Sorvei":   [{from:0,to:12,place:"Veleta (casa)",hood:"Veleta"},{from:12,to:15,place:"Plaza del Veloer",hood:"El Casco"},{from:15,to:18,place:"Taller de Música",hood:"La Vega"},{from:18,to:22,place:"Feria Nocturna",hood:"La Vega"},{from:22,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Vael Lumaren":  [{from:0,to:10,place:"Veleta (casa)",hood:"Veleta"},{from:10,to:14,place:"Taller Cerámica",hood:"La Vega"},{from:14,to:17,place:"Estudio de Arte",hood:"La Vega"},{from:17,to:21,place:"Taller de Música",hood:"La Vega"},{from:21,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Senia Vel":     [{from:0,to:7,place:"La Vega (casa)",hood:"La Vega"},{from:7,to:8,place:"Panadería Velin",hood:"La Vega"},{from:8,to:19,place:"Taller Cerámica",hood:"La Vega"},{from:19,to:21,place:"Micro Parque",hood:"La Vega"},{from:21,to:24,place:"La Vega (casa)",hood:"La Vega"}],
  "Leva Sorin":    [{from:0,to:8,place:"Veleta (casa)",hood:"Veleta"},{from:8,to:14,place:"Biblioteca",hood:"Veleta"},{from:14,to:18,place:"Teatro de Cael",hood:"Veleta"},{from:18,to:22,place:"Café de Aria",hood:"La Vega"},{from:22,to:24,place:"Veleta (casa)",hood:"Veleta"}],
  "Soren Lume":    [{from:0,to:8,place:"El Casco (casa)",hood:"El Casco"},{from:8,to:20,place:"Librería de Soren",hood:"El Casco"},{from:20,to:22,place:"Plaza del Veloer",hood:"El Casco"},{from:22,to:24,place:"El Casco (casa)",hood:"El Casco"}],
  "Aldric Veloer": [{from:0,to:7,place:"El Casco (casa)",hood:"El Casco"},{from:7,to:12,place:"Plaza del Veloer",hood:"El Casco"},{from:12,to:14,place:"Librería de Soren",hood:"El Casco"},{from:14,to:19,place:"Plaza del Veloer",hood:"El Casco"},{from:19,to:24,place:"El Casco (casa)",hood:"El Casco"}],
  "Dora Velin":    [{from:0,to:7,place:"El Casco (casa)",hood:"El Casco"},{from:7,to:11,place:"Plaza del Veloer",hood:"El Casco"},{from:11,to:16,place:"El Casco (casa)",hood:"El Casco"},{from:16,to:18,place:"Plaza del Veloer",hood:"El Casco"},{from:18,to:24,place:"El Casco (casa)",hood:"El Casco"}],
  "Dael Miru":     [{from:0,to:9,place:"El Casco (casa)",hood:"El Casco"},{from:9,to:22,place:"Plaza del Veloer",hood:"El Casco"},{from:22,to:24,place:"El Casco (casa)",hood:"El Casco"}],
  "Mira Belven":   [{from:0,to:8,place:"El Casco (casa)",hood:"El Casco"},{from:8,to:14,place:"Tienda de La Vega",hood:"La Vega"},{from:14,to:17,place:"Mercadillo",hood:"La Vega"},{from:17,to:21,place:"Bar Lumaven",hood:"La Vega"},{from:21,to:24,place:"El Casco (casa)",hood:"El Casco"}],
  "Bren Orlen":    [{from:0,to:7,place:"Los Prados (casa)",hood:"Los Prados"},{from:7,to:18,place:"Consultorio de Bren",hood:"Los Prados"},{from:18,to:21,place:"Parque",hood:"Los Prados"},{from:21,to:24,place:"Los Prados (casa)",hood:"Los Prados"}],
  "Cela Miren":    [{from:0,to:7,place:"Los Prados (casa)",hood:"Los Prados"},{from:7,to:16,place:"Consultorio de Bren",hood:"Los Prados"},{from:16,to:20,place:"Parque",hood:"Los Prados"},{from:20,to:24,place:"Los Prados (casa)",hood:"Los Prados"}],
  "Rael Nora":     [{from:0,to:8,place:"Los Prados (casa)",hood:"Los Prados"},{from:8,to:17,place:"Parque",hood:"Los Prados"},{from:17,to:21,place:"Plaza del Veloer",hood:"El Casco"},{from:21,to:24,place:"Los Prados (casa)",hood:"Los Prados"}],
};

function getNPCSlot(name,hour){
  const s=NPC_SCHEDULES[name];if(!s)return null;
  const h=((hour%24)+24)%24;
  return s.find(x=>h>=x.from&&h<x.to)||s[s.length-1];
}
function getNPCsAtPlace(place,hour){
  return Object.entries(NPC_SCHEDULES)
    .filter(([,s])=>{const h=((hour%24)+24)%24;const x=s.find(x=>h>=x.from&&h<x.to)||s[s.length-1];return x&&x.place===place;})
    .map(([n])=>n);
}
function resolveNavPlace(place,hood){
  if(PLACE_ACTIONS[place])return{hood,place};
  const nh=NEIGHBORHOODS[hood];return nh?{hood,place:nh.places[0]}:null;
}
const PROMO_SHIFTS=[5,10,15,20];

const INTERACTION_CATS=[
  {id:"hablar",label:"Hablar",emoji:"💬"},
  {id:"amistad",label:"Amistad",emoji:"🤝"},
  {id:"romantico",label:"Romance",emoji:"💕"},
  {id:"hostil",label:"Hostil",emoji:"😠"},
];

const INTERACTIONS=[
  {id:"saludar",label:"Saludar",emoji:"👋",cat:"hablar",req:0,effects:{social:3,diversion:2},delta:3},
  {id:"charlar",label:"Charlar un rato",emoji:"💬",cat:"hablar",req:0,effects:{social:8,diversion:5},delta:5},
  {id:"chiste",label:"Contar un chiste",emoji:"😄",cat:"hablar",req:0,effects:{diversion:10},delta:null},
  {id:"cumplido",label:"Dar un cumplido",emoji:"✨",cat:"hablar",req:0,effects:{social:6},delta:7},
  {id:"queja",label:"Desahogarse",emoji:"😤",cat:"hablar",req:25,effects:{diversion:5,social:5},delta:3},
  {id:"secreto_npc",label:"Contarle un secreto",emoji:"🤫",cat:"hablar",req:50,effects:{social:12},delta:10},
  {id:"pregunta_prof",label:"Pregunta profunda",emoji:"🤔",cat:"hablar",req:40,effects:{diversion:8,social:6},delta:8},
  {id:"invitar",label:"Invitar a tomar algo",emoji:"🥂",cat:"amistad",req:20,effects:{social:12,diversion:8},delta:8},
  {id:"ofrecer_ayuda",label:"Ofrecer ayuda",emoji:"🫂",cat:"amistad",req:0,effects:{social:8},delta:6},
  {id:"dar_regalo",label:"Darle un regalo",emoji:"🎁",cat:"amistad",req:20,effects:{social:10,diversion:5},delta:10},
  {id:"hacer_plan",label:"Proponer un plan",emoji:"📋",cat:"amistad",req:35,effects:{social:10,diversion:10},delta:8},
  {id:"broma",label:"Hacer una broma",emoji:"😜",cat:"amistad",req:15,effects:{diversion:12},delta:null},
  {id:"competir",label:"Competir en algo",emoji:"🏆",cat:"amistad",req:20,effects:{diversion:15},delta:null},
  {id:"coquetear",label:"Coquetear",emoji:"😏",cat:"romantico",req:30,effects:{social:8},delta:null,needsRom:true},
  {id:"cumplido_rom",label:"Cumplido especial",emoji:"💫",cat:"romantico",req:35,effects:{social:10},delta:5,needsRom:true},
  {id:"tomar_mano",label:"Tomar de la mano",emoji:"🫶",cat:"romantico",req:"dating",effects:{social:14},delta:6},
  {id:"abrazo_rom",label:"Dar un abrazo",emoji:"🫂",cat:"romantico",req:"dating",effects:{social:16,diversion:5},delta:7},
  {id:"beso",label:"Dar un beso",emoji:"💋",cat:"romantico",req:"dating",effects:{social:20},delta:8},
  {id:"kalei",label:"Decir 'Kalei'",emoji:"💕",cat:"romantico",req:"married",effects:{social:22,diversion:8},delta:10},
  {id:"confrontar",label:"Confrontar",emoji:"😠",cat:"hostil",req:0,effects:{},delta:null},
  {id:"disculpas",label:"Pedir disculpas",emoji:"🙏",cat:"hostil",req:0,effects:{social:5},delta:15},
  {id:"ignorar",label:"Ignorar deliberadamente",emoji:"😶",cat:"hostil",req:0,effects:{},delta:-8},
];

const CHILD_STAGES={
  bebe:{label:"Bebé",emoji:"👶",maxAge:2,color:"#E87B9E",
    interactions:[{id:"cargar",label:"Cargar al bebé",emoji:"🤱"},{id:"mecer",label:"Mecer para dormir",emoji:"🌙"},{id:"alimentar",label:"Dar de comer",emoji:"🍼"},{id:"cantar",label:"Cantar una canción",emoji:"🎵"},{id:"banar_b",label:"Dar el baño",emoji:"🛁"}]},
  infante:{label:"Infante",emoji:"🧒",maxAge:6,color:"#A67BD6",
    interactions:[{id:"jugar_inf",label:"Jugar juntos",emoji:"🎪"},{id:"cuento",label:"Leer un cuento",emoji:"📖"},{id:"consolar",label:"Consolar",emoji:"🫂"},{id:"ensenyar",label:"Enseñar algo nuevo",emoji:"🌱"},{id:"abrazo_inf",label:"Dar un abrazo",emoji:"💛"}]},
  nino:{label:"Niño/a",emoji:"🧑",maxAge:12,color:"#7BB8B9",
    interactions:[{id:"tarea",label:"Hacer la tarea juntos",emoji:"✏️"},{id:"jugar_nino",label:"Jugar a algo",emoji:"🎲"},{id:"charlar_nino",label:"Charlar del día",emoji:"☀️"},{id:"consejo_nino",label:"Dar un consejo",emoji:"💡"},{id:"reganar",label:"Hablar de algo que estuvo mal",emoji:"⚠️"}]},
  adolescente:{label:"Adolescente",emoji:"👦",maxAge:18,color:"#F5A623",
    interactions:[{id:"charlar_adol",label:"Charlar sobre la vida",emoji:"🌊"},{id:"consejo_adol",label:"Dar un consejo",emoji:"💡"},{id:"discutir",label:"Tener una discusión",emoji:"⚡"},{id:"apoyar",label:"Apoyar en algo difícil",emoji:"🫂"},{id:"espacio",label:"Darle espacio",emoji:"🌿"}]},
  adulto:{label:"Adulto/a",emoji:"🧑‍🦱",maxAge:999,color:"#6B9E5E",
    interactions:[{id:"cafe_hijo",label:"Tomar un café juntos",emoji:"☕"},{id:"pedir_consejo",label:"Pedir su consejo",emoji:"🤔"},{id:"charlar_adulto",label:"Charlar como adultos",emoji:"💬"},{id:"celebrar_hijo",label:"Celebrar un logro",emoji:"🎉"}]},
};

const CHILD_FX={
  cargar:{hap:5,rel:3},mecer:{hap:8,rel:4},alimentar:{hap:4,rel:3},cantar:{hap:10,rel:5},banar_b:{hap:3,rel:4},
  jugar_inf:{hap:12,rel:6},cuento:{hap:10,rel:7},consolar:{hap:8,rel:8},ensenyar:{hap:6,rel:5},abrazo_inf:{hap:8,rel:5},
  tarea:{hap:5,rel:5},jugar_nino:{hap:10,rel:5},charlar_nino:{hap:6,rel:5},consejo_nino:{hap:4,rel:4},reganar:{hap:-5,rel:-3},
  charlar_adol:{hap:7,rel:6},consejo_adol:{hap:5,rel:5},discutir:{hap:-8,rel:-6},apoyar:{hap:10,rel:9},espacio:{hap:5,rel:4},
  cafe_hijo:{hap:8,rel:7},pedir_consejo:{hap:10,rel:8},charlar_adulto:{hap:7,rel:6},celebrar_hijo:{hap:12,rel:8},
};

function getChildStage(daysAlive){
  const s=getLifeStage(daysAlive);
  if(s.id==="recien_nacido"||s.id==="bebe")return"bebe";
  if(s.id==="infante")return"infante";
  if(s.id==="nino"||s.id==="preadolescente")return"nino";
  if(s.id==="adolescente")return"adolescente";
  return"adulto";
}

// ═══ SKILLS ═══
const SKILLS_CFG={
  pesca:       {label:"Pesca",       emoji:"🎣",color:"#4A8B8C"},
  cocina:      {label:"Cocina",      emoji:"🍳",color:"#E8943A"},
  arte:        {label:"Arte",        emoji:"🎨",color:"#A67BD6"},
  carisma:     {label:"Carisma",     emoji:"💬",color:"#E87B9E"},
  naturaleza:  {label:"Naturaleza",  emoji:"🌿",color:"#6B9E5E"},
  conocimiento:{label:"Conocimiento",emoji:"📚",color:"#F5A623"},
};
const SKILL_LEVELS=[
  {label:"Novato",    roman:"I",   xp:0   },
  {label:"Aprendiz",  roman:"II",  xp:100 },
  {label:"Competente",roman:"III", xp:300 },
  {label:"Avanzado",  roman:"IV",  xp:600 },
  {label:"Maestro",   roman:"V",   xp:1000},
];
function getSkillLevel(xp){
  for(let i=SKILL_LEVELS.length-1;i>=0;i--)if(xp>=SKILL_LEVELS[i].xp)return i;return 0;
}
function getSkillProgress(xp){
  const lv=getSkillLevel(xp);
  if(lv>=SKILL_LEVELS.length-1)return 100;
  const cur=SKILL_LEVELS[lv].xp,nxt=SKILL_LEVELS[lv+1].xp;
  return Math.min(100,((xp-cur)/(nxt-cur))*100);
}
function computeSkillXP(current,gains){
  const next={...current};const levelUps=[];
  for(const[skill,xp]of Object.entries(gains)){
    const oldLv=getSkillLevel(current[skill]||0);
    next[skill]=(current[skill]||0)+xp;
    const newLv=getSkillLevel(next[skill]);
    if(newLv>oldLv)levelUps.push({skill,level:newLv});
  }
  return{next,levelUps};
}
const ACTION_SKILL_XP={
  fish:       {pesca:18,naturaleza:5},
  sit_lake:   {pesca:6,naturaleza:8},
  swim:       {naturaleza:14,pesca:4},
  walk_shore: {naturaleza:12},
  secret_lake:{naturaleza:10},
  cook:       {cocina:18},
  eat_dish:   {cocina:6},
  cena:       {cocina:10},
  hobby:      {arte:18},
  watch_show: {arte:12},
  browse_books:{arte:8,conocimiento:8},
  buy_book:   {conocimiento:12,arte:5},
  research:   {conocimiento:22},
  read_lib:   {conocimiento:16},
  read_cafe:  {conocimiento:8},
  walk_park:  {naturaleza:12},
  picnic:     {naturaleza:14},
  walk_plaza: {carisma:6},
  walk_shore: {naturaleza:12},
  checkup:    {conocimiento:6},
  cerc_moldear:{arte:20,naturaleza:10},cerc_ver:{arte:8},cerc_torno:{arte:15,naturaleza:5},
  cine_ver:   {arte:12,conocimiento:8},cine_charlar:{carisma:8},
  musica_tocar:{arte:15,carisma:5},musica_clase:{arte:8},musica_impro:{arte:20},
  bodega_probar:{carisma:5},bodega_historia:{carisma:8,conocimiento:5},bodega_contar:{carisma:12},
  parque2_pasto:{naturaleza:10},parque2_leer:{conocimiento:8,naturaleza:3},parque2_pajaros:{naturaleza:12},
  azotea2_lago:{naturaleza:12},azotea2_dibujar:{arte:15},azotea2_estrellas:{conocimiento:10,naturaleza:5},
  feria_unico:{conocimiento:5},feria_feriantes:{carisma:8,conocimiento:5},
  civico_taller:{carisma:8,conocimiento:8},civico_ayuda:{carisma:15},civico_vecinos:{carisma:8},
};

// ═══ RANDOM EVENTS ═══
const RANDOM_EVENTS=[
  // Mundo — siempre
  {id:"e01",season:null,req:null,    text:"El lago amaneció cubierto de una neblina que no se disipa. Los pescadores del muelle se miran entre sí sin decir nada."},
  {id:"e02",season:null,req:null,    text:"Alguien dejó un libro sin nombre en el banco del parque de Los Prados. Adentro hay una sola línea subrayada en tinta verde: *La puerta no desaparece. Solo espera.*"},
  {id:"e03",season:null,req:null,    text:"Hubo ruido en la Plaza del Veloer a medianoche. Nadie sabe qué fue. Esta mañana los adoquines tienen algo parecido a marcas que no estaban antes."},
  {id:"e04",season:null,req:null,    text:"Un Mirelo — pájaro de cola azul, señal de cambio de clima — se posó en tu ventana esta mañana y se quedó tres minutos mirando adentro."},
  {id:"e05",season:null,req:null,    text:"El reloj de la Plaza paró durante exactamente doce minutos hoy. Cuando volvió, marcaba la hora correcta. Nadie lo tocó."},
  {id:"e06",season:null,req:null,    text:"Encontraste una nota doblada en el piso del café. Decía solo: *¿Sabés cuántos fundadores firmaron el Acta de la Llegada?* No tenía firma."},
  {id:"e07",season:null,req:null,    text:"Está circulando en Veloria la noticia de que alguien vio una luz en el centro del Lago Miren a las 3 de la madrugada. No es la primera vez que pasa."},
  {id:"e08",season:null,req:null,    text:"El mercado tiene especias del norte que no se ven en Veloria hace un año. El vendedor dice que no sabe cómo llegaron."},
  // Misterio / lore
  {id:"e09",season:null,req:null,    text:"En el callejón detrás del Teatro de Cael apareció un graffiti nuevo esta mañana. Dice solo: *El decimotercero cruzó voluntariamente.* Para la tarde ya lo habían borrado."},
  {id:"e10",season:null,req:null,    text:"Encontraste en el Mercado un mapa antiguo de Veloria. Tiene un punto marcado en el centro del lago con la letra *V*. El vendedor dice que no sabe de dónde salió."},
  {id:"e11",season:null,req:null,    text:"Alguien arrancó las últimas tres páginas del libro de registros en la entrada de la Biblioteca. Ciro lo descubrió esta mañana. No dijo nada."},
  // Primavera
  {id:"e12",season:"Primavera",req:null,text:"Las flores Velora florecieron antes de lo esperado. Hay tantas en la orilla del lago que el agua se ve dorada desde lejos."},
  {id:"e13",season:"Primavera",req:null,text:"La primera lluvia del año cayó anoche sobre Veloria. Todo el mundo dice que la primera lluvia del año es la que más limpia."},
  // Verano
  {id:"e14",season:"Verano",req:null,  text:"El calor de esta semana hizo que todo Veloria buscara el lago. Hay gente que no veías desde el invierno pasado."},
  {id:"e15",season:"Verano",req:null,  text:"Alguien instaló una hamaca entre dos árboles del parque y dejó una nota: *Para el que la necesite.*"},
  // Otoño
  {id:"e16",season:"Otoño",req:null,   text:"Las hojas del parque están en el momento exacto antes de caer. Veloria en otoño tiene esa cosa de las cosas que duran poco."},
  {id:"e17",season:"Otoño",req:null,   text:"El mercado huele a especias de La Cosecha todo el día. Es el olor que uno recuerda cuando piensa en Veloria desde lejos."},
  // Invierno
  {id:"e18",season:"Invierno",req:null, text:"Nevó esta noche en Veloria. Los tejados de El Casco quedaron blancos y alguien dibujó algo en la nieve frente a la Biblioteca. Para cuando llegaste ya estaba deshecho."},
  {id:"e19",season:"Invierno",req:null, text:"El lago no se congeló todavía, pero la orilla sí. Los Mirenpeces se ven muy cerca de la superficie, como si el frío los subiera."},
  // NPCs específicos
  {id:"e20",season:null,req:"npc:Aria Ven",   text:"Aria cerró el café dos horas antes hoy sin dar explicaciones. Alguien del barrio dice haberla visto sentada sola en el muelle de Ribera."},
  {id:"e21",season:null,req:"npc:Oren Mirende",text:"Oren salió solo al lago de noche — algo que nunca hace, según Tomas. Volvió antes del amanecer sin decir nada."},
  {id:"e22",season:null,req:"npc:Ciro Orlen", text:"Te llegó el rumor de que Ciro lleva tres días en la Biblioteca sin salir a almorzar. Está revisando los registros del Año 1 de Veloria."},
  {id:"e23",season:null,req:"npc:Soren Lume", text:"La librería de Soren tiene un cartel nuevo: *Cerrado por razones personales*. Es la primera vez en cuatro años."},
  {id:"e24",season:null,req:"npc:Elowen Sorvei",text:"Elowen publicó una hoja suelta — esas que a veces aparecen pegadas en los postes de Veleta. Decía solo: *Todo lo que fue sigue siendo.*"},
  // Familia
  {id:"e25",season:null,req:"partner",  text:"[PARTNER] te dejó una nota en la cocina esta mañana. Solo decía: *Velin.* En Twinés eso puede significar más que hola."},
  {id:"e26",season:null,req:"child",    text:"[CHILD] te preguntó hoy adónde va la gente cuando ya no está. No supiste bien qué responder. Pero te alegra que lo haya preguntado a vos."},
  {id:"e27",season:null,req:"child",    text:"[CHILD] hizo algo hoy que no esperabas. Algo pequeño. Esas son las cosas que uno recuerda mucho después, cuando ya no se pueden explicar por qué."},
];

// ═══ LIFE STAGE SYSTEM (day-based) ═══
// Player always starts at "joven" (Joven Adulto). daysLived = PLAYER_START_DAYS + (gt.day - 1)
const LIFE_STAGES=[
  {id:"recien_nacido", label:"Recién Nacido/a",emoji:"🍼",color:"#F0E0C8",days:1, cumStart:0, skillMult:0,   decayMult:1.5},
  {id:"bebe",          label:"Bebé",            emoji:"👶",color:"#F4B8C1",days:2, cumStart:1, skillMult:0.2, decayMult:1.4},
  {id:"infante",       label:"Infante",         emoji:"🌼",color:"#F7E59E",days:3, cumStart:3, skillMult:0.4, decayMult:1.3},
  {id:"nino",          label:"Niño/a",           emoji:"🌸",color:"#A8D5A2",days:4, cumStart:6, skillMult:0.6, decayMult:1.2},
  {id:"preadolescente",label:"Preadolescente",  emoji:"🌿",color:"#7BB8B9",days:4, cumStart:10,skillMult:0.7, decayMult:1.1},
  {id:"adolescente",   label:"Adolescente",     emoji:"🌊",color:"#5E97C7",days:7, cumStart:14,skillMult:0.9, decayMult:1.0},
  {id:"joven",         label:"Joven Adulto/a",  emoji:"🌱",color:"#F5A623",days:14,cumStart:21,skillMult:1.2, decayMult:0.9},
  {id:"adulto",        label:"Adulto/a",        emoji:"🌳",color:"#7A5840",days:14,cumStart:35,skillMult:1.0, decayMult:1.0},
  {id:"anciano",       label:"Anciano/a",       emoji:"✦", color:"#7A5840",days:10,cumStart:49,skillMult:0.4, decayMult:1.3},
];
const TOTAL_LIFESPAN=59;
const PLAYER_START_DAYS=21; // player starts at Joven Adulto (cumStart=21)

function getLifeStage(daysLived){
  for(let i=LIFE_STAGES.length-1;i>=0;i--){
    if(daysLived>=LIFE_STAGES[i].cumStart)return LIFE_STAGES[i];
  }
  return LIFE_STAGES[0];
}
function getDaysInStage(daysLived){
  const s=getLifeStage(daysLived);
  return{stage:s,inStage:daysLived-s.cumStart,ofStage:s.days};
}
const AGE_MILESTONES=[25,30,40,50,60,70]; // kept for backward compat

// ═══ HOUSING ═══
const HOUSING_TIERS=[
  {id:"apto_basico", label:"Apartamento básico",emoji:"🏠",price:0,    desc:"Tu primer hogar en Veloria.",                       slots:4, needBonus:{},                          skillBonus:{}},
  {id:"apto_grande", label:"Apartamento amplio",emoji:"🏢",price:2500, desc:"Más espacio, mejor ventilación, vistas a La Vega.", slots:8, needBonus:{sueno:5,diversion:5},       skillBonus:{}},
  {id:"casa_pequena",label:"Casa con jardín",   emoji:"🏡",price:8000, desc:"Una casa propia en Veloria. Con jardín y todo.",    slots:12,needBonus:{sueno:8,diversion:8,social:5},skillBonus:{naturaleza:1.1}},
  {id:"casa_grande", label:"Casa Veloria",      emoji:"🏘",price:20000,desc:"La casa de quien echó raíces de verdad en Veloria.",slots:20,needBonus:{sueno:12,diversion:12,social:8,higiene:5},skillBonus:{naturaleza:1.15,cocina:1.1}},
];
const FURNITURE_ITEMS={
  cama_comoda:  {label:"Cama Velora",        emoji:"🛏",price:350, desc:"Recuperás más sueño en casa.",              needBonus:{sueno:12},            skillBonus:{}},
  cocina_equip: {label:"Cocina equipada",    emoji:"🍳",price:450, desc:"Cocinar acá sube más el skill de Cocina.", needBonus:{hambre:8},             skillBonus:{cocina:1.25}},
  biblioteca_p: {label:"Biblioteca personal",emoji:"📚",price:550, desc:"Conocimiento crece más en casa.",           needBonus:{},                    skillBonus:{conocimiento:1.25}},
  sillon_comodo:{label:"Sillón del Veloer",  emoji:"🛋",price:280, desc:"Descansar acá restaura más.",              needBonus:{diversion:10,sueno:5}, skillBonus:{}},
  instrumento:  {label:"Instrumento musical",emoji:"🎸",price:700, desc:"Activa nueva acción en casa.",             needBonus:{diversion:5},          skillBonus:{arte:1.3}},
  plantas_miren:{label:"Plantas Mireno",     emoji:"🌿",price:180, desc:"Naturaleza crece más.",                    needBonus:{diversion:5},          skillBonus:{naturaleza:1.2}},
  acuario_miren:{label:"Acuario Miren",      emoji:"🐠",price:800, desc:"Pesca sube más en casa.",                 needBonus:{diversion:8},          skillBonus:{pesca:1.2}},
  escritorio:   {label:"Escritorio Mireno",  emoji:"📝",price:380, desc:"Conocimiento +15%.",                      needBonus:{},                    skillBonus:{conocimiento:1.15}},
  espejo_grande:{label:"Espejo Velota",      emoji:"🪞",price:220, desc:"La higiene se mantiene mejor.",            needBonus:{higiene:8},            skillBonus:{}},
  ventana_vista:{label:"Ventana panorámica", emoji:"🪟",price:950, desc:"Cambia cómo ves Veloria.",                needBonus:{diversion:12,social:5}, skillBonus:{}},
};

// ═══ SKILL UNLOCKS ═══
const SKILL_UNLOCKS={
  pesca:{
    2:[{id:"fish_night",  label:"Pescar de noche",            emoji:"🌙",place:"Lago Miren",    time:4,  nKey:"sk:fish_night"}],
    3:[{id:"fish_deep",   label:"Zona profunda del Miren",    emoji:"⚓",place:"Muelle",         time:4,  nKey:"sk:fish_deep"}],
    5:[{id:"fish_tomas",  label:"El secreto de Tomas",        emoji:"🤫",place:"Muelle",         time:1,  nKey:"sk:fish_tomas",once:true}],
  },
  cocina:{
    2:[{id:"cook_recipe", label:"Receta especial",            emoji:"✨",place:"Tu apartamento",  time:2,  nKey:"sk:cook_recipe"}],
    3:[{id:"dinner_party",label:"Invitar a cenar",             emoji:"🍽",place:"Tu apartamento",  time:3,  nKey:"sk:dinner_party"}],
  },
  arte:{
    2:[{id:"sell_art",    label:"Vender creaciones (+L30)",   emoji:"🖼",place:"Plaza del Veloer",time:1,  nKey:"sk:sell_art",moneyGain:30}],
    3:[{id:"exhibit",     label:"Exhibir en la Galería",      emoji:"🎨",place:"Teatro de Cael",  time:2,  nKey:"sk:exhibit"}],
  },
  carisma:{
    4:[{id:"velista",     label:"Hablar como Velista",        emoji:"🌟",place:null,              time:1,  nKey:"sk:velista"}],
  },
  naturaleza:{
    2:[{id:"care_plants", label:"Cuidar las plantas",         emoji:"🌱",place:"Tu apartamento",  time:0.5,nKey:"sk:care_plants",reqFurniture:"plantas_miren"}],
    3:[{id:"secret_path", label:"Senda secreta del Miren",    emoji:"🌿",place:"Lago Miren",      time:2,  nKey:"sk:secret_path"}],
  },
  conocimiento:{
    3:[{id:"research_13", label:"Investigar el 13° fundador", emoji:"🔍",place:"Biblioteca",      time:3,  nKey:"sk:research_13"}],
    4:[{id:"elowen_home", label:"Visitar a Elowen (lore)",    emoji:"📖",place:"Veleta",           time:2,  nKey:"sk:elowen_home",once:true}],
  },
};

// New La Vega XP in ACTION_SKILL_XP (added inline via Object.assign after existing object)
const ACTION_SKILL_XP_EXTRA={
  terr_amanecer:{naturaleza:12},terr_escribir:{arte:14,conocimiento:6},
  terr_estrellas:{naturaleza:8,conocimiento:10},terr_huerto:{naturaleza:14},
  tienda_charlar:{carisma:6},jardin_plantar:{naturaleza:18},
  jardin_cosechar:{naturaleza:10},jardin_pasear:{naturaleza:12},
  pan_ver_hacer:{cocina:8},estudio_pintar:{arte:20},
  estudio_ver:{arte:8},estudio_conocer:{carisma:8},estudio_tecnica:{arte:16},
  bar_conocer:{carisma:10},bar_mirone:{carisma:6},merc_charlar:{carisma:5},
  gym_natacion:{pesca:5,naturaleza:8},
};

// ═══ NPC AUTONOMY ═══
const NPC_AUTONOMY=[
  {id:"aria_coffee",    npc:"Aria Ven",     reqFr:40,reqSkill:null,  chance:0.07,cooldown:18,once:false,
   message:"Aria golpeó tu puerta esta mañana con dos tazas de café. 'Vivo dos pisos más arriba', dice, como si no lo supieras. 'Pensé que quizás querías compañía.'",
   options:[{text:"Invitarla a pasar ☕",    fr:10,nKey:"aut:aria_in"},{text:"Charlar en la puerta", fr:6,nKey:"aut:aria_door"},{text:"Agradecer y excusarte",fr:1,nKey:"aut:aria_busy"}]},
  {id:"ciro_note",      npc:"Ciro Orlen",   reqFr:50,reqSkill:"conocimiento:2",chance:0.05,cooldown:25,once:true,
   message:"Encontraste una nota de Ciro debajo de tu puerta: *'Hay algo que tenés que ver. Vení a la Biblioteca cuando puedas. No le digas a nadie.'* La letra está apurada.",
   options:[{text:"Ir a la Biblioteca ahora",fr:8,nKey:"aut:ciro_go",navigate:{hood:"Veleta",place:"Biblioteca"}},{text:"Responder que vas mañana",fr:3,nKey:"aut:ciro_tmr"},{text:"Guardarlo para después",fr:0,nKey:"default"}]},
  {id:"oren_visit",     npc:"Oren Mirende", reqFr:45,reqSkill:null,  chance:0.06,cooldown:20,once:false,
   message:"Oren apareció en La Vega — algo que casi nunca hace. Alguien le dijo que preguntó por vos en el café. Quiere mostrarte algo en el lago antes de que anochezca.",
   options:[{text:"Ir al Muelle ahora",       fr:8,nKey:"aut:oren_go",navigate:{hood:"Ribera",place:"Muelle"}},{text:"Quedar para mañana",fr:4,nKey:"aut:oren_tmr"},{text:"No podés hoy",fr:0,nKey:"default"}]},
  {id:"luma_serenade",  npc:"Luma Sorvei",  reqFr:35,reqSkill:null,  chance:0.05,cooldown:30,once:false,
   message:"Son las once de la noche y desde tu ventana escuchás una guitarra. Abajo en la vereda de La Vega, Luma toca algo que no habías escuchado antes. No para.",
   options:[{text:"Bajar a escuchar",         fr:8,nKey:"aut:luma_bajar"},{text:"Abrir la ventana y aplaudir",fr:5,nKey:"aut:luma_ventana"},{text:"Cerrar las persianas",fr:-2,nKey:"default"}]},
  {id:"elowen_book",    npc:"Elowen Sorvei",reqFr:40,reqSkill:"conocimiento:3",chance:0.04,cooldown:40,once:true,
   message:"Alguien dejó un libro en tu buzón. La cubierta no tiene título. La primera página dice en letra de Elowen: *'Porque creo que estás listo/a para esto.'*",
   options:[{text:"Empezar a leerlo ahora",   fr:5,nKey:"aut:elowen_leer",xp:{conocimiento:30}},{text:"Ir a agradecerle",fr:8,nKey:"aut:elowen_ir",navigate:{hood:"Veleta",place:"Teatro de Cael"}},{text:"Guardarlo para esta noche",fr:0,nKey:"default"}]},
  {id:"soren_rec",      npc:"Soren Lume",   reqFr:40,reqSkill:null,  chance:0.06,cooldown:20,once:false,
   message:"Un mensaje de Soren, con esa letra pequeña y precisa: *'Tengo algo para vos en la librería. No lo guardo mucho tiempo.'*",
   options:[{text:"Ir a la librería",         fr:6,nKey:"aut:soren_ir",navigate:{hood:"El Casco",place:"Librería de Soren"}},{text:"Responder que vas",fr:3,nKey:"default"},{text:"Ignorarlo por ahora",fr:0,nKey:"default"}]},
  {id:"nela_dinner",    npc:"Nela Mirende", reqFr:50,reqSkill:null,  chance:0.04,cooldown:30,once:false,
   message:"Nela te mandó un mensaje. El Restaurante cierra hoy temprano y va a cocinar algo que '*no está en el menú*'. Te invita. Hay espacio para dos.",
   options:[{text:"Ir al restaurante",        fr:10,nKey:"aut:nela_ir",navigate:{hood:"Ribera",place:"Restaurante de Nela"}},{text:"Agradecer y excusarte",fr:2,nKey:"default"}]},
  {id:"bren_checkup",   npc:"Bren Orlen",   reqFr:30,reqSkill:null,  chance:0.03,cooldown:60,once:false,reqAge:50,
   message:"Bren pasó por La Vega. Dice que a partir de cierta edad conviene un control por año. No como obligación — como atención. Te dejó un turno agendado.",
   options:[{text:"Confirmar el turno",       fr:5,nKey:"aut:bren_ir",navigate:{hood:"Los Prados",place:"Consultorio de Bren"}},{text:"Ya vas a ir",fr:2,nKey:"default"}]},
  {id:"aldric_invite",  npc:"Aldric Veloer",reqFr:60,reqSkill:null,  chance:0.03,cooldown:40,once:true,
   message:"Aldric Veloer te mandó un mensaje formal. Quiere que tomes un café con él en la Plaza. '*Hay cosas sobre Veloria que creo que ya estás listo para saber*', dice.",
   options:[{text:"Ir a la Plaza ahora",      fr:10,nKey:"aut:aldric_ir",navigate:{hood:"El Casco",place:"Plaza del Veloer"},xp:{conocimiento:20}},{text:"Confirmar para mañana",fr:5,nKey:"default"},{text:"Pedir más detalles",fr:3,nKey:"default"}]},

  {id:"lior_help",     npc:"Lior Veloer",   reqFr:30,reqSkill:null,  chance:0.06,cooldown:14,once:false,
   message:"Lior te mandó un mensaje directo. 'Estoy trabado/a con algo. No sé a quién más preguntarle.' Hay algo en cómo lo escribe que hace que quieras responder.",
   options:[{text:"Ir a ayudar",             fr:10,nKey:"aut:lior_ir",navigate:{hood:"Veleta",place:"Biblioteca"},xp:{conocimiento:10}},{text:"Decirle que lo resuelva solo/a",fr:-5,nKey:"aut:lior_help"},{text:"Responder más tarde",fr:2,nKey:"default"}]},

  {id:"elia_harvest",  npc:"Elia Orlen",    reqFr:25,reqSkill:null,  chance:0.06,cooldown:18,once:false,
   message:"Elia te dejó una nota pegada en tu puerta. 'Esta tarde cosechamos en el Jardín Comunitario. Si tenés ganas, hay lugar.' Así de simple.",
   options:[{text:"Ir al jardín",            fr:8, nKey:"aut:elia_ir",navigate:{hood:"La Vega",place:"Jardín Comunitario"},xp:{naturaleza:20}},{text:"Ir mañana",fr:3,nKey:"aut:elia_tmr"},{text:"No podés",fr:0,nKey:"default"}]},

  {id:"vael_collab",   npc:"Vael Lumaren",  reqFr:40,reqSkill:"arte:2",chance:0.05,cooldown:25,once:false,
   message:"Vael te escribe desde el Estudio de Arte. 'Tengo un proyecto y hay algo que no sé cómo resolver. ¿Te interesan las colaboraciones?' La pregunta suena casual. No lo es.",
   options:[{text:"Ir al Estudio",           fr:12,nKey:"aut:vael_ir",navigate:{hood:"La Vega",place:"Estudio de Arte"},xp:{arte:25}},{text:"Preguntar de qué se trata",fr:4,nKey:"default"},{text:"Excusarte",fr:-3,nKey:"aut:vael_no"}]},

  {id:"senia_special", npc:"Senia Vel",     reqFr:35,reqSkill:null,  chance:0.04,cooldown:35,once:true,
   message:"Senia te dejó una nota en el Taller. 'Martes a las 18: taller especial. Técnica de reducción de fuego. No lo enseño a cualquiera. Si venís, venís.' No pregunta si podés. Asume.",
   options:[{text:"Estar ahí el martes",     fr:15,nKey:"aut:senia_taller",navigate:{hood:"La Vega",place:"Taller Cerámica"},xp:{arte:40,naturaleza:15}},{text:"Agradecerle y no poder",fr:2,nKey:"default"}]},

  {id:"feria_sobre",   npc:"Aria Ven",      reqFr:20,reqSkill:null,  chance:0.03,cooldown:50,once:true,reqAge:null,
   message:"Aria te dice que alguien en la Feria Nocturna preguntó por vos por nombre. Dejó un sobre en el puesto del fondo. Nadie sabe quién era.",
   options:[{text:"Ir a buscar el sobre",    fr:5,nKey:"aut:feria_sobre",navigate:{hood:"La Vega",place:"Feria Nocturna"},xp:{conocimiento:15}},{text:"Ignorarlo",fr:0,nKey:"default"}]},
];

function getSkillUnlockActions(skills,loc,placedFurniture,usedOnce){
  const extra=[];
  for(const[skill,levels]of Object.entries(SKILL_UNLOCKS)){
    const lv=getSkillLevel(skills[skill]||0);
    for(const[minLv,actions]of Object.entries(levels)){
      if(lv<parseInt(minLv))continue;
      for(const a of actions){
        if(a.place&&a.place!==loc.place&&!(a.place==="Veleta"&&loc.hood==="Veleta"))continue;
        if(a.reqFurniture&&!placedFurniture.includes(a.reqFurniture))continue;
        if(a.once&&usedOnce?.has(a.id))continue;
        extra.push({...a,isSkillUnlock:true});
      }
    }
  }
  return extra;
}

function getHousingEffects(housingId,placedFurniture){
  const tier=HOUSING_TIERS.find(h=>h.id===housingId)||HOUSING_TIERS[0];
  const eff={needBonus:{...tier.needBonus},skillBonus:{...tier.skillBonus}};
  for(const fId of placedFurniture){
    const f=FURNITURE_ITEMS[fId];if(!f)continue;
    for(const[n,v]of Object.entries(f.needBonus||{}))eff.needBonus[n]=(eff.needBonus[n]||0)+v;
    for(const[s,m]of Object.entries(f.skillBonus||{}))eff.skillBonus[s]=(eff.skillBonus[s]||1)*m;
  }
  return eff;
}
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
  if(needs.sueno>75&&needs.diversion>65)return["Descansado/a","#F5A623"];
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
          <div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:i<filled?barColor:"transparent",border:`1.5px solid ${i<filled?barColor:"#BBA090"}`,transition:"all 0.4s ease"}}/>
        ))}
      </div>
      <span style={{fontSize:"9px",color:"#B8907A",width:"18px"}}>{Math.round(value)}</span>
    </div>
  );
}
function NPCAvatar({name,size=28}){
  const color=NPC_HOOD_COLOR[name]||"#7A5840";
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
      style={{display:"flex",alignItems:"center",gap:"6px",padding:"7px 13px",borderRadius:"20px",fontSize:"12px",border:`1px solid ${hov?accentColor:"#BBA090"}`,background:hov?`${accentColor}18`:"transparent",color:hov?accentColor:"#7A5840",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,transition:"all 0.15s",whiteSpace:"nowrap"}}>
      <span>{action.emoji}</span>{action.label}{action.cost&&<span style={{fontSize:"9px",color:"#B8907A"}}>L{action.cost}</span>}
    </button>
  );
}

function getActionSkillInfo(id){
  const xp=ACTION_SKILL_XP[id];if(!xp)return null;
  const [skill]=Object.entries(xp)[0]||[];
  const cfg=SKILLS_CFG[skill];return cfg?`${cfg.emoji} ${cfg.label}`:null;
}

function ActionCard({action,onClick,disabled,hoodColor}){
  const [hov,setHov]=useState(false);
  const skill=getActionSkillInfo(action.id);
  const isNPC=action.id==="chat_npc";
  return(
    <button onClick={onClick} disabled={disabled}
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      style={{textAlign:"left",padding:"10px",borderRadius:"10px",border:`1px solid ${hov?hoodColor:"#E0D4C8"}`,background:hov?`${hoodColor}0D`:"#FFFFFF",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.5:1,transition:"all 0.15s"}}>
      <div style={{fontSize:"18px",marginBottom:"3px"}}>{action.emoji}</div>
      <div style={{fontSize:"11px",color:hov?hoodColor:"#7A5840",fontWeight:500,lineHeight:1.2,marginBottom:2}}>{isNPC&&action.npc?action.npc.split(" ")[0]:action.label}</div>
      <div style={{display:"flex",gap:"5px",flexWrap:"wrap"}}>
        <span style={{fontSize:"9px",color:"#D4C4B0"}}>{action.time}h</span>
        {action.cost&&<span style={{fontSize:"9px",color:"#F5A623"}}>L{action.cost}</span>}
        {skill&&<span style={{fontSize:"9px",color:"#BBA090"}}>{skill}</span>}
      </div>
    </button>
  );
}

// ═══════════════════ TAB COMPONENTS ═══════════════════
function AccionesTab({loc,career,NEIGHBORHOODS,PLACE_ACTIONS,loading,dark,onGoTo,onAction,onWork,extraActions=[],chainActions=[],onChainAction}){
  const [selHood,setSelHood]=useState(loc.hood);
  const hoodColor=(NEIGHBORHOODS[loc.hood]||{}).color||"#F5A623";
  const selColor=(NEIGHBORHOODS[selHood]||{}).color||"#F5A623";
  const isAtWorkplace=career&&CAREERS[career.track]?.places.includes(loc.place);
  const actions=PLACE_ACTIONS[loc.place]||[];
  // Sync selHood when player navigates to different hood
  useEffect(()=>{setSelHood(loc.hood);},[loc.hood]);
  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      {/* Neighborhood chips */}
      <div style={{overflowX:"auto",display:"flex",gap:"5px",padding:"7px 12px 5px",flexShrink:0,borderBottom:"1px solid #1A1208"}}>
        {Object.entries(NEIGHBORHOODS).map(([hood,d])=>(
          <button key={hood} onClick={()=>setSelHood(hood)}
            style={{flexShrink:0,padding:"4px 10px",borderRadius:"12px",border:`1px solid ${selHood===hood?d.color:"#E0D4C8"}`,background:selHood===hood?`${d.color}18`:"transparent",color:selHood===hood?d.color:"#BBA090",fontSize:"10px",cursor:"pointer",whiteSpace:"nowrap",fontWeight:selHood===hood?600:400}}>
            {d.emoji} {hood}
          </button>
        ))}
      </div>
      {/* Place chips — wrap for many places */}
      <div style={{display:"flex",flexWrap:"wrap",gap:"4px",padding:"5px 12px 6px",maxHeight:"76px",overflowY:"auto",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        {(NEIGHBORHOODS[selHood]?.places||[]).map(p=>(
          <button key={p} onClick={()=>!loading&&onGoTo(selHood,p)} disabled={loading}
            style={{padding:"3px 9px",borderRadius:"9px",border:`1.5px solid ${loc.place===p&&loc.hood===selHood?selColor:C.border}`,background:loc.place===p&&loc.hood===selHood?`${selColor}18`:C.white,color:loc.place===p&&loc.hood===selHood?selColor:C.textDim,fontSize:"10px",cursor:loading?"not-allowed":"pointer",whiteSpace:"nowrap",fontFamily:"'Fredoka',sans-serif",fontWeight:loc.place===p&&loc.hood===selHood?600:400}}>
            {p.length>14?p.slice(0,13)+"…":p}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div style={{flex:1,overflowY:"auto",padding:"8px 10px 10px"}}>
        {/* Chain actions — desbloqueadas por acciones previas */}
        {chainActions.filter(ca=>!ca.requiredPlace||ca.requiredPlace===loc.place).length>0&&(
          <div style={{marginBottom:"10px"}}>
            {chainActions.filter(ca=>!ca.requiredPlace||ca.requiredPlace===loc.place).map(ca=>(
              <button key={ca.id} onClick={()=>onChainAction&&onChainAction(ca.id)} disabled={loading}
                style={{width:"100%",padding:"10px 12px",borderRadius:"12px",border:`1.5px solid ${C.orange}`,background:C.orangeLight,display:"flex",gap:"10px",alignItems:"center",cursor:loading?"not-allowed":"pointer",textAlign:"left",marginBottom:"6px",opacity:loading?0.5:1}}>
                <span style={{fontSize:"18px"}}>✦</span>
                <span style={{fontSize:"16px"}}>{ca.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"13px",color:C.orange,fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>{ca.label}</div>
                  <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>{ca.hint}</div>
                </div>
                <span style={{color:C.orange,fontSize:"16px"}}>›</span>
              </button>
            ))}
          </div>
        )}
        {isAtWorkplace&&(
          <button onClick={onWork} disabled={loading}
            style={{width:"100%",padding:"9px",borderRadius:"10px",border:`1px solid ${C.green}`,background:"rgba(122,181,92,0.08)",color:C.green,fontSize:"11px",cursor:loading?"not-allowed":"pointer",marginBottom:"8px",fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>
            💼 Trabajar ({CAREERS[career.track].shiftH}h) → +L{CAREERS[career.track].wages[career.level]}
          </button>
        )}
        {actions.length>0&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:extraActions.length>0?"10px":0}}>
            {actions.map(a=><ActionCard key={a.id+(a.npc||"")} action={a} onClick={()=>onAction(a)} disabled={loading} hoodColor={hoodColor}/>)}
          </div>
        )}
        {extraActions.length>0&&(
          <div style={{borderTop:`1px solid ${C.border}`,paddingTop:"8px"}}>
            <div style={{fontSize:"9px",color:C.orange,textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px",fontFamily:"'Nunito',sans-serif"}}>✦ Habilidades desbloqueadas</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
              {extraActions.map(a=>(
                <button key={a.id} onClick={()=>onAction(a)} disabled={loading}
                  style={{padding:"9px 12px",borderRadius:"9px",border:`1px solid ${C.border}`,background:C.cardWarm,display:"flex",gap:"8px",alignItems:"center",cursor:loading?"not-allowed":"pointer",textAlign:"left",opacity:loading?0.4:1}}>
                  <span style={{fontSize:"16px"}}>{a.emoji}</span>
                  <div>
                    <div style={{fontSize:"11px",color:C.orange,fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>{a.label}</div>
                    {getActionSkillInfo(a.id)&&<div style={{fontSize:"9px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>{getActionSkillInfo(a.id)}</div>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function SocialTab({rels,family,currentDay,dark,loading,onRomanceAction,onInteract,onChildInteract,npcWorld}){
  const [mode,setMode]=useState("twins");
  const [sel,setSel]=useState(null);
  const [cat,setCat]=useState("hablar");
  const sorted=Object.entries(rels).sort(([,a],[,b])=>(b.friendship||0)-(a.friendship||0));
  const selRel=sel?rels[sel]:null;
  const fr=selRel?.friendship||0;
  const isPartner=family.partner===sel;
  const romStatus=family.romanticStatus;

  function isUnlocked(req){
    if(req==="dating")return isPartner&&(romStatus==="dating"||romStatus==="engaged"||romStatus==="married");
    if(req==="engaged")return isPartner&&(romStatus==="engaged"||romStatus==="married");
    if(req==="married")return isPartner&&romStatus==="married";
    return fr>=req;
  }

  const catInteractions=INTERACTIONS.filter(i=>{
    if(i.cat!==cat)return false;
    if(cat==="romantico"){
      if(!sel||!ROMANCEABLE.has(sel))return false;
      if(i.needsRom&&fr<i.req)return false;
      if(typeof i.req==="string")return isUnlocked(i.req);
      return fr>=(i.req||0);
    }
    return isUnlocked(i.req||0);
  });

  const sLabel={dating:"💕 En pareja",engaged:"💍 Comprometido/a",married:"💒 Casado/a"};

  // Romance/family quick actions still shown at bottom
  function getRomActs(){
    if(!sel||!selRel)return[];
    const acts=[];
    if(!isPartner&&!family.partner&&ROMANCEABLE.has(sel)&&fr>40)acts.push({id:"ask_out",label:"💕 Invitar a salir",color:"#E87B9E"});
    if(isPartner&&romStatus==="dating"&&fr>65)acts.push({id:"propose",label:"💍 Proponer matrimonio",color:"#F5A623"});
    if(isPartner&&romStatus==="engaged")acts.push({id:"marry",label:"💒 Casarse",color:"#F5A623"});
    if(isPartner&&romStatus==="married")acts.push({id:"have_child",label:"👶 Tener un hijo",color:"#7BB8B9"});
    if(isPartner&&(romStatus==="dating"||romStatus==="engaged"))acts.push({id:"breakup",label:"💔 Terminar",color:"#E05555"});
    if(isPartner&&romStatus==="married")acts.push({id:"divorce",label:"💔 Separarse",color:"#E05555"});
    return acts;
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      {/* Mode toggle */}
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <button onClick={()=>{setMode("twins");setSel(null);}} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:mode==="twins"?`2px solid ${C.teal}`:"2px solid transparent",background:"transparent",color:mode==="twins"?C.teal:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
          👥 Twins ({sorted.length})
        </button>
        <button onClick={()=>setMode("familia")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:mode==="familia"?"2px solid #E87B9E":"2px solid transparent",background:"transparent",color:mode==="familia"?"#E87B9E":C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
          👨‍👩‍👧 Familia
        </button>
        <button onClick={()=>setMode("veloria")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:mode==="veloria"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:mode==="veloria"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
          🏙 Veloria
        </button>
      </div>

      {/* TWINS MODE */}
      {mode==="twins"&&(
        <div style={{display:"flex",flex:1,overflow:"hidden"}}>
          {/* NPC list */}
          <div style={{width:"150px",borderRight:"1px solid #1A1208",overflowY:"auto",padding:"6px"}}>
            {sorted.length===0&&<div style={{fontSize:"9px",color:"#D4C4B0",fontStyle:"italic",padding:"6px",lineHeight:"1.4"}}>Todavía no conocés a nadie. Salí a charlar con los Twins de Veloria.</div>}
            {sorted.map(([name,rel])=>(
              <button key={name} onClick={()=>{setSel(sel===name?null:name);setCat("hablar");}}
                style={{width:"100%",display:"flex",alignItems:"center",gap:"6px",padding:"5px",borderRadius:"7px",border:sel===name?"1px solid #2C1F14":"1px solid transparent",background:sel===name?"#FFFAF5":"transparent",cursor:"pointer",marginBottom:"2px",textAlign:"left"}}>
                <NPCAvatar name={name} size={22}/>
                <div style={{flex:1,overflow:"hidden"}}>
                  <div style={{fontSize:"10px",color:sel===name?"#F5A623":"#7A5840",fontWeight:500,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>{family.partner===name?"💕 ":""}{name.split(" ")[0]}</div>
                  <div style={{height:"2px",background:"#E0D4C8",borderRadius:"1px",overflow:"hidden",marginTop:"2px"}}>
                    <div style={{height:"100%",width:`${rel.friendship||0}%`,background:NPC_HOOD_COLOR[name]||"#7BB8B9"}}/>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Interaction panel */}
          <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {!sel&&<div style={{color:"#D4C4B0",fontSize:"10px",fontStyle:"italic",textAlign:"center",marginTop:"20px",padding:"0 12px"}}>Seleccioná un Twin para interactuar</div>}
            {sel&&selRel&&(
              <>
                {/* NPC header */}
                <div style={{padding:"8px 10px",borderBottom:"1px solid #1A1208",display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
                  <NPCAvatar name={sel} size={32}/>
                  <div style={{flex:1,overflow:"hidden"}}>
                    <div style={{fontSize:"11px",color:"#7A5840",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{isPartner?sLabel[romStatus]+" · ":""}{sel}</div>
                    <div style={{fontSize:"9px",color:"#BBA090",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{NPC_DESC[sel]||""}</div>
                  </div>
                  <div style={{textAlign:"right",flexShrink:0}}>
                    <div style={{fontSize:"9px",color:NPC_HOOD_COLOR[sel]||"#7BB8B9"}}>{relStatus(fr)}</div>
                    <div style={{fontSize:"8px",color:"#D4C4B0"}}>{fr}/100</div>
                  </div>
                </div>

                {/* Category tabs */}
                <div style={{display:"flex",borderBottom:"1px solid #1A1208",flexShrink:0}}>
                  {INTERACTION_CATS.map(c=>(
                    <button key={c.id} onClick={()=>setCat(c.id)}
                      style={{flex:1,padding:"5px 2px",fontSize:"8px",border:"none",borderBottom:cat===c.id?"2px solid #D4A853":"2px solid transparent",background:"transparent",color:cat===c.id?"#F5A623":"#BBA090",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"1px"}}>
                      <span style={{fontSize:"11px"}}>{c.emoji}</span>
                      <span style={{letterSpacing:"0.04em",textTransform:"uppercase"}}>{c.label}</span>
                    </button>
                  ))}
                </div>

                {/* Interactions grid */}
                <div style={{flex:1,overflowY:"auto",padding:"7px"}}>
                  {catInteractions.length===0&&(
                    <div style={{fontSize:"9px",color:"#D4C4B0",fontStyle:"italic",textAlign:"center",marginTop:"10px"}}>
                      {cat==="romantico"&&!ROMANCEABLE.has(sel)?"Este Twin no está disponible para romance.":
                       cat==="romantico"&&fr<30?"Necesitás más amistad para opciones románticas.":
                       "No hay opciones disponibles todavía."}
                    </div>
                  )}
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"4px"}}>
                    {catInteractions.map(intr=>(
                      <button key={intr.id} onClick={()=>onInteract(intr.id,sel)} disabled={loading}
                        style={{display:"flex",alignItems:"center",gap:"5px",padding:"5px 7px",borderRadius:"7px",border:"1px solid #1A1208",background:"transparent",color:"#B8907A",cursor:loading?"not-allowed":"pointer",textAlign:"left",fontSize:"9px",transition:"all 0.12s"}}
                        onMouseEnter={e=>{if(!loading){e.currentTarget.style.borderColor="#BBA090";e.currentTarget.style.color="#7A5840";e.currentTarget.style.background="#FFFAF5";}}}
                        onMouseLeave={e=>{e.currentTarget.style.borderColor="#E0D4C8";e.currentTarget.style.color="#B8907A";e.currentTarget.style.background="transparent";}}>
                        <span style={{fontSize:"14px",flexShrink:0}}>{intr.emoji}</span>
                        <span style={{lineHeight:"1.2"}}>{intr.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Relationship milestones */}
                  {getRomActs().length>0&&(
                    <div style={{borderTop:"1px solid #1A1208",paddingTop:"7px",marginTop:"7px",display:"flex",flexWrap:"wrap",gap:"4px"}}>
                      {getRomActs().map(ra=>(
                        <button key={ra.id} disabled={loading} onClick={()=>{setSel(null);onRomanceAction(ra.id,sel);}}
                          style={{padding:"4px 9px",fontSize:"9px",borderRadius:"12px",border:`1px solid ${ra.color}`,background:"transparent",color:ra.color,cursor:loading?"not-allowed":"pointer"}}>
                          {ra.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Interaction history */}
                  {selRel.history?.length>0&&(
                    <div style={{borderTop:"1px solid #1A1208",paddingTop:"7px",marginTop:"7px"}}>
                      <div style={{fontSize:"8px",color:"#D4C4B0",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"4px"}}>Historial reciente</div>
                      {selRel.history.slice(-3).map((h,i)=>(
                        <div key={i} style={{fontSize:"9px",color:"#BBA090",marginBottom:"2px",paddingLeft:"6px",borderLeft:"1px solid #1A1208"}}>✦ {h}</div>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* FAMILIA MODE */}
      {mode==="familia"&&(
        <div style={{flex:1,overflowY:"auto",padding:"8px 10px"}}>
          {/* Partner info */}
          {family.partner&&(
            <div style={{background:"rgba(232,123,158,0.05)",border:"1px solid #2C1F14",borderRadius:"9px",padding:"9px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"8px"}}>
              <NPCAvatar name={family.partner} size={30}/>
              <div>
                <div style={{fontSize:"10px",color:"#E87B9E",textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:"1px"}}>{sLabel[family.romanticStatus]||"💕"}</div>
                <div style={{fontSize:"12px",color:"#7A5840",fontWeight:600}}>{family.partner}</div>
              </div>
            </div>
          )}

          {/* No family yet */}
          {!family.partner&&family.children.length===0&&(
            <div style={{fontSize:"10px",color:"#D4C4B0",fontStyle:"italic",textAlign:"center",marginTop:"16px",lineHeight:"1.5"}}>
              Tu historia familiar en Veloria todavía está por escribirse.<br/>Conocé Twins, construí relaciones.
            </div>
          )}

          {/* Children */}
          {family.children.map((child,idx)=>{
            const age=currentDay-(child.birthDay||0);
            const stageName=getChildStage(age);
            const stage=CHILD_STAGES[stageName];
            const hap=child.happiness??70;
            const rel=child.relationship??50;
            const hapDots=Math.round(hap/20);
            const relDots=Math.round(rel/20);
            return(
              <div key={idx} style={{background:"#F0EAE0",border:`1px solid ${stage.color}33`,borderRadius:"10px",padding:"10px",marginBottom:"8px"}}>
                <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"8px"}}>
                  <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`${stage.color}15`,border:`2px solid ${stage.color}44`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"18px",flexShrink:0}}>{stage.emoji}</div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"12px",color:"#7A5840",fontWeight:600}}>{child.name}</div>
                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                      <span style={{fontSize:"9px",color:stage.color,background:`${stage.color}18`,padding:"1px 6px",borderRadius:"8px",border:`1px solid ${stage.color}44`}}>{stage.label}</span>
                      <span style={{fontSize:"9px",color:"#BBA090"}}>{age} {age===1?"año":"años"}</span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div style={{display:"flex",gap:"12px",marginBottom:"8px"}}>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"8px",color:"#BBA090",marginBottom:"2px"}}>Felicidad</div>
                    <div style={{display:"flex",gap:"2px"}}>
                      {[0,1,2,3,4].map(i=><div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:i<hapDots?"#E87B9E":"transparent",border:`1px solid ${i<hapDots?"#E87B9E":"#D4C4B0"}`}}/>)}
                    </div>
                  </div>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"8px",color:"#BBA090",marginBottom:"2px"}}>Relación</div>
                    <div style={{display:"flex",gap:"2px"}}>
                      {[0,1,2,3,4].map(i=><div key={i} style={{width:"7px",height:"7px",borderRadius:"50%",background:i<relDots?stage.color:"transparent",border:`1px solid ${i<relDots?stage.color:"#D4C4B0"}`}}/>)}
                    </div>
                  </div>
                  {child.traits?.length>0&&(
                    <div style={{flex:2}}>
                      <div style={{fontSize:"8px",color:"#BBA090",marginBottom:"2px"}}>Rasgos</div>
                      <div style={{fontSize:"8px",color:"#B8907A"}}>{child.traits.slice(0,2).join(", ")}</div>
                    </div>
                  )}
                </div>

                {/* Interactions */}
                <div style={{display:"flex",flexWrap:"wrap",gap:"4px"}}>
                  {stage.interactions.map(intr=>(
                    <button key={intr.id} onClick={()=>onChildInteract(idx,intr.id)} disabled={loading}
                      style={{display:"flex",alignItems:"center",gap:"4px",padding:"4px 8px",borderRadius:"14px",fontSize:"9px",border:`1px solid ${stage.color}44`,background:"transparent",color:"#B8907A",cursor:loading?"not-allowed":"pointer",transition:"all 0.12s"}}
                      onMouseEnter={e=>{if(!loading){e.currentTarget.style.background=`${stage.color}12`;e.currentTarget.style.color=stage.color;e.currentTarget.style.borderColor=`${stage.color}88`;}}}
                      onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color="#B8907A";e.currentTarget.style.borderColor=`${stage.color}44`;}}>
                      <span>{intr.emoji}</span>{intr.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VELORIA mode — world state */}
      {mode==="veloria"&&(
        <div style={{flex:1,overflowY:"auto",padding:"8px 10px"}}>
          <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif",marginBottom:"10px",lineHeight:1.4}}>
            El mundo de Veloria sigue su curso aunque no estés mirando. Los Twins trabajan, envejecen, se conocen.
          </div>
          {Object.entries(npcWorld||{}).map(([name,data])=>{
            if(!data.isAlive)return null;
            const job=NPC_JOBS[name];
            const fr=rels?.[name]?.friendship||0;
            const ageDisplay=Math.floor(data.age);
            const partnerAge=data.partner&&npcWorld[data.partner]?Math.floor(npcWorld[data.partner].age):null;
            return(
              <div key={name} style={{...{borderRadius:"12px",background:C.white,border:`1px solid ${C.border}`,padding:"10px 12px",marginBottom:"6px",display:"flex",gap:"10px",alignItems:"flex-start"}}}>
                <NPCAvatar name={name} size={28}/>
                <div style={{flex:1}}>
                  <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"3px"}}>
                    <div>
                      <span style={{fontSize:"12px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{name}</span>
                      <span style={{fontSize:"10px",color:C.textDim,marginLeft:"6px",fontFamily:"'Nunito',sans-serif"}}>{ageDisplay} años</span>
                    </div>
                    {fr>0&&<div style={{fontSize:"10px",color:C.orange,fontFamily:"'Fredoka',sans-serif"}}>L {data.luces.toLocaleString()}</div>}
                  </div>
                  {job&&<div style={{fontSize:"10px",color:C.textMid,fontFamily:"'Nunito',sans-serif",marginBottom:"3px"}}>{job.job} · +L{job.dailySalary}/día</div>}
                  {data.partner&&(
                    <div style={{fontSize:"10px",color:"#E87B9E",fontFamily:"'Nunito',sans-serif",marginBottom:"2px"}}>
                      💕 {data.partner.split(" ")[0]}{partnerAge?` (${partnerAge}a)`:""}
                    </div>
                  )}
                  {data.children.length>0&&(
                    <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>
                      👶 {data.children.map(c=>typeof c==="string"?c:c.name).join(", ")}
                    </div>
                  )}
                  {fr===0&&<div style={{fontSize:"9px",color:C.textGhost,fontStyle:"italic",fontFamily:"'Nunito',sans-serif"}}>Todavía no lo conocés</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
function TrabajoTabContent({career,loc,dark,loading,onApply,onWork}){
  if(!career){
    return(
      <div style={{padding:"10px 14px",overflowY:"auto",height:"100%"}}>
        <div style={{fontSize:"10px",color:"#B8907A",marginBottom:"10px"}}>Elegí una carrera para empezar en Veloria.</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:"6px"}}>
          {Object.entries(CAREERS).map(([id,c])=>(
            <button key={id} onClick={()=>onApply(id)} disabled={loading}
              style={{display:"flex",alignItems:"center",gap:"8px",padding:"8px 12px",borderRadius:"10px",border:"1px solid #3D2B1F",background:"transparent",color:"#7A5840",cursor:loading?"not-allowed":"pointer",opacity:loading?0.4:1,transition:"all 0.12s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#6B9E5E";e.currentTarget.style.color="#6B9E5E";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#BBA090";e.currentTarget.style.color="#7A5840";}}>
              <span style={{fontSize:"18px"}}>{c.emoji}</span>
              <div>
                <div style={{fontSize:"11px",fontWeight:500}}>{c.label}</div>
                <div style={{fontSize:"9px",color:"#B8907A"}}>L{c.wages[0]}/turno</div>
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
      <div style={{background:"#E0D4C8",border:"1px solid #3D2B1F",borderRadius:"10px",padding:"10px",minWidth:"160px"}}>
        <div style={{fontSize:"20px",marginBottom:"4px"}}>{c.emoji}</div>
        <div style={{fontSize:"12px",fontWeight:600,color:"#6B9E5E",marginBottom:"2px"}}>{c.levels[career.level]}</div>
        <div style={{fontSize:"10px",color:"#B8907A"}}>{c.label} · L{c.wages[career.level]}/turno</div>
        <div style={{fontSize:"9px",color:"#B8907A",marginTop:"2px"}}>{career.shiftsWorked} turnos trabajados</div>
        {career.level<3&&<div style={{marginTop:"8px"}}>
          <div style={{height:"3px",background:"#D4C4B0",borderRadius:"2px",overflow:"hidden",marginBottom:"3px"}}>
            <div style={{height:"100%",width:`${prog}%`,background:"#6B9E5E",transition:"width 0.5s"}}/>
          </div>
          <div style={{fontSize:"9px",color:"#B8907A"}}>{Math.round(prog)}% hacia {c.levels[career.level+1]}</div>
        </div>}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"6px"}}>
        {isAt?(
          <button onClick={onWork} disabled={loading} style={{padding:"8px 14px",borderRadius:"10px",border:"1px solid #6B9E5E",background:"rgba(122,181,92,0.1)",color:"#6B9E5E",fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:600}}>
            💼 Trabajar turno ({c.shiftH}h) → +L{c.wages[career.level]}
          </button>
        ):(
          <div style={{fontSize:"10px",color:"#B8907A",fontStyle:"italic",maxWidth:"200px",lineHeight:"1.5"}}>Tu lugar de trabajo es {c.places.join(" o ")}. Andá para trabajar.</div>
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
            style={{padding:"3px 9px",borderRadius:"12px",fontSize:"9px",border:`1px solid ${cat===c.id?"#F5A623":"#D4C4B0"}`,background:cat===c.id?"rgba(245,166,35,0.12)":"transparent",color:cat===c.id?"#F5A623":"#B8907A",cursor:"pointer",whiteSpace:"nowrap"}}>
            {c.emoji} {c.label}
          </button>
        ))}
      </div>
      <div style={{flex:1,overflowY:"auto",padding:"8px 14px"}}>
        {filtered.length===0&&<div style={{fontSize:"11px",color:"#B8907A",fontStyle:"italic",textAlign:"center",marginTop:"16px"}}>Nada en esta categoría todavía.</div>}
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
          {filtered.map(item=>(
            <div key={item.id} style={{background:"#E0D4C8",border:"1px solid #2C1F14",borderRadius:"8px",padding:"8px",display:"flex",gap:"8px",alignItems:"flex-start"}}>
              <span style={{fontSize:"20px",flexShrink:0}}>{item.emoji}</span>
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:"10px",color:"#7A5840",fontWeight:600,marginBottom:"1px"}}>{item.name}</div>
                <div style={{fontSize:"9px",color:"#B8907A",lineHeight:"1.3",marginBottom:"4px"}}>{item.desc}</div>
                {item.qty>1&&<div style={{fontSize:"9px",color:"#BBA090"}}>x{item.qty}</div>}
                {item.useable&&<button onClick={()=>onUseItem(item)} style={{fontSize:"9px",padding:"2px 7px",borderRadius:"8px",border:"1px solid #D4A853",background:"transparent",color:"#F5A623",cursor:"pointer",marginTop:"3px"}}>Usar</button>}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div style={{padding:"6px 14px",borderTop:"1px solid #2C1F14",fontSize:"9px",color:"#B8907A",flexShrink:0}}>
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
          <button onClick={()=>setViewMonth(m=>Math.max(0,m-1))} style={{background:"transparent",border:"1px solid #2C1F14",color:"#B8907A",borderRadius:"6px",width:"22px",height:"22px",cursor:"pointer",fontSize:"12px"}}>‹</button>
          <div style={{flex:1,textAlign:"center",fontSize:"11px",color:"#7A5840",fontWeight:600}}>{MONTHS[viewMonth]} · {SEASONS[viewMonth]}</div>
          <button onClick={()=>setViewMonth(m=>Math.min(11,m+1))} style={{background:"transparent",border:"1px solid #2C1F14",color:"#B8907A",borderRadius:"6px",width:"22px",height:"22px",cursor:"pointer",fontSize:"12px"}}>›</button>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(6,1fr)",gap:"3px"}}>
          {days.map(d=>{
            const isToday=currentInView&&d===eventDay;
            const hasEvent=CALENDAR_EVENTS[viewMonth]&&d===1;
            return(
              <div key={d} style={{aspectRatio:"1",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",borderRadius:"6px",fontSize:"10px",background:isToday?"rgba(245,166,35,0.15)":"transparent",border:isToday?"1px solid #D4A853":"1px solid transparent",color:isToday?"#F5A623":"#B8907A",position:"relative"}}>
                {d}
                {hasEvent&&<span style={{position:"absolute",bottom:"1px",fontSize:"6px"}}>{CALENDAR_EVENTS[viewMonth].emoji}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div style={{width:"150px",borderLeft:"1px solid #2C1F14",padding:"10px",overflowY:"auto"}}>
        <div style={{fontSize:"9px",color:"#B8907A",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"8px"}}>Evento del mes</div>
        {event?(
          <div style={{background:"rgba(245,166,35,0.06)",border:"1px solid #3D2B1F",borderRadius:"8px",padding:"8px"}}>
            <div style={{fontSize:"18px",marginBottom:"3px"}}>{event.emoji}</div>
            <div style={{fontSize:"10px",color:"#F5A623",fontWeight:600,marginBottom:"3px"}}>{event.name}</div>
            <div style={{fontSize:"9px",color:"#B8907A",lineHeight:"1.4"}}>{event.desc}</div>
          </div>
        ):<div style={{fontSize:"10px",color:"#B8907A",fontStyle:"italic"}}>Mes tranquilo.</div>}
        <div style={{marginTop:"10px",fontSize:"9px",color:"#B8907A",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Próximos</div>
        {Array.from({length:3},(_,i)=>{const mi=(viewMonth+i+1)%12;const ev=CALENDAR_EVENTS[mi];if(!ev)return null;return(
          <div key={mi} style={{marginBottom:"6px",display:"flex",gap:"5px",alignItems:"flex-start"}}>
            <span style={{fontSize:"12px"}}>{ev.emoji}</span>
            <div><div style={{fontSize:"9px",color:"#7A5840"}}>{ev.name}</div><div style={{fontSize:"8px",color:"#B8907A"}}>{MONTHS[mi]}</div></div>
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
      {days.length===0&&<div style={{color:"#B8907A",fontSize:"11px",fontStyle:"italic",textAlign:"center",marginTop:"16px"}}>El diario empieza a escribirse cuando jugás.</div>}
      {days.map(d=>(
        <div key={d} style={{marginBottom:"14px"}}>
          <div style={{fontSize:"9px",color:"#B8907A",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px",borderBottom:"1px solid #2C1F14",paddingBottom:"4px"}}>
            Día {d} · {MONTHS[Math.min(Math.floor((d-1)/30),11)]}
          </div>
          {byDay[d].map(e=>(
            <div key={e.id} style={{marginBottom:"6px",paddingLeft:"10px",borderLeft:"1px solid #2C1F14"}}>
              <div style={{fontSize:"9px",color:"#B8907A",marginBottom:"2px"}}>{typeLabel[e.type]||"·"}{e.place?` · ${e.place}`:""}{e.time?` · ${e.time}`:""}</div>
              <div style={{fontSize:"11px",color:"#7A5840",fontStyle:"italic",lineHeight:"1.4",fontFamily:"'Lora',serif"}}>{(e.text||"").slice(0,120)}{(e.text||"").length>120?"…":""}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// ═══════════════════ CHARACTER STRIP ═══════════════════
function CharacterCard({twin,needs,money,gt,rels,family,skills,currentDaysLived,daysInStage,daysInStageTotal,lifeStage,aspirationProgress,reputation,mood}){
  const [moodLabel,moodColor]=getMood(needs);
  const ls=lifeStage||LIFE_STAGES[6];
  const asp=twin?.aspiration?ASPIRATIONS.find(a=>a.id===twin.aspiration):null;
  const nextMilestone=asp?.milestones[(aspirationProgress||[]).length];
  const stageProgress=Math.min(100,((daysInStage||0)+1)/Math.max(1,daysInStageTotal||ls.days)*100);
  return(
    <div style={{background:"#FFFFFF",borderBottom:"1px solid #1A1208",padding:"8px 14px",flexShrink:0}}>
      {/* Main row */}
      <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"5px"}}>
        {/* Avatar — uses twin's chosen color */}
        <div style={{width:"38px",height:"38px",borderRadius:"50%",background:twin?.color||ls.color,border:"2px solid #2C1A0E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"15px",color:"#fff",fontFamily:"'Fredoka',sans-serif",fontWeight:700,flexShrink:0,boxShadow:"1px 1px 0 #2C1A0E"}}>
          {twin?.name?.charAt(0)?.toUpperCase()||"?"}
        </div>
          {/* Name + stage + rep + mood */}
          <div style={{flexShrink:0}}>
            <div style={{display:"flex",alignItems:"center",gap:"5px",lineHeight:1.2,marginBottom:"1px"}}>
              <div style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600}}>{twin?.name}</div>
              {mood!=null&&(()=>{const ml=getMoodLevel(mood);return(
                <div title={ml.label} style={{fontSize:"11px",lineHeight:1}}>{ml.emoji}</div>
              );})()}
            </div>
            <div style={{fontSize:"9px",color:ls.color,marginBottom:"2px"}}>{ls.emoji} {ls.label} · día {(daysInStage||0)+1}/{daysInStageTotal||ls.days}</div>
            <div style={{width:"72px",height:"2px",background:"#E0D4C8",borderRadius:"1px",overflow:"hidden",marginBottom:"3px"}}>
              <div style={{height:"100%",width:`${stageProgress}%`,background:ls.color,transition:"width 0.5s"}}/>
            </div>
            {(()=>{const rl=getRepLevel(reputation||0);return reputation>0?(
              <div style={{fontSize:"8px",color:rl.color,fontFamily:"'Fredoka',sans-serif",fontWeight:600}}>✦ {rl.label}</div>
            ):null;})()}
          </div>
        {/* Needs grid 3×2 */}
        <div style={{flex:1,display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"3px 8px",margin:"0 6px"}}>
          {Object.entries(NEED_CFG).map(([key,cfg])=>(
            <div key={key} style={{display:"flex",gap:"3px",alignItems:"center"}}>
              <span style={{fontSize:"9px",lineHeight:1,flexShrink:0}}>{cfg.emoji}</span>
              <div style={{flex:1,height:"3px",background:"#E0D4C8",borderRadius:"2px",overflow:"hidden"}}>
                <div style={{height:"100%",width:`${needs[key]||0}%`,background:cfg.color,transition:"width 0.5s"}}/>
              </div>
            </div>
          ))}
        </div>
        {/* Mood + Money */}
        <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:"3px",flexShrink:0}}>
          <div style={{padding:"2px 7px",borderRadius:"7px",background:`${moodColor}15`,border:`1px solid ${moodColor}44`,fontSize:"9px",color:moodColor,whiteSpace:"nowrap"}}>{moodLabel}</div>
          <div style={{fontSize:"10px",color:"#F5A623",fontWeight:600}}>L {money}</div>
        </div>
      </div>
      {/* Aspiration row */}
      {asp&&(
        <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
          <span style={{fontSize:"9px",color:"#BBA090",flexShrink:0}}>{asp.emoji} {asp.label}</span>
          <div style={{display:"flex",gap:"2px",flex:1,maxWidth:"80px"}}>
            {asp.milestones.map((m,i)=>(
              <div key={m.id} style={{flex:1,height:"2px",borderRadius:"1px",background:i<(aspirationProgress||[]).length?"#F5A623":"#E0D4C8"}}/>
            ))}
          </div>
          {nextMilestone&&<span style={{fontSize:"8px",color:"#B8907A",fontStyle:"italic",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",flex:1}}>◎ {nextMilestone.label}</span>}
        </div>
      )}
    </div>
  );
}


// ═══════════════════ PAUSA MODAL ═══════════════════
// ═══ DIALOGUE MODAL ═══
// ═══ CHOICE MODAL ═══
function ChoiceModal({choice,onSelect,onDismiss}){
  const hasSpeaker=!!choice.speaker;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(44,26,14,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60,backdropFilter:"blur(2px)"}}>
      <div style={{width:"100%",maxWidth:"520px",background:C.white,borderRadius:"22px 22px 0 0",padding:"12px 16px 32px",boxShadow:"0 -8px 32px rgba(0,0,0,0.12)",animation:"fadeSlideIn 0.25s ease"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 16px"}}/>

        {/* NPC speaker mode */}
        {hasSpeaker&&(
          <div style={{marginBottom:"16px"}}>
            <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px"}}>
              <NPCAvatar name={choice.speaker.name} size={36}/>
              <span style={{fontSize:"14px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{choice.speaker.name}</span>
            </div>
            <div style={{background:C.cardWarm,border:`1px solid ${C.border}`,borderRadius:"14px",padding:"12px 14px"}}>
              <div style={{fontSize:"13px",color:C.textMid,fontFamily:"'Lora',serif",fontStyle:"italic",lineHeight:1.7}}>{`"${choice.speaker.says}"`}</div>
            </div>
            <div style={{fontSize:"10px",color:C.textGhost,marginTop:"8px",marginLeft:"4px",fontFamily:"'Nunito',sans-serif"}}>¿Cómo respondés?</div>
          </div>
        )}

        {/* Regular choice mode */}
        {!hasSpeaker&&(
          <div style={{marginBottom:"16px"}}>
            <div style={{fontSize:"17px",fontWeight:700,color:C.text,marginBottom:"4px",fontFamily:"'Fredoka',sans-serif"}}>{choice.title}</div>
            <div style={{fontSize:"12px",color:C.textDim,fontFamily:"'Lora',serif",fontStyle:"italic"}}>{choice.subtitle}</div>
          </div>
        )}

        {/* Options */}
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {choice.options.map(opt=>(
            <button key={opt.id} onClick={()=>onSelect(opt)}
              style={{textAlign:"left",padding:"11px 14px",borderRadius:"14px",border:`1.5px solid ${C.border}`,background:C.white,cursor:"pointer",transition:"border-color 0.12s",display:"flex",gap:"12px",alignItems:"flex-start"}}>
              <span style={{fontSize:"20px",flexShrink:0,marginTop:"2px"}}>{opt.emoji}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:"13px",color:C.text,fontWeight:700,fontFamily:"'Fredoka',sans-serif",marginBottom:"3px"}}>{opt.label}</div>
                <div style={{fontSize:"11px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>{opt.hint}</div>
              </div>
              <span style={{color:C.border2,fontSize:"16px",alignSelf:"center",flexShrink:0}}>›</span>
            </button>
          ))}
        </div>
        <button onClick={onDismiss} style={{marginTop:"12px",width:"100%",padding:"9px",border:"none",background:"transparent",color:C.textDim,fontSize:"12px",cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
          {hasSpeaker?"Ahora no":"Mejor lo pienso después"}
        </button>
      </div>
    </div>
  );
}

// ── SHOP MODAL ──────────────────────────────────────
function ShopModal({shop,money,onBuy,onClose}){
  const [bought,setBought]=useState([]);
  function handleBuy(item){
    if(money<item.price)return;
    setBought(b=>[...b,item.id]);
    onBuy(item);
  }
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(44,26,14,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60,backdropFilter:"blur(2px)"}}>
      <div style={{width:"100%",maxWidth:"520px",background:C.white,borderRadius:"22px 22px 0 0",padding:"12px 16px 32px",maxHeight:"80vh",overflowY:"auto",boxShadow:"0 -8px 32px rgba(0,0,0,0.12)",animation:"fadeSlideIn 0.25s ease"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 12px"}}/>
        {/* Header */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px"}}>
          <div>
            <div style={{fontSize:"18px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{shop.emoji} {shop.name}</div>
            <div style={{fontSize:"11px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>Tocá un item para comprarlo</div>
          </div>
          <div style={{padding:"5px 14px",background:C.orangeLight,border:`1px solid ${C.border}`,borderRadius:"12px",fontSize:"13px",color:C.orange,fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>L {money}</div>
        </div>
        {/* Items */}
        <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
          {shop.items.map(item=>{
            const canAfford=money>=item.price;
            const wasBought=bought.includes(item.id);
            return(
              <div key={item.id} style={{padding:"12px 14px",borderRadius:"14px",border:`1.5px solid ${wasBought?C.green:canAfford?C.border:"#F0E0D0"}`,background:wasBought?"#F0F8EA":canAfford?C.white:"#FFF8F4",display:"flex",alignItems:"center",gap:"12px",transition:"all 0.15s"}}>
                <span style={{fontSize:"24px",flexShrink:0}}>{item.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:"13px",color:wasBought?C.green:C.text,fontWeight:700,fontFamily:"'Fredoka',sans-serif",marginBottom:"2px"}}>{item.name}{wasBought?" ✓":""}</div>
                  <div style={{fontSize:"11px",color:C.textDim,fontFamily:"'Lora',serif",fontStyle:"italic",marginBottom:"3px"}}>{item.desc}</div>
                  {item.effectLabel&&<div style={{fontSize:"10px",color:C.green,fontFamily:"'Nunito',sans-serif"}}>{item.effectLabel}</div>}
                </div>
                <button onClick={()=>!wasBought&&handleBuy(item)} disabled={!canAfford||wasBought}
                  style={{flexShrink:0,padding:"8px 16px",borderRadius:"10px",border:"none",
                    background:wasBought?"#E0F0E0":canAfford?C.orange:"#E0D4C8",
                    color:wasBought?C.green:canAfford?C.white:C.textDim,
                    cursor:canAfford&&!wasBought?"pointer":"not-allowed",fontSize:"13px",fontWeight:700,fontFamily:"'Fredoka',sans-serif",minWidth:"64px"}}>
                  {wasBought?"✓ Listo":item.type==="experience"?`Ver`:item.type==="ticket"?`Entrada`:item.type==="meal"?`Pedir`:`L ${item.price}`}
                </button>
              </div>
            );
          })}
        </div>
        <button onClick={onClose} style={{marginTop:"14px",width:"100%",padding:"10px",border:`1px solid ${C.border}`,borderRadius:"12px",background:"transparent",color:C.textMid,fontSize:"13px",cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
          Cerrar tienda
        </button>
      </div>
    </div>
  );
}


// ── FAMILY TREE ──────────────────────────────────────────
function FamilyNode({name,subtitle,color,rel,isSelf,small,gender}){
  const GENDER_COLOR={varón:"#5B8AF5",mujer:"#E85D75",elle:"#7B5CF5"};
  const nodeColor=gender?GENDER_COLOR[gender]||(color||C.orange):(color||C.orange);
  const sz=small?38:48;
  return(
    <div style={{textAlign:"center",width:small?66:86,flexShrink:0}}>
      <div style={{width:sz,height:sz,borderRadius:"50%",background:`linear-gradient(135deg,${nodeColor},${nodeColor}BB)`,
        border:`${isSelf?3:2}px solid #2C1A0E`,boxShadow:isSelf?"2px 2px 0 #2C1A0E":"1px 1px 0 #ccc",
        margin:"0 auto 5px",display:"flex",alignItems:"center",justifyContent:"center",
        fontSize:small?13:17,color:"#fff",fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>
        {name?.[0]?.toUpperCase()||"?"}
      </div>
      <div style={{fontSize:small?10:11,fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif",lineHeight:1.2,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>
        {name?.length>10?name.slice(0,9)+"…":name}
      </div>
      <div style={{fontSize:8,color:nodeColor,fontFamily:"'Nunito',sans-serif",fontWeight:600,marginTop:1}}>{rel}</div>
      {subtitle&&<div style={{fontSize:8,color:C.textGhost,fontFamily:"'Nunito',sans-serif"}}>{subtitle}</div>}
    </div>
  );
}

function FamilyTree({family,twin,npcWorld,gt}){
  const twinColor=twin?.color||C.orange;
  const partnerData=family?.partner&&npcWorld?.[family?.partner];
  const children=family?.children||[];
  const GENDER_EMOJI={varón:"👦",mujer:"👧",elle:"🧒"};

  return(
    <div style={{flex:1,overflowY:"auto",padding:"16px 12px"}}>
      <div style={{fontSize:"12px",fontWeight:700,color:C.orange,marginBottom:"16px",fontFamily:"'Fredoka',sans-serif"}}>🌳 Árbol genealógico</div>

      {/* Parents row (if known from legacy) */}
      {twin?.parents&&(
        <div>
          <div style={{display:"flex",justifyContent:"center",gap:"16px",marginBottom:"4px"}}>
            {twin.parents.map((p,i)=>(
              <FamilyNode key={i} name={p.name} subtitle={p.subtitle||""} color={p.color||"#B8907A"} rel={i===0?"Madre":"Padre"}/>
            ))}
          </div>
          <div style={{display:"flex",justifyContent:"center",marginBottom:"4px"}}>
            <div style={{width:2,height:20,background:C.border2}}/>
          </div>
        </div>
      )}

      {/* Twin + Partner row */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:family?.partner?24:0,marginBottom:children.length>0?4:16}}>
        {family?.partner&&(
          <>
            <FamilyNode name={family.partner} subtitle={partnerData?`${Math.floor(partnerData.age)} años`:""}
              color="#E87B9E" rel={family.romanticStatus==="married"?"💒 Pareja":family.romanticStatus==="engaged"?"💍 Prometido/a":"💕 En pareja"}/>
            <div style={{width:32,height:2,background:C.border2,marginBottom:22,flexShrink:0}}/>
          </>
        )}
        <FamilyNode name={twin?.name||"Tu Twin"} subtitle={`Día ${gt?.day||1}`}
          color={twinColor} rel="Vos" isSelf/>
      </div>

      {/* Connection line to children */}
      {children.length>0&&(
        <div style={{display:"flex",justifyContent:"center",marginBottom:"4px"}}>
          <div style={{width:2,height:18,background:C.border2}}/>
        </div>
      )}

      {/* Children horizontal line */}
      {children.length>1&&(
        <div style={{display:"flex",justifyContent:"center",marginBottom:"4px"}}>
          <div style={{height:2,width:`${Math.min(children.length*72,280)}px`,background:C.border2}}/>
        </div>
      )}

      {/* Children row */}
      {children.length>0&&(
        <div style={{display:"flex",justifyContent:"center",gap:"10px",flexWrap:"wrap"}}>
          {children.map((child,i)=>{
            const c=typeof child==="string"?{name:child,gender:null,birthDay:0}:child;
            const age=gt?.day-(c.birthDay||0);
            const ageLabel=age<=0?"recién nacido/a":`${age} ${age===1?"día":"días"}`;
            return(
              <FamilyNode key={i} name={c.name||child} subtitle={ageLabel}
                color={c.gender==="varón"?"#5B8AF5":c.gender==="mujer"?"#E85D75":"#7B5CF5"}
                rel={`${c.gender?GENDER_EMOJI[c.gender]||"👶":"👶"} ${c.gender||"Hijo/a"}`}
                gender={c.gender} small/>
            );
          })}
        </div>
      )}

      {/* Empty state */}
      {!family?.partner&&children.length===0&&(
        <div style={{textAlign:"center",color:C.textGhost,fontSize:"11px",fontStyle:"italic",fontFamily:"'Nunito',sans-serif",lineHeight:1.6,marginTop:"20px"}}>
          Tu árbol familiar en Veloria está empezando.<br/>
          Cada relación deja una rama.
        </div>
      )}

      {/* Legacy note */}
      {twin?.parentName&&(
        <div style={{marginTop:"16px",padding:"10px 12px",background:C.cardWarm,border:`1px solid ${C.border}`,borderRadius:"10px"}}>
          <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif",lineHeight:1.5}}>
            📜 Sos hijo/a de <strong>{twin.parentName}</strong> · La familia continúa en Veloria.
          </div>
        </div>
      )}
    </div>
  );
}

function GiftModal({item,knownNPCs,onGift,onClose}){
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(44,26,14,0.45)",display:"flex",alignItems:"flex-end",justifyContent:"center",zIndex:60,backdropFilter:"blur(2px)"}}>
      <div style={{width:"100%",maxWidth:"520px",background:C.white,borderRadius:"22px 22px 0 0",padding:"12px 16px 32px",boxShadow:"0 -8px 32px rgba(0,0,0,0.12)",animation:"fadeSlideIn 0.25s ease"}}>
        <div style={{width:36,height:4,background:C.border,borderRadius:2,margin:"0 auto 14px"}}/>
        <div style={{fontSize:"16px",fontWeight:700,color:C.text,marginBottom:"4px",fontFamily:"'Fredoka',sans-serif"}}>
          🎁 ¿A quién le regalás {item.emoji} {item.name}?
        </div>
        <div style={{fontSize:"11px",color:C.textDim,fontFamily:"'Lora',serif",fontStyle:"italic",marginBottom:"14px"}}>
          El regalo dice algo sobre quién sos.
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"6px",maxHeight:"300px",overflowY:"auto"}}>
          {knownNPCs.map(npcName=>(
            <button key={npcName} onClick={()=>onGift(item,npcName)}
              style={{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",borderRadius:"12px",border:`1px solid ${C.border}`,background:C.white,cursor:"pointer",textAlign:"left",transition:"border-color 0.12s"}}>
              <NPCAvatar name={npcName} size={28}/>
              <span style={{fontSize:"13px",color:C.text,fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>{npcName}</span>
              <span style={{color:C.border2,fontSize:"16px",marginLeft:"auto"}}>›</span>
            </button>
          ))}
        </div>
        <button onClick={onClose} style={{marginTop:"12px",width:"100%",padding:"9px",border:"none",background:"transparent",color:C.textDim,fontSize:"12px",cursor:"pointer",fontFamily:"'Nunito',sans-serif"}}>
          Cancelar
        </button>
      </div>
    </div>
  );
}

function HogarTab({housing,placedFurniture,money,skills,onUpgrade,onBuyFurniture,dark,loading,family,gt,npcWorld,inventory,onUseItem,onGiftItem,twin}){
  const [view,setView]=useState("prop"); // "prop" | "muebles" | "hogar" | "inv" | "arbol"
  const tier=HOUSING_TIERS.find(h=>h.id===housing)||HOUSING_TIERS[0];
  const tierIdx=HOUSING_TIERS.indexOf(tier);
  const nextTier=HOUSING_TIERS[tierIdx+1]||null;
  const slotsUsed=placedFurniture.length;
  const eff=getHousingEffects(housing,placedFurniture);
  const spouseJob=family?.partner&&NPC_JOBS[family.partner];
  const spouseData=family?.partner&&npcWorld?.[family.partner];

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",borderBottom:`1px solid ${C.border}`,flexShrink:0}}>
        <button onClick={()=>setView("prop")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:view==="prop"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:view==="prop"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>🏠 Propiedad</button>
        <button onClick={()=>setView("muebles")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:view==="muebles"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:view==="muebles"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>🛋 Muebles ({slotsUsed}/{tier.slots})</button>
        <button onClick={()=>setView("hogar")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:view==="hogar"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:view==="hogar"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>👨‍👩‍👧 Hogar</button>
        <button onClick={()=>setView("inv")} style={{flex:1,padding:"5px 2px",fontSize:"9px",border:"none",borderBottom:view==="inv"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:view==="inv"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>🎒 Objetos ({(inventory||[]).length})</button>
        <button onClick={()=>setView("arbol")} style={{flex:1,padding:"5px 2px",fontSize:"9px",border:"none",borderBottom:view==="arbol"?`2px solid ${C.orange}`:"2px solid transparent",background:"transparent",color:view==="arbol"?C.orange:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>🌳 Árbol</button>
      </div>

      {/* HOGAR VIEW — household composition + income */}
      {view==="hogar"&&(
        <div style={{flex:1,overflowY:"auto",padding:"10px 12px"}}>
          {/* Income breakdown */}
          <div style={{...{borderRadius:"12px",background:C.cardWarm,border:`1px solid ${C.border}`,padding:"12px",marginBottom:"10px"}}}>
            <div style={{fontSize:"11px",color:C.orange,fontWeight:700,marginBottom:"10px",fontFamily:"'Fredoka',sans-serif"}}>💰 Ingresos del hogar</div>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
              <span style={{fontSize:"11px",color:C.textMid,fontFamily:"'Nunito',sans-serif"}}>Tu trabajo</span>
              <span style={{fontSize:"11px",color:C.text,fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>Variable / turno</span>
            </div>
            {spouseJob&&(
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:"5px"}}>
                <span style={{fontSize:"11px",color:C.textMid,fontFamily:"'Nunito',sans-serif"}}>{family.partner.split(" ")[0]} · {spouseJob.job}</span>
                <span style={{fontSize:"11px",color:"#E87B9E",fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>+L{spouseJob.dailySalary}/día</span>
              </div>
            )}
            <div style={{borderTop:`1px solid ${C.border}`,marginTop:"8px",paddingTop:"8px",display:"flex",justifyContent:"space-between"}}>
              <span style={{fontSize:"11px",color:C.textMid,fontFamily:"'Nunito',sans-serif"}}>Ahorros actuales</span>
              <span style={{fontSize:"13px",color:C.orange,fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>L {money}</span>
            </div>
          </div>

          {/* Household members */}
          <div style={{fontSize:"11px",color:C.orange,fontWeight:700,marginBottom:"8px",fontFamily:"'Fredoka',sans-serif"}}>👤 Miembros del hogar</div>
          {family?.partner?(
            <div style={{...{borderRadius:"10px",background:C.white,border:"1.5px solid #E87B9E44",padding:"10px 12px",marginBottom:"6px",display:"flex",gap:"10px",alignItems:"center"}}}>
              <NPCAvatar name={family.partner} size={28}/>
              <div style={{flex:1}}>
                <div style={{fontSize:"12px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{family.partner}</div>
                <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>
                  {spouseData?`${Math.floor(spouseData.age)} años · `:""}{spouseJob?.job||""}
                </div>
              </div>
              <div style={{fontSize:"10px",color:"#E87B9E",fontFamily:"'Fredoka',sans-serif"}}>{family.romanticStatus==="married"?"💒":family.romanticStatus==="engaged"?"💍":"💕"}</div>
            </div>
          ):<div style={{fontSize:"10px",color:C.textGhost,fontStyle:"italic",fontFamily:"'Nunito',sans-serif",marginBottom:"8px"}}>Vivís solo/a por ahora.</div>}

          {/* Children */}
          {family?.children?.length>0&&(
            <>
              <div style={{fontSize:"11px",color:C.orange,fontWeight:700,marginBottom:"6px",marginTop:"8px",fontFamily:"'Fredoka',sans-serif"}}>👶 Hijos</div>
              {family.children.map((child,i)=>{
                const age=gt?.day-(child.birthDay||0);
                const ageYrs=age<=0?"recién nacido/a":`${age} ${age===1?"día":"días"}`;
                return(
                  <div key={i} style={{...{borderRadius:"10px",background:C.white,border:`1px solid ${C.border}`,padding:"8px 12px",marginBottom:"4px",display:"flex",alignItems:"center",gap:"10px"}}}>
                    <span style={{fontSize:"20px"}}>👶</span>
                    <div>
                      <div style={{fontSize:"12px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{child.name||child}</div>
                      <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>{ageYrs} en Veloria</div>
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {!family?.partner&&(!family?.children||family.children.length===0)&&(
            <div style={{fontSize:"10px",color:C.textGhost,fontStyle:"italic",textAlign:"center",marginTop:"20px",fontFamily:"'Nunito',sans-serif",lineHeight:1.6}}>
              Tu historia familiar en Veloria todavía está por escribirse.<br/>
              Conocé Twins, construí relaciones.
            </div>
          )}
        </div>
      )}

      {/* INVENTARIO VIEW */}
      {view==="inv"&&(
        <div style={{flex:1,overflowY:"auto",padding:"8px 10px"}}>
          {(!inventory||inventory.length===0)&&(
            <div style={{fontSize:"10px",color:C.textGhost,fontStyle:"italic",textAlign:"center",marginTop:"20px",fontFamily:"'Nunito',sans-serif"}}>
              Tu mochila está vacía. Comprá cosas en las tiendas de Veloria.
            </div>
          )}
          {(inventory||[]).map((item,i)=>{
            const fx=ITEM_USE_EFFECTS[item.id];
            const isGiftable=!!(item.id&&Object.values(NPC_GIFT_PREFS).some(p=>p.loved?.includes(item.id)||p.liked?.includes(item.id)));
            const isUseable=!!fx;
            return(
              <div key={item.id||i} style={{...{borderRadius:"12px",background:C.white,border:`1px solid ${C.border}`,padding:"10px 12px",marginBottom:"6px",display:"flex",gap:"10px",alignItems:"center"}}}>
                <span style={{fontSize:"22px",flexShrink:0}}>{item.emoji}</span>
                <div style={{flex:1}}>
                  <div style={{display:"flex",alignItems:"center",gap:"6px",marginBottom:"2px"}}>
                    <span style={{fontSize:"12px",fontWeight:700,color:C.text,fontFamily:"'Fredoka',sans-serif"}}>{item.name}</span>
                    {item.qty>1&&<span style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif"}}>×{item.qty}</span>}
                  </div>
                  {item.desc&&<div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Lora',serif",fontStyle:"italic",marginBottom:"3px"}}>{item.desc}</div>}
                  {fx&&(
                    <div style={{fontSize:"9px",color:C.green,fontFamily:"'Nunito',sans-serif"}}>
                      {fx.skill?`+${fx.xp} ${fx.skill} XP`:""}{fx.need?` +${fx.val} ${fx.need}`:""}
                    </div>
                  )}
                </div>
                <div style={{display:"flex",gap:"5px",flexShrink:0,flexDirection:"column"}}>
                  {isUseable&&(
                    <button onClick={()=>onUseItem&&onUseItem(item)} style={{padding:"5px 10px",borderRadius:"8px",border:`1px solid ${C.orange}`,background:C.orangeLight,color:C.orange,fontSize:"10px",fontWeight:700,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
                      Usar
                    </button>
                  )}
                  {isGiftable&&(
                    <button onClick={()=>onGiftItem&&onGiftItem(item)} style={{padding:"5px 10px",borderRadius:"8px",border:`1px solid ${C.border}`,background:C.white,color:C.textMid,fontSize:"10px",cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
                      🎁 Regalar
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ÁRBOL GENEALÓGICO VIEW */}
      {view==="arbol"&&(
        <FamilyTree family={family} twin={twin||{name:"Tu Twin"}} npcWorld={npcWorld} gt={gt}/>
      )}

      <div style={{flex:1,overflowY:"auto",padding:"10px 12px"}}>
        {view==="prop"&&(
          <div>
            {/* Current property */}
            <div style={{background:"rgba(245,166,35,0.06)",border:"1px solid #2C1F14",borderRadius:"10px",padding:"12px",marginBottom:"10px"}}>
              <div style={{fontSize:"22px",marginBottom:"4px"}}>{tier.emoji}</div>
              <div style={{fontSize:"12px",color:"#7A5840",fontWeight:600,marginBottom:"2px"}}>{tier.label}</div>
              <div style={{fontSize:"10px",color:"#B8907A",marginBottom:"8px"}}>{tier.desc}</div>
              <div style={{fontSize:"9px",color:"#BBA090",marginBottom:"4px"}}>Ranuras de muebles: {slotsUsed}/{tier.slots}</div>
              {Object.keys(eff.needBonus).length>0&&(
                <div style={{fontSize:"9px",color:"#6B9E5E"}}>
                  Bonus: {Object.entries(eff.needBonus).map(([n,v])=>`+${v} ${NEED_CFG[n]?.emoji||n}`).join(" · ")}
                </div>
              )}
            </div>
            {/* Upgrade */}
            {nextTier&&(
              <div>
                <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"7px"}}>Próxima propiedad</div>
                <div style={{background:"#F5EDE0",border:"1px solid #1A1208",borderRadius:"9px",padding:"10px",display:"flex",gap:"10px",alignItems:"center"}}>
                  <span style={{fontSize:"20px"}}>{nextTier.emoji}</span>
                  <div style={{flex:1}}>
                    <div style={{fontSize:"11px",color:"#7A5840",fontWeight:600}}>{nextTier.label}</div>
                    <div style={{fontSize:"9px",color:"#BBA090",marginBottom:"5px"}}>{nextTier.desc}</div>
                    <div style={{fontSize:"10px",color:money>=nextTier.price?"#F5A623":"#B8907A"}}>
                      L {nextTier.price.toLocaleString()} {money>=nextTier.price?"✓":"(Tenés L"+money+")"}
                    </div>
                  </div>
                  <button onClick={()=>onUpgrade(nextTier.id)} disabled={money<nextTier.price||loading}
                    style={{padding:"6px 10px",borderRadius:"7px",border:"1px solid #D4A853",background:money>=nextTier.price?"rgba(245,166,35,0.1)":"transparent",color:money>=nextTier.price?"#F5A623":"#BBA090",fontSize:"10px",cursor:money>=nextTier.price?"pointer":"not-allowed",flexShrink:0}}>
                    Comprar
                  </button>
                </div>
              </div>
            )}
            {!nextTier&&<div style={{fontSize:"10px",color:"#BBA090",fontStyle:"italic",textAlign:"center",marginTop:"10px"}}>Tenés la mejor propiedad de Veloria.</div>}
          </div>
        )}

        {view==="muebles"&&(
          <div>
            {/* Installed */}
            {placedFurniture.length>0&&(
              <div style={{marginBottom:"10px"}}>
                <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Instalados</div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"5px"}}>
                  {placedFurniture.map(fId=>{
                    const f=FURNITURE_ITEMS[fId];if(!f)return null;
                    return(
                      <div key={fId} style={{background:"#F5EDE0",border:"1px solid #1A1208",borderRadius:"7px",padding:"5px 8px",display:"flex",alignItems:"center",gap:"5px"}}>
                        <span style={{fontSize:"14px"}}>{f.emoji}</span>
                        <span style={{fontSize:"9px",color:"#7A5840"}}>{f.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            {/* Shop */}
            <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Disponibles</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"5px"}}>
              {Object.entries(FURNITURE_ITEMS).filter(([id])=>!placedFurniture.includes(id)).map(([id,f])=>{
                const canBuy=money>=f.price&&slotsUsed<tier.slots;
                return(
                  <div key={id} style={{background:"#F5EDE0",border:"1px solid #1A1208",borderRadius:"8px",padding:"8px"}}>
                    <div style={{fontSize:"18px",marginBottom:"2px"}}>{f.emoji}</div>
                    <div style={{fontSize:"10px",color:"#7A5840",fontWeight:500,marginBottom:"1px"}}>{f.label}</div>
                    <div style={{fontSize:"8px",color:"#BBA090",marginBottom:"5px",lineHeight:"1.3"}}>{f.desc}</div>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                      <span style={{fontSize:"9px",color:canBuy?"#F5A623":"#BBA090"}}>L {f.price}</span>
                      <button onClick={()=>onBuyFurniture(id)} disabled={!canBuy||loading}
                        style={{padding:"2px 7px",borderRadius:"5px",border:`1px solid ${canBuy?"#F5A623":"#D4C4B0"}`,background:"transparent",color:canBuy?"#F5A623":"#BBA090",fontSize:"8px",cursor:canBuy?"pointer":"not-allowed"}}>
                        {!canBuy&&money<f.price?"L"+f.price:slotsUsed>=tier.slots?"Sin ranuras":"Comprar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══ LEGACY SCREEN ═══
function LegacyScreen({twin,gt,skills,rels,family,children,onContinueAsChild,onNewGame,lifeChapters,reputation}){
  const daysLived=PLAYER_START_DAYS+(gt.day-1);
  const masteredSkills=Object.entries(skills).filter(([,xp])=>getSkillLevel(xp)>=4).map(([k])=>SKILLS_CFG[k]?.label||k);
  const closeFriends=Object.entries(rels).filter(([,r])=>r.friendship>=65).sort(([,a],[,b])=>b.friendship-a.friendship);
  const hasChild=children&&children.length>0;
  const llegada=twin?.llegada?LLEGADA_OPTIONS.find(l=>l.id===twin.llegada):null;
  const repLevel=getRepLevel(reputation||0);
  const notable=(lifeChapters||[]).filter(c=>c.type!=="season"&&c.type!=="daily").slice(-8);
  const aspiration=twin?.aspiration?ASPIRATIONS.find(a=>a.id===twin.aspiration):null;

  // Auto-generate life sections
  const sections=[];
  if(llegada)sections.push({title:"La llegada",text:`${twin?.name} llegó a Veloria ${llegada.label.toLowerCase()}. Eso ya dice algo.`});
  else sections.push({title:"La llegada",text:`${twin?.name} llegó a Veloria en el Día 1 con lo que tenía.`});
  if(closeFriends.length>0)sections.push({title:"Las personas",text:`En Veloria encontró personas que importaron: ${closeFriends.slice(0,4).map(([n])=>n.split(" ")[0]).join(", ")}.`});
  if(masteredSkills.length>0)sections.push({title:"Lo que dominó",text:`Llegó a dominar: ${masteredSkills.join(", ")}. Eso no se pierde.`});
  if(family?.partner)sections.push({title:"La familia",text:`Compartió su vida con ${family.partner.split(" ")[0]}${hasChild?`. Tuvieron ${children.length===1?"un hijo/a":`${children.length} hijos/as`}: ${children.map(c=>typeof c==="string"?c:c.name).join(", ")}`:""}.`});
  if(aspiration)sections.push({title:"La aspiración",text:`Su aspiración era ${aspiration.label.toLowerCase()}. ${aspiration.desc}`});

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(12,8,20,0.97)",display:"flex",alignItems:"flex-start",justifyContent:"center",zIndex:300,fontFamily:"'Fredoka',sans-serif",overflowY:"auto",padding:"32px 16px"}}>
      <div style={{maxWidth:"520px",width:"100%"}}>

        {/* Header */}
        <div style={{textAlign:"center",marginBottom:"32px"}}>
          <div style={{fontSize:"32px",marginBottom:"8px"}}>✦</div>
          <div style={{fontFamily:"'Lora',serif",fontSize:"26px",color:"#F5A623",marginBottom:"4px"}}>El legado de {twin?.name}</div>
          <div style={{fontSize:"11px",color:"#888",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"12px"}}>Veloria · Otherwhen · {gt.day} días</div>
          <div style={{display:"inline-block",padding:"4px 16px",borderRadius:"20px",background:`${repLevel.color}22`,border:`1px solid ${repLevel.color}55`,fontSize:"12px",color:repLevel.color,fontWeight:600}}>
            ✦ {repLevel.label}
          </div>
        </div>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"8px",marginBottom:"24px"}}>
          {[
            {e:"🕰",v:daysLived,l:"Días vividos"},
            {e:"💬",v:closeFriends.length,l:"Amistades"},
            {e:"⭐",v:masteredSkills.length,l:"Skills IV+"},
            {e:"👶",v:children?.length||0,l:"Hijos/as"},
          ].map(({e,v,l})=>(
            <div key={l} style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:"12px",padding:"10px 6px",textAlign:"center"}}>
              <div style={{fontSize:"18px",marginBottom:"3px"}}>{e}</div>
              <div style={{fontFamily:"'Lora',serif",fontSize:"20px",color:"#F5A623",marginBottom:"1px"}}>{v}</div>
              <div style={{fontSize:"8px",color:"#666",textTransform:"uppercase",letterSpacing:"0.08em"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Life sections */}
        {sections.length>0&&(
          <div style={{background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.06)",borderRadius:"16px",padding:"20px",marginBottom:"20px"}}>
            <div style={{fontSize:"10px",color:"#F5A623",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"16px",fontFamily:"'Nunito',sans-serif"}}>El Acta de {twin?.name} en Veloria</div>
            {sections.map((s,i)=>(
              <div key={i} style={{marginBottom:"14px",paddingLeft:"12px",borderLeft:"2px solid rgba(245,166,35,0.3)"}}>
                <div style={{fontSize:"9px",color:"#888",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"3px",fontFamily:"'Nunito',sans-serif"}}>{s.title}</div>
                <div style={{fontSize:"13px",color:"#D0C0A8",fontFamily:"'Lora',serif",lineHeight:1.7,fontStyle:"italic"}}>{s.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Life chapters timeline */}
        {notable.length>0&&(
          <div style={{marginBottom:"24px"}}>
            <div style={{fontSize:"10px",color:"#666",letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"12px",fontFamily:"'Nunito',sans-serif"}}>Momentos</div>
            {notable.map((ch,i)=>(
              <div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px",alignItems:"flex-start"}}>
                <div style={{fontSize:"9px",color:"#555",fontFamily:"'Nunito',sans-serif",whiteSpace:"nowrap",marginTop:"3px",flexShrink:0}}>Día {ch.day}</div>
                <div style={{fontSize:"12px",color:"#A09080",fontFamily:"'Lora',serif",lineHeight:1.5}}>{ch.text}</div>
              </div>
            ))}
          </div>
        )}

        {/* Death quote */}
        <div style={{textAlign:"center",marginBottom:"28px",fontFamily:"'Lora',serif",fontSize:"13px",color:"#666",fontStyle:"italic",lineHeight:1.7,padding:"0 16px"}}>
          *{getNarrative("death")||"Veloria recuerda a los que la habitaron con honestidad."}*
        </div>

        {/* Actions */}
        <div style={{display:"flex",gap:"10px",justifyContent:"center",flexWrap:"wrap"}}>
          {hasChild&&children.slice(0,3).map((child,i)=>{
            const childName=typeof child==="string"?child:child.name;
            const childData=typeof child==="object"?child:{};
            return(
              <button key={i} onClick={()=>onContinueAsChild({...childData,name:childName,parentName:twin?.name,parentColor:twin?.color,parentRep:reputation,parentRels:rels})}
                style={{padding:"12px 20px",borderRadius:"12px",border:"1.5px solid #F5A623",background:"rgba(245,166,35,0.08)",color:"#F5A623",fontSize:"13px",cursor:"pointer",fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>
                Continuar como {childName} →
              </button>
            );
          })}
          <button onClick={onNewGame} style={{padding:"12px 20px",borderRadius:"12px",border:"1px solid rgba(255,255,255,0.12)",background:"transparent",color:"#888",fontSize:"13px",cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>
            Nueva partida
          </button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════ MAPA ═══════════════════
const HOOD_MAP={
  "La Vega":    {x:0, y:0, w:44,h:48},
  "El Casco":   {x:46,y:0, w:54,h:48},
  "Ribera":     {x:0, y:51,w:35,h:49},
  "Veleta":     {x:37,y:51,w:40,h:49},
  "Los Prados": {x:79,y:51,w:21,h:49},
};

function MapaTab({gt,rels,loc,loading,onGoTo}){
  const [selNPC,setSelNPC]=useState(null);
  const hour=((gt.hour%24)+24)%24;

  // Group all NPCs by current hood
  const byHood={};
  Object.keys(NPC_SCHEDULES).forEach(name=>{
    const slot=getNPCSlot(name,hour);
    if(!slot)return;
    if(!byHood[slot.hood])byHood[slot.hood]=[];
    byHood[slot.hood].push({name,place:slot.place});
  });

  const selSlot=selNPC?getNPCSlot(selNPC,hour):null;
  const selSched=selNPC?NPC_SCHEDULES[selNPC]:null;
  const isKnown=name=>!!rels[name];

  function timeLabel(h){return`${h.toString().padStart(2,"0")}:00`;}

  return(
    <div style={{display:"flex",height:"100%",overflow:"hidden"}}>
      {/* MAP */}
      <div style={{flex:1,padding:"8px",position:"relative",overflow:"hidden"}}>
        <div style={{fontSize:"9px",color:"#D4C4B0",textTransform:"uppercase",letterSpacing:"0.12em",marginBottom:"6px"}}>
          {toTimeStr(gt.hour)} · Día {gt.day} · {MONTHS[gt.monthIdx]}
        </div>
        <div style={{position:"relative",width:"100%",height:"calc(100% - 22px)"}}>
          {Object.entries(HOOD_MAP).map(([hood,pos])=>{
            const color=(NEIGHBORHOODS[hood]||{}).color||"#BBA090";
            const npcsHere=byHood[hood]||[];
            const isHere=loc.hood===hood;
            return(
              <div key={hood} style={{
                position:"absolute",left:`${pos.x}%`,top:`${pos.y}%`,
                width:`${pos.w-2}%`,height:`${pos.h-4}%`,
                background:`${color}0E`,
                border:`1px solid ${color}${isHere?"77":"22"}`,
                borderRadius:"8px",padding:"5px 6px",overflow:"hidden",
                boxShadow:isHere?`inset 0 0 12px ${color}18`:"none",
                transition:"border-color 0.3s",
              }}>
                <div style={{fontSize:"9px",color:`${color}88`,fontWeight:600,letterSpacing:"0.04em",marginBottom:"4px",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"}}>
                  {NEIGHBORHOODS[hood]?.emoji} {hood}
                </div>
                <div style={{display:"flex",flexWrap:"wrap",gap:"3px"}}>
                  {npcsHere.map(({name})=>{
                    const known=isKnown(name);
                    const c=NPC_HOOD_COLOR[name]||color;
                    const isSel=selNPC===name;
                    return(
                      <button key={name} onClick={()=>setSelNPC(isSel?null:name)} title={name}
                        style={{width:"20px",height:"20px",borderRadius:"50%",padding:0,flexShrink:0,
                          background:known?`${c}25`:"#FFFAF5",
                          border:`2px solid ${isSel?"#F5A623":known?c:"#D4C4B0"}`,
                          color:known?c:"#D4C4B0",fontSize:"9px",fontWeight:700,
                          cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
                          boxShadow:isSel?`0 0 6px ${c}60`:"none",
                          transition:"all 0.15s",
                        }}>
                        {name.charAt(0)}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DETAIL */}
      <div style={{width:"168px",borderLeft:"1px solid #1A1208",display:"flex",flexDirection:"column",overflow:"hidden"}}>
        {!selNPC&&(
          <div style={{padding:"12px",color:"#D4C4B0",fontSize:"10px",fontStyle:"italic",textAlign:"center",marginTop:"12px",lineHeight:"1.5"}}>
            Tocá un punto en el mapa para ver el horario de ese Twin
          </div>
        )}
        {selNPC&&selSlot&&(
          <>
            <div style={{padding:"10px",borderBottom:"1px solid #1A1208",display:"flex",alignItems:"center",gap:"8px",flexShrink:0}}>
              <NPCAvatar name={selNPC} size={30}/>
              <div style={{flex:1,overflow:"hidden"}}>
                <div style={{fontSize:"11px",color:"#7A5840",fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{selNPC}</div>
                <div style={{fontSize:"9px",color:"#BBA090",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{NPC_DESC[selNPC]||""}</div>
              </div>
            </div>

            <div style={{padding:"8px 10px",borderBottom:"1px solid #1A1208",flexShrink:0}}>
              <div style={{fontSize:"8px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"4px"}}>Ahora</div>
              <div style={{fontSize:"11px",color:"#F5A623",fontWeight:600}}>{selSlot.place}</div>
              <div style={{fontSize:"9px",color:"#B8907A"}}>{selSlot.hood}</div>
            </div>

            <div style={{flex:1,overflowY:"auto",padding:"8px 10px"}}>
              <div style={{fontSize:"8px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>Horario de hoy</div>
              {selSched?.map((slot,i)=>{
                const isCur=hour>=slot.from&&hour<slot.to;
                const color=(NEIGHBORHOODS[slot.hood]||{}).color||"#BBA090";
                return(
                  <div key={i} style={{
                    display:"flex",alignItems:"flex-start",gap:"6px",
                    padding:"4px 6px",borderRadius:"5px",marginBottom:"2px",
                    background:isCur?"rgba(245,166,35,0.07)":"transparent",
                    border:`1px solid ${isCur?"rgba(245,166,35,0.2)":"transparent"}`,
                  }}>
                    <div style={{width:"3px",height:"100%",minHeight:"28px",borderRadius:"2px",background:isCur?"#F5A623":color+"44",flexShrink:0,marginTop:"2px"}}/>
                    <div style={{flex:1}}>
                      <div style={{fontSize:"8px",color:isCur?"#F5A623":"#BBA090"}}>{timeLabel(slot.from)} — {timeLabel(slot.to===24?0:slot.to)}</div>
                      <div style={{fontSize:"10px",color:isCur?"#7A5840":"#B8907A",fontWeight:isCur?600:400,lineHeight:"1.2"}}>{slot.place}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {(()=>{const nav=resolveNavPlace(selSlot.place,selSlot.hood);return nav&&(
              <div style={{padding:"8px 10px",borderTop:"1px solid #1A1208",flexShrink:0}}>
                <button onClick={()=>{if(!loading){onGoTo(nav.hood,nav.place);setSelNPC(null);}}} disabled={loading}
                  style={{width:"100%",padding:"7px",borderRadius:"7px",border:"1px solid #3D2B1F",background:"transparent",color:"#F5A623",fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:600}}>
                  Ir a encontrarlo/a →
                </button>
              </div>
            );})()}
          </>
        )}
      </div>
    </div>
  );
}


const SAVE_KEY="inbetweens_s_";
const AUTO_KEY="inbetweens_auto";
function buildSave(twin,needs,money,gt,loc,rels,career,family,inventory,log,skills,housing,placedFurniture){
  return{v:3,savedAt:Date.now(),twin,needs,money,gt,loc,rels,career,family,inventory,log:log.slice(-50),skills,housing,placedFurniture};
}
function readSlot(slot){
  try{const r=localStorage.getItem(SAVE_KEY+slot);return r?JSON.parse(r):null;}catch{return null;}
}
function slotMeta(slot){
  const d=readSlot(slot);if(!d)return null;
  return{twinName:d.twin?.name||"?",day:d.gt?.day||1,money:d.money||0,monthIdx:d.gt?.monthIdx||0,savedAt:d.savedAt};
}
function fmtDate(ts){
  if(!ts)return"";
  const d=new Date(ts);
  return`${d.getDate()}/${d.getMonth()+1} ${d.getHours().toString().padStart(2,"0")}:${d.getMinutes().toString().padStart(2,"0")}`;
}
function anySaveExists(){
  return[0,1,2].some(s=>readSlot(s))||!!localStorage.getItem(AUTO_KEY);
}

function MenuBtn({label,onClick,accent=false,danger=false}){
  const [h,setH]=useState(false);
  const col=accent?"#F5A623":danger?"#E87B9E":"#B8907A";
  const hCol=accent?"#F0C97A":danger?"#F09090":"#7A5840";
  return(
    <button onClick={onClick} onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{width:"100%",padding:"8px 10px",marginBottom:"4px",borderRadius:"7px",border:`1px solid ${h?"#D4C4B0":"#E0D4C8"}`,background:h?"rgba(255,255,255,0.02)":"transparent",color:h?hCol:col,cursor:"pointer",textAlign:"left",fontSize:"11px",transition:"all 0.12s"}}>
      {label}
    </button>
  );
}

function SaveSlot({slot,view,onSave,onLoad,savedFlash}){
  const meta=slotMeta(slot);
  return(
    <div style={{background:"#F0EAE0",border:"1px solid #1A1208",borderRadius:"10px",padding:"11px 13px",marginBottom:"7px",display:"flex",alignItems:"center",gap:"10px"}}>
      <div style={{width:"28px",height:"28px",borderRadius:"7px",background:"rgba(245,166,35,0.05)",border:"1px solid #1A1208",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#D4C4B0",fontWeight:700,flexShrink:0}}>{slot+1}</div>
      <div style={{flex:1,overflow:"hidden"}}>
        {meta?(
          <>
            <div style={{fontSize:"11px",color:"#7A5840",fontWeight:600}}>{meta.twinName}</div>
            <div style={{fontSize:"9px",color:"#BBA090"}}>Día {meta.day} · L {meta.money} · {MONTHS[meta.monthIdx]}</div>
            <div style={{fontSize:"8px",color:"#D4C4B0"}}>{fmtDate(meta.savedAt)}</div>
          </>
        ):(
          <div style={{fontSize:"10px",color:"#D4C4B0",fontStyle:"italic"}}>Ranura vacía</div>
        )}
      </div>
      <div style={{display:"flex",gap:"5px",flexShrink:0}}>
        {view==="save"&&(
          <button onClick={()=>onSave(slot)} style={{padding:"4px 9px",borderRadius:"6px",border:`1px solid ${savedFlash===slot?"#6B9E5E":"#D4C4B0"}`,background:savedFlash===slot?"rgba(122,181,92,0.1)":"transparent",color:savedFlash===slot?"#6B9E5E":"#B8907A",fontSize:"9px",cursor:"pointer",transition:"all 0.2s"}}>
            {savedFlash===slot?"✓":"Guardar"}
          </button>
        )}
        {view==="load"&&meta&&(
          <button onClick={()=>onLoad(slot)} style={{padding:"4px 9px",borderRadius:"6px",border:"1px solid #2C1F14",background:"transparent",color:"#F5A623",fontSize:"9px",cursor:"pointer"}}>Cargar</button>
        )}
        {view==="load"&&!meta&&<div style={{fontSize:"9px",color:"#E0D4C8"}}>—</div>}
      </div>
    </div>
  );
}

function PausaModal({onClose,onSave,onLoad,onReset,log,gt,twin}){
  const [view,setView]=useState("menu");
  const [savedFlash,setSavedFlash]=useState(null);
  const [confirmReset,setConfirmReset]=useState(false);
  const lastEntries=[...log].reverse().slice(0,4);
  const auto=(() => { try{ const r=localStorage.getItem(AUTO_KEY); return r?JSON.parse(r):null; } catch{ return null; }})();

  function doSave(slot){
    onSave(slot);
    setSavedFlash(slot);
    setTimeout(()=>setSavedFlash(null),2000);
  }
  function doLoad(slot){ onLoad(slot); onClose(); }
  function doLoadAuto(){ onLoad("auto"); onClose(); }

  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:200}} onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div style={{background:"#F5EDE0",border:"1px solid #2C1F14",borderRadius:"16px",width:"600px",maxWidth:"96vw",overflow:"hidden",display:"flex",maxHeight:"88vh"}}>

        {/* Left menu */}
        <div style={{width:"205px",background:"#EDE5D8",borderRight:"1px solid #1A1208",padding:"22px 16px",display:"flex",flexDirection:"column",flexShrink:0}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"19px",color:"#F5A623",letterSpacing:"0.15em",marginBottom:"2px"}}>inbetweens</div>
          <div style={{fontSize:"7px",color:"#E0D4C8",letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"20px"}}>VELORIA · OTHERWHEN</div>

          <MenuBtn label="Continuar" accent onClick={onClose}/>
          <MenuBtn label={view==="save"?"↩ Volver":"💾 Guardar partida"} onClick={()=>setView(v=>v==="save"?"menu":"save")}/>
          <MenuBtn label={view==="load"?"↩ Volver":"📂 Cargar partida"} onClick={()=>setView(v=>v==="load"?"menu":"load")}/>

          <div style={{height:"1px",background:"#E0D4C8",margin:"8px 0"}}/>

          {confirmReset?(
            <div>
              <div style={{fontSize:"9px",color:"#E87B9E",marginBottom:"7px",lineHeight:"1.4"}}>¿Seguro? La partida actual se pierde si no guardaste.</div>
              <MenuBtn label="Sí, nueva partida" danger onClick={()=>{setConfirmReset(false);onReset();}}/>
              <MenuBtn label="Cancelar" onClick={()=>setConfirmReset(false)}/>
            </div>
          ):(
            <MenuBtn label="Nueva partida" onClick={()=>setConfirmReset(true)}/>
          )}

          <div style={{flex:1}}/>

          {auto&&(
            <div style={{padding:"7px",background:"rgba(245,166,35,0.03)",border:"1px solid #1A1208",borderRadius:"7px",marginBottom:"6px"}}>
              <div style={{fontSize:"8px",color:"#BBA090",marginBottom:"3px"}}>Autoguardado</div>
              <div style={{fontSize:"9px",color:"#B8907A"}}>{auto.twin?.name} · Día {auto.gt?.day}</div>
              <div style={{fontSize:"7px",color:"#D4C4B0",marginBottom:"5px"}}>{fmtDate(auto.savedAt)}</div>
              <button onClick={doLoadAuto} style={{fontSize:"8px",color:"#7A5840",background:"transparent",border:"1px solid #2C1F14",borderRadius:"5px",padding:"2px 6px",cursor:"pointer",width:"100%"}}>Cargar autoguardado</button>
            </div>
          )}
          <div style={{fontSize:"7px",color:"#E0D4C8"}}>{twin?.name} · Día {gt?.day}</div>
        </div>

        {/* Right panel */}
        <div style={{flex:1,overflowY:"auto"}}>
          {(view==="save"||view==="load")&&(
            <div style={{padding:"20px"}}>
              <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:"12px"}}>
                {view==="save"?"Elegí una ranura para guardar":"Elegí una partida para cargar"}
              </div>
              {[0,1,2].map(s=>(
                <SaveSlot key={s} slot={s} view={view} onSave={doSave} onLoad={doLoad} savedFlash={savedFlash}/>
              ))}
              {view==="save"&&<div style={{fontSize:"8px",color:"#D4C4B0",marginTop:"6px",fontStyle:"italic"}}>El autoguardado ocurre automáticamente cada 5 acciones.</div>}
            </div>
          )}

          {view==="menu"&&(
            <div style={{padding:"20px"}}>
              <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.15em",marginBottom:"12px"}}>Memoria del día</div>
              {lastEntries.length===0&&<div style={{color:"#D4C4B0",fontSize:"11px",fontStyle:"italic"}}>El diario empieza a llenarse mientras jugás.</div>}
              {lastEntries.map(e=>(
                <div key={e.id} style={{marginBottom:"14px",paddingLeft:"10px",borderLeft:"2px solid #1A1208"}}>
                  {e.place&&<div style={{fontSize:"8px",color:"#D4C4B0",marginBottom:"3px"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
                  <div style={{fontSize:"12px",color:"#B8907A",fontStyle:"italic",fontFamily:"'Lora',serif",lineHeight:"1.6"}}>{(e.text||"").slice(0,240)}{(e.text||"").length>240?"…":""}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════ CREATION SCREEN ═══════════════════
function CreationScreen({onStart,onLoad,defaultShowLoad}){
  const [step,setStep]=useState(0);
  const [name,setName]=useState("");
  const [pronouns,setPronouns]=useState("elle");
  const [twinColor,setTwinColor]=useState("#F5A623");
  const [origin,setOrigin]=useState(null);
  const [traits,setTraits]=useState([]);
  const [aspiration,setAspiration]=useState(null);
  const [connection,setConnection]=useState(null);
  const [llegada,setLlegada]=useState(null);
  const [showLoad,setShowLoad]=useState(!!defaultShowLoad);

  const STEPS=["Identidad","Origen","Rasgos","Aspiración","Conexión","Llegada","Resumen"];
  const PRONOUN_OPTS=[{id:"el",label:"Él"},{id:"ella",label:"Ella"},{id:"elle",label:"Elle"}];
  const CONNECTIONS=[
    {npc:"Aria Ven",    emoji:"☕",desc:"La dueña del café de La Vega. Ya sabe tu nombre.",fr:25},
    {npc:"Oren Mirende",emoji:"⛵",desc:"El pescador de Ribera. Una tarde en el muelle.",fr:25},
    {npc:"Soren Lume",  emoji:"📚",desc:"El librero de El Casco. Una deuda de un libro.",fr:25},
    {npc:"Bren Orlen",  emoji:"⚕️",desc:"El médico de Los Prados. Una calma que recordás.",fr:25},
  ];

  const canNext=[
    name.trim().length>1,
    !!origin,
    traits.length===3,
    !!aspiration,
    !!connection,
    !!llegada,
    true,
  ][step]??false;

  function toggleTrait(id){
    if(traits.includes(id))setTraits(t=>t.filter(x=>x!==id));
    else if(traits.length<3)setTraits(t=>[...t,id]);
  }

  function handleFinish(){
    const orig=ORIGINS.find(o=>o.id===origin);
    const ll=LLEGADA_OPTIONS.find(l=>l.id===llegada);
    onStart({name:name.trim(),pronouns,origin,traits,aspiration,_origin:orig,_connection:connection,color:twinColor,llegada,_llegada:ll});
  }

  // ── Light theme styles ──
  const WRAP={minHeight:"100vh",background:"#F5EDE0",display:"flex",flexDirection:"column",alignItems:"center",padding:"0",fontFamily:"'Fredoka',sans-serif",overflowY:"auto"};
  const INNER={width:"100%",maxWidth:"440px",padding:"24px 20px"};
  const INPUT={width:"100%",background:"#FFFFFF",border:"1.5px solid #E0D4C8",borderRadius:"12px",padding:"12px 16px",color:"#2C1A0E",fontSize:"16px",fontFamily:"'Lora',serif",outline:"none",marginBottom:"16px"};
  const btn=(active,color="#F5A623")=>({padding:"10px 18px",borderRadius:"12px",border:`1.5px solid ${active?color:"#E0D4C8"}`,background:active?color:"#FFFFFF",color:active?"#FFFFFF":"#B8907A",cursor:"pointer",fontSize:"13px",fontWeight:active?700:500,transition:"all 0.15s",fontFamily:"'Fredoka',sans-serif"});
  const NEXT=(disabled)=>({padding:"13px",borderRadius:"14px",border:"none",background:disabled?"#E0D4C8":"#F5A623",color:disabled?"#B8907A":"#FFFFFF",cursor:disabled?"not-allowed":"pointer",fontSize:"15px",fontWeight:700,marginTop:"20px",width:"100%",fontFamily:"'Fredoka',sans-serif",boxShadow:disabled?"none":"0 4px 14px rgba(245,166,35,0.3)"});
  const BACK={padding:"6px 0",border:"none",background:"transparent",color:"#B8907A",cursor:"pointer",fontSize:"13px",alignSelf:"flex-start",fontFamily:"'Fredoka',sans-serif"};
  const TITLE={fontSize:"24px",fontWeight:700,color:"#2C1A0E",marginBottom:"5px"};
  const SUB={fontSize:"12px",color:"#B8907A",marginBottom:"18px",lineHeight:1.5,fontFamily:"'Nunito',sans-serif"};
  const LABEL={fontSize:"10px",color:"#B8907A",textTransform:"uppercase",letterSpacing:"0.14em",marginBottom:"8px",fontFamily:"'Nunito',sans-serif",display:"block"};

  const slotCard={background:"#FFFFFF",border:"1px solid #E0D4C8",borderRadius:"12px",padding:"12px 14px",marginBottom:"8px",display:"flex",alignItems:"center",gap:"10px"};

  if(showLoad)return(
    <div style={WRAP}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box}`}</style>
      <div style={INNER}>
        {/* Header */}
        <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"28px",paddingTop:"8px"}}>
          <img src="/logo.png" alt="Inbetweens" style={{height:36}}/>
        </div>
        <div style={TITLE}>Partidas guardadas</div>
        <div style={{...SUB,marginBottom:"20px"}}>Continuá donde lo dejaste.</div>
        {[0,1,2].map(s=>{const m=slotMeta(s);return(
          <div key={s} style={slotCard}>
            <div style={{width:"26px",height:"26px",borderRadius:"8px",background:"#F5EDE0",border:"1px solid #E0D4C8",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"11px",color:"#B8907A",flexShrink:0,fontFamily:"'Fredoka',sans-serif"}}>{s+1}</div>
            <div style={{flex:1}}>{m?<><div style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>{m.twinName}</div><div style={{fontSize:"10px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>Día {m.day} · L {m.money} · {fmtDate(m.savedAt)}</div></>:<div style={{fontSize:"11px",color:"#D4C4B0",fontStyle:"italic",fontFamily:"'Nunito',sans-serif"}}>Vacío</div>}</div>
            {m&&<button onClick={()=>onLoad(s)} style={btn(true)}>Cargar</button>}
          </div>
        );})}
        {(()=>{try{const r=localStorage.getItem(AUTO_KEY);const auto=r?JSON.parse(r):null;if(!auto)return null;return(<div style={slotCard}><div style={{fontSize:"14px",flexShrink:0}}>⚡</div><div style={{flex:1}}><div style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600,fontFamily:"'Fredoka',sans-serif"}}>Autosave · {auto.twin?.name}</div><div style={{fontSize:"10px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>Día {auto.gt?.day} · {fmtDate(auto.savedAt)}</div></div><button onClick={()=>onLoad("auto")} style={btn(true)}>Cargar</button></div>);}catch{return null;}})()}
        <button onClick={()=>setShowLoad(false)} style={{...btn(false),marginTop:"4px"}}>← Nueva partida</button>
      </div>
    </div>
  );

  const TRAIT_CATS=["Mente","Social","Espíritu","Carácter","Naturaleza"];

  return(
    <div style={WRAP}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box}input{outline:none}`}</style>

      {/* Header with logo */}
      <div style={{background:"#FFFFFF",borderBottom:"1px solid #E0D4C8",padding:"12px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%",position:"sticky",top:0,zIndex:10}}>
        <img src="/logo.png" alt="Inbetweens" style={{height:32}}/>
        <div style={{fontSize:"10px",color:"#B8907A",letterSpacing:"0.15em",textTransform:"uppercase",fontFamily:"'Nunito',sans-serif"}}>Otherwhen · Veloria</div>
      </div>

      <div style={{width:"100%",maxWidth:"440px",padding:"20px 20px 40px",margin:"0 auto"}}>
        {/* Progress bar */}
        <div style={{display:"flex",gap:"4px",marginBottom:"20px"}}>
          {STEPS.map((s,i)=>(
            <div key={i} style={{height:"4px",flex:1,borderRadius:"2px",background:i<=step?"#F5A623":"#E0D4C8",transition:"background 0.3s"}}/>
          ))}
        </div>

        {/* Back */}
        {step>0&&<button style={BACK} onClick={()=>setStep(s=>s-1)}>← {STEPS[step-1]}</button>}

        {/* ── STEP 0: IDENTIDAD ── */}
        {step===0&&(
          <div>
            <div style={TITLE}>Tu Twin</div>
            <div style={SUB}>¿Cómo se va a llamar tu Twin en Veloria?</div>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Nombre de tu Twin"
              style={INPUT}/>
            <span style={LABEL}>Pronombres</span>
            <div style={{display:"flex",gap:"8px",marginBottom:"20px"}}>
              {PRONOUN_OPTS.map(p=>(
                <button key={p.id} onClick={()=>setPronouns(p.id)} style={{...btn(pronouns===p.id),flex:1}}>{p.label}</button>
              ))}
            </div>
            <span style={LABEL}>Color del Twin</span>
            <div style={{display:"flex",gap:"10px",flexWrap:"wrap",marginBottom:"8px"}}>
              {TWIN_COLORS.map(c=>(
                <button key={c} onClick={()=>setTwinColor(c)}
                  style={{width:"38px",height:"38px",borderRadius:"50%",background:c,border:`${twinColor===c?"3.5px":"2px"} solid ${twinColor===c?"#2C1A0E":"#E0D4C8"}`,cursor:"pointer",boxShadow:twinColor===c?"0 2px 8px rgba(0,0,0,0.2)":"none",transition:"all 0.15s",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  {twinColor===c&&<span style={{color:"#fff",fontSize:"14px",fontWeight:900}}>✓</span>}
                </button>
              ))}
            </div>
            <div style={{fontSize:"10px",color:"#D4C4B0",fontFamily:"'Nunito',sans-serif"}}>Pronombres y color afectan la narrativa del juego.</div>
          </div>
        )}

        {/* ── STEP 1: ORIGEN ── */}
        {step===1&&(
          <div>
            <div style={TITLE}>Origen</div>
            <div style={SUB}>¿De dónde viene tu Twin? Define tus habilidades iniciales y primera conexión.</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {ORIGINS.map(o=>{
                const sel=origin===o.id;
                return(
                  <button key={o.id} onClick={()=>setOrigin(o.id)}
                    style={{textAlign:"left",padding:"14px",borderRadius:"14px",border:`1.5px solid ${sel?"#F5A623":"#E0D4C8"}`,background:sel?"#FFF3DC":"#FFFFFF",cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"10px",marginBottom:"6px"}}>
                      <span style={{fontSize:"20px"}}>{o.emoji}</span>
                      <div>
                        <div style={{fontSize:"14px",color:sel?"#F5A623":"#2C1A0E",fontWeight:700}}>{o.label}</div>
                        <div style={{fontSize:"10px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>{o.bonusLabel}</div>
                      </div>
                    </div>
                    <div style={{fontSize:"11px",color:sel?"#7A5840":"#B8907A",lineHeight:"1.5",fontStyle:"italic",fontFamily:"'Lora',serif"}}>"{o.lore}"</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 2: RASGOS ── */}
        {step===2&&(
          <div>
            <div style={TITLE}>Rasgos</div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"14px"}}>
              <div style={SUB}>Elegí 3 rasgos que definen a tu Twin.</div>
              <div style={{fontSize:"13px",color:traits.length===3?"#F5A623":"#B8907A",fontWeight:600,flexShrink:0}}>{traits.length}/3</div>
            </div>
            {TRAIT_CATS.map(cat=>{
              const catTraits=TRAITS.filter(t=>t.cat===cat);
              if(!catTraits.length)return null;
              return(
                <div key={cat} style={{marginBottom:"14px"}}>
                  <span style={LABEL}>{cat}</span>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px"}}>
                    {catTraits.map(t=>{
                      const sel=traits.includes(t.id);
                      const disabled=!sel&&traits.length>=3;
                      return(
                        <button key={t.id} onClick={()=>!disabled&&toggleTrait(t.id)}
                          style={{textAlign:"left",padding:"10px",borderRadius:"12px",border:`1.5px solid ${sel?"#F5A623":"#E0D4C8"}`,background:sel?"#FFF3DC":"#FFFFFF",cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.4:1,transition:"all 0.12s"}}>
                          <div style={{display:"flex",gap:"6px",alignItems:"center",marginBottom:"2px"}}>
                            <span style={{fontSize:"15px"}}>{t.emoji}</span>
                            <span style={{fontSize:"12px",color:sel?"#F5A623":"#2C1A0E",fontWeight:700}}>{t.label}</span>
                          </div>
                          <div style={{fontSize:"9px",color:sel?"#B8907A":"#D4C4B0",fontFamily:"'Nunito',sans-serif"}}>{t.effectLabel}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── STEP 3: ASPIRACIÓN ── */}
        {step===3&&(
          <div>
            <div style={TITLE}>Aspiración</div>
            <div style={SUB}>El objetivo de fondo de tu Twin. Define los hitos de tu historia.</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {ASPIRATIONS.map(a=>{
                const sel=aspiration===a.id;
                return(
                  <button key={a.id} onClick={()=>setAspiration(a.id)}
                    style={{textAlign:"left",padding:"13px 14px",borderRadius:"14px",border:`1.5px solid ${sel?"#F5A623":"#E0D4C8"}`,background:sel?"#FFF3DC":"#FFFFFF",cursor:"pointer",transition:"all 0.15s"}}>
                    <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                      <span style={{fontSize:"18px"}}>{a.emoji}</span>
                      <div style={{fontSize:"14px",color:sel?"#F5A623":"#2C1A0E",fontWeight:700}}>{a.label}</div>
                    </div>
                    <div style={{fontSize:"11px",color:sel?"#7A5840":"#B8907A",lineHeight:"1.4",fontFamily:"'Nunito',sans-serif"}}>{a.desc}</div>
                    {sel&&(
                      <div style={{marginTop:"8px",display:"flex",flexDirection:"column",gap:"3px"}}>
                        {a.milestones.map((m,i)=>(
                          <div key={m.id} style={{display:"flex",gap:"6px",alignItems:"center"}}>
                            <span style={{fontSize:"9px",color:"#D4C4B0"}}>○</span>
                            <span style={{fontSize:"10px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 4: CONEXIÓN ── */}
        {step===4&&(
          <div>
            <div style={TITLE}>Primera conexión</div>
            <div style={SUB}>¿A quién ya conocés cuando llegás a Veloria?</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {CONNECTIONS.map(c=>{
                const sel=connection===c.npc;
                return(
                  <button key={c.npc} onClick={()=>setConnection(c.npc)}
                    style={{textAlign:"left",padding:"12px 14px",borderRadius:"14px",border:`1.5px solid ${sel?"#F5A623":"#E0D4C8"}`,background:sel?"#FFF3DC":"#FFFFFF",cursor:"pointer",transition:"all 0.15s",display:"flex",gap:"12px",alignItems:"center"}}>
                    <span style={{fontSize:"22px",flexShrink:0}}>{c.emoji}</span>
                    <div>
                      <div style={{fontSize:"13px",color:sel?"#F5A623":"#2C1A0E",fontWeight:700,marginBottom:"2px"}}>{c.npc}</div>
                      <div style={{fontSize:"11px",color:sel?"#7A5840":"#B8907A",lineHeight:"1.4",fontFamily:"'Nunito',sans-serif"}}>{c.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 5: LLEGADA ── */}
        {step===5&&(
          <div>
            <div style={TITLE}>La llegada</div>
            <div style={SUB}>¿Por qué llegaste a Veloria? Esta decisión da forma a tu historia de fondo.</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {LLEGADA_OPTIONS.map(l=>{
                const sel=llegada===l.id;
                return(
                  <button key={l.id} onClick={()=>setLlegada(l.id)}
                    style={{textAlign:"left",padding:"14px",borderRadius:"14px",border:`1.5px solid ${sel?"#F5A623":"#E0D4C8"}`,background:sel?"#FFF3DC":"#FFFFFF",cursor:"pointer",transition:"all 0.15s",display:"flex",gap:"14px",alignItems:"center"}}>
                    <span style={{fontSize:"26px",flexShrink:0}}>{l.emoji}</span>
                    <div>
                      <div style={{fontSize:"14px",color:sel?"#F5A623":"#2C1A0E",fontWeight:700,marginBottom:"4px"}}>{l.label}</div>
                      <div style={{fontSize:"11px",color:sel?"#7A5840":"#B8907A",fontFamily:"'Lora',serif",fontStyle:"italic"}}>{l.hint}</div>
                      <div style={{fontSize:"10px",color:C.green||"#7AB55C",marginTop:"4px",fontFamily:"'Nunito',sans-serif"}}>+{l.bonusVal} XP {l.bonusSkill}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── STEP 6: RESUMEN ── */}
        {step===6&&(()=>{
          const asp=ASPIRATIONS.find(a=>a.id===aspiration);
          const orig=ORIGINS.find(o=>o.id===origin);
          const ll=LLEGADA_OPTIONS.find(l=>l.id===llegada);
          const selTraits=TRAITS.filter(t=>traits.includes(t.id));
          return(
            <div>
              <div style={TITLE}>Tu Twin está listo/a</div>
              <div style={SUB}>Así llega {name} a Veloria.</div>
              <div style={{background:"#FFFFFF",border:"1px solid #E0D4C8",borderRadius:"14px",padding:"16px",display:"flex",flexDirection:"column",gap:"10px"}}>
                {/* Avatar preview */}
                <div style={{display:"flex",justifyContent:"center",marginBottom:"4px"}}>
                  <div style={{width:52,height:52,borderRadius:"50%",background:twinColor,border:"2.5px solid #2C1A0E",display:"flex",alignItems:"center",justifyContent:"center",fontSize:22,color:"#fff",fontWeight:700,boxShadow:"2px 2px 0 #2C1A0E"}}>
                    {name[0]?.toUpperCase()||"?"}
                  </div>
                </div>
                {[
                  ["Nombre",`${name} (${pronouns})`],
                  ["Color",""],
                  ["Origen",`${orig?.emoji} ${orig?.label}`],
                  ["Aspiración",`${asp?.emoji} ${asp?.label}`],
                  ["Primera conexión",connection],
                  ["Llegada a Veloria",ll?`${ll.emoji} ${ll.label}`:"—"],
                ].filter(([,v])=>v).map(([l,v])=>(
                  <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:"11px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>{l}</span>
                    <span style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600}}>{v}</span>
                  </div>
                ))}
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:"8px"}}>
                  <span style={{fontSize:"11px",color:"#B8907A",fontFamily:"'Nunito',sans-serif",flexShrink:0}}>Rasgos</span>
                  <div style={{display:"flex",gap:"5px",flexWrap:"wrap",justifyContent:"flex-end"}}>
                    {selTraits.map(t=><span key={t.id} style={{fontSize:"11px",color:"#7A5840",background:"#FFF3DC",border:"1px solid #F5A62344",borderRadius:"8px",padding:"2px 8px"}}>{t.emoji} {t.label}</span>)}
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        <button onClick={step===6?handleFinish:()=>setStep(s=>s+1)} disabled={!canNext}
          style={NEXT(!canNext)}>
          {step===6?"✦ Llegar a Veloria":"Continuar →"}
        </button>
      </div>
    </div>
  );
}


// ═══════════════════ MAIN GAME ═══════════════════
export default function InbetweensGame(){
  const [phase,setPhase]=useState("splash"),[twin,setTwin]=useState(null);
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
  const [namingChild,setNamingChild]=useState(null); // null | {count,genders,names:["",...]}
  function initChildBirth(){
    const r=Math.random();
    const count=r<0.03?3:r<0.15?2:1;
    const genders=Array.from({length:count},()=>{const g=Math.random();return g<0.46?"varón":g<0.92?"mujer":"elle";});
    setNamingChild({count,genders,names:Array(count).fill("")});
  }
  const [skills,setSkills]=useState({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
  const [housing,setHousing]=useState("apto_basico");
  const [placedFurniture,setPlacedFurniture]=useState([]);
  const [usedOnce,setUsedOnce]=useState(new Set());
  const [showLegacy,setShowLegacy]=useState(false);
  const [pendingNPCDialogue,setPendingNPCDialogue]=useState(null);
  const [pendingChoice,setPendingChoice]=useState(null);
  const [activeShop,setActiveShop]=useState(null);
  const [chainActions,setChainActions]=useState([]);
  const [visitLog,setVisitLog]=useState({});
  const [shownEventDays,setShownEventDays]=useState([]);
  const [npcWorld,setNpcWorld]=useState(()=>JSON.parse(JSON.stringify(NPC_STARTING_DATA)));
  const [reputation,setReputation]=useState(0);
  const [activeGift,setActiveGift]=useState(null);
  const [mood,setMood]=useState(65);
  const [lifeChapters,setLifeChapters]=useState([]); // item being gifted
  const [aspirationProgress,setAspirationProgress]=useState([]);
  const [visitedPlaces,setVisitedPlaces]=useState(new Set(["Tu apartamento"]));
  const logEnd=useRef(null);
  const gtRef=useRef(gt);
  useEffect(()=>{gtRef.current=gt;},[gt]);
  const lastEventDay=useRef(0);
  const lastAgeMilestone=useRef(0);
  const lastNPCDay=useRef(0);
  const npcCooldowns=useRef({});
  useEffect(()=>{logEnd.current?.scrollIntoView({behavior:"smooth"});},[log]);

  // ── Random world events ──
  useEffect(()=>{
    if(phase!=="playing"||gt.day<=1||gt.day<=lastEventDay.current+1)return;
    if(Math.random()>0.30)return;
    const season=SEASONS[gt.monthIdx];
    const eligible=RANDOM_EVENTS.filter(e=>{
      if(e.season&&!season.includes(e.season))return false;
      if(e.req==="partner"&&!family.partner)return false;
      if(e.req==="child"&&family.children.length===0)return false;
      if(e.req?.startsWith("npc:")&&!rels[e.req.replace("npc:","")])return false;
      return true;
    });
    if(eligible.length===0)return;
    lastEventDay.current=gt.day;
    let text=pick(eligible).text;
    if(family.partner)text=text.replace("[PARTNER]",family.partner.split(" ")[0]);
    if(family.children[0])text=text.replace("[CHILD]",family.children[0].name);
    setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,text,type:"world_event",place:"Veloria · "+toTimeStr(gt.hour)}]);
  },[gt.day]);

  // ── Stage transitions + death ──
  useEffect(()=>{
    if(phase!=="playing"||!twin)return;
    const daysLived=PLAYER_START_DAYS+(gt.day-1);
    const prevDays=daysLived-1;
    const cur=getLifeStage(daysLived);
    const prev=getLifeStage(prevDays);
    // Stage transition notification
    if(cur.id!==prev.id&&gt.day>1){
      const txt=getNarrative(`stage:${cur.id}`)||`Nueva etapa: ${cur.label}.`;
      setLog(prev=>[ ...prev,{id:Date.now()+Math.random(),day:gt.day,text:txt,type:"intro",place:"Veloria"}]);
    }
    // Death during Anciano stage (10 days: 49-59)
    if(daysLived>=TOTAL_LIFESPAN){setShowLegacy(true);return;}
    const daysInAnciano=daysLived-49;
    if(daysInAnciano>=8&&Math.random()<0.4)setShowLegacy(true);
    else if(daysInAnciano>=5&&Math.random()<0.2)setShowLegacy(true);
    else if(daysInAnciano>=2&&Math.random()<0.07)setShowLegacy(true);
  },[gt.day]);

  // ── NPC autonomy ──
  useEffect(()=>{
    if(phase!=="playing"||gt.day<=lastNPCDay.current+2||pendingNPCDialogue)return;
    if(Math.random()>0.28)return;
    const daysLived=PLAYER_START_DAYS+(gt.day-1);
    const eligible=NPC_AUTONOMY.filter(ev=>{
      const fr=rels[ev.npc]?.friendship||0;
      if(fr<(ev.reqFriendship||ev.reqFr||0))return false;
      if(ev.reqAge&&daysLived<ev.reqAge)return false;
      if(ev.reqSkill){const[sk,lv]=ev.reqSkill.split(":");if(getSkillLevel(skills[sk]||0)<parseInt(lv))return false;}
      if(ev.once&&usedOnce.has(ev.id))return false;
      const lastFired=npcCooldowns.current[ev.id]||0;
      if(gt.day-lastFired<(ev.cooldown||15))return false;
      return true;
    });
    if(!eligible.length)return;
    const ev=pick(eligible);
    lastNPCDay.current=gt.day;
    npcCooldowns.current[ev.id]=gt.day;
    if(ev.once)setUsedOnce(prev=>new Set([...prev,ev.id]));
    setPendingNPCDialogue(ev);
  },[gt.day]);

  // ── Daily events: cada mañana algo pasa ──
  useEffect(()=>{
    if(phase!=="playing"||gt.day<=1||shownEventDays.includes(gt.day))return;
    if(Math.random()>0.65)return; // 65% de chance por día
    const ev=pickDailyEvent(shownEventDays.map(String));
    if(!ev)return;
    setShownEventDays(prev=>[...prev,gt.day]);
    // Add narrative entry
    setTimeout(()=>{
      addEntry({text:ev.text,type:"world_event",place:"Veloria · mañana",time:"08:00"});
      // Unlock chain action if event has one
      if(ev.unlock){
        setChainActions(prev=>[...prev,{
          id:`daily_${ev.id}`,emoji:ev.unlock.emoji,label:ev.unlock.label,
          hint:"Solo disponible hoy",action:ev.unlock,requiredPlace:null,
          expiresDay:gt.day+1,
        }]);
      }
      // Chain unlock
      if(ev.chainUnlock&&CHAIN_ACTIONS[ev.chainUnlock]){
        setChainActions(prev=>prev.find(c=>c.id===ev.chainUnlock)?prev:[...prev,{...CHAIN_ACTIONS[ev.chainUnlock],id:ev.chainUnlock,expiresDay:gt.day+3}]);
      }
      // Skill effects
      if(ev.effects?.skill)setSkills(s=>({...s,[ev.effects.skill]:(s[ev.effects.skill]||0)+(ev.effects.xp||0)}));
      // Triggered choice (after brief delay)
      if(ev.choice)setTimeout(()=>setPendingChoice(ev.choice),1200);
    },400);
  },[gt.day]);

  // ── NPC world simulation: NPCs envejecen, cobran, se casan, tienen hijos ──
  useEffect(()=>{
    if(phase!=="playing"||gt.day<=1)return;

    // ── Compute events from current snapshot (antes de actualizar estado) ──
    let marriageEvent=null;
    let childEvent=null;

    // Marriage check cada 7 días
    if(gt.day%7===0){
      const eligible=Object.entries(npcWorld).filter(([name,d])=>
        !d.partner&&d.isAlive&&d.age>=22&&d.age<=54&&name!==family.partner
      ).map(([name])=>name);
      if(eligible.length>=2&&Math.random()<0.2){
        const shuffled=[...eligible].sort(()=>Math.random()-0.5);
        marriageEvent=[shuffled[0],shuffled[1]];
      }
    }

    // Child check cada 10 días (NPC couples)
    if(gt.day%10===0){
      const couples=Object.entries(npcWorld).filter(([name,d])=>
        d.partner&&d.isAlive&&d.age>=24&&d.age<=42&&
        npcWorld[d.partner]?.isAlive&&npcWorld[d.partner]?.age<=46&&
        // No más de 2 hijos por pareja
        d.children.length<2
      );
      for(const [name,data] of couples){
        if(Math.random()<0.12){
          const cName=VELORIA_CHILD_NAMES[Math.floor(Math.random()*VELORIA_CHILD_NAMES.length)];
          childEvent={childName:cName,parent1:name,parent2:data.partner};
          break;
        }
      }
    }

    // ── Spouse household income ──
    if(family.romanticStatus==="married"&&family.partner&&NPC_JOBS[family.partner]){
      setMoney(m=>m+NPC_JOBS[family.partner].dailySalary);
    }
    // ── Daily reputation gain ──
    addRep(0.5);

    // ── Apply NPC world updates ──
    setNpcWorld(prev=>{
      const next={};
      for(const [name,data] of Object.entries(prev)){
        next[name]={
          ...data,
          // Envejecer: 0.5 años por día de juego
          age:data.isAlive?+(data.age+0.5).toFixed(1):data.age,
          // Cobrar sueldo
          luces:data.isAlive?data.luces+(NPC_JOBS[name]?.dailySalary||0):data.luces,
          // Muerte natural (edad > 80)
          isAlive:data.age<82?data.isAlive:Math.random()>0.15,
        };
      }
      if(marriageEvent){
        const[n1,n2]=marriageEvent;
        if(next[n1]&&next[n2]){
          next[n1]={...next[n1],partner:n2};
          next[n2]={...next[n2],partner:n1};
        }
      }
      if(childEvent){
        const{childName:cn,parent1:p1,parent2:p2}=childEvent;
        if(next[p1])next[p1]={...next[p1],children:[...next[p1].children,{name:cn,birthDay:gt.day}]};
        if(next[p2])next[p2]={...next[p2],children:[...next[p2].children,{name:cn,birthDay:gt.day}]};
      }
      return next;
    });

    // ── Narrativa de eventos del mundo ──
    if(marriageEvent){
      const[n1,n2]=marriageEvent;
      setTimeout(()=>addEntry({
        text:`${n1} y ${n2.split(" ")[0]} se casaron hoy en Veloria. La noticia se corrió antes del mediodía.`,
        type:"world_event",place:"Veloria",time:"12:00"
      }),200);
    }
    if(childEvent){
      const{childName:cn,parent1:p1,parent2:p2}=childEvent;
      setTimeout(()=>addEntry({
        text:`${p1.split(" ")[0]} y ${p2.split(" ")[0]} tuvieron un hijo/a. Le pusieron ${cn}.`,
        type:"world_event",place:"Veloria",time:"09:00"
      }),500);
    }
  },[gt.day]);

  // ── Season change detection ──────────────────────────
  const prevSeasonRef=useRef(-1);
  useEffect(()=>{
    if(phase!=="playing")return;
    const seasonIdx=Math.floor(gt.monthIdx/3);
    if(seasonIdx===prevSeasonRef.current)return;
    prevSeasonRef.current=seasonIdx;
    const s=SEASON_DATA[seasonIdx];if(!s)return;
    setTimeout(()=>{
      addEntry({text:s.arrival,type:"world_event",place:"Veloria",time:"08:00"});
      if(s.specialEvent==="velorfesta"){
        setTimeout(()=>{
          addEntry({text:"✦ La Velorfesta empieza en tres días. La Plaza del Veloer se llena de luces.",type:"world_event",place:"Plaza del Veloer",time:"10:00"});
          setChainActions(prev=>[...prev,{id:"velorfesta",emoji:"🎉",label:"Ir a la Velorfesta",hint:"La celebración más grande de Veloria. Solo estos días.",requiredPlace:null,expiresDay:gt.day+3,action:{id:"velorfesta",label:"Celebrar la Velorfesta",emoji:"🎉",time:3}}]);
        },600);
      }
      if(s.specialEvent==="nocturnos")setTimeout(()=>addEntry({text:"Los Nocturnos empezaron. En invierno, Veloria se reúne adentro. Las casas se abren más.",type:"world_event",place:"Veloria",time:"19:00"}),600);
      if(s.specialEvent==="cosecha")setTimeout(()=>addEntry({text:"La Cosecha Veleta llegó. El Mercado del Casco se llena de frutas que no existen el resto del año.",type:"world_event",place:"Los Prados",time:"09:00"}),600);
      addChapter(`${s.emoji} ${s.label} llegó a Veloria. ${s.flavor}`,"season");
    },300);
  },[gt.monthIdx]);

  function handleChoiceSelect(option,choiceCtx){
    const npc=choiceCtx?.npc;
    setPendingChoice(null);
    const fx=option.effects||{};
    const nKey=fx.narrative||`choice:${option.id}`;
    const texts=N_NPC[nKey]||N[nKey];
    if(texts){
      const text=texts[Math.floor(Math.random()*texts.length)];
      setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,text,type:"story",place:loc.place,time:toTimeStr(gt.hour)}]);
    }
    if(fx.need)setNeeds(n=>({...n,[fx.need]:Math.min(100,n[fx.need]+(fx.val||0))}));
    if(fx.need2)setNeeds(n=>({...n,[fx.need2]:Math.min(100,n[fx.need2]+(fx.val2||0))}));
    if(fx.need3)setNeeds(n=>({...n,[fx.need3]:Math.min(100,n[fx.need3]+(fx.val3||0))}));
    if(fx.skill&&fx.xp)setSkills(s=>({...s,[fx.skill]:(s[fx.skill]||0)+fx.xp}));
    if(fx.skill2&&fx.xp2)setSkills(s=>({...s,[fx.skill2]:(s[fx.skill2]||0)+fx.xp2}));
    if(typeof fx.money==="number")setMoney(m=>m+fx.money);
    if(fx.fr&&npc){
      setRels(prev=>({...prev,[npc]:{...prev[npc],friendship:Math.min(100,(prev[npc]?.friendship||0)+fx.fr),history:[...(prev[npc]?.history||[]).slice(-4),`Respondiste a su pregunta`]}}));
    }
    if(fx.chainUnlock&&CHAIN_ACTIONS[fx.chainUnlock]){
      setChainActions(prev=>prev.find(c=>c.id===fx.chainUnlock)?prev:[...prev,{...CHAIN_ACTIONS[fx.chainUnlock],id:fx.chainUnlock,expiresDay:gt.day+3}]);
    }
  }

  // ── SHOP BUY ──────────────────────────────────────
  function handleShopBuy(item){
    if(money<item.price)return;
    setMoney(m=>m-item.price);
    const fx=item.effects||{};
    if(fx.need)setNeeds(n=>({...n,[fx.need]:Math.min(100,n[fx.need]+(fx.val||0))}));
    if(fx.need2)setNeeds(n=>({...n,[fx.need2]:Math.min(100,n[fx.need2]+(fx.val2||0))}));
    if(fx.need3)setNeeds(n=>({...n,[fx.need3]:Math.min(100,n[fx.need3]+(fx.val3||0))}));
    if(fx.skill&&fx.xp)setSkills(s=>({...s,[fx.skill]:(s[fx.skill]||0)+fx.xp}));
    if(fx.chainUnlock&&CHAIN_ACTIONS[fx.chainUnlock]){
      setChainActions(prev=>prev.find(c=>c.id===fx.chainUnlock)?prev:[...prev,{...CHAIN_ACTIONS[fx.chainUnlock],id:fx.chainUnlock,expiresDay:gt.day+3}]);
    }
    const nKey=`shop:${item.id}`;
    const texts=N[nKey]||N["shop:buy"];
    const text=texts[Math.floor(Math.random()*texts.length)];
    setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,text,type:"story",place:loc.place,time:toTimeStr(gt.hour)}]);
    tick(0.5);
  }

  // ── CHAIN ACTION ──────────────────────────────────
  function handleChainAction(chainId){
    const ca=CHAIN_ACTIONS[chainId];
    if(!ca)return;
    setChainActions(prev=>prev.filter(c=>c.id!==chainId));
    const fx=ca.effects||{};
    if(fx.need)setNeeds(n=>({...n,[fx.need]:Math.min(100,n[fx.need]+(fx.val||0))}));
    if(fx.need2)setNeeds(n=>({...n,[fx.need2]:Math.min(100,n[fx.need2]+(fx.val2||0))}));
    if(fx.skill&&fx.xp)setSkills(s=>({...s,[fx.skill]:(s[fx.skill]||0)+fx.xp}));
    const texts=N[ca.narrative]||["Lo hacés. Algo cambia, un poco."];
    const text=texts[Math.floor(Math.random()*texts.length)];
    setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,text,type:"story",place:loc.place,time:toTimeStr(gt.hour)}]);
    tick(ca.action?.time||1);
  }

  function handleDialogueResponse(opt){
    const ev=pendingNPCDialogue;
    setPendingNPCDialogue(null);
    if(!ev)return;
    // Apply friendship delta
    if(opt.fr&&ev.npc){
      setRels(prev=>({...prev,[ev.npc]:{...prev[ev.npc],
        friendship:clamp((prev[ev.npc]?.friendship||0)+opt.fr),
        history:[...(prev[ev.npc]?.history||[]).slice(-4),`Respondiste a su mensaje`]
      }}));
    }
    // Apply skill XP if any
    if(opt.xp)applySkillXP(opt.xp);
    // Add narrative entry
    const text=getNarrative(opt.nKey||"default",{NPC:ev.npc?.split(" ")[0]||""});
    setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,text,type:"story",place:loc.place,time:toTimeStr(gt.hour+0.5)}]);
    tick(0.5,{social:10,diversion:8});
    // Navigate if option includes it
    if(opt.navigate)handleGoTo(opt.navigate.hood,opt.navigate.place);
  }

  // ── Milestone checker ──
  useEffect(()=>{
    if(phase!=="playing"||!twin)return;
    const asp=ASPIRATIONS.find(a=>a.id===twin.aspiration);
    if(!asp)return;
    const state={rels,family,skills,career,money,housing,day:gt.day,usedOnce,visitedPlaces};
    const newCompleted=[...aspirationProgress];
    for(let i=newCompleted.length;i<asp.milestones.length;i++){
      if(asp.milestones[i].check(state)){
        newCompleted.push(asp.milestones[i].id);
        setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,
          text:`✦ Objetivo cumplido: *${asp.milestones[i].label}*.${i===asp.milestones.length-1?" Completaste tu aspiración de "+asp.label+". Veloria te recordará.":""}`,
          type:"intro"}]);
      } else break;
    }
    if(newCompleted.length!==aspirationProgress.length)setAspirationProgress(newCompleted);
  },[rels,family,skills,career,money,housing,gt.day,usedOnce,visitedPlaces]);
  function applySkillXP(gains){
    const daysLived=PLAYER_START_DAYS+(gt.day-1);
    const stage=getLifeStage(daysLived);
    const housingEff=getHousingEffects(housing,placedFurniture);
    const hour=((gt.hour%24)+24)%24;
    const isNight=hour>=21||hour<6;
    const season=getSeasonData(gt.monthIdx);
    const moodMult=mood>=80?1.1:mood<25?0.9:1.0;
    const adjusted={};
    for(const[skill,xp]of Object.entries(gains)){
      let mult=stage.skillMult*moodMult;
      if(housingEff.skillBonus[skill])mult*=housingEff.skillBonus[skill];
      if(season.skillBonus?.[skill])mult*=season.skillBonus[skill];
      for(const tid of(twin?.traits||[])){
        const t=TRAITS.find(x=>x.id===tid);
        if(t?.bonus?.skillMult?.[skill])mult*=t.bonus.skillMult[skill];
        if(t?.bonus?.nightXPMult&&isNight)mult*=t.bonus.nightXPMult;
      }
      adjusted[skill]=Math.max(1,Math.round(xp*mult));
    }
    const{next,levelUps}=computeSkillXP(skills,adjusted);
    setSkills(next);
    levelUps.forEach(({skill,level})=>{
      setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,
        text:`✦ ¡Habilidad mejorada! Tu ${SKILLS_CFG[skill].label} llegó a ${SKILL_LEVELS[level].label} (${SKILL_LEVELS[level].roman}).`,
        type:"skill_up"}]);
      if(level>=3)addChapter(`${SKILLS_CFG[skill]?.emoji||"⭐"} Nivel ${SKILL_LEVELS[level].label} en ${SKILLS_CFG[skill].label}.`,"milestone");
    });
  }
  useEffect(()=>{
    if(phase==="playing"&&log.length>0&&log.length%5===0){
      const data=buildSave(twin,needs,money,gt,loc,rels,career,family,inventory,log,skills,housing,placedFurniture);
      try{localStorage.setItem(AUTO_KEY,JSON.stringify(data));}catch{}
    }
  },[log.length]);

  function saveToSlot(slot){
    try{const data={...buildSave(twin,needs,money,gt,loc,rels,career,family,inventory,log,skills,housing,placedFurniture),npcWorld,visitLog,shownEventDays,chainActions,reputation,mood,lifeChapters};localStorage.setItem(SAVE_KEY+slot,JSON.stringify(data));}catch{}
  }
  function loadFromSlot(slot){
    const data=slot==="auto"?(()=>{try{const r=localStorage.getItem(AUTO_KEY);return r?JSON.parse(r):null;}catch{return null;}})():readSlot(slot);
    if(!data)return;
    if(data.twin)setTwin(data.twin);
    if(data.needs)setNeeds(data.needs);
    if(data.money!=null)setMoney(data.money);
    if(data.gt)setGt(data.gt);
    if(data.loc)setLoc(data.loc);
    if(data.rels)setRels(data.rels);
    setCareer(data.career||null);
    if(data.family)setFamily(data.family);
    if(data.inventory)setInventory(data.inventory);
    if(data.log)setLog(data.log);
    if(data.skills)setSkills(data.skills);else setSkills({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
    if(data.housing)setHousing(data.housing);
    if(data.placedFurniture)setPlacedFurniture(data.placedFurniture);
    if(data.npcWorld)setNpcWorld(data.npcWorld);
    if(data.visitLog)setVisitLog(data.visitLog);
    if(data.shownEventDays)setShownEventDays(data.shownEventDays);
    if(data.chainActions)setChainActions(data.chainActions);
    if(data.reputation!=null)setReputation(data.reputation);
    if(data.mood!=null)setMood(data.mood);
    if(data.lifeChapters)setLifeChapters(data.lifeChapters);
    setPhase("playing");setShowPausa(false);
  }
  function resetGame(){
    setPhase("creation");setTwin(null);
    setNeeds({hambre:75,sueno:80,higiene:80,social:50,diversion:55,vejiga:70});
    setMoney(250);setGt({hour:8,day:1,monthIdx:0});
    setLoc({hood:"La Vega",place:"Tu apartamento"});
    setRels({});setCareer(null);
    setSkills({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
    setHousing("apto_basico");setPlacedFurniture([]);setUsedOnce(new Set());
    setFamily({partner:null,romanticStatus:null,children:[]});
    setNpcWorld(JSON.parse(JSON.stringify(NPC_STARTING_DATA)));
    setVisitLog({});setShownEventDays([]);setChainActions([]);
    setInventory([{id:1,name:"Té Miren",type:"food",emoji:"🍵",qty:2,desc:"Una taza.",useable:true},{id:2,name:"Pan Velin",type:"food",emoji:"🥐",qty:1,desc:"Pan de Veloria.",useable:true}]);
    setLog([]);setShowPausa(false);lastAgeMilestone.current=0;lastEventDay.current=0;
  }

  const addEntry=e=>setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,...e}]);
  const addRep=(delta)=>setReputation(r=>Math.min(100,r+delta));
  const addMood=(delta)=>setMood(m=>Math.min(100,Math.max(0,m+delta)));
  const addChapter=(text,type="milestone")=>setLifeChapters(prev=>[...prev,{day:gt.day,text,type,monthIdx:gt.monthIdx}]);
  const prevRepTier=useRef(0);
  useEffect(()=>{
    const tier=REPUTATION_LEVELS.filter(l=>reputation>=l.min).length;
    if(tier>prevRepTier.current&&reputation>0){
      prevRepTier.current=tier;
      const lv=REPUTATION_LEVELS[tier-1];
      if(lv)setTimeout(()=>addEntry({text:`✦ ${lv.label} — ${lv.desc}`,type:"world_event",place:"Veloria",time:toTimeStr(gt.hour)}),300);
    }
  },[reputation]);
  const tick=(hours,changes={})=>{
    const daysLived=PLAYER_START_DAYS+(gt.day-1);
    const dm=getLifeStage(daysLived).decayMult;
    const hb=getHousingEffects(housing,placedFurniture).needBonus;
    const season=getSeasonData(gt.monthIdx);
    const sdm=season.needDecayMod||{};
    const b=(need,ch)=>clamp((ch||0)+(ch>0?hb[need]||0:0));
    setNeeds(prev=>({
      hambre:   clamp(prev.hambre   -hours*4*dm*(sdm.hambre||1)  +b("hambre",   changes.hambre)),
      sueno:    clamp(prev.sueno    -hours*3*dm*(sdm.sueno||1)   +b("sueno",    changes.sueno)),
      higiene:  clamp(prev.higiene  -hours*1.5*dm                +b("higiene",  changes.higiene)),
      social:   clamp(prev.social   -hours*2*dm*(sdm.social||1)  +b("social",   changes.social)),
      diversion:clamp(prev.diversion-hours*2.5*dm*(sdm.diversion||1)+b("diversion",changes.diversion)),
      vejiga:   clamp(prev.vejiga   -hours*8*dm                  +(changes.vejiga||0)),
    }));
    // Mood drifts toward need average
    setMood(m=>{
      const needAvg=Object.values({...changes}).filter(v=>typeof v==="number"&&v>0).length>0?
        (needs.hambre+needs.sueno+needs.social+needs.diversion)/4:
        (needs.hambre+needs.sueno+needs.social+needs.diversion)/4;
      const target=Math.max(10,Math.min(90,needAvg));
      return Math.max(0,Math.min(100,m+(target-m)*0.05*hours));
    });
    setGt(prev=>{const total=prev.hour+hours,daysG=Math.floor(total/24),newDay=prev.day+daysG;return{hour:total%24,day:newDay,monthIdx:clamp(prev.monthIdx+Math.floor(newDay/30)-Math.floor(prev.day/30),0,11)};});
  };
  const addInvItem=(item)=>setInventory(prev=>{const ex=prev.find(i=>i.name===item.name);if(ex)return prev.map(i=>i.name===item.name?{...i,qty:i.qty+1}:i);return[...prev,{id:Date.now(),...item,qty:1}];});

  function handleUpgradeHousing(tierId){
    const tier=HOUSING_TIERS.find(h=>h.id===tierId);if(!tier||money<tier.price)return;
    setMoney(m=>m-tier.price);setHousing(tierId);
    addEntry({text:getNarrative("housing:upgrade"),type:"story",place:"Tu apartamento"});
  }
  function handleBuyFurniture(fId){
    const f=FURNITURE_ITEMS[fId];if(!f||money<f.price)return;
    const tier=HOUSING_TIERS.find(h=>h.id===housing)||HOUSING_TIERS[0];
    if(placedFurniture.length>=tier.slots)return;
    setMoney(m=>m-f.price);
    setPlacedFurniture(prev=>[...prev,fId]);
    addEntry({text:getNarrative("housing:furniture"),type:"story",place:"Tu apartamento"});
  }
  async function handleSkillUnlockAction(action){
    if(loading)return;
    setLoading(true);await sleep(400);
    const text=getNarrative(action.nKey)||getNarrative("default");
    tick(action.time||1,{diversion:15,social:8});
    if(action.moneyGain)setMoney(m=>m+action.moneyGain);
    if(action.once)setUsedOnce(prev=>new Set([...prev,action.id]));
    if(ACTION_SKILL_XP[action.id])applySkillXP(ACTION_SKILL_XP[action.id]);
    addEntry({text,type:"story",place:loc.place,time:toTimeStr(gt.hour+(action.time||1))});
    setLoading(false);
  }

  function handleContinueAsChild(child){
    setShowLegacy(false);
    const childTraits=child.traits||["curioso","libre","empático"];
    const parentName=child.parentName||twin?.name;
    const parentColor=child.parentColor||"#F5A623";
    const parentRep=child.parentRep||reputation||0;
    const parentRels=child.parentRels||rels;
    // Child inherits twin's color + parent info
    setTwin({name:child.name,traits:childTraits,aspiration:"familia",
      color:parentColor,parentName,
      llegada:"buscando", // child comes to Veloria looking for their parent's world
    });
    setNeeds({hambre:80,sueno:80,higiene:80,social:60,diversion:60,vejiga:80});
    setMoney(Math.floor(money*0.3));
    setMood(65);
    setLifeChapters([]);
    // Inherit some reputation from parent
    setReputation(Math.floor(parentRep*0.3));
    setGt({hour:8,day:1,monthIdx:0});
    setLoc({hood:"La Vega",place:"Tu apartamento"});
    setCareer(null);setFamily({partner:null,romanticStatus:null,children:[]});
    // Inherit friendships from parent (at 30% of original)
    const inheritedRels={};
    Object.entries(parentRels).forEach(([npc,data])=>{
      if((data.friendship||0)>=50){
        inheritedRels[npc]={friendship:Math.floor((data.friendship||0)*0.3),history:[`${parentName} y ${npc.split(" ")[0]} se conocían bien.`]};
      }
    });
    setRels(inheritedRels);
    setSkills({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
    const parentLine=parentName?`\n\nAlgunos en Veloria conocen ese apellido. Conocían a ${parentName}.`:"";
    setLog([{id:Date.now(),day:1,text:`La historia continúa.\n\n${child.name} abre los ojos en el apartamento de La Vega — el mismo de siempre, pero visto por primera vez.${parentLine}`,type:"intro",place:"Tu apartamento",time:"08:00"}]);
    lastAgeMilestone.current=0;lastEventDay.current=0;
  }

  async function handleStart(twinData){
    const orig=twinData._origin;
    const conn=twinData._connection;
    const ll=twinData._llegada;
    // Apply origin skill bonuses
    const initSkills={pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0};
    if(orig?.bonus?.skills){for(const[sk,xp]of Object.entries(orig.bonus.skills))initSkills[sk]=(initSkills[sk]||0)+xp;}
    // Apply llegada bonus skill
    if(ll?.bonusSkill&&ll?.bonusVal)initSkills[ll.bonusSkill]=(initSkills[ll.bonusSkill]||0)+ll.bonusVal;
    setSkills(initSkills);
    // Apply origin + first connection friendship
    const initRels={};
    if(orig?.bonus?.friendship){for(const[npc,fr]of Object.entries(orig.bonus.friendship))initRels[npc]={friendship:fr,history:["Se conocen del barrio de origen"]};}
    if(conn){initRels[conn]={...(initRels[conn]||{}),friendship:Math.max(initRels[conn]?.friendship||0,25),history:["Primera conexión en Veloria"]};}
    setRels(initRels);
    // Starting inventory
    const startInv=[{id:1,name:"Té Miren",type:"food",emoji:"🍵",qty:2,desc:"Una taza.",useable:true},{id:2,name:"Pan Velin",type:"food",emoji:"🥐",qty:1,desc:"Pan de Veloria.",useable:true}];
    if(orig?.bonus?.item){startInv.push({id:Date.now(),...orig.bonus.item});}
    setInventory(startInv);
    setTwin({...twinData});
    setPhase("playing");setLoading(true);
    await sleep(500);
    const connLine=conn?`\n\nEn el café de abajo, ${conn.split(" ")[0]} ya sabe tu nombre.`:"";
    // Use llegada narrative if available, else aspiration
    const llegadaKey=ll?`intro:llegada_${ll.id}`:null;
    const txt=(llegadaKey&&getNarrative(llegadaKey))||getNarrative(`intro:${twinData.aspiration}`)||`El apartamento en La Vega es exactamente lo que esperabas y también algo más.`;
    addEntry({text:txt+connLine,type:"intro",place:"Tu apartamento",time:"08:00"});
    setLoading(false);
  }
  function handleChoiceSelect(opt){
    setPendingChoice(null);
    let entries=[];
    // Apply needs
    if(opt.needs) setNeeds(n=>{const u={...n};Object.entries(opt.needs).forEach(([k,v])=>{u[k]=Math.min(100,(u[k]||0)+v);});return u;});
    // Apply money
    if(opt.moneyDelta) setMoney(m=>Math.max(0,m+(opt.moneyDelta||0)));
    // Apply skillXP
    if(opt.skillXP) setSkills(sk=>{const u={...sk};Object.entries(opt.skillXP).forEach(([k,v])=>{u[k]=(u[k]||0)+v;});return u;});
    // Apply friendship
    if(opt.fr&&opt.npc) setRels(r=>({...r,[opt.npc]:{...(r[opt.npc]||{friendship:0}),friendship:Math.min(100,(r[opt.npc]?.friendship||0)+opt.fr),history:[...(r[opt.npc]?.history||[]),`Conversación: ${opt.label}`]}}));
    // Add item to inventory
    if(opt.addItem) setInventory(inv=>[...inv,{...opt.addItem,id:`item_${Date.now()}`}]);
    // Narrative
    const nKey=opt.nKey;
    if(nKey&&N[nKey]){
      const arr=N[nKey];
      const text=arr[Math.floor(Math.random()*arr.length)];
      const entry={id:Date.now(),type:"story",text,time:toTimeStr(gtRef.current?.hour||8),place:""};
      setLog(l=>[...l,entry]);
    }
  }

  function handleShopBuy(item){
    // Deduct money
    setMoney(m=>Math.max(0,m-item.price));
    // Apply needs effects
    if(item.effect) setNeeds(n=>{const u={...n};Object.entries(item.effect).forEach(([k,v])=>{u[k]=Math.min(100,(u[k]||0)+v);});return u;});
    // Apply skill XP
    if(item.skillXP) setSkills(sk=>{const u={...sk};Object.entries(item.skillXP).forEach(([k,v])=>{u[k]=(u[k]||0)+v;});return u;});
    // Add to inventory if it's a keepable item
    if(["item","rare","tool","ingredient"].includes(item.type)){
      setInventory(inv=>{const existing=inv.find(i=>i.id===item.id);if(existing){return inv.map(i=>i.id===item.id?{...i,qty:(i.qty||1)+1}:i);}return[...inv,{...item,id:item.id,qty:item.qty||1,useable:!!item.useable}];});
    }
    // Narrative
    const nKey=item.nKey||(item.type==="book"?"shop:book":item.type==="food"||item.type==="drink"?"shop:food":"shop:buy");
    if(N[nKey]){
      const arr=N[nKey];
      const text=arr[Math.floor(Math.random()*arr.length)];
      setLog(l=>[...l,{id:Date.now()+Math.random(),type:"story",text,time:toTimeStr(gtRef.current?.hour||8),place:loc.place}]);
    }
  }

  async function handleAction(action){
    if(loading)return;
    if(money<(action.cost||0)){addEntry({text:`No tenés suficientes Luces (necesitás L${action.cost}).`,type:"system"});return;}

    // ── Shop intercept ──
    const shopId=SHOP_TRIGGERS[action.id];
    if(shopId&&SHOPS[shopId]){setActiveShop(SHOPS[shopId]);return;}

    // ── Chain action intercept ──
    if(action.id?.startsWith("chain_")){
      handleChainAction(action.id);return;
    }

    setLoading(true);await sleep(350+Math.random()*200);

    // ── Choice event intercept (after time passes) ──
    const choiceFn=CHOICE_EVENTS[action.id];
    if(choiceFn){
      const h=action.id==="watch_show"?Math.floor(gt.hour+2.5):gt.hour;
      tick(action.time||1);
      setLoading(false);
      setPendingChoice(choiceFn({skills,needs,twin,gt,rels,family}));
      return;
    }

    // ── NPC chat: check for dialogue first ──
    if(action.id==="chat_npc"&&action.npc){
      // Track visit
      const npcKey=action.npc;
      const prevVisits=visitLog[npcKey]||[];
      const visitCount=prevVisits.length+1;
      const daysSinceLast=prevVisits.length>0?gt.day-prevVisits[prevVisits.length-1]:null;
      setVisitLog(prev=>({...prev,[npcKey]:[...prevVisits,gt.day]}));

      // Check NPC memory
      const mem=NPC_MEMORY[npcKey];
      let memoryLine=null;
      if(mem){
        // Absence comment (only if they've visited before)
        if(daysSinceLast!==null&&daysSinceLast>=3){
          const absEntry=mem.absence?.slice().reverse().find(a=>daysSinceLast>=a.days);
          if(absEntry)memoryLine=absEntry.says;
        }
        // Visit milestone (exact match)
        if(!memoryLine){
          const visitEntry=mem.visit?.find(v=>v.count===visitCount);
          if(visitEntry)memoryLine=visitEntry.says;
        }
      }

      const dialogues=NPC_DIALOGUES[action.npc];
      if(dialogues){
        const fr=rels[action.npc]?.friendship||0;
        const eligible=dialogues.filter(d=>fr>=(d.minFr||0));
        if(eligible.length>0){
          const dlg=eligible[Math.floor(Math.random()*eligible.length)];
          const npcSays=memoryLine?`${memoryLine} — ${dlg.npcSays}`:dlg.npcSays;
          tick(action.time||0.5,{social:5});
          setLoading(false);
          setPendingChoice({speaker:{name:action.npc,says:npcSays},npc:action.npc,options:dlg.options});
          return;
        }
      }
      // If NPC has memory but no dialogue, show memory as standalone
      if(memoryLine){
        tick(action.time||0.5,{social:8});
        addEntry({text:`${action.npc.split(" ")[0]} dice: "${memoryLine}"`,type:"story",place:loc.place,time:toTimeStr(gt.hour)});
        setLoading(false);
        return;
      }
      const npcChoice=NPC_CHAT_CHOICES[action.npc];
      if(npcChoice){
        tick(action.time||0.5,{social:8});
        setPendingChoice({...npcChoice,npc:action.npc,options:npcChoice.options.map(o=>({...o,npc:action.npc}))});
        setLoading(false);return;
      }
      // Generic NPC fallback
      const fr=rels[action.npc]?.friendship||0,level=fr<30?"low":fr<65?"mid":"high";
      const key=`npc:${action.npc}:${level}`,gain=Math.floor(Math.random()*6)+7;
      tick(action.time,{social:10,diversion:8});
      setRels(prev=>({...prev,[action.npc]:{friendship:clamp((prev[action.npc]?.friendship||0)+gain),history:[...(prev[action.npc]?.history||[]).slice(-4),`Charlaron en ${loc.place}`]}}));
      applySkillXP({carisma:8});
      addEntry({text:getNarrative(N[key]?key:`npc:default:${level}`,{NPC:action.npc.split(" ")[0]}),type:"story",place:loc.place,time:toTimeStr(gt.hour+action.time)});
    } else {
      tick(action.time||0.5,BASE_EFFECTS[action.id]||{});
      if(action.cost)setMoney(m=>m-action.cost);
      if(action.id==="cook")addInvItem({name:"Comida casera",type:"food",emoji:"🍲",desc:"Cocinado en casa con especias de Veloria.",useable:true});
      if(action.id==="buy_book")addInvItem({name:"Libro de Veloria",type:"book",emoji:"📖",desc:"Una historia del mundo de Otherwhen.",useable:false});
      if(action.id==="fish")addInvItem({name:"Mirenpez fresco",type:"fish",emoji:"🐟",desc:"Pescado esta mañana en el Lago Miren.",useable:false});
      if(action.id==="tienda_basicos")addInvItem({name:"Provisiones",type:"food",emoji:"🛒",desc:"Lo necesario de la tienda de La Vega.",useable:true});
      if(action.id==="pan_comprar"||action.id==="pan_desayuno")addInvItem({name:"Pan Velin",type:"food",emoji:"🥐",desc:"Recién horneado en la Panadería Velin.",useable:true});
      if(action.id==="merc_unico")addInvItem({name:"Objeto del Mercadillo",type:"other",emoji:"🛍",desc:"Algo único de La Vega. No sabés bien para qué sirve.",useable:false});
      if(action.id==="jardin_cosechar")addInvItem({name:"Cosecha del jardín",type:"food",emoji:"🥬",desc:"Cultivado en el Jardín Comunitario de La Vega.",useable:true});
      if(ACTION_SKILL_XP[action.id])applySkillXP(ACTION_SKILL_XP[action.id]);
      else if(ACTION_SKILL_XP_EXTRA[action.id])applySkillXP(ACTION_SKILL_XP_EXTRA[action.id]);
      // Narrative key map for new La Vega actions
      const NK_MAP={terr_amanecer:"terr:amanecer",terr_escribir:"terr:escribir",terr_estrellas:"terr:estrellas",terr_huerto:"terr:huerto",
        tienda_basicos:"tienda:basicos",tienda_ropa:"tienda:ropa",tienda_charlar:"tienda:charlar",
        jardin_plantar:"jardin:plantar",jardin_cosechar:"jardin:cosechar",jardin_pasear:"jardin:pasear",
        pan_comprar:"pan:comprar",pan_desayuno:"pan:desayuno",pan_ver_hacer:"pan:ver_hacer",
        estudio_pintar:"estudio:pintar",estudio_ver:"estudio:ver",estudio_conocer:"estudio:conocer",estudio_tecnica:"estudio:tecnica",
        bar_lumaven:"bar:lumaven",bar_musica:"bar:musica",bar_conocer:"bar:conocer",bar_mirone:"bar:mirone",
        merc_unico:"merc:unico",merc_frescos:"merc:frescos",merc_charlar:"merc:charlar",
        gym_entrenar:"gym:entrenar",gym_natacion:"gym:natacion"};
      const nKey=NK_MAP[action.id]||action.id;
      const stateText=getStateNarrative(action.id,{skills,needs,gt});
      let entryText=stateText||getNarrative(nKey)||getNarrative("default");
      // Mood suffix — only on creative/nature/social actions and when mood is extreme
      const moodMod=getMoodLevel(mood).mod;
      if((moodMod==="great"||moodMod==="verylow")&&Math.random()<0.35){
        const suffixArr=N_MOOD_SUFFIX[moodMod]||[];
        if(suffixArr.length)entryText+="\n\n"+pick(suffixArr);
      }
      addEntry({text:entryText,type:"story",place:loc.place,time:toTimeStr(gt.hour+(action.time||0.5))});
      // Mood changes per action type
      const moodDeltas={fish:5,cook:4,walk_park:4,sit_lake:6,musica_tocar:6,estudio_ver:4,azotea2_estrellas:5,dormir:-2,ducharse:3,research:3};
      const md=moodDeltas[action.id];if(md)addMood(md);

      // ── Choice trigger: fire post-action choice ──
      const choiceFn=ACTION_CHOICE_TRIGGERS[action.id];
      if(choiceFn){
        const ev=choiceFn({skills,rels,money,loc,gt,usedOnce});
        if(ev) setTimeout(()=>setPendingChoice(ev),600);
      }
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

  async function handleInteraction(interactionId,npcName){
    if(loading)return;
    const intr=INTERACTIONS.find(i=>i.id===interactionId);if(!intr)return;
    setLoading(true);await sleep(300+Math.random()*200);
    let key=`int:${interactionId}`,delta=intr.delta;
    const fr=rels[npcName]?.friendship||0;
    if(interactionId==="chiste"){const ok=Math.random()>0.35;key=ok?"int:chiste_ok":"int:chiste_fail";delta=ok?8:-2;}
    else if(interactionId==="broma"){const ok=Math.random()>0.3;key=ok?"int:broma_ok":"int:broma_fail";delta=ok?6:-3;}
    else if(interactionId==="competir"){const win=Math.random()>0.5;key=win?"int:competir_win":"int:competir_lose";delta=3;}
    else if(interactionId==="confrontar"){const pos=fr>30&&Math.random()>0.4;delta=pos?8:-12;}
    else if(interactionId==="coquetear"){const ok=fr>40&&Math.random()>0.4;key=ok?"int:coquetear_ok":"int:coquetear_fail";delta=ok?6:0;}
    const text=getNarrative(N[key]?key:"int:charlar",{NPC:npcName.split(" ")[0]});
    if(delta!==null){
      setRels(prev=>({...prev,[npcName]:{...prev[npcName],friendship:clamp((prev[npcName]?.friendship||0)+delta),history:[...(prev[npcName]?.history||[]).slice(-4),`${intr.label} · ${loc.place}`]}}));
    }
    applySkillXP({carisma:5});
    tick(0.5,intr.effects||{});
    addEntry({text,type:"story",place:loc.place,time:toTimeStr(gt.hour+0.5)});
    setLoading(false);
  }

  async function handleChildInteract(childIdx,interactionId){
    if(loading)return;
    const child=family.children[childIdx];if(!child)return;
    setLoading(true);await sleep(350);
    const fx=CHILD_FX[interactionId]||{hap:5,rel:3};
    const text=getNarrative(`child:${interactionId}`,{CHILD:child.name})||getNarrative("default");
    setFamily(f=>({...f,children:f.children.map((c,i)=>i===childIdx?{...c,happiness:clamp((c.happiness??70)+fx.hap),relationship:clamp((c.relationship??50)+fx.rel)}:c)}));
    tick(0.5,{social:8,diversion:6});
    addEntry({text,type:"story",place:loc.place,time:toTimeStr(gt.hour+0.5)});
    setLoading(false);
  }

  async function handleRomanceAction(type,npcName){
    if(loading)return;
    if(type==="have_child"){initChildBirth();return;}
    setLoading(true);await sleep(400);
    const positive=type==="ask_out"||type==="propose"||type==="marry";
    tick(1,positive?{social:20,diversion:25}:{social:-25,diversion:-20});
    if(type==="ask_out")setFamily(f=>({...f,partner:npcName,romanticStatus:"dating"}));
    else if(type==="propose")setFamily(f=>({...f,romanticStatus:"engaged"}));
    else if(type==="marry"){setFamily(f=>({...f,romanticStatus:"married"}));addChapter(`💒 ${twin?.name} y ${npcName?.split(" ")[0]||"su pareja"} se casaron en Veloria.`,"love");addMood(20);}
    else if(type==="breakup"||type==="divorce"){setFamily(f=>({...f,partner:null,romanticStatus:null}));setRels(prev=>({...prev,[npcName]:{...prev[npcName],friendship:clamp((prev[npcName]?.friendship||0)-20)}}));}
    addEntry({text:getNarrative(`romance:${type}`,{NPC:npcName}),type:"romance",place:loc.place,time:toTimeStr(gt.hour+1)});
    setLoading(false);
  }
  async function handleHaveChild(){
    if(!namingChild)return;
    const {count,genders,names}=namingChild;
    if(names.some(n=>!n.trim()))return;
    setNamingChild(null);setLoading(true);await sleep(500);
    const GENDER_EMOJI={varón:"👦",mujer:"👧",elle:"🧒"};
    const newChildren=names.map((n,i)=>({name:n.trim(),gender:genders[i],birthDay:gt.day,emoji:GENDER_EMOJI[genders[i]]||"👶"}));
    setFamily(prev=>({...prev,children:[...(prev.children||[]),...newChildren]}));
    addRep(8);addMood(20);
    newChildren.forEach(c=>addChapter(`👶 Nació ${c.name} (${c.gender}). Día ${gt.day} en Veloria.`,"family"));
    const plural=count>1?(count===2?"Mellizos/as":"Trillizos/as"):"";
    const childList=newChildren.map(c=>`${GENDER_EMOJI[c.gender]} ${c.name} (${c.gender})`).join(", ");
    const txt=count>1?`${plural}. Nacieron ${childList}. Veloria recibió ${count} vidas nuevas al mismo tiempo.`:`${newChildren[0].name} llegó a Veloria. Un ${genders[0]}. Una vida nueva que empieza.`;
    addEntry({text:txt,type:"romance",place:"Tu apartamento",time:toTimeStr(gt.hour)});
    setLoading(false);
  }
  async function handleGoTo(hood,place){
    if(loading||(loc.hood===hood&&loc.place===place))return;
    setLoc({hood,place});
    setVisitedPlaces(prev=>{
      if(!prev.has(place))addRep(2); // rep por visitar lugar nuevo
      return new Set([...prev,place]);
    });
    setVisitLog(prev=>({...prev,[place]:[...(prev[place]||[]),gt.day]}));
    setLoading(true);await sleep(300);
    tick(loc.hood!==hood?0.5:0.2,{});
    addEntry({text:getNarrative(`travel:${place}`)||`Llegás a ${place}.`,type:"travel",place,time:toTimeStr(gt.hour+(loc.hood!==hood?0.5:0.2))});
    setLoading(false);
  }
  function handleUseItem(item){
    const fx=ITEM_USE_EFFECTS[item.id];
    if(!fx){
      // Fallback for food type
      if(item.type==="food"){tick(0,{hambre:35});setInventory(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));addEntry({text:`Comés ${item.name.toLowerCase()}. El hambre cede un poco.`,type:"story",place:loc.place});}
      return;
    }
    // Apply effects
    if(fx.need) setNeeds(n=>({...n,[fx.need]:Math.min(100,n[fx.need]+(fx.val||0))}));
    if(fx.need2)setNeeds(n=>({...n,[fx.need2]:Math.min(100,n[fx.need2]+(fx.val2||0))}));
    if(fx.skill&&fx.xp)setSkills(s=>({...s,[fx.skill]:(s[fx.skill]||0)+fx.xp}));
    if(fx.chainUnlock&&CHAIN_ACTIONS[fx.chainUnlock]){
      setChainActions(prev=>prev.find(c=>c.id===fx.chainUnlock)?prev:[...prev,{...CHAIN_ACTIONS[fx.chainUnlock],id:fx.chainUnlock,expiresDay:gt.day+3}]);
    }
    // Narrative
    const nKey=fx.narrative;
    const texts=nKey?(N_GIFTS[nKey]||N[nKey]):null;
    if(texts)addEntry({text:pick(texts),type:"story",place:loc.place,time:toTimeStr(gt.hour)});
    // Consume
    if(fx.consume)setInventory(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));
    addRep(1);
  }

  function handleGiftItem(item,npcName){
    setActiveGift(null);
    // Remove item
    setInventory(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));
    // Determine quality
    const prefs=NPC_GIFT_PREFS[npcName];
    let frDelta=5, repDelta=1, nKey="gift:neutral";
    if(prefs){
      if(prefs.loved?.includes(item.id)){frDelta=28;repDelta=4;nKey="gift:loved";}
      else if(prefs.liked?.includes(item.id)){frDelta=16;repDelta=2;nKey="gift:liked";}
    }
    // Check special combo
    const special=SPECIAL_GIFT_EFFECTS[`${npcName}:${item.id}`];
    if(special?.chainUnlock&&CHAIN_ACTIONS[special.chainUnlock]){
      setChainActions(prev=>prev.find(c=>c.id===special.chainUnlock)?prev:[...prev,{...CHAIN_ACTIONS[special.chainUnlock],id:special.chainUnlock,expiresDay:gt.day+3}]);
    }
    if(special?.repBonus)repDelta+=special.repBonus;
    // Update friendship
    setRels(prev=>({...prev,[npcName]:{...prev[npcName],friendship:Math.min(100,(prev[npcName]?.friendship||0)+frDelta)}}));
    addRep(repDelta);
    // Narrative — check specific combo key first
    const comboKey=`gift:${npcName.split(" ")[0].toLowerCase()}_${item.id}`;
    const texts=N_GIFTS[comboKey]||N_GIFTS[nKey];
    if(texts){
      const npcFirst=npcName.split(" ")[0];
      addEntry({text:`[Para ${npcFirst}] ${pick(texts)}`,type:"story",place:loc.place,time:toTimeStr(gt.hour)});
    }
  }

  const [showLoadModal,setShowLoadModal]=useState(false);
  if(phase==="splash")return<SplashScreen onEnter={(mode)=>{if(mode==="load")setShowLoadModal(true);else setPhase("creation");}}/>;
  if(phase==="creation")return<CreationScreen onStart={handleStart} onLoad={loadFromSlot} defaultShowLoad={showLoadModal}/>;

  const hoodColor=(NEIGHBORHOODS[loc.hood]||{}).color||"#F5A623";
  const currentDaysLived=PLAYER_START_DAYS+(gt.day-1);
  const lifeStage=getLifeStage(currentDaysLived);
  const {inStage:daysInCurrentStage,ofStage:daysInStageTotal}=getDaysInStage(currentDaysLived);
  const TABS=[{id:"acciones",label:"Acciones",emoji:"🎮"},{id:"social",label:"Social",emoji:"💬"},{id:"trabajo",label:"Trabajo",emoji:"💼"},{id:"hogar",label:"Hogar",emoji:"🏠"},{id:"mapa",label:"Mapa",emoji:"🗺"},{id:"diario",label:"Diario",emoji:"📖"}];
  const currentEvent=CALENDAR_EVENTS[gt.monthIdx];
  const npcsHere=(getNPCsAtPlace(loc.place,gt.hour)||[]).filter(n=>rels[n]);
  const skillUnlockActions=getSkillUnlockActions(skills,loc,placedFurniture,usedOnce);

  const isWide = typeof window !== 'undefined' && window.innerWidth >= 700;
  return(
    <div style={{display:"flex",justifyContent:"center",background:C.bg,minHeight:"100vh"}}>
    <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",maxWidth:isWide?"940px":"520px",background:C.bg,fontFamily:"'Fredoka',sans-serif",color:C.text,overflow:"hidden",position:"relative"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:#D4C4B0;border-radius:2px}button{font-family:'Fredoka',sans-serif}@keyframes fadeSlideIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {showPausa&&<PausaModal onClose={()=>setShowPausa(false)} onSave={saveToSlot} onLoad={loadFromSlot} onReset={resetGame} log={log} gt={gt} twin={twin}/>}
      {showLegacy&&<LegacyScreen twin={twin} gt={gt} skills={skills} rels={rels} family={family} children={family.children} onContinueAsChild={handleContinueAsChild} onNewGame={resetGame} lifeChapters={lifeChapters} reputation={reputation}/>}
      {pendingNPCDialogue&&<DialogueModal event={pendingNPCDialogue} onRespond={handleDialogueResponse}/>}
      {pendingChoice&&<ChoiceModal choice={pendingChoice} onSelect={(opt)=>handleChoiceSelect(opt,pendingChoice)} onDismiss={()=>setPendingChoice(null)}/>}
      {activeShop&&<ShopModal shop={activeShop} money={money} onBuy={handleShopBuy} onClose={()=>setActiveShop(null)}/>}
      {activeGift&&<GiftModal item={activeGift} knownNPCs={Object.keys(rels).filter(n=>(rels[n]?.friendship||0)>0)} onGift={handleGiftItem} onClose={()=>setActiveGift(null)}/>}
      {pendingChoice&&<ChoiceModal event={pendingChoice} onChoose={handleChoiceSelect}/>}
      {activeShop&&<ShopModal shop={activeShop} money={money} onBuy={handleShopBuy} onClose={()=>setActiveShop(null)}/>}
      {namingChild&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{...bento(C.white),padding:"28px",width:"320px",textAlign:"center"}}>
            <div style={{fontSize:40,marginBottom:"8px"}}>
              {namingChild.genders.map(g=>g==="varón"?"👦":g==="mujer"?"👧":"🧒").join("")}
            </div>
            <div style={{fontSize:"17px",color:C.orange,fontWeight:700,marginBottom:"4px",fontFamily:"'Fredoka',sans-serif"}}>
              {namingChild.count===1?"¡Un bebé llega a Veloria!":namingChild.count===2?"¡Mellizos/as!":"¡Trillizos/as!"}
            </div>
            <div style={{fontSize:"12px",color:C.textDim,marginBottom:"18px",fontFamily:"'Nunito',sans-serif"}}>
              {namingChild.genders.map((g,i)=>`Bebé ${i+1}: ${g}`).join(" · ")}
            </div>
            {namingChild.names.map((n,i)=>(
              <div key={i} style={{marginBottom:"10px",textAlign:"left"}}>
                <div style={{fontSize:"10px",color:C.textDim,fontFamily:"'Nunito',sans-serif",marginBottom:"4px"}}>
                  {namingChild.count>1?`${namingChild.genders[i]==="varón"?"👦":namingChild.genders[i]==="mujer"?"👧":"🧒"} Bebé ${i+1}`:""} Nombre
                </div>
                <input value={n}
                  onChange={e=>{const nn=[...namingChild.names];nn[i]=e.target.value;setNamingChild({...namingChild,names:nn});}}
                  placeholder="Nombre en Veloria..."
                  style={{width:"100%",padding:"9px 13px",background:C.cardWarm,border:`1px solid ${C.border}`,borderRadius:"10px",color:C.text,fontSize:"15px",fontFamily:"'Lora',serif",outline:"none"}}
                />
              </div>
            ))}
            <div style={{display:"flex",gap:"8px",marginTop:"8px"}}>
              <button onClick={()=>setNamingChild(null)} style={{flex:1,padding:"8px",borderRadius:"10px",border:`1px solid ${C.border}`,background:"transparent",color:C.textDim,cursor:"pointer",fontFamily:"'Fredoka',sans-serif"}}>Cancelar</button>
              <button onClick={handleHaveChild} disabled={namingChild.names.some(n=>!n.trim())} style={{flex:1,padding:"8px",borderRadius:"10px",border:"none",background:C.orange,color:C.white,cursor:"pointer",fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>✦ Confirmar</button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER BENTO */}
      <div style={{background:C.white,borderBottom:`1px solid ${C.border}`,padding:"0 14px",height:"46px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
        <div style={{display:"flex",alignItems:"center",gap:"7px"}}>
          <img src="/icon.png" alt="" style={{height:"26px",width:"26px",borderRadius:"7px",objectFit:"cover"}}/>
          <span style={{fontSize:"17px",fontWeight:700,color:C.orange}}>inbetweens</span>
        </div>
        <div style={{padding:"4px 12px",borderRadius:"14px",background:C.cardOrange,border:`1px solid ${C.border}`,fontSize:"11px",color:C.textMid,fontWeight:500,fontFamily:"'Nunito',sans-serif"}}>
          {gt.hour>=21||gt.hour<6?"🌙":"☀️"} {toTimeStr(gt.hour)} · Día {gt.day} · {MONTHS[gt.monthIdx]}
        </div>
        <div style={{display:"flex",gap:"6px",alignItems:"center"}}>
          <div style={{padding:"4px 10px",borderRadius:"12px",background:C.orangeLight,border:`1px solid ${C.border}`,fontSize:"12px",color:C.orange,fontWeight:700}}>L {money}</div>
          {currentEvent&&<button onClick={handleEventAttend} disabled={loading} style={{fontSize:"16px",background:"transparent",border:"none",cursor:"pointer"}} title={currentEvent.name}>{currentEvent.emoji}</button>}
          <button onClick={()=>setShowPausa(true)} style={{background:C.cardWarm,border:`1px solid ${C.border}`,color:C.textDim,borderRadius:"8px",width:"28px",height:"28px",cursor:"pointer",fontSize:"13px",display:"flex",alignItems:"center",justifyContent:"center"}}>⏸</button>
        </div>
      </div>

      {/* CHARACTER STRIP — bento card */}
      <div style={{margin:"6px 8px 0",flexShrink:0,borderRadius:"16px",background:"#FFFFFF",border:"1px solid #E0D4C8",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"}}>
        <CharacterCard twin={twin} needs={needs} money={money} gt={gt} rels={rels} family={family} skills={skills} currentDaysLived={currentDaysLived} daysInStage={daysInCurrentStage} daysInStageTotal={daysInStageTotal} lifeStage={lifeStage} aspirationProgress={aspirationProgress} reputation={reputation} mood={mood}/>
      </div>

      {/* STATS CARD — solo en desktop, solo info que no está en el header */}
      {isWide&&(currentEvent||true)&&(
        <div style={{margin:"6px 8px 0",flexShrink:0,borderRadius:"14px",background:C.cardWarm,border:`1px solid ${C.border}`,padding:"6px 20px",display:"flex",gap:"20px",alignItems:"center",justifyContent:"center"}}>
          <span style={{fontSize:"12px",color:C.textMid,fontFamily:"'Nunito',sans-serif"}}>{SEASONS[gt.monthIdx]} · {MONTHS[gt.monthIdx]}</span>
          {currentEvent&&<><span style={{color:C.border2}}>·</span><span style={{fontSize:"12px",color:C.orange,fontFamily:"'Nunito',sans-serif",fontWeight:600}}>{currentEvent.emoji} {currentEvent.name}</span></>}
        </div>
      )}

      {/* MAIN CONTENT — responsive */}
      {isWide ? (
        /* ── DESKTOP: 2 columns ── */
        <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",padding:"6px 8px 0",minHeight:0,overflow:"hidden"}}>
          {/* Left: Narrative */}
          <div style={{...bento(C.white),overflowY:"auto",padding:"14px 18px"}}>
            {log.map(e=>(
              <div key={e.id} style={{marginBottom:"18px",paddingLeft:"12px",borderLeft:`3px solid ${{intro:C.orange,story:C.border,travel:C.border2,system:C.border,romance:"#E87B9E",work:"#7AB55C",event:C.orange,world_event:C.orange,skill_up:"#7AB55C"}[e.type]||C.border}`,animation:"fadeSlideIn 0.4s ease"}}>
                {e.place&&<div style={{fontSize:"9px",color:C.textGhost,marginBottom:"3px",letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"'Nunito',sans-serif"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
                <div style={{fontSize:"13px",lineHeight:"1.8",color:C.textMid,fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{e.text}</div>
              </div>
            ))}
            {loading&&<div style={{color:C.textGhost,fontSize:"12px",fontStyle:"italic",fontFamily:"'Lora',serif",animation:"fadeSlideIn 0.3s ease"}}>✦ ...</div>}
            <div ref={logEnd}/>
          </div>
          {/* Right: Tab content */}
          <div style={{...bento(C.white),display:"flex",flexDirection:"column",overflow:"hidden"}}>
            {/* Location header inside right panel */}
            <div style={{padding:"8px 14px",borderBottom:`1px solid ${C.border}`,display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0,background:C.cardOrange}}>
              <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
                <span>📍</span>
                <span style={{fontSize:"12px",color:hoodColor,fontWeight:700,fontFamily:"'Fredoka',sans-serif"}}>{loc.hood}</span>
                <span style={{color:C.border2,fontSize:"11px"}}>·</span>
                <span style={{fontSize:"12px",color:C.textMid,fontFamily:"'Fredoka',sans-serif"}}>{loc.place}</span>
              </div>
              {npcsHere.length>0&&<div style={{display:"flex",gap:"4px"}}>{npcsHere.slice(0,3).map(n=><div key={n} style={{display:"flex",alignItems:"center",gap:"2px"}}><NPCAvatar name={n} size={14}/><span style={{fontSize:"9px",color:C.textDim}}>{n.split(" ")[0]}</span></div>)}</div>}
            </div>
            <div style={{flex:1,overflow:"hidden"}}>
              {activeTab==="acciones"&&<AccionesTab loc={loc} career={career} NEIGHBORHOODS={NEIGHBORHOODS} PLACE_ACTIONS={PLACE_ACTIONS} loading={loading} dark={false} onGoTo={handleGoTo} onAction={a=>a.isSkillUnlock?handleSkillUnlockAction(a):handleAction(a)} onWork={handleWork} extraActions={skillUnlockActions} chainActions={chainActions} onChainAction={handleChainAction}/>}
              {activeTab==="social"&&<SocialTab rels={rels} family={family} currentDay={gt.day} dark={false} loading={loading} onRomanceAction={handleRomanceAction} onInteract={handleInteraction} onChildInteract={handleChildInteract} npcWorld={npcWorld}/>}
              {activeTab==="trabajo"&&<TrabajoTabContent career={career} loc={loc} dark={false} loading={loading} onApply={handleApplyJob} onWork={handleWork}/>}
              {activeTab==="hogar"&&<HogarTab housing={housing} placedFurniture={placedFurniture} money={money} skills={skills} onUpgrade={handleUpgradeHousing} onBuyFurniture={handleBuyFurniture} dark={false} loading={loading} family={family} gt={gt} npcWorld={npcWorld} twin={twin} inventory={inventory} onUseItem={handleUseItem} onGiftItem={(item)=>setActiveGift(item)}/>}
              {activeTab==="mapa"&&<MapaTab gt={gt} rels={rels} loc={loc} loading={loading} onGoTo={handleGoTo}/>}
              {activeTab==="diario"&&<DiarioTab log={log} gt={gt}/>}
            </div>
          </div>
        </div>
      ) : (
        /* ── MOBILE: single column ── */
        <div style={{flex:1,margin:"6px 8px 0",overflowY:"auto",...bento(C.white),padding:"14px 16px",minHeight:0}}>
          {log.map(e=>(
            <div key={e.id} style={{marginBottom:"18px",paddingLeft:"12px",borderLeft:`3px solid ${{intro:C.orange,story:C.border,travel:C.border2,system:C.border,romance:"#E87B9E",work:"#7AB55C",event:C.orange,world_event:C.orange,skill_up:"#7AB55C"}[e.type]||C.border}`,animation:"fadeSlideIn 0.4s ease"}}>
              {e.place&&<div style={{fontSize:"9px",color:C.textGhost,marginBottom:"3px",letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"'Nunito',sans-serif"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
              <div style={{fontSize:"13px",lineHeight:"1.8",color:C.textMid,fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{e.text}</div>
            </div>
          ))}
          {loading&&<div style={{color:C.textGhost,fontSize:"12px",fontStyle:"italic",fontFamily:"'Lora',serif",animation:"fadeSlideIn 0.3s ease"}}>✦ ...</div>}
          <div ref={logEnd}/>
        </div>
      )}

      {/* BOTTOM — shared mobile/desktop */}
      <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:"5px",padding:"6px 8px 8px"}}>

        {/* Location + quick actions — mobile only */}
        {!isWide&&(
          <>
          <div style={{borderRadius:"12px",background:C.cardOrange,border:`1px solid ${C.border}`,padding:"0 14px",height:"30px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
            <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
              <span style={{fontSize:"12px"}}>📍</span>
              <span style={{fontSize:"11px",color:hoodColor,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>{loc.hood}</span>
              <span style={{fontSize:"11px",color:C.border2}}>·</span>
              <span style={{fontSize:"11px",color:C.textMid,maxWidth:"130px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'Nunito',sans-serif"}}>{loc.place}</span>
            </div>
            {npcsHere.length>0&&<div style={{display:"flex",gap:"4px",alignItems:"center"}}>{npcsHere.slice(0,3).map(n=><div key={n} style={{display:"flex",alignItems:"center",gap:"2px"}}><NPCAvatar name={n} size={14}/><span style={{fontSize:"9px",color:C.textDim}}>{n.split(" ")[0]}</span></div>)}</div>}
          </div>
          {activeTab!=="acciones"&&(
            <div style={{display:"flex",gap:"5px",overflowX:"auto",flexShrink:0}}>
              {(PLACE_ACTIONS[loc.place]||[]).filter(a=>a.id!=="chat_npc").slice(0,3).map(a=>(
                <button key={a.id} onClick={()=>!loading&&handleAction(a)} disabled={loading}
                  style={{flexShrink:0,display:"flex",alignItems:"center",gap:"4px",padding:"5px 11px",borderRadius:"14px",border:`1px solid ${C.border}`,background:C.white,color:C.textMid,fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:500,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",whiteSpace:"nowrap"}}>
                  <span>{a.emoji}</span>{a.label}
                </button>
              ))}
            </div>
          )}
          </>
        )}

        {/* Tab content — mobile only (desktop has it in right column) */}
        {!isWide&&(
          <div style={{height:"192px",...bento(C.white)}}>
            {activeTab==="acciones"&&<AccionesTab loc={loc} career={career} NEIGHBORHOODS={NEIGHBORHOODS} PLACE_ACTIONS={PLACE_ACTIONS} loading={loading} dark={false} onGoTo={handleGoTo} onAction={a=>a.isSkillUnlock?handleSkillUnlockAction(a):handleAction(a)} onWork={handleWork} extraActions={skillUnlockActions} chainActions={chainActions} onChainAction={handleChainAction}/>}
            {activeTab==="social"&&<SocialTab rels={rels} family={family} currentDay={gt.day} dark={false} loading={loading} onRomanceAction={handleRomanceAction} onInteract={handleInteraction} onChildInteract={handleChildInteract} npcWorld={npcWorld}/>}
            {activeTab==="trabajo"&&<TrabajoTabContent career={career} loc={loc} dark={false} loading={loading} onApply={handleApplyJob} onWork={handleWork}/>}
            {activeTab==="hogar"&&<HogarTab housing={housing} placedFurniture={placedFurniture} money={money} skills={skills} onUpgrade={handleUpgradeHousing} onBuyFurniture={handleBuyFurniture} dark={false} loading={loading} family={family} gt={gt} npcWorld={npcWorld} twin={twin} inventory={inventory} onUseItem={handleUseItem} onGiftItem={(item)=>setActiveGift(item)}/>}
            {activeTab==="mapa"&&<MapaTab gt={gt} rels={rels} loc={loc} loading={loading} onGoTo={handleGoTo}/>}
            {activeTab==="diario"&&<DiarioTab log={log} gt={gt}/>}
          </div>
        )}

        {/* Tab bar — always visible */}
        <div style={{borderRadius:"14px",background:C.white,border:`1px solid ${C.border}`,height:"46px",display:"flex",padding:"4px 6px",gap:"3px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{flex:1,border:"none",borderRadius:"10px",background:activeTab===t.id?C.orange:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",padding:0}}>
              <span style={{fontSize:activeTab===t.id?"19px":"17px",transition:"font-size 0.15s"}}>{t.emoji}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
    </div>
  );
}
