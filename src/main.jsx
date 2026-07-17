import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Html, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import {
  ArrowRight, BarChart3, Bot, Building2, ChevronLeft, ChevronRight, Code2,
  Database, Hammer, Home, IdCard, Mail, Menu, Monitor, MousePointerClick,
  Play, Scale, Snowflake, Sparkles, Workflow, X
} from "lucide-react";
import { archCatalog, techCatalog } from "./catalog.js";
import { translations } from "./i18n.js";
import "./styles.css";

const WHATSAPP = "51923558554";
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
  return <Canvas className="scene3d" dpr={[1, 1.75]} shadows gl={{ alpha: true, antialias: true }}>
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

function Header({ mode, setMode, lang, setLang, t }) {
  const [open, setOpen] = useState(false);
  const navItems = [
    ["#inicio", t.nav.portal, () => setMode("portal")],
    ["#servicios", t.nav.services, null],
    ["#showroom", mode === "arch" ? t.nav.arch : t.nav.tech, null],
    ["#proceso", t.nav.process, null],
    ["#casos", t.nav.success, null]
  ];

  return <header className="topbar premium-nav">
    <a className="brand-mini" href="#inicio" onClick={() => setMode("portal")}><img src="/assets/brand/logo-jym-bg.jpg" alt="JYM" /></a>

    <nav className="top-tabs">
      {navItems.map(([href, label, action]) => action ? (
        <button key={label} className={mode === "portal" ? "top-choice active" : "top-choice"} onClick={action}>{label}</button>
      ) : (
        <a key={label} className="top-choice ghost-link" href={href}>{label}</a>
      ))}
    </nav>

    <button className="lang-switch" onClick={() => setLang(lang === "es" ? "en" : "es")} aria-label="Cambiar idioma">
      <span className={lang === "es" ? "active" : ""}>ES</span>
      <i />
      <span className={lang === "en" ? "active" : ""}>EN</span>
    </button>

    <a className="btn btn-primary" href={wa()} target="_blank" rel="noreferrer">{t.nav.quote}</a>

    <button className="menu-btn" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    {open && <nav className="mobile-menu">
      <button onClick={() => { setMode("portal"); setOpen(false); }}>{t.nav.portal}</button>
      <button onClick={() => { setMode("tech"); setOpen(false); }}>{t.nav.tech}</button>
      <button onClick={() => { setMode("arch"); setOpen(false); }}>{t.nav.arch}</button>
      <a href="#servicios">{t.nav.services}</a>
      <a href="#proceso">{t.nav.process}</a>
      <a href="#casos">{t.nav.success}</a>
      <button onClick={() => setLang(lang === "es" ? "en" : "es")}>{lang === "es" ? "English" : "Español"}</button>
    </nav>}
  </header>;
}

function Hero({ mode, setMode, t }) {
  const isTech = mode === "tech";
  const isArch = mode === "arch";
  const portal = mode === "portal";

  return <section className={`hero hero-${mode}`} id="inicio">
    <div className="hero-ambient" />
    <div className="hero-orbit orbit-a" />
    <div className="hero-orbit orbit-b" />

    {isTech && <div className="world-model world-model-tech">
      <Scene3D mode="tech" />
    </div>}

    {isArch && <div className="world-model world-model-arch">
      <Scene3D mode="arch" />
    </div>}

    <AnimatePresence mode="wait">
      {portal && <motion.div
        key="portal"
        className="portal-layout"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: .97 }}
      >
        <button className="portal-world portal-tech" onClick={() => setMode("tech")}>
          <div className="portal-visual portal-visual-tech">
            <Monitor size={66} />
            <i /><i /><i />
          </div>
          <small>{t.hero.techBadge}</small>
          <h2>{t.nav.tech}</h2>
          <p>{t.hero.techText}</p>
          <span>{t.hero.techCta} <ArrowRight size={18}/></span>
        </button>

        <div className="portal-center">
          <p>{t.hero.neutralBadge}</p>
          <h1>{t.hero.neutralTitle}</h1>
          <span>{t.hero.neutralText}</span>
          <div className="portal-actions">
            <button className="btn btn-cold" onClick={() => setMode("tech")}><Code2 size={18}/>{t.hero.techCta}</button>
            <button className="btn btn-warm" onClick={() => setMode("arch")}><Building2 size={18}/>{t.hero.archCta}</button>
          </div>
          <div className="hero-socials">
            <small>{t.labels.follow}</small>
            <a className="instagram-pill" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">Instagram</a>
            <a className="tiktok-pill" href={TIKTOK_URL} target="_blank" rel="noreferrer">TikTok</a>
          </div>
        </div>

        <button className="portal-world portal-arch" onClick={() => setMode("arch")}>
          <div className="portal-visual portal-visual-arch">
            <Building2 size={66} />
            <i /><i /><i />
          </div>
          <small>{t.hero.archBadge}</small>
          <h2>{t.nav.arch}</h2>
          <p>{t.hero.archText}</p>
          <span>{t.hero.archCta} <ArrowRight size={18}/></span>
        </button>
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
          <a className="btn btn-cold" href="#showroom">{t.nav.services}<ArrowRight size={18}/></a>
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
    ...(selectedRaw.videos || []).map(v => ({ type: "video", src: v.src, title: v.title?.toLowerCase?.().includes("segundo") ? t.labels.segundoPiso : t.labels.primerPiso })),
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
      <aside className="room-menu">
        {archCatalog.map((item) => { const c = t.archCatalog[item.id] || [item.title,item.tag,item.description]; return <button key={item.id} className={item.id === selectedId ? "active" : ""} onClick={() => setSelectedId(item.id)}>
          <span>{c[1]}</span><b>{c[0]}</b><small>{(item.images?.length || 0) + (item.videos?.length || 0)} {t.labels.evidencias}</small>
        </button>})}
      </aside>
      <div className="cinema-card">
        <div className="cinema-frame">
          <AnimatePresence mode="wait">
            <motion.div key={current?.src || "empty-media"} className="media-transition" initial={{ opacity: 0, scale: 1.04, filter: "blur(8px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} exit={{ opacity: 0, scale: .98, filter: "blur(8px)" }} transition={{ duration: .45 }}>
              {current?.type === "video" ? <video key={current.src} src={current.src} controls playsInline preload="metadata" /> : current?.src ? <img key={current.src} src={current.src} alt={selected.title} /> : <div className="placeholder"><Sparkles size={70} /></div>}
            </motion.div>
          </AnimatePresence>
          {media.length > 1 && <><button className="nav-arrow left" onClick={prev}><ChevronLeft /></button><button className="nav-arrow right" onClick={next}><ChevronRight /></button></>}
          <div className="cinema-label"><small>{selected.tag}</small><h3>{selected.title}</h3><p>{selected.description}</p></div>
        </div>
        <div className="filmstrip">{media.map((m, i) => <button key={m.src} className={i === mediaIndex ? "active" : ""} onClick={() => setMediaIndex(i)}>{m.type === "video" ? <><Play size={22}/><span>{m.title}</span></> : <img src={m.src} alt="" />}</button>)}</div>
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
  if (mode === "tech") return <TechShowroom t={t} />;
  return <PortalShowroom t={t} />;
}

function Services({ mode, t }) {
  const selected = mode === "arch" ? t.services.arch : mode === "tech" ? t.services.tech : t.services.neutral;
  const icons = mode === "arch" ? [Building2, Building2, Hammer, Snowflake] :
    mode === "tech" ? [Code2, Workflow, Bot, Database] :
    [Monitor, Building2, Sparkles, Snowflake];

  return <section className="services" id="servicios">
    <div className="section-title"><p>{t.services.kicker}</p><h2>{t.services.title}</h2></div>
    <div className="service-grid">
      {selected.map((text, idx) => {
        const Icon = icons[idx] || Sparkles;
        return <article key={text}><Icon /><b>{text}</b></article>;
      })}
    </div>
  </section>;
}

function ProcessSection({ t }) {
  return <section className="process-section" id="proceso">
    <div className="section-title"><p>{t.process.kicker}</p><h2>{t.process.title}</h2></div>
    <div className="process-grid">
      {t.process.steps.map(([title, desc], i) => <article key={title}>
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

  return <section className="contact" id="contacto">
    <div className="contact-copy">
      <p>{t.contact.kicker}</p>
      <h2>{t.contact.title}</h2>
      <a href={`mailto:${EMAIL}`}><Mail/> {EMAIL}</a>
      <a href={wa()} target="_blank" rel="noreferrer">+51 923 558 554</a>
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



const COMPANION_SECTIONS = [
  { id: "inicio", state: "home" },
  { id: "showroom", state: "showroom" },
  { id: "servicios", state: "services" },
  { id: "proceso", state: "process" },
  { id: "casos", state: "projects" },
  { id: "automatizacion", state: "automation" },
  { id: "contacto", state: "contact" },
];

function SectionCompanion({ mode, t }) {
  const [sectionState, setSectionState] = useState("home");
  const [side, setSide] = useState("right");
  const isVisible = mode === "tech" || mode === "arch";

  useEffect(() => {
    if (!isVisible) return undefined;

    const targets = COMPANION_SECTIONS
      .map(item => ({ ...item, element: document.getElementById(item.id) }))
      .filter(item => item.element);

    const observer = new IntersectionObserver(
      entries => {
        const visibleEntries = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visibleEntries.length) return;

        const current = targets.find(item => item.element === visibleEntries[0].target);
        if (!current) return;

        setSectionState(current.state);
        setSide(["services", "projects", "contact"].includes(current.state) ? "left" : "right");
      },
      {
        root: null,
        rootMargin: "-18% 0px -48% 0px",
        threshold: [0.12, 0.28, 0.5, 0.72],
      }
    );

    targets.forEach(item => observer.observe(item.element));
    return () => observer.disconnect();
  }, [isVisible, mode]);

  if (!isVisible) return null;

  const content = t.companion[mode][sectionState] || t.companion[mode].home;

  return (
    <motion.aside
      key={`${mode}-${side}`}
      className={`section-companion companion-${mode} companion-${side} companion-state-${sectionState}`}
      initial={{ opacity: 0, y: 28, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 150, damping: 18 }}
      aria-live="polite"
    >
      <div className="companion-stage" aria-hidden="true">
        <div className="mini-person">
          <div className="mini-head">
            <span className="mini-face" />
            {mode === "arch" && <span className="mini-helmet" />}
            {mode === "tech" && <span className="mini-antenna" />}
          </div>
          <div className="mini-body">
            <span className="mini-arm mini-arm-left" />
            <span className="mini-arm mini-arm-right" />
            <span className="mini-leg mini-leg-left" />
            <span className="mini-leg mini-leg-right" />
          </div>
        </div>

        <div className="companion-prop prop-laptop">
          <span />
        </div>
        <div className="companion-prop prop-board">
          <i /><i /><i />
        </div>
        <div className="companion-prop prop-phone">☎</div>
        <div className="companion-prop prop-gears">⚙</div>
        <div className="companion-prop prop-blueprint">
          <i /><i /><i />
        </div>
        <div className="companion-prop prop-model">
          <span /><span /><span />
        </div>
        <div className="companion-shadow" />
      </div>

      <div className="companion-dialog">
        <small>{content.eyebrow}</small>
        <strong>{content.title}</strong>
        <span>{content.message}</span>
      </div>
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

function App() {
  const [mode, setModeState] = useState("portal");
  const [lang, setLang] = useState("es");
  const t = translations[lang];
  const overlay = useRef();

  const setMode = (next) => {
    if (next === mode) return;
    overlay.current?.classList.add("active");
    gsap.fromTo(".transition-logo", { scale: 0.55, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.35 });
    setTimeout(() => setModeState(next), 330);
    setTimeout(() => overlay.current?.classList.remove("active"), 820);
  };

  useEffect(() => { document.documentElement.dataset.mode = mode; }, [mode]);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  return <div className={`app ${mode}`}>
    <div className="transition" ref={overlay}><img className="transition-logo" src="/assets/brand/logo-jym-bg.jpg" alt="JYM" /><span>{mode === "arch" ? t.nav.arch : mode === "tech" ? t.nav.tech : t.nav.portal}</span></div>
    <Header mode={mode} setMode={setMode} lang={lang} setLang={setLang} t={t} />
    <main>
      <Hero mode={mode} setMode={setMode} t={t} />
      <Showroom mode={mode} t={t} />
      <Services mode={mode} t={t} />
      <ProcessSection t={t} />
      <SuccessCases mode={mode} t={t} />
      <SmartSection mode={mode} t={t} />
      <Contact t={t} mode={mode} />
      <footer className="footer">© 2026 JYM Diseño y Arquitectura S.A.C. · Technology, Architecture & Automation.</footer>
    </main>
    <SectionCompanion mode={mode} t={t} />
    <ScrollTopButton />
    <a className="whatsapp" href={wa()} target="_blank" rel="noreferrer">✆</a>
  </div>;
}

createRoot(document.getElementById("root")).render(<App />);
