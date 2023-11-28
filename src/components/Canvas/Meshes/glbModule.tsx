import {
  useGLTF,
  useMask,
  Clone,
  Html,
  useAnimations,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import {
  ChangeEvent,
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import THREE, {
  Color,
  DoubleSide,
  ShaderMaterial,
  Vector2,
  Vector3,
} from "three";
import {
  all_angry,
  all_fun,
  all_joy,
  all_sorrow,
  all_surprised,
} from "~/components/Expression";
import { sliceObject } from "~/utils";
import { useStore } from "..";
import { CelShader } from "../Shader/CelShader";

const Girl = forwardRef((props: any, ref: any) => {
  // const { scene, materials } = useGLTF("/coin-pusher.glb");

  const { camera } = useThree();
  const animationGroup = useRef<any>(null!);

  const { scene, nodes, scenes, animations } = useGLTF("/girl-morph.glb");

  const { actions, mixer, clips } = useAnimations(animations);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [nextClipIndex, setNextClipIndex] = useState(1);
  const [transitionTime, setTransitionTime] = useState(0);
  const [, set] = useControls(() => ({
    angry: {
      value: 0.5,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_angry(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    fun: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_fun(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    joy: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_joy(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    sorrow: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_sorrow(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    surprised: {
      value: 0.1,
      min: 0.1,
      max: 1,
      onChange: (value, type) => {
        all_surprised(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
  }));

  useLayoutEffect(() => {
    nodes.Head.lookAt(camera.position);
  }, []);

  useEffect(() => {
    const chilrenNode: any = nodes.Body.children[1];
    const morphsIndex = sliceObject(chilrenNode.morphTargetDictionary, 0, 5);

    const morphsInfos = chilrenNode.morphTargetInfluences;
    set({
      angry: morphsInfos[morphsIndex["Fcl_ALL_Angry"]],
      fun: morphsInfos[morphsIndex["Fcl_ALL_Fun"]],
      joy: morphsInfos[morphsIndex["Fcl_ALL_Joy"]],
      sorrow: morphsInfos[morphsIndex["Fcl_ALL_Sorrow"]],
      surprised: morphsInfos[morphsIndex["Fcl_ALL_Surprised"]],
    });
  }, []);

  useEffect(() => {
    // actions[clips[currentClipIndex].name].reset().fadeIn(0.5).play();
  }, [actions, clips, currentClipIndex]);

  return (
    <group>
      <primitive
        ref={ref}
        name="girl"
        object={scene}
        {...props}
        // onClick={(e) => props.setTarget(e.object)}
        // onPointerOver={() => setHovered(true)}
        // onPointerOut={() => setHovered(false)}
      />
    </group>
  );
});
Girl.displayName = "Girl";

const GirlScene = forwardRef((props: any, ref: any) => {
  // const { scene, materials } = useGLTF("/coin-pusher.glb");

  const { camera } = useThree();
  const animationGroup = useRef<any>(null!);

  const { scene, nodes, scenes, animations, materials } =
    useGLTF("/new_scene.glb");

  const { actions, mixer, clips } = useAnimations(animations);
  const [currentClipIndex, setCurrentClipIndex] = useState(0);
  const [nextClipIndex, setNextClipIndex] = useState(1);
  const [transitionTime, setTransitionTime] = useState(0);
  const [, set] = useControls(() => ({
    angry: {
      value: 0.5,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_angry(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    fun: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_fun(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    joy: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_joy(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    sorrow: {
      value: 0,
      min: 0,
      max: 1,
      onChange: (value, type) => {
        all_sorrow(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
    surprised: {
      value: 0.1,
      min: 0.1,
      max: 1,
      onChange: (value, type) => {
        all_surprised(nodes.Body, value);

        // console.log(type, ":", value);
      },
    },
  }));

  useLayoutEffect(() => {
    // nodes.Head.lookAt(camera.position);
    console.log(actions);
    // mesh.material.map.transformUv(new Vector2(1, -1));
    const materialWall = materials.wall as any;
    materialWall.map.rotation = Math.PI / 2;

    materialWall.map.repeat = { x: 5, y: 1 };
    // materialWall.repeat =
    // mesh.map.transformUv(new Vector2(1, -1));
    materialWall.map.needsUpdate = true;
    // console.log(materials.wall.map.wrapT, "!!!");
  }, []);

  useEffect(() => {
    // const chilrenNode: any = nodes.Body.children[1];
    // const morphsIndex = sliceObject(chilrenNode.morphTargetDictionary, 0, 5);
    // const morphsInfos = chilrenNode.morphTargetInfluences;
    // set({
    //   angry: morphsInfos[morphsIndex["Fcl_ALL_Angry"]],
    //   fun: morphsInfos[morphsIndex["Fcl_ALL_Fun"]],
    //   joy: morphsInfos[morphsIndex["Fcl_ALL_Joy"]],
    //   sorrow: morphsInfos[morphsIndex["Fcl_ALL_Sorrow"]],
    //   surprised: morphsInfos[morphsIndex["Fcl_ALL_Surprised"]],
    // });
  }, []);

  useEffect(() => {
    // actions[clips[currentClipIndex].name].reset().fadeIn(0.5).play();
  }, [actions, clips, currentClipIndex]);

  return (
    <group>
      <primitive
        ref={ref}
        name="girl"
        object={scene}
        {...props}
        // onClick={(e) => props.setTarget(e.object)}
        // onPointerOver={() => setHovered(true)}
        // onPointerOut={() => setHovered(false)}
      />
    </group>
  );
});
GirlScene.displayName = "GirlScene";

// const { scene, materials } = useGLTF("/coin-pusher.glb");
const Room = (props: any) => {
  const { scene, materials, nodes }: any = useGLTF("/room.glb");

  const stencil = useMask(1, true);

  useLayoutEffect(() => {
    Object.values<any>(nodes).forEach(
      (node) =>
        node.material &&
        // node.name === "tv" &&
        node.name === "tv_screen" &&
        // node.name === "chair_1" &&
        // node.name === "chair_2" &&
        Object.assign(node.material, stencil)
    );

    // materials["screen"].opacity = 0;
    // materials["screen"].visible = false;
  }, []);

  return (
    <group onClick={(e) => console.log(e)}>
      <group>
        <Clone object={nodes["chair_1"]}>
          <meshToonMaterial color="red" />
        </Clone>
        <Clone object={nodes["chair_2"]}>
          <meshToonMaterial color="#FBB13C" />
          {/* <MeshDistortMaterial color="red" {...stencil}></MeshDistortMaterial> */}
        </Clone>
        <pointLight position={[10, 10, 10]} />
        <Clone object={nodes["pillow_low"]} position={[-2, 0, 1]}></Clone>
        <Clone object={nodes["tv"]}></Clone>

        <Html
          className="content-embed"
          scale={1}
          transform
          occlude="blending"
          position={[-0.29, 2.35, -9.15]}
          zIndexRange={[2, 0]}
        >
          <video
            className="content-video cursor-pointer"
            src="/baycity.mp4"
            muted={false}
            onClick={(event: any) => {
              if (event.target.paused) {
                event.target.play();
                return;
              }

              event.target.pause();
            }}
          ></video>
        </Html>
      </group>
    </group>
  );
};

export { Room, Girl, GirlScene };
