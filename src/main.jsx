import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight, BarChart3, Bot, Building2, CheckCircle2, ChevronLeft, ChevronRight, Code2,
  Database, Download, FileSpreadsheet, Hammer, Home, IdCard, LockKeyhole, Mail, Menu,
  MessageCircle, Monitor, MousePointerClick, Phone, Play, RotateCw, Scale, ShieldCheck, Snowflake, Sparkles,
  Timer, Workflow, X, ExternalLink
} from "lucide-react";
import { archCatalog, techCatalog, techProjects } from "./catalog.js";
import { translations } from "./i18n.js";
import AnimatedTechAssistant from "./AnimatedTechAssistant.jsx";
import "./styles.css";

const WHATSAPP = "51993212999";
const WHATSAPP_DISPLAY = "+51 993 212 999";
const EMAIL = "jmproyectoarquitectura@gmail.com";
const TIKTOK_URL = "https://www.tiktok.com/@jymdisenoyarquitectura?_r=1&_t=ZS-97jUtwXlYcp.";
const INSTAGRAM_URL = "https://www.instagram.com/jymdisenoyarquitectura?igsh=dmlyZmdoOXVqcmpx&utm_source=qr.";
const wa = (msg = "Hola JYM, quiero cotizar un proyecto.") => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
const iconMap = { Monitor, Scale, Database, IdCard, Bot, BarChart3 };



function MatrixRain({ active }) {
  return <div className={active ? "matrix-rain active" : "matrix-rain"}>
    {Array.from({ length: 52 }).map((_, i) => <span key={i} style={{ "--x": `${i * 2.1}%`, "--d": `${(i % 12) * 0.16}s` }}>JYM.automation();</span>)}
  </div>;
}

function ArchBreak({ active }) {
  return <div className={active ? "arch-break active" : "arch-break"}>
    <Hammer className="hammer-icon" />
    {Array.from({ length: 42 }).map((_, i) => <i key={i} style={{ "--i": i }} />)}
  </div>;
}

function TechMachine({ focus }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.45) * 0.22 + (focus ? 0.18 : 0);
    ref.current.rotation.x = Math.sin(t * 0.32) * 0.035;
    ref.current.position.y = Math.sin(t * 0.9) * 0.08;
    ref.current.scale.setScalar(focus ? 0.82 : 0.70);
  });

  const screenMat = (
    <meshStandardMaterial
      color="#071a3c"
      metalness={0.82}
      roughness={0.08}
      emissive="#003c92"
      emissiveIntensity={0.75}
    />
  );

  return <group ref={ref} position={focus ? [-0.95, -0.03, 0] : [-1.62, -0.03, 0]}>
    <Float speed={1.35} floatIntensity={0.28} rotationIntensity={0.15}>
      {/* monitor principal */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.45, 2.05, 0.16]} />
        {screenMat}
      </mesh>

      {/* pantalla curva / neón */}
      <mesh position={[0, 0.05, 0.11]}>
        <boxGeometry args={[3.08, 1.68, 0.04]} />
        <meshStandardMaterial color="#001b3a" emissive="#00d9ff" emissiveIntensity={0.35} metalness={0.45} roughness={0.1} />
      </mesh>

      {/* base laptop */}
      <mesh position={[0, -1.22, 0.15]} castShadow>
        <boxGeometry args={[2.75, 0.14, 1.12]} />
        <meshStandardMaterial color="#05070b" metalness={0.84} roughness={0.14} />
      </mesh>

      {/* dashboard barras */}
      {[...Array(7)].map((_, i) => <mesh key={i} position={[-1.27 + i * 0.42, -0.46, 0.2]}>
        <boxGeometry args={[0.22, 0.34 + (i % 4) * 0.16, 0.08]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={1.8} />
      </mesh>)}

      {/* donut */}
      <mesh position={[1.08, 0.43, 0.21]}>
        <torusGeometry args={[0.43, 0.075, 18, 80]} />
        <meshStandardMaterial color="#7144ff" emissive="#7144ff" emissiveIntensity={1.65} />
      </mesh>

      {/* mini servidores laterales */}
      {[-1.95, 1.95].map((x, idx) => <group key={idx} position={[x, -0.05, -0.25]}>
        {[0, 1, 2].map((j) => <mesh key={j} position={[0, -0.55 + j * 0.42, 0]}>
          <boxGeometry args={[0.34, 0.28, 0.55]} />
          <meshStandardMaterial color="#08111d" metalness={0.7} roughness={0.2} emissive="#00295a" emissiveIntensity={0.4} />
        </mesh>)}
        {[0, 1, 2].map((j) => <mesh key={`led-${j}`} position={[0.18, -0.55 + j * 0.42, 0.29]}>
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshStandardMaterial color="#00e0ff" emissive="#00e0ff" emissiveIntensity={2.2} />
        </mesh>)}
      </group>)}

      {/* pantallas flotantes */}
      {[
        [-1.42, 1.1, -0.12, "API"],
        [1.36, 1.02, -0.12, "BOT"],
        [0, 1.35, -0.15, "DATA"]
      ].map(([x, y, z, label]) => <Html key={label} position={[x, y, z]} center>
        <div className="holo-tag">{label}</div>
      </Html>)}

      {/* aro base */}
      <mesh position={[0, -1.56, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.25, 0.014, 8, 180]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={2.6} />
      </mesh>

      <Html position={[0, 1.62, 0.32]} center><div className="chip3d tech">SISTEMAS + AUTOMATIZACIÓN</div></Html>
    </Float>
  </group>;
}

function RealHouse({ focus }) {
  const ref = useRef();
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = Math.sin(t * 0.42) * 0.22 - (focus ? 0.16 : 0);
    ref.current.rotation.x = Math.sin(t * 0.28) * 0.025;
    ref.current.position.y = Math.sin(t * 0.75) * 0.055;
    ref.current.scale.setScalar(focus ? 0.82 : 0.70);
  });

  return <group ref={ref} position={focus ? [0.95, -0.05, 0] : [1.62, -0.05, 0]}>
    <Float speed={1.15} floatIntensity={0.22} rotationIntensity={0.12}>
      
      {/* plataforma */}
      <mesh position={[0, -1.18, 0]} receiveShadow>
        <boxGeometry args={[4.3, 0.20, 2.55]} />
        <meshStandardMaterial color="#25211e" metalness={0.44} roughness={0.22} />
      </mesh>

      {/* volumen principal estilo edificio moderno */}
      <mesh position={[-0.62, -0.45, 0.08]} castShadow>
        <boxGeometry args={[2.25, 1.18, 1.35]} />
        <meshStandardMaterial color="#e8dfd0" metalness={0.34} roughness={0.2} />
      </mesh>
      <mesh position={[0.72, 0.1, -0.02]} castShadow>
        <boxGeometry args={[2.05, 1.45, 1.18]} />
        <meshStandardMaterial color="#f2e7d5" metalness={0.36} roughness={0.22} />
      </mesh>

      {/* techo flotante arquitectónico */}
      <mesh position={[0.08, 0.98, 0.02]} castShadow>
        <boxGeometry args={[3.85, 0.2, 1.66]} />
        <meshStandardMaterial color="#9d6737" metalness={0.62} roughness={0.18} />
      </mesh>

      {/* fachada cristal */}
      {[
        [-1.12, -0.45, 0.78, 0.48, 0.68],
        [-0.48, -0.45, 0.78, 0.48, 0.68],
        [0.35, 0.1, 0.68, 0.46, 0.72],
        [0.94, 0.1, 0.68, 0.46, 0.72],
        [1.45, 0.1, 0.68, 0.36, 0.72]
      ].map(([x, y, z, w, h], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <boxGeometry args={[w, h, 0.04]} />
          <meshPhysicalMaterial color="#b6efff" transparent opacity={0.48} metalness={0.15} roughness={0.02} transmission={0.35} />
        </mesh>
      ))}

      {/* piscina/agua */}
      <mesh position={[-1.3, -1.28, 1.12]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.48, 0.76, 0.05, 56]} />
        <meshStandardMaterial color="#00d9ff" emissive="#00d9ff" emissiveIntensity={0.8} transparent opacity={0.58} />
      </mesh>

      {/* jardineras */}
      {[-1.7, 1.55].map((x, idx) => <group key={idx} position={[x, -1.03, 0.88]}>
        <mesh>
          <boxGeometry args={[0.46, 0.18, 0.22]} />
          <meshStandardMaterial color="#5a3d21" metalness={0.25} roughness={0.35} />
        </mesh>
        {[...Array(5)].map((_, j) => <mesh key={j} position={[-0.18 + j * 0.09, 0.15, 0]}>
          <coneGeometry args={[0.06, 0.22, 8]} />
          <meshStandardMaterial color="#5ec96a" emissive="#2b7d3a" emissiveIntensity={0.15} />
        </mesh>)}
      </group>)}

      {/* escaleras */}
      {[0, 1, 2].map((i) => <mesh key={i} position={[1.42, -1.05 + i * 0.11, 1.0 - i * 0.18]}>
        <boxGeometry args={[0.75, 0.08, 0.18]} />
        <meshStandardMaterial color="#d4c4aa" metalness={0.22} roughness={0.25} />
      </mesh>)}

      {/* aro base cálido */}
      <mesh position={[0, -1.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.32, 0.014, 8, 180]} />
        <meshStandardMaterial color="#d9ae72" emissive="#d9ae72" emissiveIntensity={2.3} />
      </mesh>

      <Html position={[0, 1.62, 0.32]} center><div className="chip3d arch">ARQUITECTURA + DISEÑO</div></Html>
    </Float>
  </group>;
}

function Scene3D({ mode }) {
  const focusTech = mode === "tech";
  const focusArch = mode === "arch";
  return <Canvas className="scene3d" dpr={[1, 1.45]} shadows gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }} performance={{ min: .55 }}>
    <PerspectiveCamera makeDefault position={[0, 0.1, 8]} fov={50} />
    <ambientLight intensity={0.52} />
    <directionalLight position={[5, 6, 4]} intensity={2.1} castShadow color={focusArch ? "#ffd89a" : "#9eefff"} />
    <pointLight position={[-3.5, 3.6, 4]} intensity={focusArch ? 12 : 38} color="#00d9ff" />
    <pointLight position={[3.8, 3.2, 4]} intensity={focusTech ? 12 : 34} color="#d9ae72" />
    <Stars radius={90} depth={35} count={1600} factor={3} saturation={0} fade speed={0.55} />
    <Suspense fallback={null}>
      {mode !== "arch" && <TechMachine focus={focusTech} />}
      {mode !== "tech" && <RealHouse focus={focusArch} />}
      <Environment preset="city" />
    </Suspense>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.55} />
  </Canvas>;
}

function SceneFallback({ mode }) {
  const isTech = mode === "tech";
  const Icon = isTech ? Monitor : Building2;
  return <div className={`scene-fallback scene-fallback-${mode}`} role="img" aria-label={isTech ? "Laboratorio digital JYM" : "Proyecto arquitectónico JYM"}>
    <div className="scene-fallback-orbit"><i/><i/><i/></div>
    <div className="scene-fallback-core"><Icon/><span>{isTech ? "AI" : "JYM"}</span></div>
    <div className="scene-fallback-data">
      <span>{isTech ? "DATA" : "DISEÑO"}</span>
      <span>{isTech ? "BOT" : "ESPACIO"}</span>
      <span>{isTech ? "FLOW" : "OBRA"}</span>
    </div>
  </div>;
}

class SceneErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("JYM 3D fallback activado:", error?.message || error);
  }

  render() {
    return this.state.failed ? <SceneFallback mode={this.props.mode}/> : this.props.children;
  }
}

function SafeScene3D({ mode }) {
  const [webgl, setWebgl] = useState(null);

  useEffect(() => {
    let supported = false;
    try {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      supported = Boolean(context);
      context?.getExtension?.("WEBGL_lose_context")?.loseContext?.();
    } catch {
      supported = false;
    }
    setWebgl(supported);
  }, []);

  if (webgl !== true) return <SceneFallback mode={mode}/>;
  return <SceneErrorBoundary mode={mode}><Scene3D mode={mode}/></SceneErrorBoundary>;
}

function Header({ mode, setMode, lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const navItems = mode === "tech" ? [
    ["#inicio", t.nav.portal],
    ["#cuellos-botella", t.nav.solutions],
    ["#laboratorio", t.nav.lab],
    ["#proceso", t.nav.process],
    ["#contacto", t.nav.contact]
  ] : mode === "arch" ? [
    ["#inicio", t.nav.portal],
    ["#showroom", t.nav.projects],
    ["#servicios", t.nav.services],
    ["#proceso", t.nav.process],
    ["#contacto", t.nav.contact]
  ] : [
    ["#inicio", t.nav.portal],
    ["#showroom", t.nav.services],
    ["#contacto", t.nav.contact]
  ];

  return <header className="topbar premium-nav">
    <a className="brand-mini" href="#inicio" onClick={() => setMode("portal")}><img src="/assets/brand/logo-jym-bg.jpg" alt="JYM" /></a>

    <nav className="top-tabs">
      {navItems.map(([href, label]) => <a key={label} className="top-choice ghost-link" href={href}>{label}</a>)}
    </nav>

    <button className="lang-switch" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Cambiar idioma">
      <span className={lang === "es" ? "active" : ""}>ES</span>
      <i />
      <span className={lang === "en" ? "active" : ""}>EN</span>
    </button>

    {mode !== "portal" && <button className={`world-switch world-switch-${mode}`} onClick={() => setMode(mode === "tech" ? "arch" : "tech")}>
      {mode === "tech" ? t.nav.switchArch : t.nav.switchTech}
    </button>}
    <a className="btn btn-primary" href={wa()} target="_blank" rel="noreferrer">{t.nav.quote}</a>

    <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav className="mobile-menu">
      <button onClick={() => { setMode("portal"); setOpen(false); }}>{t.nav.portal}</button>
      <button onClick={() => { setMode("tech"); setOpen(false); }}>{t.nav.tech}</button>
      <button onClick={() => { setMode("arch"); setOpen(false); }}>{t.nav.arch}</button>
      {navItems.slice(1).map(([href, label]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      <button onClick={() => setLang(lang === "es" ? "en" : "es")}>{lang === "es" ? "English" : "Español"}</button>
    </nav>}
  </header>;
}

function Hero({ mode, setMode, t }) {
  const isTech = mode === "tech";
  const isArch = mode === "arch";
  const portal = mode === "portal";
  const [portalFocus, setPortalFocus] = useState("none");
  const [portalSelection, setPortalSelection] = useState("none");
  const portalTimer = useRef();

  useEffect(() => () => window.clearTimeout(portalTimer.current), []);

  const selectPortalWorld = (next) => {
    if (portalSelection !== "none") return;
    setPortalSelection(next);
    setPortalFocus(next);
    const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    portalTimer.current = window.setTimeout(
      () => setMode(next, { direct: true }),
      reducedMotion ? 80 : 780
    );
  };

  return <section className={`hero hero-${mode}`} id="inicio">
    <div className="hero-ambient" />
    <div className="hero-orbit orbit-a" />
    <div className="hero-orbit orbit-b" />

    {isTech && <div className="world-model world-model-tech">
      <SafeScene3D mode="tech" />
    </div>}

    {isArch && <div className="world-model world-model-arch">
      <SafeScene3D mode="arch" />
    </div>}

    <AnimatePresence mode="wait">
      {portal && <motion.div
        key="portal"
        className={`portal-layout portal-split portal-focus-${portalFocus} portal-selection-${portalSelection}`}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: .97 }}
        aria-busy={portalSelection !== "none"}
      >
        <div className="portal-split-intro">
          <p>{t.hero.neutralBadge}</p>
          <h1>{t.hero.splitTitle}</h1>
          <span>{t.hero.splitText}</span>
        </div>

        <button
          className="portal-world portal-tech"
          onClick={() => selectPortalWorld("tech")}
          onMouseEnter={() => setPortalFocus("tech")}
          onMouseLeave={() => setPortalFocus("none")}
          onFocus={() => setPortalFocus("tech")}
          onBlur={() => setPortalFocus("none")}
          disabled={portalSelection !== "none"}
          aria-label={`${t.hero.techCta}. ${t.hero.techPromise}`}
        >
          <div className="portal-visual portal-visual-tech">
            <Monitor size={66} />
            <i /><i /><i />
          </div>
          <div className="portal-entry-mascot portal-entry-mascot-tech" aria-hidden="true">
            <img src="/assets/characters/marcianito-nave.png" alt="" draggable="false" />
            <i />
          </div>
          <div className="portal-world-heading"><small>{t.hero.techBadge}</small><b>01</b></div>
          <h2>{t.nav.tech}<em>{t.hero.techPromise}</em></h2>
          <p>{t.hero.techText}</p>
          <div className="portal-benefits">{t.hero.techPoints.map(point => <b key={point}><Sparkles size={14}/>{point}</b>)}</div>
          <span>{t.hero.techCta} <ArrowRight size={18}/></span>
        </button>

        <div className="portal-versus" aria-hidden="true">
          <i />
          <span>{t.hero.versus}</span>
          <small>JYM</small>
          <i />
        </div>

        <button
          className="portal-world portal-arch"
          onClick={() => selectPortalWorld("arch")}
          onMouseEnter={() => setPortalFocus("arch")}
          onMouseLeave={() => setPortalFocus("none")}
          onFocus={() => setPortalFocus("arch")}
          onBlur={() => setPortalFocus("none")}
          disabled={portalSelection !== "none"}
          aria-label={`${t.hero.archCta}. ${t.hero.archPromise}`}
        >
          <div className="portal-visual portal-visual-arch">
            <Building2 size={66} />
            <i /><i /><i />
          </div>
          <div className="portal-entry-mascot portal-entry-mascot-arch" aria-hidden="true">
            <img src="/assets/characters/asistente-arquitectura-v2.webp" alt="" draggable="false" />
            <i />
          </div>
          <div className="portal-world-heading"><small>{t.hero.archBadge}</small><b>02</b></div>
          <h2>{t.nav.arch}<em>{t.hero.archPromise}</em></h2>
          <p>{t.hero.archText}</p>
          <div className="portal-benefits">{t.hero.archPoints.map(point => <b key={point}><Sparkles size={14}/>{point}</b>)}</div>
          <span>{t.hero.archCta} <ArrowRight size={18}/></span>
        </button>

        <div className="portal-social-strip">
          <small>{t.labels.follow}</small>
          <a className="instagram-pill" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
          <a className="tiktok-pill" href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a>
        </div>
      </motion.div>}

      {isTech && <motion.div
        key="tech"
        className="world-copy world-copy-tech"
        initial={{ opacity: 0, x: -55 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -55 }}
      >
        <p>{t.hero.techBadge}</p>
        <h1>{t.hero.techTitle}</h1>
        <span>{t.hero.techText}</span>
        <div className="world-actions">
          <a className="btn btn-cold" href="#casos-reales">{t.hero.techPrimary}<ArrowRight size={18}/></a>
          <a className="btn btn-primary" href={wa(t.hero.techWhatsapp)} target="_blank" rel="noreferrer">{t.hero.techSecondary}<ArrowRight size={18}/></a>
          <button className="btn btn-warm" onClick={() => setMode("arch")}>{t.hero.archCta}<ArrowRight size={18}/></button>
        </div>
      </motion.div>}

      {isArch && <motion.div
        key="arch"
        className="world-copy world-copy-arch"
        initial={{ opacity: 0, x: 55 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 55 }}
      >
        <p>{t.hero.archBadge}</p>
        <h1>{t.hero.archTitle}</h1>
        <span>{t.hero.archText}</span>
        <div className="world-actions right">
          <a className="btn btn-warm" href="#showroom">{t.nav.services}<ArrowRight size={18}/></a>
          <button className="btn btn-cold" onClick={() => setMode("tech")}>{t.hero.techCta}<ArrowRight size={18}/></button>
        </div>
      </motion.div>}
    </AnimatePresence>
  </section>;
}

function ArchitectureShowroom({ t }) {
  const [selectedId, setSelectedId] = useState(archCatalog[0]?.id || "");
  const [mediaIndex, setMediaIndex] = useState(0);
  const selectedRaw = archCatalog.find(x => x.id === selectedId) || archCatalog[0];
  const txt = t.archCatalog[selectedRaw.id] || [selectedRaw.title, selectedRaw.tag, selectedRaw.description];
  const selected = { ...selectedRaw, title: txt[0], tag: txt[1], description: txt[2] };
  const media = [
    ...(selectedRaw.videos || []).map(v => ({
      type: "video",
      src: v.src,
      poster: v.poster || "",
      title: v.title || t.labels.video
    })),
    ...(selectedRaw.images || []).map((src, i) => ({ type: "image", src, title: `${selected.title} ${i + 1}` }))
  ];
  const safeLen = Math.max(media.length, 1);
  const current = media[((mediaIndex % safeLen) + safeLen) % safeLen];
  useEffect(() => setMediaIndex(0), [selectedId]);
  const next = () => setMediaIndex(v => (v + 1) % safeLen);
  const prev = () => setMediaIndex(v => (v - 1 + safeLen) % safeLen);
  return <section className="arch-showroom" id="showroom">
    <div className="section-title compact-title"><p>{t.showroom.archKicker}</p><h2>{t.showroom.archTitle}</h2></div>
    <div className="showroom-shell">
      <aside className="showroom-sidebar">
        <div className="room-menu">
          {archCatalog.map((item) => { const c = t.archCatalog[item.id] || [item.title,item.tag,item.description]; return <button key={item.id} className={item.id === selectedId ? "active" : ""} onClick={() => setSelectedId(item.id)}>
            <span>{c[1]}</span><b>{c[0]}</b><small>{(item.images?.length || 0) + (item.videos?.length || 0)} {t.labels.evidencias}</small>
          </button>})}
        </div>
        <div className="arch-side-card">
          <small>{t.showroom.archSideKicker}</small>
          <h3>{t.showroom.archSideTitle}</h3>
          <p>{t.showroom.archSideText}</p>
          <div className="arch-side-meta">
            <span><b>{media.length}</b><em>{t.showroom.archMediaLabel}</em></span>
            <span><b>{selected.tag}</b><em>{t.showroom.archTypeLabel}</em></span>
          </div>
          <a href="#contacto">{t.showroom.archSideCta}<ArrowRight size={16}/></a>
        </div>
      </aside>
      <div className="cinema-card">
        <div className={`cinema-frame cinema-frame-${current?.type || "empty"}`}>
          {current?.type === "image" && <div className="cinema-backdrop" style={{ backgroundImage: `url(${current.src})` }} />}
          <div className="cinema-counter">{String(mediaIndex + 1).padStart(2, "0")} <span>/</span> {String(media.length).padStart(2, "0")}</div>
          <AnimatePresence mode="wait">
            <motion.div key={current?.src || "empty-media"} className="media-transition" initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: .98, filter: "blur(8px)" }} transition={{ duration: .45 }}>
              {current?.type === "video" ? (
                <video
                  key={current.src}
                  src={current.src}
                  poster={current.poster || undefined}
                  controls
                  playsInline
                  preload="metadata"
                />
              ) : current?.src ? (
                <img key={current.src} src={current.src} alt={selected.title} />
              ) : (
                <div className="placeholder"><Sparkles size={70} /></div>
              )}
            </motion.div>
          </AnimatePresence>
          {media.length > 1 && <><button className="nav-arrow left" onClick={prev}><ChevronLeft /></button><button className="nav-arrow right" onClick={next}><ChevronRight /></button></>}
          <div className="cinema-label">
            <small>{selected.tag}</small>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <div className="project-tags">
              {(t.showroom.archTags?.[selectedRaw.id] || []).map(tag => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
        <div className="filmstrip">{media.map((m, i) => <button key={m.src} className={i === mediaIndex ? "active" : ""} onClick={() => setMediaIndex(i)}>{m.type === "video" ? (
          <div className="video-thumb">
            {m.poster && <img src={m.poster} alt="" />}
            <span className="video-thumb-overlay"><Play size={20}/><b>{m.title}</b></span>
          </div>
        ) : <img src={m.src} alt="" />}</button>)}</div>
      </div>
    </div>
  </section>;
}

function TechShowroom({ t }) {
  return <section className="tech-showroom" id="showroom">
    <div className="section-title compact-title"><p>{t.showroom.techKicker}</p><h2>{t.showroom.techTitle}</h2></div>
    <div className="tech-grid">{techCatalog.map((item, idx) => { const Icon = iconMap[item.icon] || Monitor; const c = t.techCatalog[item.id] || [item.title,item.tag,item.description]; return <motion.article key={item.id} className="tech-card" whileHover={{ y: -12, rotateX: 2 }}>
      <div className="tech-visual"><img src={item.image} alt={c[0]} /></div><div className="tech-card-body"><span>{String(idx + 1).padStart(2, "0")}</span><Icon size={36}/><small>{c[1]}</small><h3>{c[0]}</h3><p>{c[2]}</p><a href={wa(`Hola JYM, quiero cotizar: ${c[0]}`)} target="_blank" rel="noreferrer">{t.labels.cotizar} <ArrowRight size={16}/></a></div>
    </motion.article>})}</div>
  </section>;
}

function TechShowcase({ t }) {
  const [active, setActive] = useState(0);
  const selected = techProjects[active] || techProjects[0];
  const copy = t.techShowcase;
  const projectCopy = copy.projects[selected.id];

  return <section className="tech-showcase" id="proyectos-tech">
    <div className="showcase-heading">
      <div>
        <p>{copy.kicker}</p>
        <h2>{copy.title}</h2>
      </div>
      <span>{copy.intro}</span>
    </div>

    <div className="showcase-stage">
      <div className="showcase-browser">
        <div className="browser-bar">
          <div className="browser-dots"><i/><i/><i/></div>
          <div className="browser-address"><ShieldCheck size={14}/><span>{selected.demo.replace(/^https?:\/\//, "")}</span></div>
          <span className="browser-live"><i/>{copy.live}</span>
        </div>

        <div className="browser-screen">
          <iframe
            key={selected.demo}
            src={selected.demo}
            title={projectCopy.title}
            loading="lazy"
            tabIndex="-1"
            aria-hidden="true"
          />
          <div className="browser-shield" aria-hidden="true" />
        </div>

        <div className="showcase-browser-copy">
          <div>
            <small>{projectCopy.category}</small>
            <h3>{projectCopy.title}</h3>
            <p>{projectCopy.description}</p>
          </div>
          <div className="showcase-actions">
            <a className="showcase-primary" href={selected.demo} target="_blank" rel="noreferrer">
              {copy.openDemo}<ExternalLink size={16}/>
            </a>
          </div>
        </div>

        <div className="showcase-tags">
          {selected.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>
      </div>

      <div className="showcase-list">
        {techProjects.map((project, index) => {
          const item = copy.projects[project.id];
          return <button
            type="button"
            key={project.id}
            className={active === index ? "active" : ""}
            onClick={() => setActive(index)}
          >
            <span className="showcase-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="showcase-list-copy">
              <small>{item.category}</small>
              <b>{item.title}</b>
              <em>{item.short}</em>
            </span>
            <ArrowRight size={18}/>
          </button>;
        })}
      </div>
    </div>

    <div className="showcase-capability-strip">
      <span>{copy.stripLabel}</span>
      {copy.capabilities.map(item => <b key={item}>{item}</b>)}
    </div>
  </section>;
}

function TechProof({ t }) {
  const proof = t.techProof;
  if (!proof) return null;

  const proofIcons = [Database, Workflow, Monitor, Bot];
  return <section className="tech-proof" id="casos-reales">
    <div className="section-title proof-heading">
      <p>{proof.kicker}</p>
      <h2>{proof.title}</h2>
      <span>{proof.intro}</span>
    </div>

    <div className="proof-grid">
      {proof.cases.map((item, index) => {
        const Icon = proofIcons[index] || Sparkles;
        return <article className="proof-card" key={item.title}>
          <div className="proof-card-top">
            <span className="proof-number">{String(index + 1).padStart(2, "0")}</span>
            <span className="proof-status"><i />{proof.status}</span>
          </div>
          <div className="proof-icon"><Icon size={28}/></div>
          <small>{item.category}</small>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="proof-flow" aria-label={proof.flowLabel}>
            {item.flow.map((step, stepIndex) => <React.Fragment key={step}>
              <span>{step}</span>{stepIndex < item.flow.length - 1 && <ArrowRight size={14}/>}
            </React.Fragment>)}
          </div>
          <ul>{item.outputs.map(output => <li key={output}><Sparkles size={14}/>{output}</li>)}</ul>
          <a href={wa(`${proof.whatsapp}: ${item.title}`)} target="_blank" rel="noreferrer">
            {proof.cta}<ArrowRight size={16}/>
          </a>
        </article>;
      })}
    </div>

    <div className="automation-audit">
      <div>
        <small>{proof.auditKicker}</small>
        <h3>{proof.auditTitle}</h3>
        <p>{proof.auditText}</p>
      </div>
      <div className="audit-points">
        {proof.auditPoints.map(point => <span key={point}><Sparkles size={16}/>{point}</span>)}
      </div>
      <a className="btn btn-primary" href={wa(proof.auditWhatsapp)} target="_blank" rel="noreferrer">
        {proof.auditCta}<ArrowRight size={18}/>
      </a>
    </div>
  </section>;
}

function AutomationLab({ t }) {
  const content = t.aiLab;
  const [active, setActive] = useState(0);
  const [status, setStatus] = useState("idle");
  const timerRef = useRef();
  const scenario = content.scenarios[active];
  const icons = [FileSpreadsheet, Workflow, Monitor, ShieldCheck];

  const selectScenario = (index) => {
    window.clearTimeout(timerRef.current);
    setActive(index);
    setStatus("idle");
  };

  const runDemo = () => {
    window.clearTimeout(timerRef.current);
    setStatus("running");
    timerRef.current = window.setTimeout(() => setStatus("done"), 2300);
  };

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  return <section className="automation-lab" id="laboratorio">
    <div className="lab-heading">
      <div>
        <p>{content.kicker}</p>
        <h2>{content.title}</h2>
      </div>
      <span>{content.intro}</span>
    </div>

    <div className="lab-capabilities" aria-label={content.capabilitiesLabel}>
      {content.capabilities.map((capability, index) => <span key={capability}>
        <i>{String(index + 1).padStart(2, "0")}</i>{capability}
      </span>)}
    </div>

    <div className="lab-console">
      <div className="lab-selector">
        <small>{content.choose}</small>
        {content.scenarios.map((item, index) => {
          const Icon = icons[index] || Bot;
          return <button
            type="button"
            className={active === index ? "active" : ""}
            key={item.title}
            onClick={() => selectScenario(index)}
          >
            <Icon size={21}/>
            <span><b>{item.title}</b><em>{item.category}</em></span>
            <ArrowRight size={16}/>
          </button>;
        })}
        <div className="lab-safe-note"><LockKeyhole size={17}/><span><b>{content.safeTitle}</b>{content.safeText}</span></div>
      </div>

      <motion.div
        className={`lab-screen lab-${status}`}
        key={scenario.title}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="lab-screen-bar">
          <span><i/><i/><i/></span>
          <b>{content.liveBadge}</b>
          <em>{status === "running" ? content.processing : status === "done" ? content.completed : content.ready}</em>
        </div>

        <div className="lab-screen-copy">
          <small>{scenario.category}</small>
          <h3>{scenario.headline}</h3>
          <p>{scenario.problem}</p>
        </div>

        <div className="lab-flow" aria-label={content.flowLabel}>
          {scenario.flow.map((step, index) => <React.Fragment key={step.label}>
            <div className={`lab-flow-step ${status === "running" && index === 1 ? "working" : ""} ${status === "done" ? "complete" : ""}`}>
              <span>{index === 0 ? <FileSpreadsheet/> : index === 1 ? <Bot/> : index === 2 ? <CheckCircle2/> : <BarChart3/>}</span>
              <small>{step.kicker}</small>
              <b>{step.label}</b>
            </div>
            {index < scenario.flow.length - 1 && <div className="lab-connector"><i/></div>}
          </React.Fragment>)}
        </div>

        <div className="lab-results">
          <div className="lab-result-bars">
            {scenario.results.map((result, index) => <div key={result.label}>
              <span><b>{result.value}</b>{result.label}</span>
              <i><em style={{ "--result-width": `${result.percent}%`, "--result-delay": `${index * .18}s` }}/></i>
            </div>)}
          </div>
          <div className="lab-impact">
            <small>{content.impactLabel}</small>
            <strong>{scenario.impact}</strong>
            <span>{scenario.impactText}</span>
          </div>
        </div>

        <button type="button" className="lab-run" onClick={runDemo} disabled={status === "running"}>
          {status === "running" ? <RotateCw className="spin"/> : status === "done" ? <CheckCircle2/> : <Play/>}
          {status === "running" ? content.processingButton : status === "done" ? content.runAgain : content.run}
        </button>
      </motion.div>
    </div>

    <div className="trial-program">
      <div className="trial-title">
        <span><Download size={22}/></span>
        <div><small>{content.trial.kicker}</small><h3>{content.trial.title}</h3><p>{content.trial.text}</p></div>
      </div>
      <div className="trial-rules">
        <span><Timer/>{content.trial.uses}</span>
        <span><FileSpreadsheet/>{content.trial.data}</span>
        <span><LockKeyhole/>{content.trial.security}</span>
      </div>
      <a className="btn btn-primary" href={wa(content.trial.whatsapp)} target="_blank" rel="noreferrer">
        {content.trial.cta}<ArrowRight size={18}/>
      </a>
    </div>
  </section>;
}

function BottleneckSection({ t }) {
  const content = t.bottleneck;
  const [status, setStatus] = useState("idle");
  const timerRef = useRef();

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const runFlow = () => {
    window.clearTimeout(timerRef.current);
    setStatus("running");
    timerRef.current = window.setTimeout(() => setStatus("done"), 2500);
  };

  const inputIcons = [FileSpreadsheet, Database, Monitor, FileSpreadsheet, ShieldCheck, Download];
  const outputIcons = [CheckCircle2, ShieldCheck, FileSpreadsheet, BarChart3, Download];

  return <section className="bottleneck-section one-click-section" id="cuellos-botella">
    <div className="one-click-heading">
      <div>
        <p>{content.kicker}</p>
        <h2>{content.title}</h2>
      </div>
      <span>{content.text}</span>
    </div>

    <div className={`one-click-machine one-click-${status}`}>
      <div className="one-click-column input-column">
        <small>{content.inputLabel}</small>
        <div className="one-click-stack">
          {content.inputs.map((item, index) => {
            const Icon = inputIcons[index] || FileSpreadsheet;
            return <article key={item}>
              <span><Icon size={18}/></span>
              <b>{item}</b>
              <i />
            </article>;
          })}
        </div>
      </div>

      <div className="one-click-center">
        <div className="flow-wire flow-wire-left"><i/><i/><i/><i/></div>
        <div className="automation-engine">
          <span className="engine-ring ring-a"/>
          <span className="engine-ring ring-b"/>
          <div className="engine-core">
            <Bot size={42}/>
            <small>JYM</small>
          </div>
          <b>{content.engineTitle}</b>
          <em>{status === "running" ? content.processing : status === "done" ? content.completed : content.ready}</em>
        </div>
        <div className="flow-wire flow-wire-right"><i/><i/><i/><i/></div>

        <button type="button" className="one-click-button" onClick={runFlow} disabled={status === "running"}>
          {status === "running" ? <RotateCw className="spin"/> : status === "done" ? <CheckCircle2/> : <MousePointerClick/>}
          {status === "running" ? content.processingButton : status === "done" ? content.runAgain : content.button}
        </button>
      </div>

      <div className="one-click-column output-column">
        <small>{content.outputLabel}</small>
        <div className="one-click-stack">
          {content.outputs.map((item, index) => {
            const Icon = outputIcons[index] || CheckCircle2;
            return <article key={item}>
              <span><Icon size={18}/></span>
              <b>{item}</b>
              <i />
            </article>;
          })}
        </div>
      </div>

      <div className="automation-packets" aria-hidden="true">
        {Array.from({length:8}).map((_,index)=><i key={index} style={{"--packet":index}} />)}
      </div>
    </div>

    <div className="one-click-benefits">
      {content.benefits.map((item, index) => <article key={item.title}>
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div><b>{item.title}</b><small>{item.text}</small></div>
      </article>)}
    </div>

    <div className="bottleneck-result one-click-result">
      <div>
        <strong>{content.resultTitle}</strong>
        <span>{content.resultText}</span>
      </div>
      <a href={wa(content.whatsapp)} target="_blank" rel="noreferrer">{content.cta}<ArrowRight size={17}/></a>
    </div>
  </section>;
}

function PortalShowroom({ t }) {
  return <section className="portal-showroom" id="showroom">
    <div className="section-title"><p>{t.showroom.neutralKicker}</p><h2>{t.showroom.neutralTitle}</h2></div>
    <div className="portal-cards">
      <motion.article whileHover={{ y: -10 }} className="portal-card tech-card-portal">
        <Monitor size={48}/><h3>{t.nav.tech}</h3><p>{t.hero.techText}</p>
      </motion.article>
      <motion.article whileHover={{ y: -10 }} className="portal-card arch-card-portal">
        <Building2 size={48}/><h3>{t.nav.arch}</h3><p>{t.hero.archText}</p>
      </motion.article>
    </div>
  </section>;
}

function Showroom({ mode, t }) {
  if (mode === "arch") return <ArchitectureShowroom t={t} />;
  if (mode === "tech") return null;
  return <PortalShowroom t={t} />;
}

function Services({ mode, t }) {
  const selected = mode === "arch" ? t.services.arch : mode === "tech" ? t.services.tech : t.services.neutral;
  const icons = mode === "arch" ? [Building2, Building2, Hammer, Snowflake] :
    mode === "tech" ? [Code2, Workflow, Bot, Database] :
    [Monitor, Building2, Sparkles, Snowflake];

  return <section className={`services ${mode === "tech" ? "services-tech" : ""}`} id="servicios">
    {mode === "tech"
      ? <div className="services-tech-label"><p>{t.services.techSectionKicker}</p></div>
      : <div className="section-title"><p>{t.services.kicker}</p><h2>{t.services.title}</h2></div>}
    <div className="service-grid">
      {selected.map((text, idx) => {
        const Icon = icons[idx] || Sparkles;
        return <article key={text}><Icon /><b>{text}</b></article>;
      })}
    </div>

    {mode === "tech" && <TechShowcase t={t} />}
  </section>;
}

function ProcessSection({ t, mode }) {
  const title = mode === "arch" ? t.process.archTitle : mode === "tech" ? t.process.techTitle : t.process.title;
  const steps = mode === "arch" ? t.process.archSteps : mode === "tech" ? t.process.techSteps : t.process.steps;
  return <section className="process-section" id="proceso">
    <div className="section-title"><p>{t.process.kicker}</p><h2>{title}</h2></div>
    <div className="process-grid">
      {steps.map(([title, desc], i) => <article key={title}>
        <span>{String(i + 1).padStart(2, "0")}</span>
        <h3>{title}</h3>
        <p>{desc}</p>
      </article>)}
    </div>
  </section>;
}

function SuccessCases({ mode, t }) {
  const cards = mode === "arch" ? t.success.archCards : t.success.techCards;
  return <section className="success-section" id="casos"><div className="section-title compact-title"><p>{t.success.kicker}</p><h2>{t.success.title}</h2><span>{mode === "arch" ? t.success.arch : t.success.tech}</span></div>
    <div className="success-grid">{cards.map(([title, desc], i) => <motion.article key={title} className="success-card" whileHover={{ y: -12, rotateX: 2 }}><strong>{String(i+1).padStart(2,"0")}</strong><h3>{title}</h3><p>{desc}</p><div className="progress-line"><span style={{ width: `${72+i*9}%` }}/></div></motion.article>)}</div></section>;
}

function SmartSection({ mode, t }) {
  const isArch = mode === "arch";
  const isPortal = mode === "portal";
  const content = isArch ? t.smart.arch : isPortal ? t.smart.portal : t.smart.tech;
  const Icon = isArch ? Building2 : isPortal ? Sparkles : Bot;

  return <section className={`ai-section smart-section ${isArch ? "arch-smart" : "tech-smart"}`} id="automatizacion">
    <div className="ai-visual">
      <div className="ai-core"><Icon size={66}/></div>
      {Array.from({ length: 10 }).map((_, i) => <i key={i} style={{ "--i": i }}/>)}
    </div>
    <div>
      <p>{content.kicker}</p>
      <h2>{content.title}</h2>
      <div className="ai-list">
        {content.cards.map(item => <article key={item}><Sparkles size={20}/><span>{item}</span></article>)}
      </div>
    </div>
  </section>;
}

function Contact({ t, mode }) {
  const options = mode === "arch" ? t.contact.archOptions : mode === "tech" ? t.contact.techOptions : t.contact.portalOptions;
  const [form, setForm] = useState({ name: "", service: options[0], message: "" });

  useEffect(() => setForm(prev => ({ ...prev, service: options[0] })), [mode, options[0]]);

  const submit = (e) => {
    e.preventDefault();
    const message = `${t.contact.whatsappIntro}
${t.contact.nameLabel}: ${form.name}
${t.contact.serviceLabel}: ${form.service}
${t.contact.messageLabel}: ${form.message}`;
    window.open(wa(message), "_blank", "noopener,noreferrer");
  };

  const contactTitle = mode === "tech" ? t.contact.techTitle : mode === "arch" ? t.contact.archTitle : t.contact.title;
  return <section className="contact" id="contacto">
    <div className="contact-copy">
      <p>{t.contact.kicker}</p>
      <h2>{contactTitle}</h2>
      <a href={`mailto:${EMAIL}`}><Mail/> {EMAIL}</a>
      <a href={wa()} target="_blank" rel="noreferrer"><Phone size={19}/> {WHATSAPP_DISPLAY}</a>
      <div className="social-links">
        <a className="instagram-pill" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
        <a className="tiktok-pill" href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a>
      </div>
    </div>
    <form onSubmit={submit}>
      <input placeholder={t.contact.name} value={form.name} onChange={e => setForm({...form, name:e.target.value})} required/>
      <select value={form.service} onChange={e => setForm({...form, service:e.target.value})}>
        {options.map(option => <option key={option}>{option}</option>)}
      </select>
      <textarea rows="5" placeholder={t.contact.message} value={form.message} onChange={e => setForm({...form, message:e.target.value})}/>
      <button className="btn btn-primary">{t.contact.send}</button>
    </form>
  </section>;
}






const COMPANION_SECTIONS = {
  tech: [
    { id: "inicio", state: "home", side: "right" },
    { id: "showroom", state: "showroom", side: "right" },
    { id: "cuellos-botella", state: "process", side: "right" },
    { id: "laboratorio", state: "automation", side: "left" },
    { id: "casos-reales", state: "projects", side: "right" },
    { id: "servicios", state: "services", side: "right" },
    { id: "proceso", state: "process", side: "left" },
    { id: "automatizacion", state: "automation", side: "right" },
    { id: "contacto", state: "contact", side: "left" },
  ],
  arch: [
    { id: "inicio", state: "home", side: "left" },
    { id: "showroom", state: "showroom", side: "right" },
    { id: "servicios", state: "services", side: "left" },
    { id: "proceso", state: "process", side: "right" },
    { id: "casos", state: "projects", side: "left" },
    { id: "automatizacion", state: "automation", side: "right" },
    { id: "contacto", state: "contact", side: "left" },
  ]
};

function useVisibleCompanionSection(enabled, mode) {
  const sections = COMPANION_SECTIONS[mode] || COMPANION_SECTIONS.tech;
  const [current, setCurrent] = useState(sections[0]);

  useEffect(() => setCurrent(sections[0]), [mode]);

  useEffect(() => {
    if (!enabled) return undefined;

    const targets = sections
      .map(item => ({ ...item, element: document.getElementById(item.id) }))
      .filter(item => item.element);

    let frame = 0;
    const updateCurrentSection = () => {
      frame = 0;
      // La línea de activación representa lo que el visitante está leyendo.
      // Si cae entre dos secciones, gana el borde más cercano; así no queda
      // una mascota vieja mientras la siguiente sección ya está entrando.
      const activationLine = window.innerHeight * .46;
      let selected = targets[0];
      let bestDistance = Number.POSITIVE_INFINITY;

      targets.forEach(item => {
        const rect = item.element.getBoundingClientRect();
        const containsLine = rect.top <= activationLine && rect.bottom >= activationLine;
        const distance = containsLine
          ? 0
          : Math.min(Math.abs(rect.top - activationLine), Math.abs(rect.bottom - activationLine));

        if (distance < bestDistance) {
          selected = item;
          bestDistance = distance;
        }
      });

      setCurrent(previous => previous.id === selected.id ? previous : selected);
    };

    const scheduleUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateCurrentSection);
    };

    updateCurrentSection();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [enabled, mode]);

  return current;
}

function playCompanionTone(kind = "click") {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContextClass();
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    const frequencies = { click: 620, fly: 980, phone: 720, success: 1060, draw: 440 };
    const frequency = frequencies[kind] || 620;
    const duration = kind === "phone" ? .45 : .22;

    oscillator.connect(gain);
    gain.connect(ctx.destination);
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(240, ctx.currentTime + duration);
    gain.gain.setValueAtTime(.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.055, ctx.currentTime + .02);
    gain.gain.exponentialRampToValueAtTime(.0001, ctx.currentTime + duration);
    oscillator.start();
    oscillator.stop(ctx.currentTime + duration + .03);
    window.setTimeout(() => ctx.close(), 700);
  } catch {}
}

function AlienWorker({ state, active }) {
  return (
    <div className={`alien-worker worker-${state} ${active ? "is-active" : ""}`} aria-hidden="true">
      <div className="alien-worker-glow" />
      <div className="alien-worker-shadow" />

      <div className="alien-worker-body">
        <div className="alien-worker-head">
          <i className="alien-worker-antenna antenna-left" />
          <i className="alien-worker-antenna antenna-right" />
          <span className="alien-worker-eye eye-left" />
          <span className="alien-worker-eye eye-right" />
          <span className="alien-worker-smile" />
          <span className="alien-worker-cheek cheek-left" />
          <span className="alien-worker-cheek cheek-right" />
          <span className="alien-worker-headset" />
        </div>
        <div className="alien-worker-suit">
          <i className="alien-worker-badge" />
          <i className="alien-worker-zip" />
        </div>
        <i className="alien-worker-arm arm-left" />
        <i className="alien-worker-arm arm-right" />
        <i className="alien-worker-hand hand-left" />
        <i className="alien-worker-hand hand-right" />
        <i className="alien-worker-leg leg-left" />
        <i className="alien-worker-leg leg-right" />
        <i className="alien-worker-boot boot-left" />
        <i className="alien-worker-boot boot-right" />
      </div>

      <div className="alien-activity alien-showroom-activity">
        <span className="hologram-screen screen-a"><i/><i/><i/></span>
        <span className="hologram-screen screen-b"><i/><i/><i/></span>
        <span className="holo-orb" />
      </div>

      <div className="alien-activity alien-services-activity">
        <span className="alien-desk" />
        <span className="alien-laptop"><i/><i/><i/></span>
        <span className="alien-coffee">JYM</span>
        <span className="alien-code code-a">&lt;/&gt;</span>
        <span className="alien-code code-b">API</span>
      </div>

      <div className="alien-activity alien-process-activity">
        <span className="alien-flow-board">
          <i className="flow-point p1"/><i className="flow-point p2"/><i className="flow-point p3"/>
          <i className="flow-link l1"/><i className="flow-link l2"/>
        </span>
        <span className="alien-pointer" />
      </div>

      <div className="alien-activity alien-projects-activity">
        <span className="alien-project-board"><i/><i/><i/><i/></span>
        <span className="alien-visor" />
        <span className="approval-stamp">OK</span>
      </div>

      <div className="alien-activity alien-automation-activity">
        <span className="alien-machine">
          <i className="alien-gear gear-a">⚙</i>
          <i className="alien-gear gear-b">⚙</i>
          <b>AI</b>
        </span>
        <span className="alien-data-box">DATA</span>
        <span className="robot-arm" />
      </div>

      <div className="alien-activity alien-contact-activity">
        <span className="alien-contact-desk" />
        <span className="alien-phone">☎</span>
        <span className="alien-call-wave wave-a" />
        <span className="alien-call-wave wave-b" />
        <span className="alien-bag"><b>JYM</b></span>
        <span className="tiny-ufo" />
      </div>
    </div>
  );
}

function ArchitectWorker({ state, active }) {
  return (
    <div className={`architect-worker worker-${state} ${active ? "is-active" : ""}`} aria-hidden="true">
      <div className="architect-worker-glow" />
      <div className="architect-worker-shadow" />

      <div className="architect-worker-body">
        <div className="architect-worker-head">
          <span className="architect-hardhat"><i/></span>
          <i className="architect-eye eye-left" />
          <i className="architect-eye eye-right" />
          <i className="architect-smile" />
          <i className="architect-hair" />
        </div>
        <div className="architect-worker-vest"><i/><b/><em/></div>
        <i className="architect-worker-arm arm-left" />
        <i className="architect-worker-arm arm-right" />
        <i className="architect-worker-hand hand-left" />
        <i className="architect-worker-hand hand-right" />
        <i className="architect-worker-leg leg-left" />
        <i className="architect-worker-leg leg-right" />
        <i className="architect-worker-boot boot-left" />
        <i className="architect-worker-boot boot-right" />
      </div>

      <div className="architect-activity architect-showroom-activity">
        <span className="material-panel"><i/><i/><i/><b/></span>
        <span className="material-orb" />
      </div>

      <div className="architect-activity architect-services-activity">
        <span className="architect-desk" />
        <span className="architect-plan"><i/><i/><i/></span>
        <span className="architect-pencil" />
        <span className="architect-lamp" />
      </div>

      <div className="architect-activity architect-process-activity">
        <span className="measure-tape"><i/><b/><em>5.20 m</em></span>
        <span className="measure-tool">📐</span>
        <span className="wall-mark" />
      </div>

      <div className="architect-activity architect-projects-activity">
        <span className="building-model"><i/><i/><i/></span>
        <span className="inspection-glass" />
        <span className="project-light" />
      </div>

      <div className="architect-activity architect-automation-activity">
        <span className="construction-gear">⚙</span>
        <span className="air-unit"><i/><i/><i/></span>
        <span className="air-flow"><i/><i/><i/></span>
      </div>

      <div className="architect-activity architect-contact-activity">
        <span className="architect-contact-desk" />
        <span className="architect-phone">☎</span>
        <span className="architect-call-wave wave-a" />
        <span className="architect-call-wave wave-b" />
        <span className="architect-bag"><b>JYM</b></span>
        <span className="architect-door" />
      </div>
    </div>
  );
}

function AssistantMascot({ mode, state, active, content, prompt }) {
  const stateIcons = {
    home: Sparkles,
    showroom: Monitor,
    services: Code2,
    process: Workflow,
    projects: BarChart3,
    automation: Bot,
    contact: Mail,
  };
  const StateIcon = stateIcons[state] || Sparkles;
  const techPoses = {
    showroom: "/assets/characters/tech-showroom-v3.webp",
    services: "/assets/characters/tech-services-v3.webp",
    process: "/assets/characters/tech-process-v3.webp",
    projects: "/assets/characters/tech-projects-v3.webp",
    automation: "/assets/characters/tech-automation-v3.webp",
    contact: "/assets/characters/tech-contact-v3.webp",
  };
  const src = mode === "tech"
    ? techPoses[state] || "/assets/characters/asistente-tech-v2.webp"
    : "/assets/characters/asistente-arquitectura-v2.webp";

  return <div className={`assistant-mascot assistant-mascot-${mode} assistant-action-${state} ${active ? "assistant-active" : ""}`}>
    <div className="assistant-aura"><i/><i/><i/></div>
    {mode === "tech"
      ? <AnimatedTechAssistant state={state} active={active} fallbackSrc={src} />
      : <img className="assistant-mascot-image" src={src} alt="" draggable="false" />}
    <div className="assistant-tool-dock" aria-hidden="true">
      <div className="assistant-dock-head"><StateIcon size={20}/><span>{content.eyebrow}</span></div>
      <div className={`assistant-mini-scene mini-scene-${state}`}>
        <i className="mini-line line-a"/><i className="mini-line line-b"/><i className="mini-line line-c"/>
        <b className="mini-node node-a"/><b className="mini-node node-b"/><b className="mini-node node-c"/>
        <em className="mini-scan"/>
        <strong>{state === "automation" ? "AI" : state === "projects" ? "OK" : ""}</strong>
      </div>
      <small>{prompt}</small>
    </div>
  </div>;
}

function FloatingCompanion({ mode, t }) {
  const enabled = mode === "tech" || mode === "arch";
  const current = useVisibleCompanionSection(enabled, mode);
  const [action, setAction] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [bubbleVisible, setBubbleVisible] = useState(true);

  useEffect(() => {
    setAction(false);
    setHidden(false);
    setBubbleVisible(true);

    const timer = window.setTimeout(() => setBubbleVisible(false), 2600);
    return () => window.clearTimeout(timer);
  }, [current.state, mode]);

  if (!enabled) return null;

  const content = t.companion[mode][current.state] || t.companion[mode].home;
  const isTechHome = mode === "tech" && current.state === "home";
  const isArchHome = mode === "arch" && current.state === "home";

  const triggerAction = () => {
    if (action) return;
    setAction(true);
    setBubbleVisible(true);

    const sound = current.state === "contact"
      ? "phone"
      : isTechHome
        ? "fly"
        : current.state === "services"
          ? "draw"
          : current.state === "automation"
            ? "success"
            : "click";

    playCompanionTone(sound);

    if (isTechHome || isArchHome) {
      window.setTimeout(() => {
        setHidden(true);
        setBubbleVisible(false);
      }, 1100);
      window.setTimeout(() => setAction(false), 1700);
      return;
    }

    window.setTimeout(() => setAction(false), current.state === "contact" ? 2900 : 1900);
  };

  const followPointer = event => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
    const y = ((event.clientY - bounds.top) / bounds.height - .5) * 9;
    event.currentTarget.style.setProperty("--assistant-x", `${x.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--assistant-y", `${y.toFixed(2)}px`);
    event.currentTarget.style.setProperty("--assistant-ry", `${(x * .42).toFixed(2)}deg`);
    event.currentTarget.style.setProperty("--assistant-rx", `${(-y * .32).toFixed(2)}deg`);
  };

  const resetPointer = event => {
    event.currentTarget.style.setProperty("--assistant-x", "0px");
    event.currentTarget.style.setProperty("--assistant-y", "0px");
    event.currentTarget.style.setProperty("--assistant-ry", "0deg");
    event.currentTarget.style.setProperty("--assistant-rx", "0deg");
    if (!action) setBubbleVisible(false);
  };

  if (hidden) {
    return (
      <motion.button
        className={`companion-recall recall-${mode} recall-${current.side}`}
        initial={{ opacity: 0, scale: .65 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => {
          setHidden(false);
          setBubbleVisible(true);
        }}
        aria-label={mode === "tech" ? t.companion.returnAlien : t.companion.returnArchitect}
      >
        {mode === "tech" ? "👽" : "🔨"}
      </motion.button>
    );
  }

  return (
    <motion.aside
      key={mode}
      className={`companion-system companion-${mode} companion-${current.side} companion-${current.state} ${action ? "is-performing" : ""}`}
      initial={{ opacity: 0, x: current.side === "left" ? -90 : 90, y: 16 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 110, damping: 18 }}
      onPointerMove={followPointer}
      onMouseEnter={() => setBubbleVisible(true)}
      onMouseLeave={resetPointer}
      onClick={triggerAction}
      onKeyDown={event => {
        if (event.key === "Enter" || event.key === " ") triggerAction();
      }}
      role="button"
      tabIndex={0}
      aria-label={`${content.title}. ${t.companion.actionPrompt}`}
    >
      <div className="companion-character-stage">
        {mode === "tech" ? <>
          <div className={`hero-ufo-wrap tech-home-visual ${isTechHome ? "is-visible" : "is-hidden"}`}>
            <img src="/assets/characters/marcianito-nave.png" alt={t.companion.alienAlt} className="hero-ufo" draggable="false" />
            <i className="hero-ufo-beam" />
            <i className="hero-ufo-trail" />
            <i className="hero-ufo-spark s1" />
            <i className="hero-ufo-spark s2" />
          </div>
          <div className={`tech-assistant-slot ${isTechHome ? "is-hidden" : "is-visible"}`}>
            <AssistantMascot mode="tech" state={current.state} active={action} content={content} prompt={t.companion.actionPrompt} />
          </div>
        </> : (
          <AssistantMascot mode={mode} state={current.state} active={action} content={content} prompt={t.companion.actionPrompt} />
        )}
      </div>

      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            key={current.state}
            className="companion-speech"
            initial={{ opacity: 0, scale: .84, y: 9 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: .88, y: 6 }}
          >
            <small>{content.eyebrow}</small>
            <strong>{content.title}</strong>
            <span>{content.message}</span>
            <em>{action ? t.companion.actionRunning : t.companion.actionPrompt}</em>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.aside>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <button
    className={visible ? "scroll-top show" : "scroll-top"}
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    aria-label="Subir al inicio"
  >
    <ArrowRight />
  </button>;
}

function WorldAmbientBackground({ mode }) {
  const layerRef = useRef(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || mode === "portal") return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY || 0;
      const progress = Math.min(1, Math.max(0, y / maxScroll));

      layer.style.setProperty("--ambient-progress", progress.toFixed(4));
      layer.style.setProperty("--ambient-shift-slow", `${(-y * 0.026).toFixed(2)}px`);
      layer.style.setProperty("--ambient-shift-fast", `${(-y * 0.055).toFixed(2)}px`);
      layer.style.setProperty("--ambient-shift-side", `${(Math.sin(y / 520) * 22).toFixed(2)}px`);
      layer.style.setProperty("--ambient-draw", String(Math.max(0, 1450 - progress * 1450)));
      layer.style.setProperty("--ambient-data-offset", String(-(y % 240)));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [mode]);

  if (mode === "portal") return null;

  const techSignals = [
    ["API CONNECTED", "200 OK"],
    ["BOT ONLINE", "RUNNING"],
    ["DATA PIPELINE", "SYNC 100%"],
    ["VALIDATION", "PASS"],
    ["OCR NODE", "READY"],
    ["QUEUE", "12 TASKS"],
    ["RETRY", "0 ERRORS"],
    ["EXPORT", "READY"]
  ];

  return <div ref={layerRef} className={`world-ambient world-ambient-${mode}`} aria-hidden="true">
    {mode === "tech" ? <>
      <div className="ambient-tech-grid" />
      <svg className="ambient-network ambient-network-back" viewBox="0 0 1600 1000" preserveAspectRatio="none">
        <g className="ambient-network-links">
          <path d="M70 180 C330 70 430 270 690 190 S1110 80 1510 220" />
          <path d="M40 520 C280 410 430 680 760 500 S1210 360 1570 560" />
          <path d="M160 850 C410 690 610 930 900 760 S1290 650 1540 840" />
          <path d="M280 70 C420 310 300 500 520 710 S930 820 1100 980" />
          <path d="M1150 30 C1020 250 1240 390 1050 590 S760 760 690 970" />
        </g>
        <g className="ambient-network-nodes">
          {[
            [120,170],[380,130],[675,200],[980,135],[1320,180],[1510,220],
            [160,520],[480,590],[760,500],[1120,450],[1450,545],
            [250,835],[610,850],[920,755],[1270,730],[1510,835]
          ].map(([cx,cy],index)=><circle key={index} cx={cx} cy={cy} r={index % 3 === 0 ? 6 : 3.5} />)}
        </g>
      </svg>

      <div className="ambient-code-cloud">
        {techSignals.map(([label,status],index)=><div
          className={`ambient-code-card ambient-code-${index + 1}`}
          key={label}
        >
          <small>{label}</small>
          <b>{status}</b>
          <i />
        </div>)}
      </div>

      <div className="ambient-code-lines">
        <span>const flow = await JYM.connect(source);</span>
        <span>validate(data) → classify() → export();</span>
        <span>if (error) retry({"{ attempts: 3 }"});</span>
        <span>pipeline.status = "READY";</span>
        <span>humanReview(exceptionsOnly);</span>
      </div>

      <div className="ambient-data-packets">
        {Array.from({length:12}).map((_,index)=><i key={index} style={{"--ambient-packet":index}} />)}
      </div>
    </> : <>
      <div className="ambient-blueprint-grid" />
      <svg className="ambient-plan" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice">
        <g className="ambient-plan-main">
          <rect x="170" y="125" width="1260" height="720" />
          <line x1="520" y1="125" x2="520" y2="845" />
          <line x1="1010" y1="125" x2="1010" y2="845" />
          <line x1="170" y1="410" x2="1430" y2="410" />
          <line x1="170" y1="665" x2="1010" y2="665" />
          <path d="M520 410 C590 410 630 450 630 520" />
          <path d="M1010 410 C940 410 900 450 900 520" />
          <path d="M520 665 C590 665 625 700 625 770" />
          <path d="M1010 665 H1180 V845" />
        </g>

        <g className="ambient-plan-furniture">
          <rect x="245" y="210" width="185" height="88" rx="8" />
          <rect x="275" y="322" width="130" height="48" rx="5" />
          <circle cx="760" cy="250" r="70" />
          <line x1="690" y1="250" x2="830" y2="250" />
          <line x1="760" y1="180" x2="760" y2="320" />
          <rect x="1100" y="205" width="210" height="110" rx="6" />
          <rect x="1110" y="505" width="215" height="88" rx="6" />
          <circle cx="770" cy="740" r="58" />
        </g>

        <g className="ambient-plan-dimensions">
          <line x1="130" y1="125" x2="130" y2="845" />
          <line x1="170" y1="890" x2="1430" y2="890" />
          <line x1="115" y1="125" x2="145" y2="125" />
          <line x1="115" y1="845" x2="145" y2="845" />
          <line x1="170" y1="875" x2="170" y2="905" />
          <line x1="1430" y1="875" x2="1430" y2="905" />
        </g>
      </svg>

      <div className="ambient-plan-labels">
        <span className="plan-label plan-label-1">SALA · 24.80 m²</span>
        <span className="plan-label plan-label-2">COCINA · EJE B</span>
        <span className="plan-label plan-label-3">ESTUDIO · 3.40 m</span>
        <span className="plan-label plan-label-4">CIRCULACIÓN</span>
        <span className="plan-label plan-label-5">NPT +0.15</span>
        <span className="plan-label plan-label-6">ESC 1:50 · A-01</span>
      </div>

      <div className="ambient-drafting-cross cross-a"><i/><i/></div>
      <div className="ambient-drafting-cross cross-b"><i/><i/></div>
      <div className="ambient-drafting-cross cross-c"><i/><i/></div>
    </>}
  </div>;
}

function App() {
  const [mode, setModeState] = useState("portal");
  const [lang, setLang] = useState("es");
  const t = translations[lang];
  const overlay = useRef();

  const setMode = (next, options = {}) => {
    if (next === mode) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.clearTimeout(window.__jymModeTimer);
    window.clearTimeout(window.__jymOverlayTimer);

    if (next === "portal") {
      overlay.current?.classList.remove("active");
      setModeState("portal");
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      return;
    }

    if (options.direct) {
      overlay.current?.classList.remove("active");
      setModeState(next);
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "auto" }));
      return;
    }

    overlay.current?.classList.add("active");
    gsap.killTweensOf(".transition-logo");
    gsap.fromTo(
      ".transition-logo",
      { scale: 0.72, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.28, overwrite: true }
    );

    window.__jymModeTimer = window.setTimeout(() => {
      setModeState(next);
      window.scrollTo({ top: 0, behavior: "auto" });
    }, 260);

    window.__jymOverlayTimer = window.setTimeout(() => {
      overlay.current?.classList.remove("active");
    }, 620);
  };

  useEffect(() => {
    document.documentElement.dataset.mode = mode;
    const safety = window.setTimeout(() => overlay.current?.classList.remove("active"), 900);
    return () => window.clearTimeout(safety);
  }, [mode]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <div className={`app ${mode}`}>
    <WorldAmbientBackground mode={mode} />
    <div className="transition" ref={overlay}><img className="transition-logo" src="/assets/brand/logo-jym-bg.jpg" alt="JYM" /><span>{mode === "arch" ? t.nav.arch : mode === "tech" ? t.nav.tech : t.nav.portal}</span></div>
    <Header mode={mode} setMode={setMode} lang={lang} setLang={setLang} t={t} />
    <main>
      <Hero mode={mode} setMode={setMode} t={t} />
      <Showroom mode={mode} t={t} />
      {mode === "tech" && <BottleneckSection t={t} />}
      {mode === "tech" && <AutomationLab t={t} />}
      {mode === "tech" && <TechProof t={t} />}
      <Services mode={mode} t={t} />
      <ProcessSection t={t} mode={mode} />
      {mode !== "tech" && <SuccessCases mode={mode} t={t} />}
      <SmartSection mode={mode} t={t} />
      <Contact t={t} mode={mode} />
      <footer className="footer">© 2026 JYM Diseño y Arquitectura S.A.C. · Technology, Architecture & Automation.</footer>
    </main>
    <FloatingCompanion mode={mode} t={t} />
    <div className="floating-actions">
      <ScrollTopButton />
      <a className="whatsapp whatsapp-3d" href={wa()} target="_blank" rel="noreferrer" aria-label={`Contactar por WhatsApp al ${WHATSAPP_DISPLAY}`}>
        <span className="whatsapp-3d-core" aria-hidden="true">
          <MessageCircle className="whatsapp-chat" />
          <Phone className="whatsapp-phone" />
        </span>
        <span className="whatsapp-3d-label" aria-hidden="true"><b>WhatsApp</b><small>993 212 999</small></span>
      </a>
    </div>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
