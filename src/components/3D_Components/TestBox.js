import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";

const TestBox = () => {
  const mesh = useRef();
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    mesh.current.rotation.x = mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} scale={1.5}>
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material" color={"red"} />
    </mesh>
  );
};

export default TestBox;
