import { BakeShadows, MeshReflectorMaterial, Preload } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import create from "zustand";
// import { Physics, RigidBody, CuboidCollider, Debug } from "@react-three/rapier";
import Lights from "./Lights";
import Controls from "./Controls";
import Meshes from "./Meshes";
import { Effects } from "./Effects";
import ReflectorPlane from "./Meshes/plane";
import { Physics } from "@react-three/cannon";
import { instancedGeometry } from "./Meshes/instanceBoxes";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Color, Matrix4 } from "three";
import { Background, SceneRig } from "./Scene";
import { Girl, GirlScene } from "./Meshes/glbModule";

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

  const GirlRef = useRef<any>(null!);

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
        position: [-0.5, 0.8, 3],
        fov: 45,
        near: 1,
        far: 1000,
      }}
      onCreated={({ gl, camera }) => {
        const threeInfo: string = localStorage.getItem("threeInfo")!;
        const cameraHistory = JSON.parse(threeInfo);

        // camera.quaternion.fromArray(cameraHistory.quaternion);
        // camera.setRotationFromMatrix(
        //   new Matrix4().fromArray(cameraHistory.matrix)
        // );
        // return;

        camera.position.fromArray([
          1.9322642083444923, 1.0127677797154546, 2.5863695273995693,
        ]);

        camera.rotation.fromArray([
          -0.014162256468099037,

          0.7868011787365924,

          0.010028602132987351,
        ]);
        return;
        if (cameraHistory) {
          camera.position.fromArray(cameraHistory.position);
          camera.rotation.fromArray(cameraHistory.rotation);
        }
      }}
    >
      <color attach="background" args={["black"]} />
      {/* <fog attach="fog" args={["#000", 5, 100]} /> */}
      <Background source="/images/sakura_temple.pngsdd" />
      <Lights />
      <Girl position={[0, 0, 0]} ref={GirlRef} />
      <GirlScene position={[0, 0, 0]} />
      {/* <Meshes portal={containerRef} /> */}
      <Physics>
        <ReflectorPlane position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} />
        {/* <InstancedGeometry {...{ colors, number, size }} /> */}
        {/* <InstancedGeometryController {...{ colors, number, size }} /> */}
      </Physics>
      <Controls target={target} />
      <Preload all />
      <SceneRig girlRef={GirlRef} />a
      <Effects />
      <BakeShadows />
    </Canvas>
  );
};

export default CoinApp;
