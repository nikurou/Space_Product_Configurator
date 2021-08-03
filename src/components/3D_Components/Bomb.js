import React, { useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";
import bomb from "../../assets/3d_models/bomb.gltf";

const Bomb = (props) => {
  const gltf = useLoader(GLTFLoader, bomb);
  const mesh = useRef();

  useFrame(() => {
    mesh.current.rotation.x += 0.001;
    mesh.current.rotation.y += 0.002;
    mesh.current.rotation.z += 0.0001;
  });

  const meshes_array = gltf.scene.children.filter(
    (object) => object.type === "Mesh"
  );
  console.log(meshes_array);

  // Code to change color
  //gltf.scene.getObjectByName("Handles").material.color.set("green");
  //gltf.scene.getObjectByName("Big_cable").material.color.set("yellow");
  gltf.scene.getObjectByName("Big_cable").material.color.set("yellow");

  return (
    <primitive
      ref={mesh}
      object={gltf.scene}
      scale={0.4}
      onWheel={() => props.handleSetMesh(meshes_array)}
    />
  );
};

export default Bomb;
