"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, ContactShadows } from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";

const MODEL_URL = "https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Rendus/model.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  
  useEffect(() => {
    if (scene) {
      console.log("3D Model successfully loaded into scene:", scene);
      scene.traverse((child) => {
        if ((child as any).isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  return (
    <primitive 
      object={scene} 
      scale={2.2} 
      position={[0, -1, 0]} 
      rotation={[0, -Math.PI / 4, 0]}
    />
  );
}

// Simple error boundary component for Three.js
function ErrorFallback() {
  return (
    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'red' }}>
      Erreur de chargement 3D
    </div>
  );
}

export default function Distributor3D({ height = 620 }: { height?: number }) {
  const [error, setError] = useState(false);

  return (
    <div style={{ width: "100%", height, minHeight: 400, position: "relative" }} className="stage">
      {error && <ErrorFallback />}
      <Canvas 
        shadows 
        camera={{ position: [5, 2, 5], fov: 35 }}
        gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
        onError={(e) => {
          console.error("Canvas Error:", e);
          setError(true);
        }}
      >
        <Suspense fallback={null}>
          <Stage />
          <Model />
          <OrbitControls 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.5}
            makeDefault 
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Stage() {
  return (
    <>
      <ambientLight intensity={2} />
      <spotLight 
        position={[10, 15, 10]} 
        angle={0.3} 
        penumbra={1} 
        intensity={3} 
        castShadow 
      />
      <directionalLight position={[-5, 5, 5]} intensity={1.5} />
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.5} 
        scale={10} 
        blur={2} 
        far={4.5} 
      />
    </>
  );
}



