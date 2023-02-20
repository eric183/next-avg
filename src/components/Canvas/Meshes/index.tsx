import { Girl, Room } from "./glbModule";

const Meshes = (props: any) => {
  const pos = localStorage.getItem("pos")
    ? JSON.parse(localStorage.getItem("pos")!)
    : null;

  return (
    <group>
      {/* <Room portal={props.portal} /> */}
      {/* <Girl scale={3} /> */}
    </group>
  );
};

export default Meshes;
