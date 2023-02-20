import { Html, PivotControls, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { FC, useEffect, useLayoutEffect, useRef } from "react";
import { WebGLCubeRenderTarget } from "three";

const Background = (props: { source: string }) => {
  // const { gl } = useThree();

  // const texture = useTexture(props.source);
  // const formatted = new WebGLCubeRenderTarget(
  //   texture.image.height
  // ).fromEquirectangularTexture(gl, texture);
  const { camera } = useThree();

  return (
    <group>
      <PivotControls autoTransform annotations offset={[-15, 5, 0]}>
        <Html
          // rotation={[0, 0, 0]}
          position={[-15, 5, 0]}
          transform
          occlude="blending"
          // position={[-0.29, 2.35, -9.15]}
          className="w-full h-full"
          zIndexRange={[2, 0]}
          onUpdate={(self) => self.lookAt(camera.position)}
        >
          <img
            src={props.source}
            alt=""
            className="w-full h-full"
            onDrag={(e) => e.preventDefault()}
          />
          {/* <div>hello</div> */}
        </Html>
      </PivotControls>
    </group>
  );
};

const SceneRig = (props: any) => {
  const { scene } = useThree();

  const head =
    props.girlRef.current &&
    props.girlRef.current.getObjectByProperty("name", "Head");
  return useFrame((state) => {
    // state.camera.position.lerp(
    //   {
    //     x: 0,
    //     y: -state.pointer.y / 4,
    //     z: state.pointer.x / 2,
    //   } as THREE.Vector3,
    //   0.1
    // );
    state.camera.lookAt(0, 0.8, 0);
    // head?.position && state.camera.lookAt(head?.position);
  });

  // return <></>;
};

export { SceneRig, Background };
