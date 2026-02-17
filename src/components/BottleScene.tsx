import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

const Bottle = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef as any}>
        {/* Bottle body */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.6, 0.7, 2.5, 32]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.5}
            chromaticAberration={0.2}
            anisotropy={0.3}
            roughness={0.1}
            color="#0B3D2E"
            transmission={0.6}
            ior={1.5}
          />
        </mesh>
        {/* Bottle neck */}
        <mesh position={[0, 1.6, 0]}>
          <cylinderGeometry args={[0.25, 0.4, 0.8, 32]} />
          <MeshTransmissionMaterial
            backside
            thickness={0.3}
            chromaticAberration={0.1}
            roughness={0.1}
            color="#0B3D2E"
            transmission={0.6}
            ior={1.5}
          />
        </mesh>
        {/* Cap */}
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[0.3, 0.3, 0.4, 32]} />
          <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Gold ring */}
        <mesh position={[0, 0.3, 0]}>
          <torusGeometry args={[0.65, 0.03, 16, 32]} />
          <meshStandardMaterial color="#C8A951" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Label area glow */}
        <mesh position={[0, 0.2, 0.72]}>
          <planeGeometry args={[0.8, 0.6]} />
          <meshStandardMaterial
            color="#C8A951"
            emissive="#C8A951"
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
          />
        </mesh>
      </group>
    </Float>
  );
};

const BottleScene = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.3} />
          <spotLight position={[5, 5, 5]} intensity={1} color="#C8A951" angle={0.3} />
          <spotLight position={[-5, 3, 2]} intensity={0.5} color="#0B3D2E" />
          <pointLight position={[0, -2, 3]} intensity={0.3} color="#C8A951" />
          <Bottle />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BottleScene;
