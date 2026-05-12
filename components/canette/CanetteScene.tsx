'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  ContactShadows,
  useGLTF,
  Center,
  Bounds,
  Environment,
} from '@react-three/drei';
import { Mesh, Group, Vector3, MathUtils } from 'three';

type EnvironmentPreset = { name: string; preset: string; description: string };

const _targetScale = new Vector3();

function Model({ wireframe }: { wireframe: boolean }) {
  const { scene } = useGLTF('/renders/regab-seul.glb');
  const groupRef = useRef<Group>(null);

  useEffect(() => {
    return () => {
      scene.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          mesh.geometry?.dispose();
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => m?.dispose());
        }
      });
    };
  }, [scene]);

  useEffect(() => {
    scene.traverse((child) => {
      if ((child as Mesh).isMesh) {
        const mesh = child as Mesh;
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if ('wireframe' in mat) (mat as any).wireframe = wireframe;
          });
        } else {
          if ('wireframe' in mesh.material) (mesh.material as any).wireframe = wireframe;
        }
      }
    });
  }, [scene, wireframe]);

  useFrame(() => {
    if (!groupRef.current) return;
    const targetScale = wireframe ? 1.05 : 1;
    const targetRotation = wireframe ? Math.PI * 0.1 : 0;
    _targetScale.set(targetScale, targetScale, targetScale);
    groupRef.current.scale.lerp(_targetScale, 0.1);
    groupRef.current.rotation.y = MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation,
      0.1,
    );
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={15} />
      </Center>
    </group>
  );
}

useGLTF.preload('/renders/regab-seul.glb');

type Props = {
  wireframe: boolean;
  currentEnvironment: number;
  environments: EnvironmentPreset[];
  orbitControlsRef: React.RefObject<any>;
};

export default function CanetteScene({
  wireframe,
  currentEnvironment,
  environments,
  orbitControlsRef,
}: Props) {
  return (
    <Canvas shadows camera={{ position: [0, 0.1, 2.5], fov: 38 }} dpr={[1, 2]}>
      <Environment
        preset={environments[currentEnvironment].preset as any}
        background={true}
        backgroundIntensity={1.0}
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.5}
        color={'#00bfff'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-2, 5, -2]} intensity={1.5} color={'#ff4d4d'} />
      <spotLight position={[0, 3, 2]} angle={0.4} intensity={2} penumbra={0.5} castShadow />
      <ContactShadows position={[0, -0.8, 0]} opacity={0.35} scale={10} blur={1.5} far={4.5} />
      <OrbitControls
        ref={orbitControlsRef}
        enableZoom
        maxDistance={4}
        minDistance={1.5}
        autoRotate
        autoRotateSpeed={1}
      />
      <Bounds fit clip observe margin={1.2}>
        <Model wireframe={wireframe} />
      </Bounds>
    </Canvas>
  );
}
