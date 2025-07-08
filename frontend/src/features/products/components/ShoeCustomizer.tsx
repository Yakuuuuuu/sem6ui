import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function ShoeModel({ color }: { color: string }) {
  const { scene } = useGLTF("/models/sneaker.glb");
  // Set color for all meshes
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.color.set(color);
    }
  });
  return <primitive object={scene} scale={2.5} />;
}

export default function ShoeCustomizer() {
  const [color, setColor] = useState("#ffffff");

  return (
    <div>
      <div style={{ width: "100%", height: 400 }}>
        <Canvas camera={{ position: [0, 0, 5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <ShoeModel color={color} />
          <OrbitControls />
        </Canvas>
      </div>
      <div style={{ marginTop: 16 }}>
        <label>
          Pick a color: {" "}
          <input
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
} 