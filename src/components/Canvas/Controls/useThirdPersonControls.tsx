import { useThree, useFrame } from "@react-three/fiber";
import { useRef, useState, useEffect } from "react";
import { Object3D, Vector3 } from "three";

interface ThirdPersonControlsOptions {
  camera?: Object3D;
  target?: Object3D;
  initialDistance?: number;
  maxDistance?: number;
  minDistance?: number;
  rotateSpeed?: number;
  zoomSpeed?: number;
  panSpeed?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  enableDamping?: boolean;
  dampingFactor?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

export const useThirdPersonControls = (
  options: ThirdPersonControlsOptions = {}
) => {
  const {
    camera: cameraProp,
    target: targetProp,
    initialDistance = 5,
    maxDistance = Infinity,
    minDistance = 0,
    rotateSpeed = 0.5,
    zoomSpeed = 0.5,
    panSpeed = 0.5,
    enableZoom = true,
    enablePan = true,
    enableRotate = true,
    enableDamping = true,
    dampingFactor = 0.1,
    autoRotate = false,
    autoRotateSpeed = 2,
  } = options;

  const { camera: defaultCamera, gl, size } = useThree();
  const camera = cameraProp || defaultCamera;
  const controlsRef = useRef<any>();
  const targetRef = useRef<Object3D>(targetProp || new Object3D());
  const [distance, setDistance] = useState(initialDistance);

  useEffect(() => {
    if (!targetProp) {
      camera.lookAt(targetRef.current.position);
    }
  }, [camera, targetProp]);

  useFrame(() => {
    if (controlsRef.current) {
      const targetPosition = new Vector3().copy(targetRef.current.position);
      controlsRef.current.target = targetPosition;

      if (enableDamping) {
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = dampingFactor;
      } else {
        controlsRef.current.enableDamping = false;
      }

      if (enableRotate) {
        controlsRef.current.enableRotate = true;
        controlsRef.current.rotateSpeed = rotateSpeed;
      } else {
        controlsRef.current.enableRotate = false;
      }

      if (enableZoom) {
        controlsRef.current.enableZoom = true;
        controlsRef.current.zoomSpeed = zoomSpeed;
      } else {
        controlsRef.current.enableZoom = false;
      }

      if (enablePan) {
        controlsRef.current.enablePan = true;
        controlsRef.current.panSpeed = panSpeed;
      } else {
        controlsRef.current.enablePan = false;
      }

      if (autoRotate) {
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = autoRotateSpeed;
      } else {
        controlsRef.current.autoRotate = false;
      }

      const maxDist = Math.min(maxDistance, distance);
      const minDist = Math.max(minDistance, maxDist);
      setDistance(minDist);
      camera.position.set(0, 0, minDist);
      controlsRef.current.update();
    }
  });

  return {
    controlsRef,
    targetRef,
    setDistance,
  };
};
