import React, { useRef, useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";

import Torus from "./components/Torus";
import TestBox from "./components/TestBox";
import Stars from "./components/Stars";

import { useSpring, a } from "react-spring";
import { OrbitControls } from "@react-three/drei";

const App = () => {
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

  return (
    <div className="bg-scene">
      <div className="donut-scene">
        <Canvas colorManagement camera={{ position: [-5, 0, 0] }}>
          <ambientLight intensity={0.2} />
          <pointLight position={[20, 20, 20]} intensity={0.5} />

          {/*Add 700 Random Stars*/}
          {posArray.map((arr) => (
            <Stars position={[arr[0], arr[1], arr[2]]}></Stars>
          ))}

          {/* Add the Donut */}
          <Suspense fallback={null}>
            <Torus />
          </Suspense>

          <OrbitControls />
        </Canvas>
      </div>
    </div>
  );
};

export default App;
