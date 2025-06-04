"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stage, useGLTF } from "@react-three/drei";

function LogoModel(props: any) {
  const { scene } = useGLTF("/logo.glb"); // Place your logo.glb in public/
  return <primitive object={scene} {...props} />;
}

export default function Logo3D() {
  return (
    <div style={{ width: 80, height: 80 }}>
      <Canvas camera={{ position: [0, 0, 0.17] }}> {/* Moved camera back */}
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 2, 2]} intensity={1.2} />
        <pointLight position={[-2, -2, 2]} intensity={0.5} />
        <LogoModel scale={1.2} rotation={[0, Math.PI / 4, 0]} />
        <OrbitControls enableZoom={false} autoRotate />
      </Canvas>
    </div>
  );
}