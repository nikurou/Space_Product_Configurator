import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import moon_texture from "../../assets/textures/moon_texture.jpg";
import moon_normal from "../../assets/normal_maps/moon_normal.jpg";

const Moon = (props) => {
  const mesh = useRef();
  useFrame(() => {
    mesh.current.rotation.x += 0;
    mesh.current.rotation.y += 0.002;
    mesh.current.rotation.z += 0.0001;
  });

  //Moon TextureMap
  const moonTexture = useLoader(TextureLoader, moon_texture);
  //Moon NormalMap
  const moonNormal = useLoader(TextureLoader, moon_normal);

  return (
    <mesh ref={mesh} scale={0.45} position={props.position}>
      <sphereBufferGeometry attach="geometry" args={[15, 20, 20]} />
      <meshStandardMaterial
        map={moonTexture}
        normalMap={moonNormal}
        attach="material"
      />
    </mesh>
  );
};

export default Moon;
