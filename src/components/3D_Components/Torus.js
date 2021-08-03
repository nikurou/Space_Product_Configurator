import React, { useRef, useState, Suspense } from "react";
import { useFrame, useLoader, Canvas } from "@react-three/fiber";
import { TextureLoader } from "three";
import donut_texture from "../../assets/textures/donut_texture.jpg";
import cake_normal_map from "../../assets/normal_maps/cake_normal_map.jpg";

const Torus = () => {
  const mesh = useRef();
  // Rotate mesh every frame
  useFrame(() => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.005;
    mesh.current.rotation.z += 0.001;
  });

  //Make Customizable Passed in Property later on...
  //Donut TextureMap
  const donutTexture = useLoader(TextureLoader, donut_texture);
  //Donut NormalMap
  const donutNormalTexture = useLoader(TextureLoader, cake_normal_map);

  return (
    <mesh ref={mesh} scale={0.25}>
      <torusBufferGeometry attach="geometry" args={[5, 2, 16, 30]} />
      <meshStandardMaterial
        map={donutTexture}
        normalMap={donutNormalTexture}
        attach="material"
      />
    </mesh>
  );
};

export default Torus;
