import React, { useRef, useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";
import { Environment, OrbitControls, Stars } from "@react-three/drei";
import Accordion_Dropdown from "./components/Accordion_Dropdown";

//3D Components
import Torus from "./components/3D_Components/Torus";
import TestBox from "./components/3D_Components/TestBox";
import Star from "./components/3D_Components/Stars";
import Earth from "./components/3D_Components/Earth";
import Moon from "./components/3D_Components/Moon";
import Model_Loader from "./components/3D_Components/Model_Loader";

// 3D Models
import headPhone from "./assets/3d_models/headphone_model/headphone.gltf";
import bomb from "./assets/3d_models/bomb.gltf";
import ps5_controller from "./assets/3d_models/ps5_controller/scene.gltf";
import Bomb from "./components/3D_Components/Bomb";

const App = () => {
  // Star Position Array Hook
  const [posArray, setPos] = useState([]);
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

  // Params: []
  // Purpose: Helper function to assign array of meshes to it's state hook.
  const handleSetMesh = (meshes_array) => {
    setMeshArray(meshes_array);
  };

  return (
    <div class="scene">
      <div class="donut-scene">
        <Canvas colorManagement camera={{ position: [-5, 0, 0] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[20, 20, 20]} intensity={0.5} />

          {/*Add Random Stars*/}
          {posArray.map((arr) => (
            <Star position={[arr[0], arr[1], arr[2]]}></Star>
          ))}

          {/*Throw in some Imported Drei Stars cause why not*/}
          <Stars />

          {/* Add with Suspense*/}
          <Suspense fallback={<Loader />}>
            <Bomb handleSetMesh={handleSetMesh} />
            {/* Add Earth */}
            <Earth position={[250, 14, -40]} />
            {/* Add the Moon */}
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
          <Accordion_Dropdown />
        </div>
      </div>
    </div>
  );
};

export default App;
