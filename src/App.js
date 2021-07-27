import React, { useRef, useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Html, useProgress } from "@react-three/drei";

import Torus from "./components/Torus";
import TestBox from "./components/TestBox";
import Star from "./components/Stars";

import { OrbitControls, Stars } from "@react-three/drei";
import Earth from "./components/Earth";
import Moon from "./components/Moon";
import bomb from "./assets/3d_models/bomb.gltf";

const App = () => {
  // Star Position Array
  const [posArray, setPos] = useState([]);
  // Temporary Headphone Model

  const Model = () => {
    const gltf = useLoader(GLTFLoader, bomb);
    return <primitive object={gltf.scene} scale={0.4} />;
  };

  const Loader = () => {
    const { active, progress, errors, item, loaded, total } = useProgress();
    return <Html center>{progress} % loaded</Html>;
  };

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

  return (
    <div className="bg-scene">
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
            <Torus />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
