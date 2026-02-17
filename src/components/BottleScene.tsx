import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial, Environment, useTexture } from "@react-three/drei";
import { useRef, Suspense, useState, useCallback } from "react";
import * as THREE from "three";
import logoImg from "@/assets/ecoxent-logo.png";

const Bottle = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const logoTexture = useTexture(logoImg);

  const { viewport } = useThree();

  const onPointerMove = useCallback((e: any) => {
    if (!hovered) return;
    const x = (e.point.x / viewport.width) * 2;
    const y = (e.point.y / viewport.height) * 2;
    targetRotation.current = { x: y * 0.3, y: x * 0.8 };
  }, [hovered, viewport]);

  useFrame(() => {
    if (groupRef.current) {
      if (hovered) {
        currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
        currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;
      } else {
        currentRotation.current.x += (0 - currentRotation.current.x) * 0.03;
        currentRotation.current.y += (0 - currentRotation.current.y) * 0.03;
      }
      groupRef.current.rotation.x = currentRotation.current.x;
      groupRef.current.rotation.y = currentRotation.current.y;

      // Subtle breathing scale on hover
      const scale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.04);
    }
  });

  return (
    <>
      {/* Invisible plane to capture pointer */}
      <mesh
        position={[0, 0, 2]}
        onPointerMove={onPointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        visible={false}
      >
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      <Float speed={hovered ? 0 : 1.5} rotationIntensity={0} floatIntensity={hovered ? 0 : 0.3}>
        <group ref={groupRef}>
          {/* Bottle body - elegant tapered shape */}
          <mesh position={[0, -0.2, 0]}>
            <cylinderGeometry args={[0.55, 0.65, 2.2, 64]} />
            <MeshTransmissionMaterial
              backside
              thickness={0.6}
              chromaticAberration={0.15}
              anisotropy={0.2}
              roughness={0.05}
              color="#0B3D2E"
              transmission={0.7}
              ior={1.5}
              envMapIntensity={1.5}
            />
          </mesh>

          {/* Inner liquid */}
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[0.48, 0.58, 1.6, 64]} />
            <meshPhysicalMaterial
              color="#1a5c3a"
              transparent
              opacity={0.4}
              roughness={0.1}
              metalness={0.1}
            />
          </mesh>

          {/* Bottle shoulder curve */}
          <mesh position={[0, 1.0, 0]}>
            <cylinderGeometry args={[0.28, 0.55, 0.5, 64]} />
            <MeshTransmissionMaterial
              backside
              thickness={0.4}
              chromaticAberration={0.1}
              roughness={0.05}
              color="#0B3D2E"
              transmission={0.7}
              ior={1.5}
            />
          </mesh>

          {/* Bottle neck */}
          <mesh position={[0, 1.55, 0]}>
            <cylinderGeometry args={[0.22, 0.28, 0.7, 64]} />
            <MeshTransmissionMaterial
              backside
              thickness={0.3}
              chromaticAberration={0.08}
              roughness={0.05}
              color="#0B3D2E"
              transmission={0.65}
              ior={1.5}
            />
          </mesh>

          {/* Premium cap - main body */}
          <mesh position={[0, 2.15, 0]}>
            <cylinderGeometry args={[0.26, 0.26, 0.5, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.05} />
          </mesh>

          {/* Cap top detail */}
          <mesh position={[0, 2.42, 0]}>
            <cylinderGeometry args={[0.22, 0.26, 0.05, 64]} />
            <meshStandardMaterial color="#dbb960" metalness={0.9} roughness={0.1} />
          </mesh>

          {/* Cap ring detail */}
          <mesh position={[0, 1.88, 0]}>
            <torusGeometry args={[0.27, 0.02, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.05} />
          </mesh>

          {/* Gold accent ring - bottom */}
          <mesh position={[0, -1.3, 0]}>
            <torusGeometry args={[0.66, 0.025, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.05} />
          </mesh>

          {/* Gold accent ring - middle */}
          <mesh position={[0, 0.3, 0]}>
            <torusGeometry args={[0.58, 0.015, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.08} />
          </mesh>

          {/* Logo on bottle - front */}
          <mesh position={[0, 0.1, 0.591]}>
            <planeGeometry args={[0.75, 0.45]} />
            <meshStandardMaterial
              map={logoTexture}
              transparent
              opacity={0.95}
              emissive="#ffffff"
              emissiveIntensity={hovered ? 0.15 : 0.05}
              emissiveMap={logoTexture}
              side={THREE.FrontSide}
            />
          </mesh>

          {/* Label border lines */}
          <mesh position={[0, 0.38, 0.595]}>
            <planeGeometry args={[0.8, 0.003]} />
            <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0, -0.18, 0.595]}>
            <planeGeometry args={[0.8, 0.003]} />
            <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.6} />
          </mesh>

          {/* Base detail */}
          <mesh position={[0, -1.32, 0]}>
            <cylinderGeometry args={[0.68, 0.7, 0.08, 64]} />
            <meshStandardMaterial color="#0a3326" metalness={0.3} roughness={0.2} />
          </mesh>
        </group>
      </Float>
    </>
  );
};

const BottleScene = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.5, 5.5], fov: 40 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />
          <spotLight position={[5, 5, 5]} intensity={1.2} color="#C8A951" angle={0.25} penumbra={0.5} />
          <spotLight position={[-5, 3, 2]} intensity={0.6} color="#0B3D2E" penumbra={0.8} />
          <pointLight position={[0, -2, 3]} intensity={0.4} color="#C8A951" />
          <pointLight position={[2, 4, -2]} intensity={0.2} color="#ffffff" />
          <Bottle />
          <Environment preset="studio" environmentIntensity={0.8} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BottleScene;
