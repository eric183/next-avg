import { BakeShadows, MeshReflectorMaterial, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import create from "zustand";
// import { Physics, RigidBody, CuboidCollider, Debug } from "@react-three/rapier";
import Lights from "./Lights";
import Controls from "./Controls";
import Meshes from "./Meshes";
import { Effects } from "./Effects";
import SceneRig from "./SceneRig";
import ReflectorPlane from "./Meshes/plane";
import { Physics } from "@react-three/cannon";
import { instancedGeometry } from "./Meshes/instanceBoxes";
import { useMemo, useRef, useState } from "react";
import { Color } from "three";

export const useStore = create((set: any) => ({
  target: null,
  setTarget: (target: any) => set({ target }),
}));

const CoinApp = ({ containerRef }: any) => {
  const { target, setTarget } = useStore();
  const [geometry, setGeometry] = useState<"box" | "sphere">("box");
  const [number] = useState(300);
  const [size] = useState(0.5);
  const niceColors = ["#99b898", "#fecea8", "#ff847c", "#e84a5f", "#2a363b"];
  const colors = useMemo(() => {
    const array = new Float32Array(number * 3);
    const color = new Color();
    for (let i = 0; i < number; i++)
      color
        .set(niceColors[Math.floor(Math.random() * 5)])
        .convertSRGBToLinear()
        .toArray(array, i * 3);
    return array;
  }, [number]);

  const InstancedGeometryController = useMemo(
    () => instancedGeometry.controller,
    []
  );

  const InstancedGeometry = useMemo(() => instancedGeometry.box, []);
  return (
    <Canvas
      gl={{
        antialias: true,
        stencil: true,
        // logarithmicDepthBuffer: true,
        depth: false,
      }}
      shadows
      dpr={[1, 1.5]}
      eventPrefix="client"
      eventSource={containerRef}
      camera={{
        position: [2.3301706037513576, 3.963075460128521, 2.2746870944948694],
        fov: 45,
        near: 1,
        far: 1000,
      }}
      onCreated={({ gl, camera }) => {
        const threeInfo: string = localStorage.getItem("threeInfo")!;
        const cameraHistory = JSON.parse(threeInfo);

        camera.rotation.fromArray([
          -3.271702678108735e-32, 1.184517280015184, 2.0835417594699634e-16,
        ]);

        if (cameraHistory) {
          camera.position.fromArray(cameraHistory.position);
          camera.rotation.fromArray(cameraHistory.rotation);
        }
      }}
    >
      <color attach="background" args={["black"]} />
      {/* <fog attach="fog" args={["#000", 5, 100]} /> */}

      <Lights />

      <Meshes portal={containerRef} />
      <Physics>
        <ReflectorPlane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        <InstancedGeometry {...{ colors, number, size }} />
        <InstancedGeometryController {...{ colors, number, size }} />
      </Physics>

      <Controls target={target} />

      <Preload all />

      {/* <SceneRig />
      <Effects /> */}
      <BakeShadows />
    </Canvas>
  );
};

export default CoinApp;
