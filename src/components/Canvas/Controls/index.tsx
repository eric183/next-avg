import {
  TransformControls,
  OrbitControls,
  FlyControls,
} from "@react-three/drei";
import { Camera, useFrame, useThree } from "@react-three/fiber";
import { button, useControls } from "leva";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Matrix4,
  PerspectiveCamera,
  Quaternion,
  Vector3,
  Vector4,
} from "three";
import { useSpring, animated } from "@react-spring/three";
import { cp } from "fs";

const Controls: FC<{
  target: any;
}> = (props) => {
  const [useRoll, setUseRoll] = useState(0);

  const threeInstance = useThree();

  const { mode, openCamerationRotation } = useControls({
    mode: {
      value: "translate",
      options: ["translate", "rotate", "scale"],
    },
    openCamerationRotation: false,
    set: button(() => {
      localStorage.setItem(
        "threeInfo",
        JSON.stringify({
          position: threeInstance.camera.position.toArray(),
          quaternion: threeInstance.camera.quaternion.toArray(),
          matrix: threeInstance.camera.matrixWorld.elements,
          rotation: threeInstance.camera.rotation.toArray(),
          scale: threeInstance.camera.scale,
        })
      );

      console.log(threeInstance.camera);
    }),
    get: button((get) => {
      const threeInfo: string = localStorage.getItem("threeInfo")!;
      const camera = JSON.parse(threeInfo);

      threeInstance.camera.position.fromArray(camera.position);
      threeInstance.camera.rotation.fromArray(camera.rotation);
      console.log(threeInstance.camera.position, "position");
      console.log(threeInstance.camera.rotation, "rotation");
      threeInstance.camera.updateProjectionMatrix();
    }),
  });
  const setCameraRotation = (event: any) => {
    if (!openCamerationRotation) {
      return;
    }

    if (!event.ctrlKey) {
      threeInstance.camera.rotation.y -= event.movementX / 500;
      threeInstance.camera.rotation.x -= event.movementY / 500;
      return;
    }
    threeInstance.camera.rotation.x = 0;
  };

  useLayoutEffect(() => {
    document.body.addEventListener("mousemove", setCameraRotation, false);
    return () =>
      document.body.removeEventListener("mousemove", setCameraRotation, false);
  }, []);
  return (
    <group>
      {/* {props.target && (
        <TransformControls
          mode={mode as any}
          object={props.target as any}
          onObjectChange={(e) => {
            console.log(e?.target.worldPosition);
            localStorage.setItem(
              "pos",
              JSON.stringify(e?.target.worldPosition)
            );
          }}
        />
      )} */}
      {/* <Rig from={-Math.PI / 2} to={Math.PI / 2.66} /> */}
      {/* <FlyControls rollSpeed={useRoll} dragToLook movementSpeed={2} />
      <OrbitControls /> */}
      {/* <DragControls /> */}
      {/* <FlyControls /> */}
      {/* <Effects /> */}
      {/* <CameraControls
        target={props.target}
        mode="translate"
        useRoll={Math.PI / 24}
      />  

      <ThirdPersonCameraControls target={props.target} /> */}
      {/* <CameraSpring
        quaternion={threeInstance.camera.quaternion}
        matrixworld={threeInstance.camera.matrixWorld}
      /> */}
      {/* <OrbitControls makeDefault /> */}
      <FlyControls
        rollSpeed={useRoll}
        dragToLook
        movementSpeed={5}
        makeDefault
      />
    </group>
  );
};

export default Controls;
