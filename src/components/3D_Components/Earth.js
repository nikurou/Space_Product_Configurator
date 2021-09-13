import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import earth_texture from "../../assets/textures/earth_texture.jpg";

const Earth = (props) => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x += 0;
    mesh.current.rotation.y += 0.0005;
    mesh.current.rotation.z += 0.0001;
  });

  //Earth TextureMap
  const earthTexture = useLoader(TextureLoader, earth_texture);
  //Earth NormalMap
  // Might not need

  return (
    <mesh ref={mesh} scale={0.45} position={props.position}>
      <sphereBufferGeometry attach="geometry" args={[30, 50, 50]} />
      <meshStandardMaterial map={earthTexture} attach="material" />
    </mesh>
  );
};

export default Earth;
