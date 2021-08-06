import React, { useEffect, useRef } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useFrame, useLoader } from "@react-three/fiber";

const Model_Loader = (props) => {
  const gltf = useLoader(GLTFLoader, props.model);
  const mesh = useRef();

  // Add rotation to the 3D Object
  // useFrame(() => {
  //   mesh.current.rotation.x += 0.001;
  //   mesh.current.rotation.y += 0.002;
  //   mesh.current.rotation.z += 0.0001;
  // });

  // Load Color Choices on Start
  useEffect(() => {
    const meshes_array = gltf.scene.children.filter(
      (object) => object.type === "Mesh"
    );
    console.log(meshes_array);
    props.handleSetMesh(meshes_array);
  }, []);

  // Code to change color
  //gltf.scene.getObjectByName("Handles").material.color.set("green");
  //gltf.scene.getObjectByName("Big_cable").material.color.set("yellow");
  gltf.scene.getObjectByName("Big_cable").material.color.set("yellow");

  return <primitive ref={mesh} object={gltf.scene} scale={0.4} />;
};

export default Model_Loader;
