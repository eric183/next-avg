import { Color, Vector3 } from "three";

const CelShader = {
  uniforms: {
    uDirLightPos: { value: new Vector3() },
    uDirLightColor: { value: new Color(0xffffff) },
    uAmbientLightColor: { value: new Color(0x050505) },
  },
  vertexShader: `
    varying vec3 vNormal;
    void main() {
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform vec3 uDirLightPos;
    uniform vec3 uDirLightColor;
    uniform vec3 uAmbientLightColor;
    varying vec3 vNormal;
    void main() {
      vec3 lightDirection = normalize(uDirLightPos);
      float directional = max(dot(vNormal, lightDirection), 0.0);
      vec3 vLighting = uAmbientLightColor + uDirLightColor * directional;
      if (directional > 0.95) {
        gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
      } else if (directional > 0.5) {
        gl_FragColor = vec4(0.7, 0.7, 0.7, 1.0);
      } else if (directional > 0.25) {
        gl_FragColor = vec4(0.4, 0.4, 0.4, 1.0);
      } else {
        gl_FragColor = vec4(0.1, 0.1, 0.1, 1.0);
      }
      gl_FragColor.xyz *= vLighting;
    }
  `,
};

export { CelShader };
