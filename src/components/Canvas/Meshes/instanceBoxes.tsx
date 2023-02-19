import { Triplet, useBox, useSphere } from "@react-three/cannon";
import { Clone, Instance, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { BufferGeometry, InstancedMesh } from "three";

type InstancedGeometryProps = {
  colors: Float32Array;
  number: number;
  size: number;
};

const Spheres = ({ colors, number, size }: InstancedGeometryProps) => {
  const [ref, { at }] = useSphere(
    () => ({
      args: [size],
      mass: 1,
      position: [Math.random() - 0.5, Math.random() * 20, Math.random() - 0.5],
    }),
    useRef<InstancedMesh>(null)
  );
  useFrame(() =>
    at(Math.floor(Math.random() * number)).position.set(0, Math.random() * 2, 0)
  );
  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[undefined, undefined, number]}
    >
      <sphereBufferGeometry args={[size, 48]}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </sphereBufferGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
};

const Boxes = ({ colors, number, size }: InstancedGeometryProps) => {
  const args: Triplet = [size, size, size];
  const [ref, { at }] = useBox(
    () => ({
      args,
      mass: 100,
      position: [Math.random() - 7, Math.random() * 20, Math.random() - 7],
    }),
    useRef<InstancedMesh>(null)
  );

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[undefined, undefined, number] as any}
    >
      <boxBufferGeometry args={args}>
        <instancedBufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </boxBufferGeometry>
      <meshLambertMaterial vertexColors />
    </instancedMesh>
  );
};

const Controller = ({ colors, number, size }: InstancedGeometryProps) => {
  const { nodes, materials }: any = useGLTF("/controller.glb");

  // console.log(nodes, 'sadkfjasdfl');

  const geo = nodes.controller.geometry.clone();

  geo.computeVertexNormals();
  console.log(geo.scale(0.2, 0.2, 0.2), "geo");
  const args: Triplet = [size, size, size];
  const [ref, { at }] = useBox(
    () => ({
      args,
      mass: 8,
      position: [Math.random() - 3, Math.random() * 20, Math.random() - 5],
    }),
    useRef<InstancedMesh>(null)
  );

  return (
    <instancedMesh
      receiveShadow
      castShadow
      ref={ref}
      args={[geo, nodes.controller.material, number]}
    ></instancedMesh>
  );
};

const instancedGeometry = {
  box: Boxes,
  sphere: Spheres,
  controller: Controller,
};

export { instancedGeometry };
