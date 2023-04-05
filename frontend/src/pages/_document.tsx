import Navbar from "@/components/Navbar";
import { Canvas } from "@react-three/fiber";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {/* <div id="canvas-container">
          <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh>
              <boxGeometry />
              <meshStandardMaterial />
            </mesh>
          </Canvas>
        </div> */}
        <Navbar />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
