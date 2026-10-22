"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

/**
 * Shared scroll state written by section components (GSAP onUpdate)
 * and consumed inside the canvas frame loop — zero re-renders.
 */
const shared = {
  progress: 0, // 0..1 across whole page
  heroP: 0, // 0..1 across pinned hero
  intro: 0, // 0..1 intro camera dolly
  menuOpen: 0,
};
export const scrollState = shared;

/* ---------------- Camera ---------------- */
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const p = shared.progress;
    const zoomOut = THREE.MathUtils.smoothstep(p, 0.85, 1); // contact finale
    const dolly = shared.heroP;

    const tx = state.pointer.x * 1.1;
    const ty = state.pointer.y * 0.7;
    const tz = 11 - dolly * 1.6 + zoomOut * 6;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, tx, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, ty - dolly * 0.4, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, tz, 0.06);
    camera.lookAt(0, 0, -3);

    camera.fov = THREE.MathUtils.lerp(camera.fov, 42 + zoomOut * 5, 0.05);
    camera.updateProjectionMatrix();
  });

  return null;
}

/* ---------------- Dust / sparkle layers ---------------- */
function DustLayer({ count, spread, size, color, opacity, speed, depth }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * spread;
      arr[i * 3 + 1] = (Math.random() - 0.5) * spread * 0.75;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16 - 5;
    }
    return arr;
  }, [count, spread]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * speed;
    ref.current.rotation.z = Math.sin(t * speed * 0.6) * 0.08;
    // scroll parallax — far layers travel further
    ref.current.position.z = shared.progress * depth;
    ref.current.position.y = -shared.progress * depth * 0.4 + state.pointer.y * depth * 0.02;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ---------------- Floaty doodle shapes ---------------- */
function FloatShape({ kind = "knot", position, color = "#000000", speed = 1, drift = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    const p = shared.progress;

    mesh.current.rotation.x = t * 0.32;
    mesh.current.rotation.y = t * 0.44;
    mesh.current.position.x = position[0] + Math.sin(t * 0.5) * 0.45 * drift;
    mesh.current.position.y =
      position[1] + Math.cos(t * 0.38) * 0.4 * drift - p * 2.2 * drift;
    mesh.current.position.z = position[2] + p * 3;

    // hero scroll pushes shapes out of the way
    const push = shared.heroP;
    mesh.current.position.y += push * (position[1] > 0 ? 2.4 : -2.4);
  });

  return (
    <mesh ref={mesh} position={position}>
      {kind === "knot" && <torusKnotGeometry args={[0.55, 0.2, 120, 20]} />}
      {kind === "gem" && <octahedronGeometry args={[0.8, 0]} />}
      {kind === "pill" && <capsuleGeometry args={[0.32, 1.1, 8, 16]} />}
      {kind === "ball" && <icosahedronGeometry args={[0.62, 1]} />}
      <meshStandardMaterial
        color={color}
        roughness={0.22}
        metalness={0.7}
        emissive={color}
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

function WireShape({ kind = "ico", position, color = "#3cff00", speed = 0.6, scale = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.elapsedTime * speed;
    mesh.current.rotation.x = t * 0.25;
    mesh.current.rotation.z = t * 0.3;
    mesh.current.position.y = position[1] - shared.progress * 3.2;
  });

  return (
    <mesh ref={mesh} position={position} scale={scale}>
      {kind === "ico" && <icosahedronGeometry args={[1, 0]} />}
      {kind === "dodeca" && <dodecahedronGeometry args={[1, 0]} />}
      {kind === "torus" && <torusGeometry args={[1, 0.32, 10, 28]} />}
      <meshBasicMaterial color={color} wireframe transparent opacity={0.55} />
    </mesh>
  );
}

/* ---------------- Root ---------------- */
export default function Scene() {
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (!reduce && !coarse) return;
    // mobile / reduced-motion: render a single static frame instead of a loop
    const t = window.setTimeout(() => setRunning(false), 2200);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[5]" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={running ? "always" : "never"}
        camera={{ position: [0, 0, 11], fov: 42 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 6, 6]} intensity={1.6} />
        <pointLight position={[-6, -3, 3]} intensity={30} color="#3cff00" />
        <pointLight position={[6, 4, -4]} intensity={22} color="#f6a8d7" />

        {/* white dust — the world's confetti */}
        <DustLayer count={900} spread={30} size={0.05} color="#f5f5f3" opacity={0.5} speed={0.012} depth={5.5} />
        <DustLayer count={420} spread={20} size={0.08} color="#3cff00" opacity={0.35} speed={0.026} depth={3} />
        <DustLayer count={260} spread={16} size={0.1} color="#f6a8d7" opacity={0.3} speed={0.04} depth={1.6} />

        {/* ink shapes orbiting the stage */}
        <FloatShape kind="knot" position={[-5.4, 1.8, -4]} speed={0.8} drift={1.1} />
        <FloatShape kind="gem" position={[5.6, -1.4, -3.4]} speed={1.1} drift={0.9} />
        <FloatShape kind="ball" position={[-4.6, -2.6, -5]} speed={0.6} drift={1.3} />
        <FloatShape kind="pill" position={[4.8, 2.6, -5.5]} speed={0.9} drift={0.8} />
        <FloatShape kind="gem" position={[0.4, 3.4, -7]} speed={0.5} drift={0.6} />

        {/* lime + blush wireframes deep in the scene */}
        <WireShape kind="ico" position={[-7, -3.4, -9]} color="#3cff00" scale={1.7} />
        <WireShape kind="dodeca" position={[7.6, 3.6, -10]} color="#f6a8d7" speed={0.4} scale={1.5} />
        <WireShape kind="torus" position={[0, -4.6, -11]} color="#3cff00" speed={0.35} scale={2.1} />

        <CameraRig />
      </Canvas>
    </div>
  );
}
