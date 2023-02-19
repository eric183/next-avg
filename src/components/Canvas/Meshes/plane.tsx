import { PlaneProps, usePlane } from "@react-three/cannon";
import { MeshReflectorMaterial } from "@react-three/drei";
import { useRef } from "react";
import { Mesh } from "three";

const ReflectorPlane = (props: PlaneProps) => {
  const [ref] = usePlane(() => ({ ...props }), useRef<Mesh>(null));

  console.log("reRender");
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <MeshReflectorMaterial
        blur={[300, 100]}
        resolution={2048}
        mixBlur={1}
        mixStrength={80}
        roughness={0.3}
        depthScale={1}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#202020"
        metalness={0.8}
        mirror={1}
      />
    </mesh>
  );
};

export default ReflectorPlane;
