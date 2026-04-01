"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function TorusKnotMesh() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
  });

  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 256, 48, 2, 3]} />
      <meshStandardMaterial
        color="#00C878"
        metalness={0.85}
        roughness={0.08}
      />
    </mesh>
  );
}

export function TorusKnotScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 50 }}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.25} />
      <pointLight position={[4, 4, 4]} intensity={60} color="#00C878" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#ffffff" />
      <pointLight position={[0, -4, -2]} intensity={15} color="#00E88F" />
      <TorusKnotMesh />
    </Canvas>
  );
}
