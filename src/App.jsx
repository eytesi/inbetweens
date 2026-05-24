import { useState, useRef, useEffect } from "react";

// ═══════════════════════════════════════════════
// LORE CONTEXT
// ═══════════════════════════════════════════════
const VELORIA_SYSTEM = `Sos el narrador de INBETWEENS, un life simulation de texto ambientado en Veloria, ciudad pequeña y cálida a orillas del Lago Miren en el mundo de Otherwhen.

MUNDO: Otherwhen es un mundo alternativo real. Los Twins (habitantes) creen que es el único mundo. Solo el jugador sabe que existe un "afuera". No es fantasía ni ciencia ficción.

VELORIA: Ciudad de ~40 habitantes. Fundada hace 400 años. Historia oficial: 12 fundadores. Verdad: fueron 13. El decimotercero fue borrado deliberadamente de todos los registros.

BARRIOS:
- La Vega: lofts modernos, huertos urbanos, jóvenes recién llegados
- El Casco: centro histórico, plaza, mercado, familias antiguas, negocios establecidos
- Ribera: zona del lago, muelle, restaurantes, ambiente costero, artistas
- Veleta: teatro, biblioteca, galerías, el barrio más bohemio
- Los Prados: casas con jardín, parques, barrio familiar y tranquilo

CULTURA Y CREENCIAS:
- Encender una vela al anochecer trae buena suerte
- Regalar flores Velora = la máxima expresión de amor romántico
- Nunca cruzar el lago de noche en soledad
- Ofrecer Té Miren a alguien = invitarlo a quedarse
- Brindar con Lumaven sella una amistad para siempre
- El Lago Miren "recuerda" todo lo que cae en sus aguas; si le contás un secreto en voz alta, lo guarda para siempre

GASTRONOMÍA: Mirenpez al Veloer (plato emblema), Pan Velin, Té Miren, Velorcitos (pasteles de miel), Lumaven (bebida fermentada festiva), Sopa Noctuvel (invierno)

TWINÉS (usar ocasionalmente con naturalidad):
Velin = Hola/Bienvenido | Sora = Gracias | Miren = Lago/agua tranquila | Veloer = luz dorada del atardecer | Twin = persona | Lunes = buenas noches | Kalei = te quiero/te aprecio | Sorvei = lo siento/perdón | Otreven = el otro lado/lo desconocido | Luma = dinero (coloquial) | Belven = fiesta

MONEDA - LUCES (L): L1-3 café/snack | L15-20 libro/ropa básica | L35-55 cena restaurant | L100 mueble | L1000 propiedad

NPCS PRINCIPALES:
- Aria Ven, 26, La Vega: dueña del café, pragmática, acogedora, observadora silenciosa. Soltera.
- Lior Veloer, 19, La Vega: estudiante rebelde, no quiere ser un Veloer. SECRETO: investiga el Otreven en secreto.
- Oren Mirende, 22, Ribera: pescador y guía del lago, aventurero, romántico, libre. Soltero.
- Nela Mirende, 38, Ribera: dueña del restaurante del muelle, cálida, fuerte, el corazón de Ribera. Divorciada.
- Tomas Mirende, 62, Ribera: pescador mayor, tranquilo, filosófico. SECRETO: una vez vio algo en el lago de noche que nunca contó a nadie.
- Ciro Orlen, 25, Veleta: archivista de la biblioteca, callado, meticuloso, obsesionado con el pasado. SECRETO: busca pruebas del 13er fundador sin saber que su propia familia las tiene.
- Elowen Sorvei, 71, Veleta: escritora anciana, misteriosa, generosa, ve cosas que otros no ven. SECRETO: está escribiendo un libro sobre el Otreven basado en hechos reales.
- Cael Sorvei, 44, Veleta: director del teatro, dramático, apasionado. SECRETO: lleva años enamorado de alguien que no puede tener.
- Niven Sorvei, 31, Veleta: pintora y tatuadora, intensa, directa, difícil de conquistar. Soltera.
- Soren Lume, 29, El Casco: librero introvertido, brillante, abierto cuando confía. SECRETO: enamorado de Elowen Sorvei desde los 18 años.
- Aldric Veloer, 68, El Casco: figura de autoridad moral de Veloria, sabio, melancólico, guardián del lore. SECRETO: sabe algo sobre el Otreven que nunca ha contado a nadie. NPC CLAVE.
- Bren Orlen, 49, Los Prados: médico del pueblo, sereno, confiable, sabe demasiado. SECRETO: sabe que los fundadores fueron 13. NPC CLAVE.
- Dora Velin, 78, El Casco: jubilada, la Twin más anciana, memoria prodigiosa, humor seco. SECRETO: dice haber conocido al Velista Mayor en persona.
- Riven Lumaren, 28, Ribera: gerente del banco familiar, encantador, generoso. SECRETO: quiere abandonarlo todo y ser músico.

SECRETO CENTRAL (NUNCA revelar directamente. Solo pistas MUY sutiles si relación con NPC clave >70):
El decimotercero fundador no murió ni desapareció: cruzó al Otreven voluntariamente. Y la puerta sigue abierta. Los 5 NPCs que conocen la verdad: Aldric Veloer, Bren Orlen, Ciro Orlen, Elowen Sorvei, Leva Sorin.

TONO: Narrativa cálida, literaria, cozy. Segunda persona voseante ("Caminás hacia...", "El sol te da en la cara...", "Sentís el olor..."). Español rioplatense natural. Twinés ocasional, integrado con fluidez, nunca forzado. Párrafos cortos. Detalles sensoriales concretos. Nada de sentimentalismo forzado.`;

// ═══════════════════════════════════════════════
// STATIC DATA
// ═══════════════════════════════════════════════
const TRAITS = [
  { id: "creativo",     label: "Creativo",     emoji: "🎨", desc: "Bonus en hobbies artísticos" },
  { id: "sociable",     label: "Sociable",     emoji: "💬", desc: "Relaciones se profundizan más rápido" },
  { id: "introvertido", label: "Introvertido", emoji: "📚", desc: "Se recarga solo, bonus en casa" },
  { id: "ambicioso",    label: "Ambicioso",    emoji: "⭐", desc: "Prioriza trabajo y ascensos" },
  { id: "empatico",     label: "Empático",     emoji: "💛", desc: "Las relaciones se afianzan más" },
  { id: "hogareno",     label: "Hogareño",     emoji: "🏠", desc: "Bonus en cocina y decoración" },
  { id: "romantico",    label: "Romántico",    emoji: "🌸", desc: "El amor lo afecta más profundamente" },
  { id: "aventurero",   label: "Aventurero",   emoji: "🌿", desc: "Bonus en exploración y naturaleza" },
];

const ASPIRATIONS = [
  { id: "familia",    label: "Fundador de familia", emoji: "👨‍👩‍👧", desc: "Crear un hogar y un legado duradero en Veloria" },
  { id: "artista",    label: "Artista",             emoji: "🎭", desc: "Dejar tu huella creativa en la ciudad" },
  { id: "empresario", label: "Empresario",          emoji: "💼", desc: "Construir riqueza y reputación" },
  { id: "alma",       label: "Alma del pueblo",     emoji: "🌟", desc: "Conocer a cada Twin de Veloria" },
];

const NEIGHBORHOODS = {
  "La Vega":    { emoji: "🏙", color: "#7BB8B9", places: ["Tu apartamento", "Café de Aria"] },
  "El Casco":   { emoji: "🏛", color: "#D4A853", places: ["Plaza del Veloer", "Librería de Soren"] },
  "Ribera":     { emoji: "⛵", color: "#4A8B8C", places: ["Muelle", "Restaurante de Nela", "Lago Miren"] },
  "Veleta":     { emoji: "🎭", color: "#A08060", places: ["Biblioteca", "Teatro de Cael"] },
  "Los Prados": { emoji: "🌳", color: "#6B9E5E", places: ["Parque", "Consultorio de Bren"] },
};

const PLACE_ACTIONS = {
  "Tu apartamento":      [
    { id: "sleep",    label: "🌙 Dormir",          time: 8   },
    { id: "cook",     label: "🍳 Cocinar",          time: 1   },
    { id: "shower",   label: "🚿 Ducharse",         time: 0.5 },
    { id: "bathroom", label: "🚽 Baño",             time: 0.1 },
    { id: "hobby",    label: "🎨 Practicar hobbie", time: 2   },
    { id: "rest",     label: "🛋 Descansar",        time: 1   },
  ],
  "Café de Aria":        [
    { id: "coffee",    label: "☕ Tomar café",         time: 1, cost: 3 },
    { id: "chat_npc",  label: "💬 Charlar con Aria",   time: 1, npc: "Aria Ven" },
    { id: "read_cafe", label: "📖 Leer",               time: 2 },
    { id: "observe",   label: "👁 Observar el barrio", time: 1 },
  ],
  "Plaza del Veloer":    [
    { id: "walk_plaza", label: "🚶 Pasear por la plaza",  time: 1 },
    { id: "market",     label: "🛒 Explorar el mercado",  time: 1 },
    { id: "chat_npc",   label: "💬 Hablar con Aldric",    time: 1, npc: "Aldric Veloer" },
  ],
  "Librería de Soren":   [
    { id: "browse_books", label: "📚 Explorar libros",    time: 1 },
    { id: "chat_npc",     label: "💬 Hablar con Soren",   time: 1, npc: "Soren Lume" },
    { id: "buy_book",     label: "📘 Comprar un libro",   time: 0.5, cost: 15 },
  ],
  "Muelle":              [
    { id: "fish",     label: "🎣 Pescar",              time: 3 },
    { id: "chat_npc", label: "⛵ Hablar con Oren",      time: 1, npc: "Oren Mirende" },
    { id: "sit_lake", label: "🌊 Contemplar el lago",  time: 1 },
  ],
  "Restaurante de Nela": [
    { id: "eat_dish", label: "🐟 Mirenpez al Veloer", time: 1.5, cost: 35 },
    { id: "chat_npc", label: "💬 Charlar con Nela",   time: 1,   npc: "Nela Mirende" },
    { id: "cena",     label: "🍷 Cena completa",       time: 2,   cost: 55 },
  ],
  "Lago Miren":          [
    { id: "swim",        label: "🏊 Nadar en el lago",              time: 2   },
    { id: "secret_lake", label: "🌊 Contarle un secreto al lago",   time: 0.5 },
    { id: "walk_shore",  label: "🌅 Caminar por la orilla",         time: 1   },
  ],
  "Biblioteca":          [
    { id: "research", label: "📜 Investigar historia de Veloria", time: 2 },
    { id: "chat_npc", label: "📖 Hablar con Ciro",                time: 1, npc: "Ciro Orlen" },
    { id: "read_lib", label: "📚 Leer en silencio",               time: 2 },
  ],
  "Teatro de Cael":      [
    { id: "watch_show", label: "🎭 Ver una obra",        time: 2.5, cost: 25 },
    { id: "chat_npc",   label: "🎬 Hablar con Cael",     time: 1,   npc: "Cael Sorvei" },
  ],
  "Parque":              [
    { id: "walk_park", label: "🌳 Caminar entre los árboles", time: 1 },
    { id: "picnic",    label: "🧺 Picnic al sol",              time: 2 },
  ],
  "Consultorio de Bren": [
    { id: "checkup",  label: "⚕️ Consulta médica",  time: 1, cost: 40 },
    { id: "chat_npc", label: "💊 Conversar con Bren", time: 1, npc: "Bren Orlen" },
  ],
};

const BASE_EFFECTS = {
  sleep:       { sueno: 70, hambre: -15, vejiga: -20 },
  cook:        { hambre: 45, diversion: 10 },
  shower:      { higiene: 55 },
  bathroom:    { vejiga: 90 },
  rest:        { sueno: 15, diversion: 8 },
  hobby:       { diversion: 35 },
  coffee:      { hambre: 8, diversion: 12 },
  read_cafe:   { diversion: 20 },
  read_lib:    { diversion: 20 },
  observe:     { diversion: 10, social: 5 },
  walk_plaza:  { diversion: 15, social: 8 },
  market:      { diversion: 10 },
  browse_books:{ diversion: 15 },
  buy_book:    { diversion: 10 },
  fish:        { diversion: 25 },
  sit_lake:    { diversion: 22 },
  swim:        { higiene: -10, diversion: 35 },
  secret_lake: { diversion: 18, social: 5 },
  walk_shore:  { diversion: 18 },
  eat_dish:    { hambre: 60, diversion: 25, social: 8 },
  cena:        { hambre: 80, diversion: 30, social: 12 },
  research:    { diversion: 15 },
  watch_show:  { diversion: 40, social: 15 },
  walk_park:   { diversion: 15 },
  picnic:      { hambre: 30, diversion: 25 },
  checkup:     {},
};

const NEED_CFG = {
  hambre:   { label: "Hambre",   emoji: "🍽", color: "#E8943A" },
  sueno:    { label: "Sueño",    emoji: "😴", color: "#7B8CDE" },
  higiene:  { label: "Higiene",  emoji: "🧼", color: "#4AB8C1" },
  social:   { label: "Social",   emoji: "💬", color: "#E87B9E" },
  diversion:{ label: "Diversión",emoji: "🎮", color: "#A67BD6" },
  vejiga:   { label: "Vejiga",   emoji: "💧", color: "#6BC47E" },
};

const MONTHS  = ["Nevelin","Mirenal","Nomeven","Mirenable","Velorfesta","Solein","Velcora","Memoveli","Clubven","Noctuvel","Mireneis","Nevelin II"];
const SEASONS = ["🌸 Primavera","🌸 Primavera","🌸 Primavera","☀️ Verano","☀️ Verano","☀️ Verano","🍂 Otoño","🍂 Otoño","🍂 Otoño","❄️ Invierno","❄️ Invierno","❄️ Invierno"];

// ═══════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════
function toTimeStr(h) {
  const hour = ((h % 24) + 24) % 24;
  const hh = Math.floor(hour);
  const rawMm = Math.round((hour - hh) * 60);
  const mm = rawMm >= 60 ? 0 : rawMm;
  return `${hh.toString().padStart(2,"0")}:${mm.toString().padStart(2,"0")}`;
}

function relStatus(lv) {
  if (lv < 10) return "Extraño";
  if (lv < 25) return "Conocido";
  if (lv < 50) return "Amigo";
  if (lv < 75) return "Amigo cercano";
  return "Mejor amigo";
}

function clamp(val, min = 0, max = 100) {
  return Math.max(min, Math.min(max, val));
}

// ═══════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════
function NeedBar({ needKey, value, dark }) {
  const cfg = NEED_CFG[needKey];
  const barColor = value < 25 ? "#E05555" : value < 50 ? "#E8943A" : cfg.color;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "7px" }}>
      <span style={{ fontSize: "12px", width: "16px", textAlign: "center" }}>{cfg.emoji}</span>
      <div style={{ flex: 1, height: "5px", background: dark ? "#3D2B1F" : "#E8D5B8", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${value}%`, background: barColor, borderRadius: "3px", transition: "width 0.6s ease" }} />
      </div>
      <span style={{ fontSize: "10px", color: "#8B7355", width: "22px", textAlign: "right" }}>{Math.round(value)}</span>
    </div>
  );
}

function NarrativeBlock({ entry, dark }) {
  const accent = { intro: "#D4A853", story: "#7BB8B9", travel: "#A08060", system: "#6B5040", error: "#E05555" };
  const borderColor = accent[entry.type] || "#7BB8B9";
  return (
    <div style={{ marginBottom: "22px", paddingLeft: "14px", borderLeft: `2px solid ${borderColor}` }}>
      {entry.place && (
        <div style={{ fontSize: "10px", color: "#A08060", marginBottom: "5px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {entry.place}{entry.time ? ` · ${entry.time}` : ""}
        </div>
      )}
      <div style={{
        fontSize: "14px", lineHeight: "1.75",
        color: dark ? "#EDE0CC" : "#3D2B1F",
        fontFamily: "'Lora', Georgia, serif",
        whiteSpace: "pre-line",
      }}>
        {entry.text}
      </div>
      {entry.hint && (
        <div style={{ marginTop: "10px", fontSize: "13px", color: "#E87B9E", fontStyle: "italic", fontFamily: "'Lora', serif" }}>
          ✦ {entry.hint}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// CREATION SCREEN
// ═══════════════════════════════════════════════
function CreationScreen({ onStart }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [traits, setTraits] = useState([]);
  const [aspiration, setAspiration] = useState("");

  const toggleTrait = (id) => {
    if (traits.includes(id)) setTraits(traits.filter(t => t !== id));
    else if (traits.length < 3) setTraits([...traits, id]);
  };

  const canNext = [name.trim().length > 1, traits.length === 3, aspiration !== ""][step];

  const next = () => {
    if (!canNext) return;
    if (step < 2) setStep(step + 1);
    else onStart({ name: name.trim(), traits, aspiration });
  };

  const stepLabels = ["Nombre", "Rasgos", "Aspiración"];

  return (
    <div style={{
      minHeight: "100vh", background: "linear-gradient(155deg, #1A1008 0%, #2C1F14 60%, #1A0E08 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "32px 16px", fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap'); *{box-sizing:border-box}`}</style>

      <div style={{ textAlign: "center", marginBottom: "36px" }}>
        <div style={{ fontSize: "44px", color: "#D4A853", fontFamily: "'Lora', serif", letterSpacing: "0.18em" }}>inbetweens</div>
        <div style={{ fontSize: "11px", color: "#6B5040", letterSpacing: "0.35em", textTransform: "uppercase", marginTop: "4px" }}>Veloria · Otherwhen</div>
      </div>

      <div style={{ display: "flex", gap: "6px", marginBottom: "28px" }}>
        {stepLabels.map((s, i) => (
          <div key={i} style={{
            padding: "4px 14px", borderRadius: "20px", fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase",
            background: i === step ? "#D4A853" : i < step ? "rgba(212,168,83,0.2)" : "transparent",
            color: i === step ? "#2C1F14" : i < step ? "#D4A853" : "#4A3525",
            border: i >= step ? "1px solid #3D2B1F" : "none",
          }}>{s}</div>
        ))}
      </div>

      <div style={{
        background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.2)",
        borderRadius: "16px", padding: "28px", width: "100%", maxWidth: "460px",
      }}>
        {step === 0 && (
          <div>
            <div style={{ color: "#D4A853", fontFamily: "'Lora', serif", fontSize: "20px", marginBottom: "6px" }}>¿Cuál es tu nombre, Twin?</div>
            <div style={{ color: "#6B5040", fontSize: "12px", marginBottom: "22px", lineHeight: "1.6" }}>Este nombre te seguirá por toda Veloria.</div>
            <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && next()}
              placeholder="Tu nombre..."
              style={{
                width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(212,168,83,0.35)",
                borderRadius: "8px", color: "#FDF6E9", fontSize: "20px", fontFamily: "'Lora', serif", outline: "none",
              }} />
          </div>
        )}

        {step === 1 && (
          <div>
            <div style={{ color: "#D4A853", fontFamily: "'Lora', serif", fontSize: "20px", marginBottom: "6px" }}>Elegí 3 rasgos</div>
            <div style={{ color: "#6B5040", fontSize: "12px", marginBottom: "18px" }}>{traits.length}/3 seleccionados</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
              {TRAITS.map(t => {
                const sel = traits.includes(t.id);
                const dis = !sel && traits.length === 3;
                return (
                  <button key={t.id} onClick={() => !dis && toggleTrait(t.id)} style={{
                    padding: "10px", borderRadius: "8px", textAlign: "left", cursor: dis ? "not-allowed" : "pointer",
                    border: sel ? "1px solid #D4A853" : "1px solid rgba(212,168,83,0.15)",
                    background: sel ? "rgba(212,168,83,0.12)" : "transparent",
                    color: dis && !sel ? "#3D2B1F" : "#FDF6E9",
                    opacity: dis && !sel ? 0.35 : 1, transition: "all 0.15s",
                  }}>
                    <div style={{ fontSize: "18px", marginBottom: "2px" }}>{t.emoji}</div>
                    <div style={{ fontSize: "12px", fontWeight: 500 }}>{t.label}</div>
                    <div style={{ fontSize: "10px", color: "#8B7355" }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div style={{ color: "#D4A853", fontFamily: "'Lora', serif", fontSize: "20px", marginBottom: "6px" }}>¿Qué buscás en Veloria?</div>
            <div style={{ color: "#6B5040", fontSize: "12px", marginBottom: "18px" }}>Tu aspiración de vida.</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {ASPIRATIONS.map(a => (
                <button key={a.id} onClick={() => setAspiration(a.id)} style={{
                  padding: "13px 16px", borderRadius: "8px", textAlign: "left", cursor: "pointer",
                  border: aspiration === a.id ? "1px solid #D4A853" : "1px solid rgba(212,168,83,0.15)",
                  background: aspiration === a.id ? "rgba(212,168,83,0.12)" : "transparent",
                  color: "#FDF6E9", display: "flex", alignItems: "center", gap: "12px", transition: "all 0.15s",
                }}>
                  <span style={{ fontSize: "24px" }}>{a.emoji}</span>
                  <div>
                    <div style={{ fontSize: "13px", fontWeight: 500 }}>{a.label}</div>
                    <div style={{ fontSize: "11px", color: "#8B7355" }}>{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <button onClick={next} disabled={!canNext} style={{
        marginTop: "22px", padding: "11px 38px", borderRadius: "24px", border: "none",
        background: canNext ? "#D4A853" : "#2C1F14", color: canNext ? "#1A1008" : "#4A3525",
        fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
        cursor: canNext ? "pointer" : "not-allowed", transition: "all 0.2s",
      }}>
        {step === 2 ? "✨ Llegar a Veloria" : "Continuar →"}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN GAME
// ═══════════════════════════════════════════════
export default function InbetweensGame() {
  const [phase, setPhase]         = useState("creation");
  const [twin, setTwin]           = useState(null);
  const [needs, setNeeds]         = useState({ hambre: 75, sueno: 80, higiene: 80, social: 50, diversion: 55, vejiga: 70 });
  const [money, setMoney]         = useState(250);
  const [gt, setGt]               = useState({ hour: 8, day: 1, monthIdx: 0 });
  const [loc, setLoc]             = useState({ hood: "La Vega", place: "Tu apartamento" });
  const [rels, setRels]           = useState({});
  const [log, setLog]             = useState([]);
  const [loading, setLoading]     = useState(false);
  const logEnd = useRef(null);

  useEffect(() => { logEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [log]);

  const addEntry = (e) => setLog(prev => [...prev, { id: Date.now() + Math.random(), ...e }]);

  const tick = (hours, changes = {}) => {
    setNeeds(prev => ({
      hambre:    clamp(prev.hambre    - hours * 4   + (changes.hambre    || 0)),
      sueno:     clamp(prev.sueno     - hours * 3   + (changes.sueno     || 0)),
      higiene:   clamp(prev.higiene   - hours * 1.5 + (changes.higiene   || 0)),
      social:    clamp(prev.social    - hours * 2   + (changes.social    || 0)),
      diversion: clamp(prev.diversion - hours * 2.5 + (changes.diversion || 0)),
      vejiga:    clamp(prev.vejiga    - hours * 8   + (changes.vejiga    || 0)),
    }));
    setGt(prev => {
      const total = prev.hour + hours;
      const daysGained = Math.floor(total / 24);
      const newDay = prev.day + daysGained;
      return {
        hour: total % 24,
        day: newDay,
        monthIdx: clamp(prev.monthIdx + Math.floor(newDay / 30) - Math.floor(prev.day / 30), 0, 11),
      };
    });
  };

  async function callAI(actionDesc, npc = null) {
    const relStr = Object.entries(rels).map(([n, v]) => `${n}: ${relStatus(v)} (${v}/100)`).join(", ") || "ninguna aún";
    const prompt = `${VELORIA_SYSTEM}

ESTADO DEL TWIN:
- Nombre: ${twin?.name} | Rasgos: ${twin?.traits?.join(", ")} | Aspiración: ${twin?.aspiration}
- Necesidades: ${Object.entries(needs).map(([k,v]) => `${k}:${Math.round(v)}`).join(" | ")}
- Dinero: L ${money}
- Tiempo: ${toTimeStr(gt.hour)}, Día ${gt.day}, ${MONTHS[gt.monthIdx]} (${SEASONS[gt.monthIdx]})
- Ubicación: ${loc.hood} → ${loc.place}
- Relaciones conocidas: ${relStr}

ACCIÓN: "${actionDesc}"${npc ? ` (NPC involucrado: ${npc})` : ""}

Respondé SOLO con JSON válido, sin markdown, sin texto extra:
{
  "narrative": "2-3 párrafos en segunda persona voseante, español rioplatense, cálido y literario. Si hay NPC, incluí diálogo corto y natural entre comillas.",
  "needChanges": {},
  "moneyChange": 0,
  "relChange": {},
  "hint": null
}
Reglas: needChanges solo las que cambien significativamente. relChange solo si hay NPC. hint solo si NPC clave y relación >70 — una pista MUY sutil de una línea sobre el Otreven o el 13er fundador.`;

    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 900,
        messages: [{ role: "user", content: prompt }]
      }),
    });
    const data = await res.json();
    const raw = data.content?.[0]?.text || "{}";
    try { return JSON.parse(raw.replace(/```json|```/g, "").trim()); }
    catch { return { narrative: raw, needChanges: {}, moneyChange: 0, relChange: {}, hint: null }; }
  }

  async function handleStart(twinData) {
    setTwin(twinData);
    setPhase("playing");
    setLoading(true);
    try {
      const r = await callAI(`Primera mañana de ${twinData.name} en Veloria. Acaba de llegar a su nuevo apartamento en La Vega. Rasgos: ${twinData.traits.join(", ")}. Aspiración: ${twinData.aspiration}. Describí su llegada: el apartamento, la primera vista de la ciudad desde la ventana, el olor del barrio. Cálido, íntimo, con detalles sensoriales concretos.`);
      addEntry({ text: r.narrative, type: "intro", place: "Tu apartamento", time: "08:00" });
    } catch {
      addEntry({ text: `La luz de la mañana entra oblicua por las ventanas de tu nuevo apartamento en La Vega.\n\nAbajo, el barrio empieza a despertar. Alguien está haciendo café en algún piso cercano. A lo lejos, entre los techos, podés ver el brillo quieto del Lago Miren.\n\n*Velin*, pensás. Bienvenido.`, type: "intro", place: "Tu apartamento", time: "08:00" });
    }
    setLoading(false);
  }

  async function handleAction(action) {
    if (loading) return;
    const cost = action.cost || 0;
    if (money < cost) { addEntry({ text: `No tenés suficientes Luces para esto — necesitás L${cost}.`, type: "system" }); return; }
    setLoading(true);
    try {
      const r = await callAI(`${action.label} en ${loc.place}`, action.npc || null);
      const base = BASE_EFFECTS[action.id] || {};
      const merged = { ...base };
      for (const [k, v] of Object.entries(r.needChanges || {})) merged[k] = (merged[k] || 0) + v;
      tick(action.time || 0.5, merged);
      if (cost > 0) setMoney(m => m - cost);
      if (r.moneyChange) setMoney(m => m + r.moneyChange);
      if (r.relChange) {
        setRels(prev => {
          const n = { ...prev };
          for (const [npc, d] of Object.entries(r.relChange)) n[npc] = clamp((n[npc] || 0) + d);
          return n;
        });
      }
      addEntry({ text: r.narrative, type: "story", place: loc.place, time: toTimeStr(gt.hour + action.time), hint: r.hint });
    } catch { addEntry({ text: "Algo se interrumpió en Veloria...", type: "error" }); }
    setLoading(false);
  }

  async function handleGoTo(hood, place) {
    if (loading || (loc.hood === hood && loc.place === place)) return;
    setLoc({ hood, place });
    setLoading(true);
    try {
      const travelH = loc.hood !== hood ? 0.5 : 0.2;
      const r = await callAI(`${twin?.name} llega a ${place} en ${hood}`);
      tick(travelH, {});
      addEntry({ text: r.narrative, type: "travel", place, time: toTimeStr(gt.hour + travelH) });
    } catch { addEntry({ text: `Llegás a ${place}.`, type: "travel", place }); }
    setLoading(false);
  }

  // ───── RENDER ─────
  if (phase === "creation") return <CreationScreen onStart={handleStart} />;

  const dark = gt.hour >= 21 || gt.hour < 6;
  const hoodData = NEIGHBORHOODS[loc.hood] || {};
  const hoodColor = hoodData.color || "#D4A853";
  const actions = PLACE_ACTIONS[loc.place] || [];

  const bg        = dark ? "#120D07"  : "#FDF6E9";
  const panelBg   = dark ? "#1C1208"  : "#FAF0DC";
  const border    = dark ? "#2C1F14"  : "#E8D5B8";
  const textColor = dark ? "#EDE0CC"  : "#3D2B1F";
  const muted     = dark ? "#6B5040"  : "#A08060";

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", background: bg, fontFamily: "'DM Sans', sans-serif", color: textColor, overflow: "hidden", transition: "background 2s" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap'); *{box-sizing:border-box} ::-webkit-scrollbar{width:4px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(212,168,83,0.35);border-radius:2px} button{font-family:inherit}`}</style>

      {/* ── HEADER ── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 18px", borderBottom: `1px solid ${border}`, background: panelBg, flexShrink: 0 }}>
        <div>
          <span style={{ fontFamily: "'Lora', serif", fontSize: "15px", color: "#D4A853" }}>{twin?.name}</span>
          <span style={{ fontSize: "10px", color: muted, marginLeft: "8px" }}>{twin?.traits?.join(" · ")}</span>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Lora', serif", fontSize: "17px", color: dark ? "#7BB8B9" : "#D4A853" }}>{toTimeStr(gt.hour)}</div>
          <div style={{ fontSize: "9px", color: muted, letterSpacing: "0.04em" }}>Día {gt.day} · {MONTHS[gt.monthIdx]} · {SEASONS[gt.monthIdx]}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "13px", color: "#D4A853", fontWeight: 600 }}>✦ L {money}</div>
          <div style={{ fontSize: "9px", color: muted }}>Luces</div>
        </div>
      </div>

      {/* ── MAIN AREA ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* ── NARRATIVE ── */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "5px 18px", fontSize: "10px", color: hoodColor, borderBottom: `1px solid ${border}`, letterSpacing: "0.1em", textTransform: "uppercase", flexShrink: 0 }}>
            📍 {loc.hood} → {loc.place}
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "20px 22px" }}>
            {log.length === 0 && !loading && (
              <div style={{ color: muted, fontStyle: "italic", fontFamily: "'Lora', serif", fontSize: "14px" }}>Cargando Veloria…</div>
            )}
            {log.map(e => <NarrativeBlock key={e.id} entry={e} dark={dark} />)}
            {loading && (
              <div style={{ color: "#D4A853", fontSize: "13px", opacity: 0.65, fontStyle: "italic", fontFamily: "'Lora', serif" }}>
                ✦ Veloria responde…
              </div>
            )}
            <div ref={logEnd} />
          </div>
        </div>

        {/* ── SIDEBAR ── */}
        <div style={{ width: "188px", borderLeft: `1px solid ${border}`, padding: "14px 12px", overflowY: "auto", background: panelBg, flexShrink: 0 }}>
          <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, marginBottom: "10px" }}>Estado</div>
          {Object.keys(needs).map(k => <NeedBar key={k} needKey={k} value={needs[k]} dark={dark} />)}

          {Object.keys(rels).length > 0 && <>
            <div style={{ fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: muted, margin: "14px 0 10px" }}>Relaciones</div>
            {Object.entries(rels).map(([npc, lv]) => (
              <div key={npc} style={{ marginBottom: "9px" }}>
                <div style={{ fontSize: "11px", color: dark ? "#D4A853" : "#5C4A32", marginBottom: "2px" }}>{npc.split(" ")[0]}</div>
                <div style={{ height: "4px", background: dark ? "#3D2B1F" : "#E8D5B8", borderRadius: "2px", overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${lv}%`, background: "#E87B9E", transition: "width 0.5s ease" }} />
                </div>
                <div style={{ fontSize: "9px", color: muted, marginTop: "1px" }}>{relStatus(lv)}</div>
              </div>
            ))}
          </>}
        </div>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ borderTop: `1px solid ${border}`, background: panelBg, flexShrink: 0 }}>
        {/* Neighborhood nav */}
        <div style={{ display: "flex", overflowX: "auto", padding: "8px 12px", gap: "10px", borderBottom: `1px solid ${border}` }}>
          {Object.entries(NEIGHBORHOODS).map(([hood, d]) => (
            <div key={hood} style={{ flexShrink: 0 }}>
              <div style={{ fontSize: "9px", color: loc.hood === hood ? d.color : muted, letterSpacing: "0.06em", marginBottom: "5px", textAlign: "center" }}>
                {d.emoji} {hood}
              </div>
              <div style={{ display: "flex", gap: "3px" }}>
                {d.places.map(p => {
                  const active = loc.place === p;
                  const shortP = p.length > 13 ? p.slice(0, 12) + "…" : p;
                  return (
                    <button key={p} onClick={() => handleGoTo(hood, p)} disabled={loading} style={{
                      padding: "3px 8px", fontSize: "10px", borderRadius: "4px",
                      border: `1px solid ${active ? d.color : dark ? "#3D2B1F" : "#D4C4A0"}`,
                      background: active ? d.color : "transparent",
                      color: active ? "#FDF6E9" : dark ? "#C4A87A" : "#5C4A32",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.45 : 1, whiteSpace: "nowrap", transition: "all 0.12s",
                    }}>{shortP}</button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", padding: "8px 12px" }}>
          {actions.map(a => (
            <button key={a.id} onClick={() => handleAction(a)} disabled={loading} style={{
              padding: "5px 11px", fontSize: "11px", borderRadius: "6px",
              border: `1px solid ${dark ? "#3D2B1F" : "#D4C4A0"}`,
              background: "transparent", color: dark ? "#C4A87A" : "#5C4A32",
              cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.4 : 1,
              display: "flex", alignItems: "center", gap: "4px", transition: "all 0.12s",
            }}
            onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = hoodColor; e.currentTarget.style.color = "#FDF6E9"; e.currentTarget.style.borderColor = hoodColor; }}}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = dark ? "#C4A87A" : "#5C4A32"; e.currentTarget.style.borderColor = dark ? "#3D2B1F" : "#D4C4A0"; }}>
              {a.label}
              {a.cost && <span style={{ fontSize: "9px", opacity: 0.65 }}>L{a.cost}</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
