import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Stars = (props) => {
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead

  return (
    <mesh ref={mesh} scale={0.45} position={props.position}>
      <sphereBufferGeometry attach="geometry" args={[0.24, 25, 25]} />
      <meshStandardMaterial attach="material" color={0xffffff} />
    </mesh>
  );
};

export default Stars;
