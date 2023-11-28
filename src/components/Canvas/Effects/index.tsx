import {
  Bloom,
  DepthOfField,
  EffectComposer,
  SSR,
  Glitch,
} from "@react-three/postprocessing";
import { useControls } from "leva";
import { memo, useEffect } from "react";
import { GlitchMode } from "postprocessing";
import { Vector2 } from "three";
console.log(GlitchMode, "...");
const Effects = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Run the effect only on the client
    }
  }, []);
  return (
    <EffectComposer disableNormalPass>
      <DepthOfField
        // target={[0, 0, 13]}
        target={[1.3198989629745483, 0.8544199466705322, 0.9169659614562988]}
        focalLength={0.3}
        bokehScale={1.2}
        height={4000}
      />
      {/* <Glitch
        delay={new Vector2().fromArray([3.5, 7.5])} // min and max glitch delay
        // duration={new Vector2().fromArray([0.6, 1.0])} // min and max glitch duration
        duration={new Vector2().fromArray([1, 2])} // min and max glitch duration
        // strength={new Vector2().fromArray([0.3, 1.0])} // min and max glitch strength
        strength={new Vector2().fromArray([0.01, 0.5])} // min and max glitch strength
        mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} //
      /> */}
      {/* <LUT lut={}/> */}
    </EffectComposer>
  );
};
// const Effects = () => {
//   console.log("render");
//   // const { enabled, ...props } = useControls({
//   // const props = useControls({
//   //   enabled: true,
//   //   temporalResolve: true,
//   //   STRETCH_MISSED_RAYS: true,
//   //   USE_MRT: true,
//   //   USE_NORMALMAP: true,
//   //   USE_ROUGHNESSMAP: true,
//   //   ENABLE_JITTERING: true,
//   //   ENABLE_BLUR: true,
//   //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
//   //   temporalResolveCorrectionMix: { value: 0.4, min: 0, max: 1 },
//   //   maxSamples: { value: 0, min: 0, max: 1 },
//   //   resolutionScale: { value: 1, min: 0, max: 1 },
//   //   blurMix: { value: 0.2, min: 0, max: 1 },
//   //   blurExponent: { value: 10, min: 0, max: 20 },
//   //   blurKernelSize: { value: 1, min: 0, max: 10 },
//   //   rayStep: { value: 0.5, min: 0, max: 1 },
//   //   intensity: { value: 1, min: 0, max: 5 },
//   //   maxRoughness: { value: 1, min: 0, max: 1 },
//   //   jitter: { value: 0.3, min: 0, max: 5 },
//   //   jitterSpread: { value: 0.25, min: 0, max: 1 },
//   //   jitterRough: { value: 0.1, min: 0, max: 1 },
//   //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
//   //   rayFadeOut: { value: 0, min: 0, max: 1 },
//   //   MAX_STEPS: { value: 20, min: 0, max: 20 },
//   //   NUM_BINARY_SEARCH_STEPS: { value: 6, min: 0, max: 10 },
//   //   maxDepthDifference: { value: 10, min: 0, max: 10 },
//   //   maxDepth: { value: 1, min: 0, max: 1 },
//   //   thickness: { value: 10, min: 0, max: 10 },
//   //   ior: { value: 1.45, min: 0, max: 2 },
//   // });

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       // Run the effect only on the client
//     }
//   }, []);
//   // return props.enabled ? (
//   return props.enabled ? (
//     <EffectComposer
//       disableNormalPass
//       // autoClear
//       // temporalResolve
//       // STRETCH_MISSED_RAYS
//       // USE_MRT
//       // USE_NORMALMAP
//       // USE_ROUGHNESSMAP
//       // ENABLE_JITTERING
//       // ENABLE_BLUR
//       // enabled: true,
//       // temporalResolve: true,
//       // STRETCH_MISSED_RAYS: true,
//       // USE_MRT: true,
//       // USE_NORMALMAP: true,
//       // USE_ROUGHNESSMAP: true,
//       // ENABLE_JITTERING: true,
//       // ENABLE_BLUR: true,
//     >
//       {/* <SSR /> */}
//       {/* <SSR {...props} /> */}
//       {/* <SSR {...data} /> */}
//       {/* <Bloom
//         luminanceThreshold={0.5}
//         mipmapBlur
//         luminanceSmoothing={0}
//         intensity={1.5}
//       /> */}
//       <DepthOfField
//         target={[0, 0, 13]}
//         focalLength={0.3}
//         bokehScale={15}
//         height={700}
//       />

//       {/* <LUT lut={}/> */}
//     </EffectComposer>
//   ) : null;
// };

export { Effects };
