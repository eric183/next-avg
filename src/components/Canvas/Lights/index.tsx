import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Lights = () => {
  const pointLight = useRef<any>(null!);

  useFrame(() => {
    // const time = Date.now() * 0.001;
    // const x = Math.sin(time * 0.7) * 2;
    // const y = Math.cos(time * 0.5) * 1;
    // const z = Math.cos(time * 0.3) * 2;
    // pointLight.current.position.set(x, y, z);
  });

  return (
    <group>
      <ambientLight intensity={0.5} color={0xffffff} />

      <directionalLight
        color={"#ffffff"}
        intensity={0.5}
        position={[5, 5, 5]}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={10}
      />
      <CityPopLights />
      {/* <pointLight
        ref={pointLight}
        color={0xffffff}
        intensity={1}
        distance={50}
      /> */}
      {/* <spotLight
        color={"#ff9933"}
        intensity={0.8}
        position={[0, 10, 0]}
        angle={0.5}
        penumbra={0.2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-radius={10}
      /> */}
    </group>
  );
};

function CityPopLights() {
  // Neon colors
  const neonColors = [0xff77ff, 0x77ffff, 0xffff77];

  // Spotlights
  const spotlights = [
    { color: neonColors[0], x: -3, y: 3, z: 3 },
    { color: neonColors[1], x: 3, y: 3, z: 3 },
    { color: neonColors[2], x: 0, y: 3, z: -3 },
  ];

  return (
    <>
      {spotlights.map((light, index) => (
        <spotLight
          key={index}
          color={light.color}
          position={[light.x, light.y, light.z]}
          intensity={1}
          distance={15}
          angle={Math.PI / 4}
          penumbra={0.5}
          decay={2}
        />
      ))}
    </>
  );
}

export default Lights;
