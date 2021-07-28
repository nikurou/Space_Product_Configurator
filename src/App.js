import React, { useRef, useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";
import { OrbitControls, Stars } from "@react-three/drei";

//Components
import Torus from "./components/Torus";
import TestBox from "./components/TestBox";
import Star from "./components/Stars";
import Earth from "./components/Earth";
import Moon from "./components/Moon";

// 3D Models
import bomb from "./assets/3d_models/bomb.gltf";
import headPhone from "./assets/3d_models/headphone_model/headphone.gltf";

const App = () => {
  // Star Position Array Hook
  const [posArray, setPos] = useState([]);

  // Trigger on Initial Render
  // Generate position array for Stars between -100 and 100
  useEffect(() => {
    const temp = [];
    for (let i = 0; i < 700; i++) {
      let ind = [
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
        Math.floor(Math.random() * (100 - -100 + 1) + -100),
      ];
      temp.push(ind);
    }
    setPos(temp);
  }, []);

  // Temporary Bomb Model
  const Model = () => {
    const gltf = useLoader(GLTFLoader, bomb);
    console.log(gltf.scene);
    // Code to change color
    gltf.scene.getObjectByName("Handles").material.color.set("blue");
    return <primitive object={gltf.scene} scale={0.4} />;
  };

  // Suspense fallback Loader
  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

  return (
    <div className="bg-scene">
      <p>Hello</p>
      <div className="donut-scene">
        <Canvas colorManagement camera={{ position: [-5, 0, 0] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[20, 20, 20]} intensity={0.5} />

          {/*Add 700 Random Stars*/}
          {posArray.map((arr) => (
            <Star position={[arr[0], arr[1], arr[2]]}></Star>
          ))}

          {/*Throw in some Imported Drei Stars cause why not*/}
          <Stars />

          {/* Add with Suspense*/}
          <Suspense fallback={<Loader />}>
            <Model />
            {/* Add Earth */}
            <Earth position={[250, 14, -40]} />
            {/* Add the Moon */}
            <Moon position={[400, 50, -40]} />
            {/* Add Donut */}
            {/* <Torus /> */}
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
