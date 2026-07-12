"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron } from "@react-three/drei";
import * as THREE from "three";
import { AmbientParticles } from "./AmbientParticles";

function Globe() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (outerRef.current) outerRef.current.rotation.y = state.clock.elapsedTime * 0.08;
    if (innerRef.current) innerRef.current.rotation.y = -state.clock.elapsedTime * 0.05;
  });

  return (
    <group>
      <Icosahedron ref={outerRef} args={[2.6, 2]}>
        <meshBasicMaterial color="#818cf8" wireframe transparent opacity={0.35} />
      </Icosahedron>
      <Icosahedron ref={innerRef} args={[2.2, 1]}>
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.25} />
      </Icosahedron>
      <mesh>
        <sphereGeometry args={[1.9, 32, 32]} />
        <meshPhysicalMaterial color="#5b5bff" transmission={0.9} roughness={0.2} thickness={0.6} transparent opacity={0.25} />
      </mesh>
    </group>
  );
}

export function WireframeGlobe({ frameloop = "always" }: { frameloop?: "always" | "never" }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      frameloop={frameloop}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[4, 4, 4]} intensity={30} color="#a855f7" />
        <AmbientParticles count={300} radius={7} />
        <Globe />
      </Suspense>
    </Canvas>
  );
}
