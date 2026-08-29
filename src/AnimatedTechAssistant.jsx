import { Component, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import * as THREE from "three";

const CYAN = "#00d9ff";
const GREEN = "#78ff28";
const NAVY = "#061a31";
const SUIT = "#0b3154";

class WebGLBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2", { failIfMajorPerformanceCaveat: true })
      || canvas.getContext("webgl", { failIfMajorPerformanceCaveat: true });
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(context);
  } catch {
    return false;
  }
}

function GlowMaterial({ color = CYAN, opacity = 1 }) {
  return <meshStandardMaterial
    color={color}
    emissive={color}
    emissiveIntensity={1.35}
    transparent={opacity < 1}
    opacity={opacity}
    toneMapped={false}
  />;
}

function Arm({ side, shoulderRef, elbowRef }) {
  const x = side === "left" ? -.74 : .74;
  return <group ref={shoulderRef} position={[x, .38, 0]}>
    <mesh position={[0, -.31, 0]} castShadow>
      <capsuleGeometry args={[.13, .4, 8, 16]} />
      <meshStandardMaterial color={SUIT} roughness={.3} metalness={.45} />
    </mesh>
    <mesh position={[0, -.56, .01]}>
      <torusGeometry args={[.14, .035, 8, 20]} />
      <GlowMaterial />
    </mesh>
    <group ref={elbowRef} position={[0, -.61, 0]}>
      <mesh position={[0, -.27, 0]} castShadow>
        <capsuleGeometry args={[.115, .34, 8, 16]} />
        <meshStandardMaterial color="#0a2949" roughness={.32} metalness={.4} />
      </mesh>
      <mesh position={[0, -.55, 0]} castShadow>
        <sphereGeometry args={[.17, 20, 16]} />
        <meshStandardMaterial color={GREEN} emissive="#1c7800" emissiveIntensity={.35} roughness={.32} />
      </mesh>
      <mesh position={[0, -.43, .13]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.105, .025, 8, 20]} />
        <GlowMaterial />
      </mesh>
      <mesh position={[0, -.57, .15]} scale={[.62, .34, .35]}>
        <sphereGeometry args={[.12, 16, 12]} />
        <meshStandardMaterial color="#b6ff75" emissive={GREEN} emissiveIntensity={.2} />
      </mesh>
      {[-.075, 0, .075].map((fingerX, index) => <mesh
        key={fingerX}
        position={[fingerX, -.69, .14]}
        rotation={[.3, 0, (index - 1) * .12]}
      >
        <capsuleGeometry args={[.024, .12, 4, 8]} />
        <meshStandardMaterial color="#a8ff64" emissive="#2c7300" emissiveIntensity={.22} roughness={.28} />
      </mesh>)}
    </group>
  </group>;
}

function Leg({ side }) {
  const x = side === "left" ? -.32 : .32;
  return <group position={[x, -1.08, 0]}>
    <mesh position={[0, -.3, 0]} castShadow>
      <capsuleGeometry args={[.15, .4, 8, 16]} />
      <meshStandardMaterial color={NAVY} roughness={.4} metalness={.4} />
    </mesh>
    <mesh position={[side === "left" ? -.04 : .04, -.62, .1]} scale={[1.22, .58, 1.7]} castShadow>
      <sphereGeometry args={[.2, 20, 14]} />
      <meshStandardMaterial color="#03101f" roughness={.32} metalness={.6} />
    </mesh>
    <mesh position={[0, -.47, .13]}>
      <boxGeometry args={[.24, .045, .22]} />
      <GlowMaterial />
    </mesh>
  </group>;
}

function Face({ headRef, leftEyeRef, rightEyeRef }) {
  return <group ref={headRef} position={[0, 1.12, 0]}>
    <mesh scale={[1, .88, .82]} castShadow>
      <sphereGeometry args={[.78, 40, 28]} />
      <meshPhysicalMaterial color={GREEN} emissive="#174f00" emissiveIntensity={.28} roughness={.2} metalness={.04} clearcoat={.75} clearcoatRoughness={.2} />
    </mesh>
    <mesh position={[0, .43, .63]} scale={[1.6, .48, .28]}>
      <sphereGeometry args={[.25, 24, 16]} />
      <meshPhysicalMaterial color="#082743" metalness={.72} roughness={.2} clearcoat={.8} />
    </mesh>
    <mesh position={[0, .39, .705]} scale={[1.25, .15, .18]}>
      <sphereGeometry args={[.22, 20, 12]} />
      <GlowMaterial color={CYAN} opacity={.82} />
    </mesh>

    <group position={[-.29, .08, .61]} rotation={[0, -.08, 0]}>
      <mesh ref={leftEyeRef} scale={[1, 1.12, .5]}>
        <sphereGeometry args={[.21, 24, 18]} />
        <meshStandardMaterial color="#eaffff" roughness={.08} />
      </mesh>
      <mesh position={[.035, -.01, .17]}>
        <sphereGeometry args={[.105, 20, 16]} />
        <GlowMaterial color="#087eff" />
      </mesh>
      <mesh position={[.06, .035, .255]}>
        <sphereGeometry args={[.035, 12, 10]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>
    <group position={[.29, .08, .61]} rotation={[0, .08, 0]}>
      <mesh ref={rightEyeRef} scale={[1, 1.12, .5]}>
        <sphereGeometry args={[.21, 24, 18]} />
        <meshStandardMaterial color="#eaffff" roughness={.08} />
      </mesh>
      <mesh position={[-.035, -.01, .17]}>
        <sphereGeometry args={[.105, 20, 16]} />
        <GlowMaterial color="#087eff" />
      </mesh>
      <mesh position={[-.01, .035, .255]}>
        <sphereGeometry args={[.035, 12, 10]} />
        <meshBasicMaterial color="#ffffff" toneMapped={false} />
      </mesh>
    </group>

    <mesh position={[0, -.22, .68]} rotation={[0, 0, Math.PI]}>
      <torusGeometry args={[.2, .028, 8, 28, Math.PI]} />
      <meshStandardMaterial color="#072515" roughness={.4} />
    </mesh>
    <mesh position={[-.54, -.15, .52]} scale={[1.4, .55, .3]}>
      <sphereGeometry args={[.08, 14, 10]} />
      <meshBasicMaterial color="#ff6e8c" transparent opacity={.4} />
    </mesh>
    <mesh position={[.54, -.15, .52]} scale={[1.4, .55, .3]}>
      <sphereGeometry args={[.08, 14, 10]} />
      <meshBasicMaterial color="#ff6e8c" transparent opacity={.4} />
    </mesh>

    <group position={[-.34, .77, 0]} rotation={[0, 0, -.12]}>
      <mesh position={[0, .28, 0]}>
        <cylinderGeometry args={[.025, .045, .58, 10]} />
        <GlowMaterial color={GREEN} />
      </mesh>
      <mesh position={[0, .6, 0]}>
        <sphereGeometry args={[.09, 18, 14]} />
        <GlowMaterial color={GREEN} />
      </mesh>
    </group>
    <group position={[.34, .77, 0]} rotation={[0, 0, .12]}>
      <mesh position={[0, .28, 0]}>
        <cylinderGeometry args={[.025, .045, .58, 10]} />
        <GlowMaterial color={GREEN} />
      </mesh>
      <mesh position={[0, .6, 0]}>
        <sphereGeometry args={[.09, 18, 14]} />
        <GlowMaterial color={GREEN} />
      </mesh>
    </group>

    <mesh position={[-.78, 0, .02]} rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[.2, .2, .11, 24]} />
      <meshStandardMaterial color="#05243d" metalness={.65} roughness={.25} />
    </mesh>
    <mesh position={[.78, 0, .02]} rotation={[0, Math.PI / 2, 0]}>
      <cylinderGeometry args={[.2, .2, .11, 24]} />
      <meshStandardMaterial color="#05243d" metalness={.65} roughness={.25} />
    </mesh>
    <mesh position={[.83, 0, .04]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[.12, .03, 8, 20]} />
      <GlowMaterial />
    </mesh>
    <mesh position={[-.83, 0, .04]} rotation={[0, Math.PI / 2, 0]}>
      <torusGeometry args={[.12, .03, 8, 20]} />
      <GlowMaterial />
    </mesh>
  </group>;
}

function Body({ coreRef }) {
  return <>
    <mesh position={[0, .05, 0]} scale={[.92, 1.04, .68]} castShadow>
      <capsuleGeometry args={[.52, .62, 10, 24]} />
      <meshPhysicalMaterial color={SUIT} metalness={.62} roughness={.22} clearcoat={.65} clearcoatRoughness={.2} />
    </mesh>
    <mesh position={[0, .72, .01]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[.45, .06, 10, 32]} />
      <meshPhysicalMaterial color="#071c30" metalness={.8} roughness={.18} clearcoat={1} />
    </mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * .64, .43, .04]} scale={[1.55, .72, 1.25]} rotation={[0, 0, side * -.17]} castShadow>
      <sphereGeometry args={[.24, 24, 16]} />
      <meshPhysicalMaterial color="#0c416c" metalness={.68} roughness={.2} clearcoat={.85} />
    </mesh>)}
    <mesh position={[0, .28, .49]} scale={[1.5, .82, .3]}>
      <sphereGeometry args={[.32, 24, 18]} />
      <meshStandardMaterial color="#06192b" metalness={.65} roughness={.2} />
    </mesh>
    <mesh position={[-.27, .37, .63]} rotation={[0, 0, -.42]}>
      <boxGeometry args={[.42, .11, .06]} />
      <meshPhysicalMaterial color="#176090" metalness={.72} roughness={.18} clearcoat={.8} />
    </mesh>
    <mesh position={[.27, .37, .63]} rotation={[0, 0, .42]}>
      <boxGeometry args={[.42, .11, .06]} />
      <meshPhysicalMaterial color="#176090" metalness={.72} roughness={.18} clearcoat={.8} />
    </mesh>
    <group ref={coreRef} position={[0, .29, .72]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[.16, .035, 10, 30]} />
        <GlowMaterial />
      </mesh>
      <mesh>
        <sphereGeometry args={[.075, 18, 14]} />
        <GlowMaterial color={GREEN} />
      </mesh>
    </group>
    <mesh position={[0, -.38, .49]}>
      <boxGeometry args={[.7, .09, .09]} />
      <GlowMaterial color="#1679ff" opacity={.75} />
    </mesh>
    {[-1, 1].map(side => <mesh key={side} position={[side * .48, -.48, .23]} rotation={[0, side * .2, side * .08]}>
      <boxGeometry args={[.22, .34, .2]} />
      <meshPhysicalMaterial color="#071a2e" metalness={.75} roughness={.2} clearcoat={.7} />
    </mesh>)}
  </>;
}

function EnergyPedestal({ active }) {
  const outerRef = useRef();
  const innerRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    outerRef.current.rotation.z = t * .42;
    innerRef.current.rotation.z = -t * .72;
    const pulse = 1 + Math.sin(t * 2.4) * .06 + (active ? .08 : 0);
    outerRef.current.scale.setScalar(pulse);
  });
  return <group position={[0, -1.78, -.05]} rotation={[Math.PI / 2, 0, 0]}>
    <mesh ref={outerRef}>
      <torusGeometry args={[1.02, .025, 8, 54]} />
      <GlowMaterial color={CYAN} opacity={.65} />
    </mesh>
    <mesh ref={innerRef}>
      <torusGeometry args={[.72, .018, 8, 46]} />
      <GlowMaterial color={GREEN} opacity={.55} />
    </mesh>
    <mesh position={[0, 0, -.025]}>
      <circleGeometry args={[.9, 48]} />
      <meshBasicMaterial color="#007d99" transparent opacity={.07} side={THREE.DoubleSide} />
    </mesh>
  </group>;
}

function HologramPanel({ position = [-1.95, .3, -.35], bars = 3 }) {
  const panelRef = useRef();
  const barRefs = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    panelRef.current.rotation.y = -.18 + Math.sin(t * .8) * .05;
    barRefs.current.forEach((bar, index) => {
      if (!bar) return;
      bar.scale.x = .55 + Math.abs(Math.sin(t * (1.1 + index * .14) + index)) * .65;
    });
  });
  return <group ref={panelRef} position={position}>
    <mesh>
      <boxGeometry args={[1.18, 1.25, .045]} />
      <meshBasicMaterial color="#031c2a" transparent opacity={.82} />
    </mesh>
    <mesh position={[0, 0, .035]}>
      <boxGeometry args={[1.22, 1.29, .025]} />
      <meshBasicMaterial color={CYAN} wireframe transparent opacity={.5} toneMapped={false} />
    </mesh>
    {Array.from({ length: bars }).map((_, index) => <mesh
      key={index}
      ref={node => { barRefs.current[index] = node; }}
      position={[-.2, .37 - index * .34, .075]}
    >
      <boxGeometry args={[.58, .075, .035]} />
      <GlowMaterial color={index === 1 ? GREEN : CYAN} />
    </mesh>)}
  </group>;
}

function ServicesScene() {
  const screenRef = useRef();
  useFrame(({ clock }) => {
    screenRef.current.rotation.x = -.16 + Math.sin(clock.elapsedTime * 1.4) * .025;
  });
  return <group position={[0, -1.15, .3]}>
    <mesh position={[0, 0, .35]} rotation={[-.65, 0, 0]}>
      <boxGeometry args={[1.35, .62, .06]} />
      <meshStandardMaterial color="#061a2a" metalness={.65} roughness={.25} />
    </mesh>
    <group ref={screenRef} position={[0, .52, .07]} rotation={[-.12, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.18, .72, .055]} />
        <meshStandardMaterial color="#04111d" metalness={.5} roughness={.28} />
      </mesh>
      {[.2, 0, -.2].map((y, index) => <mesh key={y} position={[-.1, y, .045]}>
        <boxGeometry args={[.62 - index * .1, .04, .02]} />
        <GlowMaterial color={index === 1 ? GREEN : CYAN} />
      </mesh>)}
    </group>
  </group>;
}

function ProcessScene() {
  const nodes = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    nodes.current.forEach((node, index) => {
      if (!node) return;
      const pulse = 1 + Math.max(0, Math.sin(t * 3 - index * 1.15)) * .5;
      node.scale.setScalar(pulse);
    });
  });
  const positions = [[-1.8, .65, 0], [-1.35, .05, 0], [-1.82, -.55, 0]];
  return <group position={[0, 0, -.15]}>
    {positions.map((position, index) => <mesh key={index} ref={node => { nodes.current[index] = node; }} position={position}>
      <sphereGeometry args={[.13, 18, 14]} />
      <GlowMaterial color={index === 1 ? GREEN : CYAN} />
    </mesh>)}
    <mesh position={[-1.56, .34, 0]} rotation={[0, 0, -.65]}>
      <boxGeometry args={[.05, .75, .04]} />
      <GlowMaterial color={CYAN} opacity={.75} />
    </mesh>
    <mesh position={[-1.57, -.26, 0]} rotation={[0, 0, .62]}>
      <boxGeometry args={[.05, .75, .04]} />
      <GlowMaterial color={CYAN} opacity={.75} />
    </mesh>
  </group>;
}

function ProjectsScene() {
  const scanRef = useRef();
  useFrame(({ clock }) => {
    scanRef.current.position.y = -.48 + (Math.sin(clock.elapsedTime * 2) + 1) * .47;
  });
  return <group position={[-1.75, .15, -.2]}>
    <mesh>
      <boxGeometry args={[1.18, 1.28, .055]} />
      <meshBasicMaterial color="#031922" transparent opacity={.82} />
    </mesh>
    {[.28, 0, -.28].map((y, index) => <mesh key={y} position={[-.12, y, .05]}>
      <boxGeometry args={[.62 + index * .08, .055, .025]} />
      <GlowMaterial color={CYAN} />
    </mesh>)}
    <group position={[.35, -.25, .1]} rotation={[0, 0, -.18]}>
      <mesh rotation={[0, 0, -.7]} position={[-.09, -.02, 0]}>
        <boxGeometry args={[.05, .28, .035]} />
        <GlowMaterial color={GREEN} />
      </mesh>
      <mesh rotation={[0, 0, .68]} position={[.09, .05, 0]}>
        <boxGeometry args={[.05, .42, .035]} />
        <GlowMaterial color={GREEN} />
      </mesh>
    </group>
    <mesh ref={scanRef} position={[0, 0, .1]}>
      <boxGeometry args={[1.02, .025, .02]} />
      <GlowMaterial color={GREEN} opacity={.75} />
    </mesh>
  </group>;
}

function AutomationScene() {
  const orbRef = useRef();
  const ringA = useRef();
  const ringB = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    orbRef.current.scale.setScalar(1 + Math.sin(t * 2.5) * .12);
    ringA.current.rotation.x = t * .8;
    ringA.current.rotation.y = t * 1.15;
    ringB.current.rotation.x = -t * .7;
    ringB.current.rotation.z = t;
  });
  return <group position={[0, -.16, 1]}>
    <mesh ref={orbRef}>
      <icosahedronGeometry args={[.35, 2]} />
      <GlowMaterial color={GREEN} opacity={.85} />
    </mesh>
    <mesh ref={ringA}>
      <torusGeometry args={[.58, .025, 8, 38]} />
      <GlowMaterial />
    </mesh>
    <mesh ref={ringB}>
      <torusGeometry args={[.75, .018, 8, 38]} />
      <GlowMaterial color="#8c5dff" opacity={.78} />
    </mesh>
  </group>;
}

function ContactScene() {
  const rings = useRef([]);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    rings.current.forEach((ring, index) => {
      if (!ring) return;
      const phase = (t * .75 + index * .34) % 1;
      ring.scale.setScalar(.55 + phase * .8);
      ring.material.opacity = 1 - phase;
    });
  });
  return <group position={[-1.6, .15, -.05]}>
    {[0, 1, 2].map(index => <mesh key={index} ref={node => { rings.current[index] = node; }}>
      <torusGeometry args={[.34, .025, 8, 28]} />
      <meshBasicMaterial color={CYAN} transparent opacity={.8} toneMapped={false} />
    </mesh>)}
    <mesh position={[0, 0, .04]}>
      <boxGeometry args={[.5, .36, .06]} />
      <meshStandardMaterial color="#071b2a" metalness={.55} />
    </mesh>
    <mesh position={[0, .06, .085]} rotation={[0, 0, -.65]}>
      <torusGeometry args={[.13, .035, 8, 18, Math.PI]} />
      <GlowMaterial color={GREEN} />
    </mesh>
  </group>;
}

function SceneActivity({ state }) {
  if (state === "showroom") return <HologramPanel />;
  if (state === "services") return <ServicesScene />;
  if (state === "process") return <ProcessScene />;
  if (state === "projects") return <ProjectsScene />;
  if (state === "automation") return <AutomationScene />;
  if (state === "contact") return <ContactScene />;
  return null;
}

function TechAssistantModel({ state, active, pointer }) {
  const rootRef = useRef();
  const headRef = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const leftShoulderRef = useRef();
  const rightShoulderRef = useRef();
  const leftElbowRef = useRef();
  const rightElbowRef = useRef();
  const coreRef = useRef();

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime;
    const energy = active ? 1.55 : 1;
    const smooth = Math.min(1, delta * 8);
    const wave = Math.sin(t * 2.5 * energy);
    const quick = Math.sin(t * 6.2 * energy);
    const left = { x: 0, y: 0, z: -.05, elbow: .02 };
    const right = { x: 0, y: 0, z: .05, elbow: -.02 };

    if (state === "showroom") {
      left.z = -.25 + wave * .12;
      right.z = 1.18 + wave * .2;
      right.elbow = -.45 + Math.sin(t * 2) * .15;
    } else if (state === "services") {
      left.z = .62;
      right.z = -.62;
      left.x = -.42 + quick * .12;
      right.x = -.42 - quick * .12;
      left.elbow = .88 + quick * .2;
      right.elbow = -.88 - quick * .2;
    } else if (state === "process") {
      left.z = -.15 + wave * .08;
      right.z = 1.38 + Math.sin(t * 2.1) * .16;
      right.elbow = -.2;
    } else if (state === "projects") {
      left.z = -1.12 + Math.sin(t * 1.8) * .25;
      left.elbow = .42;
      right.z = .2 + wave * .1;
    } else if (state === "automation") {
      left.z = .9 + wave * .12;
      right.z = -.9 - wave * .12;
      left.x = -.3;
      right.x = -.3;
      left.elbow = .72;
      right.elbow = -.72;
    } else if (state === "contact") {
      left.z = -2.15 + Math.sin(t * 1.5) * .08;
      left.elbow = -.42;
      right.z = 2.35 + Math.sin(t * 4.4) * .18;
      right.elbow = -.38 + Math.sin(t * 4.4) * .18;
    }

    const applyLimb = (shoulder, elbow, target) => {
      if (!shoulder.current || !elbow.current) return;
      shoulder.current.rotation.x = THREE.MathUtils.lerp(shoulder.current.rotation.x, target.x, smooth);
      shoulder.current.rotation.y = THREE.MathUtils.lerp(shoulder.current.rotation.y, target.y, smooth);
      shoulder.current.rotation.z = THREE.MathUtils.lerp(shoulder.current.rotation.z, target.z, smooth);
      elbow.current.rotation.z = THREE.MathUtils.lerp(elbow.current.rotation.z, target.elbow, smooth);
    };
    applyLimb(leftShoulderRef, leftElbowRef, left);
    applyLimb(rightShoulderRef, rightElbowRef, right);

    rootRef.current.position.y = Math.sin(t * 1.7) * .055;
    rootRef.current.position.x = Math.sin(t * .82) * .018;
    rootRef.current.rotation.y = THREE.MathUtils.lerp(rootRef.current.rotation.y, pointer.current.x * .22, smooth);
    rootRef.current.rotation.x = THREE.MathUtils.lerp(rootRef.current.rotation.x, -pointer.current.y * .08, smooth);
    const workingLean = state === "services" ? Math.sin(t * 2.8) * .025 : state === "process" ? -.035 : 0;
    rootRef.current.rotation.z = THREE.MathUtils.lerp(rootRef.current.rotation.z, workingLean, smooth);
    headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, pointer.current.x * .28, smooth);
    headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, -pointer.current.y * .16 + Math.sin(t * 1.3) * .025, smooth);

    const blinkCycle = t % 4.4;
    const blink = blinkCycle > 4.12 ? .12 : 1;
    leftEyeRef.current.scale.y = THREE.MathUtils.lerp(leftEyeRef.current.scale.y, blink * 1.12, Math.min(1, delta * 22));
    rightEyeRef.current.scale.y = THREE.MathUtils.lerp(rightEyeRef.current.scale.y, blink * 1.12, Math.min(1, delta * 22));
    const coreScale = 1 + Math.sin(t * 3.2) * .09 + (active ? .13 : 0);
    coreRef.current.scale.setScalar(coreScale);
  });

  return <group ref={rootRef} position={[.35, -.08, 0]} scale={.93}>
    <EnergyPedestal active={active} />
    <Body coreRef={coreRef} />
    <Face headRef={headRef} leftEyeRef={leftEyeRef} rightEyeRef={rightEyeRef} />
    <Arm side="left" shoulderRef={leftShoulderRef} elbowRef={leftElbowRef} />
    <Arm side="right" shoulderRef={rightShoulderRef} elbowRef={rightElbowRef} />
    <Leg side="left" />
    <Leg side="right" />
    <SceneActivity state={state} />
  </group>;
}

export default function AnimatedTechAssistant({ state, active, fallbackSrc }) {
  const [ready, setReady] = useState(false);
  const [webglAvailable] = useState(supportsWebGL);
  const [webglFailed, setWebglFailed] = useState(false);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const follow = event => {
      pointer.current.x = (event.clientX / window.innerWidth - .5) * 2;
      pointer.current.y = (event.clientY / window.innerHeight - .5) * 2;
    };
    window.addEventListener("pointermove", follow, { passive: true });
    return () => window.removeEventListener("pointermove", follow);
  }, []);

  return <div className={`assistant-live3d ${ready ? "is-ready" : ""} ${webglAvailable && !webglFailed ? "" : "no-webgl"}`} aria-hidden="true">
    <img className="assistant-live3d-fallback" src={fallbackSrc} alt="" draggable="false" />
    {webglAvailable && <WebGLBoundary onError={() => setWebglFailed(true)}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, .15, 7.4], fov: 35 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          setReady(true);
        }}
      >
        <ambientLight intensity={1.35} />
        <directionalLight position={[3, 5, 5]} intensity={2.1} color="#baf7ff" />
        <pointLight position={[-3, 1, 3]} intensity={10} distance={8} color={CYAN} />
        <pointLight position={[2, 2, 2]} intensity={7} distance={7} color={GREEN} />
        <Sparkles count={24} scale={[4.2, 3.5, 2]} size={2.2} speed={.45} color={CYAN} opacity={.75} />
        <TechAssistantModel state={state} active={active} pointer={pointer} />
      </Canvas>
    </WebGLBoundary>}
  </div>;
}
