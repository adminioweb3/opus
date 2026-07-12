"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Line } from "@react-three/drei";
import * as THREE from "three";
import { AmbientParticles } from "./AmbientParticles";

// A handful of floating "data node" points connected by soft lines — reads as an abstract
// neural/citation graph without needing an external 3D model.
function NeuralGraph() {
  const nodes = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 14; i++) {
      pts.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 4,
          (Math.random() - 0.5) * 3
        )
      );
    }
    return pts;
  }, []);

  const edges = useMemo(() => {
    const lines: [THREE.Vector3, THREE.Vector3][] = [];
    nodes.forEach((n, i) => {
      const nearest = [...nodes]
        .map((o, j) => ({ o, j, d: n.distanceTo(o) }))
        .filter((x) => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2);
      nearest.forEach((nb) => lines.push([n, nb.o]));
    });
    return lines;
  }, [nodes]);

  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <group ref={group}>
      {edges.map(([a, b], i) => (
        <Line key={i} points={[a, b]} color="#6366f1" transparent opacity={0.18} lineWidth={1} />
      ))}
      {nodes.map((n, i) => (
        <mesh key={i} position={n}>
          <sphereGeometry args={[0.05, 12, 12]} />
          <meshBasicMaterial color={i % 3 === 0 ? "#a855f7" : "#818cf8"} />
        </mesh>
      ))}
    </group>
  );
}

// Abstract floating glass panels standing in for "dashboard cards" — real glass shading via
// physical material transmission, not a flat illustration.
function GlassPanels() {
  const panels = [
    { pos: [-2.6, 1.1, -1] as [number, number, number], size: [1.6, 1.0, 0.05] as [number, number, number], rot: [0.1, 0.3, -0.05] as [number, number, number] },
    { pos: [2.4, -0.6, 0.5] as [number, number, number], size: [1.3, 1.6, 0.05] as [number, number, number], rot: [-0.05, -0.25, 0.05] as [number, number, number] },
    { pos: [0.2, 1.6, -2] as [number, number, number], size: [1.1, 0.75, 0.05] as [number, number, number], rot: [0.15, 0.1, 0.08] as [number, number, number] },
  ];

  return (
    <>
      {panels.map((p, i) => (
        <Float key={i} speed={1.2 + i * 0.3} rotationIntensity={0.25} floatIntensity={0.8}>
          <mesh position={p.pos} rotation={p.rot}>
            <boxGeometry args={p.size} />
            <meshPhysicalMaterial
              color="#c7d2fe"
              transmission={0.92}
              thickness={0.4}
              roughness={0.12}
              metalness={0}
              clearcoat={1}
              ior={1.3}
              transparent
              opacity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function MouseParallaxRig() {
  const { camera, pointer } = useThree();
  useFrame(() => {
    camera.position.x += (pointer.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (pointer.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

export function HeroScene({ frameloop = "always" }: { frameloop?: "always" | "never" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7.5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={frameloop}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={40} color="#818cf8" />
        <pointLight position={[-5, -3, 2]} intensity={25} color="#a855f7" />
        <AmbientParticles count={450} radius={8} />
        <NeuralGraph />
        <GlassPanels />
        <MouseParallaxRig />
      </Suspense>
    </Canvas>
  );
}
