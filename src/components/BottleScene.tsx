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

  logoTexture.colorSpace = THREE.SRGBColorSpace;

  const { viewport } = useThree();

  const onPointerMove = useCallback((e: any) => {
    if (!hovered) return;
    const x = (e.point.x / viewport.width) * 2;
    const y = (e.point.y / viewport.height) * 2;
    targetRotation.current = { x: y * 0.5, y: x * Math.PI };
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

      const scale = hovered ? 1.05 : 1;
      groupRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.04);
    }
  });

  // Create a rounded bottle profile using lathe geometry
  const bottlePoints = [];
  // Bottom flat
  bottlePoints.push(new THREE.Vector2(0, -1.4));
  bottlePoints.push(new THREE.Vector2(0.62, -1.4));
  bottlePoints.push(new THREE.Vector2(0.65, -1.35));
  // Body curve up
  bottlePoints.push(new THREE.Vector2(0.66, -1.2));
  bottlePoints.push(new THREE.Vector2(0.67, -0.8));
  bottlePoints.push(new THREE.Vector2(0.67, -0.2));
  bottlePoints.push(new THREE.Vector2(0.66, 0.3));
  bottlePoints.push(new THREE.Vector2(0.64, 0.6));
  // Shoulder curve
  bottlePoints.push(new THREE.Vector2(0.58, 0.8));
  bottlePoints.push(new THREE.Vector2(0.46, 0.95));
  bottlePoints.push(new THREE.Vector2(0.34, 1.05));
  bottlePoints.push(new THREE.Vector2(0.26, 1.12));
  // Neck
  bottlePoints.push(new THREE.Vector2(0.22, 1.2));
  bottlePoints.push(new THREE.Vector2(0.20, 1.4));
  bottlePoints.push(new THREE.Vector2(0.20, 1.6));
  bottlePoints.push(new THREE.Vector2(0.21, 1.7));
  // Lip
  bottlePoints.push(new THREE.Vector2(0.23, 1.72));
  bottlePoints.push(new THREE.Vector2(0.23, 1.75));
  bottlePoints.push(new THREE.Vector2(0.20, 1.76));

  const bottleGeometry = new THREE.LatheGeometry(bottlePoints, 64);

  // Inner liquid profile
  const liquidPoints = [];
  liquidPoints.push(new THREE.Vector2(0, -1.35));
  liquidPoints.push(new THREE.Vector2(0.58, -1.35));
  liquidPoints.push(new THREE.Vector2(0.60, -1.2));
  liquidPoints.push(new THREE.Vector2(0.61, -0.8));
  liquidPoints.push(new THREE.Vector2(0.61, -0.2));
  liquidPoints.push(new THREE.Vector2(0.60, 0.1));
  liquidPoints.push(new THREE.Vector2(0.58, 0.3));
  // Liquid top surface
  liquidPoints.push(new THREE.Vector2(0, 0.3));

  const liquidGeometry = new THREE.LatheGeometry(liquidPoints, 64);

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
          {/* Main bottle body - smooth lathe shape */}
          <mesh geometry={bottleGeometry}>
            <MeshTransmissionMaterial
              backside
              thickness={0.5}
              chromaticAberration={0.12}
              anisotropy={0.15}
              roughness={0.02}
              color="#0B3D2E"
              transmission={0.75}
              ior={1.52}
              envMapIntensity={2}
              clearcoat={1}
              clearcoatRoughness={0.05}
            />
          </mesh>

          {/* Inner liquid */}
          <mesh geometry={liquidGeometry}>
            <meshPhysicalMaterial
              color="#1a6b42"
              transparent
              opacity={0.35}
              roughness={0.05}
              metalness={0.05}
              envMapIntensity={0.5}
            />
          </mesh>

          {/* Premium cap - main body */}
          <mesh position={[0, 1.95, 0]}>
            <cylinderGeometry args={[0.24, 0.25, 0.45, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.03} envMapIntensity={2} />
          </mesh>

          {/* Cap top - flat dome */}
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.20, 0.24, 0.06, 64]} />
            <meshStandardMaterial color="#dbb960" metalness={0.9} roughness={0.08} />
          </mesh>

          {/* Cap knurling detail ring */}
          <mesh position={[0, 1.95, 0]}>
            <torusGeometry args={[0.25, 0.012, 8, 64]} />
            <meshStandardMaterial color="#b8982e" metalness={0.95} roughness={0.15} />
          </mesh>
          <mesh position={[0, 1.85, 0]}>
            <torusGeometry args={[0.255, 0.01, 8, 64]} />
            <meshStandardMaterial color="#b8982e" metalness={0.95} roughness={0.15} />
          </mesh>

          {/* Neck ring seal */}
          <mesh position={[0, 1.73, 0]}>
            <torusGeometry args={[0.235, 0.015, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.05} />
          </mesh>

          {/* Gold accent ring - bottom */}
          <mesh position={[0, -1.38, 0]}>
            <torusGeometry args={[0.64, 0.02, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.05} />
          </mesh>

          {/* Gold accent ring - upper body */}
          <mesh position={[0, 0.55, 0]}>
            <torusGeometry args={[0.65, 0.012, 16, 64]} />
            <meshStandardMaterial color="#C8A951" metalness={0.95} roughness={0.08} />
          </mesh>

          {/* Base plate */}
          <mesh position={[0, -1.42, 0]}>
            <cylinderGeometry args={[0.66, 0.68, 0.06, 64]} />
            <meshStandardMaterial color="#0a3326" metalness={0.4} roughness={0.15} />
          </mesh>

          {/* Logo on bottle - front */}
          <mesh position={[0, -0.15, 0.685]}>
            <planeGeometry args={[1.05, 0.45]} />
            <meshBasicMaterial
              map={logoTexture}
              transparent
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              opacity={1.0}
              toneMapped={false}
              color="#ffffff"
            />
          </mesh>

          {/* Logo glow behind */}
          <mesh position={[0, -0.15, 0.68]}>
            <planeGeometry args={[1.1, 0.5]} />
            <meshBasicMaterial
              color="#C8A951"
              transparent
              opacity={hovered ? 0.2 : 0.08}
            />
          </mesh>

          {/* Label border lines */}
          <mesh position={[0, 0.12, 0.69]}>
            <planeGeometry args={[0.85, 0.002]} />
            <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.8} />
          </mesh>
          <mesh position={[0, -0.42, 0.69]}>
            <planeGeometry args={[0.85, 0.002]} />
            <meshStandardMaterial color="#C8A951" emissive="#C8A951" emissiveIntensity={0.8} />
          </mesh>
        </group>
      </Float>
    </>
  );
};

const BottleScene = () => {
  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0.3, 5.2], fov: 38 }} dpr={[1, 2]}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[5, 5, 5]} intensity={1.5} color="#C8A951" angle={0.2} penumbra={0.5} castShadow />
          <spotLight position={[-4, 3, 3]} intensity={0.8} color="#0B3D2E" penumbra={0.7} />
          <pointLight position={[0, -2, 4]} intensity={0.5} color="#C8A951" />
          <pointLight position={[3, 4, -2]} intensity={0.3} color="#ffffff" />
          <directionalLight position={[-2, 5, 2]} intensity={0.3} color="#ffffff" />
          <Bottle />
          <Environment preset="studio" environmentIntensity={1.0} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default BottleScene;
