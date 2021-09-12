import React, { useRef, useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Html, useProgress } from "@react-three/drei";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import Accordion_Dropdown from "./components/Accordion_Dropdown";
import { useGLTF } from "@react-three/drei";

//3D Components

import Earth from "./components/3D_Components/Earth";
import Moon from "./components/3D_Components/Moon";

const App = () => {
  // Star Position Array Hook
  const [posArray, setPos] = useState([]);
  // Array hook that holds pointers to every mesh object of a given 3d model.
  const [meshArray, setMeshArray] = useState([]);

  // Trigger on Initial Render
  // Generate position array for Stars between -100 and 100
  useEffect(() => {
    const temp = createStars(700);
    setPos(temp);
  }, []);

  // Purpose:  While in Suspense, use this as fallback Loader
  const Loader = () => {
    const { progress } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  // Params: int numStars
  // Purpose: Given an integer numStars, generates an array "temp" of size numStars.
  //          Populates with array "ind";
  //          where "ind" is made of [randomNumber, randomNumber, randomNumber]
  const createStars = (numStars) => {
    const temp = [];
    for (let i = 0; i < numStars; i++) {
      let ind = [
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
      ];
      temp.push(ind);
    }
    return temp;
  };

  // Purpose: The Nintendo Switch 3D Model Component
  function Switch(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF("nintendo_switch/switch.gltf");

    // On load, filter all references of the meshes of the 3d Object,
    // and save it to the meshes_array hook in app.js
    // Allows app.js to directly manipulate the color of the meshes.
    useEffect(() => {
      var ObjtoArray = Object.values(materials);
      const meshes_array = ObjtoArray.filter(
        (obj) => obj.type === "MeshStandardMaterial"
      );

      handleSetMesh(meshes_array);
    }, []);

    return (
      <group ref={group} {...props}>
        <mesh
          geometry={nodes.mesh_0.geometry}
          material={materials.Top_Radiator_Mesh}
        />
        <mesh
          geometry={nodes.mesh_1.geometry}
          material={materials.Volume_Rocker}
        />
        <mesh
          geometry={nodes.mesh_2.geometry}
          material={materials.Screen_Bezel}
        />
        <mesh
          geometry={nodes.mesh_3.geometry}
          material={materials.Bumper_and_Buttons}
        />
        <mesh
          geometry={nodes.mesh_4.geometry}
          material={materials.Right_Joycon}
        />
        <mesh
          geometry={nodes.mesh_5.geometry}
          material={materials.Left_Joycon}
        />
      </group>
    );
  }

  // Params: []
  // Purpose: Helper function to assign array of meshes to it's state hook.
  //          Mesh array used to select each mesh that's part of the model, and allow the user to color them.
  const handleSetMesh = (meshes_array) => {
    const _ = require("lodash");

    // If passed in meshes_array is not the same as the current mesh, replace it.
    // This prevents "Maximum update depth exceeded" bug!
    // meshes_array was provided by array.filter() which returns a reference to a different array albeit with the same contents
    // To fix this, we did a deep comparison with lodash's built in isEqual function to check by value not reference.
    if (_.isEqual(meshes_array, meshArray)) {
      //Do nothing
    } else {
      setMeshArray(meshes_array);
    }
  };

  return (
    <div class="scene">
      <div class="donut-scene">
        <Canvas colorManagement camera={{ position: [4, -40, 6] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[20, 20, 20]} intensity={0.5} />
          <spotLight intensity={0.3} position={[5, 20, 20]} />

          {/*Throw in some Imported Drei Stars*/}
          <Stars />

          {/* Load with Suspense, such that if it takes a while to load, there's something to fall back onto*/}
          <Suspense fallback={<Loader />}>
            <Switch position={[0, 0, 0]} scale={0.25} />
            <Earth position={[250, 14, -40]} />
            <Moon position={[400, 50, -40]} />

            {/* Just a preset for brighter lighting on 3d Object*/}
            <Environment preset="sunset" />
          </Suspense>
          <OrbitControls />
        </Canvas>
      </div>

      {/* Displays a Accordion component for every mesh in the 3D GLTF Object
          Accordion allows user to select color for mesh. */}
      <div class="menu-overlay">
        <div class="menu-content">
          {meshArray.map((mesh) => (
            <Accordion_Dropdown mesh_name={mesh.name} meshArray={meshArray} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
