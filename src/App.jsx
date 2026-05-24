import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════
// LORE
// ═══════════════════════════════════════════════════════════
const VELORIA_SYSTEM = `Sos el narrador de INBETWEENS, life simulation de texto en Veloria, ciudad pequeña a orillas del Lago Miren en Otherwhen.

MUNDO: Otherwhen es un mundo alternativo real. Los Twins creen que es el único mundo. Solo el jugador sabe que hay un "afuera".
VELORIA: ~40 habitantes. Fundada hace 400 años. Historia oficial: 12 fundadores. Verdad: fueron 13. El decimotercero fue borrado.
BARRIOS: La Vega (jóvenes, lofts), El Casco (familias antiguas, centro histórico), Ribera (lago, muelle), Veleta (teatro, biblioteca, bohemios), Los Prados (familias, jardines).

CULTURA: Encender vela al anochecer = buena suerte. Flores Velora = amor romántico máximo. Nunca cruzar el lago de noche solo. Té Miren = invitar a quedarse. Lumaven = sella amistades. El Lago recuerda todo.
GASTRONOMÍA: Mirenpez al Veloer, Pan Velin, Té Miren, Velorcitos, Lumaven, Sopa Noctuvel.
TWINÉS: Velin=Hola | Sora=Gracias | Miren=lago | Veloer=luz dorada del atardecer | Lunes=buenas noches | Kalei=te quiero | Sorvei=lo siento | Otreven=el otro lado | Luma=dinero | Belven=fiesta
LUCES (L): L1-3 café | L15-20 ropa/libro | L35-55 cena | L100 mueble | L1000 propiedad

CARRERAS: Arte (Teatro de Cael/Biblioteca) | Cocina (Restaurante de Nela) | Comercio (Plaza del Veloer) | Medicina (Consultorio de Bren) | Educación (Biblioteca) | Pesca (Muelle)

ROMANCE Y FAMILIA: Los Twins se enamoran, comprometen, casan, divorcian y tienen hijos. Las bodas se celebran en la Plaza del Veloer o frente al Lago. Los hijos heredan rasgos de sus padres. El divorcio existe pero es raro y doloroso.

NPCS (todos con vida propia):
- Aria Ven 26 La Vega: dueña del café, pragmática, acogedora. Soltera. Romanceable.
- Lior Veloer 19 La Vega: estudiante rebelde. SECRETO: investiga el Otreven. Romanceable.
- Oren Mirende 22 Ribera: pescador guía, aventurero, romántico. Romanceable.
- Nela Mirende 38 Ribera: restaurante del muelle, cálida, fuerte. Divorciada. Romanceable.
- Riven Lumaren 28 Ribera: gerente del banco. SECRETO: quiere ser músico. Romanceable.
- Vael Lumaren 24 Veleta: diseñadora ropa, creativa, impulsiva. Romanceable.
- Cael Sorvei 44 Veleta: director del teatro, dramático. SECRETO: amor imposible. Romanceable.
- Niven Sorvei 31 Veleta: pintora/tatuadora, intensa, directa. Romanceable.
- Luma Sorvei 20 Veleta: músico callejero, libre, alegre. Romanceable.
- Soren Lume 29 El Casco: librero introvertido, brillante. SECRETO: enamorado de Elowen. Romanceable.
- Ciro Orlen 25 Veleta: archivista. SECRETO NPC CLAVE: busca al 13er fundador. Romanceable.
- Elia Orlen 18 La Vega: universitaria, sociable, optimista. Romanceable.
- Iva Norven 23 Ribera: fotógrafa, observadora. Romanceable.
- Cela Miren 27 Los Prados: enfermera, empática. Romanceable.
- Tev Solan 21 La Vega: músico estudiante, alegre. Romanceable.
- Dael Miru 35 El Casco: chef, perfeccionista. Romanceable.
- Mira Belven 33 El Casco: organizadora eventos, energética. Romanceable.
- Rael Nora 38 Los Prados: veterinario, gentil, divorciado. Romanceable.
- Leva Sorin 44 Veleta: profesora historia. SECRETO NPC CLAVE: sospecha huecos en la historia de Veloria. Romanceable.
- Aldric Veloer 68 El Casco: autoridad moral. SECRETO NPC CLAVE. NO romanceable.
- Bren Orlen 49 Los Prados: médico. SECRETO NPC CLAVE: sabe que fueron 13 fundadores. NO romanceable.
- Elowen Sorvei 71 Veleta: escritora anciana. SECRETO NPC CLAVE: escribe sobre el Otreven. NO romanceable.
- Tomas Mirende 62 Ribera: pescador mayor. SECRETO: vio algo en el lago de noche. NO romanceable.
- Dora Velin 78 El Casco: la más anciana. SECRETO: conoció al Velista Mayor. NO romanceable.

SECRETO CENTRAL (NUNCA revelar directamente. Solo hint sutil si amistad con NPC clave >70): El 13er fundador cruzó al Otreven voluntariamente. La puerta sigue abierta. NPCs clave: Aldric Veloer, Bren Orlen, Ciro Orlen, Elowen Sorvei, Leva Sorin.

TONO: Cálido, literario, cozy. Segunda persona voseante. Español rioplatense. Twinés ocasional y natural. Párrafos cortos. Detalles sensoriales. Sin sentimentalismo forzado.`;

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
  walk_plaza:{diversion:15,social:8}, market:{diversion:10}, browse_books:{diversion:15}, buy_book:{diversion:10},
  fish:{diversion:25}, sit_lake:{diversion:22}, swim:{higiene:-10,diversion:35},
  secret_lake:{diversion:18,social:5}, walk_shore:{diversion:18},
  eat_dish:{hambre:60,diversion:25,social:8}, cena:{hambre:80,diversion:30,social:12},
  research:{diversion:15}, watch_show:{diversion:40,social:15},
  walk_park:{diversion:15}, picnic:{hambre:30,diversion:25}, checkup:{},
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
  arte:      {label:"Arte",      emoji:"🎨",places:["Teatro de Cael","Biblioteca"],      levels:["Aspirante","Artista","Artista reconocido","Maestro del Veleta"],   wages:[30,55,90,140], shiftH:6},
  cocina:    {label:"Cocina",    emoji:"🍳",places:["Restaurante de Nela"],               levels:["Ayudante","Cocinero","Chef","Chef ejecutivo"],                     wages:[25,45,80,130], shiftH:8},
  comercio:  {label:"Comercio",  emoji:"💼",places:["Plaza del Veloer"],                  levels:["Vendedor","Gerente","Director","Empresario"],                      wages:[35,60,100,160],shiftH:8},
  medicina:  {label:"Medicina",  emoji:"⚕️",places:["Consultorio de Bren"],               levels:["Practicante","Médico","Especialista","Jefe médico"],               wages:[40,70,110,170],shiftH:8},
  educacion: {label:"Educación", emoji:"📚",places:["Biblioteca"],                        levels:["Auxiliar","Docente","Profesor titular","Director"],                wages:[30,50,85,130], shiftH:6},
  pesca:     {label:"Pesca",     emoji:"🎣",places:["Muelle"],                            levels:["Aprendiz","Pescador","Pescador experto","Patrón del Lago"],        wages:[20,40,70,110], shiftH:5},
};
const ROMANCEABLE = new Set(["Aria Ven","Lior Veloer","Oren Mirende","Nela Mirende","Riven Lumaren","Vael Lumaren","Cael Sorvei","Niven Sorvei","Luma Sorvei","Soren Lume","Ciro Orlen","Elia Orlen","Iva Norven","Cela Miren","Tev Solan","Dael Miru","Mira Belven","Rael Nora","Leva Sorin"]);
const CALENDAR_EVENTS = {
  0: {name:"Día del Primer Brote",   emoji:"🌱",desc:"La tradición dice que hay que plantar algo hoy."},
  1: {name:"El Mercado Miren",        emoji:"⛵",desc:"El mercado flotante abre sobre el lago."},
  2: {name:"La Noche de los Nombres", emoji:"💌",desc:"Se revelan apodos cariñosos a personas queridas."},
  3: {name:"Las Aguas Abiertas",      emoji:"🏊",desc:"Gran celebración en Ribera: primer día de natación."},
  4: {name:"Velorfesta",              emoji:"✨",desc:"La celebración más importante de Veloria. Tres días de música y fuegos."},
  5: {name:"La Noche Larga",          emoji:"⭐",desc:"Los Twins hacen promesas bajo las estrellas."},
  6: {name:"La Cosecha",              emoji:"🌾",desc:"Festival en Las Llanuras Doradas. Gastronomía y concursos."},
  7: {name:"El Día del Recuerdo",     emoji:"🌊",desc:"Flores en el lago para los Twins que ya no están."},
  8: {name:"La Feria de los Clubs",   emoji:"🎪",desc:"Todos los clubs de Veloria abren sus puertas al público."},
  9: {name:"Los Nocturnos",           emoji:"🕯",desc:"Temporada de reuniones íntimas en casa. El frío une a los Twins."},
  10:{name:"El Hielo del Miren",      emoji:"⛸",desc:"El lago se congela. Los Twins patinen sobre el Miren."},
  11:{name:"La Víspera del Brote",    emoji:"🔥",desc:"Quemar lo viejo, guardar lo nuevo. A medianoche: Velin."},
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
const PROMO_SHIFTS = [5,10,15,20];

// ═══════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════
function toTimeStr(h) {
  const hour = ((h % 24)+24)%24, hh = Math.floor(hour), mm = Math.round((hour-hh)*60);
  return `${hh.toString().padStart(2,"0")}:${(mm>=60?0:mm).toString().padStart(2,"0")}`;
}
function relStatus(lv) {
  if(lv<10)return"Extraño"; if(lv<25)return"Conocido"; if(lv<50)return"Amigo"; if(lv<75)return"Amigo cercano"; return"Mejor amigo";
}
function clamp(v,mn=0,mx=100){return Math.max(mn,Math.min(mx,v));}

// ═══════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════
function NeedBar({needKey,value,dark}){
  const cfg=NEED_CFG[needKey], barColor=value<25?"#E05555":value<50?"#E8943A":cfg.color;
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
  const accent={intro:"#D4A853",story:"#7BB8B9",travel:"#A08060",system:"#6B5040",error:"#E05555",romance:"#E87B9E",work:"#6B9E5E",event:"#D4A853"};
  return(
    <div style={{marginBottom:"22px",paddingLeft:"14px",borderLeft:`2px solid ${accent[entry.type]||"#7BB8B9"}`}}>
      {entry.place&&<div style={{fontSize:"10px",color:"#A08060",marginBottom:"5px",letterSpacing:"0.08em",textTransform:"uppercase"}}>{entry.place}{entry.time?` · ${entry.time}`:""}</div>}
      <div style={{fontSize:"14px",lineHeight:"1.75",color:dark?"#EDE0CC":"#3D2B1F",fontFamily:"'Lora',Georgia,serif",whiteSpace:"pre-line"}}>{entry.text}</div>
      {entry.hint&&<div style={{marginTop:"10px",fontSize:"13px",color:"#E87B9E",fontStyle:"italic",fontFamily:"'Lora',serif"}}>✦ {entry.hint}</div>}
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
  const muted=dark?"#6B5040":"#A08060";
  const tc=dark?"#EDE0CC":"#3D2B1F";
  const border=dark?"#3D2B1F":"#E8D5B8";
  const sorted=Object.entries(rels).sort(([,a],[,b])=>(b.friendship||0)-(a.friendship||0));

  function getRomanceActions(npcName){
    const fr=(rels[npcName]?.friendship||0);
    const isPartner=family.partner===npcName;
    const acts=[];
    if(!isPartner&&!family.partner&&ROMANCEABLE.has(npcName)&&fr>40) acts.push({id:"ask_out",label:"💕 Invitar a salir",color:"#E87B9E"});
    if(isPartner&&family.romanticStatus==="dating"&&fr>65) acts.push({id:"propose",label:"💍 Proponer matrimonio",color:"#D4A853"});
    if(isPartner&&family.romanticStatus==="engaged") acts.push({id:"marry",label:"💒 Casarse",color:"#D4A853"});
    if(isPartner&&family.romanticStatus==="married") acts.push({id:"have_child",label:"👶 Tener un hijo",color:"#7BB8B9"});
    if(isPartner&&(family.romanticStatus==="dating"||family.romanticStatus==="engaged")) acts.push({id:"breakup",label:"💔 Terminar",color:"#E05555"});
    if(isPartner&&family.romanticStatus==="married") acts.push({id:"divorce",label:"💔 Separarse",color:"#E05555"});
    return acts;
  }

  const statusLabel={dating:"💕 En pareja con",engaged:"💍 Comprometido/a con",married:"💒 Casado/a con"};

  return(
    <div>
      {family.partner&&(
        <div style={{background:"rgba(232,123,158,0.08)",border:"1px solid rgba(232,123,158,0.25)",borderRadius:"8px",padding:"8px",marginBottom:"10px"}}>
          <div style={{fontSize:"9px",color:"#E87B9E",textTransform:"uppercase",letterSpacing:"0.1em",marginBottom:"2px"}}>{statusLabel[family.romanticStatus]||"💕"}</div>
          <div style={{fontSize:"12px",fontWeight:600,color:tc}}>{family.partner}</div>
        </div>
      )}
      {family.children.length>0&&(
        <div style={{marginBottom:"10px"}}>
          <div style={{fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:muted,marginBottom:"6px"}}>Hijos</div>
          {family.children.map((c,i)=>(
            <div key={i} style={{fontSize:"11px",color:dark?"#D4C4A0":"#5C4A32",marginBottom:"3px",lineHeight:"1.4"}}>
              👶 {c.name} · {Math.floor((currentDay-c.birthDay)/30)} años<br/>
              <span style={{fontSize:"9px",color:muted}}>{c.traits.slice(0,2).join(", ")}</span>
            </div>
          ))}
        </div>
      )}
      <div style={{fontSize:"9px",letterSpacing:"0.12em",textTransform:"uppercase",color:muted,marginBottom:"8px"}}>NPCs conocidos ({sorted.length})</div>
      {sorted.length===0&&<div style={{fontSize:"11px",color:muted,fontStyle:"italic",lineHeight:"1.5"}}>Todavía no conocés a nadie en Veloria. Salí y hablá con los Twins.</div>}
      {sorted.map(([npcName,rel])=>{
        const isSel=sel===npcName, isPartner=family.partner===npcName;
        const romActs=getRomanceActions(npcName);
        return(
          <div key={npcName} style={{marginBottom:"5px"}}>
            <button onClick={()=>setSel(isSel?null:npcName)} style={{width:"100%",padding:"5px 8px",borderRadius:"6px",textAlign:"left",border:isSel?`1px solid rgba(212,168,83,0.5)`:`1px solid ${border}`,background:isSel?"rgba(212,168,83,0.06)":"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
              <span style={{fontSize:"11px",color:dark?"#D4C4A0":"#5C4A32",fontWeight:500}}>{isPartner?"💕 ":""}{npcName}</span>
              <span style={{fontSize:"9px",color:muted}}>{relStatus(rel.friendship||0)}</span>
            </button>
            {isSel&&(
              <div style={{padding:"6px 8px",background:dark?"rgba(255,255,255,0.02)":"rgba(212,168,83,0.04)",borderRadius:"0 0 6px 6px",borderTop:"none"}}>
                <div style={{marginBottom:"6px"}}>
                  <div style={{fontSize:"9px",color:muted,marginBottom:"2px"}}>Amistad {Math.round(rel.friendship||0)}/100</div>
                  <div style={{height:"4px",background:dark?"#3D2B1F":"#E8D5B8",borderRadius:"2px",overflow:"hidden"}}>
                    <div style={{height:"100%",width:`${rel.friendship||0}%`,background:"#7BB8B9",transition:"width 0.5s"}}/>
                  </div>
                </div>
                {romActs.map(ra=>(
                  <button key={ra.id} disabled={loading} onClick={()=>{setSel(null);onRomanceAction(ra.id,npcName);}} style={{display:"block",width:"100%",marginTop:"4px",padding:"4px 8px",fontSize:"10px",borderRadius:"5px",border:`1px solid ${ra.color}`,background:"transparent",color:ra.color,cursor:loading?"not-allowed":"pointer",textAlign:"left"}}>
                    {ra.label}
                  </button>
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
  const muted=dark?"#6B5040":"#A08060";
  const border=dark?"#3D2B1F":"#E8D5B8";
  if(!career){
    return(
      <div>
        <div style={{fontSize:"10px",color:muted,marginBottom:"12px",lineHeight:"1.5"}}>Todavía no tenés trabajo. Elegí una carrera para empezar en Veloria.</div>
        {Object.entries(CAREERS).map(([id,c])=>(
          <button key={id} onClick={()=>onApply(id)} disabled={loading} style={{display:"flex",alignItems:"center",gap:"8px",width:"100%",padding:"8px",marginBottom:"5px",borderRadius:"7px",border:`1px solid ${border}`,background:"transparent",color:dark?"#D4C4A0":"#5C4A32",cursor:loading?"not-allowed":"pointer",opacity:loading?0.4:1,textAlign:"left",transition:"all 0.12s"}}
            onMouseEnter={e=>{if(!loading){e.currentTarget.style.borderColor="#6B9E5E";e.currentTarget.style.color="#6B9E5E";}}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor=border;e.currentTarget.style.color=dark?"#D4C4A0":"#5C4A32";}}>
            <span style={{fontSize:"18px"}}>{c.emoji}</span>
            <div>
              <div style={{fontSize:"12px",fontWeight:500}}>{c.label}</div>
              <div style={{fontSize:"10px",color:muted}}>Desde L{c.wages[0]}/turno · {c.shiftH}h</div>
            </div>
          </button>
        ))}
      </div>
    );
  }
  const c=CAREERS[career.track];
  const isAtWorkplace=c.places.includes(loc.place);
  const progress=career.level>=3?100:Math.min(100,(career.shiftsWorked%PROMO_SHIFTS[career.level])/PROMO_SHIFTS[career.level]*100);
  const progressLabel=career.level>=3?"Nivel máximo":`${career.shiftsWorked%PROMO_SHIFTS[career.level]}/${PROMO_SHIFTS[career.level]} turnos para ascenso`;
  return(
    <div>
      <div style={{background:"rgba(107,158,94,0.08)",border:"1px solid rgba(107,158,94,0.25)",borderRadius:"8px",padding:"10px",marginBottom:"12px"}}>
        <div style={{fontSize:"18px",marginBottom:"3px"}}>{c.emoji}</div>
        <div style={{fontSize:"12px",fontWeight:600,color:"#6B9E5E"}}>{c.levels[career.level]}</div>
        <div style={{fontSize:"10px",color:muted}}>{c.label} · L{c.wages[career.level]}/turno</div>
        <div style={{fontSize:"10px",color:muted}}>Turnos trabajados: {career.shiftsWorked}</div>
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
  const [step,setStep]=useState(0);
  const [name,setName]=useState("");
  const [traits,setTraits]=useState([]);
  const [aspiration,setAspiration]=useState("");
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
        {step===0&&(
          <div>
            <div style={{color:"#D4A853",fontFamily:"'Lora',serif",fontSize:"20px",marginBottom:"6px"}}>¿Cuál es tu nombre, Twin?</div>
            <div style={{color:"#6B5040",fontSize:"12px",marginBottom:"22px"}}>Este nombre te seguirá por toda Veloria.</div>
            <input value={name} onChange={e=>setName(e.target.value)} onKeyDown={e=>e.key==="Enter"&&next()} placeholder="Tu nombre..." style={{width:"100%",padding:"12px 16px",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(212,168,83,0.35)",borderRadius:"8px",color:"#FDF6E9",fontSize:"20px",fontFamily:"'Lora',serif",outline:"none"}}/>
          </div>
        )}
        {step===1&&(
          <div>
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
          </div>
        )}
        {step===2&&(
          <div>
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
          </div>
        )}
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
  const [phase,setPhase]         =useState("creation");
  const [twin,setTwin]           =useState(null);
  const [needs,setNeeds]         =useState({hambre:75,sueno:80,higiene:80,social:50,diversion:55,vejiga:70});
  const [money,setMoney]         =useState(250);
  const [gt,setGt]               =useState({hour:8,day:1,monthIdx:0});
  const [loc,setLoc]             =useState({hood:"La Vega",place:"Tu apartamento"});
  const [rels,setRels]           =useState({});
  const [career,setCareer]       =useState(null);
  const [family,setFamily]       =useState({partner:null,romanticStatus:null,children:[]});
  const [log,setLog]             =useState([]);
  const [loading,setLoading]     =useState(false);
  const [sideTab,setSideTab]     =useState("estado");
  const [namingChild,setNamingChild]=useState(false);
  const [childNameInput,setChildNameInput]=useState("");
  const logEnd=useRef(null);

  const scrollLog=()=>logEnd.current?.scrollIntoView({behavior:"smooth"});
  const addEntry=e=>setLog(prev=>[...prev,{id:Date.now()+Math.random(),...e}]);

  const tick=(hours,changes={})=>{
    setNeeds(prev=>({
      hambre:   clamp(prev.hambre   -hours*4  +(changes.hambre   ||0)),
      sueno:    clamp(prev.sueno    -hours*3  +(changes.sueno    ||0)),
      higiene:  clamp(prev.higiene  -hours*1.5+(changes.higiene  ||0)),
      social:   clamp(prev.social   -hours*2  +(changes.social   ||0)),
      diversion:clamp(prev.diversion-hours*2.5+(changes.diversion||0)),
      vejiga:   clamp(prev.vejiga   -hours*8  +(changes.vejiga   ||0)),
    }));
    setGt(prev=>{
      const total=prev.hour+hours, daysGained=Math.floor(total/24), newDay=prev.day+daysGained;
      const monthDelta=Math.floor(newDay/30)-Math.floor(prev.day/30);
      return{hour:total%24,day:newDay,monthIdx:clamp(prev.monthIdx+monthDelta,0,11)};
    });
    setTimeout(scrollLog,100);
  };

  async function callAI(actionDesc,npc=null){
    const relStr=Object.entries(rels).map(([n,v])=>`${n}:${relStatus(v.friendship||0)}(${v.friendship||0}/100)`).join(",")||"ninguna";
    const carStr=career?`${CAREERS[career.track].label}—${CAREERS[career.track].levels[career.level]},L${CAREERS[career.track].wages[career.level]}/turno`:"Sin trabajo";
    const famStr=family.partner?`Pareja:${family.partner}(${family.romanticStatus}),hijos:${family.children.map(c=>`${c.name}(${Math.floor((gt.day-c.birthDay)/30)}a)`).join(",")||"ninguno"}`:"Soltero/a";
    const ev=CALENDAR_EVENTS[gt.monthIdx];
    const prompt=`${VELORIA_SYSTEM}

TWIN: ${twin?.name} | Rasgos:${twin?.traits?.join(",")} | Aspiración:${twin?.aspiration}
Necesidades:${Object.entries(needs).map(([k,v])=>`${k}:${Math.round(v)}`).join("|")}
Dinero:L${money} | Tiempo:${toTimeStr(gt.hour)} Día${gt.day} ${MONTHS[gt.monthIdx]} ${SEASONS[gt.monthIdx]}
Ubicación:${loc.hood}→${loc.place} | Carrera:${carStr} | Familia:${famStr}
Relaciones:${relStr} | Evento del mes:${ev?.name||"ninguno"}

ACCIÓN:"${actionDesc}"${npc?` (NPC:${npc})`:""}

Respondé SOLO JSON válido sin markdown:
{"narrative":"2-3 párrafos voseantes rioplatenses, cálidos, literarios. Si hay NPC incluí diálogo corto natural.","needChanges":{},"moneyChange":0,"relChange":{},"hint":null}
relChange: si hay NPC SIEMPRE incluí al menos +5 para ese NPC. Max +15/interacción.
hint: null, excepto NPC clave con amistad>70 → pista MUY sutil de 1 línea sobre el Otreven.`;
    const res=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,messages:[{role:"user",content:prompt}]})});
    const data=await res.json();
    const raw=data.content?.[0]?.text||"{}";
    try{return JSON.parse(raw.replace(/```json|```/g,"").trim());}
    catch{return{narrative:raw,needChanges:{},moneyChange:0,relChange:{},hint:null};}
  }

  async function handleStart(twinData){
    setTwin(twinData);setPhase("playing");setLoading(true);
    try{
      const r=await callAI(`Primera mañana de ${twinData.name} en Veloria. Recién llegó a su apartamento en La Vega. Rasgos:${twinData.traits.join(",")}. Aspiración:${twinData.aspiration}. Describí la llegada: el apartamento, la vista de la ciudad, el olor del barrio, la emoción del comienzo.`);
      addEntry({text:r.narrative,type:"intro",place:"Tu apartamento",time:"08:00"});
    }catch{
      addEntry({text:`La luz del Veloer filtra entre las cortinas de tu nuevo apartamento en La Vega.\n\nAbajo, el barrio despierta. Alguien hace café dos pisos más abajo. A lo lejos, entre los techos, brillan las aguas quietas del Lago Miren.\n\n*Velin*, pensás. Bienvenido.`,type:"intro",place:"Tu apartamento",time:"08:00"});
    }
    setLoading(false);
  }

  async function handleAction(action){
    if(loading)return;
    const cost=action.cost||0;
    if(money<cost){addEntry({text:`No tenés suficientes Luces (necesitás L${cost}).`,type:"system"});return;}
    setLoading(true);
    try{
      const r=await callAI(`${action.label} en ${loc.place}`,action.npc||null);
      const base=BASE_EFFECTS[action.id]||{}, merged={...base};
      for(const[k,v]of Object.entries(r.needChanges||{}))merged[k]=(merged[k]||0)+v;
      tick(action.time||0.5,merged);
      if(cost>0)setMoney(m=>m-cost);
      if(r.moneyChange)setMoney(m=>m+r.moneyChange);
      if(r.relChange){
        setRels(prev=>{
          const n={...prev};
          for(const[npc,d]of Object.entries(r.relChange))n[npc]={friendship:clamp((n[npc]?.friendship||0)+d)};
          return n;
        });
      }
      addEntry({text:r.narrative,type:"story",place:loc.place,time:toTimeStr(gt.hour+action.time),hint:r.hint});
    }catch{addEntry({text:"Algo interrumpió el momento...",type:"error"});}
    setLoading(false);
  }

  async function handleWork(){
    if(!career||loading)return;
    const c=CAREERS[career.track], wage=c.wages[career.level];
    setLoading(true);
    try{
      const r=await callAI(`Turno de trabajo de ${twin?.name} como ${c.levels[career.level]} en ${c.label}. ${career.shiftsWorked} turnos anteriores. Describí un momento del turno: una anécdota, un cliente, un colega, algo memorable.`);
      tick(c.shiftH,BASE_EFFECTS["work_shift"]||{});
      setMoney(m=>m+wage);
      const newShifts=career.shiftsWorked+1;
      const newLevel=career.level<3&&newShifts%PROMO_SHIFTS[career.level]===0?career.level+1:career.level;
      const promoted=newLevel>career.level;
      setCareer(prev=>({...prev,shiftsWorked:newShifts,level:newLevel}));
      const text=promoted?r.narrative+`\n\n✦ ¡Ascenso! Ahora sos ${c.levels[newLevel]} en ${c.label}.`:r.narrative;
      addEntry({text,type:"work",place:loc.place,time:toTimeStr(gt.hour+c.shiftH)});
    }catch{addEntry({text:"El turno terminó.",type:"work"});}
    setLoading(false);
  }

  async function handleApplyJob(trackId){
    if(loading)return;
    const c=CAREERS[trackId];setLoading(true);
    try{
      const r=await callAI(`${twin?.name} aplica para trabajar en ${c.label} en Veloria. Una conversación o entrevista. Consigue el trabajo como ${c.levels[0]}.`);
      setCareer({track:trackId,level:0,shiftsWorked:0});
      addEntry({text:r.narrative,type:"work",place:loc.place,time:toTimeStr(gt.hour+1)});
    }catch{
      setCareer({track:trackId,level:0,shiftsWorked:0});
      addEntry({text:`Empezás como ${c.levels[0]} en ${c.label}.`,type:"work"});
    }
    setLoading(false);
  }

  async function handleEventAttend(){
    const ev=CALENDAR_EVENTS[gt.monthIdx];
    if(!ev||loading)return;setLoading(true);
    try{
      const r=await callAI(`${twin?.name} participa en ${ev.name}. ${ev.desc} Describí la experiencia: el ambiente de Veloria, los Twins que hay, colores, sonidos, cómo se siente.`);
      tick(3,BASE_EFFECTS["event_attend"]||{});
      addEntry({text:r.narrative,type:"event",place:loc.place,time:toTimeStr(gt.hour+3),hint:r.hint});
    }catch{addEntry({text:`Participaste en ${ev.name}.`,type:"event"});}
    setLoading(false);
  }

  async function handleRomanceAction(type,npcName){
    if(loading)return;
    if(type==="have_child"){setNamingChild(true);setChildNameInput("");return;}
    setLoading(true);
    const descs={
      ask_out:`${twin?.name} le pide salir a ${npcName}. Un momento íntimo y nervioso. ${npcName} acepta con emoción.`,
      propose:`${twin?.name} le propone matrimonio a ${npcName}. Escena conmovedora. ${npcName} dice que sí.`,
      marry:`${twin?.name} y ${npcName} se casan en Veloria. Una ceremonia hermosa y emotiva. Describila con detalle.`,
      breakup:`${twin?.name} termina la relación con ${npcName}. Una escena honesta y dolorosa pero necesaria.`,
      divorce:`${twin?.name} y ${npcName} se separan. Una ruptura dura. Describí el peso del momento.`,
    };
    try{
      const r=await callAI(descs[type],npcName);
      const positive=type==="ask_out"||type==="propose"||type==="marry";
      tick(1,positive?{social:20,diversion:25}:{social:-25,diversion:-20});
      if(type==="ask_out") setFamily(f=>({...f,partner:npcName,romanticStatus:"dating"}));
      else if(type==="propose") setFamily(f=>({...f,romanticStatus:"engaged"}));
      else if(type==="marry") setFamily(f=>({...f,romanticStatus:"married"}));
      else if(type==="breakup"||type==="divorce"){
        setFamily(f=>({...f,partner:null,romanticStatus:null}));
        setRels(prev=>({...prev,[npcName]:{friendship:clamp((prev[npcName]?.friendship||0)-20)}}));
      }
      addEntry({text:r.narrative,type:"romance",place:loc.place,time:toTimeStr(gt.hour+1)});
    }catch{addEntry({text:"Algo interrumpió el momento.",type:"error"});}
    setLoading(false);
  }

  async function handleHaveChild(){
    const name=childNameInput.trim();if(!name)return;
    setNamingChild(false);setLoading(true);
    const partnerTraits=NPC_TRAITS_MAP[family.partner]||["curioso","alegre","cálido"];
    const pool=[...new Set([...(twin?.traits||[]),...partnerTraits])].sort(()=>0.5-Math.random());
    const childTraits=pool.slice(0,3);
    const newChild={name,birthDay:gt.day,traits:childTraits,otherParent:family.partner};
    try{
      const r=await callAI(`${twin?.name} y ${family.partner} tienen un hijo/a llamado/a ${name}. Rasgos heredados:${childTraits.join(",")}. Describí el nacimiento con calidez y emoción. Un momento que Veloria entera celebra.`);
      tick(0,{social:30,diversion:20});
      setFamily(f=>({...f,children:[...f.children,newChild]}));
      addEntry({text:r.narrative,type:"intro",place:"Tu apartamento",time:toTimeStr(gt.hour)});
    }catch{
      setFamily(f=>({...f,children:[...f.children,newChild]}));
      addEntry({text:`${name} llega al mundo de Veloria.`,type:"intro",place:"Tu apartamento"});
    }
    setLoading(false);
  }

  async function handleGoTo(hood,place){
    if(loading||(loc.hood===hood&&loc.place===place))return;
    setLoc({hood,place});setLoading(true);
    try{
      const travelH=loc.hood!==hood?0.5:0.2;
      const r=await callAI(`${twin?.name} llega a ${place} en ${hood}.`);
      tick(travelH,{});
      addEntry({text:r.narrative,type:"travel",place,time:toTimeStr(gt.hour+travelH)});
    }catch{addEntry({text:`Llegás a ${place}.`,type:"travel",place});}
    setLoading(false);
  }

  if(phase==="creation")return<CreationScreen onStart={handleStart}/>;

  const dark=gt.hour>=21||gt.hour<6;
  const hoodData=NEIGHBORHOODS[loc.hood]||{};
  const hoodColor=hoodData.color||"#D4A853";
  const bg=dark?"#120D07":"#FDF6E9", panelBg=dark?"#1C1208":"#FAF0DC";
  const border=dark?"#2C1F14":"#E8D5B8", muted=dark?"#6B5040":"#A08060";

  const isAtWorkplace=career&&CAREERS[career.track]?.places.includes(loc.place);
  const workBtn=isAtWorkplace?[{id:"_work",label:`💼 Trabajar turno (+L${CAREERS[career.track].wages[career.level]})`,time:CAREERS[career.track].shiftH,isWork:true}]:[];
  const displayActions=[...workBtn,...(PLACE_ACTIONS[loc.place]||[])];

  const SIDE_TABS=[{id:"estado",emoji:"🎮",label:"Estado"},{id:"relaciones",emoji:"💬",label:"Relaciones"},{id:"trabajo",emoji:"💼",label:"Trabajo"}];
  const currentEvent=CALENDAR_EVENTS[gt.monthIdx];

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100vh",background:bg,fontFamily:"'DM Sans',sans-serif",color:dark?"#EDE0CC":"#3D2B1F",overflow:"hidden",transition:"background 2s"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');*{box-sizing:border-box}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:transparent}::-webkit-scrollbar-thumb{background:rgba(212,168,83,0.35);border-radius:2px}button{font-family:inherit}`}</style>

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

      {/* HEADER */}
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"9px 18px",borderBottom:`1px solid ${border}`,background:panelBg,flexShrink:0}}>
        <div>
          <span style={{fontFamily:"'Lora',serif",fontSize:"15px",color:"#D4A853"}}>{twin?.name}</span>
          <span style={{fontSize:"10px",color:muted,marginLeft:"7px"}}>{twin?.traits?.join(" · ")}</span>
        </div>
        <div style={{textAlign:"center"}}>
          <div style={{fontFamily:"'Lora',serif",fontSize:"17px",color:dark?"#7BB8B9":"#D4A853"}}>{toTimeStr(gt.hour)}</div>
          <div style={{fontSize:"9px",color:muted,letterSpacing:"0.03em"}}>Día {gt.day} · {MONTHS[gt.monthIdx]} · {SEASONS[gt.monthIdx]}</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"13px",color:"#D4A853",fontWeight:600}}>✦ L {money}</div>
          <div style={{fontSize:"9px",color:muted}}>{career?CAREERS[career.track].levels[career.level]:"Sin trabajo"}{family.partner?` · ${family.partner.split(" ")[0]} 💕`:""}</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{display:"flex",flex:1,overflow:"hidden"}}>
        {/* NARRATIVE */}
        <div style={{flex:1,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{padding:"5px 18px",fontSize:"10px",color:hoodColor,borderBottom:`1px solid ${border}`,letterSpacing:"0.1em",textTransform:"uppercase",flexShrink:0}}>
            📍 {loc.hood} → {loc.place}
          </div>
          <div style={{flex:1,overflowY:"auto",padding:"20px 22px"}}>
            {log.map(e=><NarrativeBlock key={e.id} entry={e} dark={dark}/>)}
            {loading&&<div style={{color:"#D4A853",fontSize:"13px",opacity:0.6,fontStyle:"italic",fontFamily:"'Lora',serif"}}>✦ Veloria responde…</div>}
            <div ref={logEnd}/>
          </div>
        </div>

        {/* SIDEBAR */}
        <div style={{width:"220px",borderLeft:`1px solid ${border}`,display:"flex",flexDirection:"column",background:panelBg,flexShrink:0}}>
          <div style={{display:"flex",borderBottom:`1px solid ${border}`,flexShrink:0}}>
            {SIDE_TABS.map(t=>(
              <button key={t.id} onClick={()=>setSideTab(t.id)} style={{flex:1,padding:"7px 2px",fontSize:"9px",border:"none",borderBottom:sideTab===t.id?`2px solid ${hoodColor}`:"2px solid transparent",background:"transparent",color:sideTab===t.id?hoodColor:muted,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",transition:"color 0.15s"}}>
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

      {/* FOOTER */}
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
              onMouseEnter={e=>{if(!loading){e.currentTarget.style.background=a.isWork?"#6B9E5E":hoodColor;e.currentTarget.style.color="#FDF6E9";e.currentTarget.style.borderColor=a.isWork?"#6B9E5E":hoodColor;}}}
              onMouseLeave={e=>{e.currentTarget.style.background=a.isWork?"rgba(107,158,94,0.1)":"transparent";e.currentTarget.style.color=a.isWork?"#6B9E5E":dark?"#C4A87A":"#5C4A32";e.currentTarget.style.borderColor=a.isWork?"#6B9E5E":dark?"#3D2B1F":"#D4C4A0";}}>
              {a.label}
              {a.cost&&<span style={{fontSize:"9px",opacity:0.6}}>L{a.cost}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
