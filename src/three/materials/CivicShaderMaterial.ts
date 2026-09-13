import * as THREE from 'three';

// Safe GLSL shader definition without side effects at module load time
export const CivicPulseShader = {
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color('#06b6d4') },
    uGlowColor: { value: new THREE.Color('#22d3ee') },
    uIntensity: { value: 1.5 },
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform float uTime;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    varying vec3 vNormal;
    varying vec3 vPosition;
    uniform vec3 uColor;
    uniform vec3 uGlowColor;
    uniform float uTime;
    uniform float uIntensity;

    void main() {
      vec3 viewDir = normalize(-vPosition);
      float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
      float pulse = 0.8 + 0.2 * sin(uTime * 2.0);
      vec3 finalColor = mix(uColor, uGlowColor, fresnel * pulse) * uIntensity;
      gl_FragColor = vec4(finalColor, clamp(fresnel * 1.5 + 0.3, 0.0, 1.0));
    }
  `,
};
