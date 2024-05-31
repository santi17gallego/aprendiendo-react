import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const Shape = ({ shapeConfig }) => {
  const meshRef = useRef();

//   useFrame(() => {
//     if (meshRef.current) {
//       meshRef.current.rotation.y += 0.01;
//     }
//   });

  let geometry;

  if (shapeConfig) {
    const { shape, params } = shapeConfig;
    switch (shape) {
      case 'sphere':
        geometry = new THREE.SphereGeometry(params.radius || 1, 32, 32);
        break;
      case 'cube':
        geometry = new THREE.BoxGeometry(params.width || 1, params.width || 1, params.width || 1);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(params.radius || 1, params.tube || 0.4, 16, 100);
        break;
      case 'plane':
        geometry = new THREE.PlaneGeometry(params.width || 1, params.height || 1);
        break;
      default:
        geometry = new THREE.BoxGeometry(1, 1, 1);
    }
  }

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={0x0077ff} wireframe />
    </mesh>
  );
};

const ShapeViewer = ({ shapeConfig }) => {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Shape shapeConfig={shapeConfig} />
      <OrbitControls />
    </Canvas>
  );
};

export default ShapeViewer;
