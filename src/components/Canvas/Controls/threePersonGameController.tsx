import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useCallback, useEffect } from "react";
import { Vector2, Object3D, Vector3, Euler } from "three";

export function ThirdPersonCameraControls(props: any) {
  const target = props.target;

  const { camera } = useThree();
  const cameraRef = useRef(camera);

  const mouse = new Vector2();

  const pitchObject = new Object3D();
  pitchObject.add(camera);

  const yawObject = new Object3D();
  yawObject.position.y = 10;
  yawObject.add(pitchObject);

  const moveForward = useCallback(() => {
    const direction = new Vector3(0, 0, 1);
    const rotation = new Euler(0, yawObject.rotation.y, 0, "YXZ");

    direction.applyEuler(rotation);

    target.translateOnAxis(direction, 10);
  }, [target]);

  const moveBackward = useCallback(() => {
    const direction = new Vector3(0, 0, -1);
    const rotation = new Euler(0, yawObject.rotation.y, 0, "YXZ");

    direction.applyEuler(rotation);

    target.translateOnAxis(direction, 10);
  }, [target]);

  const moveLeft = useCallback(() => {
    const direction = new Vector3(-1, 0, 0);
    const rotation = new Euler(0, yawObject.rotation.y, 0, "YXZ");

    direction.applyEuler(rotation);

    target.translateOnAxis(direction, 10);
  }, [target]);

  const moveRight = useCallback(() => {
    const direction = new Vector3(1, 0, 0);
    const rotation = new Euler(0, yawObject.rotation.y, 0, "YXZ");

    direction.applyEuler(rotation);

    target.translateOnAxis(direction, 10);
  }, [target]);

  const onMouseMove = useCallback((event: any) => {
    if (document.pointerLockElement === document.body) {
      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      const speed = 0.002;

      yawObject.rotation.y -= movementX * speed;
      pitchObject.rotation.x -= movementY * speed;
      pitchObject.rotation.x = Math.max(
        -Math.PI / 2,
        Math.min(Math.PI / 2, pitchObject.rotation.x)
      );
    }
  }, []);

  const onKeyDown = useCallback((event: any) => {
    switch (event.code) {
      case "KeyW":
        moveForward();
        break;
      case "KeyS":
        moveBackward();
        break;
      case "KeyA":
        moveLeft();
        break;
      case "KeyD":
        moveRight();
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useFrame(() => {
    cameraRef.current.position.copy(yawObject.position);
    cameraRef.current.rotation.copy(yawObject.rotation);
  });

  return <></>;
}
