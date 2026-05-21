"use client";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Center, Bounds } from "@react-three/drei";
import { Suspense } from "react";

const MODEL_URL =
  "https://raw.githubusercontent.com/ArthurBr02/bonbons-ensim-usine-du-futur/main/Rendus/model.glb";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return (
    <Center>
      <group rotation={[0, Math.PI, 0]}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function Distributor3D({ height = 620 }: { height?: number }) {
  return (
    <div style={{ width: "100%", height, minHeight: 400, position: "relative" }}>
      <Canvas
        camera={{ position: [0, 1, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2} />
        <directionalLight position={[5, 10, 5]} intensity={2} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <Model />
          </Bounds>
        </Suspense>
        <OrbitControls
          makeDefault
          enableZoom={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
        />
      </Canvas>
    </div>
  );
}
