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
const NEIGHBORHOODS={"La Vega":{emoji:"🏙",color:"#7BB8B9",places:["Tu apartamento","Café de Aria","Terraza","Tienda de La Vega","Jardín Comunitario","Panadería Velin","Estudio de Arte","Bar Lumaven","Mercadillo","Gimnasio Miren","Taller Cerámica","Cine Veloria","Taller de Música","La Bodega","Micro Parque","Azotea Norte","Feria Nocturna","Centro Cívico"]},"El Casco":{emoji:"🏛",color:"#F5A623",places:["Plaza del Veloer","Librería de Soren"]},"Ribera":{emoji:"⛵",color:"#4A8B8C",places:["Muelle","Restaurante de Nela","Lago Miren"]},"Veleta":{emoji:"🎭",color:"#7A5840",places:["Biblioteca","Teatro de Cael"]},"Los Prados":{emoji:"🌳",color:"#6B9E5E",places:["Parque","Consultorio de Bren"]}};
const PLACE_ACTIONS={"Tu apartamento":[{id:"sleep",label:"Dormir",emoji:"🌙",time:8},{id:"cook",label:"Cocinar",emoji:"🍳",time:1},{id:"shower",label:"Ducharse",emoji:"🚿",time:0.5},{id:"bathroom",label:"Baño",emoji:"🚽",time:0.1},{id:"hobby",label:"Practicar hobbie",emoji:"🎨",time:2},{id:"rest",label:"Descansar",emoji:"🛋",time:1}],"Café de Aria":[{id:"coffee",label:"Tomar café",emoji:"☕",time:1,cost:3},{id:"chat_npc",label:"Charlar con Aria",emoji:"💬",time:1,npc:"Aria Ven"},{id:"read_cafe",label:"Leer",emoji:"📖",time:2},{id:"observe",label:"Observar el barrio",emoji:"👁",time:1}],"Terraza":[{id:"terr_amanecer",label:"Ver el amanecer",emoji:"🌅",time:1},{id:"terr_escribir",label:"Escribir o dibujar",emoji:"✍️",time:2},{id:"terr_estrellas",label:"Mirar las estrellas",emoji:"⭐",time:1},{id:"terr_huerto",label:"Cuidar el huerto",emoji:"🌿",time:0.5}],"Tienda de La Vega":[{id:"tienda_basicos",label:"Comprar básicos",emoji:"🛒",time:0.5,cost:15},{id:"tienda_ropa",label:"Mirar ropa",emoji:"👗",time:1},{id:"tienda_charlar",label:"Charlar con el dueño",emoji:"💬",time:1}],"Jardín Comunitario":[{id:"jardin_plantar",label:"Plantar algo",emoji:"🌱",time:2},{id:"jardin_cosechar",label:"Cosechar",emoji:"🥬",time:1},{id:"jardin_pasear",label:"Pasear entre las plantas",emoji:"🌸",time:1},{id:"chat_npc",label:"Hablar con Elia",emoji:"💬",time:1,npc:"Elia Orlen"}],"Panadería Velin":[{id:"pan_comprar",label:"Comprar Pan Velin",emoji:"🥐",time:0.3,cost:5},{id:"pan_desayuno",label:"Desayunar acá",emoji:"☕",time:1,cost:8},{id:"pan_ver_hacer",label:"Ver cómo hacen el pan",emoji:"👀",time:1}],"Estudio de Arte":[{id:"estudio_pintar",label:"Pintar",emoji:"🎨",time:2,cost:5},{id:"estudio_ver",label:"Ver el trabajo de otros",emoji:"🖼",time:1},{id:"estudio_conocer",label:"Conocer artistas",emoji:"💬",time:1},{id:"estudio_tecnica",label:"Practicar técnica",emoji:"✏️",time:3},{id:"chat_npc",label:"Hablar con Vael",emoji:"🎨",time:1,npc:"Vael Lumaren"}],"Bar Lumaven":[{id:"bar_lumaven",label:"Tomar un Lumaven",emoji:"🥂",time:1,cost:8},{id:"bar_musica",label:"Escuchar música en vivo",emoji:"🎵",time:2},{id:"bar_conocer",label:"Conocer gente",emoji:"💬",time:1},{id:"bar_mirone",label:"Jugar al Mirone",emoji:"🃏",time:1.5},{id:"chat_npc",label:"Hablar con Luma",emoji:"🎸",time:1,npc:"Luma Sorvei"}],"Mercadillo":[{id:"merc_unico",label:"Buscar objetos únicos",emoji:"🛍",time:1},{id:"merc_frescos",label:"Comprar frescos",emoji:"🥬",time:0.5,cost:12},{id:"merc_charlar",label:"Charlar con vendedores",emoji:"💬",time:1}],"Gimnasio Miren":[{id:"gym_entrenar",label:"Entrenar",emoji:"💪",time:1.5},{id:"gym_natacion",label:"Clases de natación",emoji:"🏊",time:2,cost:10}],
"Taller Cerámica":[{id:"cerc_moldear",label:"Moldear arcilla",emoji:"🏺",time:2},{id:"cerc_ver",label:"Ver el trabajo de otros",emoji:"👁",time:1},{id:"cerc_torno",label:"Intentar el torno",emoji:"⭕",time:1.5},{id:"chat_npc",label:"Hablar con Senia",emoji:"🤝",time:1,npc:"Senia Vel"}],
"Cine Veloria":[{id:"cine_ver",label:"Ver una película",emoji:"🎬",time:2.5,cost:20},{id:"cine_charlar",label:"Charlar en el hall",emoji:"💬",time:1},{id:"cine_dormido",label:"Quedarse dormido/a",emoji:"😴",time:2}],
"Taller de Música":[{id:"musica_tocar",label:"Tocar junto a otros",emoji:"🎸",time:2},{id:"musica_clase",label:"Escuchar una clase",emoji:"🎵",time:1},{id:"musica_impro",label:"Improvisar",emoji:"🎶",time:1.5},{id:"chat_npc",label:"Hablar con Vael",emoji:"🎨",time:1,npc:"Vael Lumaren"}],
"La Bodega":[{id:"bodega_probar",label:"Probar Miren Seco",emoji:"🍷",time:1,cost:15},{id:"bodega_historia",label:"Escuchar una historia",emoji:"👂",time:1},{id:"bodega_contar",label:"Contar tu historia",emoji:"💬",time:1},{id:"chat_npc",label:"Charlar con Lior",emoji:"🗣",time:1,npc:"Lior Veloer"}],
"Micro Parque":[{id:"parque2_pasto",label:"Tirarse en el pasto",emoji:"🌱",time:1},{id:"parque2_leer",label:"Leer al sol",emoji:"📖",time:1.5},{id:"parque2_pajaros",label:"Observar los Mirelos",emoji:"🐦",time:0.5}],
"Azotea Norte":[{id:"azotea2_lago",label:"Contemplar el lago",emoji:"🏔",time:1},{id:"azotea2_dibujar",label:"Dibujar el horizonte",emoji:"✏️",time:2},{id:"azotea2_estrellas",label:"Ver las estrellas",emoji:"🌟",time:1}],
"Feria Nocturna":[{id:"feria_unico",label:"Buscar objetos únicos",emoji:"🛍",time:1},{id:"feria_comida",label:"Probar comida de feria",emoji:"🍢",time:0.5,cost:12},{id:"feria_feriantes",label:"Charlar con feriantes",emoji:"💬",time:1},{id:"chat_npc",label:"Encontrar a Luma",emoji:"🎸",time:1,npc:"Luma Sorvei"}],
"Centro Cívico":[{id:"civico_taller",label:"Ir a un taller",emoji:"🧠",time:2},{id:"civico_ayuda",label:"Ofrecer ayuda",emoji:"🤲",time:2},{id:"civico_tablon",label:"Ver el tablón",emoji:"📋",time:0.5},{id:"civico_vecinos",label:"Conocer vecinos",emoji:"💬",time:1}],"Plaza del Veloer":[{id:"walk_plaza",label:"Pasear",emoji:"🚶",time:1},{id:"market",label:"Explorar el mercado",emoji:"🛒",time:1},{id:"chat_npc",label:"Hablar con Aldric",emoji:"💬",time:1,npc:"Aldric Veloer"}],"Librería de Soren":[{id:"browse_books",label:"Explorar libros",emoji:"📚",time:1},{id:"chat_npc",label:"Hablar con Soren",emoji:"💬",time:1,npc:"Soren Lume"},{id:"buy_book",label:"Comprar un libro",emoji:"📘",time:0.5,cost:15}],"Muelle":[{id:"fish",label:"Pescar",emoji:"🎣",time:3},{id:"chat_npc",label:"Hablar con Oren",emoji:"⛵",time:1,npc:"Oren Mirende"},{id:"sit_lake",label:"Contemplar el lago",emoji:"🌊",time:1}],"Restaurante de Nela":[{id:"eat_dish",label:"Mirenpez al Veloer",emoji:"🐟",time:1.5,cost:35},{id:"chat_npc",label:"Charlar con Nela",emoji:"💬",time:1,npc:"Nela Mirende"},{id:"cena",label:"Cena completa",emoji:"🍷",time:2,cost:55}],"Lago Miren":[{id:"swim",label:"Nadar",emoji:"🏊",time:2},{id:"secret_lake",label:"Contarle un secreto al lago",emoji:"🌊",time:0.5},{id:"walk_shore",label:"Caminar por la orilla",emoji:"🌅",time:1}],"Biblioteca":[{id:"research",label:"Investigar historia de Veloria",emoji:"📜",time:2},{id:"chat_npc",label:"Hablar con Ciro",emoji:"📖",time:1,npc:"Ciro Orlen"},{id:"read_lib",label:"Leer en silencio",emoji:"📚",time:2}],"Teatro de Cael":[{id:"watch_show",label:"Ver una obra",emoji:"🎭",time:2.5,cost:25},{id:"chat_npc",label:"Hablar con Cael",emoji:"🎬",time:1,npc:"Cael Sorvei"}],"Parque":[{id:"walk_park",label:"Caminar entre los árboles",emoji:"🌳",time:1},{id:"picnic",label:"Picnic al sol",emoji:"🧺",time:2}],"Consultorio de Bren":[{id:"checkup",label:"Consulta médica",emoji:"⚕️",time:1,cost:40},{id:"chat_npc",label:"Conversar con Bren",emoji:"💊",time:1,npc:"Bren Orlen"}]};
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
function AccionesTab({loc,career,NEIGHBORHOODS,PLACE_ACTIONS,loading,dark,onGoTo,onAction,onWork,extraActions=[]}){
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
      {/* Place chips for selected hood */}
      <div style={{overflowX:"auto",display:"flex",gap:"4px",padding:"5px 12px 6px",flexShrink:0,borderBottom:"1px solid #1A1208"}}>
        {(NEIGHBORHOODS[selHood]?.places||[]).map(p=>(
          <button key={p} onClick={()=>!loading&&onGoTo(selHood,p)} disabled={loading}
            style={{flexShrink:0,padding:"3px 8px",borderRadius:"8px",border:`1px solid ${loc.place===p&&loc.hood===selHood?selColor:"#E0D4C8"}`,background:loc.place===p&&loc.hood===selHood?`${selColor}18`:"transparent",color:loc.place===p&&loc.hood===selHood?selColor:"#BBA090",fontSize:"9px",cursor:loading?"not-allowed":"pointer",whiteSpace:"nowrap"}}>
            {p.length>15?p.slice(0,14)+"…":p}
          </button>
        ))}
      </div>
      {/* Actions */}
      <div style={{flex:1,overflowY:"auto",padding:"8px 10px 10px"}}>
        {isAtWorkplace&&(
          <button onClick={onWork} disabled={loading}
            style={{width:"100%",padding:"9px",borderRadius:"10px",border:"1px solid #6B9E5E",background:"rgba(122,181,92,0.08)",color:"#6B9E5E",fontSize:"11px",cursor:loading?"not-allowed":"pointer",marginBottom:"8px",fontWeight:600}}>
            💼 Trabajar ({CAREERS[career.track].shiftH}h) → +L{CAREERS[career.track].wages[career.level]}
          </button>
        )}
        {actions.length>0&&(
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"6px",marginBottom:extraActions.length>0?"10px":0}}>
            {actions.map(a=><ActionCard key={a.id+(a.npc||"")} action={a} onClick={()=>onAction(a)} disabled={loading} hoodColor={hoodColor}/>)}
          </div>
        )}
        {extraActions.length>0&&(
          <div style={{borderTop:"1px solid #1A1208",paddingTop:"8px"}}>
            <div style={{fontSize:"9px",color:"#F5A623",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"6px"}}>✦ Habilidades desbloqueadas</div>
            <div style={{display:"flex",flexDirection:"column",gap:"5px"}}>
              {extraActions.map(a=>(
                <button key={a.id} onClick={()=>onAction(a)} disabled={loading}
                  style={{padding:"9px 12px",borderRadius:"9px",border:"1px solid rgba(245,166,35,0.22)",background:"rgba(245,166,35,0.04)",display:"flex",gap:"8px",alignItems:"center",cursor:loading?"not-allowed":"pointer",textAlign:"left",opacity:loading?0.4:1}}>
                  <span style={{fontSize:"16px"}}>{a.emoji}</span>
                  <div>
                    <div style={{fontSize:"11px",color:"#F5A623",fontWeight:600}}>{a.label}</div>
                    {getActionSkillInfo(a.id)&&<div style={{fontSize:"9px",color:"#BBA090"}}>{getActionSkillInfo(a.id)}</div>}
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
function SocialTab({rels,family,currentDay,dark,loading,onRomanceAction,onInteract,onChildInteract}){
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
      <div style={{display:"flex",borderBottom:"1px solid #1A1208",flexShrink:0}}>
        <button onClick={()=>{setMode("twins");setSel(null);}} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:mode==="twins"?"2px solid #7BB8B9":"2px solid transparent",background:"transparent",color:mode==="twins"?"#7BB8B9":"#BBA090",cursor:"pointer"}}>
          👥 Twins ({sorted.length})
        </button>
        <button onClick={()=>setMode("familia")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:mode==="familia"?"2px solid #E87B9E":"2px solid transparent",background:"transparent",color:mode==="familia"?"#E87B9E":"#BBA090",cursor:"pointer"}}>
          👨‍👩‍👧 Familia ({family.children.length}{family.partner?"+pareja":""})
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
function CharacterCard({twin,needs,money,gt,rels,family,skills,currentDaysLived,daysInStage,daysInStageTotal,lifeStage,aspirationProgress}){
  const [moodLabel,moodColor]=getMood(needs);
  const ls=lifeStage||LIFE_STAGES[6];
  const asp=twin?.aspiration?ASPIRATIONS.find(a=>a.id===twin.aspiration):null;
  const nextMilestone=asp?.milestones[(aspirationProgress||[]).length];
  const stageProgress=Math.min(100,((daysInStage||0)+1)/Math.max(1,daysInStageTotal||ls.days)*100);
  return(
    <div style={{background:"#FFFFFF",borderBottom:"1px solid #1A1208",padding:"8px 14px",flexShrink:0}}>
      {/* Main row */}
      <div style={{display:"flex",gap:"10px",alignItems:"center",marginBottom:"5px"}}>
        {/* Avatar */}
        <div style={{width:"36px",height:"36px",borderRadius:"50%",background:`${ls.color}18`,border:`2px solid ${ls.color}55`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"14px",color:ls.color,fontFamily:"'Lora',serif",fontWeight:700,flexShrink:0}}>
          {twin?.name?.charAt(0)||"?"}
        </div>
        {/* Name + stage */}
        <div style={{flexShrink:0}}>
          <div style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600,lineHeight:1.2}}>{twin?.name}</div>
          <div style={{fontSize:"9px",color:ls.color,marginBottom:"2px"}}>{ls.emoji} {ls.label} · día {(daysInStage||0)+1}/{daysInStageTotal||ls.days}</div>
          <div style={{width:"72px",height:"2px",background:"#E0D4C8",borderRadius:"1px",overflow:"hidden"}}>
            <div style={{height:"100%",width:`${stageProgress}%`,background:ls.color,transition:"width 0.5s"}}/>
          </div>
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
function DialogueModal({event,onRespond}){
  const c=NPC_HOOD_COLOR[event.npc]||"#F5A623";
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.88)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:150,padding:"16px"}}>
      <div style={{background:"#F5EDE0",border:`1px solid ${c}33`,borderRadius:"16px",width:"480px",maxWidth:"100%",padding:"24px"}}>
        <div style={{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"}}>
          <NPCAvatar name={event.npc} size={44}/>
          <div>
            <div style={{fontSize:"13px",color:"#7A5840",fontWeight:600}}>{event.npc}</div>
            <div style={{fontSize:"9px",color:"#BBA090"}}>{NPC_DESC[event.npc]||""}</div>
          </div>
        </div>
        <div style={{fontSize:"13px",color:"#7A5840",fontFamily:"'Lora',serif",lineHeight:"1.7",fontStyle:"italic",marginBottom:"20px",paddingLeft:"10px",borderLeft:`2px solid ${c}44`,whiteSpace:"pre-line"}}>
          {event.message}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:"7px"}}>
          {event.options.map((opt,i)=>(
            <button key={i} onClick={()=>onRespond(opt)}
              style={{padding:"10px 14px",borderRadius:"9px",border:"1px solid #2C1F14",background:"transparent",color:"#7A5840",cursor:"pointer",textAlign:"left",fontSize:"12px",transition:"all 0.15s",lineHeight:"1.4"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor=c;e.currentTarget.style.color=c;e.currentTarget.style.background=`${c}10`;}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#D4C4B0";e.currentTarget.style.color="#7A5840";e.currentTarget.style.background="transparent";}}>
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══ HOGAR TAB ═══
function HogarTab({housing,placedFurniture,money,skills,onUpgrade,onBuyFurniture,dark,loading}){
  const [view,setView]=useState("prop"); // "prop" | "muebles"
  const tier=HOUSING_TIERS.find(h=>h.id===housing)||HOUSING_TIERS[0];
  const tierIdx=HOUSING_TIERS.indexOf(tier);
  const nextTier=HOUSING_TIERS[tierIdx+1]||null;
  const slotsUsed=placedFurniture.length;
  const eff=getHousingEffects(housing,placedFurniture);

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%",overflow:"hidden"}}>
      <div style={{display:"flex",borderBottom:"1px solid #1A1208",flexShrink:0}}>
        <button onClick={()=>setView("prop")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:view==="prop"?"2px solid #D4A853":"2px solid transparent",background:"transparent",color:view==="prop"?"#F5A623":"#BBA090",cursor:"pointer"}}>🏠 Propiedad</button>
        <button onClick={()=>setView("muebles")} style={{flex:1,padding:"6px",fontSize:"10px",border:"none",borderBottom:view==="muebles"?"2px solid #D4A853":"2px solid transparent",background:"transparent",color:view==="muebles"?"#F5A623":"#BBA090",cursor:"pointer"}}>🛋 Muebles ({slotsUsed}/{tier.slots})</button>
      </div>

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
function LegacyScreen({twin,gt,skills,rels,family,children,onContinueAsChild,onNewGame}){
  const daysLived=PLAYER_START_DAYS+(gt.day-1);
  const masteredSkills=Object.entries(skills).filter(([,xp])=>getSkillLevel(xp)>=4).map(([k])=>SKILLS_CFG[k]?.label||k);
  const knownNPCs=Object.keys(rels).length;
  const hasChild=children&&children.length>0;
  return(
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.97)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:300,fontFamily:"'DM Sans',sans-serif"}}>
      <div style={{maxWidth:"520px",width:"95%",textAlign:"center",padding:"40px 32px"}}>
        <div style={{fontSize:"28px",marginBottom:"8px"}}>✦</div>
        <div style={{fontFamily:"'Lora',serif",fontSize:"28px",color:"#F5A623",marginBottom:"4px"}}>El legado de {twin?.name}</div>
        <div style={{fontSize:"11px",color:"#BBA090",letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"32px"}}>Veloria · Otherwhen</div>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"12px",marginBottom:"28px"}}>
          {[
            {label:"Días vividos",value:daysLived,emoji:"🕰"},
            {label:"Días en Veloria",value:gt.day,emoji:"📅"},
            {label:"Twins conocidos",value:knownNPCs,emoji:"💬"},
          ].map(({label,value,emoji})=>(
            <div key={label} style={{background:"rgba(245,166,35,0.05)",border:"1px solid #2C1F14",borderRadius:"10px",padding:"12px 8px"}}>
              <div style={{fontSize:"20px",marginBottom:"4px"}}>{emoji}</div>
              <div style={{fontFamily:"'Lora',serif",fontSize:"18px",color:"#F5A623",marginBottom:"2px"}}>{value}</div>
              <div style={{fontSize:"9px",color:"#BBA090",textTransform:"uppercase",letterSpacing:"0.08em"}}>{label}</div>
            </div>
          ))}
        </div>

        {masteredSkills.length>0&&(
          <div style={{marginBottom:"20px",fontSize:"10px",color:"#B8907A"}}>
            Habilidades dominadas: <span style={{color:"#F5A623"}}>{masteredSkills.join(" · ")}</span>
          </div>
        )}
        {family?.partner&&(
          <div style={{marginBottom:"10px",fontSize:"10px",color:"#E87B9E"}}>
            Vida compartida con {family.partner}{family.children?.length>0?` · ${family.children.length} ${family.children.length===1?"hijo":"hijos"}`:""}</div>
        )}

        <div style={{marginBottom:"20px",fontFamily:"'Lora',serif",fontSize:"13px",color:"#B8907A",fontStyle:"italic",lineHeight:"1.6"}}>
          *{getNarrative("death")}*
        </div>

        <div style={{display:"flex",gap:"10px",justifyContent:"center"}}>
          {hasChild&&(
            <button onClick={()=>onContinueAsChild(children[0])} style={{padding:"10px 20px",borderRadius:"10px",border:"1px solid #D4A853",background:"rgba(245,166,35,0.1)",color:"#F5A623",fontSize:"12px",cursor:"pointer",fontWeight:600}}>
              Continuar como {children[0].name} →
            </button>
          )}
          <button onClick={onNewGame} style={{padding:"10px 20px",borderRadius:"10px",border:"1px solid #3D2B1F",background:"transparent",color:"#B8907A",fontSize:"12px",cursor:"pointer"}}>
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
  const [origin,setOrigin]=useState(null);
  const [traits,setTraits]=useState([]);
  const [aspiration,setAspiration]=useState(null);
  const [connection,setConnection]=useState(null);
  const [showLoad,setShowLoad]=useState(!!defaultShowLoad);

  const STEPS=["Identidad","Origen","Rasgos","Aspiración","Conexión","Resumen"];
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
    true,
  ][step]??false;

  function toggleTrait(id){
    if(traits.includes(id))setTraits(t=>t.filter(x=>x!==id));
    else if(traits.length<3)setTraits(t=>[...t,id]);
  }

  function handleFinish(){
    const orig=ORIGINS.find(o=>o.id===origin);
    onStart({name:name.trim(),pronouns,origin,traits,aspiration,_origin:orig,_connection:connection});
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
            <div style={{display:"flex",gap:"8px"}}>
              {PRONOUN_OPTS.map(p=>(
                <button key={p.id} onClick={()=>setPronouns(p.id)} style={{...btn(pronouns===p.id),flex:1}}>{p.label}</button>
              ))}
            </div>
            <div style={{fontSize:"10px",color:"#D4C4B0",marginTop:"8px",fontFamily:"'Nunito',sans-serif"}}>Esto afecta la narrativa del juego.</div>
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

        {/* ── STEP 5: RESUMEN ── */}
        {step===5&&(()=>{
          const asp=ASPIRATIONS.find(a=>a.id===aspiration);
          const orig=ORIGINS.find(o=>o.id===origin);
          const selTraits=TRAITS.filter(t=>traits.includes(t.id));
          return(
            <div>
              <div style={TITLE}>Tu Twin está listo/a</div>
              <div style={SUB}>Así llega {name} a Veloria.</div>
              <div style={{background:"#FFFFFF",border:"1px solid #E0D4C8",borderRadius:"14px",padding:"16px",display:"flex",flexDirection:"column",gap:"10px"}}>
                {[
                  ["Nombre",`${name} (${pronouns})`],
                  ["Origen",`${orig?.emoji} ${orig?.label}`],
                  ["Aspiración",`${asp?.emoji} ${asp?.label}`],
                  ["Primera conexión",connection],
                ].map(([l,v])=>(
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
                <div style={{display:"flex",justifyContent:"space-between"}}>
                  <span style={{fontSize:"11px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>Empieza como</span>
                  <span style={{fontSize:"12px",color:"#2C1A0E",fontWeight:600}}>🌱 Joven Adulto/a (día 1/14)</span>
                </div>
              </div>
            </div>
          );
        })()}

        <button onClick={step===5?handleFinish:()=>setStep(s=>s+1)} disabled={!canNext}
          style={NEXT(!canNext)}>
          {step===5?"✦ Llegar a Veloria":"Continuar →"}
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
  const [namingChild,setNamingChild]=useState(false),[childNameInput,setChildNameInput]=useState("");
  const [skills,setSkills]=useState({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
  const [housing,setHousing]=useState("apto_basico");
  const [placedFurniture,setPlacedFurniture]=useState([]);
  const [usedOnce,setUsedOnce]=useState(new Set());
  const [showLegacy,setShowLegacy]=useState(false);
  const [pendingNPCDialogue,setPendingNPCDialogue]=useState(null);
  const [aspirationProgress,setAspirationProgress]=useState([]);
  const [visitedPlaces,setVisitedPlaces]=useState(new Set(["Tu apartamento"]));
  const logEnd=useRef(null);
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

  // ── Dialogue response ──
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
    const adjusted={};
    for(const[skill,xp]of Object.entries(gains)){
      let mult=stage.skillMult;
      if(housingEff.skillBonus[skill])mult*=housingEff.skillBonus[skill];
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
    });
  }
  useEffect(()=>{
    if(phase==="playing"&&log.length>0&&log.length%5===0){
      const data=buildSave(twin,needs,money,gt,loc,rels,career,family,inventory,log,skills,housing,placedFurniture);
      try{localStorage.setItem(AUTO_KEY,JSON.stringify(data));}catch{}
    }
  },[log.length]);

  function saveToSlot(slot){
    try{localStorage.setItem(SAVE_KEY+slot,JSON.stringify(buildSave(twin,needs,money,gt,loc,rels,career,family,inventory,log,skills,housing,placedFurniture)));}catch{}
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
    setInventory([{id:1,name:"Té Miren",type:"food",emoji:"🍵",qty:2,desc:"Una taza.",useable:true},{id:2,name:"Pan Velin",type:"food",emoji:"🥐",qty:1,desc:"Pan de Veloria.",useable:true}]);
    setLog([]);setShowPausa(false);lastAgeMilestone.current=0;lastEventDay.current=0;
  }

  const addEntry=e=>setLog(prev=>[...prev,{id:Date.now()+Math.random(),day:gt.day,...e}]);
  const tick=(hours,changes={})=>{
    const daysLived=PLAYER_START_DAYS+(gt.day-1);
    const dm=getLifeStage(daysLived).decayMult;
    const hb=getHousingEffects(housing,placedFurniture).needBonus;
    const b=(need,ch)=>clamp((ch||0)+(ch>0?hb[need]||0:0));
    setNeeds(prev=>({
      hambre:   clamp(prev.hambre   -hours*4*dm  +b("hambre",   changes.hambre)),
      sueno:    clamp(prev.sueno    -hours*3*dm  +b("sueno",    changes.sueno)),
      higiene:  clamp(prev.higiene  -hours*1.5*dm+b("higiene",  changes.higiene)),
      social:   clamp(prev.social   -hours*2*dm  +b("social",   changes.social)),
      diversion:clamp(prev.diversion-hours*2.5*dm+b("diversion",changes.diversion)),
      vejiga:   clamp(prev.vejiga   -hours*8*dm  +(changes.vejiga||0)),
    }));
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
    setTwin({name:child.name,traits:childTraits,aspiration:"familia"});
    setNeeds({hambre:80,sueno:80,higiene:80,social:60,diversion:60,vejiga:80});
    setMoney(Math.floor(money*0.3));
    setGt({hour:8,day:1,monthIdx:0});
    setLoc({hood:"La Vega",place:"Tu apartamento"});
    setCareer(null);setFamily({partner:null,romanticStatus:null,children:[]});
    setSkills({pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0});
    setLog([{id:Date.now(),day:1,text:`La historia continúa.\n\n${child.name} abre los ojos en el apartamento de La Vega — el mismo de siempre, pero visto por primera vez. Veloria afuera es exactamente lo que era. Y también, completamente, otra cosa.`,type:"intro",place:"Tu apartamento",time:"08:00"}]);
    lastAgeMilestone.current=0;lastEventDay.current=0;
  }

  async function handleStart(twinData){
    const orig=twinData._origin;
    const conn=twinData._connection;
    // Apply origin skill bonuses
    const initSkills={pesca:0,cocina:0,arte:0,carisma:0,naturaleza:0,conocimiento:0};
    if(orig?.bonus?.skills){for(const[sk,xp]of Object.entries(orig.bonus.skills))initSkills[sk]=(initSkills[sk]||0)+xp;}
    setSkills(initSkills);
    // Apply origin + first connection friendship
    const initRels={};
    if(orig?.bonus?.friendship){for(const[npc,fr]of Object.entries(orig.bonus.friendship))initRels[npc]={friendship:fr,history:["Se conocen del barrio de origen"]};}
    if(conn){const c=twinData._connectionData;initRels[conn]={...(initRels[conn]||{}),friendship:Math.max(initRels[conn]?.friendship||0,25),history:["Primera conexión en Veloria"]};}
    setRels(initRels);
    // Starting inventory
    const startInv=[{id:1,name:"Té Miren",type:"food",emoji:"🍵",qty:2,desc:"Una taza.",useable:true},{id:2,name:"Pan Velin",type:"food",emoji:"🥐",qty:1,desc:"Pan de Veloria.",useable:true}];
    if(orig?.bonus?.item){startInv.push({id:Date.now(),...orig.bonus.item});}
    setInventory(startInv);
    setTwin({...twinData});
    setPhase("playing");setLoading(true);
    await sleep(500);
    const aspLabel=ASPIRATIONS.find(a=>a.id===twinData.aspiration)?.label||"";
    const connLine=conn?`\n\nEn el café de abajo, ${conn.split(" ")[0]} ya sabe tu nombre.`:"";
    const txt=getNarrative(`intro:${twinData.aspiration}`)||`El apartamento en La Vega es exactamente lo que esperabas y también algo más.`;
    addEntry({text:txt+connLine,type:"intro",place:"Tu apartamento",time:"08:00"});
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
      addEntry({text:getNarrative(nKey)||getNarrative("default"),type:"story",place:loc.place,time:toTimeStr(gt.hour+(action.time||0.5))});
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
    setFamily(f=>({...f,children:[...f.children,{name,birthDay:gt.day,traits:pool.slice(0,3),otherParent:family.partner,happiness:70,relationship:60}]}));
    tick(0,{social:30,diversion:20});
    addEntry({text:getNarrative("birth",{CHILD:name,PARTNER:family.partner||"tu pareja"}),type:"intro",place:"Tu apartamento",time:toTimeStr(gt.hour)});
    setLoading(false);
  }
  async function handleGoTo(hood,place){
    if(loading||(loc.hood===hood&&loc.place===place))return;
    setLoc({hood,place});
    setVisitedPlaces(prev=>new Set([...prev,place]));
    setLoading(true);await sleep(300);
    tick(loc.hood!==hood?0.5:0.2,{});
    addEntry({text:getNarrative(`travel:${place}`)||`Llegás a ${place}.`,type:"travel",place,time:toTimeStr(gt.hour+(loc.hood!==hood?0.5:0.2))});
    setLoading(false);
  }
  function handleUseItem(item){
    if(item.type==="food"){tick(0,{hambre:40});setInventory(prev=>prev.map(i=>i.id===item.id?{...i,qty:i.qty-1}:i).filter(i=>i.qty>0));addEntry({text:`Comés ${item.name.toLowerCase()}. El hambre cede un poco.`,type:"story",place:loc.place});}
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

  return(
    <div style={{display:"flex",justifyContent:"center",background:C.bg,minHeight:"100vh"}}>
    <div style={{display:"flex",flexDirection:"column",height:"100vh",width:"100%",maxWidth:"520px",background:C.bg,fontFamily:"'Fredoka',sans-serif",color:C.text,overflow:"hidden",position:"relative"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;500;600;700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:3px;height:3px}::-webkit-scrollbar-thumb{background:#D4C4B0;border-radius:2px}button{font-family:'Fredoka',sans-serif}@keyframes fadeSlideIn{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}`}</style>

      {showPausa&&<PausaModal onClose={()=>setShowPausa(false)} onSave={saveToSlot} onLoad={loadFromSlot} onReset={resetGame} log={log} gt={gt} twin={twin}/>}
      {showLegacy&&<LegacyScreen twin={twin} gt={gt} skills={skills} rels={rels} family={family} children={family.children} onContinueAsChild={handleContinueAsChild} onNewGame={resetGame}/>}
      {pendingNPCDialogue&&<DialogueModal event={pendingNPCDialogue} onRespond={handleDialogueResponse}/>}
      {namingChild&&(
        <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:100}}>
          <div style={{...bento(C.white),padding:"28px",width:"300px",textAlign:"center"}}>
            <div style={{fontSize:"32px",marginBottom:"12px"}}>👶</div>
            <div style={{fontSize:"17px",color:C.orange,fontWeight:700,marginBottom:"6px"}}>¿Cómo se llama?</div>
            <div style={{fontSize:"11px",color:C.textDim,marginBottom:"18px",fontFamily:"'Nunito',sans-serif"}}>El nombre de tu hijo/a en Veloria.</div>
            <input value={childNameInput} onChange={e=>setChildNameInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&childNameInput.trim()&&handleHaveChild()} placeholder="Nombre..." style={{width:"100%",padding:"9px 13px",background:C.cardWarm,border:`1px solid ${C.border}`,borderRadius:"10px",color:C.text,fontSize:"15px",fontFamily:"'Lora',serif",outline:"none",marginBottom:"12px"}}/>
            <div style={{display:"flex",gap:"8px"}}>
              <button onClick={()=>setNamingChild(false)} style={{flex:1,padding:"8px",borderRadius:"10px",border:`1px solid ${C.border}`,background:"transparent",color:C.textDim,cursor:"pointer"}}>Cancelar</button>
              <button onClick={handleHaveChild} disabled={!childNameInput.trim()} style={{flex:1,padding:"8px",borderRadius:"10px",border:"none",background:C.orange,color:C.white,cursor:"pointer",fontWeight:700}}>✦ Confirmar</button>
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
        <CharacterCard twin={twin} needs={needs} money={money} gt={gt} rels={rels} family={family} skills={skills} currentDaysLived={currentDaysLived} daysInStage={daysInCurrentStage} daysInStageTotal={daysInStageTotal} lifeStage={lifeStage} aspirationProgress={aspirationProgress}/>
      </div>

      {/* NARRATIVE — bento card */}
      <div style={{flex:1,margin:"6px 8px 0",overflowY:"auto",borderRadius:"16px",background:"#FFFFFF",border:"1px solid #E0D4C8",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",padding:"14px 16px",minHeight:0}}>
        {log.map(e=>(
          <div key={e.id} style={{marginBottom:"18px",paddingLeft:"12px",borderLeft:`3px solid ${{intro:"#F5A623",story:"#E0D4C8",travel:"#D4C4B0",system:"#E0D4C8",romance:"#E87B9E",work:"#7AB55C",event:"#F5A623",world_event:"#F5A623",skill_up:"#7AB55C"}[e.type]||"#E0D4C8"}`,animation:"fadeSlideIn 0.4s ease"}}>
            {e.place&&<div style={{fontSize:"9px",color:"#D4C4B0",marginBottom:"3px",letterSpacing:"0.06em",textTransform:"uppercase",fontFamily:"'Nunito',sans-serif"}}>{e.place}{e.time?` · ${e.time}`:""}</div>}
            <div style={{fontSize:"13px",lineHeight:"1.8",color:"#7A5840",fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{e.text}</div>
          </div>
        ))}
        {loading&&<div style={{color:"#D4C4B0",fontSize:"12px",fontStyle:"italic",fontFamily:"'Lora',serif",animation:"fadeSlideIn 0.3s ease"}}>✦ ...</div>}
        <div ref={logEnd}/>
      </div>

      {/* BOTTOM — bento sections */}
      <div style={{flexShrink:0,display:"flex",flexDirection:"column",gap:"5px",padding:"6px 8px 8px"}}>

        {/* Location pill */}
        <div style={{borderRadius:"12px",background:"#FFF5E5",border:"1px solid #E0D4C8",padding:"0 14px",height:"30px",display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div style={{display:"flex",gap:"5px",alignItems:"center"}}>
            <span style={{fontSize:"12px"}}>📍</span>
            <span style={{fontSize:"11px",color:hoodColor,fontWeight:700,fontFamily:"'Nunito',sans-serif"}}>{loc.hood}</span>
            <span style={{fontSize:"11px",color:"#D4C4B0"}}>·</span>
            <span style={{fontSize:"11px",color:"#B8907A",maxWidth:"130px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",fontFamily:"'Nunito',sans-serif"}}>{loc.place}</span>
          </div>
          {npcsHere.length>0&&<div style={{display:"flex",gap:"4px",alignItems:"center"}}>{npcsHere.slice(0,3).map(n=><div key={n} style={{display:"flex",alignItems:"center",gap:"2px"}}><NPCAvatar name={n} size={14}/><span style={{fontSize:"9px",color:"#B8907A",fontFamily:"'Nunito',sans-serif"}}>{n.split(" ")[0]}</span></div>)}</div>}
        </div>

        {/* Quick actions — solo visibles cuando no estás en Acciones */}
        {activeTab!=="acciones"&&(
        <div style={{display:"flex",gap:"5px",overflowX:"auto",flexShrink:0}}>
          {(PLACE_ACTIONS[loc.place]||[]).filter(a=>a.id!=="chat_npc").slice(0,3).map(a=>(
            <button key={a.id} onClick={()=>!loading&&handleAction(a)} disabled={loading}
              style={{flexShrink:0,display:"flex",alignItems:"center",gap:"4px",padding:"5px 11px",borderRadius:"14px",border:"1px solid #E0D4C8",background:"#FFFFFF",color:"#7A5840",fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:500,boxShadow:"0 1px 3px rgba(0,0,0,0.06)",whiteSpace:"nowrap",fontFamily:"'Fredoka',sans-serif"}}>
              <span>{a.emoji}</span>{a.label}
            </button>
          ))}
          {skillUnlockActions.length>0&&<button onClick={()=>!loading&&handleSkillUnlockAction(skillUnlockActions[0])} disabled={loading} style={{flexShrink:0,display:"flex",alignItems:"center",gap:"4px",padding:"5px 11px",borderRadius:"14px",border:"1.5px solid #F5A623",background:"#FFF3DC",color:"#F5A623",fontSize:"11px",cursor:loading?"not-allowed":"pointer",fontWeight:600,whiteSpace:"nowrap",fontFamily:"'Fredoka',sans-serif"}}>✦ {skillUnlockActions[0].emoji} {skillUnlockActions[0].label}</button>}
          <button onClick={()=>setActiveTab("acciones")} style={{flexShrink:0,padding:"5px 11px",borderRadius:"14px",border:"1px solid #E0D4C8",background:"#FFFFFF",color:"#B8907A",fontSize:"11px",cursor:"pointer",marginLeft:"auto",fontFamily:"'Fredoka',sans-serif"}}>⋯</button>
        </div>
        )}

        {/* Tab content */}
        <div style={{height:"192px",borderRadius:"16px",background:"#FFFFFF",border:"1px solid #E0D4C8",boxShadow:"0 2px 10px rgba(0,0,0,0.06)",overflow:"hidden"}}>
          {activeTab==="acciones"&&<AccionesTab loc={loc} career={career} NEIGHBORHOODS={NEIGHBORHOODS} PLACE_ACTIONS={PLACE_ACTIONS} loading={loading} dark={false} onGoTo={handleGoTo} onAction={a=>a.isSkillUnlock?handleSkillUnlockAction(a):handleAction(a)} onWork={handleWork} extraActions={skillUnlockActions}/>}
          {activeTab==="social"&&<SocialTab rels={rels} family={family} currentDay={gt.day} dark={false} loading={loading} onRomanceAction={handleRomanceAction} onInteract={handleInteraction} onChildInteract={handleChildInteract}/>}
          {activeTab==="trabajo"&&<TrabajoTabContent career={career} loc={loc} dark={false} loading={loading} onApply={handleApplyJob} onWork={handleWork}/>}
          {activeTab==="hogar"&&<HogarTab housing={housing} placedFurniture={placedFurniture} money={money} skills={skills} onUpgrade={handleUpgradeHousing} onBuyFurniture={handleBuyFurniture} dark={false} loading={loading}/>}
          {activeTab==="mapa"&&<MapaTab gt={gt} rels={rels} loc={loc} loading={loading} onGoTo={handleGoTo}/>}
          {activeTab==="diario"&&<DiarioTab log={log} gt={gt}/>}
        </div>

        {/* Tab bar pills */}
        <div style={{borderRadius:"14px",background:"#FFFFFF",border:"1px solid #E0D4C8",height:"46px",display:"flex",padding:"4px 6px",gap:"3px",boxShadow:"0 2px 8px rgba(0,0,0,0.05)"}}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)}
              style={{flex:1,border:"none",borderRadius:"10px",background:activeTab===t.id?"#F5A623":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all 0.15s",padding:0}}>
              <span style={{fontSize:activeTab===t.id?"19px":"17px",transition:"font-size 0.15s"}}>{t.emoji}</span>
            </button>
          ))}
        </div>

      </div>
    </div>
    </div>
  );
}
